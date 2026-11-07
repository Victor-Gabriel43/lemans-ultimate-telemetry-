"use client";

import { useEffect, useState } from "react";

/**
 * Pré-loader (Osply / Seas): contador 000→100 em mono, barra fina e
 * duas cortinas que se abrem revelando o pôr do sol do hero.
 * Roda uma vez por sessão do navegador; pula direto com reduced-motion.
 */
export function Loader() {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"count" | "open" | "done">("count");

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("raceops-loader") === "1";
    } catch {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) {
      const t = setTimeout(() => setPhase("done"), 0);
      return () => clearTimeout(t);
    }

    const start = performance.now();
    const DURATION = 1500;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      // ease-in-out com uma "parada" perto de 80%, como um carregamento real
      const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2.4) / 2;
      setCount(Math.round(e * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setPhase("open");
        try {
          sessionStorage.setItem("raceops-loader", "1");
        } catch {}
        setTimeout(() => setPhase("done"), 1100);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden
      className={`lx-loader fixed inset-0 z-[100] ${phase === "open" ? "is-open" : ""}`}
    >
      <div className="lx-curtain lx-curtain-top" />
      <div className="lx-curtain lx-curtain-bottom" />
      <div className="lx-loader-ui absolute inset-0 flex flex-col justify-between p-5 sm:p-8">
        <div className="flex items-center justify-between font-mono text-[0.65rem] tracking-[0.24em] text-white/60">
          <span>RACEOPS / 001</span>
          <span>WARMING TYRES</span>
        </div>
        <div className="flex items-end justify-between gap-6">
          <span className="font-display text-[clamp(5rem,22vw,16rem)] leading-[0.8] text-white tabular-nums">
            {String(count).padStart(3, "0")}
          </span>
          <span className="mb-3 hidden max-w-[16ch] text-right font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.18em] text-white/50 sm:block">
            Endurance race control · Le Mans Ultimate
          </span>
        </div>
        <div className="h-px w-full bg-white/10">
          <div className="h-px bg-[var(--lx-sun)]" style={{ width: `${count}%` }} />
        </div>
      </div>
    </div>
  );
}
