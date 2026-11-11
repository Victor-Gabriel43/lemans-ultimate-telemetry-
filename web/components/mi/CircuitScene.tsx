"use client";

import { useEffect, useRef } from "react";

/**
 * Hero signature: a fictional circuit rendered in real 3D perspective on a
 * 2D canvas (no WebGL dependency, ~0 KB of libraries). The ribbon has
 * elevation, rotates slowly, tilts toward the pointer, and a lime "racing
 * line" laps it. Pauses off-screen; renders one still frame under
 * prefers-reduced-motion.
 */
type V3 = [number, number, number];

const N = 720;

function buildTrack() {
  const pts: V3[] = [];
  for (let i = 0; i < N; i++) {
    const t = (i / N) * Math.PI * 2;
    const r = 1 + 0.3 * Math.sin(2 * t + 0.6) + 0.13 * Math.cos(3 * t - 0.4) + 0.05 * Math.sin(7 * t);
    const x = r * Math.cos(t) * 1.55;
    const z = r * Math.sin(t) * 0.95 + 0.22 * Math.sin(2 * t);
    const y = 0.14 * Math.sin(2 * t + 1) + 0.05 * Math.cos(5 * t);
    pts.push([x, y, z]);
  }
  // Ribbon edges from the horizontal normal.
  const W = 0.055;
  const left: V3[] = [];
  const right: V3[] = [];
  for (let i = 0; i < N; i++) {
    const a = pts[(i - 1 + N) % N];
    const b = pts[(i + 1) % N];
    const tx = b[0] - a[0];
    const tz = b[2] - a[2];
    const l = Math.hypot(tx, tz) || 1;
    const nx = -tz / l;
    const nz = tx / l;
    const p = pts[i];
    left.push([p[0] + nx * W, p[1], p[2] + nz * W]);
    right.push([p[0] - nx * W, p[1], p[2] - nz * W]);
  }
  return { pts, left, right };
}

export function CircuitScene({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { pts, left, right } = buildTrack();
    const css = getComputedStyle(document.documentElement);
    const lime = css.getPropertyValue("--brand").trim() || "#d2ff00";
    const paper = css.getPropertyValue("--text").trim() || "#f5f5f0";
    const mono = css.getPropertyValue("--font-plex-mono").trim() || "ui-monospace, monospace";

    let w = 0;
    let h = 0;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Pointer → eased tilt.
    const target = { x: 0, y: 0 };
    const tilt = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const proj = (p: V3, yaw: number, pitch: number, scale: number, cx: number, cy: number) => {
      const cyw = Math.cos(yaw);
      const syw = Math.sin(yaw);
      const x1 = p[0] * cyw - p[2] * syw;
      const z1 = p[0] * syw + p[2] * cyw;
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);
      const y2 = p[1] * cp - z1 * sp;
      const z2 = p[1] * sp + z1 * cp;
      const f = 3.4 / (z2 + 4.2);
      return { x: cx + x1 * f * scale, y: cy - y2 * f * scale, z: z2, f };
    };

    // Ground dot grid.
    const grid: V3[] = [];
    for (let gx = -12; gx <= 12; gx++)
      for (let gz = -8; gz <= 8; gz++) grid.push([gx * 0.16, -0.24, gz * 0.16]);

    const SECTORS = [0, Math.round(N / 3), Math.round((2 * N) / 3)];

    let raf = 0;
    let running = false;
    const start = performance.now();

    const draw = (now: number) => {
      const t = reduced ? 8 : (now - start) / 1000;
      tilt.x += (target.x - tilt.x) * 0.05;
      tilt.y += (target.y - tilt.y) * 0.05;

      const yaw = t * 0.06 + tilt.x * 0.35 - 0.3;
      const pitch = 0.98 + tilt.y * 0.12;
      const scale = Math.min(w * 0.36, h * 0.72);
      const cx = w * 0.5;
      const cy = h * 0.5;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // Ground
      for (const g of grid) {
        const q = proj(g, yaw, pitch, scale, cx, cy);
        const a = Math.max(0, Math.min(0.35, (q.f - 0.6) * 0.9));
        ctx.fillStyle = `rgba(245,245,240,${a})`;
        ctx.fillRect(q.x, q.y, 1.2, 1.2);
      }

      // Project ribbon
      const L = left.map((p) => proj(p, yaw, pitch, scale, cx, cy));
      const R = right.map((p) => proj(p, yaw, pitch, scale, cx, cy));
      const C = pts.map((p) => proj(p, yaw, pitch, scale, cx, cy));

      // Ribbon surface — depth-sorted quads (far first).
      const order = Array.from({ length: N }, (_, i) => i).sort((a, b) => C[b].z - C[a].z);
      for (const i of order) {
        const j = (i + 1) % N;
        const shade = Math.max(0, Math.min(1, (C[i].f - 0.55) * 1.2));
        ctx.fillStyle = `rgba(${21 + shade * 22},${23 + shade * 24},${27 + shade * 26},0.96)`;
        ctx.beginPath();
        ctx.moveTo(L[i].x, L[i].y);
        ctx.lineTo(L[j].x, L[j].y);
        ctx.lineTo(R[j].x, R[j].y);
        ctx.lineTo(R[i].x, R[i].y);
        ctx.closePath();
        ctx.fill();
      }

      // Edge lines
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(245,245,240,0.62)";
      for (const E of [L, R]) {
        ctx.beginPath();
        E.forEach((q, i) => (i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y)));
        ctx.closePath();
        ctx.stroke();
      }

      // Sector pylons
      ctx.font = `500 10px ${mono}`;
      SECTORS.forEach((idx, s) => {
        const base = C[idx];
        const top = proj([pts[idx][0], pts[idx][1] + 0.42, pts[idx][2]], yaw, pitch, scale, cx, cy);
        ctx.strokeStyle = "rgba(245,245,240,0.35)";
        ctx.beginPath();
        ctx.moveTo(base.x, base.y);
        ctx.lineTo(top.x, top.y);
        ctx.stroke();
        ctx.fillStyle = paper;
        ctx.globalAlpha = 0.75;
        ctx.fillText(`S${s + 1}`, top.x + 6, top.y + 3);
        ctx.globalAlpha = 1;
        ctx.fillRect(top.x - 1.5, top.y - 1.5, 3, 3);
      });

      // Racing line — lime trail
      const head = Math.floor((t * 0.085 * N) % N);
      const TRAIL = 150;
      ctx.lineCap = "round";
      for (let k = TRAIL; k > 0; k--) {
        const a = C[(head - k + N) % N];
        const b = C[(head - k + 1 + N) % N];
        const life = 1 - k / TRAIL;
        ctx.strokeStyle = lime;
        ctx.globalAlpha = life * life;
        ctx.lineWidth = 0.6 + life * 2.4 * b.f;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      const hp = C[head];
      const glow = ctx.createRadialGradient(hp.x, hp.y, 0, hp.x, hp.y, 26);
      glow.addColorStop(0, "rgba(210,255,0,0.55)");
      glow.addColorStop(1, "rgba(210,255,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(hp.x - 26, hp.y - 26, 52, 52);
      ctx.fillStyle = lime;
      ctx.beginPath();
      ctx.arc(hp.x, hp.y, 3.2, 0, Math.PI * 2);
      ctx.fill();

      if (running) raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([e]) => {
      if (reduced) {
        draw(performance.now());
        return;
      }
      running = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (running) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
