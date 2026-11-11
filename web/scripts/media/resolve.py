#!/usr/bin/env python3
"""
Resolve licensed photographs for Paddock subjects from Wikimedia Commons.

Approach (subject accuracy first):
  * The subject's own Wikipedia article is identified from the Jolpica F1 API
    (which stores the Wikipedia URL of each driver, constructor and circuit),
    or from an explicit title for landmark cars.
  * Only the article's *lead image* is used — the image the encyclopedia
    itself chose to depict that subject. No similarity search, no guessing.
  * The file's licence and author are read from its Commons description page.
    Only free licences are accepted: CC0, public domain, CC BY, CC BY-SA.
    Anything else (fair use, logos, unclear licences) is rejected.
  * SVG lead images (maps, logos) are skipped.

Output: web/data/media/resolved.json — merged into the media registry.
The run is resumable and deliberately slow to respect Wikimedia rate limits.

Usage: python3 web/scripts/media/resolve.py
"""
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..", "..")
OUT = os.path.join(ROOT, "data", "media", "resolved.json")
UA = {"User-Agent": "PaddockEncyclopedia/0.2 (educational F1 encyclopedia; low-rate image licence lookup)"}
JOLPICA = "https://api.jolpi.ca/ergast/f1"
DELAY = float(os.environ.get("DELAY", "4"))

FREE = [
    (r"\{\{\s*cc-zero", "CC0 1.0"),
    (r"\{\{\s*cc0", "CC0 1.0"),
    (r"\{\{\s*cc-by-sa-(\d\.\d)", "CC BY-SA {}"),
    (r"\{\{\s*cc-by-(\d\.\d)", "CC BY {}"),
    (r"\{\{\s*PD-[^}|]*", "Public domain"),
    (r"\{\{\s*self\|[^}]*cc-by-sa-(\d\.\d)", "CC BY-SA {}"),
    (r"\{\{\s*self\|[^}]*cc-by-(\d\.\d)", "CC BY {}"),
    (r"\{\{\s*self\|[^}]*cc-zero", "CC0 1.0"),
    (r"\{\{\s*self\|[^}]*PD-self", "Public domain"),
    (r"\{\{\s*GFDL[^}]*\|\s*cc-by-sa-(\d\.\d)", "CC BY-SA {}"),
]


def get(url, raw=False, tries=6):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=40) as r:
                data = r.read().decode("utf-8", "replace")
                return data if raw else json.loads(data)
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return None
            wait = DELAY * (3 ** i)
            print(f"  {e.code} -> wait {wait:.0f}s", file=sys.stderr)
            time.sleep(min(wait, 300))
        except Exception as e:  # noqa: BLE001
            print("  err", e, file=sys.stderr)
            time.sleep(DELAY * (i + 1))
    return None


def jolpica_paged(kind, key):
    out, offset = [], 0
    while True:
        j = get(f"{JOLPICA}/{kind}.json?limit=100&offset={offset}")
        if not j:
            break
        items = j["MRData"][key[0]][key[1]]
        out += items
        offset += 100
        if offset >= int(j["MRData"]["total"]):
            break
        time.sleep(1.2)
    return out


def norm(s):
    import unicodedata

    s = unicodedata.normalize("NFD", s or "").encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z]", "", s)


def licence(wikitext):
    for pat, label in FREE:
        m = re.search(pat, wikitext, re.I)
        if m:
            return label.format(*m.groups()) if "{}" in label else label
    return None


def author(wikitext):
    m = re.search(r"\|\s*[Aa]uthor\s*=\s*(.+)", wikitext)
    if not m:
        return None
    a = m.group(1).strip()
    a = re.sub(r"\[https?://\S+\s+([^\]]+)\]", r"\1", a)
    a = re.sub(r"\[\[(?:[^|\]]*\|)?([^\]]+)\]\]", r"\1", a)
    a = re.sub(r"\{\{[^}]*\}\}", "", a)
    a = re.sub(r"<[^>]+>", "", a)
    a = a.strip(" |")
    return a[:120] or None


def lead_image(title):
    s = get(f"https://en.wikipedia.org/api/rest_v1/page/summary/{urllib.parse.quote(title.replace(' ', '_'), safe='')}")
    if not s or "originalimage" not in s:
        return None
    src = s["originalimage"]["source"].split("?")[0]
    fname = urllib.parse.unquote(src.split("/")[-1])
    if fname.lower().endswith(".svg"):
        return None
    thumb = (s.get("thumbnail", {}).get("source") or "").split("?")[0] or None
    return {"file": fname, "original": src, "thumb": thumb, "w": s["originalimage"].get("width"), "h": s["originalimage"].get("height"), "article": s.get("content_urls", {}).get("desktop", {}).get("page")}


