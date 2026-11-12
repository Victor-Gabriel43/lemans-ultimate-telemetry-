import "server-only";
import fs from "node:fs";
import path from "node:path";
import { INTL_LOCALE, type Lang } from "@/lib/i18n/config";

/* ---------------------------------------------------------------------------
 * Types of the compact F1DB snapshot (see scripts/f1db/build.mjs).
 * ------------------------------------------------------------------------- */
export type Pos = number | "DNF" | "DNS" | "DSQ" | "DNQ" | "DNPQ" | "NC" | "EX" | "DNP";
export type Result = {
  pos: Pos;
  no?: number;
  d: string;
  c: string;
  e?: string;
  laps?: number;
  time?: string;
  gap?: string;
  why?: string;
  pts?: number;
  grid?: number | string;
  pen?: string;
  shared?: boolean;
};
export type Race = {
  round: number;
  slug: string;
  date: string;
  time?: string;
  gp: string;
  name?: string;
  circuit: string;
  layout?: string;
  type?: string;
  length?: number;
  laps?: number;
  scheduledLaps?: number;
  distance?: number;
  quali?: string;
  sprintFormat?: string;
  status: "completed" | "scheduled";
  pole?: { d: string; c: string; time?: string };
  fastestLap?: { d: string; c: string; time?: string; lap?: number };
  results: Result[];
  sprint?: Result[];
  qualifying?: { pos: Pos; d: string; c: string; time?: string; q1?: string; q2?: string; q3?: string }[];
};
export type Entrant = {
  entrant: string;
  country?: string;
  c: string;
  e?: string;
  chassis: string[];
  engines: string[];
  tyre?: string;
  drivers: { d: string; rounds?: string; test?: boolean }[];
};
export type SeasonData = {
  year: number;
  status: "completed" | "in-progress";
  races: Race[];
  entrants: Entrant[];
  driverStandings: { pos: number; d: string; pts: number; tie?: boolean }[];
  constructorStandings: { pos: number; c: string; e?: string; pts: number }[];
};
export type SeasonSummary = {
  year: number;
  status: "completed" | "in-progress";
  rounds: number;
  completed: number;
  champion?: string;
  constructorChampion?: string;
  leader?: string;
  /** Title(s) mathematically decided before the season ended. */
  clinched?: boolean;
  constructorLeader?: string;
  drivers: number;
  constructors: number;
  sprints: number;
};
export type Stats = { entries: number; starts: number; wins: number; podiums: number; poles: number; fl: number; sprintWins?: number; points?: number };
export type Driver = {
  id: string;
  name: string;
  first: string;
  last: string;
  full?: string;
  abbr?: string;
  no?: number;
  gender?: "F";
  dob?: string;
  dod?: string;
  pob?: string;
  cob?: string;
  nat: string;
  nat2?: string;
  family?: { d: string; t: string }[];
  first_: number;
  last_: number;
  active: boolean;
  teams: string[];
  st: Stats;
  titles: number[];
  seasons: { y: number; c: string[]; pos?: number; pts?: number; w?: number; p?: number; pl?: number; s?: number }[];
  winList: string[];
};
export type Constructor = {
  id: string;
  name: string;
  full?: string;
  country: string;
  chronology?: { c: string; from: number; to?: number }[];
  first_: number;
  last_: number;
  active: boolean;
  st: Stats;
  titles: number[];
  driverTitles: number[];
  engines: { e: string; years: number[] }[];
  seasons: { y: number; d: string[]; ch: string[]; en: string[]; pos?: number; pts?: number }[];
};
export type Chassis = { id: string; c: string; name: string; full?: string; years: number[]; drivers: string[]; engines: string[]; wins: number };
export type Engine = { id: string; m: string; name: string; full?: string; cap?: number; cfg?: string; asp?: string };
export type EngineMfr = { id: string; name: string; country?: string; wins: number; first_?: number; last_?: number };
export type Edition = { y: number; s: string; gp: string; l?: string; w?: string; wc?: string; name?: string; scheduled?: boolean };
export type Circuit = {
  id: string;
  name: string;
  full: string;
  prev?: string[];
  type: "RACE" | "STREET" | "ROAD";
  dir?: "CLOCKWISE" | "ANTI_CLOCKWISE";
  place: string;
  country: string;
  lat: number;
  lng: number;
  length?: number;
  turns?: number;
  layouts: { id: string; length?: number; turns?: number; svg?: boolean; years: number[] }[];
  first_: number;
  last_: number;
  onCalendar: boolean;
  editions: Edition[];
};
export type GrandPrix = { id: string; name: string; full: string; short?: string; country?: string };
export type Country = { name: string; demonym?: string; alpha2?: string; continent?: string };
export type F1Index = {
  meta: { source: string; url: string; license: string; licenseUrl: string; release: string; commit: string; commitDate: string; generatedAt: string; firstYear: number; lastYear: number };
  countries: Record<string, Country>;
  seasons: SeasonSummary[];
  drivers: Driver[];
  constructors: Constructor[];
  chassis: Chassis[];
  engines: Engine[];
  engineManufacturers: EngineMfr[];
  tyres: { id: string; name: string }[];
  circuits: Circuit[];
  grandsPrix: GrandPrix[];
  entrants: Record<string, string>;
};
export type CrossCheck = {
  source: string;
  url: string;
  checkedAt: string;
  summary: { racesAgree: number; racesDisputed: number; racesSingleSource: number };
  seasons: Record<string, { status: string; note?: string }>;
  races: Record<string, { status: string; note?: string }>;
};

