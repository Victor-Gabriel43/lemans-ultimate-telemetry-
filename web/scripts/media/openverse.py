#!/usr/bin/env python3
"""
Second photo source: Openverse (openverse.org) — an open catalogue of
freely licensed images from Flickr, Wikimedia Commons and other collections.

Used only for subjects that still have no verified photograph. Rules:
  * licence must be CC BY, CC BY-SA, CC0 or Public Domain Mark;
  * drivers: the photo title must contain the driver's full name, and no
    list of other people ("and", "&", commas) — one subject per photo;
  * cars: the title must contain the constructor and the chassis designation;
  * no helmets, models, toys, statues, posters or autographs.

Anonymous Openverse access is rate limited, so subjects are processed in order
of importance and the run stops cleanly at the first hard limit (resumable).

Usage: python3 web/scripts/media/openverse.py [max_requests]
"""
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
UA = {"User-Agent": "PaddockEncyclopedia/0.3 (educational F1 encyclopedia)"}
API = "https://api.openverse.org/v1/images/"
LICENCES = {"by": "CC BY", "by-sa": "CC BY-SA", "cc0": "CC0", "pdm": "Public domain"}
BAD = re.compile(r"\b(helmet|model|lego|toy|diecast|die-cast|scale|1:\d+|statue|sculpture|poster|autograph|signature|signed|card|replica|kart|grave|tomb|museum shop|sticker|livery concept)\b", re.I)
MULTI = re.compile(r"\b(and|und|et|e|y)\b|&|,|\bwith\b|\bvs\.?\b", re.I)


def norm(s):
    s = unicodedata.normalize("NFD", str(s or "")).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]", "", s)


def words(s):
    s = unicodedata.normalize("NFD", str(s or "")).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9 ]", " ", s)


class Limited(Exception):
    pass


def search(q):
    url = API + "?" + urllib.parse.urlencode({"q": q, "license": ",".join(LICENCES), "page_size": 20, "mature": "false"})
    for attempt in range(3):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=40) as r:
                return json.loads(r.read().decode())
        except urllib.error.HTTPError as e:
            if e.code == 429:
                ra = e.headers.get("Retry-After")
                if ra and ra.isdigit() and int(ra) <= 90:
                    time.sleep(int(ra) + 1)
                    continue
                raise Limited(f"429 retry-after={ra}")
            return None
        except Exception:  # noqa: BLE001
            time.sleep(5)
    return None


def commons_sized(url, width):
    m = re.match(r"https://upload\.wikimedia\.org/wikipedia/commons/(\w)/(\w\w)/([^/]+)$", url)
    if m and width and width > 1280:
        return f"https://upload.wikimedia.org/wikipedia/commons/thumb/{m[1]}/{m[2]}/{m[3]}/1280px-{m[3]}"
    return url


def pick(results, accept):
    for r in results or []:
        title = r.get("title") or ""
        if r.get("license") not in LICENCES or BAD.search(title) or not accept(title):
            continue
        url = r.get("url") or ""
        if not url.lower().split("?")[0].endswith((".jpg", ".jpeg", ".png", ".webp")) and "staticflickr" not in url:
            continue
        lic = LICENCES[r["license"]] + (f" {r['license_version']}" if r.get("license_version") and r["license"] not in ("cc0", "pdm") else "")
        return {
            "status": "ok",
            "v": 3,
            "via": "openverse",
            "title": title,
            "file": title,
            "src": commons_sized(url, r.get("width")),
            "width": r.get("width"),
            "height": r.get("height"),
            "credit": (r.get("creator") or r.get("source") or "Unknown")[:120],
            "license": lic,
            "sourceUrl": r.get("foreign_landing_url") or url,
            "provider": r.get("source"),
        }
    return None


def main():
    budget = int(sys.argv[1]) if len(sys.argv) > 1 else 180
    idx = json.load(open(os.path.join(ROOT, "data", "f1", "index.json"), encoding="utf8"))
    res = json.load(open(OUT, encoding="utf8"))
    ctors = {c["id"]: c["name"] for c in idx["constructors"]}
    champs = {s.get("champion") for s in idx["seasons"]}
    champ_years = {s["year"]: s.get("constructorChampion") for s in idx["seasons"]}

    tasks = []
    for d in idx["drivers"]:
        sid = f"driver-{d['id']}"
        if res.get(sid, {}).get("status") == "ok" or res.get(sid, {}).get("ov") == 1:
            continue
        score = (d["id"] in champs) * 10000 + d.get("active", False) * 5000 + d["st"]["wins"] * 50 + d["st"]["starts"]
        name = d["name"]
        tasks.append((score, sid, f"{name} Formula 1", lambda t, n=name: norm(n) in norm(t) and not MULTI.search(words(t).replace(words(n), " "))))
    for ch in idx["chassis"]:
        sid = f"chassis-{ch['id']}"
        if res.get(sid, {}).get("status") == "ok" or res.get(sid, {}).get("ov") == 1:
            continue
        brand = ctors.get(ch["c"], "")
        model = str(ch["name"])
        champion = any(champ_years.get(y) == ch["c"] for y in ch["years"])
        score = champion * 8000 + ch.get("wins", 0) * 100 + len(ch.get("years", [])) * 5
        if score < 5:
            continue
        tasks.append((score, sid, f"{brand} {model}", lambda t, b=brand, m=model: norm(m) in norm(t) and norm(b.split()[0]) in norm(t)))
    tasks.sort(key=lambda x: -x[0])
    print(len(tasks), "subjects without a photo; budget", budget, file=sys.stderr)

    found = 0
    try:
        for i, (_, sid, q, accept) in enumerate(tasks[:budget]):
            j = search(q)
            hit = pick((j or {}).get("results"), accept)
            if hit:
                res[sid] = hit
                found += 1
                print(f"[{i + 1}] {sid}: {hit['title'][:60]} ({hit['license']}, {hit['provider']})", file=sys.stderr)
            else:
                res.setdefault(sid, {})["ov"] = 1  # searched, nothing acceptable
            if (i + 1) % 10 == 0:
                json.dump(res, open(OUT, "w", encoding="utf8"), ensure_ascii=False, indent=1)
            time.sleep(3.2)
    except Limited as e:
        print("stopped:", e, file=sys.stderr)
    json.dump(res, open(OUT, "w", encoding="utf8"), ensure_ascii=False, indent=1)
    print("found", found, file=sys.stderr)


if __name__ == "__main__":
    main()
