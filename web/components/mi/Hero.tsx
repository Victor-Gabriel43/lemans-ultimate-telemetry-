"use client";

import { CircuitScene } from "./CircuitScene";
import { EXPERIENCES } from "./experiences";
import { Line, Reveal, useScrollProgress } from "./motion";

export function Hero() {
  const ref = useScrollProgress<HTMLElement>();
  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-bg text-text"
      style={{ ["--p" as string]: 0 }}
    >
      {/* 3D circuit — drifts down & dims as you scroll away */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          transform: "translate3d(0, calc(var(--p) * 18vh), 0) scale(calc(1 + var(--p) * 0.12))",
          opacity: "calc(1 - var(--p) * 1.1)",
        }}
      >
        <CircuitScene className="absolute inset-x-0 top-[8%] h-[84%] w-full" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_50%,transparent_40%,var(--bg)_100%)]" />
      </div>

      <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-between px-4 pb-6 pt-28 sm:px-8 sm:pt-32">
        <Reveal className="flex items-start justify-between gap-8" delay={0.9}>
          <p className="max-w-[22rem] text-[0.95rem] leading-relaxed text-text-muted">
            A new way to read endurance racing — strategy, circuits, stories and drivers,
            <span className="text-text"> designed with the precision of the sport itself.</span>
          </p>
          <span className="mi-label hidden text-text-dim sm:block">Est. 2026 — Season One</span>
        </Reveal>

        <div
          className="pointer-events-none"
          style={{ transform: "translate3d(0, calc(var(--p) * -14vh), 0)" }}
        >
          <Reveal fade={false} as="h1" className="select-none">
            <Line delay={0.15} className="mi-display text-[clamp(4.2rem,17.5vw,17rem)]">
              Speed,
            </Line>
            <Line delay={0.3} className="mi-serif -mt-[0.08em] pl-[8vw] text-[clamp(4.4rem,16vw,15.5rem)] leading-[0.95]">
              understood<span className="text-brand">.</span>
            </Line>
          </Reveal>
        </div>

        <Reveal delay={1.1} className="mt-6 flex items-end justify-between gap-6 border-t border-border pt-4">
          <a href="#manifesto" className="group flex items-center gap-3">
            <span className="relative flex h-10 w-6 justify-center rounded-full border border-border-strong">
              <span className="mt-2 h-2 w-px animate-bounce bg-brand" />
            </span>
            <span className="mi-label text-text-muted transition-colors group-hover:text-text">Scroll to explore</span>
          </a>
          <ul className="hidden gap-8 md:flex">
            {EXPERIENCES.map((x) => (
              <li key={x.id}>
                <a href={`#${x.id}`} className="mi-label flex gap-2 text-text-dim transition-colors hover:text-text">
                  <span className="text-brand">{x.n}</span>
                  {x.title} {x.serif}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
