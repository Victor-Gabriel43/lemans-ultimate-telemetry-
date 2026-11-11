/**
 * Track model: turns the real (coarse) centreline into a smooth, evenly
 * sampled closed spline and derives everything the scene and simulation
 * need — tangents, normals, curvature, detected corners, sectors and a
 * physically-motivated speed profile.
 *
 * Coordinates: metres, x = east, z = south (three.js ground plane), y = up.
 */
import * as THREE from "three";

export type CircuitData = {
  id: string;
  name: string;
  lengthM: number | null;
  track: [number, number][];
  env?: {
    buildings: { h: number; p: [number, number][] }[];
    water: [number, number][][];
    trees: [number, number][];
  };
};

export type Corner = {
  n: number;
  i: number; // apex sample index
  s: number; // distance from start/finish (m)
  radius: number; // m
  dir: "left" | "right";
  apexKmh: number; // simulated
};

export type Track = {
  N: number;
  ds: number; // spacing between samples (m)
  length: number;
  px: Float32Array;
  pz: Float32Array;
  tx: Float32Array; // unit tangent
  tz: Float32Array;
  nx: Float32Array; // unit left normal
  nz: Float32Array;
  k: Float32Array; // smoothed signed curvature (1/m), + = turning left
  v: Float32Array; // speed profile (m/s) for a reference car
  line: Float32Array; // racing-line lateral offset (m, + = left)
  width: number;
  corners: Corner[];
  sectors: [number, number][]; // [startIdx, endIdx)
  lapTime: number; // simulated reference lap (s)
  bounds: { minX: number; maxX: number; minZ: number; maxZ: number; cx: number; cz: number; size: number };
  grid: SpatialGrid;
};

/* ---------- vehicle model (2026-generation, approximate) ---------- */
export const CAR = {
  vmax: 93, // m/s ≈ 335 km/h
  latBase: 19, // m/s² mechanical grip (~1.9 g)
  latAero: 0.0046, // downforce term, a_lat = base + aero·v² (≈ 4.4 g at 250 km/h)
  brkBase: 20,
  brkAero: 0.0052,
  power: 960, // P/m (W/kg) ≈ 740 kW / 770 kg
  drag: 0.00111, // aero drag term, a = P/(m·v) − drag·v²
  accMax: 12.5,
};
export const latLimit = (v: number) => CAR.latBase + CAR.latAero * v * v;
export const brakeLimit = (v: number) => CAR.brkBase + CAR.brkAero * v * v;
export const accelLimit = (v: number) => Math.max(0, Math.min(CAR.accMax, CAR.power / Math.max(v, 8)) - CAR.drag * v * v);

/* ---------- spatial hash for "is this point near the track?" ---------- */
export class SpatialGrid {
  cell = 40;
  map = new Map<string, number[]>();
  constructor(private px: Float32Array, private pz: Float32Array) {
    for (let i = 0; i < px.length; i++) {
      const key = this.key(px[i], pz[i]);
      const arr = this.map.get(key);
      if (arr) arr.push(i);
      else this.map.set(key, [i]);
    }
  }
  key(x: number, z: number) {
    return `${Math.floor(x / this.cell)},${Math.floor(z / this.cell)}`;
  }
  /** Distance from (x,z) to the nearest centreline sample, searching r metres. */
  nearest(x: number, z: number, r = 80): { d: number; i: number } {
    const c = this.cell;
    const span = Math.ceil(r / c);
    const cx = Math.floor(x / c), cz = Math.floor(z / c);
    let best = Infinity, bi = -1;
    for (let a = -span; a <= span; a++)
      for (let b = -span; b <= span; b++) {
        const arr = this.map.get(`${cx + a},${cz + b}`);
        if (!arr) continue;
        for (const i of arr) {
          const d = (this.px[i] - x) ** 2 + (this.pz[i] - z) ** 2;
          if (d < best) { best = d; bi = i; }
        }
      }
    return { d: Math.sqrt(best), i: bi };
  }
}

function smooth(src: Float32Array, win: number) {
  const N = src.length, out = new Float32Array(N);
  let acc = 0;
  for (let j = -win; j <= win; j++) acc += src[(j + N) % N];
  for (let i = 0; i < N; i++) {
    out[i] = acc / (2 * win + 1);
    acc += src[(i + win + 1) % N] - src[(i - win + N) % N];
  }
  return out;
}

