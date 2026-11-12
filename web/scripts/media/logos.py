#!/usr/bin/env python3
"""
Team logos from Wikidata (property P154, "logo image") — the logo file the
team's own Wikidata item points to, hosted on Wikimedia Commons.

  * the team's Wikipedia article comes from the Jolpica F1 API (constructor URL);
  * when an item lists several logos, the current one is chosen (no end date,
    most recent start date);
  * licence and source are read from Commons. Logos are trademarks of their
    owners; they are shown only to identify each team.

Output: web/data/media/logos.json  { constructorId: {src, file, license, sourceUrl} }
Usage:  python3 web/scripts/media/logos.py
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
OUT = os.path.join(ROOT, "data", "media", "logos.json")
UA = {"User-Agent": "PaddockEncyclopedia/0.3 (educational F1 encyclopedia; team logos)"}


def get(url, params):
    url += "?" + urllib.parse.urlencode(params)
    wait = 5
    for _ in range(10):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r:
                return json.loads(r.read().decode())
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return None
            time.sleep(max(int(e.headers.get("Retry-After") or 0), wait))
            wait = min(wait * 2, 120)
        except Exception:  # noqa: BLE001
            time.sleep(wait)
    return None


def norm(s):
    s = unicodedata.normalize("NFD", str(s or "")).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]", "", s)


def main():
    idx = json.load(open(os.path.join(ROOT, "data", "f1", "index.json"), encoding="utf8"))
    # Jolpica constructor -> Wikipedia title
    jc, off = [], 0
    while True:
        j = get("https://api.jolpi.ca/ergast/f1/constructors.json", {"limit": 100, "offset": off})
        if not j:
            break
        jc += j["MRData"]["ConstructorTable"]["Constructors"]
        off += 100
        if off >= int(j["MRData"]["total"]):
            break
        time.sleep(1.2)
    by_name = {norm(c["name"]): c for c in jc}
    by_id = {c["constructorId"].replace("_", "-"): c for c in jc}
    titles = {}
    for c in idx["constructors"]:
        m = by_id.get(c["id"]) or by_name.get(norm(c["name"]))
        if m and "/wiki/" in (m.get("url") or ""):
            titles[c["id"]] = urllib.parse.unquote(m["url"].split("/wiki/")[-1]).replace("_", " ")
    print(len(titles), "constructors with a Wikipedia article", file=sys.stderr)

    # Wikidata P154 (logo)
    logo_of = {}
    items = list(titles.items())
    for i in range(0, len(items), 50):
        batch = items[i : i + 50]
        j = get("https://www.wikidata.org/w/api.php", {"action": "wbgetentities", "format": "json", "sites": "enwiki", "props": "claims|sitelinks", "titles": "|".join(t for _, t in batch)})
        time.sleep(2)
        if not j:
            continue
        by_title = {}
        for ent in j.get("entities", {}).values():
            t = ent.get("sitelinks", {}).get("enwiki", {}).get("title")
            claims = ent.get("claims", {}).get("P154") or []
            best, best_start = None, ""
            for cl in claims:
                if cl.get("rank") == "deprecated":
                    continue
                v = cl["mainsnak"].get("datavalue", {}).get("value")
                q = cl.get("qualifiers", {})
                if q.get("P582"):  # has an end date: an old logo
                    continue
                start = (q.get("P580") or [{}])[0].get("datavalue", {}).get("value", {}).get("time", "")
                if v and (best is None or start > best_start or cl.get("rank") == "preferred"):
                    best, best_start = v, start
            if t and best:
                by_title[t] = best
        # titles may be redirected: match by normalised title
        nt = {norm(k): v for k, v in by_title.items()}
        for cid, t in batch:
            v = by_title.get(t) or nt.get(norm(t))
            if v:
                logo_of[cid] = v
    print(len(logo_of), "logos on Wikidata", file=sys.stderr)

    # Commons file info
    out = {}
    files = sorted(set(logo_of.values()))
    info = {}
    for i in range(0, len(files), 40):
        batch = files[i : i + 40]
        j = get("https://commons.wikimedia.org/w/api.php", {"action": "query", "format": "json", "prop": "imageinfo", "iiprop": "url|size|extmetadata", "iiurlwidth": 600, "titles": "|".join("File:" + f for f in batch)})
        time.sleep(2)
        if not j:
            continue
        q = j.get("query", {})
        normmap = {r["to"]: r["from"] for r in q.get("normalized", [])}
        for p in q.get("pages", {}).values():
            ii = (p.get("imageinfo") or [None])[0]
            if not ii:
                continue
            name = normmap.get(p["title"], p["title"])[5:]
            md = ii.get("extmetadata", {})
            svg = ii["url"].lower().endswith(".svg")
            info[name] = {
                "src": (ii["url"] if svg else (ii.get("thumburl") or ii["url"])).split("?")[0].replace("thumb.wikimedia.org", "upload.wikimedia.org"),
                "license": html.unescape(re.sub("<[^>]+>", "", md.get("LicenseShortName", {}).get("value", ""))),
                "sourceUrl": ii.get("descriptionurl"),
                "width": ii.get("width"),
                "height": ii.get("height"),
            }
    for cid, f in logo_of.items():
        m = info.get(f) or info.get(f.replace("_", " "))
        if m:
            out[cid] = {"file": f, **m}
    json.dump(out, open(OUT, "w", encoding="utf8"), ensure_ascii=False, indent=1)
    print(len(out), "logos saved", file=sys.stderr)


if __name__ == "__main__":
    main()
