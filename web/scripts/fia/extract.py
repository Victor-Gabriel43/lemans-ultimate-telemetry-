#!/usr/bin/env python3
"""
Article-level extraction of official FIA Formula One regulation PDFs.

For each selected document in data/regulations/catalog.json:
  1. download the original PDF from fia.com (cached locally, not committed),
  2. extract text page by page with `pdftotext -layout`,
  3. read the document's own table of contents to obtain the official article
     numbers and titles (e.g. "C4.6  Heat Hazard Mass Increase"),
  4. segment the body text at those article numbers, keeping the original
     wording, the PDF page and the printed page label.

Nothing is paraphrased or renumbered. Articles whose body cannot be located
are kept with `"text": null` and flagged, so gaps are visible.

Selection (to keep the repository small while supporting comparisons):
  * the latest issue of every (year, regulation kind), and
  * the first available issue of each kind for the newest two years,
    so initial publication vs. latest amendment can be compared.
Every other issue keeps its metadata and original PDF link.

Usage: python3 web/scripts/fia/extract.py [--cache DIR]
"""
import json
import os
import re
import subprocess
import sys
import time
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "..", "..", "data", "regulations")
CATALOG = os.path.join(DATA, "catalog.json")
DOCS_OUT = os.path.join(DATA, "docs")
CACHE = sys.argv[sys.argv.index("--cache") + 1] if "--cache" in sys.argv else os.path.join(HERE, ".cache")
UA = {"User-Agent": "Mozilla/5.0 (PaddockEncyclopedia; educational regulations archive)"}

NUM = r"(?:[A-F])?\d{1,2}(?:\.\d{1,2}){1,3}[a-z]?"
TOC_ARTICLE = re.compile(rf"^\s*({NUM})\s{{2,}}([^.].*?)(?:\s*[.…]{{3,}}\s*|\s{{2,}})?(\d{{1,3}})?\s*$")
TOC_CHAPTER = re.compile(r"^\s*(?:ARTICLE\s+([A-F]?\d{1,2})\s*[:.\-–]|(\d{1,2})\.)\s*(\S.*?)(?:\s*[.…‐]{3,}.*?|\s{2,})(\d{1,3})\s*$", re.I)
NUM_CHAPTER_BODY = re.compile(r"^\s{0,2}(\d{1,2})[.)]\s{2,}([A-Z][A-Z0-9 ,'’&\-–/()]{3,})\s*$")
BODY_CHAPTER = re.compile(r"^\s{0,4}ARTICLE\s+([A-F]?\d{1,2})\s*[:.\-–]\s*(\S.*?)\s*$", re.I)
BODY_NUMBERED = re.compile(rf"^\s{{0,4}}({NUM})\s{{2,}}(\S.*)$|^\s{{0,4}}({NUM})\s*$")


def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def doc_id(d):
    base = f"{d.get('year')}-{d.get('kind')}"
    if d.get("issue") is not None:
        base += f"-iss{d['issue']:02d}"
    if d.get("titleDate"):
        base += f"-{d['titleDate']}"
    return slug(base)


def download(url, path):
    if os.path.exists(path) and os.path.getsize(path) > 1000:
        return
    for attempt in range(5):
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=120) as r, open(path, "wb") as f:
                f.write(r.read())
            return
        except Exception as e:  # noqa: BLE001
            print("retry", url, e, file=sys.stderr)
            time.sleep(4 * (attempt + 1))
    raise RuntimeError(url)


def is_running_header_footer(line):
    l = line.strip()
    if not l:
        return False
    return bool(
        re.match(r"^SECTION [A-F]:", l)
        or "Fédération Internationale de l" in l
        or re.search(r"Formula (One|1) .*Regulations.*\d{4}$", l)
        or re.search(r"Formula (One|1) .*Regulations", l) and re.search(r"(January|February|March|April|May|June|July|August|September|October|November|December)", l)
        or re.match(r"^Issue \d+\s+[A-F]?\d+$", l)
        or re.search(r"Issue \d+\s+[A-F]\d+$", l)
        or re.match(r"^\d{1,3}/\d{1,3}$", l)
    )


def page_label(lines):
    for l in reversed(lines[-8:]):
        m = re.search(r"Regulations\s{2,}(\d{1,3})\s{2,}\S", l)
        if m:
            return m.group(1)
        m = re.search(r"(?:Issue \d+\s+)?([A-F]\d{1,3})\s*$", l.strip())
        if m and "Issue" in l:
            return m.group(1)
        m = re.match(r"^\s*(\d{1,3})/(\d{1,3})\s*$", l)
        if m:
            return m.group(1)
    return None


