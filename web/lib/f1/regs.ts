import "server-only";
import fs from "node:fs";
import path from "node:path";

/* ---------------------------------------------------------------------------
 * FIA regulations archive — catalog (all issues listed by the FIA) and
 * article-level texts for indexed issues (see scripts/fia/*).
 * ------------------------------------------------------------------------- */
export type RegKind = "general" | "sporting" | "technical" | "financial" | "financial-pu" | "operational" | "other";
export const KIND_ORDER: RegKind[] = ["general", "sporting", "technical", "financial", "financial-pu", "operational", "other"];

export type CatalogDoc = {
  id: string;
  title: string;
  url: string;
  group?: string;
  published?: string;
  year?: number;
  section?: string;
  sectionName?: string;
  issue?: number;
  titleDate?: string;
  kind: RegKind;
  indexed?: boolean;
};
export type Article = { num: string; title: string | null; chapter: string | null; pdfPage: number | null; page: string | null; text: string | null; unlocated?: boolean };
export type RegDoc = {
  id: string;
  title: string;
  url: string;
  year: number;
  kind: RegKind;
  section?: string;
  issue?: number;
  published?: string;
  titleDate?: string;
  pages: number;
  language: string;
  chapters: { num: string; title: string }[];
  articles: Article[];
  extraction: { method: string; articlesInToc: number; articlesLocated: number };
};
type Catalog = { source: string; harvestedAt: string; documents: CatalogDoc[] };

const DIR = path.join(process.cwd(), "data", "regulations");
let _cat: Catalog | null = null;
const _docs = new Map<string, RegDoc>();

export function catalog(): Catalog {
  if (!_cat) _cat = JSON.parse(fs.readFileSync(path.join(DIR, "catalog.json"), "utf8")) as Catalog;
  return _cat;
}
export const FIRST_REG_YEAR = 1950;
export function lastRegYear() {
  return Math.max(...catalog().documents.map((d) => d.year ?? 0));
}
export function docsForYear(year: number) {
  return catalog()
    .documents.filter((d) => d.year === year)
    .sort((a, b) => KIND_ORDER.indexOf(a.kind) - KIND_ORDER.indexOf(b.kind) || (b.issue ?? 0) - (a.issue ?? 0) || (b.published ?? "").localeCompare(a.published ?? ""));
}
export function yearsWithDocs() {
  return [...new Set(catalog().documents.map((d) => d.year).filter((y): y is number => !!y))].sort((a, b) => a - b);
}
export function catalogDoc(id: string) {
  return catalog().documents.find((d) => d.id === id);
}
export function doc(id: string): RegDoc | undefined {
  if (!_docs.has(id)) {
    const p = path.join(DIR, "docs", `${id}.json`);
    if (!fs.existsSync(p)) return undefined;
    _docs.set(id, JSON.parse(fs.readFileSync(p, "utf8")));
  }
  return _docs.get(id);
}
export function indexedDocs(): CatalogDoc[] {
  return catalog().documents.filter((d) => d.indexed);
}
/** Latest indexed document of a kind for a year. */
export function latestIndexed(year: number, kind: RegKind) {
  return indexedDocs()
    .filter((d) => d.year === year && d.kind === kind)
    .sort((a, b) => (b.issue ?? 0) - (a.issue ?? 0) || (b.published ?? "").localeCompare(a.published ?? ""))[0];
}
/** Other catalogue issues of the same regulation (same year and kind). */
export function siblings(d: CatalogDoc) {
  return catalog()
    .documents.filter((x) => x.year === d.year && x.kind === d.kind)
    .sort((a, b) => (b.issue ?? 0) - (a.issue ?? 0) || (b.published ?? "").localeCompare(a.published ?? ""));
}
export function article(d: RegDoc, num: string) {
  return d.articles.find((a) => a.num === num);
}
/** Chapters that belong to the document's own numbering (filters appendix noise). */
export function mainChapters(d: RegDoc) {
  const prefix = d.section;
  return d.chapters.filter((c) => (prefix ? c.num.startsWith(prefix) : /^\d+$/.test(c.num)));
}

/** Resolve a {year, kind, num} reference to the latest indexed article. */
export function resolveRef(ref: { year: number; kind: string; num: string }) {
  const cd = latestIndexed(ref.year, ref.kind as RegKind);
  if (!cd) return undefined;
  const d = doc(cd.id);
  const a = d && article(d, ref.num);
  return d && a ? { doc: d, article: a } : undefined;
}

/* ---------------------------------------------------------------------------
 * Article search
 * ------------------------------------------------------------------------- */
export type SearchHit = { docId: string; year: number; kind: RegKind; issue?: number; docTitle: string; num: string; title: string | null; page: number | null; snippet: string; score: number };

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

