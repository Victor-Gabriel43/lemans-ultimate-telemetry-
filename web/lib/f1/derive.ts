import "server-only";
import { chassisForDriverYear, chassisName, db, season } from "./db";
import { chassisPhoto, photo, type Photo } from "./media";

/** Wins per driver and per constructor across a span of seasons. */
export function winsInRange(from: number, to: number) {
  const d = new Map<string, number>();
  const c = new Map<string, number>();
  for (const s of db().seasons) {
    if (s.year < from || s.year > to) continue;
    for (const r of season(s.year)?.races ?? []) {
      for (const x of r.results) {
        if (x.pos !== 1) continue;
        d.set(x.d, (d.get(x.d) ?? 0) + 1);
        c.set(x.c, (c.get(x.c) ?? 0) + 1);
      }
    }
  }
  const sort = (m: Map<string, number>) => [...m.entries()].sort((a, b) => b[1] - a[1]);
  return { drivers: sort(d), constructors: sort(c) };
}

/** The chassis the drivers' champion used most in a season. */
export function championChassis(year: number): string | undefined {
  const s = db().seasons.find((x) => x.year === year);
  if (!s?.champion) return undefined;
  const sd = season(year);
  if (!sd) return undefined;
  const used = chassisForDriverYear(s.champion, year);
  if (used.length <= 1) return used[0];
  // pick the chassis entered for the champion's constructor with most wins that year
  const wins = new Map<string, number>();
  for (const id of used) wins.set(id, db().chassis.find((c) => c.id === id)?.wins ?? 0);
  return [...wins.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
}

/** Final (or provisional) standing helpers. */
export function racesWonBy(year: number, driverId: string) {
  return (season(year)?.races ?? []).filter((r) => r.results.some((x) => x.pos === 1 && x.d === driverId));
}

/* ---------------------------------------------------------------------------
 * Hero photography — always a photo of a real subject of that season/race:
 * the champion's car, then the cars that won races that year (most wins
 * first), then the lead image of the season's own encyclopedia article.
 * ------------------------------------------------------------------------- */
export type Hero = { photo: Photo; chassisId?: string; label: string };

function winningChassis(year: number): string[] {
  const sd = season(year);
  if (!sd) return [];
  const count = new Map<string, number>();
  for (const r of sd.races) {
    const w = r.results.find((x) => x.pos === 1);
    if (!w) continue;
    const ids = chassisForDriverYear(w.d, year).filter((id) => db().chassis.find((c) => c.id === id)?.c === w.c);
    for (const id of ids.slice(0, 1)) count.set(id, (count.get(id) ?? 0) + 1);
  }
  return [...count.entries()].sort((a, b) => b[1] - a[1]).map(([id]) => id);
}

export function seasonHero(year: number): Hero | undefined {
  const s = db().seasons.find((x) => x.year === year);
  const lead = s?.champion ?? s?.leader;
  const first = s?.champion ? championChassis(year) : lead ? chassisForDriverYear(lead, year)[0] : undefined;
  for (const id of [first, ...winningChassis(year)].filter((x): x is string => !!x)) {
    const p = chassisPhoto(id);
    if (p) return { photo: p, chassisId: id, label: chassisName(id) };
  }
  const p = photo(`season-${year}`);
  return p ? { photo: p, label: String(year) } : undefined;
}

export function raceHero(year: number, slug: string, winner?: { d: string; c: string }): Hero | undefined {
  const own = photo(`race-${year}-${slug}`);
  if (own) return { photo: own, label: "" };
  if (winner) {
    const id = chassisForDriverYear(winner.d, year).find((x) => db().chassis.find((c) => c.id === x)?.c === winner.c);
    const p = id ? chassisPhoto(id) : undefined;
    if (p && id) return { photo: p, chassisId: id, label: chassisName(id) };
  }
  return undefined;
}

/** A landmark-car photograph for a decade: the first champion-car photo found in its seasons. */
export function eraHero(start: number, end: number): Hero | undefined {
  for (let y = start; y <= Math.min(end, 2026); y++) {
    const h = seasonHero(y);
    if (h?.chassisId) return h;
  }
  return undefined;
}