def extract(pdf):
    raw = subprocess.run(["pdftotext", "-layout", pdf, "-"], capture_output=True, text=True, check=True).stdout
    pages = raw.split("\f")
    if pages and not pages[-1].strip():
        pages = pages[:-1]
    return [p.split("\n") for p in pages]


def is_toc_page(lines):
    content = [l for l in lines if l.strip() and not is_running_header_footer(l)]
    if not content:
        return False
    hits = sum(1 for l in content if TOC_ARTICLE.match(l) or TOC_CHAPTER.match(l))
    return hits >= 4 and hits / len(content) >= 0.45


def toc_pages(pages):
    idx = [i for i, lines in enumerate(pages[:14]) if is_toc_page(lines)]
    if not idx:
        return []
    # contiguous run starting at the first TOC page
    run = [idx[0]]
    for i in idx[1:]:
        if i == run[-1] + 1:
            run.append(i)
        else:
            break
    return run


def parse_toc(pages):
    toc, chapters = [], []
    for pi in toc_pages(pages):
        for l in pages[pi]:
            if is_running_header_footer(l):
                continue
            m = TOC_CHAPTER.match(l)
            if m:
                chapters.append({"num": (m.group(1) or m.group(2)).upper(), "title": m.group(3).strip(" .")})
                continue
            m = TOC_ARTICLE.match(l)
            if m:
                title = re.sub(r"\s{2,}", " ", m.group(2)).strip(" .…")
                if 0 < len(title) < 120 and not title.endswith((",", ";")):
                    toc.append({"num": m.group(1), "title": title})
    seen, out = set(), []
    for t in toc:
        if t["num"] not in seen:
            seen.add(t["num"])
            out.append(t)
    return out, chapters


def reflow(lines):
    """Dedent and join soft-wrapped lines into paragraphs while keeping list items and sub-numbers."""
    body = [l.rstrip() for l in lines]
    while body and not body[0].strip():
        body.pop(0)
    while body and not body[-1].strip():
        body.pop()
    if not body:
        return ""
    indents = [len(l) - len(l.lstrip()) for l in body if l.strip()]
    base = min(indents) if indents else 0
    out = []
    marker = re.compile(rf"^({NUM}|[a-z]\)|[a-z]\.|[ivxl]+\.|[ivxl]+\)|\d+\.|•|-|–)\s")
    for l in body:
        if not l.strip():
            if out and out[-1] != "":
                out.append("")
            continue
        s = l[base:] if len(l) >= base else l.strip()
        if out and out[-1] and not marker.match(s.strip()) and not out[-1].rstrip().endswith((".", ":", ";")) and (len(s) - len(s.lstrip())) > 0:
            out[-1] = out[-1].rstrip() + " " + s.strip()
        else:
            out.append(s.rstrip())
    return "\n".join(out).strip()


