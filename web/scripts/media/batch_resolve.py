#!/usr/bin/env python3
"""
Batch resolver for licensed photographs (Wikimedia Commons).

Same editorial rule as resolve.py — the photo must be the image the subject's
own encyclopedia article uses to depict it — but queried 50 subjects at a time
through the MediaWiki Action API, so the whole archive resolves in a few
hundred requests instead of several thousand.

  1. en.wikipedia  prop=pageimages (pilicense=free) → lead image per article.
     Only free-licensed page images are returned by the API itself.
  2. Wikidata P18 (the item's representative image) as a fallback for
     drivers whose article has no free lead image.
  3. commons       prop=imageinfo&iiprop=extmetadata → licence, author,
     1280px thumbnail. Only CC0 / public domain / CC BY / CC BY-SA accepted.

Subject checks (never guess):
  * cars — the article reached after redirects, or the file name, must contain
    the chassis designation (a redirect to the constructor's article is
    rejected, because its image would show some other car);
  * seasons / races — the article title must contain the year;
  * SVG images (maps, logos, diagrams) are skipped.

Usage: python3 web/scripts/media/batch_resolve.py [drivers circuits chassis seasons races]
"""
import html
import json
import os
import re
import sys
import time
import unicodedata
import urllib.error
import urllib.parse
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..", "..")
OUT = os.path.join(ROOT, "data", "media", "resolved.json")
TITLES = os.path.join(ROOT, "data", "media", "wiki_titles.json")
UA = {"User-Agent": "PaddockEncyclopedia/0.3 (educational F1 encyclopedia; batched licence lookup)"}
WP = "https://en.wikipedia.org/w/api.php"
WD = "https://www.wikidata.org/w/api.php"
CM = "https://commons.wikimedia.org/w/api.php"
JOLPICA = "https://api.jolpi.ca/ergast/f1"


def log(*a):
    print(*a, file=sys.stderr, flush=True)


def get(url, params=None, tries=10):
    if params:
        url = url + "?" + urllib.parse.urlencode(params)
    wait = 5
    for _ in range(tries):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r:
                return json.loads(r.read().decode("utf-8", "replace"))
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return None
            ra = e.headers.get("Retry-After")
            w = max(int(ra) if ra and ra.isdigit() else 0, wait)
            log(f"  {e.code} -> wait {w}s")
            time.sleep(w)
            wait = min(wait * 2, 240)
        except Exception as e:  # noqa: BLE001
            log("  err", e)
            time.sleep(wait)
            wait = min(wait * 2, 240)
    return None


def norm(s):
    s = unicodedata.normalize("NFD", str(s or "")).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]", "", s)


def chunks(xs, n=50):
    for i in range(0, len(xs), n):
        yield xs[i : i + n]


# ---------------------------------------------------------------- Wikipedia
def page_images(titles):
    """title -> {'resolved': final title, 'file': name|None}"""
    out = {}
    for batch in chunks(titles):
        j = get(WP, {"action": "query", "format": "json", "redirects": 1, "prop": "pageimages|pageprops", "piprop": "name", "pilicense": "free", "ppprop": "wikibase-shortdesc", "titles": "|".join(batch)})
        time.sleep(2)
        if not j:
            continue
        q = j.get("query", {})
        mapping = {t: t for t in batch}
        for key in ("normalized", "redirects"):
            for r in q.get(key, []):
                for orig, cur in list(mapping.items()):
                    if cur == r["from"]:
                        mapping[orig] = r["to"]
        pages = {p.get("title"): p for p in q.get("pages", {}).values()}
        for orig, final in mapping.items():
            p = pages.get(final)
            if not p or "missing" in p:
                out[orig] = {"resolved": None, "file": None}
            else:
                out[orig] = {"resolved": final, "file": p.get("pageimage"), "desc": (p.get("pageprops") or {}).get("wikibase-shortdesc", "")}
        log(f"  wikipedia {len(out)}/{len(titles)}")
    return out


def wikidata_p18(titles):
    out = {}
    for batch in chunks(titles):
        j = get(WD, {"action": "wbgetentities", "format": "json", "sites": "enwiki", "props": "claims|sitelinks", "titles": "|".join(batch)})
        time.sleep(2)
        if not j:
            continue
        for ent in j.get("entities", {}).values():
            t = ent.get("sitelinks", {}).get("enwiki", {}).get("title")
            p18 = ent.get("claims", {}).get("P18")
            if t and p18:
                v = p18[0]["mainsnak"].get("datavalue", {}).get("value")
                if v:
                    out[t] = v.replace(" ", "_")
    return out


# ------------------------------------------------------------------ Commons
FREE = re.compile(r"^(cc0|cc[- ]?zero|public domain|pd|cc[- ]by(-sa)?[- ]\d|ogl( v)?[ ]?[23])", re.I)
RACING = re.compile(r"formula|racing car|race car|racecar|grand prix|single-seater|\bf1\b|open-wheel", re.I)
NOT_PHOTO = re.compile(r"(^|[_\-\s(])(logo|map|layout|diagram|plan|track)([_\-\s).]|$)", re.I)


