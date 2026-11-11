#!/usr/bin/env node
/**
 * F1DB → Paddock data pipeline.
 *
 * Reads the F1DB source YAML (https://github.com/f1db/f1db, CC BY 4.0) and
 * writes compact JSON into web/data/f1. The output is committed so that
 * production builds never depend on network access.
 *
 * Usage:
 *   F1DB_DIR=/path/to/f1db node web/scripts/f1db/build.mjs
 *
 * Derived values (career statistics, title lists, circuit editions) are
 * computed here from race-level records — never typed by hand.
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import YAML from "yaml";

const SRC = process.env.F1DB_DIR;
if (!SRC) throw new Error("Set F1DB_DIR to a checkout of github.com/f1db/f1db");
const DATA = path.join(SRC, "src/data");
const OUT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../data/f1");
const SVG_OUT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../public/media/circuits");

const read = (p) => YAML.parse(fs.readFileSync(p, "utf8"));
const readDir = (dir) =>
  fs
    .readdirSync(path.join(DATA, dir))
    .filter((f) => f.endsWith(".yml"))
    .map((f) => read(path.join(DATA, dir, f)));
const opt = (p) => (fs.existsSync(p) ? read(p) ?? [] : null);
const clean = (o) => {
  // drop null / undefined / empty strings to keep JSON small
  for (const k of Object.keys(o)) if (o[k] === null || o[k] === undefined || o[k] === "") delete o[k];
  return o;
};

let release = "unknown";
try {
  release = execSync("git describe --tags --always", { cwd: SRC }).toString().trim();
} catch {}
const commit = execSync("git rev-parse HEAD", { cwd: SRC }).toString().trim();
const commitDate = execSync("git log -1 --format=%cI", { cwd: SRC }).toString().trim();

/* ------------------------------------------------------------------ entities */
const countries = Object.fromEntries(
  readDir("countries").map((c) => [c.id, clean({ name: c.name, demonym: c.demonym, alpha2: c.alpha2Code, continent: c.continentId })]),
);
const drivers = readDir("drivers");
const constructors = readDir("constructors");
const chassis = readDir("chassis");
const engines = readDir("engines");
const engineMfrs = readDir("engine-manufacturers");
const tyres = readDir("tyre-manufacturers");
const circuits = readDir("circuits");
const grandsPrix = readDir("grands-prix");

/* ------------------------------------------------------------------ seasons */
const years = fs
  .readdirSync(path.join(DATA, "seasons"))
  .filter((y) => /^\d{4}$/.test(y))
  .map(Number)
  .sort((a, b) => a - b);

const RESULT_FIELDS = (r) =>
  clean({
    pos: r.position,
    no: r.driverNumber,
    d: r.driverId,
    c: r.constructorId,
    e: r.engineManufacturerId,
    laps: r.laps,
    time: r.time,
    gap: r.gap,
    why: r.reasonRetired,
    pts: r.points,
    grid: r.gridPosition,
    pen: r.timePenalty,
    shared: r.sharedCar || undefined,
  });

// Accumulators
const dStats = new Map(); // driverId -> stats
const cStats = new Map(); // constructorId -> stats
const chStats = new Map(); // chassisId -> {years:Set, drivers:Set, engines:Set, wins, races}
const circuitEditions = new Map(); // circuitId -> [{year, slug, gp, layout, winner, winnerC}]
const engMfrStats = new Map();
const seasonsIndex = [];

const ds = (id) => {
  if (!dStats.has(id))
    dStats.set(id, { entries: 0, starts: 0, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, points: 0, sprintWins: 0, titles: [], seasons: new Map(), winList: [] });
  return dStats.get(id);
};
const cs = (id) => {
  if (!cStats.has(id))
    cStats.set(id, { entries: 0, starts: 0, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, titles: [], driverTitles: [], seasons: new Map(), engines: new Map() });
  return cStats.get(id);
};
const chs = (id) => {
  if (!chStats.has(id)) chStats.set(id, { years: new Set(), drivers: new Set(), engines: new Set(), entrants: new Set(), wins: 0, races: 0, poles: 0 });
  return chStats.get(id);
};

const isNum = (p) => typeof p === "number";

fs.mkdirSync(path.join(OUT, "seasons"), { recursive: true });

