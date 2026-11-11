import "server-only";
import type { Lang } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dict";
import { countryName, ctorName, db, gpName, season } from "./db";
import { eras, techArticles } from "./content";
import { CATEGORIES } from "./categories";
import { LESSONS } from "./learn";
import { doc, indexedDocs, latestIndexed, type RegKind } from "./regs";

export type SearchKind = "Driver" | "Team" | "Car" | "Circuit" | "Season" | "Race" | "Era" | "Engineering" | "Regulation" | "Article" | "Category" | "Lesson" | "Page";
export type SearchEntry = { kind: SearchKind; title: string; subtitle: string; href: string; keywords: string; boost: number };

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

const cache = new Map<Lang, SearchEntry[]>();

export function searchIndex(lang: Lang): SearchEntry[] {
  if (cache.has(lang)) return cache.get(lang)!;
  const t = getDict(lang);
  const i = db();
  const out: SearchEntry[] = [];
  const add = (e: Omit<SearchEntry, "keywords" | "boost">, extra = "", boost = 0) => out.push({ ...e, keywords: norm(`${e.title} ${e.subtitle} ${extra}`), boost });

  const pages: [string, string][] = [
    [t.nav.history, "/history"],
    [t.nav.seasons, "/seasons"],
    [t.nav.drivers, "/drivers"],
    [t.nav.teams, "/teams"],
    [t.nav.cars, "/cars"],
    [t.nav.circuits, "/circuits"],
    [t.nav.engineering, "/engineering"],
    [t.nav.regulations, "/regulations"],
    [t.regulations.archiveTitle, "/regulations/archive"],
    [t.regulations.compareTitle, "/regulations/compare"],
    [t.regulations.searchTitle, "/regulations/search"],
    [t.nav.weekend, "/race-weekend"],
    [t.nav.categories, "/categories"],
    [t.nav.learn, "/learn"],
    [t.about.metaTitle, "/about"],
  ];
  pages.forEach(([title, href]) => add({ kind: "Page", title, subtitle: t.meta.siteName, href }, "", 5));

  eras(lang).forEach((e) => add({ kind: "Era", title: `${e.decade}: ${e.name}`, subtitle: e.tagline, href: `/history/${e.slug}` }, e.themes.join(" "), 4));

  for (const s of i.seasons) {
    const champ = s.champion ? i.drivers.find((d) => d.id === s.champion)?.name : undefined;
    add(
      { kind: "Season", title: `${t.common.season} ${s.year}`, subtitle: champ ? `${t.seasons.champion}: ${champ}` : t.seasons.inProgress, href: `/seasons/${s.year}` },
      String(s.year),
      2,
    );
  }

  for (const d of i.drivers) {
    add(
      { kind: "Driver", title: d.name, subtitle: `${countryName(d.nat, lang)} · ${d.first_}–${d.active ? t.common.present : d.last_}${d.titles.length ? ` · ${d.titles.length}× ${t.common.titles.toLowerCase()}` : ""}`, href: `/drivers/${d.id}` },
      `${d.full ?? ""} ${d.teams.map((c) => ctorName(c)).join(" ")}`,
      d.titles.length * 3 + Math.min(d.st.wins, 30) / 6 + (d.active ? 3 : 0),
    );
  }
  for (const c of i.constructors) {
    add(
      { kind: "Team", title: c.name, subtitle: `${countryName(c.country, lang)} · ${c.first_}–${c.active ? t.common.present : c.last_}`, href: `/teams/${c.id}` },
      `${c.full ?? ""}`,
      c.titles.length * 2 + (c.active ? 4 : 0) + Math.min(c.st.wins, 50) / 10,
    );
  }
  for (const ch of i.chassis) {
    add({ kind: "Car", title: ch.full ?? `${ctorName(ch.c)} ${ch.name}`, subtitle: `${ctorName(ch.c)} · ${ch.years.join(", ")}`, href: `/cars/${ch.id}` }, ch.name, ch.wins > 0 ? 1 : 0);
  }
  for (const c of i.circuits) {
    add(
      { kind: "Circuit", title: c.full, subtitle: `${c.place}, ${countryName(c.country, lang)} · ${c.first_}–${c.last_}`, href: `/circuits/${c.id}` },
      `${c.name} ${(c.prev ?? []).join(" ")}`,
      c.onCalendar ? 3 : 1,
    );
  }
  for (const s of i.seasons) {
    const sd = season(s.year);
    for (const r of sd?.races ?? []) {
      add({ kind: "Race", title: `${gpName(r.gp)} ${s.year}`, subtitle: `${t.common.round} ${r.round} · ${r.date}`, href: `/seasons/${s.year}/${r.slug}` }, `${r.name ?? ""} ${r.gp}`, 0);
    }
  }
  for (const a of techArticles(lang)) {
    add(
      { kind: a.group === "engineering" ? "Engineering" : "Regulation", title: a.title, subtitle: a.summary, href: `/${a.group === "engineering" ? "engineering" : "regulations"}/${a.slug}` },
      a.concepts.map((c) => c.term).join(" "),
      4,
    );
  }
  for (const c of CATEGORIES) add({ kind: "Category", title: c.name, subtitle: c.tagline[lang], href: `/categories/${c.slug}` }, c.short, 3);
  for (const l of LESSONS) add({ kind: "Lesson", title: l.title[lang], subtitle: `${t.learn.levels[l.level]} · ${l.minutes} min`, href: `/learn/${l.slug}` }, l.summary[lang], 3);

  // FIA articles: latest indexed issue of each regulation for each year.
  const seen = new Set<string>();
  for (const cd of indexedDocs()) {
    const key = `${cd.year}-${cd.kind}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const latest = latestIndexed(cd.year!, cd.kind as RegKind);
    const d = latest && doc(latest.id);
    if (!d) continue;
    for (const a of d.articles) {
      if (!a.title) continue;
      add(
        { kind: "Article", title: `${a.num} ${a.title}`, subtitle: `${t.regulations.sectionNames[d.kind]} ${d.year}`, href: `/regulations/archive/${d.year}/${d.id}/${encodeURIComponent(a.num)}` },
        `${d.year}`,
        d.year >= 2026 ? 0.5 : 0,
      );
    }
  }

  cache.set(lang, out);
  return out;
}

export function search(lang: Lang, query: string, limit = 30, kind?: SearchKind) {
  const q = norm(query.trim());
  if (!q) return [];
  const words = q.split(/\s+/).filter(Boolean);
  const scored: (SearchEntry & { score: number })[] = [];
  for (const e of searchIndex(lang)) {
    if (kind && e.kind !== kind) continue;
    if (!words.every((w) => e.keywords.includes(w))) continue;
    const title = norm(e.title);
    let score = e.boost;
    if (title === q) score += 100;
    if (title.startsWith(q)) score += 40;
    for (const w of words) {
      if (title.includes(w)) score += 10;
      if (title.split(/\s+/).some((x) => x.startsWith(w))) score += 6;
    }
    scored.push({ ...e, score });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(({ keywords: _k, boost: _b, ...rest }) => rest);
}
