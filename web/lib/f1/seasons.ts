import { eraForYear } from "./eras";

/**
 * Season index 1950–2026.
 *
 * Champions are long-established public record and are included as an
 * editorial reference so the archive is navigable today. They are flagged in
 * the UI as "to be cross-checked" and will be reconciled against official
 * records in Phase 2, together with calendars, entries and results — which
 * are deliberately NOT authored here.
 */

export type SeasonChampions = {
  driver: string; // driver display name
  driverSlug?: string; // links to a profile when one exists
  driverTeam: string; // team the champion drove for
  constructor?: string; // constructors' champion (from 1958)
  constructorSlug?: string;
};

export type Season = {
  year: number;
  champions?: SeasonChampions;
  /** One-sentence editorial headline for the season, when we have one. */
  headline?: string;
  status: "complete" | "in-progress";
};

type Row = [number, string, string | undefined, string, string | undefined, string | undefined];

// year, driver, driverSlug, driverTeam, constructor, constructorSlug
const ROWS: Row[] = [
  [1950, "Giuseppe Farina", "giuseppe-farina", "Alfa Romeo", undefined, undefined],
  [1951, "Juan Manuel Fangio", "juan-manuel-fangio", "Alfa Romeo", undefined, undefined],
  [1952, "Alberto Ascari", "alberto-ascari", "Ferrari", undefined, undefined],
  [1953, "Alberto Ascari", "alberto-ascari", "Ferrari", undefined, undefined],
  [1954, "Juan Manuel Fangio", "juan-manuel-fangio", "Maserati / Mercedes-Benz", undefined, undefined],
  [1955, "Juan Manuel Fangio", "juan-manuel-fangio", "Mercedes-Benz", undefined, undefined],
  [1956, "Juan Manuel Fangio", "juan-manuel-fangio", "Ferrari", undefined, undefined],
  [1957, "Juan Manuel Fangio", "juan-manuel-fangio", "Maserati", undefined, undefined],
  [1958, "Mike Hawthorn", "mike-hawthorn", "Ferrari", "Vanwall", "vanwall"],
  [1959, "Jack Brabham", "jack-brabham", "Cooper", "Cooper", "cooper"],
  [1960, "Jack Brabham", "jack-brabham", "Cooper", "Cooper", "cooper"],
  [1961, "Phil Hill", "phil-hill", "Ferrari", "Ferrari", "ferrari"],
  [1962, "Graham Hill", "graham-hill", "BRM", "BRM", "brm"],
  [1963, "Jim Clark", "jim-clark", "Lotus", "Lotus", "lotus"],
  [1964, "John Surtees", "john-surtees", "Ferrari", "Ferrari", "ferrari"],
  [1965, "Jim Clark", "jim-clark", "Lotus", "Lotus", "lotus"],
  [1966, "Jack Brabham", "jack-brabham", "Brabham", "Brabham", "brabham"],
  [1967, "Denny Hulme", "denny-hulme", "Brabham", "Brabham", "brabham"],
  [1968, "Graham Hill", "graham-hill", "Lotus", "Lotus", "lotus"],
  [1969, "Jackie Stewart", "jackie-stewart", "Matra", "Matra", "matra"],
  [1970, "Jochen Rindt", "jochen-rindt", "Lotus", "Lotus", "lotus"],
  [1971, "Jackie Stewart", "jackie-stewart", "Tyrrell", "Tyrrell", "tyrrell"],
  [1972, "Emerson Fittipaldi", "emerson-fittipaldi", "Lotus", "Lotus", "lotus"],
  [1973, "Jackie Stewart", "jackie-stewart", "Tyrrell", "Lotus", "lotus"],
  [1974, "Emerson Fittipaldi", "emerson-fittipaldi", "McLaren", "McLaren", "mclaren"],
  [1975, "Niki Lauda", "niki-lauda", "Ferrari", "Ferrari", "ferrari"],
  [1976, "James Hunt", "james-hunt", "McLaren", "Ferrari", "ferrari"],
  [1977, "Niki Lauda", "niki-lauda", "Ferrari", "Ferrari", "ferrari"],
  [1978, "Mario Andretti", "mario-andretti", "Lotus", "Lotus", "lotus"],
  [1979, "Jody Scheckter", "jody-scheckter", "Ferrari", "Ferrari", "ferrari"],
  [1980, "Alan Jones", "alan-jones", "Williams", "Williams", "williams"],
  [1981, "Nelson Piquet", "nelson-piquet", "Brabham", "Williams", "williams"],
  [1982, "Keke Rosberg", "keke-rosberg", "Williams", "Ferrari", "ferrari"],
  [1983, "Nelson Piquet", "nelson-piquet", "Brabham", "Ferrari", "ferrari"],
  [1984, "Niki Lauda", "niki-lauda", "McLaren", "McLaren", "mclaren"],
  [1985, "Alain Prost", "alain-prost", "McLaren", "McLaren", "mclaren"],
  [1986, "Alain Prost", "alain-prost", "McLaren", "Williams", "williams"],
  [1987, "Nelson Piquet", "nelson-piquet", "Williams", "Williams", "williams"],
  [1988, "Ayrton Senna", "ayrton-senna", "McLaren", "McLaren", "mclaren"],
  [1989, "Alain Prost", "alain-prost", "McLaren", "McLaren", "mclaren"],
  [1990, "Ayrton Senna", "ayrton-senna", "McLaren", "McLaren", "mclaren"],
  [1991, "Ayrton Senna", "ayrton-senna", "McLaren", "McLaren", "mclaren"],
  [1992, "Nigel Mansell", "nigel-mansell", "Williams", "Williams", "williams"],
  [1993, "Alain Prost", "alain-prost", "Williams", "Williams", "williams"],
  [1994, "Michael Schumacher", "michael-schumacher", "Benetton", "Williams", "williams"],
  [1995, "Michael Schumacher", "michael-schumacher", "Benetton", "Benetton", "benetton"],
  [1996, "Damon Hill", "damon-hill", "Williams", "Williams", "williams"],
  [1997, "Jacques Villeneuve", "jacques-villeneuve", "Williams", "Williams", "williams"],
  [1998, "Mika Häkkinen", "mika-hakkinen", "McLaren", "McLaren", "mclaren"],
  [1999, "Mika Häkkinen", "mika-hakkinen", "McLaren", "Ferrari", "ferrari"],
  [2000, "Michael Schumacher", "michael-schumacher", "Ferrari", "Ferrari", "ferrari"],
  [2001, "Michael Schumacher", "michael-schumacher", "Ferrari", "Ferrari", "ferrari"],
  [2002, "Michael Schumacher", "michael-schumacher", "Ferrari", "Ferrari", "ferrari"],
  [2003, "Michael Schumacher", "michael-schumacher", "Ferrari", "Ferrari", "ferrari"],
  [2004, "Michael Schumacher", "michael-schumacher", "Ferrari", "Ferrari", "ferrari"],
  [2005, "Fernando Alonso", "fernando-alonso", "Renault", "Renault", "renault"],
  [2006, "Fernando Alonso", "fernando-alonso", "Renault", "Renault", "renault"],
  [2007, "Kimi Räikkönen", "kimi-raikkonen", "Ferrari", "Ferrari", "ferrari"],
  [2008, "Lewis Hamilton", "lewis-hamilton", "McLaren", "Ferrari", "ferrari"],
  [2009, "Jenson Button", "jenson-button", "Brawn", "Brawn", "brawn"],
  [2010, "Sebastian Vettel", "sebastian-vettel", "Red Bull", "Red Bull", "red-bull"],
  [2011, "Sebastian Vettel", "sebastian-vettel", "Red Bull", "Red Bull", "red-bull"],
  [2012, "Sebastian Vettel", "sebastian-vettel", "Red Bull", "Red Bull", "red-bull"],
  [2013, "Sebastian Vettel", "sebastian-vettel", "Red Bull", "Red Bull", "red-bull"],
  [2014, "Lewis Hamilton", "lewis-hamilton", "Mercedes", "Mercedes", "mercedes"],
  [2015, "Lewis Hamilton", "lewis-hamilton", "Mercedes", "Mercedes", "mercedes"],
  [2016, "Nico Rosberg", "nico-rosberg", "Mercedes", "Mercedes", "mercedes"],
  [2017, "Lewis Hamilton", "lewis-hamilton", "Mercedes", "Mercedes", "mercedes"],
  [2018, "Lewis Hamilton", "lewis-hamilton", "Mercedes", "Mercedes", "mercedes"],
  [2019, "Lewis Hamilton", "lewis-hamilton", "Mercedes", "Mercedes", "mercedes"],
  [2020, "Lewis Hamilton", "lewis-hamilton", "Mercedes", "Mercedes", "mercedes"],
  [2021, "Max Verstappen", "max-verstappen", "Red Bull", "Mercedes", "mercedes"],
  [2022, "Max Verstappen", "max-verstappen", "Red Bull", "Red Bull", "red-bull"],
  [2023, "Max Verstappen", "max-verstappen", "Red Bull", "Red Bull", "red-bull"],
  [2024, "Max Verstappen", "max-verstappen", "Red Bull", "McLaren", "mclaren"],
  [2025, "Lando Norris", "lando-norris", "McLaren", "McLaren", "mclaren"],
];

