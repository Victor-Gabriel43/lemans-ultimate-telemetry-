#!/usr/bin/env python3
"""
Harvest the FIA Formula One regulations listing (https://www.fia.com/regulation/category/110).

Collects every listed document (all pages, all groupings) with its exact
title, group heading, publication date and original PDF URL, and parses the
structured parts of the official title (championship year, section, issue,
date). Nothing is inferred beyond what the FIA title states.

Output: web/data/regulations/catalog.json
Usage:  python3 web/scripts/fia/harvest.py
"""
import html
import json
import os
import re
import sys
import time
import urllib.request
from datetime import datetime, timezone

BASE = "https://www.fia.com/regulation/category/110"
OUT = os.path.join(os.path.dirname(__file__), "..", "..", "data", "regulations", "catalog.json")
UA = {"User-Agent": "Mozilla/5.0 (PaddockEncyclopedia; educational regulations archive)"}


def fetch(url):
    for attempt in range(5):
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=60) as r:
                return r.read().decode("utf-8", "replace")
        except Exception as e:  # noqa: BLE001
            print("retry", url, e, file=sys.stderr)
            time.sleep(3 * (attempt + 1))
    raise RuntimeError(url)


ITEM = re.compile(
    r'<a href="(?P<url>[^"]+\.pdf)"[^>]*>.*?<div class="title">(?P<title>.*?)</div>.*?'
    r'(?:<span class="date-display-single">(?P<pub>[^<]+)</span>)?.*?</a>',
    re.S,
)
GROUP = re.compile(r'<div class="view-grouping-header">(.*?)</div>', re.S)

SECTIONS = {
    "A": "General Provisions",
    "B": "Sporting",
    "C": "Technical",
    "D": "Financial – Teams",
    "E": "Financial – Power Unit Manufacturers",
    "F": "Operational",
}


def parse_title(t):
    """Extract only what the official title states explicitly."""
    info = {}
    m = re.search(r"\b(20\d{2}|19\d{2})\b", t)
    if m:
        info["year"] = int(m.group(1))
    m = re.search(r"Section\s+([A-F])\b", t, re.I)
    if m:
        info["section"] = m.group(1).upper()
    m = re.search(r"\[([^\]]+)\]", t)
    if m:
        info["sectionName"] = m.group(1).strip()
    m = re.search(r"\bIss(?:ue)?\.?\s*0*(\d+)", t, re.I)
    if m:
        info["issue"] = int(m.group(1))
    dates = re.findall(r"(\d{4}-\d{2}-\d{2})", t)
    if dates:
        info["titleDate"] = dates[-1]
    low = t.lower()
    if "sporting" in low:
        info["kind"] = "sporting"
    elif "technical" in low:
        info["kind"] = "technical"
    elif "power unit" in low or "pu manufacturers" in low:
        info["kind"] = "financial-pu"
    elif "financial" in low:
        info["kind"] = "financial"
    elif "operational" in low:
        info["kind"] = "operational"
    elif "general provisions" in low or "section a" in low:
        info["kind"] = "general"
    else:
        info["kind"] = "other"
    return info


def main():
    docs = {}
    page = 0
    while True:
        url = BASE if page == 0 else f"{BASE}?page={page}"
        s = fetch(url)
        # split by grouping headers to keep the FIA's own grouping label
        positions = [(m.start(), html.unescape(re.sub("<[^>]+>", "", m.group(1))).strip()) for m in GROUP.finditer(s)]
        found = 0
        for m in ITEM.finditer(s):
            group = None
            for pos, label in positions:
                if pos < m.start():
                    group = label
            href = html.unescape(m.group("url"))
            if href.startswith("/"):
                href = "https://www.fia.com" + href
            title = re.sub(r"\s+", " ", html.unescape(re.sub("<[^>]+>", "", m.group("title")))).strip()
            pub = m.group("pub")
            pub_iso = None
            if pub:
                try:
                    pub_iso = datetime.strptime(pub.strip(), "%d.%m.%y").date().isoformat()
                except ValueError:
                    pub_iso = None
            if href in docs:
                continue
            found += 1
            docs[href] = {"title": title, "url": href, "group": group, "published": pub_iso, **parse_title(title)}
        print(f"page {page}: {found} new", file=sys.stderr)
        if found == 0 and page > 0:
            break
        if f"?page={page + 1}" not in s:
            break
        page += 1
        time.sleep(1.5)

    out = {
        "source": BASE,
        "harvestedAt": datetime.now(timezone.utc).isoformat(),
        "documents": sorted(docs.values(), key=lambda d: (-(d.get("year") or 0), d.get("section") or "Z", -(d.get("issue") or 0))),
    }
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf8") as f:
        json.dump(out, f, ensure_ascii=False, indent=1)
    years = {}
    for d in out["documents"]:
        years[d.get("year")] = years.get(d.get("year"), 0) + 1
    print(len(docs), "documents", dict(sorted(years.items(), key=lambda x: str(x[0]))), file=sys.stderr)


if __name__ == "__main__":
    main()