/* ---------------------------------------------------------------------------
 * Loading — local JSON, read once per server instance.
 * ------------------------------------------------------------------------- */
const DATA_DIR = path.join(process.cwd(), "data");
const readJSON = <T,>(...p: string[]): T => JSON.parse(fs.readFileSync(path.join(DATA_DIR, ...p), "utf8")) as T;

let _index: F1Index | null = null;
let _maps: {
  drivers: Map<string, Driver>;
  constructors: Map<string, Constructor>;
  chassis: Map<string, Chassis>;
  engines: Map<string, Engine>;
  engineMfrs: Map<string, EngineMfr>;
  circuits: Map<string, Circuit>;
  gps: Map<string, GrandPrix>;
  tyres: Map<string, string>;
} | null = null;
const _seasons = new Map<number, SeasonData>();
let _cc: CrossCheck | null = null;

export function db(): F1Index {
  if (!_index) _index = readJSON<F1Index>("f1", "index.json");
  return _index;
}
function maps() {
  if (!_maps) {
    const i = db();
    _maps = {
      drivers: new Map(i.drivers.map((x) => [x.id, x])),
      constructors: new Map(i.constructors.map((x) => [x.id, x])),
      chassis: new Map(i.chassis.map((x) => [x.id, x])),
      engines: new Map(i.engines.map((x) => [x.id, x])),
      engineMfrs: new Map(i.engineManufacturers.map((x) => [x.id, x])),
      circuits: new Map(i.circuits.map((x) => [x.id, x])),
      gps: new Map(i.grandsPrix.map((x) => [x.id, x])),
      tyres: new Map(i.tyres.map((x) => [x.id, x.name])),
    };
  }
  return _maps;
}

export const driver = (id?: string) => (id ? maps().drivers.get(id) : undefined);
export const ctor = (id?: string) => (id ? maps().constructors.get(id) : undefined);
export const chassis = (id?: string) => (id ? maps().chassis.get(id) : undefined);
export const engine = (id?: string) => (id ? maps().engines.get(id) : undefined);
export const engineMfr = (id?: string) => (id ? maps().engineMfrs.get(id) : undefined);
export const circuit = (id?: string) => (id ? maps().circuits.get(id) : undefined);
export const grandPrix = (id?: string) => (id ? maps().gps.get(id) : undefined);
export const tyreName = (id?: string) => (id ? maps().tyres.get(id) : undefined);