export function searchArticles(q: string, opts: { year?: number; kind?: string; limit?: number } = {}): { hits: SearchHit[]; total: number } {
  const query = q.trim();
  if (!query) return { hits: [], total: 0 };
  const phrases = [...query.matchAll(/"([^"]+)"|“([^”]+)”/g)].map((m) => norm(m[1] ?? m[2]));
  const rest = norm(query.replace(/"[^"]+"|“[^”]+”/g, " "));
  const words = rest.split(/\s+/).filter((w) => w.length > 1);
  const numLike = /^[a-f]?\d{1,2}(\.\d{1,2}){0,3}$/i.test(query.trim());
  const hits: SearchHit[] = [];
  for (const cd of indexedDocs()) {
    if (opts.year && cd.year !== opts.year) continue;
    if (opts.kind && cd.kind !== opts.kind) continue;
    const d = doc(cd.id);
    if (!d) continue;
    for (const a of d.articles) {
      let score = 0;
      const numN = a.num.toLowerCase();
      if (numLike) {
        const qn = query.trim().toLowerCase();
        if (numN === qn || numN.replace(/^[a-f]/, "") === qn.replace(/^[a-f]/, "")) score += 100;
        else if (numN.startsWith(`${qn}.`)) score += 20;
        else continue;
      }
      const title = norm(a.title ?? "");
      const body = norm(a.text ?? "");
      if (!numLike) {
        if (phrases.some((p) => !title.includes(p) && !body.includes(p))) continue;
        if (words.some((w) => !title.includes(w) && !body.includes(w))) continue;
        score += phrases.length * 5;
        for (const w of words) {
          if (title.includes(w)) score += 10;
          score += Math.min(5, body.split(w).length - 1);
        }
      }
      // newer documents first among equals
      score += (d.year - 2000) / 100;
      const needle = phrases[0] ?? words[0];
      let snippet = "";
      if (a.text) {
        const i = needle ? norm(a.text).indexOf(needle) : -1;
        const start = Math.max(0, (i < 0 ? 0 : i) - 80);
        snippet = (start > 0 ? "…" : "") + a.text.slice(start, start + 260).replace(/\s+/g, " ") + "…";
      }
      hits.push({ docId: d.id, year: d.year, kind: d.kind, issue: d.issue, docTitle: d.title, num: a.num, title: a.title, page: a.pdfPage, snippet, score });
    }
  }
  hits.sort((a, b) => b.score - a.score);
  const limit = opts.limit ?? 60;
  return { hits: hits.slice(0, limit), total: hits.length };
}

/* ---------------------------------------------------------------------------
 * Comparison — structural & semantic pairing, then word-level diff.
 * ------------------------------------------------------------------------- */
export type DiffPart = { t: "=" | "+" | "-"; s: string };
export type ComparedArticle = {
  status: "changed" | "added" | "removed" | "unchanged";
  match?: "number" | "title" | "number-only";
  a?: Article;
  b?: Article;
  diff?: DiffPart[];
};

const tnorm = (s: string | null) => norm(s ?? "").replace(/[^a-z0-9 ]/g, "").trim();
const strip = (n: string) => n.replace(/^[a-f]/i, "");

function wordDiff(a: string, b: string): DiffPart[] {
  const A = a.split(/(\s+)/);
  const B = b.split(/(\s+)/);
  const n = A.length;
  const m = B.length;
  if (n * m > 4_000_000) {
    return [{ t: "-", s: a }, { t: "+", s: b }];
  }
  const dp: Uint16Array[] = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) dp[i][j] = A[i] === B[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const out: DiffPart[] = [];
  const push = (t: DiffPart["t"], s: string) => {
    const last = out[out.length - 1];
    if (last && last.t === t) last.s += s;
    else out.push({ t, s });
  };
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (A[i] === B[j]) {
      push("=", A[i]);
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) push("-", A[i++]);
    else push("+", B[j++]);
  }
  while (i < n) push("-", A[i++]);
  while (j < m) push("+", B[j++]);
  return out;
}

export function compareDocs(a: RegDoc, b: RegDoc): ComparedArticle[] {
  const usedB = new Set<string>();
  const out: ComparedArticle[] = [];
  const bByNum = new Map(b.articles.map((x) => [strip(x.num), x]));
  const bByTitle = new Map<string, Article[]>();
  for (const x of b.articles) {
    const k = tnorm(x.title);
    if (k) bByTitle.set(k, [...(bByTitle.get(k) ?? []), x]);
  }
  for (const x of a.articles) {
    let match: ComparedArticle["match"];
    let y: Article | undefined;
    const sameNum = bByNum.get(strip(x.num));
    if (sameNum && !usedB.has(sameNum.num) && tnorm(sameNum.title) === tnorm(x.title)) {
      y = sameNum;
      match = "number";
    } else {
      const byTitle = (bByTitle.get(tnorm(x.title)) ?? []).find((c) => !usedB.has(c.num));
      if (byTitle && tnorm(x.title)) {
        y = byTitle;
        match = "title";
      } else if (sameNum && !usedB.has(sameNum.num)) {
        y = sameNum;
        match = "number-only";
      }
    }
    if (!y) {
      out.push({ status: "removed", a: x });
      continue;
    }
    usedB.add(y.num);
    const ta = (x.text ?? "").replace(/\s+/g, " ").trim();
    const tb = (y.text ?? "").replace(/\s+/g, " ").trim();
    if (ta === tb && tnorm(x.title) === tnorm(y.title)) out.push({ status: "unchanged", match, a: x, b: y });
    else out.push({ status: "changed", match, a: x, b: y, diff: wordDiff(ta, tb) });
  }
  for (const y of b.articles) if (!usedB.has(y.num)) out.push({ status: "added", b: y });
  const key = (c: ComparedArticle) => (c.b ?? c.a)!.num;
  const parts = (n: string) => n.match(/\d+/g)!.map(Number);
  return out.sort((p, q) => {
    const x = parts(key(p));
    const y = parts(key(q));
    for (let i = 0; i < Math.max(x.length, y.length); i++) if ((x[i] ?? -1) !== (y[i] ?? -1)) return (x[i] ?? -1) - (y[i] ?? -1);
    return 0;
  });
}
