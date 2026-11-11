/**
 * Editorial season data that complements the F1DB snapshot:
 * one-line headlines and the points systems used over time.
 * Champions, calendars, results and standings come from data/f1 (F1DB).
 */
export const HEADLINES: Record<number, string> = {
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


/* ---------------------------------------------------------------------------
 * Championship structure — points systems over time (editorial summary).
 * Dropped-score rules applied in many seasons before 1991 and are noted but
 * not modelled.
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

