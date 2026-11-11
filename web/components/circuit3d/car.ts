/**
 * Procedural 2026-generation Formula 1 car (generic — no team branding).
 *
 * Proportions follow the 2026 technical regulations: 3,400 mm max
 * wheelbase, 1,900 mm overall width, 18" wheels with 280 mm front and
 * 375 mm rear tyres, and active aerodynamics — movable flaps on BOTH the
 * front and rear wings ("straight mode" opens them to cut drag).
 *
 * Car space: +z forward, +y up, +x left. Origin on the ground, mid-wheelbase.
 * Static parts are merged per material (≈5 draw calls); wheels and flaps are
 * separate objects so they can rotate.
 */
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

export type Livery = { name: string; body: string; accent: string; detail: string };

/** Generic, deliberately fictional colour schemes. */
export const LIVERIES: Livery[] = [
  { name: "Volt", body: "#0f1114", accent: "#d2ff00", detail: "#f5f5f0" },
  { name: "Azure", body: "#123a8a", accent: "#ff7a1a", detail: "#e9eef7" },
  { name: "Rosso", body: "#b3121b", accent: "#f2f0ea", detail: "#1a1a1a" },
  { name: "Argent", body: "#c9ccd1", accent: "#00b3a4", detail: "#16181c" },
  { name: "Papaya", body: "#ff8000", accent: "#1d2a44", detail: "#f5f5f0" },
  { name: "Racing Green", body: "#0c4a35", accent: "#c8f2e0", detail: "#d9b44a" },
  { name: "Midnight", body: "#191a3d", accent: "#ff2e7e", detail: "#e8e8ff" },
  { name: "Ivory", body: "#efece4", accent: "#d81e2a", detail: "#151515" },
  { name: "Cobalt", body: "#0a5bd8", accent: "#ffd400", detail: "#0b0c0e" },
  { name: "Graphite", body: "#2a2d33", accent: "#7cf0ff", detail: "#f5f5f0" },
  { name: "Amethyst", body: "#5a2ea6", accent: "#f5f5f0", detail: "#2bd9ff" },
];

export const DIM = {
  wheelbase: 3.4,
  track: 1.62, // wheel centre to wheel centre (overall width 1.9 incl. tyres)
  tyreR: 0.36, // 18" wheel, ~720 mm tyre diameter
  frontTyreW: 0.28,
  rearTyreW: 0.375,
};

type Section = { z: number; w: number; h: number; y: number; x?: number; e?: number };

