/**
 * Race simulation. Each car tracks the reference speed profile scaled by
 * its own performance factor, with acceleration/braking limits, follows a
 * racing line, and overtakes when it is faster and the road ahead allows.
 * Pure logic: no three.js objects, so it can be stepped at any rate.
 */
import { accelLimit, brakeLimit, type Track } from "./track";

export type SimCar = {
  id: number;
  livery: number;
  perf: number; // 0.955–1.0 multiplier on cornering & straight speed
  s: number; // distance along lap (0..L)
  lap: number;
  v: number; // m/s
  a: number; // longitudinal accel (m/s²) — for pitch / brake lights
  off: number; // lateral offset (m, + = left)
  passSide: number; // 0 = racing line, ±1 = overtaking lane
  passTimer: number;
  wheel: number; // wheel rotation (rad)
  aero: number; // 0 = corner mode, 1 = straight mode (flaps open)
  lapStart: number;
  lastLap: number | null;
  bestLap: number | null;
  total: number; // lap*L + s
};

export function createField(track: Track, count: number, seed: () => number): SimCar[] {
  const cars: SimCar[] = [];
  for (let i = 0; i < count; i++) {
    // Two cars per team; team performance spreads ~4%, team-mates within ~0.6%.
    const team = i >> 1;
    const perf = 1 - (team / Math.max(1, count / 2)) * 0.04 - seed() * 0.006;
    const s = (track.length - 12 - i * 8 + track.length) % track.length;
    cars.push({
      id: i, livery: team, perf, s, lap: s > track.length / 2 ? -1 : 0, v: 0, a: 0,
      off: i % 2 ? -2.2 : 2.2, passSide: 0, passTimer: 0, wheel: 0, aero: 0,
      lapStart: 0, lastLap: null, bestLap: null, total: 0,
    });
  }
  cars.forEach((c) => (c.total = c.lap * track.length + c.s));
  return cars;
}

const at = (arr: Float32Array, track: Track, s: number) => {
  const f = s / track.ds;
  const i = Math.floor(f) % track.N;
  const j = (i + 1) % track.N;
  const t = f - Math.floor(f);
  return arr[i] * (1 - t) + arr[j] * t;
};

/** Max |curvature| over the next `dist` metres. */
function straightAhead(track: Track, s: number, dist: number) {
  let m = 0;
  for (let d = 0; d < dist; d += 10) m = Math.max(m, Math.abs(at(track.k, track, (s + d) % track.length)));
  return m;
}

export function stepSim(track: Track, cars: SimCar[], dt: number, time: number) {
  const L = track.length;
  const half = track.width / 2 - 1.4;
  // Order by race distance so we can find each car's nearest car ahead.
  const order = [...cars].sort((a, b) => b.total - a.total);

  for (const c of cars) {
    const target = at(track.v, track, c.s) * (0.88 + 0.12 * c.perf) * (c.perf ** 0.5);

    // Nearest car physically ahead on track (wrap-aware), within 60 m.
    let ahead: SimCar | null = null;
    let gap = Infinity;
    for (const o of cars) {
      if (o === c) continue;
      let d = o.s - c.s;
      if (d < 0) d += L;
      if (d < gap && d < 60) { gap = d; ahead = o; }
    }

    let want = target;
    if (ahead) {
      const sameLane = Math.abs(ahead.off - c.off) < 2.0;
      const faster = target > ahead.v + 0.6;
      const clear = straightAhead(track, c.s, 160) < 1 / 450;
      if (sameLane && gap < 30 && faster && clear && c.passSide === 0) {
        // Pull out to the side with more room (away from the car ahead).
        c.passSide = ahead.off >= 0 ? -1 : 1;
        c.passTimer = 6;
      }
      if (sameLane && gap < 18) {
        // Follow: match speed, keep ~8 m gap.
        want = Math.min(want, ahead.v + (gap - 8) * 0.6);
      }
    }
    if (c.passSide !== 0) {
      c.passTimer -= dt;
      const stillBeside = ahead && gap < 25;
      if (c.passTimer <= 0 && !stillBeside) c.passSide = 0;
    }

    // Longitudinal dynamics.
    const dv = want - c.v;
    const acc = dv > 0 ? Math.min(dv / dt, accelLimit(c.v) * (0.96 + 0.04 * c.perf)) : Math.max(dv / dt, -brakeLimit(c.v) * 1.15);
    c.a = acc;
    c.v = Math.max(0, c.v + acc * dt);

    // Lateral: racing line, or the overtaking lane.
    const lineOff = at(track.line, track, c.s);
    const desired = c.passSide === 0 ? lineOff : Math.max(-half, Math.min(half, c.passSide * half * 0.85));
    const maxRate = 2.2 + c.v * 0.03;
    c.off += Math.max(-maxRate * dt, Math.min(maxRate * dt, desired - c.off));

    // Active aero: straight mode on fast, straight sections only.
    const straight = c.v > 55 && straightAhead(track, c.s, 120) < 1 / 700;
    c.aero += ((straight ? 1 : 0) - c.aero) * Math.min(1, dt * 5);

    // Advance.
    c.s += c.v * dt;
    c.wheel += (c.v / 0.36) * dt;
    if (c.s >= L) {
      c.s -= L;
      c.lap++;
      if (c.lap >= 1 && c.lapStart > 0) {
        c.lastLap = time - c.lapStart;
        c.bestLap = c.bestLap == null ? c.lastLap : Math.min(c.bestLap, c.lastLap);
      }
      c.lapStart = time;
    }
    c.total = c.lap * L + c.s;
  }
  return order;
}

export function sample(track: Track, s: number) {
  const f = s / track.ds;
  const i = Math.floor(f) % track.N;
  const j = (i + 1) % track.N;
  const t = f - Math.floor(f);
  const lerp = (a: Float32Array) => a[i] * (1 - t) + a[j] * t;
  return { x: lerp(track.px), z: lerp(track.pz), tx: lerp(track.tx), tz: lerp(track.tz), nx: lerp(track.nx), nz: lerp(track.nz), k: lerp(track.k) };
}