for (const year of years) {
  const sdir = path.join(DATA, "seasons", String(year));
  const entrantsRaw = opt(path.join(sdir, "entrants.yml")) ?? [];
  const dStand = opt(path.join(sdir, "driver-standings.yml")) ?? [];
  const cStand = opt(path.join(sdir, "constructor-standings.yml")) ?? [];

  // Entrants: normalise to {entrant, constructor, chassis[], engines[], tyre, drivers[{d, rounds}]}
  const entrants = entrantsRaw.map((e) => {
    const chassisIds = e.chassisId ? [e.chassisId] : (e.chassis ?? []).map((c) => c.chassisId);
    const engineIds = e.engineId ? [e.engineId] : (e.engines ?? []).map((x) => x.engineId);
    const driversList = e.driverId ? [{ d: e.driverId, rounds: e.rounds }] : (e.drivers ?? []).map((x) => clean({ d: x.driverId, rounds: x.rounds, test: x.testDriver || undefined }));
    return clean({
      entrant: e.entrantId,
      country: e.countryId,
      c: e.constructorId,
      e: e.engineManufacturerId,
      chassis: chassisIds,
      engines: engineIds,
      tyre: e.tyreManufacturerId,
      drivers: driversList,
    });
  });

  for (const en of entrants) {
    const c = cs(en.c);
    const cy = c.seasons.get(year) ?? { drivers: new Set(), chassis: new Set(), engines: new Set(), entrants: new Set() };
    en.drivers.forEach((x) => !x.test && cy.drivers.add(x.d));
    en.chassis.forEach((x) => cy.chassis.add(x));
    en.engines.forEach((x) => cy.engines.add(x));
    cy.entrants.add(en.entrant);
    c.seasons.set(year, cy);
    if (en.e) c.engines.set(en.e, [...(c.engines.get(en.e) ?? []), year]);
    for (const ch of en.chassis) {
      const s = chs(ch);
      s.years.add(year);
      en.drivers.forEach((x) => !x.test && s.drivers.add(x.d));
      en.engines.forEach((x) => s.engines.add(x));
      s.entrants.add(en.entrant);
    }
  }

  const raceDirs = fs.readdirSync(path.join(sdir, "races")).sort();
  const races = [];
  for (const rd of raceDirs) {
    const rdir = path.join(sdir, "races", rd);
    const meta = read(path.join(rdir, "race.yml"));
    const slug = rd.replace(/^\d+-/, "");
    const results = (opt(path.join(rdir, "race-results.yml")) ?? []).map(RESULT_FIELDS);
    const quali = opt(path.join(rdir, "qualifying-results.yml")) ?? [];
    const grid = opt(path.join(rdir, "starting-grid-positions.yml")) ?? [];
    const fl = opt(path.join(rdir, "fastest-laps.yml")) ?? [];
    const sprint = (opt(path.join(rdir, "sprint-race-results.yml")) ?? []).map(RESULT_FIELDS);

    // Pole = first on the starting grid (matches established records, e.g. grid penalties);
    // qualifying P1 only when no grid record exists.
    const gridPole = grid.find((g) => g.position === 1);
    const qualiPole = quali.find((q) => q.position === 1);
    const poleRow = gridPole ?? qualiPole;
    const poleTime = qualiPole && poleRow && qualiPole.driverId === poleRow.driverId ? qualiPole.time ?? qualiPole.q3 ?? qualiPole.q2 ?? qualiPole.q1 : undefined;
    const flRow = fl.find((f) => f.position === 1);
    const done = results.length > 0;

    const race = clean({
      round: meta.round,
      slug,
      date: meta.date,
      time: meta.time,
      gp: meta.grandPrixId,
      name: meta.officialName,
      circuit: meta.circuitId,
      layout: meta.circuitLayoutId,
      type: meta.circuitType,
      length: meta.courseLength,
      laps: meta.laps,
      scheduledLaps: meta.scheduledLaps,
      distance: meta.distance,
      quali: meta.qualifyingFormat,
      sprintFormat: meta.sprintQualifyingFormat,
      status: done ? "completed" : "scheduled",
      pole: poleRow ? clean({ d: poleRow.driverId, c: poleRow.constructorId, time: poleTime }) : undefined,
      fastestLap: flRow ? clean({ d: flRow.driverId, c: flRow.constructorId, time: flRow.time, lap: flRow.lap }) : undefined,
      results,
      sprint: sprint.length ? sprint : undefined,
      qualifying: quali.length
        ? quali.slice(0, 30).map((q) => clean({ pos: q.position, d: q.driverId, c: q.constructorId, time: q.time, q1: q.q1, q2: q.q2, q3: q.q3 }))
        : undefined,
    });
    races.push(race);

    // ---- statistics from race-level records
    if (done) {
      const startedPositions = new Set(["DNQ", "DNPQ", "EX", "DNP"]);
      const seenD = new Set();
      const seenC = new Set();
      for (const r of results) {
        const d = ds(r.d);
        const dy = d.seasons.get(year) ?? { constructors: new Set(), wins: 0, podiums: 0, poles: 0, starts: 0 };
        if (!seenD.has(r.d)) {
          d.entries++;
          seenD.add(r.d);
        }
        const started = !startedPositions.has(r.pos) && r.pos !== "DNS";
        const startKey = `${r.d}|start`;
        if (started && !seenD.has(startKey)) {
          // a shared car in the 1950s can list a driver twice in one race
          seenD.add(startKey);
          d.starts++;
          dy.starts++;
        }
        dy.constructors.add(r.c);
        if (r.pos === 1) {
          d.wins++;
          dy.wins++;
          d.winList.push(`${year}/${slug}`);
        }
        if (isNum(r.pos) && r.pos <= 3) {
          d.podiums++;
          dy.podiums++;
        }
        d.seasons.set(year, dy);

        const c = cs(r.c);
        if (!seenC.has(r.c)) {
          c.entries++;
          seenC.add(r.c);
          if (started) c.starts++;
        }
        if (r.pos === 1) c.wins++;
        if (isNum(r.pos) && r.pos <= 3) c.podiums++;
      }
      if (poleRow) {
        ds(poleRow.driverId).poles++;
        const dy = ds(poleRow.driverId).seasons.get(year);
        if (dy) dy.poles++;
        cs(poleRow.constructorId).poles++;
      }
      if (flRow) {
        ds(flRow.driverId).fastestLaps++;
        cs(flRow.constructorId).fastestLaps++;
      }
      for (const s of sprint) if (s.pos === 1) ds(s.d).sprintWins++;

      // chassis race participation & wins (via entrants mapping for that round)
      const roundChassis = new Map(); // constructorId|driverId -> chassisId
      for (const en of entrants) {
        if (en.chassis.length === 1) {
          for (const x of en.drivers) roundChassis.set(`${en.c}|${x.d}`, en.chassis[0]);
          roundChassis.set(`${en.c}|*`, en.chassis[0]);
        }
      }
      const winner = results.find((r) => r.pos === 1);
      if (winner) {
        const ch = roundChassis.get(`${winner.c}|${winner.d}`) ?? roundChassis.get(`${winner.c}|*`);
        if (ch) chs(ch).wins++;
      }

      const eds = circuitEditions.get(meta.circuitId) ?? [];
      eds.push(clean({ y: year, s: slug, gp: meta.grandPrixId, l: meta.circuitLayoutId, w: winner?.d, wc: winner?.c, name: meta.officialName }));
      circuitEditions.set(meta.circuitId, eds);

      for (const r of results) {
        if (!r.e) continue;
        const m = engMfrStats.get(r.e) ?? { wins: 0, years: new Set() };
        m.years.add(year);
        if (r.pos === 1) m.wins++;
        engMfrStats.set(r.e, m);
      }
    } else {
      const eds = circuitEditions.get(meta.circuitId) ?? [];
      eds.push(clean({ y: year, s: slug, gp: meta.grandPrixId, l: meta.circuitLayoutId, name: meta.officialName, scheduled: true }));
      circuitEditions.set(meta.circuitId, eds);
    }
  }

  // season standings -> season positions in driver/constructor stats
  const completedRaces = races.filter((r) => r.status === "completed").length;
  const status = completedRaces === races.length ? "completed" : "in-progress";
  for (const s of dStand) {
    const dy = ds(s.driverId).seasons.get(year);
    if (dy) {
      dy.pos = s.position;
      dy.pts = s.points;
    }
    if (status === "completed") ds(s.driverId).points += s.points;
  }
  for (const s of cStand) {
    const cy = cs(s.constructorId).seasons.get(year);
    if (cy) {
      cy.pos = s.position;
      cy.pts = s.points;
    }
  }
  const champD = status === "completed" ? dStand.find((s) => s.position === 1) : undefined;
  const champC = status === "completed" ? cStand.find((s) => s.position === 1) : undefined;
  if (champD) {
    ds(champD.driverId).titles.push(year);
    // constructor the champion drove for (most races that year)
    const counts = new Map();
    races.forEach((r) => r.results?.forEach((x) => x.d === champD.driverId && counts.set(x.c, (counts.get(x.c) ?? 0) + 1)));
    const team = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
    if (team) cs(team).driverTitles.push(year);
  }
  if (champC) cs(champC.constructorId).titles.push(year);

  const season = {
    year,
    status,
    races,
    entrants,
    driverStandings: dStand.map((s) => clean({ pos: s.position, d: s.driverId, pts: s.points, tie: s.positionText?.includes?.("=") || undefined })),
    constructorStandings: cStand.map((s) => clean({ pos: s.position, c: s.constructorId, e: s.engineManufacturerId, pts: s.points })),
  };
  fs.writeFileSync(path.join(OUT, "seasons", `${year}.json`), JSON.stringify(season));

  seasonsIndex.push(
    clean({
      year,
      status,
      rounds: races.length,
      completed: completedRaces,
      champion: champD?.driverId,
      constructorChampion: champC?.constructorId,
      leader: status !== "completed" ? dStand.find((s) => s.position === 1)?.driverId : undefined,
      constructorLeader: status !== "completed" ? cStand.find((s) => s.position === 1)?.constructorId : undefined,
      drivers: new Set(entrants.flatMap((e) => e.drivers.filter((x) => !x.test).map((x) => x.d))).size,
      constructors: new Set(entrants.map((e) => e.c)).size,
      sprints: races.filter((r) => r.sprint).length,
    }),
  );
}