/** Loft superelliptic cross-sections along z into a closed tube with caps. */
function loft(sections: Section[], seg = 18): THREE.BufferGeometry {
  const pos: number[] = [];
  const idx: number[] = [];
  for (const s of sections) {
    const e = s.e ?? 3;
    for (let j = 0; j < seg; j++) {
      const a = (j / seg) * Math.PI * 2;
      const c = Math.cos(a), si = Math.sin(a);
      const x = Math.sign(c) * Math.abs(c) ** (2 / e) * (s.w / 2);
      const y = Math.sign(si) * Math.abs(si) ** (2 / e) * (s.h / 2);
      pos.push((s.x ?? 0) + x, s.y + y, s.z);
    }
  }
  for (let r = 0; r < sections.length - 1; r++)
    for (let j = 0; j < seg; j++) {
      const a = r * seg + j, b = r * seg + ((j + 1) % seg), c = a + seg, d = b + seg;
      idx.push(a, c, b, b, c, d);
    }
  // caps
  const capStart = pos.length / 3;
  const s0 = sections[0], sL = sections[sections.length - 1];
  pos.push(s0.x ?? 0, s0.y, s0.z, sL.x ?? 0, sL.y, sL.z);
  const last = (sections.length - 1) * seg;
  for (let j = 0; j < seg; j++) {
    idx.push(capStart, j, (j + 1) % seg);
    idx.push(capStart + 1, last + ((j + 1) % seg), last + j);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

const box = (w: number, h: number, d: number, x: number, y: number, z: number, rx = 0) => {
  const g = new THREE.BoxGeometry(w, h, d);
  if (rx) g.rotateX(rx);
  g.translate(x, y, z);
  return g;
};
/** Thin wing element with an airfoil-ish rounded section, spanning x. */
const foil = (span: number, chord: number, thick: number) => {
  const g = loft(
    [
      { z: -span / 2, w: chord, h: thick, y: 0, e: 2.2 },
      { z: span / 2, w: chord, h: thick, y: 0, e: 2.2 },
    ],
    12
  );
  g.rotateY(Math.PI / 2); // span along x, chord along z
  return g;
};
const rod = (a: THREE.Vector3, b: THREE.Vector3, r = 0.014) => {
  const len = a.distanceTo(b);
  const g = new THREE.CylinderGeometry(r, r, len, 6);
  g.translate(0, len / 2, 0);
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize());
  g.applyQuaternion(q);
  g.translate(a.x, a.y, a.z);
  return g;
};
const mirrorX = (g: THREE.BufferGeometry) => {
  const m = g.clone();
  m.scale(-1, 1, 1);
  // flip winding after negative scale
  const ix = m.getIndex();
  if (ix) {
    const a = ix.array as Uint16Array | Uint32Array;
    for (let i = 0; i < a.length; i += 3) [a[i + 1], a[i + 2]] = [a[i + 2], a[i + 1]];
  }
  m.computeVertexNormals();
  return m;
};
const both = (g: THREE.BufferGeometry) => [g, mirrorX(g)];
const clean = (gs: THREE.BufferGeometry[]) =>
  mergeGeometries(
    gs.map((g) => {
      if (!g.attributes.normal) g.computeVertexNormals();
      const n = g.index ? g.toNonIndexed() : g;
      n.deleteAttribute("uv");
      return n;
    })
  )!;

export type CarGeometry = {
  body: THREE.BufferGeometry; // livery primary
  accent: THREE.BufferGeometry; // livery accent
  carbon: THREE.BufferGeometry;
  cockpit: THREE.BufferGeometry;
  tyreFront: THREE.BufferGeometry;
  tyreRear: THREE.BufferGeometry;
  rimFront: THREE.BufferGeometry;
  rimRear: THREE.BufferGeometry;
  frontFlap: THREE.BufferGeometry; // active
  rearFlap: THREE.BufferGeometry; // active
  low: THREE.BufferGeometry; // LOD proxy
};

let cached: CarGeometry | null = null;

export function carGeometry(): CarGeometry {
  if (cached) return cached;
  const fz = DIM.wheelbase / 2, rz = -DIM.wheelbase / 2, hw = DIM.track / 2, R = DIM.tyreR;

  // --- livery primary: monocoque, nose, engine cover, sidepods
  const chassis = loft([
    { z: 2.62, w: 0.1, h: 0.08, y: 0.3, e: 2.4 },
    { z: 2.35, w: 0.2, h: 0.14, y: 0.31, e: 2.4 },
    { z: 1.9, w: 0.32, h: 0.24, y: 0.36, e: 2.6 },
    { z: 1.3, w: 0.46, h: 0.34, y: 0.42 },
    { z: 0.75, w: 0.6, h: 0.44, y: 0.48 },
    { z: 0.25, w: 0.74, h: 0.5, y: 0.5 },
    { z: -0.35, w: 0.66, h: 0.66, y: 0.56 },
    { z: -1.0, w: 0.5, h: 0.5, y: 0.5 },
    { z: -1.65, w: 0.3, h: 0.32, y: 0.42 },
    { z: -2.15, w: 0.16, h: 0.2, y: 0.38, e: 2.4 },
  ], 22);
  const sidepod = loft([
    { z: 0.55, w: 0.3, h: 0.34, y: 0.4, x: 0.5, e: 3.5 },
    { z: 0.25, w: 0.42, h: 0.4, y: 0.4, x: 0.53, e: 3.5 },
    { z: -0.4, w: 0.42, h: 0.36, y: 0.38, x: 0.5, e: 3 },
    { z: -1.05, w: 0.3, h: 0.24, y: 0.3, x: 0.4, e: 2.6 },
    { z: -1.6, w: 0.14, h: 0.14, y: 0.24, x: 0.28, e: 2.4 },
  ], 16);
  const fin = box(0.02, 0.22, 0.9, 0, 0.92, -0.75);
  const body = clean([chassis, ...both(sidepod), fin]);

  // --- livery accent: endplates, airbox, nose tip, helmet
  const fwEnd = box(0.025, 0.22, 0.62, 0.86, 0.17, 2.32);
  const rwEnd = box(0.025, 0.62, 0.62, 0.5, 0.82, -2.28);
  const helmet = new THREE.SphereGeometry(0.125, 16, 12);
  helmet.scale(1, 0.95, 1.1);
  helmet.translate(0, 0.79, 0.28);
  const airbox = loft([
    { z: 0.02, w: 0.16, h: 0.16, y: 0.97, e: 2.2 },
    { z: -0.3, w: 0.22, h: 0.2, y: 0.93, e: 2.4 },
    { z: -0.6, w: 0.12, h: 0.12, y: 0.86, e: 2.4 },
  ], 12);
  const accent = clean([...both(fwEnd), ...both(rwEnd), helmet, airbox]);

  // --- carbon: floor, wings (fixed elements), halo, suspension, mirrors, diffuser
  const floor = box(1.42, 0.03, 2.75, 0, 0.055, -0.35);
  const plank = box(0.3, 0.02, 2.6, 0, 0.03, -0.35);
  const diffuser = box(1.0, 0.18, 0.4, 0, 0.13, -2.0, -0.35);
  const fwMain = foil(1.72, 0.3, 0.035); fwMain.translate(0, 0.1, 2.42);
  const rwMain = foil(1.0, 0.3, 0.05); rwMain.translate(0, 0.78, -2.3);
  const pylon = box(0.04, 0.38, 0.18, 0, 0.6, -2.18);
  const halo = new THREE.TorusGeometry(0.36, 0.026, 8, 24, Math.PI);
  halo.rotateX(-Math.PI / 2);
  halo.scale(1, 1, 1.15);
  halo.translate(0, 0.9, 0.18);
  const haloPillar = rod(new THREE.Vector3(0, 0.9, 0.6), new THREE.Vector3(0, 0.62, 0.95), 0.028);
  const mirror = box(0.14, 0.06, 0.03, 0.5, 0.72, 0.65);
  const mirrorArm = rod(new THREE.Vector3(0.3, 0.6, 0.62), new THREE.Vector3(0.48, 0.7, 0.65), 0.008);
  const susp: THREE.BufferGeometry[] = [];
  const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
  for (const [zc, chZ, w] of [[fz, 1.45, 0.24], [rz, -1.35, 0.3]] as const) {
    const hub = v(hw - 0.12, R, zc);
    susp.push(rod(v(w, 0.52, chZ + 0.25), hub.clone().setY(R + 0.12)));
    susp.push(rod(v(w, 0.52, chZ - 0.25), hub.clone().setY(R + 0.12)));
    susp.push(rod(v(w, 0.3, chZ + 0.25), hub.clone().setY(R - 0.1)));
    susp.push(rod(v(w, 0.3, chZ - 0.25), hub.clone().setY(R - 0.1)));
    susp.push(rod(v(w * 0.8, 0.62, chZ), hub.clone().setY(R - 0.06), 0.012)); // push/pull rod
  }
  const carbon = clean([floor, plank, diffuser, fwMain, rwMain, pylon, halo, haloPillar, ...both(mirror), ...both(mirrorArm), ...susp.flatMap(both)]);

  // --- cockpit opening
  const cockpitG = new THREE.SphereGeometry(1, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);
  cockpitG.scale(0.25, 0.04, 0.42);
  cockpitG.translate(0, 0.74, 0.4);

  // --- active flaps (pivot at leading edge → rotate about x)
  const frontFlap = mergeGeometries([
    (() => { const g = foil(1.6, 0.17, 0.022); g.translate(0, 0.07, -0.085); return g; })(),
    (() => { const g = foil(1.5, 0.13, 0.02); g.translate(0, 0.13, -0.2); return g; })(),
  ].map((g) => { const n = g.toNonIndexed(); n.deleteAttribute("uv"); return n; }))!;
  const rearFlap = foil(0.98, 0.2, 0.03);
  rearFlap.translate(0, 0, -0.1);

  // --- wheels: lathed tyre profile + covered rim
  const tyre = (w: number) => {
    const pts: THREE.Vector2[] = [];
    const rIn = 0.235, r = R, rr = 0.05;
    pts.push(new THREE.Vector2(rIn, -w / 2));
    for (let i = 0; i <= 6; i++) {
      const a = -Math.PI / 2 + (i / 6) * (Math.PI / 2);
      pts.push(new THREE.Vector2(r - rr + Math.cos(a) * rr, -w / 2 + rr + Math.sin(a) * rr));
    }
    for (let i = 0; i <= 6; i++) {
      const a = (i / 6) * (Math.PI / 2);
      pts.push(new THREE.Vector2(r - rr + Math.cos(a) * rr, w / 2 - rr + Math.sin(a) * rr));
    }
    pts.push(new THREE.Vector2(rIn, w / 2));
    const g = new THREE.LatheGeometry(pts, 28);
    g.rotateZ(Math.PI / 2); // axle along x
    return g;
  };
  const rim = (w: number) => {
    const disc = new THREE.CylinderGeometry(0.235, 0.235, w * 0.92, 24);
    disc.rotateZ(Math.PI / 2);
    // spoke marks so rotation is visible
    const spokes = [0, 1, 2, 3, 4].map((i) => {
      const s = new THREE.BoxGeometry(w * 0.94, 0.03, 0.2);
      s.translate(0, 0.11, 0);
      s.rotateX((i / 5) * Math.PI * 2);
      return s;
    });
    return clean([disc, ...spokes]);
  };

  const low = clean([box(0.8, 0.5, 4.8, 0, 0.4, 0), box(1.9, 0.6, 0.4, 0, R, fz), box(1.9, 0.6, 0.5, 0, R, rz), box(1.0, 0.3, 0.3, 0, 0.8, -2.3)]);

  cached = {
    body, accent, carbon, cockpit: cockpitG,
    tyreFront: tyre(DIM.frontTyreW), tyreRear: tyre(DIM.rearTyreW),
    rimFront: rim(DIM.frontTyreW), rimRear: rim(DIM.rearTyreW),
    frontFlap, rearFlap, low,
  };
  return cached;
}