const HEADLINES: Record<number, string> = {
  1950: "The first World Championship season, opened at Silverstone and dominated by Alfa Romeo.",
  1952: "The first of two seasons run to Formula Two regulations; Ascari and Ferrari are untouchable.",
  1954: "A new 2.5-litre formula and the arrival of the Mercedes-Benz W196.",
  1955: "Mercedes-Benz's final season before withdrawing from motor racing.",
  1957: "Fangio's fifth and final championship.",
  1958: "The first constructors' championship; Hawthorn becomes Britain's first champion.",
  1959: "Cooper's mid-engined car wins both titles.",
  1961: "The 1.5-litre formula begins; Phil Hill is the first American champion.",
  1962: "The monocoque Lotus 25 makes its debut.",
  1964: "Surtees becomes champion on two wheels and four.",
  1966: "The 3-litre formula begins; Brabham wins in his own car.",
  1967: "The Cosworth DFV wins on its debut in the Lotus 49.",
  1968: "Sponsorship liveries and wings arrive; Jim Clark is killed in April.",
  1970: "Rindt becomes the only posthumous world champion.",
  1973: "Stewart's third title and retirement.",
  1976: "Lauda's Nürburgring crash and Hunt's one-point title.",
  1977: "Renault's turbo and Lotus's ground effect debut.",
  1978: "The ground-effect Lotus 79 wins both championships.",
  1981: "Carbon-fibre chassis and the first Concorde Agreement.",
  1982: "Eleven different winners; Rosberg wins the title with a single victory.",
  1983: "Piquet becomes the first turbo-era champion.",
  1984: "Lauda beats Prost by half a point.",
  1988: "McLaren-Honda wins 15 of 16 races; Senna's first title.",
  1989: "Turbos are banned; Prost and Senna collide at Suzuka.",
  1992: "The active-suspension Williams FW14B carries Mansell to the title.",
  1994: "Driver aids banned, refuelling returns; the tragedy of Imola.",
  1998: "Narrow-track cars and grooved tyres.",
  2000: "Schumacher wins Ferrari's first drivers' title since 1979.",
  2004: "Schumacher's seventh title.",
  2005: "The tyre war peaks; Alonso becomes champion.",
  2006: "2.4-litre V8 engines replace the V10s.",
  2008: "The first night race; Hamilton wins by a single point.",
  2009: "Radical new rules, KERS, and Brawn GP's fairy-tale double.",
  2010: "Refuelling is banned and the 25-point system begins.",
  2011: "Pirelli tyres and DRS arrive.",
  2014: "The turbo-hybrid era begins.",
  2016: "Rosberg wins the title and retires.",
  2017: "Wider, faster cars; Liberty Media takes control.",
  2018: "The halo becomes mandatory.",
  2020: "A pandemic-reshaped calendar; Hamilton's seventh title.",
  2021: "The budget cap and sprints begin; a title decided on the final lap.",
  2022: "Ground-effect aerodynamics return.",
  2023: "Red Bull wins 21 of 22 Grands Prix.",
  2024: "McLaren wins its first constructors' title since 1998.",
  2025: "Norris wins the drivers' title; McLaren retains the constructors' crown.",
  2026: "A new formula — active aerodynamics, new power units and an eleven-team grid.",
};

