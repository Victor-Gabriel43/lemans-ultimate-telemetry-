"use client";
/* eslint-disable react-hooks/immutability -- the simulation is advanced imperatively in the R3F
   render loop through refs passed down from <Experience>; mutating them is the intended design. */

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls, Sky } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { carGeometry, DIM, LIVERIES } from "./car";
import {
  asphaltTexture, buildings, clearAt, crowdTexture, GROUND, ribbon, structures, terrain, treeGeometry, trees, wall, windowMaterial,
  type Quality, type Setting,
} from "./env";
import { sample, stepSim, type SimCar } from "./sim";
import type { CircuitData, Track } from "./track";

export type CamMode = "orbit" | "chase" | "tv" | "heli" | "top";
export type SimState = { cars: SimCar[]; order: SimCar[]; time: number };
export type Focus = { x: number; z: number; dist: number } | null;

/* ============================== WORLD ============================== */
export function World({ track: t, setting, data, quality }: { track: Track; setting: Setting; data: CircuitData; quality: Quality }) {
  const w = t.width;
  const geo = useMemo(() => {
    const street = setting.kind === "street";
    const runoff = street ? 1.2 : setting.kind === "temporary" ? 5 : 14;
    const kerbMask = (i: number) => Math.abs(t.k[i]) > 1 / 200;
    const stripe = (i: number): [number, number, number] => (Math.floor(i / 2) % 2 ? [0.82, 0.08, 0.07] : [0.95, 0.95, 0.93]);
    const wallMask = (o: number) => (i: number) => clearAt(t, i, o, Math.abs(o) - 0.5);
    const barrierO = w / 2 + runoff;
    return {
      asphalt: ribbon(t, () => w / 2, () => -w / 2, 0.04),
      runoff: street ? null : ribbon(t, () => w / 2 + runoff, () => -w / 2 - runoff, 0.02, (i) => clearAt(t, i, w / 2 + runoff, w / 2 + runoff - 1) && clearAt(t, i, -w / 2 - runoff, w / 2 + runoff - 1)),
      linesL: ribbon(t, () => w / 2 - 0.15, () => w / 2 - 0.45, 0.05),
      linesR: ribbon(t, () => -w / 2 + 0.45, () => -w / 2 + 0.15, 0.05),
      kerbL: ribbon(t, () => w / 2 + 1.3, () => w / 2 - 0.1, 0.07, kerbMask, stripe),
      kerbR: ribbon(t, () => -w / 2 + 0.1, () => -w / 2 - 1.3, 0.07, kerbMask, stripe),
      wallL: wall(t, barrierO, street ? 1.1 : 0.9, wallMask(barrierO)),
      wallR: wall(t, -barrierO, street ? 1.1 : 0.9, wallMask(-barrierO)),
      fenceL: wall(t, barrierO + 0.3, street ? 4.2 : 3.2, wallMask(barrierO + 0.3)),
      fenceR: wall(t, -barrierO - 0.3, street ? 4.2 : 3.2, wallMask(-barrierO - 0.3)),
      startLine: (() => {
        const g = new THREE.PlaneGeometry(w, 1.6, 8, 1);
        g.rotateX(-Math.PI / 2);
        g.rotateY(Math.atan2(t.tx[0], t.tz[0]) + Math.PI / 2);
        g.translate(t.px[0], 0.06, t.pz[0]);
        return g;
      })(),
      structures: structures(t, setting),
      ground: terrain(t, setting, quality),
      buildings: buildings(t, setting, data, quality),
      trees: trees(t, setting, data, quality),
      treeGeo: treeGeometry(setting.biome === "desert"),
    };
  }, [t, setting, data, quality, w]);

  const asphaltTex = useMemo(() => asphaltTexture(setting.night), [setting.night]);
  const crowdTex = useMemo(() => crowdTexture(), []);
  const checker = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 64; c.height = 8;
    const g = c.getContext("2d")!;
    for (let x = 0; x < 64; x += 4) for (let y = 0; y < 8; y += 4) { g.fillStyle = (x + y) % 8 ? "#111" : "#f5f5f0"; g.fillRect(x, y, 4, 4); }
    const tex = new THREE.CanvasTexture(c);
    tex.magFilter = THREE.NearestFilter;
    return tex;
  }, []);
  const buildingMat = useMemo(() => windowMaterial(setting.night, setting.night ? "#3b4250" : "#8d939c"), [setting.night]);

  const bInst = useRef<THREE.InstancedMesh>(null);
  const trunk = useRef<THREE.InstancedMesh>(null);
  const crown = useRef<THREE.InstancedMesh>(null);
  useEffect(() => {
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3();
    const col = new THREE.Color();
    if (bInst.current) {
      geo.buildings.instances.forEach((b, i) => {
        p.set(b.x, b.h / 2, b.z); s.set(b.w, b.h, b.d); q.setFromEuler(new THREE.Euler(0, b.rot, 0));
        bInst.current!.setMatrixAt(i, m.compose(p, q, s));
        const l = 0.75 + ((i * 2654435761) % 1000) / 4000;
        bInst.current!.setColorAt(i, col.setRGB(l, l, l * 1.02));
      });
      bInst.current.instanceMatrix.needsUpdate = true;
      if (bInst.current.instanceColor) bInst.current.instanceColor.needsUpdate = true;
    }
    for (const ref of [trunk, crown]) {
      if (!ref.current) continue;
      geo.trees.forEach((tr, i) => {
        p.set(tr.x, 0, tr.z); s.setScalar(tr.s); q.identity();
        ref.current!.setMatrixAt(i, m.compose(p, q, s));
      });
      ref.current.instanceMatrix.needsUpdate = true;
    }
  }, [geo]);

  const night = setting.night;
  const grass = GROUND[setting.biome];
  const st = geo.structures;
  return (
    <group>
      <mesh geometry={geo.ground} receiveShadow>
        <meshStandardMaterial color={night ? new THREE.Color(grass).multiplyScalar(0.55) : grass} roughness={1} />
      </mesh>
      {geo.runoff && (
        <mesh geometry={geo.runoff} receiveShadow>
          <meshStandardMaterial color={setting.biome === "desert" ? "#b9a07a" : "#6f7a5a"} roughness={1} />
        </mesh>
      )}
      <mesh geometry={geo.asphalt} receiveShadow>
        <meshStandardMaterial map={asphaltTex} roughness={0.92} emissive={night ? "#3a3c42" : "#000"} emissiveIntensity={night ? 0.9 : 0} />
      </mesh>
      <mesh geometry={geo.linesL}><meshStandardMaterial color="#f2f2ee" roughness={0.6} emissive={night ? "#666" : "#000"} /></mesh>
      <mesh geometry={geo.linesR}><meshStandardMaterial color="#f2f2ee" roughness={0.6} emissive={night ? "#666" : "#000"} /></mesh>
      <mesh geometry={geo.kerbL} receiveShadow><meshStandardMaterial vertexColors roughness={0.7} /></mesh>
      <mesh geometry={geo.kerbR} receiveShadow><meshStandardMaterial vertexColors roughness={0.7} /></mesh>
      <mesh geometry={geo.startLine}><meshBasicMaterial map={checker} /></mesh>
      <mesh geometry={geo.wallL}><meshStandardMaterial color={setting.kind === "street" ? "#d9d9d4" : "#9aa0a8"} roughness={0.8} side={THREE.DoubleSide} /></mesh>
      <mesh geometry={geo.wallR}><meshStandardMaterial color={setting.kind === "street" ? "#d9d9d4" : "#9aa0a8"} roughness={0.8} side={THREE.DoubleSide} /></mesh>
      <mesh geometry={geo.fenceL}><meshBasicMaterial color="#8d959e" transparent opacity={0.09} side={THREE.DoubleSide} depthWrite={false} /></mesh>
      <mesh geometry={geo.fenceR}><meshBasicMaterial color="#8d959e" transparent opacity={0.09} side={THREE.DoubleSide} depthWrite={false} /></mesh>
      <mesh geometry={st.pitLane} receiveShadow><meshStandardMaterial map={asphaltTex} roughness={0.95} color="#9a9a9a" /></mesh>
      {st.pit && <mesh geometry={st.pit} receiveShadow><meshStandardMaterial color="#e6e6e1" roughness={0.6} metalness={0.1} /></mesh>}
      {st.garages && <mesh geometry={st.garages}><meshStandardMaterial color="#14161a" emissive={night ? "#fff2d6" : "#1a1c20"} emissiveIntensity={night ? 0.9 : 0.4} /></mesh>}
      {st.stands && <mesh geometry={st.stands} receiveShadow><meshStandardMaterial color="#5d636d" roughness={0.9} /></mesh>}
      {st.crowd && <mesh geometry={st.crowd}><meshStandardMaterial map={crowdTex} roughness={1} emissive={night ? "#333" : "#000"} /></mesh>}
      {st.roofs && <mesh geometry={st.roofs}><meshStandardMaterial color="#c9ccd1" roughness={0.5} metalness={0.3} /></mesh>}
      {geo.buildings.geometry && <mesh geometry={geo.buildings.geometry} material={buildingMat} receiveShadow />}
      {geo.buildings.instances.length > 0 && (
        <instancedMesh ref={bInst} args={[undefined, undefined, geo.buildings.instances.length]} material={buildingMat} receiveShadow>
          <boxGeometry />
        </instancedMesh>
      )}
      {geo.trees.length > 0 && (
        <>
          <instancedMesh ref={trunk} args={[geo.treeGeo.trunk, undefined, geo.trees.length]}>
            <meshStandardMaterial color="#4a3a2a" roughness={1} />
          </instancedMesh>
          <instancedMesh ref={crown} args={[geo.treeGeo.crown, undefined, geo.trees.length]}>
            <meshStandardMaterial color={setting.biome === "desert" ? "#5d7a3a" : night ? "#1d2e1b" : "#2f4a26"} roughness={1} flatShading />
          </instancedMesh>
        </>
      )}
      {night && <Floodlights track={t} />}
    </group>
  );
}