def resolve(subject_id, title, results):
    if subject_id in results:
        return
    img = lead_image(title)
    time.sleep(DELAY)
    if not img:
        results[subject_id] = {"status": "no-lead-image", "title": title}
        return
    wt = get(f"https://commons.wikimedia.org/w/index.php?title=File:{urllib.parse.quote(img['file'])}&action=raw", raw=True)
    time.sleep(DELAY)
    if not wt:
        results[subject_id] = {"status": "not-on-commons", "title": title, "file": img["file"]}
        return
    lic = licence(wt)
    if not lic:
        results[subject_id] = {"status": "rejected-licence", "title": title, "file": img["file"]}
        return
    thumb = img["thumb"]
    if thumb and re.search(r"/\d+px-", thumb):
        thumb = re.sub(r"/\d+px-", "/960px-", thumb)
    results[subject_id] = {
        "status": "ok",
        "title": title,
        "file": img["file"],
        "src": thumb or img["original"],
        "width": img["w"],
        "height": img["h"],
        "credit": author(wt) or "Wikimedia Commons contributor",
        "license": lic,
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:" + urllib.parse.quote(img["file"].replace(" ", "_")),
        "article": img["article"],
    }


def save(results):
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf8") as f:
        json.dump(results, f, ensure_ascii=False, indent=1)


def main():
    idx = json.load(open(os.path.join(ROOT, "data", "f1", "index.json"), encoding="utf8"))
    results = json.load(open(OUT, encoding="utf8")) if os.path.exists(OUT) else {}

    # Subject list, highest value first.
    champions = {s.get("champion") for s in idx["seasons"] if s.get("champion")}
    drivers = sorted(idx["drivers"], key=lambda d: (-(d["id"] in champions), -d.get("active", False), -d["st"]["wins"], -d["st"]["starts"]))
    wanted_drivers = [d for d in drivers if d["id"] in champions or d.get("active") or d["st"]["wins"] > 0 or d["st"]["starts"] >= 50]

    print("Jolpica Wikipedia links…", file=sys.stderr)
    jd = jolpica_paged("drivers", ("DriverTable", "Drivers"))
    jc = jolpica_paged("circuits", ("CircuitTable", "Circuits"))
    by_name = {}
    for x in jd:
        by_name.setdefault(norm(x["givenName"] + x["familyName"]), x)
        by_name.setdefault(norm(x["familyName"]) + x.get("dateOfBirth", ""), x)

    tasks = []
    for d in wanted_drivers:
        j = by_name.get(norm(d["name"])) or by_name.get(norm(d.get("last", "")) + d.get("dob", ""))
        if j and j.get("url"):
            title = urllib.parse.unquote(j["url"].split("/wiki/")[-1]).replace("_", " ")
            tasks.append((f"driver-{d['id']}", title))
    for c in idx["circuits"]:
        cand = [x for x in jc if abs(float(x["Location"]["lat"]) - c.get("lat", 0)) < 0.05 and abs(float(x["Location"]["long"]) - c.get("lng", 0)) < 0.05]
        if cand and cand[0].get("url"):
            title = urllib.parse.unquote(cand[0]["url"].split("/wiki/")[-1]).replace("_", " ")
            tasks.append((f"circuit-{c['id']}", title))
    # Championship-winning and landmark cars: article title = chassis full name.
    champ_years = {s["year"]: s.get("constructorChampion") for s in idx["seasons"]}
    for ch in idx["chassis"]:
        if ch.get("wins", 0) >= 3 or any(champ_years.get(y) == ch["c"] for y in ch["years"]):
            tasks.append((f"chassis-{ch['id']}", ch.get("full") or ch["name"]))

    print(len(tasks), "subjects;", len(results), "already resolved", file=sys.stderr)
    for i, (sid, title) in enumerate(tasks):
        if sid in results:
            continue
        resolve(sid, title, results)
        r = results[sid]
        print(f"[{i + 1}/{len(tasks)}] {sid}: {r['status']} {r.get('license', '')}", file=sys.stderr)
        if i % 5 == 0:
            save(results)
    save(results)
    ok = sum(1 for r in results.values() if r["status"] == "ok")
    print(f"done: {ok} licensed images of {len(results)} subjects", file=sys.stderr)


if __name__ == "__main__":
    main()