export const FIRST_YEAR = 1950;
export const LAST_YEAR = 2026;

export const SEASONS: Season[] = Array.from({ length: LAST_YEAR - FIRST_YEAR + 1 }, (_, i) => {
  const year = FIRST_YEAR + i;
  const row = ROWS.find((r) => r[0] === year);
  return {
    year,
    status: row ? "complete" : "in-progress",
    headline: HEADLINES[year],
    champions: row
      ? { driver: row[1], driverSlug: row[2], driverTeam: row[3], constructor: row[4], constructorSlug: row[5] }
      : undefined,
  };
});

export function getSeason(year: number) {
  return SEASONS.find((s) => s.year === year);
}

export function seasonsInEra(eraId: string) {
  return SEASONS.filter((s) => eraForYear(s.year).id === eraId);
}

/** Drivers' titles by driver slug, derived from the season index. */
export function driverTitles(slug: string): number[] {
  return SEASONS.filter((s) => s.champions?.driverSlug === slug).map((s) => s.year);
}

/** Constructors' titles by team slug, derived from the season index. */
export function constructorTitles(slug: string): number[] {
  return SEASONS.filter((s) => s.champions?.constructorSlug === slug).map((s) => s.year);
}

/** Seasons in which a driver from this team won the drivers' title. */
export function teamDriverTitles(teamName: string): number[] {
  return SEASONS.filter((s) => s.champions?.driverTeam.includes(teamName)).map((s) => s.year);
}