function Floodlights({ track: t }: { track: Track }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const spots = useMemo(() => {
    const out: { x: number; z: number }[] = [];
    for (let i = 0; i < t.N; i += Math.round(70 / t.ds)) {
      const o = (i / 35) % 2 ? t.width / 2 + 4 : -t.width / 2 - 4;
      if (clearAt(t, i, o, Math.abs(o) - 1)) out.push({ x: t.px[i] + t.nx[i] * o, z: t.pz[i] + t.nz[i] * o });
    }
    return out;
  }, [t]);
  useEffect(() => {
    if (!ref.current) return;
    const m = new THREE.Matrix4();
    spots.forEach((s, i) => ref.current!.setMatrixAt(i, m.makeTranslation(s.x, 14, s.z)));
    ref.current.instanceMatrix.needsUpdate = true;
  }, [spots]);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, spots.length]}>
      <boxGeometry args={[2.4, 0.5, 2.4]} />
      <meshBasicMaterial color="#fff6e0" toneMapped={false} />
    </instancedMesh>
  );
}

/* ============================== LIGHTS ============================== */
export function Lights({ night, target, quality }: { night: boolean; target: React.RefObject<THREE.Vector3>; quality: Quality }) {
  const sun = useRef<THREE.DirectionalLight>(null);
  const sky = night ? "#05070b" : "#cfd8e3";
  useFrame(() => {
    const l = sun.current;
    if (!l || !target.current) return;
    l.target.position.copy(target.current);
    l.position.set(target.current.x + 180, 260, target.current.z + 120);
    l.target.updateMatrixWorld();
  });
  return (
    <>
      <color attach="background" args={[sky]} />
      <fog attach="fog" args={[sky, 900, 5200]} />
      {!night && <Sky sunPosition={[180, 260, 120]} turbidity={6} rayleigh={1.2} mieCoefficient={0.004} distance={20000} />}
      <hemisphereLight args={[night ? "#3a4a66" : "#dfe9f5", night ? "#0b0c0e" : "#4b5a3a", night ? 0.55 : 0.9]} />
      <directionalLight
        ref={sun}
        intensity={night ? 0.55 : 2.4}
        color={night ? "#b9c8ff" : "#fff3e2"}
        castShadow={quality === "high"}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-120}
        shadow-camera-right={120}
        shadow-camera-top={120}
        shadow-camera-bottom={-120}
        shadow-camera-near={10}
        shadow-camera-far={700}
        shadow-bias={-0.0005}
        shadow-normalBias={0.6}
      />
      {night && <ambientLight intensity={0.35} color="#ffe9c4" />}
    </>
  );
}

