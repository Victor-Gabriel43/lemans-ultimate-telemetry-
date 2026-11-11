/**
 * Bakes real circuit geometry into compact local-metre JSON for the 3D
 * Circuit Experience.
 *
 *   node scripts/bake-circuits.mjs          # track geometry only
 *   node scripts/bake-circuits.mjs --osm    # + OpenStreetMap surroundings
 *
 * Sources
 *  - Track centrelines: bacinger/f1-circuits (MIT) — github.com/bacinger/f1-circuits
 *  - Buildings / water / woodland: © OpenStreetMap contributors (ODbL), via Overpass API
 *
 * Output
 *  - public/circuits/<jolpicaCircuitId>.json   full geometry, lazy-loaded by the 3D view
 *  - lib/f1/circuit-meta.json                  small index for server pages (with an
 *                                              80-point outline for SVG maps)
 *   track: [[x, z], …] metres, x = east, z = south, origin at track centroid
 *   env:   { buildings: [{ h, p: [[x,z]…] }], water: [[[x,z]…]], trees: [[x,z]…] }
 */
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";

const SRC = "https://raw.githubusercontent.com/bacinger/f1-circuits/master/f1-circuits.geojson";
const OVERPASS = "https://overpass-api.de/api/interpreter";

// Jolpica circuitId → bacinger feature id
const MAP = {
  albert_park: "au-1953", shanghai: "cn-2004", suzuka: "jp-1962", miami: "us-2022",
  villeneuve: "ca-1978", monaco: "mc-1929", catalunya: "es-1991", red_bull_ring: "at-1969",
  silverstone: "gb-1948", spa: "be-1925", hungaroring: "hu-1986", zandvoort: "nl-1948",
  monza: "it-1922", madring: "es-2026", baku: "az-2016", sepang: "my-1999",
  marina_bay: "sg-2008", americas: "us-2012", rodriguez: "mx-1962", interlagos: "br-1940",
  vegas: "us-2023", losail: "qa-2004", yas_marina: "ae-2009", bahrain: "bh-2002",
  jeddah: "sa-2021", imola: "it-1953",
};

const withOsm = process.argv.includes("--osm");
const r1 = (n) => Math.round(n * 10) / 10;

function projector(lat0, lon0) {
  const kx = Math.cos((lat0 * Math.PI) / 180) * 111320;
  const kz = 110540;
  return ([lon, lat]) => [r1((lon - lon0) * kx), r1(-(lat - lat0) * kz)];
}

async function overpass(q) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(OVERPASS, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", "User-Agent": "motorsport-intelligence-bake/1.0" },
        body: "data=" + encodeURIComponent(q),
      });
      if (res.ok) return await res.json();
      console.warn("  overpass", res.status);
    } catch (e) {
      console.warn("  overpass error", e.message);
    }
    await new Promise((r) => setTimeout(r, 8000 * (attempt + 1)));
  }
  return null;
}

function heightOf(tags = {}) {
  const h = parseFloat(tags.height);
  if (h > 0 && h < 400) return Math.round(h);
  const lv = parseFloat(tags["building:levels"]);
  if (lv > 0 && lv < 120) return Math.round(lv * 3.2 + 1);
  return 0; // unknown → renderer picks a setting-based default
}

const geo = JSON.parse(await (await fetch(SRC)).text());
const byId = Object.fromEntries(geo.features.map((f) => [f.properties.id, f]));
mkdirSync("public/circuits", { recursive: true });
const META_FILE = "lib/f1/circuit-meta.json";
const meta = existsSync(META_FILE) ? JSON.parse(readFileSync(META_FILE, "utf8")) : {};

