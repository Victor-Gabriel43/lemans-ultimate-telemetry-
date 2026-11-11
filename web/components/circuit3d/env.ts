/**
 * Environment geometry built from the real track model: asphalt, painted
 * edges, kerbs, barriers & debris fencing, pit complex, grandstands, city
 * blocks (from OpenStreetMap when baked, procedural otherwise), vegetation,
 * floodlights and gently rolling terrain. Everything is merged/instanced.
 */
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { rng, type CircuitData, type Track } from "./track";

export type Setting = { kind: "street" | "temporary" | "permanent"; night: boolean; biome: "urban" | "parkland" | "forest" | "desert" | "coastal" | "countryside" };
export type Quality = "high" | "low";

/** Ribbon between lateral offsets a→b (m, + = left) at height y. */
export function ribbon(t: Track, a: (i: number) => number, b: (i: number) => number, y: number | ((i: number) => number), mask?: (i: number) => boolean, colors?: (i: number) => [number, number, number]) {
  const pos: number[] = [], uv: number[] = [], col: number[] = [], idx: number[] = [];
  let run = -1;
  for (let j = 0; j <= t.N; j++) {
    const i = j % t.N;
    if (mask && !mask(i)) { run = -1; continue; }
    const yy = typeof y === "number" ? y : y(i);
    const A = a(i), B = b(i);
    pos.push(t.px[i] + t.nx[i] * A, yy, t.pz[i] + t.nz[i] * A, t.px[i] + t.nx[i] * B, yy, t.pz[i] + t.nz[i] * B);
    uv.push(0, j * t.ds, 1, j * t.ds);
    if (colors) { const c = colors(i); col.push(...c, ...c); }
    const v = pos.length / 3 - 2;
    if (run >= 0) {
      // Keep triangles counter-clockwise seen from above (front faces up), whatever the a/b order.
      const ax = pos[run * 3], az = pos[run * 3 + 2], bx = pos[v * 3], bz = pos[v * 3 + 2], cx = pos[(run + 1) * 3], cz = pos[(run + 1) * 3 + 2];
      const up = (bx - ax) * (cz - az) - (bz - az) * (cx - ax) < 0;
      if (up) idx.push(run, v, run + 1, run + 1, v, v + 1);
      else idx.push(run, run + 1, v, run + 1, v + 1, v);
    }
    run = v;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  if (colors) g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  // Ensure normals point up for flat ribbons regardless of winding.
  const n = g.attributes.normal;
  for (let k = 0; k < n.count; k++) if (n.getY(k) < 0) n.setXYZ(k, -n.getX(k), -n.getY(k), -n.getZ(k));
  return g;
}

/** Vertical wall following the track at lateral offset `o`. */
export function wall(t: Track, o: number, h: number, mask: (i: number) => boolean) {
  const pos: number[] = [], idx: number[] = [];
  let run = -1;
  for (let j = 0; j <= t.N; j += 2) {
    const i = j % t.N;
    if (!mask(i)) { run = -1; continue; }
    const x = t.px[i] + t.nx[i] * o, z = t.pz[i] + t.nz[i] * o;
    pos.push(x, 0, z, x, h, z);
    const v = pos.length / 3 - 2;
    if (run >= 0) idx.push(run, v, run + 1, run + 1, v, v + 1);
    run = v;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/** Offset is safe if it doesn't cut back into this or another part of the track. */
export function clearAt(t: Track, i: number, o: number, minDist: number) {
  const x = t.px[i] + t.nx[i] * o, z = t.pz[i] + t.nz[i] * o;
  return t.grid.nearest(x, z, minDist + 40).d > minDist;
}

export function asphaltTexture(night: boolean) {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  g.fillStyle = night ? "#2b2d31" : "#3a3c40";
  g.fillRect(0, 0, 256, 256);
  const r = rng(7);
  for (let i = 0; i < 9000; i++) {
    const v = 40 + r() * 50;
    g.fillStyle = `rgba(${v},${v},${v + 4},${0.35 + r() * 0.4})`;
    g.fillRect(r() * 256, r() * 256, 1 + r() * 1.5, 1 + r() * 1.5);
  }
  // darker racing-line rubber band
  const grd = g.createLinearGradient(0, 0, 256, 0);
  grd.addColorStop(0.3, "rgba(0,0,0,0)");
  grd.addColorStop(0.5, "rgba(10,10,12,0.28)");
  grd.addColorStop(0.7, "rgba(0,0,0,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 1 / 14);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function crowdTexture() {
  const c = document.createElement("canvas");
  c.width = 256; c.height = 64;
  const g = c.getContext("2d")!;
  const r = rng(3);
  const palette = ["#e9e4d8", "#c9372c", "#1f4fa3", "#f2c230", "#2d2f36", "#e86a1c", "#d2ff00", "#6b6f78"];
  g.fillStyle = "#22252b";
  g.fillRect(0, 0, 256, 64);
  for (let y = 0; y < 64; y += 4) for (let x = 0; x < 256; x += 3) {
    g.fillStyle = palette[Math.floor(r() * palette.length)];
    if (r() > 0.12) g.fillRect(x, y, 2, 3);
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* ---------- structures: pit complex + grandstands ---------- */
export function structures(t: Track, setting: Setting) {
  const w = t.width;
  // Pit side: the side with more free space along the first 300 m of the lap.
  const span = Math.min(t.N - 1, Math.round(300 / t.ds));
  let left = 0, right = 0;
  for (let i = 0; i < span; i += 10) {
    if (clearAt(t, (t.N - span / 2 + i) % t.N, 45, 30)) left++;
    if (clearAt(t, (t.N - span / 2 + i) % t.N, -45, 30)) right++;
  }
  const side = left >= right ? 1 : -1;

  const pit: THREE.BufferGeometry[] = [];
  const garages: THREE.BufferGeometry[] = [];
  const stands: THREE.BufferGeometry[] = [];
  const crowd: THREE.BufferGeometry[] = [];
  const roofs: THREE.BufferGeometry[] = [];

  const place = (g: THREE.BufferGeometry, i: number, o: number, y = 0) => {
    const ang = Math.atan2(t.tx[i], t.tz[i]);
    g.rotateY(ang);
    g.translate(t.px[i] + t.nx[i] * o, y, t.pz[i] + t.nz[i] * o);
    return g;
  };

  // Pit building: segments along the straight around the start line.
  const pitLen = Math.min(span, Math.round(260 / t.ds));
  for (let k = -pitLen / 2; k < pitLen / 2; k += 10) {
    const i = (Math.round(k) + t.N) % t.N;
    if (!clearAt(t, i, side * (w / 2 + 24), 16)) continue;
    pit.push(place(new THREE.BoxGeometry(14, 11, 20.5), i, side * (w / 2 + 26), 5.5));
    pit.push(place(new THREE.BoxGeometry(16, 1.2, 21), i, side * (w / 2 + 25), 11.6)); // roof lip
    garages.push(place(new THREE.BoxGeometry(0.4, 5, 16), i, side * (w / 2 + 18.9), 2.5));
  }
  // Pit lane surface
  const pitLane = ribbon(t, () => side * (w / 2 + 3), () => side * (w / 2 + 17), 0.02, (i) => {
    const d = Math.min(i, t.N - i);
    return d < pitLen / 2 + 25 && clearAt(t, i, side * (w / 2 + 10), 8);
  });

  // Grandstands: opposite the pits on the main straight + outside of the biggest corners.
  const spots: { i: number; o: number; len: number }[] = [{ i: 0, o: -side, len: 180 }];
  const big = [...t.corners].sort((a, b) => a.radius - b.radius).slice(0, setting.kind === "street" ? 3 : 5);
  for (const c of big) spots.push({ i: c.i, o: c.dir === "left" ? -1 : 1, len: 110 });
  for (const sp of spots) {
    const n = Math.round(sp.len / t.ds);
    for (let k = -n / 2; k < n / 2; k += 8) {
      const i = (sp.i + Math.round(k) + t.N) % t.N;
      const base = w / 2 + (setting.kind === "street" ? 8 : 22);
      if (!clearAt(t, i, sp.o * (base + 14), 18)) continue;
      for (let r = 0; r < 6; r++) {
        const step = place(new THREE.BoxGeometry(2.4, 1.1 + r * 1.1, 16.5), i, sp.o * (base + r * 2.4), (1.1 + r * 1.1) / 2);
        stands.push(step);
        const seat = new THREE.PlaneGeometry(2.2, 16.2);
        seat.rotateX(-Math.PI / 2);
        crowd.push(place(seat, i, sp.o * (base + r * 2.4), 1.12 + r * 1.1));
      }
      roofs.push(place(new THREE.BoxGeometry(9, 0.3, 16.5), i, sp.o * (base + 9), 10.5));
      roofs.push(place(new THREE.BoxGeometry(0.4, 10.5, 0.4), i, sp.o * (base + 13.5), 5.25));
    }
  }
  const m = (gs: THREE.BufferGeometry[]) => (gs.length ? mergeGeometries(gs.map((g) => g.index ? g.toNonIndexed() : g)) : null);
  return { pit: m(pit), garages: m(garages), stands: m(stands), crowd: m(crowd), roofs: m(roofs), pitLane, side };
}

/* ---------- buildings ---------- */
export type BuildingSet = { geometry: THREE.BufferGeometry | null; instances: { x: number; z: number; w: number; d: number; h: number; rot: number }[] };

export function buildings(t: Track, setting: Setting, data: CircuitData, q: Quality): BuildingSet {
  // Real footprints from OpenStreetMap when they were baked.
  if (data.env?.buildings?.length) {
    const r = rng(11);
    const gs: THREE.BufferGeometry[] = [];
    const max = q === "high" ? 6000 : 1500;
    const defH = setting.biome === "urban" ? 18 : 8;
    for (const b of data.env.buildings.slice(0, max)) {
      if (b.p.length < 4) continue;
      const shape = new THREE.Shape(b.p.map(([x, z]) => new THREE.Vector2(x, -z)));
      const h = b.h || defH * (0.6 + r() * 0.8);
      const g = new THREE.ExtrudeGeometry(shape, { depth: h, bevelEnabled: false });
      g.rotateX(-Math.PI / 2);
      g.deleteAttribute("uv");
      gs.push(g.toNonIndexed());
    }
    return { geometry: gs.length ? mergeGeometries(gs) : null, instances: [] };
  }

  // Procedural city: only for urban / coastal settings and street/temporary venues.
  const urban = setting.biome === "urban" || setting.kind === "street" || setting.biome === "coastal";
  if (!urban) return { geometry: null, instances: [] };
  const r = rng(Math.round(t.length));
  const { minX, maxX, minZ, maxZ } = t.bounds;
  const pad = q === "high" ? 520 : 320;
  const block = 64;
  const tall = setting.kind === "street" ? (setting.night ? 1.0 : 0.75) : 0.45;
  const inst: BuildingSet["instances"] = [];
  for (let x = minX - pad; x < maxX + pad; x += block)
    for (let z = minZ - pad; z < maxZ + pad; z += block) {
      // Leave some blocks open (plazas, parks, car parks); 1–3 buildings otherwise.
      if (r() < 0.32) continue;
      const nb = 1 + Math.floor(r() * 3);
      for (let k = 0; k < nb; k++) {
        const w = 14 + r() * 26, d = 14 + r() * 26;
        const bx = x + 8 + r() * (block - 16 - w / 2), bz = z + 8 + r() * (block - 16 - d / 2);
        const near = t.grid.nearest(bx, bz, 90).d;
        if (near < t.width / 2 + 34 + Math.max(w, d) / 2) continue;
        // Taller toward the track for street venues ("canyon" effect), lower far away.
        const falloff = Math.max(0.25, 1 - near / (pad * 1.4));
        const h = (8 + r() ** 3 * 150 * tall) * falloff + 6;
        inst.push({ x: bx, z: bz, w, d, h, rot: 0 });
        if (inst.length > (q === "high" ? 5000 : 1400)) return { geometry: null, instances: inst };
      }
    }
  return { geometry: null, instances: inst };
}

/** Window pattern + night glow injected into MeshStandardMaterial. */
export function windowMaterial(night: boolean, color: string) {
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0.05 });
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.uNight = { value: night ? 1 : 0 };
    sh.vertexShader = sh.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vWPos;\nvarying vec3 vWNorm;")
      .replace(
        "#include <worldpos_vertex>",
        `#include <worldpos_vertex>
        vec4 wp4 = vec4(transformed, 1.0);
        #ifdef USE_INSTANCING
          wp4 = instanceMatrix * wp4;
        #endif
        vWPos = (modelMatrix * wp4).xyz;
        vWNorm = normalize(mat3(modelMatrix) * objectNormal);`
      );
    sh.fragmentShader = sh.fragmentShader
      .replace("#include <common>", "#include <common>\nuniform float uNight;\nvarying vec3 vWPos;\nvarying vec3 vWNorm;\nfloat h21(vec2 p){return fract(sin(dot(p,vec2(41.3,289.1)))*43758.5);}")
      .replace(
        "#include <emissivemap_fragment>",
        `#include <emissivemap_fragment>
        if (abs(vWNorm.y) < 0.5) {
          vec2 uvw = vec2(dot(vWPos.xz, normalize(vec2(-vWNorm.z, vWNorm.x))), vWPos.y);
          vec2 cell = floor(uvw / vec2(3.2, 3.6));
          vec2 f = fract(uvw / vec2(3.2, 3.6));
          float win = step(0.18, f.x) * step(f.x, 0.82) * step(0.25, f.y) * step(f.y, 0.8) * step(4.0, vWPos.y);
          float rnd = h21(cell + floor(vWPos.xz / 40.0));
          float lit = step(0.72, rnd);
          float fade = 1.0 - smoothstep(180.0, 1400.0, length(vViewPosition));
          vec3 tint = mix(vec3(1.0, 0.8, 0.55), vec3(0.75, 0.85, 1.0), step(0.86, rnd));
          diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * 0.6 + vec3(0.04,0.06,0.08), win * (1.0 - uNight) * fade);
          totalEmissiveRadiance += win * lit * uNight * tint * mix(0.18, 0.75, fade);
        }`
      );
  };
  return mat;
}

/* ---------- vegetation ---------- */
export function trees(t: Track, setting: Setting, data: CircuitData, q: Quality) {
  const out: { x: number; z: number; s: number }[] = [];
  const r = rng(Math.round(t.length) + 5);
  const max = q === "high" ? 7000 : 1800;
  if (data.env?.trees?.length) {
    for (const [x, z] of data.env.trees) {
      if (t.grid.nearest(x, z, 40).d > t.width / 2 + 14) out.push({ x, z, s: 0.8 + r() * 0.6 });
      if (out.length >= max) break;
    }
    return out;
  }
  const density = { forest: 1, parkland: 0.45, countryside: 0.16, coastal: 0.1, urban: 0.06, desert: 0.015 }[setting.biome];
  const { minX, maxX, minZ, maxZ } = t.bounds;
  const pad = 600;
  const area = (maxX - minX + pad * 2) * (maxZ - minZ + pad * 2);
  const n = Math.min(max, Math.round((area / 900) * density));
  let tries = 0;
  while (out.length < n && tries++ < n * 4) {
    // Cluster trees: pick a clump centre then scatter around it.
    const cx = minX - pad + r() * (maxX - minX + pad * 2), cz = minZ - pad + r() * (maxZ - minZ + pad * 2);
    const clump = 6 + Math.floor(r() * 18);
    for (let k = 0; k < clump && out.length < n; k++) {
      const x = cx + (r() - 0.5) * 70, z = cz + (r() - 0.5) * 70;
      const d = t.grid.nearest(x, z, 60).d;
      if (d > t.width / 2 + (setting.kind === "permanent" ? 30 : 12)) out.push({ x, z, s: 0.7 + r() * 0.8 });
    }
  }
  return out;
}

export function treeGeometry(desert: boolean) {
  const trunk = new THREE.CylinderGeometry(0.25, 0.35, desert ? 7 : 3, 5);
  trunk.translate(0, desert ? 3.5 : 1.5, 0);
  const crown = desert ? new THREE.ConeGeometry(2.8, 1.6, 6) : new THREE.IcosahedronGeometry(3.2, 0);
  crown.scale(1, desert ? 1 : 1.35, 1);
  crown.translate(0, desert ? 7.4 : 6, 0);
  return { trunk, crown };
}

/* ---------- terrain: flat near the track, gently rolling beyond ---------- */
export function terrain(t: Track, setting: Setting, q: Quality) {
  const size = t.bounds.size + 2600;
  const seg = q === "high" ? 180 : 90;
  const g = new THREE.PlaneGeometry(size, size, seg, seg);
  g.rotateX(-Math.PI / 2);
  g.translate(t.bounds.cx, 0, t.bounds.cz);
  const amp = { forest: 26, countryside: 12, parkland: 6, desert: 9, coastal: 3, urban: 2 }[setting.biome];
  const p = g.attributes.position;
  for (let k = 0; k < p.count; k++) {
    const x = p.getX(k), z = p.getZ(k);
    // Flat (and slightly below the road) for 150 m around the track, then a slow rise —
    // a coarse grid must never lift a triangle over the asphalt.
    const d = t.grid.nearest(x, z, 260).d;
    const fade = Math.min(1, Math.max(0, (d - 150) / 450)) ** 2;
    const h = (Math.sin(x * 0.004) * Math.cos(z * 0.0033) + 0.5 * Math.sin(x * 0.011 + z * 0.007) + 0.6) * amp * fade;
    p.setY(k, h - 0.35);
  }
  g.computeVertexNormals();
  return g;
}

export const GROUND: Record<Setting["biome"], string> = {
  forest: "#3d5a2c", parkland: "#55733a", countryside: "#62783e", coastal: "#7c8a5e", urban: "#2e3238", desert: "#c2a477",
};