/* ------------------------------------------------------------------ indexes */
const lastYear = years[years.length - 1];

const driverIndex = drivers
  .filter((d) => dStats.has(d.id))
  .map((d) => {
    const s = dStats.get(d.id);
    const seasonYears = [...s.seasons.keys()].sort((a, b) => a - b);
    const teams = [];
    for (const y of seasonYears) for (const c of s.seasons.get(y).constructors) if (!teams.includes(c)) teams.push(c);
    return clean({
      id: d.id,
      name: d.name,
      first: d.firstName,
      last: d.lastName,
      full: d.fullName !== d.name ? d.fullName : undefined,
      abbr: d.abbreviation,
      no: d.permanentNumber,
      gender: d.gender === "FEMALE" ? "F" : undefined,
      dob: d.dateOfBirth,
      dod: d.dateOfDeath,
      pob: d.placeOfBirth,
      cob: d.countryOfBirthCountryId,
      nat: d.nationalityCountryId,
      nat2: d.secondNationalityCountryId,
      family: d.familyRelationships?.length ? d.familyRelationships.map((f) => ({ d: f.driverId, t: f.type })) : undefined,
      first_: seasonYears[0],
      last_: seasonYears[seasonYears.length - 1],
      active: seasonYears.includes(lastYear),
      teams,
      st: {
        entries: s.entries,
        starts: s.starts,
        wins: s.wins,
        podiums: s.podiums,
        poles: s.poles,
        fl: s.fastestLaps,
        sprintWins: s.sprintWins,
        points: Math.round(s.points * 100) / 100,
      },
      titles: s.titles,
      seasons: seasonYears.map((y) => {
        const x = s.seasons.get(y);
        return clean({ y, c: [...x.constructors], pos: x.pos, pts: x.pts, w: x.wins, p: x.podiums, pl: x.poles, s: x.starts });
      }),
      winList: s.winList,
    });
  });

