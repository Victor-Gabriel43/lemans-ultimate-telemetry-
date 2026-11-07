"use client";

import { useRef } from "react";
import { SunsetScene } from "./SunsetScene";
import { useScrollProgress } from "./useScrollProgress";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const range = (v: number, a: number, b: number) => clamp((v - a) / (b - a));

/**
 * Hero "pôster" com máscara de logo (estilo trailer de lançamento):
 * a tela começa quase preta, com o pôr do sol aparecendo só por dentro das
 * letras gigantes "24H". Rolando, as letras crescem até a cena tomar a
 * tela inteira, e aí entra a manchete.
 */
export function Hero() {
  const maskText = useRef<SVGGElement>(null);
  const overlay = useRef<SVGSVGElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  const ref = useScrollProgress<HTMLElement>((_, p) => {
    // zoom exponencial: devagar no começo, "mergulha" no fim
    // em retrato o viewBox encolhe pela largura: compensa pra o "24H" encher a tela
    const base = window.innerWidth < window.innerHeight ? 1.65 : 1;
    const zoom = base * Math.pow(1 + range(p, 0, 0.62) * 5, 2.6);
    maskText.current?.setAttribute(
      "transform",
      `translate(800 450) scale(${zoom.toFixed(3)}) translate(-800 -450)`
    );
    if (overlay.current) overlay.current.style.opacity = String(1 - range(p, 0.34, 0.6));
    if (intro.current) {
      intro.current.style.opacity = String(1 - range(p, 0, 0.18));
      intro.current.style.transform = `translateY(${-range(p, 0, 0.18) * 40}px)`;
    }
    if (copy.current) {
      const c = range(p, 0.58, 0.82);
      copy.current.style.opacity = String(c);
      copy.current.style.transform = `translateY(${(1 - c) * 60}px)`;
      copy.current.style.pointerEvents = c > 0.5 ? "auto" : "none";
    }
  });

  return (
    <section ref={ref} id="top" className="lx-hero relative h-[280vh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <SunsetScene />

        {/* Máscara: retângulo escuro com "24H" vazado */}
        <svg
          ref={overlay}
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <mask id="lx-hero-mask" maskUnits="userSpaceOnUse" x="-8000" y="-8000" width="17600" height="16900">
              <rect x="-8000" y="-8000" width="17600" height="16900" fill="white" />
              <g ref={maskText}>
                <text
                  x="800"
                  y="450"
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="font-display"
                  fontSize="560"
                  letterSpacing="-10"
                  fill="black"
                >
                  24H
                </text>
              </g>
            </mask>
          </defs>
          <rect
            x="-8000"
            y="-8000"
            width="17600"
            height="16900"
            fill="var(--lx-night)"
            mask="url(#lx-hero-mask)"
          />
        </svg>

        {/* Texto inicial sobre o escuro */}
        <div ref={intro} className="absolute inset-0 flex flex-col justify-between px-5 pb-8 pt-24 sm:px-10">
          <div className="flex items-start justify-between gap-6">
            <p className="max-w-[22ch] font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.22em] text-white/60">
              Real-time endurance race control
            </p>
            <p className="hidden text-right font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.22em] text-white/60 sm:block">
              Session 001
              <br />
              Le Mans Ultimate
            </p>
          </div>
          <div className="flex items-end justify-between">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-white/50">
              Role para largar
            </span>
            <span aria-hidden className="lx-scroll-cue block h-12 w-px bg-white/40" />
          </div>
        </div>

        {/* Manchete após a revelação */}
        <div
          ref={copy}
          className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center opacity-0"
        >
          <span className="mb-5 font-mono text-[0.7rem] uppercase tracking-[0.34em] text-white/80">
            Race Operations Center
          </span>
          <h1 className="font-display text-[clamp(2.7rem,12vw,11.5rem)] uppercase leading-[0.82] text-white drop-shadow-[0_6px_40px_rgba(40,0,40,0.55)]">
            A noite é longa.
            <br />
            <span className="lx-sunset-text">A estratégia, sua.</span>
          </h1>
          <p className="mt-6 max-w-xl text-sm text-white/85 sm:text-lg">
            Combustível, pneus, danos, escala de pilotos e pit stops — sincronizados ao vivo para toda a
            equipe, sem login e sem F5.
          </p>
          <a
            href="#entrar"
            className="lx-pill mt-8 inline-flex items-center gap-3 px-6 py-3 font-mono text-[0.75rem] uppercase tracking-[0.2em]"
          >
            Abrir o pit wall <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