def photo_ok(sid, f):
    """Reject maps, logos and diagrams; events and places must be photographs (JPEG)."""
    low = f.lower()
    if NOT_PHOTO.search(low):
        return False
    if sid.startswith(("race-", "season-", "circuit-")) and not low.endswith((".jpg", ".jpeg")):
        return False
    return True


def clean_html(s):
    s = re.sub(r"<[^>]+>", "", s or "")
    return html.unescape(s).strip()


def clean_src(u):
    """Canonical upload.wikimedia.org URL without tracking parameters."""
    u = (u or "").split("?")[0]
    return u.replace("https://thumb.wikimedia.org/", "https://upload.wikimedia.org/")


def commons_info(files):
    out = {}
    for batch in chunks(sorted(set(files))):
        j = get(CM, {"action": "query", "format": "json", "prop": "imageinfo", "iiprop": "url|size|extmetadata", "iiurlwidth": 1280, "titles": "|".join("File:" + f for f in batch)})
        time.sleep(2)
        if not j:
            continue
        q = j.get("query", {})
        norm_map = {r["to"]: r["from"] for r in q.get("normalized", [])}
        for p in q.get("pages", {}).values():
            title = p.get("title", "")
            orig = norm_map.get(title, title)
            name = orig[5:] if orig.startswith("File:") else orig
            ii = (p.get("imageinfo") or [None])[0]
            if not ii:
                out[name] = None
                continue
            md = ii.get("extmetadata", {})
            lic = clean_html(md.get("LicenseShortName", {}).get("value"))
            out[name] = {
                "license": lic,
                "free": bool(FREE.match(lic or "")) and "nc" not in (lic or "").lower() and "nd" not in (lic or "").lower().split(),
                "credit": clean_html(md.get("Artist", {}).get("value"))[:120] or "Wikimedia Commons contributor",
                "desc": clean_html(md.get("ImageDescription", {}).get("value"))[:300],
                "src": clean_src(ii.get("thumburl") or ii.get("url")),
                "width": ii.get("thumbwidth") or ii.get("width"),
                "height": ii.get("thumbheight") or ii.get("height"),
                "sourceUrl": ii.get("descriptionurl"),
            }
        log(f"  commons {len(out)}")
    return out


# ------------------------------------------------------------------ subjects
def jolpica_paged(kind, key):
    out, offset = [], 0
    while True:
        j = get(f"{JOLPICA}/{kind}.json", {"limit": 100, "offset": offset})
        if not j:
            break
        out += j["MRData"][key[0]][key[1]]
        offset += 100
        if offset >= int(j["MRData"]["total"]):
            break
        time.sleep(1.2)
    return out


def wiki_title(url):
    return urllib.parse.unquote(url.split("/wiki/")[-1]).replace("_", " ") if url and "/wiki/" in url else None


def build_titles(idx):
    """Wikipedia article title per subject (cached on disk)."""
    titles = json.load(open(TITLES, encoding="utf8")) if os.path.exists(TITLES) else {}
    if not any(k.startswith("driver-") for k in titles):
        log("Jolpica driver/circuit links…")
        jd = jolpica_paged("drivers", ("DriverTable", "Drivers"))
        jc = jolpica_paged("circuits", ("CircuitTable", "Circuits"))
        by_name, by_dob = {}, {}
        for x in jd:
            by_name.setdefault(norm(x["givenName"] + x["familyName"]), x)
            by_dob.setdefault(norm(x["familyName"]) + x.get("dateOfBirth", ""), x)
        for d in idx["drivers"]:
            j = by_name.get(norm(d["name"])) or by_dob.get(norm(d.get("last", "")) + d.get("dob", ""))
            t = wiki_title(j.get("url")) if j else None
            if t:
                titles[f"driver-{d['id']}"] = t
        for c in idx["circuits"]:
            cand = [x for x in jc if abs(float(x["Location"]["lat"]) - c.get("lat", 0)) < 0.05 and abs(float(x["Location"]["long"]) - c.get("lng", 0)) < 0.05]
            t = wiki_title(cand[0].get("url")) if cand else None
            if t:
                titles[f"circuit-{c['id']}"] = t
        json.dump(titles, open(TITLES, "w", encoding="utf8"), ensure_ascii=False, indent=1)
    return titles


