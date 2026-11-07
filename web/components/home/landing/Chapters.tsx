"use client";

import { useRef, useState } from "react";
import { ParticleCircuit, type CircuitState } from "./ParticleCircuit";
import { useScrollProgress } from "./useScrollProgress";

type Chapter = {
  key: string;
  kicker: string;
  title: string;
  body: string;
  stat: string;
  statLabel: string;
  accent: string; // "r,g,b"
};

const CHAPTERS: Chapter[] = [
  {
    key: "fuel",
    kicker: "Combustível",
    title: "Cada litro, contado.",
    body: "Consumo por volta, voltas restantes no tanque e quanto abastecer no próximo stop — recalculado a cada edição de qualquer membro.",
    stat: "3.42",
    statLabel: "L / volta",
    accent: "255,176,64",
  },
  {
    key: "tyres",
    kicker: "Pneus",
    title: "Borracha sob controle.",
    body: "Composto, idade em voltas e desgaste por roda. Saiba quando o próximo jogo de slicks vai virar o problema da corrida.",
    stat: "27",
    statLabel: "voltas no jogo",
    accent: "255,79,139",
  },
  {
    key: "drivers",
    kicker: "Escala de pilotos",
    title: "Quem está no carro. Quem é o próximo.",
    body: "Planilha de stints com horários reais, totais por piloto e o relógio da corrida rodando no topo de todo mundo.",
    stat: "04",
    statLabel: "pilotos na escala",
    accent: "46,155,255",
  },
  {
    key: "pit",
    kicker: "Pit planner",
    title: "A janela abre. Você já sabe.",
    body: "Histórico de paradas, tempo perdido no pit lane, danos e alertas que aparecem para a equipe inteira no mesmo segundo.",
    stat: "00:38",
    statLabel: "stop médio",
    accent: "255,61,61",
  },
];

/**
 * Capítulos pinados (storytelling por rolagem): à esquerda o circuito de
 * partículas gira com a rolagem; à direita o texto troca de capítulo.
 * O anel em volta do contador fecha "o círculo completo" no último.
 */
export function Chapters() {
  const [idx, setIdx] = useState(0);
  const idxRef = useRef(0);
  const circuit = useRef<CircuitState>({ progress: 0, accent: CHAPTERS[0].accent });
  const ring = useRef<SVGCircleElement>(null);

  const ref = useScrollProgress<HTMLElement>((p, s) => {
    circuit.current.progress = s;
    const next = Math.min(CHAPTERS.length - 1, Math.floor(p * CHAPTERS.length));
    if (next !== idxRef.current) {
      idxRef.current = next;
      circuit.current.accent = CHAPTERS[next].accent;
      setIdx(next);
    }
    ring.current?.setAttribute("stroke-dashoffset", String(100 - s * 100));
  });

  const ch = CHAPTERS[idx];

  return (
    <section
      ref={ref}
      id="sistema"
      className="lx-chapters relative"
      style={{ height: `${CHAPTERS.length * 100 + 60}vh`, ["--lx-accent" as string]: `rgb(${ch.accent})` }}
    >
      <div className="sticky top-0 grid h-svh grid-rows-[1fr_auto] overflow-hidden lg:grid-cols-[1.15fr_1fr] lg:grid-rows-1">
        <div className="relative min-h-0">
          <ParticleCircuit state={circuit} className="absolute inset-0 h-full w-full" />
          <div className="pointer-events-none absolute left-5 top-24 sm:left-10">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-white/45">
              Strategy trace — live
            </span>
          </div>
        </div>

        <div className="relative flex flex-col justify-center gap-6 px-5 pb-10 sm:px-10 lg:pb-0 lg:pr-16">
          <div className="flex items-center gap-4">
            <svg viewBox="0 0 40 40" className="h-14 w-14 -rotate-90" aria-hidden>
              <circle cx="20" cy="20" r="17" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
              <circle
                ref={ring}
                cx="20"
                cy="20"
                r="17"
                fill="none"
                stroke="var(--lx-accent)"
                strokeWidth="1.5"
                pathLength={100}
                strokeDasharray="100"
                strokeDashoffset="100"
                className="transition-[stroke] duration-500"
              />
            </svg>
            <span className="font-mono text-sm tabular-nums text-white/70">
              <span className="text-white">{String(idx + 1).padStart(2, "0")}</span> / {String(CHAPTERS.length).padStart(2, "0")}
            </span>
          </div>

          <div key={ch.key} className="lx-chapter-in flex flex-col gap-5">
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.3em] text-[var(--lx-accent)]">
              {ch.kicker}
            </span>
            <h2 className="font-display text-[clamp(2.6rem,6vw,5.4rem)] uppercase leading-[0.88] text-white">
              {ch.title}
            </h2>
            <p className="max-w-md text-base leading-relaxed text-white/65 sm:text-lg">{ch.body}</p>
            <div className="mt-2 flex items-baseline gap-3 border-t border-white/10 pt-5">
              <span className="font-display text-5xl tabular-nums text-[var(--lx-accent)]">{ch.stat}</span>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-white/50">{ch.statLabel}</span>
            </div>
          </div>

          <ol className="mt-4 hidden gap-2 lg:flex" aria-label="Capítulos">
            {CHAPTERS.map((c, i) => (
              <li
                key={c.key}
                className={`h-[3px] flex-1 transition-colors duration-500 ${i <= idx ? "bg-[var(--lx-accent)]" : "bg-white/10"}`}
              >
                <span className="sr-only">{c.kicker}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
