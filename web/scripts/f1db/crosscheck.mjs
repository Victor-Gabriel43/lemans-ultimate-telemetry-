#!/usr/bin/env node
/**
 * Independent cross-check of the F1DB snapshot against the Jolpica F1 API
 * (successor of the Ergast API). For every race we compare the winner, and
 * for every completed season the drivers' and constructors' champions.
 *
 * Output: web/data/f1/crosscheck.json, consumed by the site to show a data
 * status on each season and race:
 *   cross-checked — both sources agree
 *   disputed      — the sources disagree (shown, never silently resolved)
 *   single-source — the race is not present in the second source
 *
 * Usage: node web/scripts/f1db/crosscheck.mjs
 */
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../data/f1");
const API = "https://api.jolpi.ca/ergast/f1";
const UA = { "User-Agent": "PaddockEncyclopedia/0.2 (educational cross-check)" };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(url, tries = 5) {
  for (let i = 0; i < tries; i++) {
    const res = await fetch(url, { headers: UA });
    if (res.ok) return res.json();
    await sleep(2000 * (i + 1));
  }
  throw new Error(`Failed: ${url}`);
}

async function paged(endpoint, pick) {
  const out = [];
  let offset = 0;
  for (;;) {
    const j = await get(`${API}/${endpoint}.json?limit=100&offset=${offset}`);
    const items = pick(j.MRData);
    out.push(...items);
    offset += 100;
    if (offset >= Number(j.MRData.total)) break;
    await sleep(400);
  }
  return out;
}

// Jolpica uses Ergast ids (e.g. "max_verstappen"); compare on normalised surname + date.
const norm = (s) =>
  String(s ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z]/g, "");

const index = JSON.parse(fs.readFileSync(path.join(OUT, "index.json"), "utf8"));
const driverName = Object.fromEntries(index.drivers.map((d) => [d.id, d]));
const ctorName = Object.fromEntries(index.constructors.map((c) => [c.id, c]));

console.log("Fetching race winners…");
const winners = await paged("results/1", (m) => m.RaceTable.Races);
console.log("Fetching champions (per season)…");
const dChamps = [];
const cChamps = [];
for (const s of index.seasons.filter((x) => x.status === "completed")) {
  const d = await get(`${API}/${s.year}/driverstandings/1.json`);
  dChamps.push(...d.MRData.StandingsTable.StandingsLists);
  await sleep(1100);
  if (s.year >= 1958) {
    const c = await get(`${API}/${s.year}/constructorstandings/1.json`);
    cChamps.push(...c.MRData.StandingsTable.StandingsLists);
    await sleep(1100);
  }
}

const byRound = new Map(winners.map((r) => [`${r.season}-${r.round}`, r]));
const sameName = (ours, theirs) => {
  const a = norm(ours?.name), f = norm(theirs.familyName), full = norm(`${theirs.givenName}${theirs.familyName}`);
  return !!ours && (a.includes(f) || full.includes(norm(ours.last)) || a === full);
};
const races = {};
let agree = 0,
  disputed = 0,
  single = 0;

for (const s of index.seasons) {
  const season = JSON.parse(fs.readFileSync(path.join(OUT, "seasons", `${s.year}.json`), "utf8"));
  for (const r of season.races) {
    if (r.status !== "completed") continue;
    const key = `${s.year}/${r.slug}`;
    const ours = r.results.filter((x) => x.pos === 1).map((x) => driverName[x.d]);
    const theirs = byRound.get(`${s.year}-${r.round}`);
    if (!theirs) {
      races[key] = { status: "single-source" };
      single++;
      continue;
    }
    const theirWinners = theirs.Results.filter((x) => x.position === "1").map((x) => x.Driver);
    const ok = ours.some((d) => theirWinners.some((t) => sameName(d, t)));
    if (ok) {
      races[key] = { status: "cross-checked" };
      agree++;
    } else {
      races[key] = {
        status: "disputed",
        note: `F1DB: ${ours.map((d) => d?.name).join(", ")} · Jolpica: ${theirs.Results.filter((x) => x.position === "1")
          .map((x) => `${x.Driver.givenName} ${x.Driver.familyName}`)
          .join(", ")}`,
      };
      disputed++;
    }
  }
}

const seasons = {};
for (const s of index.seasons) {
  if (s.status !== "completed") {
    seasons[s.year] = { status: "provisional" };
    continue;
  }
  const jd = dChamps.find((x) => Number(x.season) === s.year)?.DriverStandings?.[0];
  const jc = cChamps.find((x) => Number(x.season) === s.year)?.ConstructorStandings?.[0];
  const dOk = jd && sameName(driverName[s.champion], jd.Driver);
  const cOk = s.year < 1958 ? true : jc && (norm(jc.Constructor.name).includes(norm(ctorName[s.constructorChampion]?.name)) || norm(ctorName[s.constructorChampion]?.name).includes(norm(jc.Constructor.name)));
  seasons[s.year] = dOk && cOk
    ? { status: "cross-checked" }
    : { status: "disputed", note: `Jolpica: ${jd ? `${jd.Driver.givenName} ${jd.Driver.familyName}` : "—"} / ${jc?.Constructor.name ?? "—"}` };
}

const result = {
  source: "Jolpica F1 API (Ergast-compatible)",
  url: "https://api.jolpi.ca/ergast/",
  checkedAt: new Date().toISOString(),
  summary: { racesAgree: agree, racesDisputed: disputed, racesSingleSource: single },
  seasons,
  races,
};
fs.writeFileSync(path.join(OUT, "crosscheck.json"), JSON.stringify(result));
console.log(JSON.stringify(result.summary), Object.entries(seasons).filter(([, v]) => v.status === "disputed"));
for (const [k, v] of Object.entries(races)) if (v.status !== "cross-checked") console.log(k, v);
