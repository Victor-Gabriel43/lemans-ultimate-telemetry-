"use client";

import { useEffect, useRef } from "react";

export type CircuitState = {
  /** progresso suavizado da seção, 0..1 — gira a câmera */
  progress: number;
  /** cor de destaque do capítulo atual, "r,g,b" */
  accent: string;
};

type P = { x: number; y: number; z: number; t: number; track: boolean; s: number };

/** Traçado fechado genérico (não é um circuito real), em coordenadas -1..1. */
function circuit(t: number): [number, number] {
  const a = t * Math.PI * 2;
  const r = 1 + 0.22 * Math.sin(2 * a + 0.6) + 0.1 * Math.sin(5 * a + 1.3) - 0.06 * Math.cos(3 * a);
  return [Math.cos(a) * r * 1.25, Math.sin(a) * r * 0.78];
}

/**
 * "Globo de partículas" do capítulo de features, reinterpretado como um
 * circuito: milhares de pontos formam o traçado num plano inclinado em 3D,
 * cercados por uma nuvem esférica tênue; um ponto brilhante (o carro) dá
 * voltas deixando rastro. A câmera gira com a rolagem.
 */
export function ParticleCircuit({ state, className = "" }: { state: React.RefObject<CircuitState>; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const pts: P[] = [];
    const TRACK = 1400;
    for (let i = 0; i < TRACK; i++) {
      const t = i / TRACK;
      const [x, y] = circuit(t);
      const j = (Math.random() - 0.5) * 0.05;
      pts.push({ x: x + j, y: y + j, z: (Math.random() - 0.5) * 0.03, t, track: true, s: Math.random() });
    }
    for (let i = 0; i < 900; i++) {
      // nuvem esférica
      const u = Math.random() * 2 - 1;
      const th = Math.random() * Math.PI * 2;
      const r = 1.6 + Math.random() * 0.5;
      const k = Math.sqrt(1 - u * u);
      pts.push({ x: k * Math.cos(th) * r, y: u * r, z: k * Math.sin(th) * r, t: 0, track: false, s: Math.random() });
    }

    let w = 0;
    let h = 0;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    let raf = 0;
    let car = 0;
    const start = performance.now();

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible || w === 0) return;
      const time = reduced ? 0 : (now - start) / 1000;
      const { progress, accent } = state.current;
      car = (car + (reduced ? 0 : 0.0016)) % 1;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const yaw = progress * Math.PI * 1.4 + time * 0.05;
      const tilt = 1.05 - progress * 0.45;
      const cy = Math.cos(yaw);
      const sy = Math.sin(yaw);
      const ct = Math.cos(tilt);
      const st = Math.sin(tilt);
      const scale = Math.min(w, h) * 0.34;
      const cx0 = w / 2;
      const cy0 = h / 2;

      const project = (x: number, y: number, z: number) => {
        // plano do circuito = XY; inclina em torno de X e gira em Y
        const y1 = y * ct - z * st;
        const z1 = y * st + z * ct;
        const x2 = x * cy + z1 * sy;
        const z2 = -x * sy + z1 * cy;
        const f = 3.2 / (3.2 + z2);
        return [cx0 + x2 * scale * f, cy0 + y1 * scale * f, f] as const;
      };

      for (const p of pts) {
        const [sx, sy2, f] = project(p.x, p.y, p.z);
        if (p.track) {
          // distância ao carro ao longo do traçado → rastro
          let d = car - p.t;
          if (d < 0) d += 1;
          const trail = d < 0.12 ? 1 - d / 0.12 : 0;
          const a = 0.28 + 0.5 * f * 0.5 + trail * 0.6;
          ctx.fillStyle = trail > 0 ? `rgba(${accent},${Math.min(1, a)})` : `rgba(255,236,220,${a * 0.55})`;
          const size = (0.8 + p.s * 0.9 + trail * 1.4) * f;
          ctx.fillRect(sx, sy2, size, size);
        } else {
          const tw = reduced ? 0.6 : 0.5 + 0.5 * Math.sin(time * 1.3 + p.s * 20);
          ctx.fillStyle = `rgba(${accent},${0.08 + 0.16 * tw * f})`;
          ctx.fillRect(sx, sy2, 1.1 * f, 1.1 * f);
        }
      }

      // o carro
      const [px, py] = circuit(car);
      const [sx, sy2, f] = project(px, py, 0);
      const g = ctx.createRadialGradient(sx, sy2, 0, sx, sy2, 26 * f);
      g.addColorStop(0, `rgba(${accent},0.95)`);
      g.addColorStop(1, `rgba(${accent},0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(sx, sy2, 26 * f, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(sx, sy2, 2.6 * f, 0, Math.PI * 2);
      ctx.fill();
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [state]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