const constructorIndex = constructors
  .filter((c) => cStats.has(c.id))
  .map((c) => {
    const s = cStats.get(c.id);
    const seasonYears = [...s.seasons.keys()].sort((a, b) => a - b);
    return clean({
      id: c.id,
      name: c.name,
      full: c.fullName !== c.name ? c.fullName : undefined,
      country: c.countryId,
      chronology: c.chronology?.map((x) => clean({ c: x.constructorId, from: x.yearFrom, to: x.yearTo })),
      first_: seasonYears[0],
      last_: seasonYears[seasonYears.length - 1],
      active: seasonYears.includes(lastYear),
      st: { entries: s.entries, starts: s.starts, wins: s.wins, podiums: s.podiums, poles: s.poles, fl: s.fastestLaps },
      titles: s.titles,
      driverTitles: s.driverTitles,
      engines: [...s.engines.entries()].map(([e, ys]) => ({ e, years: [...new Set(ys)].sort((a, b) => a - b) })),
      seasons: seasonYears.map((y) => {
        const x = s.seasons.get(y);
        return clean({ y, d: [...x.drivers], ch: [...x.chassis], en: [...x.engines], pos: x.pos, pts: x.pts });
      }),
    });
  });

const chassisIndex = chassis
  .filter((c) => chStats.has(c.id))
  .map((c) => {
    const s = chStats.get(c.id);
    return clean({
      id: c.id,
      c: c.constructorId,
      name: c.name,
      full: c.fullName,
      years: [...s.years].sort((a, b) => a - b),
      drivers: [...s.drivers],
      engines: [...s.engines],
      wins: s.wins,
    });
  });