/* ============================== CARS ============================== */
type CarParts = { root: THREE.Group; hi: THREE.Group; lo: THREE.Mesh; wheels: THREE.Group[]; steer: THREE.Group[]; fFlap: THREE.Object3D; rFlap: THREE.Object3D; brake: THREE.MeshBasicMaterial };

export function Cars({
  cars, track: t, sim, paused, speed, target, followId, quality,
}: {
  cars: SimCar[]; track: Track; sim: React.RefObject<SimState>; paused: boolean; speed: number; target: React.RefObject<THREE.Vector3>; followId: number; quality: Quality;
}) {
  const group = useRef<THREE.Group>(null);
  const parts = useRef<CarParts[]>([]);
  const geo = useMemo(() => carGeometry(), []);
  const mats = useMemo(() => ({
    carbon: new THREE.MeshStandardMaterial({ color: "#16171a", roughness: 0.45, metalness: 0.3 }),
    tyre: new THREE.MeshStandardMaterial({ color: "#1b1b1d", roughness: 0.9 }),
    rim: new THREE.MeshStandardMaterial({ color: "#2b2d31", roughness: 0.35, metalness: 0.7 }),
    cockpit: new THREE.MeshStandardMaterial({ color: "#050506", roughness: 0.6 }),
  }), []);

  useEffect(() => {
    const g = group.current;
    if (!g) return;
    g.clear();
    const own = cars.map((c) => ({ ...c })); // the sim mutates its own copy, never props
    sim.current = { cars: own, order: own, time: 0 };
    parts.current = own.map((c) => {
      const L = LIVERIES[c.livery % LIVERIES.length];
      const body = new THREE.MeshStandardMaterial({ color: L.body, roughness: 0.32, metalness: 0.35 });
      const accent = new THREE.MeshStandardMaterial({ color: L.accent, roughness: 0.35, metalness: 0.2 });
      const root = new THREE.Group();
      const hi = new THREE.Group();
      const add = (geom: THREE.BufferGeometry, m: THREE.Material, parent: THREE.Object3D = hi) => {
        const mesh = new THREE.Mesh(geom, m);
        mesh.castShadow = quality === "high";
        parent.add(mesh);
        return mesh;
      };
      add(geo.body, body); add(geo.accent, accent); add(geo.carbon, mats.carbon); add(geo.cockpit, mats.cockpit);
      const fFlap = new THREE.Group(); fFlap.position.set(0, 0.12, 2.28); add(geo.frontFlap, mats.carbon, fFlap); hi.add(fFlap);
      const rFlap = new THREE.Group(); rFlap.position.set(0, 0.86, -2.2); add(geo.rearFlap, accent, rFlap); hi.add(rFlap);
      const brakeMat = new THREE.MeshBasicMaterial({ color: "#3a0000" });
      const bl = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.06, 0.03), brakeMat); bl.position.set(0, 0.42, -2.25); hi.add(bl);
      const wheels: THREE.Group[] = [], steer: THREE.Group[] = [];
      for (const [x, z, front] of [[1, 1, true], [-1, 1, true], [1, -1, false], [-1, -1, false]] as const) {
        const st = new THREE.Group();
        st.position.set((x * DIM.track) / 2, DIM.tyreR, (z * DIM.wheelbase) / 2);
        const spin = new THREE.Group();
        add(front ? geo.tyreFront : geo.tyreRear, mats.tyre, spin);
        add(front ? geo.rimFront : geo.rimRear, mats.rim, spin);
        st.add(spin);
        hi.add(st);
        wheels.push(spin);
        if (front) steer.push(st);
      }
      const lo = new THREE.Mesh(geo.low, body);
      lo.visible = false;
      root.add(hi, lo);
      g.add(root);
      return { root, hi, lo, wheels, steer, fFlap, rFlap, brake: brakeMat };
    });
  }, [cars, sim, geo, mats, quality]);

  const camPosRef = useRef(new THREE.Vector3());
  useFrame((state, delta) => {
    if (!sim.current) return;
    const dt = Math.min(delta, 1 / 20) * (paused ? 0 : speed);
    if (dt > 0) {
      // Sub-step for stability at high playback speed.
      const steps = Math.ceil(dt / (1 / 60));
      for (let k = 0; k < steps; k++) {
        sim.current.time += dt / steps;
        sim.current.order = stepSim(t, sim.current.cars, dt / steps, sim.current.time);
      }
    }
    const s = sim.current;
    const camPos = state.camera.getWorldPosition(camPosRef.current);
    s.cars.forEach((c, n) => {
      const p = parts.current[n];
      if (!p) return;
      const a = sample(t, c.s);
      const x = a.x + a.nx * c.off, z = a.z + a.nz * c.off;
      p.root.position.set(x, 0, z);
      p.root.rotation.set(0, Math.atan2(a.tx, a.tz), 0);
      // Body pitch (braking dive / acceleration squat) and roll.
      p.hi.rotation.x = THREE.MathUtils.clamp(c.a * 0.0012, -0.03, 0.02);
      p.hi.rotation.z = THREE.MathUtils.clamp(-c.v * c.v * a.k * 0.0009, -0.03, 0.03);
      for (const wg of p.wheels) wg.rotation.x = c.wheel;
      const steerAng = THREE.MathUtils.clamp(Math.atan(DIM.wheelbase * a.k) * 1.6, -0.5, 0.5);
      for (const sg of p.steer) sg.rotation.y = steerAng;
      // Active aero: flaps rotate down toward flat in straight mode.
      p.fFlap.rotation.x = -0.32 + c.aero * 0.26;
      p.rFlap.rotation.x = -0.38 + c.aero * 0.34;
      p.brake.color.set(c.a < -8 ? "#ff1a1a" : "#3a0000");
      const d = camPos.distanceTo(p.root.position);
      p.hi.visible = d < 380;
      p.lo.visible = !p.hi.visible;
      if (c.id === followId && target.current) target.current.set(x, 0, z);
    });
  });

  return <group ref={group} />;
}

