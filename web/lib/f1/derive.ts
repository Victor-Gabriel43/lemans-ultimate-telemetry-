import "server-only";
import { chassisForDriverYear, db, season } from "./db";

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