/* ---------------------------------------------------------------------------
 * Championship structure — points systems over time.
 * Simplified editorial summary. Dropped-score rules (where only a driver's
 * best results counted) applied in many seasons before 1991 and are noted
 * but not modelled; Phase 2 will add the exact per-season rules.
 * ------------------------------------------------------------------------- */
export type PointsSystem = {
  from: number;
  to: number;
  points: number[];
  notes: string[];
};

export const POINTS_SYSTEMS: PointsSystem[] = [
  { from: 1950, to: 1959, points: [8, 6, 4, 3, 2], notes: ["One additional point for the fastest lap.", "Only a driver's best results counted toward the championship.", "Shared drives split the points."] },
  { from: 1960, to: 1960, points: [8, 6, 4, 3, 2, 1], notes: ["Points extended to sixth place; no fastest-lap point.", "Only a driver's best results counted."] },
  { from: 1961, to: 1990, points: [9, 6, 4, 3, 2, 1], notes: ["A win worth nine points.", "Dropped-score rules applied in many seasons, so a driver's best results counted."] },
  { from: 1991, to: 2002, points: [10, 6, 4, 3, 2, 1], notes: ["A win worth ten points; all results count from 1991."] },
  { from: 2003, to: 2009, points: [10, 8, 6, 5, 4, 3, 2, 1], notes: ["Points extended to eighth place, narrowing the gap between first and second."] },
  { from: 2010, to: 2026, points: [25, 18, 15, 12, 10, 8, 6, 4, 2, 1], notes: ["Points extended to tenth place.", "2019–2024: one point for the fastest lap if the driver finished in the top ten.", "From 2021: sprint races award additional points (top eight from 2022)."] },
];

export function pointsFor(year: number) {
  return POINTS_SYSTEMS.find((p) => year >= p.from && year <= p.to);
}
