import { ERAS } from "./eras";
import { SEASONS } from "./seasons";
import { DRIVERS } from "./drivers";
import { TEAMS } from "./teams";
import { CARS } from "./cars";
import { CIRCUITS } from "./circuits";
import { TECH } from "./technology";
import { CATEGORIES } from "./categories";
import { LESSONS } from "./learn";

export type SearchKind = "Era" | "Season" | "Driver" | "Team" | "Car" | "Circuit" | "Technology" | "Category" | "Lesson" | "Page";

export type SearchEntry = {
  kind: SearchKind;
  title: string;
  subtitle: string;
  href: string;
  /** Lower-cased haystack for matching. */
  keywords: string;
};

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];
  const add = (e: Omit<SearchEntry, "keywords">, extra = "") =>
    entries.push({ ...e, keywords: norm(`${e.title} ${e.subtitle} ${extra}`) });

  const pages: [string, string, string][] = [
    ["History of Formula 1", "Eras, timeline and storytelling", "/history"],
    ["Seasons", "Every season from 1950 to 2026", "/seasons"],
    ["Drivers", "The driver archive", "/drivers"],
    ["Teams & Constructors", "Historic and current teams", "/teams"],
    ["Formula 1 Cars", "The car archive", "/cars"],
    ["Circuits", "Tracks of the World Championship", "/circuits"],
    ["Regulations & Technology", "How the cars and rules work", "/technology"],
    ["Race Weekends", "Practice, qualifying, sprint and race", "/race-weekend"],
    ["Other Formula Categories", "F2, F3, F4, Formula Regional, F1 Academy, karting", "/categories"],
    ["Learn Formula 1", "Lessons for every level", "/learn"],
    ["About this encyclopedia", "Sources, data status and image policy", "/about"],
  ];
  pages.forEach(([title, subtitle, href]) => add({ kind: "Page", title, subtitle, href }));

  ERAS.forEach((e) => add({ kind: "Era", title: `${e.decade}: ${e.name}`, subtitle: e.tagline, href: `/history/${e.slug}` }, e.themes.join(" ")));
  SEASONS.forEach((s) =>
    add(
      {
        kind: "Season",
        title: `${s.year} season`,
        subtitle: s.champions ? `Champion: ${s.champions.driver}` : "Season in progress",
        href: `/seasons/${s.year}`,
      },
      `${s.year} ${s.headline ?? ""} ${s.champions?.constructor ?? ""}`,
    ),
  );
  DRIVERS.forEach((d) =>
    add({ kind: "Driver", title: d.name, subtitle: `${d.nationality} · ${d.knownFor}`, href: `/drivers/${d.slug}` }, d.teams.map((t) => t.name).join(" ")),
  );
  TEAMS.forEach((t) => add({ kind: "Team", title: t.name, subtitle: `${t.base}, ${t.country}`, href: `/teams/${t.slug}` }, (t.lineage ?? []).join(" ")));
  CARS.forEach((c) => add({ kind: "Car", title: c.name, subtitle: `${c.team} · ${c.seasons}`, href: `/cars/${c.slug}` }, `${c.engine} ${c.innovations.join(" ")}`));
  CIRCUITS.forEach((c) =>
    add({ kind: "Circuit", title: c.name, subtitle: `${c.location}, ${c.country}`, href: `/circuits/${c.slug}` }, `${c.shortName} ${c.grandPrix} ${c.landmarks.join(" ")}`),
  );
  TECH.forEach((t) => add({ kind: "Technology", title: t.title, subtitle: t.summary, href: `/technology/${t.slug}` }, t.concepts.map((c) => c.term).join(" ")));
  CATEGORIES.forEach((c) => add({ kind: "Category", title: c.name, subtitle: c.tagline, href: `/categories/${c.slug}` }, c.short));
  LESSONS.forEach((l) => add({ kind: "Lesson", title: l.title, subtitle: `${l.level} · ${l.minutes} min`, href: `/learn/${l.slug}` }, l.summary));

  return entries;
}

/** Ranked search. Every query word must appear; title matches rank higher. */
export function searchEntries(index: SearchEntry[], query: string, limit = 40): SearchEntry[] {
  const q = norm(query.trim());
  if (!q) return [];
  const words = q.split(/\s+/).filter(Boolean);
  const scored: { e: SearchEntry; score: number }[] = [];
  for (const e of index) {
    if (!words.every((w) => e.keywords.includes(w))) continue;
    const title = norm(e.title);
    let score = 0;
    if (title === q) score += 100;
    if (title.startsWith(q)) score += 50;
    for (const w of words) {
      if (title.includes(w)) score += 10;
      if (title.split(/\s+/).some((t) => t.startsWith(w))) score += 5;
    }
    if (e.kind === "Season") score -= 3; // keep the long tail of seasons below richer pages
    scored.push({ e, score });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, limit).map((s) => s.e);
}