def segment(pages, toc, chapters):
    # Flatten body with page info, skipping running headers/footers and the TOC pages.
    toc_nums = [t["num"] for t in toc]
    level2 = set(n for n in toc_nums)
    body = []  # (pdfPage, label, line)
    for pi, lines in enumerate(pages):
        label = page_label(lines)
        for l in lines:
            if is_running_header_footer(l):
                continue
            body.append((pi + 1, label, l))

    # first body occurrence of each heading, searching after TOC region
    tp = toc_pages(pages)
    toc_last_page = (tp[-1] + 1) if tp else 1
    start_idx = next((i for i, b in enumerate(body) if b[0] > toc_last_page), 0)
    para_mode = len(level2) == 0  # e.g. Financial Regulations: numbered paragraphs, no article titles
    heads = []  # (index, kind, num, rest[, subheading])
    for i in range(start_idx, len(body)):
        l = body[i][2]
        m = BODY_CHAPTER.match(l)
        if m and not TOC_CHAPTER.match(l):
            heads.append((i, "chapter", m.group(1).upper(), m.group(2).strip()))
            continue
        m = NUM_CHAPTER_BODY.match(l)
        if m:
            heads.append((i, "chapter", m.group(1), m.group(2).strip().title()))
            continue
        m = BODY_NUMBERED.match(l)
        if m:
            num = m.group(1) or m.group(3)
            if num in level2 or (para_mode and num.count(".") == 1):
                # in paragraph mode, a short heading line just above (e.g. "Scope") is the official sub-heading
                sub = None
                if para_mode:
                    j = i - 1
                    while j > start_idx and not body[j][2].strip():
                        j -= 1
                    cand = body[j][2].strip()
                    if cand and len(cand) < 70 and not cand.endswith((".", ";", ":", ",")) and not BODY_NUMBERED.match(body[j][2]) and not NUM_CHAPTER_BODY.match(body[j][2]):
                        sub = cand
                heads.append((i, "article", num, (m.group(2) or "").strip(), sub))
    # keep only first occurrence per article number in order
    seen, ordered = set(), []
    for h in heads:
        key = (h[1], h[2])
        if key in seen:
            continue
        seen.add(key)
        ordered.append(h)

    titles = {t["num"]: t["title"] for t in toc}
    chapter_titles = {c["num"]: c["title"] for c in chapters}
    articles = []
    current_chapter = None
    for k, h in enumerate(ordered):
        i, kind, num, rest = h[0], h[1], h[2], h[3]
        sub = h[4] if len(h) > 4 else None
        end = ordered[k + 1][0] if k + 1 < len(ordered) else len(body)
        if kind == "chapter":
            current_chapter = num
            chapter_titles.setdefault(num, rest)
            continue
        first_line_text = ""
        title = titles.get(num) or (sub if para_mode else rest)
        if para_mode:
            first_line_text = rest
        # if the heading line carries text that is not the title, keep it as the first paragraph
        if rest and titles.get(num) and rest.strip() != titles[num].strip():
            first_line_text = rest
        seg = [b[2] for b in body[i + 1 : end]]
        if para_mode and k + 1 < len(ordered) and len(ordered[k + 1]) > 4 and ordered[k + 1][4]:
            # drop the next paragraph's sub-heading line from the end of this one
            for back in range(len(seg) - 1, -1, -1):
                if seg[back].strip() == ordered[k + 1][4]:
                    seg = seg[:back]
                    break
        if first_line_text:
            seg = ["           " + first_line_text] + seg
        text = reflow(seg)
        articles.append(
            {
                "num": num,
                "title": title or None,
                "chapter": current_chapter,
                "pdfPage": body[i][0],
                "page": body[i][1],
                "text": text or None,
            }
        )
    found = {a["num"] for a in articles}
    missing = [t for t in toc if t["num"] not in found]
    for t in missing:
        articles.append({"num": t["num"], "title": t["title"], "chapter": None, "pdfPage": None, "page": None, "text": None, "unlocated": True})

    def sort_key(a):
        parts = re.findall(r"\d+", a["num"])
        return [int(p) for p in parts]

    articles.sort(key=sort_key)
    return articles, [{"num": c, "title": chapter_titles.get(c, "")} for c in chapter_titles]


def select(docs):
    by_key = {}
    for d in docs:
        if not d.get("year") or d.get("kind") in (None, "other"):
            continue
        by_key.setdefault((d["year"], d["kind"]), []).append(d)
    chosen = []
    newest = sorted({d["year"] for d in docs if d.get("year")})[-2:]
    for (year, kind), items in by_key.items():
        items.sort(key=lambda d: (d.get("issue") or 0, d.get("published") or ""))
        chosen.append(items[-1])
        if year in newest and len(items) > 1:
            chosen.append(items[0])
    return chosen


def main():
    os.makedirs(CACHE, exist_ok=True)
    os.makedirs(DOCS_OUT, exist_ok=True)
    catalog = json.load(open(CATALOG, encoding="utf8"))
    docs = catalog["documents"]
    for d in docs:
        d["id"] = doc_id(d)
    chosen = select(docs)
    chosen_ids = {d["id"] for d in chosen}
    report = []
    for d in chosen:
        pdf = os.path.join(CACHE, d["id"] + ".pdf")
        download(d["url"], pdf)
        pages = extract(pdf)
        toc, chapters = parse_toc(pages)
        articles, chapter_list = segment(pages, toc, chapters)
        located = sum(1 for a in articles if a.get("text"))
        rec = {
            "id": d["id"],
            "title": d["title"],
            "url": d["url"],
            "year": d.get("year"),
            "kind": d.get("kind"),
            "section": d.get("section"),
            "issue": d.get("issue"),
            "published": d.get("published"),
            "titleDate": d.get("titleDate"),
            "pages": len(pages),
            "language": "en",
            "chapters": chapter_list,
            "articles": articles,
            "extraction": {
                "method": "pdftotext -layout; titles from the document's table of contents",
                "articlesInToc": len(toc),
                "articlesLocated": located,
            },
        }
        with open(os.path.join(DOCS_OUT, d["id"] + ".json"), "w", encoding="utf8") as f:
            json.dump(rec, f, ensure_ascii=False)
        report.append((d["id"], len(pages), len(toc), located))
        print(f"{d['id']}: {len(pages)}pp, toc {len(toc)}, located {located}", file=sys.stderr)
        time.sleep(0.5)
    for d in docs:
        d["indexed"] = d["id"] in chosen_ids
    catalog["documents"] = docs
    with open(CATALOG, "w", encoding="utf8") as f:
        json.dump(catalog, f, ensure_ascii=False, indent=1)


if __name__ == "__main__":
    main()