export function season(year: number): SeasonData | undefined {
  if (!_seasons.has(year)) {
    const p = path.join(DATA_DIR, "f1", "seasons", `${year}.json`);
    if (!fs.existsSync(p)) return undefined;
    _seasons.set(year, JSON.parse(fs.readFileSync(p, "utf8")));
  }
  return _seasons.get(year);
}
export const seasonSummary = (year: number) => db().seasons.find((s) => s.year === year);
export const years = () => db().seasons.map((s) => s.year);
export const currentYear = () => db().meta.lastYear;

export function race(year: number, slug: string) {
  const s = season(year);
  return s?.races.find((r) => r.slug === slug);
}

export function crosscheck(): CrossCheck {
  if (!_cc) _cc = readJSON<CrossCheck>("f1", "crosscheck.json");
  return _cc;
}

/** Data status shown on a season or race. */
export type DataStatus = "cross-checked" | "provisional" | "disputed" | "single-source" | "scheduled";
export function seasonStatus(year: number): DataStatus {
  return (crosscheck().seasons[year]?.status as DataStatus) ?? "single-source";
}
export function raceStatus(year: number, slug: string): DataStatus {
  const r = race(year, slug);
  if (r?.status === "scheduled") return "scheduled";
  const s = crosscheck().races[`${year}/${slug}`]?.status as DataStatus | undefined;
  const base = s ?? "single-source";
  return seasonSummary(year)?.status === "in-progress" && base === "cross-checked" ? "cross-checked" : base;
}

/* ---------------------------------------------------------------------------
 * Localised helpers
 * ------------------------------------------------------------------------- */
const regionNames = new Map<Lang, Intl.DisplayNames>();
export function countryName(id: string | undefined, lang: Lang): string {
  if (!id) return "—";
  const c = db().countries[id];
  if (!c) return id;
  if (c.alpha2) {
    if (!regionNames.has(lang)) regionNames.set(lang, new Intl.DisplayNames([INTL_LOCALE[lang]], { type: "region" }));
    try {
      const n = regionNames.get(lang)!.of(c.alpha2.toUpperCase());
      if (n) return n;
    } catch {}
  }
  return c.name;
}
export const continentOf = (id?: string) => (id ? db().countries[id]?.continent : undefined);

export function formatDate(iso: string | undefined, lang: Lang, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }) {
  if (!iso) return "—";
  const d = new Date(`${iso}T12:00:00Z`);
  return new Intl.DateTimeFormat(INTL_LOCALE[lang], { ...opts, timeZone: "UTC" }).format(d);
}
export function formatNumber(n: number | undefined, lang: Lang, digits = 0) {
  if (n === undefined || n === null) return "—";
  return new Intl.NumberFormat(INTL_LOCALE[lang], { maximumFractionDigits: digits }).format(n);
}
export function ageAt(dob: string, at?: string) {
  const a = new Date(dob);
  const b = at ? new Date(at) : new Date();
  let y = b.getUTCFullYear() - a.getUTCFullYear();
  const m = b.getUTCMonth() - a.getUTCMonth();
  if (m < 0 || (m === 0 && b.getUTCDate() < a.getUTCDate())) y--;
  return y;
}