/* ============================== CAMERA ============================== */
export function CameraRig({
  track: t, sim, mode, followId, focus, target,
}: {
  track: Track; sim: React.RefObject<SimState>; mode: CamMode; followId: number; focus: Focus; target: React.RefObject<THREE.Vector3>;
}) {
  const controls = useRef<OrbitControlsImpl>(null);
  const get = useThree((st) => st.get);
  const tvSpots = useMemo(() => {
    const out: { i: number; x: number; z: number }[] = [];
    for (let i = 0; i < t.N; i += Math.round(300 / t.ds)) {
      for (const o of [t.width / 2 + 28, -t.width / 2 - 28]) {
        if (clearAt(t, i, o, 20)) { out.push({ i, x: t.px[i] + t.nx[i] * o, z: t.pz[i] + t.nz[i] * o }); break; }
      }
    }
    return out;
  }, [t]);
  const desired = useRef(new THREE.Vector3());
  const look = useRef(new THREE.Vector3());
  const flyTo = useRef<{ pos: THREE.Vector3; look: THREE.Vector3 } | null>(null);
  const snap = useRef(true);
  useEffect(() => { snap.current = true; }, [mode, followId]);

  // Initial overview position.
  useEffect(() => {
    const camera = get().camera as THREE.PerspectiveCamera;
    const b = t.bounds;
    const aspect = camera.aspect || 1.6;
    const k = aspect < 1 ? 1.25 / aspect : 1; // portrait screens need more distance
    camera.position.set(b.cx + b.size * 0.1 * k, b.size * 0.78 * k, b.cz + b.size * 0.62 * k);
    controls.current?.target.set(b.cx, 0, b.cz);
    controls.current?.update();
  }, [t, get]);

  // Fly to a focused corner / sector in free mode.
  useEffect(() => {
    if (!focus || mode !== "orbit") return;
    const camera = get().camera;
    const dir = camera.position.clone().sub(controls.current?.target ?? new THREE.Vector3()).setY(0).normalize();
    flyTo.current = {
      look: new THREE.Vector3(focus.x, 0, focus.z),
      pos: new THREE.Vector3(focus.x + dir.x * focus.dist, focus.dist * 0.7, focus.z + dir.z * focus.dist),
    };
  }, [focus, mode, get]);

  useFrame((state, delta) => {
    const camera = state.camera as THREE.PerspectiveCamera;
    const s = sim.current;
    const c = s?.cars.find((k) => k.id === followId);
    const k = 1 - Math.exp(-delta * 3.2);
    if (mode === "orbit" || !c) {
      if (flyTo.current && controls.current) {
        camera.position.lerp(flyTo.current.pos, k);
        controls.current.target.lerp(flyTo.current.look, k);
        if (camera.position.distanceTo(flyTo.current.pos) < 2) flyTo.current = null;
      }
      controls.current?.update();
      return;
    }
    flyTo.current = null;
    const lk = snap.current ? 1 : 1 - Math.exp(-delta * 9);
    const a = sample(t, c.s);
    const x = a.x + a.nx * c.off, z = a.z + a.nz * c.off;
    const car = new THREE.Vector3(x, 0, z);
    if (mode === "chase") {
      desired.current.set(x - a.tx * 9.5, 2.6, z - a.tz * 9.5);
      look.current.lerp(new THREE.Vector3(x + a.tx * 12, 0.9, z + a.tz * 12), lk);
      camera.position.lerp(desired.current, snap.current ? 1 : 1 - Math.exp(-delta * 8));
    } else if (mode === "heli") {
      desired.current.set(x - a.tx * 70 + a.nx * 40, 85, z - a.tz * 70 + a.nz * 40);
      camera.position.lerp(desired.current, snap.current ? 1 : k);
      look.current.lerp(car, lk);
    } else if (mode === "top") {
      desired.current.set(x, 260, z + 1);
      camera.position.lerp(desired.current, k);
      look.current.lerp(car, lk);
    } else {
      // TV: nearest trackside camera ahead of the car.
      let best = tvSpots[0], bd = Infinity;
      for (const sp of tvSpots) {
        let d = sp.i * t.ds - c.s;
        if (d < -40) d += t.length;
        if (d < bd) { bd = d; best = sp; }
      }
      if (best) camera.position.set(best.x, 7, best.z);
      look.current.lerp(car, lk);
      camera.fov = THREE.MathUtils.clamp(10 + camera.position.distanceTo(car) * 0.12, 12, 50);
      camera.updateProjectionMatrix();
    }
    if (mode !== "tv" && camera.fov !== 45) {
      camera.fov = 45;
      camera.updateProjectionMatrix();
    }
    camera.lookAt(look.current);
    snap.current = false;
    if (controls.current) controls.current.target.copy(car);
    if (target.current) target.current.copy(car);
  });

  if (mode !== "orbit") return null;
  return (
    <OrbitControls
      ref={controls}
      enableDamping
      dampingFactor={0.08}
      maxPolarAngle={Math.PI / 2.08}
      minDistance={8}
      maxDistance={t.bounds.size * 2}
      makeDefault
    />
  );
}