for (const [cid, fid] of Object.entries(MAP)) {
  const f = byId[fid];
  if (!f) { console.warn("missing", cid); continue; }
  const coords = f.geometry.type === "LineString" ? f.geometry.coordinates : f.geometry.coordinates[0];
  const lon0 = coords.reduce((s, c) => s + c[0], 0) / coords.length;
  const lat0 = coords.reduce((s, c) => s + c[1], 0) / coords.length;
  const P = projector(lat0, lon0);
  const out = {
    id: cid,
    source: { track: "bacinger/f1-circuits (MIT)", trackId: fid },
    name: f.properties.Name,
    location: f.properties.Location,
    lengthM: Number(f.properties.length) || null,
    opened: f.properties.opened ?? null,
    firstGp: f.properties.firstgp ?? null,
    altitudeM: f.properties.altitude ?? null,
    center: [Math.round(lat0 * 1e6) / 1e6, Math.round(lon0 * 1e6) / 1e6],
    track: coords.map(P),
  };

  const file = `public/circuits/${cid}.json`;
  if (existsSync(file)) {
    const prev = JSON.parse(readFileSync(file, "utf8"));
    if (prev.env) out.env = prev.env; // keep previously baked OSM data
  }

  if (withOsm) {
    const lats = coords.map((c) => c[1]);
    const lons = coords.map((c) => c[0]);
    const pad = 0.006; // ≈ 600 m
    const bbox = [Math.min(...lats) - pad, Math.min(...lons) - pad, Math.max(...lats) + pad, Math.max(...lons) + pad].join(",");
    console.log("osm", cid);
    const j = await overpass(
      `[out:json][timeout:90];(way["building"](${bbox});way["natural"="water"](${bbox});way["natural"="wood"](${bbox});way["landuse"="forest"](${bbox}););out geom;`
    );
    if (j) {
      const buildings = [], water = [], woods = [];
      for (const el of j.elements) {
        if (!el.geometry || el.geometry.length < 4) continue;
        const ring = el.geometry.map((g) => P([g.lon, g.lat]));
        const t = el.tags || {};
        if (t.building) buildings.push({ h: heightOf(t), p: ring });
        else if (t.natural === "water") water.push(ring);
        else woods.push(ring);
      }
      // Scatter trees inside woodland polygons (deterministic grid, capped).
      const trees = [];
      const inside = (pt, poly) => {
        let c = false;
        for (let i = 0, j2 = poly.length - 1; i < poly.length; j2 = i++) {
          const [xi, zi] = poly[i], [xj, zj] = poly[j2];
          if (zi > pt[1] !== zj > pt[1] && pt[0] < ((xj - xi) * (pt[1] - zi)) / (zj - zi) + xi) c = !c;
        }
        return c;
      };
      for (const poly of woods) {
        const xs = poly.map((p) => p[0]), zs = poly.map((p) => p[1]);
        for (let x = Math.min(...xs); x < Math.max(...xs); x += 14)
          for (let z = Math.min(...zs); z < Math.max(...zs); z += 14) {
            const pt = [r1(x + ((x * 7 + z * 13) % 9)), r1(z + ((x * 11 + z * 3) % 9))];
            if (trees.length < 6000 && inside(pt, poly)) trees.push(pt);
          }
      }
      buildings.sort((a, b) => b.p.length - a.p.length);
      out.env = { buildings: buildings.slice(0, 6000), water, trees, source: "© OpenStreetMap contributors (ODbL)" };
      console.log(`  ${buildings.length} buildings, ${water.length} water, ${trees.length} trees`);
    }
    await new Promise((r) => setTimeout(r, 4000));
  }
  writeFileSync(file, JSON.stringify(out));
  const step = Math.max(1, Math.floor(out.track.length / 80));
  meta[cid] = {
    name: out.name, location: out.location, lengthM: out.lengthM, opened: out.opened,
    firstGp: out.firstGp, altitudeM: out.altitudeM, center: out.center,
    outline: out.track.filter((_, i) => i % step === 0).map(([x, z]) => [Math.round(x), Math.round(z)]),
    hasEnv: Boolean(out.env),
  };
  writeFileSync(META_FILE, JSON.stringify(meta));
}
console.log("done");
