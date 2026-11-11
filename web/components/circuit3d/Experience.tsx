"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { CameraRig, Cars, CornerLabels, Lights, SectorHighlight, World, type CamMode, type Focus, type SimState } from "./Scene";
import { buildTrack, fmtLap, hashStr, rng, type CircuitData, type Track } from "./track";
import { createField, type SimCar } from "./sim";
import { LIVERIES } from "./car";
import type { Quality, Setting } from "./env";

const CAMS: { id: CamMode; label: string }[] = [
  { id: "orbit", label: "Free" },
  { id: "chase", label: "Chase" },
  { id: "tv", label: "TV" },
  { id: "heli", label: "Heli" },
  { id: "top", label: "Top" },
];
const SPEEDS = [0.5, 1, 2, 4];

export default function Experience({ id, name, setting, lengthM }: { id: string; name: string; setting: Setting; lengthM: number | null }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<CircuitData | null>(null);
  const [error, setError] = useState(false);
  const quality: Quality = useMemo(
    () => (typeof window !== "undefined" && (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 820) ? "low" : "high"),
    []
  );

  useEffect(() => {
    let alive = true;
    fetch(`/circuits/${id}.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => alive && setData(d))
      .catch(() => alive && setError(true));
    return () => { alive = false; };
  }, [id]);

  const track = useMemo<Track | null>(() => (data ? buildTrack({ ...data, lengthM: lengthM ?? data.lengthM }, setting.kind === "street" ? 10.5 : 13) : null), [data, setting.kind, lengthM]);

  const [carCount, setCarCount] = useState(quality === "high" ? 12 : 6);
  const field = useMemo(() => (track ? createField(track, carCount, rng(hashStr(id))) : []), [track, carCount, id]);
  const sim = useRef<SimState>({ cars: [], order: [], time: 0 });

  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [cam, setCam] = useState<CamMode>("orbit");
  const [followId, setFollowId] = useState(0);
  const [sector, setSector] = useState<number | null>(null);
  const [corner, setCorner] = useState<number | null>(null);
  const [focus, setFocus] = useState<Focus>(null);
  const [fs, setFs] = useState(false);
  const [panel, setPanel] = useState(true);
  const target = useRef(new THREE.Vector3());

  // HUD snapshot at 4 Hz — the simulation itself runs in the render loop.
  const [snap, setSnap] = useState<{ order: SimCar[]; cars: SimCar[] }>({ order: [], cars: [] });
  useEffect(() => {
    const iv = setInterval(() => {
      const s = sim.current;
      setSnap({ order: s.order.map((c) => ({ ...c })), cars: s.cars.map((c) => ({ ...c })) });
    }, 250);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const on = () => setFs(document.fullscreenElement === wrap.current);
    document.addEventListener("fullscreenchange", on);
    return () => document.removeEventListener("fullscreenchange", on);
  }, []);
  const toggleFs = () => (document.fullscreenElement ? document.exitFullscreen() : wrap.current?.requestFullscreen?.());

  const selectSector = useCallback((n: number) => {
    if (!track) return;
    setCorner(null);
    if (sector === n) { setSector(null); return; }
    setSector(n);
    const [a, b] = track.sectors[n];
    const mid = Math.floor((a + b) / 2);
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
    for (let i = a; i < b; i += 5) { minX = Math.min(minX, track.px[i]); maxX = Math.max(maxX, track.px[i]); minZ = Math.min(minZ, track.pz[i]); maxZ = Math.max(maxZ, track.pz[i]); }
    setCam("orbit");
    setFocus({ x: (minX + maxX) / 2 || track.px[mid], z: (minZ + maxZ) / 2 || track.pz[mid], dist: Math.max(maxX - minX, maxZ - minZ) * 0.9 + 80 });
  }, [track, sector]);

  const selectCorner = useCallback((n: number) => {
    if (!track) return;
    const c = track.corners.find((k) => k.n === n);
    if (!c) return;
    setSector(null);
    setCorner(n);
    setCam("orbit");
    setFocus({ x: track.px[c.i], z: track.pz[c.i], dist: 95 });
  }, [track]);

  const s = snap;
  const leader = s.order[0];
  const selCorner = track?.corners.find((c) => c.n === corner) ?? null;
  const sectorStats = track && sector != null ? (() => {
    const [a, b] = track.sectors[sector];
    let tm = 0;
    for (let i = a; i < b; i++) tm += track.ds / track.v[i];
    return { len: (b - a) * track.ds, time: tm, corners: track.corners.filter((c) => c.i >= a && c.i < b).length };
  })() : null;
  const followed = s.cars.find((c) => c.id === followId);

  return (
    <div
      ref={wrap}
      className={`relative overflow-hidden bg-[#05070b] text-white ${fs ? "h-screen w-screen" : "h-[min(86svh,860px)] w-full rounded-[28px]"}`}
    >
      {!track && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <span className="mi-dot" />
          <span className="mi-label text-white/60">{error ? "Circuit geometry unavailable" : `Building ${name}…`}</span>
        </div>
      )}

      {track && (
        <Canvas
          shadows={quality === "high"}
          dpr={quality === "high" ? [1, 1.75] : [1, 1.25]}
          camera={{ fov: 45, near: 0.5, far: 12000 }}
          gl={{ antialias: true, powerPreference: "high-performance" }}
          onCreated={({ gl }) => { gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = setting.night ? 1.1 : 1.0; }}
        >
          <AdaptiveDpr pixelated={false} />
          <Lights night={setting.night} target={target} quality={quality} />
          <World track={track} setting={setting} data={data!} quality={quality} />
          <Cars key={`${carCount}-${track.N}`} cars={field} track={track} sim={sim} paused={paused} speed={speed} target={target} followId={followId} quality={quality} />
          <SectorHighlight track={track} sector={sector} />
          {quality === "high" && <CornerLabels track={track} selected={corner} onSelect={selectCorner} hidden={!panel || !(cam === "orbit" || cam === "top")} />}
          <CameraRig track={track} sim={sim} mode={cam} followId={followId} focus={focus} target={target} />
        </Canvas>
      )}

      {/* ---------- HUD ---------- */}
      {track && (
        <>
          {/* top-left: title */}
          <div className="pointer-events-none absolute left-4 top-4 flex flex-col gap-1 sm:left-6 sm:top-6">
            <span className="mi-label flex items-center gap-2 text-white/60"><span className="mi-dot" /> Simulation · 2026-spec field</span>
            <span className="text-lg font-semibold tracking-[-0.02em] sm:text-xl">{name}</span>
          </div>

          {/* top-right: utility */}
          <div className="absolute right-4 top-4 flex gap-2 sm:right-6 sm:top-6">
            <HudButton onClick={() => setPanel((p) => !p)} label={panel ? "Hide panels" : "Show panels"}>{panel ? "◧" : "◨"}</HudButton>
            <HudButton onClick={toggleFs} label={fs ? "Exit fullscreen" : "Fullscreen"}>{fs ? "⤡" : "⤢"}</HudButton>
          </div>

          {/* left: timing tower */}
          {panel && (
            <div className="absolute left-4 top-20 hidden w-56 overflow-hidden rounded-2xl border border-white/10 bg-black/55 backdrop-blur-md sm:left-6 md:block">
              <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                <span className="mi-label text-white/60">Lap {Math.max(1, (leader?.lap ?? 0) + 1)}</span>
                <span className="mi-label text-white/40">Sim</span>
              </div>
              <ol className="max-h-[52vh] overflow-y-auto">
                {s.order.map((c, i) => {
                  const L = LIVERIES[c.livery % LIVERIES.length];
                  const gap = i === 0 ? null : (s.order[0].total - c.total) / Math.max(20, c.v);
                  return (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => { setFollowId(c.id); if (cam === "orbit") setCam("chase"); }}
                        className={`grid w-full cursor-pointer grid-cols-[1.4rem_0.3rem_1fr_auto] items-center gap-2 px-3 py-1.5 text-left text-xs transition-colors ${c.id === followId ? "bg-white/15" : "hover:bg-white/5"}`}
                      >
                        <span className="tabular font-mono text-white/50">{i + 1}</span>
                        <span className="h-3 w-1 rounded-full" style={{ background: L.accent }} />
                        <span className="truncate font-medium">{L.name} <span className="text-white/40">{c.id % 2 ? "B" : "A"}</span></span>
                        <span className="tabular font-mono text-white/60">{gap == null ? `${Math.round(c.v * 3.6)}` : `+${gap.toFixed(1)}`}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}

          {/* right: info panel */}
          {panel && (
            <div className="absolute right-4 top-20 hidden w-64 flex-col gap-4 rounded-2xl border border-white/10 bg-black/55 p-4 backdrop-blur-md sm:right-6 md:flex">
              {selCorner ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="mi-label text-brand">Corner C{selCorner.n}</span>
                    <button type="button" className="text-xs text-white/50 hover:text-white" onClick={() => setCorner(null)}>✕</button>
                  </div>
                  <Info k="Direction" v={selCorner.dir === "left" ? "Left-hander" : "Right-hander"} />
                  <Info k="Apex radius" v={`${selCorner.radius} m`} />
                  <Info k="Distance from line" v={`${(selCorner.s / 1000).toFixed(2)} km`} />
                  <Info k="Sim apex speed" v={`${selCorner.apexKmh} km/h`} />
                  <p className="text-[0.68rem] leading-relaxed text-white/45">Corners are detected from track curvature; numbering may differ from official turn numbers.</p>
                </>
              ) : sectorStats ? (
                <>
                  <span className="mi-label text-brand">Sector {sector! + 1}</span>
                  <Info k="Length" v={`${(sectorStats.len / 1000).toFixed(2)} km`} />
                  <Info k="Detected corners" v={`${sectorStats.corners}`} />
                  <Info k="Sim sector time" v={fmtLap(sectorStats.time).replace(/^0:/, "")} />
                  <p className="text-[0.68rem] leading-relaxed text-white/45">Sectors here are equal thirds of the lap, not official timing-line positions.</p>
                </>
              ) : (
                <>
                  <span className="mi-label text-white/60">Track</span>
                  <Info k="Lap length" v={`${(track.length / 1000).toFixed(3)} km`} />
                  <Info k="Detected corners" v={`${track.corners.length}`} />
                  <Info k="Sim reference lap" v={fmtLap(track.lapTime)} />
                  <Info k="Sim top speed" v={`${Math.round(Math.max(...track.v) * 3.6)} km/h`} />
                  {followed && <Info k={`${LIVERIES[followed.livery % LIVERIES.length].name} ${followed.id % 2 ? "B" : "A"} · speed`} v={`${Math.round(followed.v * 3.6)} km/h${followed.aero > 0.5 ? " · straight mode" : ""}`} />}
                  <p className="text-[0.68rem] leading-relaxed text-white/45">Lap length is the published figure; times and speeds come from this simulation, not real timing.</p>
                </>
              )}
              <div className="flex gap-1.5">
                {[0, 1, 2].map((n) => (
                  <button key={n} type="button" onClick={() => selectSector(n)} className={`flex-1 cursor-pointer rounded-full border py-1.5 text-xs transition-colors ${sector === n ? "border-brand bg-brand text-brand-fg" : "border-white/20 hover:border-white"}`}>
                    S{n + 1}
                  </button>
                ))}
              </div>
              {quality === "low" && track.corners.length > 0 && (
                <select className="rounded-lg bg-white/10 px-2 py-1.5 text-xs" value={corner ?? ""} onChange={(e) => selectCorner(Number(e.target.value))}>
                  <option value="">Jump to corner…</option>
                  {track.corners.map((c) => <option key={c.n} value={c.n}>C{c.n} · {c.dir} · {c.radius} m</option>)}
                </select>
              )}
            </div>
          )}

          {/* bottom: transport + cameras */}
          <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-between gap-3 sm:inset-x-6 sm:bottom-6">
            <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/55 p-1 backdrop-blur-md">
              <HudButton onClick={() => setPaused((p) => !p)} label={paused ? "Resume" : "Pause"} solid>{paused ? "▶" : "❚❚"}</HudButton>
              {SPEEDS.map((sp) => (
                <button key={sp} type="button" onClick={() => setSpeed(sp)} className={`cursor-pointer rounded-full px-2.5 py-1.5 font-mono text-xs transition-colors ${speed === sp ? "bg-white text-black" : "text-white/70 hover:text-white"}`}>
                  {sp}×
                </button>
              ))}
              <span className="mx-1 h-5 w-px bg-white/15" />
              <button type="button" onClick={() => setCarCount((n) => (n >= (quality === "high" ? 22 : 10) ? 4 : Math.min(n + 4, quality === "high" ? 22 : 10)))} className="cursor-pointer rounded-full px-2.5 py-1.5 text-xs text-white/70 hover:text-white" title="Number of cars">
                {carCount} cars
              </button>
            </div>
            <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/55 p-1 backdrop-blur-md">
              {CAMS.map((c) => (
                <button key={c.id} type="button" onClick={() => { setCam(c.id); setFocus(null); }} className={`cursor-pointer rounded-full px-3 py-1.5 text-xs transition-colors ${cam === c.id ? "bg-brand text-brand-fg" : "text-white/70 hover:text-white"}`}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          {/* mobile: sector shortcuts (the side panels are desktop-only) */}
          <div className="absolute right-4 top-16 flex gap-1 md:hidden">
            {[0, 1, 2].map((n) => (
              <button key={n} type="button" onClick={() => selectSector(n)} className={`cursor-pointer rounded-full border px-2.5 py-1 text-[11px] backdrop-blur-md ${sector === n ? "border-brand bg-brand text-brand-fg" : "border-white/20 bg-black/50"}`}>
                S{n + 1}
              </button>
            ))}
          </div>
          {cam === "orbit" && (
            <span className="mi-label pointer-events-none absolute bottom-20 left-1/2 hidden -translate-x-1/2 text-white/40 sm:block">Drag to orbit · scroll to zoom · right-drag to pan</span>
          )}
        </>
      )}
    </div>
  );
}

function Info({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-t border-white/10 pt-2 text-xs">
      <span className="text-white/50">{k}</span>
      <span className="tabular text-right font-medium">{v}</span>
    </div>
  );
}

function HudButton({ onClick, label, children, solid = false }: { onClick: () => void; label: string; children: React.ReactNode; solid?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-sm transition-colors ${solid ? "bg-brand text-brand-fg" : "border border-white/15 bg-black/55 backdrop-blur-md hover:border-white"}`}
    >
      {children}
    </button>
  );
}