/* ============================== OVERLAYS ============================== */
export function SectorHighlight({ track: t, sector }: { track: Track; sector: number | null }) {
  const geo = useMemo(() => {
    if (sector == null) return null;
    const [a, b] = t.sectors[sector];
    return ribbon(t, () => t.width / 2 + 0.4, () => -t.width / 2 - 0.4, 0.09, (i) => i >= a && i < b);
  }, [t, sector]);
  if (!geo) return null;
  return (
    <mesh geometry={geo}>
      <meshBasicMaterial color="#d2ff00" transparent opacity={0.38} depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

export function CornerLabels({ track: t, selected, onSelect, hidden }: { track: Track; selected: number | null; onSelect: (n: number) => void; hidden: boolean }) {
  return (
    <>
      {t.corners.map((c) => {
        const o = (c.dir === "left" ? -1 : 1) * (t.width / 2 + 10);
        const x = t.px[c.i] + t.nx[c.i] * o, z = t.pz[c.i] + t.nz[c.i] * o;
        return (
          <Html key={c.n} position={[x, 6, z]} center distanceFactor={undefined} zIndexRange={[20, 0]}>
            <button
              type="button"
              onClick={() => onSelect(c.n)}
              tabIndex={hidden ? -1 : 0}
              style={{ display: hidden ? "none" : undefined }}
              className={`pointer-events-auto cursor-pointer whitespace-nowrap rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold shadow transition-colors ${
                selected === c.n ? "bg-brand text-brand-fg" : "bg-black/70 text-white hover:bg-white hover:text-black"
              }`}
            >
              C{c.n}
            </button>
          </Html>
        );
      })}
    </>
  );
}