export function buildTrack(data: CircuitData, width: number): Track {
  let raw = data.track.slice();
  const f = raw[0], l = raw[raw.length - 1];
  if (Math.hypot(f[0] - l[0], f[1] - l[1]) < 1) raw = raw.slice(0, -1);

  const curve = new THREE.CatmullRomCurve3(raw.map(([x, z]) => new THREE.Vector3(x, 0, z)), true, "centripetal");
  const curveLen = curve.getLength();
  // Scale so the lap matches the published length when known (geometry is a centreline approximation).
  const scale = data.lengthM ? data.lengthM / curveLen : 1;
  const length = curveLen * scale;
  const ds = 2;
  const N = Math.round(length / ds);
  const pts = curve.getSpacedPoints(N).slice(0, N);

  const px = new Float32Array(N), pz = new Float32Array(N);
  for (let i = 0; i < N; i++) { px[i] = pts[i].x * scale; pz[i] = pts[i].z * scale; }

  const tx = new Float32Array(N), tz = new Float32Array(N), nx = new Float32Array(N), nz = new Float32Array(N);
  const heading = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const a = (i - 1 + N) % N, b = (i + 1) % N;
    let x = px[b] - px[a], z = pz[b] - pz[a];
    const L = Math.hypot(x, z) || 1;
    x /= L; z /= L;
    tx[i] = x; tz[i] = z;
    // left normal for a viewer looking along +tangent with y up: (tz, -tx)
    nx[i] = z; nz[i] = -x;
    heading[i] = Math.atan2(z, x);
  }
  // Signed curvature = dθ/ds, smoothed (raw geometry is coarse).
  const kRaw = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const a = heading[(i - 2 + N) % N], b = heading[(i + 2) % N];
    let d = b - a;
    while (d > Math.PI) d -= 2 * Math.PI;
    while (d < -Math.PI) d += 2 * Math.PI;
    kRaw[i] = -d / (4 * ds); // z points south → flip so + = left turn
  }
  const k = smooth(smooth(kRaw, 6), 4);

  // Speed profile: cornering limit → backward (braking) → forward (traction) passes.
  const v = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const kk = Math.abs(k[i]);
    v[i] = kk > CAR.latAero ? Math.min(CAR.vmax, Math.sqrt(CAR.latBase / (kk - CAR.latAero))) : CAR.vmax;
  }
  for (let pass = 0; pass < 2; pass++) {
    for (let j = 2 * N; j > 0; j--) {
      const i = j % N, nI = (i + 1) % N;
      v[i] = Math.min(v[i], Math.sqrt(v[nI] ** 2 + 2 * brakeLimit(v[nI]) * ds));
    }
    for (let j = 0; j < 2 * N; j++) {
      const i = j % N, pI = (i - 1 + N) % N;
      v[i] = Math.min(v[i], Math.sqrt(v[pI] ** 2 + 2 * accelLimit(v[pI]) * ds));
    }
  }
  let lapTime = 0;
  for (let i = 0; i < N; i++) lapTime += ds / v[i];

  // Racing line: toward the inside of upcoming corners (outside-inside-outside emerges from smoothing).
  const half = width / 2 - 1.6;
  const lineRaw = new Float32Array(N);
  for (let i = 0; i < N; i++) lineRaw[i] = Math.max(-half, Math.min(half, k[i] * 1100));
  const line = smooth(lineRaw, 14);

  // Corners: local maxima of |k| above a threshold, separated by ≥ 60 m.
  const corners: Corner[] = [];
  const TH = 1 / 260;
  for (let i = 0; i < N; i++) {
    const kk = Math.abs(k[i]);
    if (kk < TH) continue;
    let isMax = true;
    for (let j = -15; j <= 15 && isMax; j++) if (Math.abs(k[(i + j + N) % N]) > kk) isMax = false;
    if (!isMax) continue;
    const last = corners.at(-1);
    if (last && (i - last.i) * ds < 60) {
      if (kk > 1 / last.radius) corners.pop();
      else continue;
    }
    corners.push({ n: 0, i, s: i * ds, radius: Math.round(1 / kk), dir: k[i] > 0 ? "left" : "right", apexKmh: Math.round(v[i] * 3.6) });
  }
  corners.forEach((c, n) => (c.n = n + 1));

  const third = Math.floor(N / 3);
  const sectors: [number, number][] = [[0, third], [third, 2 * third], [2 * third, N]];

  let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
  for (let i = 0; i < N; i++) {
    minX = Math.min(minX, px[i]); maxX = Math.max(maxX, px[i]);
    minZ = Math.min(minZ, pz[i]); maxZ = Math.max(maxZ, pz[i]);
  }
  const bounds = { minX, maxX, minZ, maxZ, cx: (minX + maxX) / 2, cz: (minZ + maxZ) / 2, size: Math.max(maxX - minX, maxZ - minZ) };

  return { N, ds, length, px, pz, tx, tz, nx, nz, k, v, line, width, corners, sectors, lapTime, bounds, grid: new SpatialGrid(px, pz) };
}

/** Deterministic PRNG so environments are stable between visits. */
export function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}
export const hashStr = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

export const fmtLap = (t: number) => {
  const m = Math.floor(t / 60);
  const s = t - m * 60;
  return `${m}:${s.toFixed(3).padStart(6, "0")}`;
};
