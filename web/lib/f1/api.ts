/**
 * Formula 1 data layer — all real data, never invented.
 *
 * Source: Jolpica F1 API (Ergast-compatible) — https://api.jolpi.ca
 * Fetched server-side with ISR caching; every helper returns `null`/[] on
 * failure so pages degrade gracefully instead of crashing.
 */
import "server-only";

const BASE = "https://api.jolpi.ca/ergast/f1";
export const SEASON = 2026;

const HOUR = 3600;
const DAY = 86400;

async function get<T>(path: string, revalidate = HOUR): Promise<T | null> {
  try {
    const res = await fetch(`${BASE}/${path}`, { next: { revalidate } });
    if (!res.ok) { console.error("[f1] HTTP", res.status, path); return null; }
    return (await res.json()).MRData as T;
  } catch (e) {
    console.error("[f1] fetch failed", path, (e as Error).cause ?? e);
    return null;
  }
}

/* ---------- types (subset of the Ergast schema) ---------- */
export type Location = { lat: string; long: string; locality: string; country: string };
export type Circuit = { circuitId: string; url: string; circuitName: string; Location: Location };
export type Driver = {
  driverId: string;
  permanentNumber?: string;
  code?: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
};
export type Constructor = { constructorId: string; url: string; name: string; nationality: string };
export type Session = { date: string; time?: string };
export type Race = {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time?: string;
  FirstPractice?: Session;
  SecondPractice?: Session;
  ThirdPractice?: Session;
  Qualifying?: Session;
  Sprint?: Session;
  SprintQualifying?: Session;
};
export type Result = {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: Driver;
  Constructor: Constructor;
  grid: string;
  laps: string;
  status: string;
  Time?: { time: string };
  FastestLap?: { rank: string; lap: string; Time: { time: string } };
};
export type RaceWithResults = Race & { Results: Result[] };
export type DriverStanding = { position?: string; positionText: string; points: string; wins: string; Driver: Driver; Constructors: Constructor[] };
export type ConstructorStanding = { position?: string; positionText: string; points: string; wins: string; Constructor: Constructor };

type Total = { total: string };

/* ---------- season ---------- */
export async function getSchedule(season = SEASON): Promise<Race[]> {
  const d = await get<{ RaceTable: { Races: Race[] } }>(`${season}.json?limit=40`, HOUR);
  return d?.RaceTable.Races ?? [];
}

export async function getDriverStandings(season = SEASON) {
  const d = await get<{ StandingsTable: { round?: string; StandingsLists: { round: string; DriverStandings: DriverStanding[] }[] } }>(
    `${season}/driverStandings.json?limit=40`
  );
  const list = d?.StandingsTable.StandingsLists[0];
  return { round: list?.round ?? null, standings: list?.DriverStandings ?? [] };
}

export async function getConstructorStandings(season = SEASON) {
  const d = await get<{ StandingsTable: { StandingsLists: { round: string; ConstructorStandings: ConstructorStanding[] }[] } }>(
    `${season}/constructorStandings.json?limit=40`
  );
  const list = d?.StandingsTable.StandingsLists[0];
  return { round: list?.round ?? null, standings: list?.ConstructorStandings ?? [] };
}

/** All race results of a season (paginated: the API caps pages at 100 rows). */
export async function getSeasonResults(season = SEASON): Promise<RaceWithResults[]> {
  const first = await get<Total & { RaceTable: { Races: RaceWithResults[] } }>(`${season}/results.json?limit=100&offset=0`);
  if (!first) return [];
  const total = Number(first.total);
  const pages = [first];
  for (let off = 100; off < total; off += 100) {
    const p = await get<Total & { RaceTable: { Races: RaceWithResults[] } }>(`${season}/results.json?limit=100&offset=${off}`);
    if (p) pages.push(p);
  }
  // Pages can split one race's results — merge by round.
  const byRound = new Map<string, RaceWithResults>();
  for (const p of pages)
    for (const r of p.RaceTable.Races) {
      const prev = byRound.get(r.round);
      if (prev) prev.Results.push(...r.Results);
      else byRound.set(r.round, { ...r, Results: [...r.Results] });
    }
  return [...byRound.values()].sort((a, b) => Number(a.round) - Number(b.round));
}