/** Display name for an engine manufacturer, chassis or constructor id. */
export const ctorName = (id?: string) => ctor(id)?.name ?? id ?? "—";
export const chassisName = (id?: string) => {
  const c = chassis(id);
  return c ? c.full ?? `${ctorName(c.c)} ${c.name}` : id ?? "—";
};
export const engineMfrName = (id?: string) => engineMfr(id)?.name ?? id ?? "—";
const GP_PT: Record<string, string> = {"70th-anniversary": "GP do 70º Aniversário", "abu-dhabi": "GP de Abu Dhabi", "argentina": "GP da Argentina", "australia": "GP da Austrália", "austria": "GP da Áustria", "azerbaijan": "GP do Azerbaijão", "bahrain": "GP do Bahrein", "barcelona-catalunya": "GP de Barcelona-Catalunha", "belgium": "GP da Bélgica", "brazil": "GP do Brasil", "caesars-palace": "GP de Caesars Palace", "canada": "GP do Canadá", "china": "GP da China", "dallas": "GP de Dallas", "detroit": "GP de Detroit", "eifel": "GP de Eifel", "emilia-romagna": "GP da Emília-Romanha", "europe": "GP da Europa", "france": "GP da França", "germany": "GP da Alemanha", "great-britain": "GP da Grã-Bretanha", "hungary": "GP da Hungria", "india": "GP da Índia", "indianapolis": "500 Milhas de Indianápolis", "italy": "GP da Itália", "japan": "GP do Japão", "korea": "GP da Coreia", "las-vegas": "GP de Las Vegas", "luxembourg": "GP de Luxemburgo", "malaysia": "GP da Malásia", "mexico": "GP do México", "miami": "GP de Miami", "monaco": "GP de Mônaco", "morocco": "GP do Marrocos", "netherlands": "GP da Holanda", "pacific": "GP do Pacífico", "pescara": "GP de Pescara", "portugal": "GP de Portugal", "qatar": "GP do Catar", "russia": "GP da Rússia", "sakhir": "GP de Sakhir", "san-marino": "GP de San Marino", "sao-paulo": "GP de São Paulo", "saudi-arabia": "GP da Arábia Saudita", "singapore": "GP de Singapura", "south-africa": "GP da África do Sul", "spain": "GP da Espanha", "styria": "GP da Estíria", "sweden": "GP da Suécia", "switzerland": "GP da Suíça", "turkey": "GP da Turquia", "tuscany": "GP da Toscana", "united-states-west": "GP dos Estados Unidos-Oeste", "united-states": "GP dos Estados Unidos"};
/** Grand Prix name in the page language (Portuguese names follow Brazilian usage). */
export const gpName = (id?: string, lang: "pt" | "en" = "en") => (lang === "pt" && id && GP_PT[id]) || grandPrix(id)?.full || id || "—";
export const entrantName = (id?: string) => (id ? db().entrants[id] ?? id : "—");

/** Short display name of a Grand Prix (e.g. "Monaco Grand Prix"). */
export function raceTitle(r: Race) {
  return gpName(r.gp);
}

/** All chassis of a constructor, ordered by first season. */
export function chassisOf(constructorId: string) {
  return db()
    .chassis.filter((c) => c.c === constructorId)
    .sort((a, b) => a.years[0] - b.years[0] || a.name.localeCompare(b.name));
}

/** Which chassis a driver used in a given season (from entrants). */
export function chassisForDriverYear(driverId: string, year: number): string[] {
  const s = season(year);
  if (!s) return [];
  return [...new Set(s.entrants.filter((e) => e.drivers.some((x) => x.d === driverId)).flatMap((e) => e.chassis))];
}

/** Years in which a chassis carried a constructor's championship / a drivers' champion. */
export function chassisHonours(ch: Chassis) {
  const out: { y: number; kind: "constructor" | "driver" }[] = [];
  for (const y of ch.years) {
    const s = seasonSummary(y);
    if (!s || s.status !== "completed") continue;
    if (s.constructorChampion === ch.c) {
      const sd = season(y)!;
      // only if this chassis is the main one of the champion constructor that year
      const used = sd.entrants.filter((e) => e.c === ch.c).flatMap((e) => e.chassis);
      if (used.includes(ch.id)) out.push({ y, kind: "constructor" });
    }
    if (s.champion && chassisForDriverYear(s.champion, y).includes(ch.id)) out.push({ y, kind: "driver" });
  }
  return out;
}