const engineIndex = engines.map((e) =>
  clean({ id: e.id, m: e.engineManufacturerId, name: e.name, full: e.fullName, cap: e.capacity, cfg: e.configuration, asp: e.aspiration }),
);
const engineMfrIndex = engineMfrs.map((m) => {
  const s = engMfrStats.get(m.id);
  const ys = s ? [...s.years].sort((a, b) => a - b) : [];
  return clean({ id: m.id, name: m.name, country: m.countryId, wins: s?.wins ?? 0, first_: ys[0], last_: ys[ys.length - 1] });
});

// circuits & layouts + vendored SVG layout drawings
fs.mkdirSync(SVG_OUT, { recursive: true });
const svgSrc = path.join(SRC, "src/assets/circuits/black-outline");
const circuitIndex = circuits
  .filter((c) => circuitEditions.has(c.id))
  .map((c) => {
    const eds = circuitEditions.get(c.id).sort((a, b) => a.y - b.y || a.s.localeCompare(b.s));
    const held = eds.filter((e) => !e.scheduled);
    const layouts = (c.layouts ?? []).map((l) => {
      const svg = path.join(svgSrc, `${l.id}.svg`);
      const hasSvg = fs.existsSync(svg);
      if (hasSvg) fs.copyFileSync(svg, path.join(SVG_OUT, `${l.id}.svg`));
      const usedIn = eds.filter((e) => e.l === l.id).map((e) => e.y);
      return clean({ id: l.id, length: l.length, turns: l.turns, svg: hasSvg || undefined, years: [...new Set(usedIn)] });
    });
    return clean({
      id: c.id,
      name: c.name,
      full: c.fullName,
      prev: c.previousNames?.length ? c.previousNames : undefined,
      type: c.type,
      dir: c.direction,
      place: c.placeName,
      country: c.countryId,
      lat: c.latitude,
      lng: c.longitude,
      length: c.length,
      turns: c.turns,
      layouts,
      first_: held[0]?.y,
      last_: held[held.length - 1]?.y,
      onCalendar: eds.some((e) => e.y === lastYear),
      editions: eds,
    });
  });

const gpIndex = grandsPrix.map((g) => clean({ id: g.id, name: g.name, full: g.fullName, short: g.shortName, country: g.countryId }));

const meta = {
  source: "F1DB",
  url: "https://github.com/f1db/f1db",
  license: "CC BY 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  release,
  commit,
  commitDate,
  generatedAt: new Date().toISOString(),
  firstYear: years[0],
  lastYear,
};

const index = {
  meta,
  countries,
  seasons: seasonsIndex,
  drivers: driverIndex,
  constructors: constructorIndex,
  chassis: chassisIndex,
  engines: engineIndex,
  engineManufacturers: engineMfrIndex,
  tyres: tyres.map((t) => ({ id: t.id, name: t.name })),
  circuits: circuitIndex,
  grandsPrix: gpIndex,
};
fs.writeFileSync(path.join(OUT, "index.json"), JSON.stringify(index));

console.log(
  `F1DB ${release} → ${years.length} seasons, ${driverIndex.length} drivers, ${constructorIndex.length} constructors, ${chassisIndex.length} chassis, ${circuitIndex.length} circuits, ${fs.readdirSync(SVG_OUT).length} layout drawings`,
);