export async function getRaceResults(season: number, round: string | number) {
  const d = await get<{ RaceTable: { Races: RaceWithResults[] } }>(`${season}/${round}/results.json?limit=40`);
  return d?.RaceTable.Races[0] ?? null;
}

export async function getQualifyingPole(season: number, round: string | number) {
  const d = await get<{ RaceTable: { Races: (Race & { QualifyingResults: { position: string; Driver: Driver; Constructor: Constructor; Q3?: string }[] })[] } }>(
    `${season}/${round}/qualifying/1.json`
  );
  return d?.RaceTable.Races[0]?.QualifyingResults[0] ?? null;
}

export type PitStop = { driverId: string; lap: string; stop: string; time: string; duration: string };
export async function getPitStops(season: number, round: string | number): Promise<PitStop[]> {
  const d = await get<{ RaceTable: { Races: { PitStops: PitStop[] }[] } }>(`${season}/${round}/pitstops.json?limit=100`);
  return d?.RaceTable.Races[0]?.PitStops ?? [];
}

/* ---------- drivers ---------- */
export async function getDriver(id: string): Promise<Driver | null> {
  const d = await get<{ DriverTable: { Drivers: Driver[] } }>(`drivers/${id}.json`, DAY);
  return d?.DriverTable.Drivers[0] ?? null;
}

/** Career totals via the API's own `total` counts (no client-side guessing). */
export async function getDriverCareer(id: string) {
  const count = async (path: string) => {
    const d = await get<Total>(`drivers/${id}/${path}?limit=1`, DAY);
    return d ? Number(d.total) : null;
  };
  const [starts, wins, p2, p3, poles, seasons] = await Promise.all([
    count("results.json"),
    count("results/1.json"),
    count("results/2.json"),
    count("results/3.json"),
    count("qualifying/1.json"),
    count("seasons.json"),
  ]);
  const podiums = wins != null && p2 != null && p3 != null ? wins + p2 + p3 : null;
  return { starts, wins, podiums, poles, seasons };
}

export async function getDriverSeasonResults(id: string, season = SEASON): Promise<RaceWithResults[]> {
  const d = await get<{ RaceTable: { Races: RaceWithResults[] } }>(`${season}/drivers/${id}/results.json?limit=40`);
  return d?.RaceTable.Races ?? [];
}

/* ---------- circuits ---------- */
export async function getCircuit(id: string): Promise<Circuit | null> {
  const d = await get<{ CircuitTable: { Circuits: Circuit[] } }>(`circuits/${id}.json`, DAY);
  return d?.CircuitTable.Circuits[0] ?? null;
}

/** Winners at a circuit, most recent first. */
export async function getCircuitWinners(id: string, limit = 12) {
  const first = await get<Total>(`circuits/${id}/results/1.json?limit=1`, DAY);
  if (!first) return { total: 0, races: [] as RaceWithResults[] };
  const total = Number(first.total);
  const offset = Math.max(0, total - limit);
  const d = await get<{ RaceTable: { Races: RaceWithResults[] } }>(`circuits/${id}/results/1.json?limit=${limit}&offset=${offset}`, DAY);
  return { total, races: (d?.RaceTable.Races ?? []).reverse() };
}

/* ---------- helpers ---------- */
export const fullName = (d: Driver) => `${d.givenName} ${d.familyName}`;
export function raceStart(r: Pick<Race, "date" | "time">) {
  return new Date(`${r.date}T${r.time ?? "12:00:00Z"}`);
}
export function nextRace(schedule: Race[], now = new Date()) {
  return schedule.find((r) => raceStart(r).getTime() + 3 * 3600_000 > now.getTime()) ?? null;
}