def main():
    kinds = sys.argv[1:] or ["drivers", "circuits", "chassis", "seasons", "races"]
    idx = json.load(open(os.path.join(ROOT, "data", "f1", "index.json"), encoding="utf8"))
    results = json.load(open(OUT, encoding="utf8")) if os.path.exists(OUT) else {}
    titles = build_titles(idx)

    subjects = {}  # sid -> (title, check)
    if "drivers" in kinds:
        for d in idx["drivers"]:
            if f"driver-{d['id']}" in titles:
                subjects[f"driver-{d['id']}"] = (titles[f"driver-{d['id']}"], None)
    if "circuits" in kinds:
        for c in idx["circuits"]:
            if f"circuit-{c['id']}" in titles:
                subjects[f"circuit-{c['id']}"] = (titles[f"circuit-{c['id']}"], None)
    if "chassis" in kinds:
        for ch in idx["chassis"]:
            subjects[f"chassis-{ch['id']}"] = (ch.get("full") or ch["name"], ("model", norm(ch["name"])))
    if "seasons" in kinds:
        for s in idx["seasons"]:
            subjects[f"season-{s['year']}"] = (f"{s['year']} Formula One season", ("year", str(s["year"])))
    if "races" in kinds:
        gps = {g["id"]: g for g in idx["grandsPrix"]}
        for y in range(1950, 2027):
            p = os.path.join(ROOT, "data", "f1", "seasons", f"{y}.json")
            if not os.path.exists(p):
                continue
            for r in json.load(open(p, encoding="utf8")).get("races", []):
                g = gps.get(r.get("gp"))
                name = (g or {}).get("full") or (g or {}).get("name")
                if name:
                    subjects[f"race-{y}-{r['slug']}"] = (f"{y} {name}", ("year", str(y)))

    todo = {sid: v for sid, v in subjects.items() if results.get(sid, {}).get("status") != "ok" or results[sid].get("v") != 3}
    log(len(subjects), "subjects;", len(todo), "to resolve")

    pi = page_images(sorted({t for t, _ in todo.values()}))
    # Wikidata fallback for people without a free lead image.
    # Wikidata P18 fallback when the article has no usable free lead image (people, places, car models).
    def usable(sid, t):
        f = (pi.get(t) or {}).get("file")
        return f and not f.lower().endswith((".svg", ".gif")) and photo_ok(sid, f)

    missing_people = sorted({t for sid, (t, _) in todo.items() if sid.startswith(("driver-", "circuit-", "chassis-")) and (pi.get(t) or {}).get("resolved") and not usable(sid, t)})
    p18 = wikidata_p18(missing_people) if missing_people else {}
    log(f"  wikidata P18 fallbacks: {len(p18)}")

    chosen = {}
    for sid, (title, check) in todo.items():
        r = pi.get(title) or {}
        f = r.get("file")
        if sid.startswith(("driver-", "circuit-", "chassis-")) and not usable(sid, title) and p18.get((r.get("resolved") or title)):
            f = p18[r.get("resolved") or title]
        if not r.get("resolved") and not f:
            results[sid] = {"status": "no-article", "title": title, "v": 3}
            continue
        if not f:
            results[sid] = {"status": "no-free-lead-image", "title": title, "v": 3}
            continue
        if f.lower().endswith((".svg", ".gif")):
            results[sid] = {"status": "skipped-svg", "title": title, "file": f, "v": 3}
            continue
        if not photo_ok(sid, f):
            results[sid] = {"status": "not-a-photo", "title": title, "file": f, "v": 3}
            continue
        if check:
            kind, token = check
            resolved = norm(r.get("resolved") or "")
            if kind == "model" and not RACING.search(r.get("desc") or ""):
                results[sid] = {"status": "not-a-racing-car-article", "title": title, "resolved": r.get("resolved"), "desc": r.get("desc"), "v": 3}
                continue
            if kind == "model" and token not in resolved and token not in norm(f):
                results[sid] = {"status": "different-subject", "title": title, "resolved": r.get("resolved"), "file": f, "v": 3}
                continue
            if kind == "year" and token not in (r.get("resolved") or ""):
                results[sid] = {"status": "different-subject", "title": title, "resolved": r.get("resolved"), "v": 3}
                continue
        chosen[sid] = (title, f, r.get("resolved"))

    info = commons_info([f for _, f, _ in chosen.values()])
    for sid, (title, f, resolved) in chosen.items():
        m = info.get(f) or info.get(f.replace("_", " "))
        if not m:
            results[sid] = {"status": "not-on-commons", "title": title, "file": f, "v": 3}
            continue
        if not m["free"]:
            results[sid] = {"status": "rejected-licence", "title": title, "file": f, "license": m["license"], "v": 3}
            continue
        results[sid] = {
            "status": "ok",
            "v": 3,
            "title": title,
            "article": "https://en.wikipedia.org/wiki/" + urllib.parse.quote((resolved or title).replace(" ", "_")),
            "file": f,
            "src": m["src"],
            "width": m["width"],
            "height": m["height"],
            "credit": m["credit"],
            "license": m["license"],
            "sourceUrl": m["sourceUrl"],
            "desc": m["desc"],
        }

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    json.dump(results, open(OUT, "w", encoding="utf8"), ensure_ascii=False, indent=1)
    from collections import Counter

    log(Counter((k.split("-")[0], v["status"]) for k, v in results.items()))


if __name__ == "__main__":
    main()
