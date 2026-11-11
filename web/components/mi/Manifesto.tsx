"use client";

import { Reveal, useScrollProgress } from "./motion";

const TEXT =
  "Racing is the most beautiful data problem on earth. Every lap hides a thousand decisions. We make them visible, human — and unforgettable.";

const PRINCIPLES = [
  { k: "Clarity at speed", v: "If it can't be read in two seconds, it isn't finished." },
  { k: "Story over numbers", v: "Data is the evidence. The race is the story." },
  { k: "Made for the pit wall", v: "Built with the people who make the calls." },
];

/** Light section. Words ink in one by one as the section scrolls through. */
export function Manifesto() {
  const ref = useScrollProgress<HTMLElement>();
  const words = TEXT.split(" ");
  return (
    <section
      id="manifesto"
      ref={ref}
      className="relative bg-paper text-ink"
      style={{ ["--p" as string]: 0 }}
    >
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-28 sm:px-8 sm:py-40 lg:grid-cols-12">
        <Reveal className="lg:col-span-3">
          <span className="mi-label flex items-center gap-2 text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-ink" /> Manifesto
          </span>
        </Reveal>
        <p className="text-[clamp(1.9rem,4.4vw,4.1rem)] font-medium leading-[1.08] tracking-[-0.035em] lg:col-span-9">
          {words.map((w, i) => {
            const serif = w.startsWith("human") || w.startsWith("unforgettable");
            return (
              <span
                key={i}
                className={serif ? "mi-serif" : undefined}
                style={{
                  opacity: `clamp(0.14, calc((var(--p) * 2.3 - 0.35) * ${words.length} - ${i}), 1)`,
                  transition: "opacity 0.2s linear",
                }}
              >
                {w}{" "}
              </span>
            );
          })}
        </p>

        <div className="grid gap-8 border-t border-paper-line pt-8 sm:grid-cols-3 lg:col-span-9 lg:col-start-4">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.k} delay={i * 0.1} className="flex flex-col gap-3">
              <span className="font-mono text-xs text-ink-muted">0{i + 1}</span>
              <span className="text-lg font-semibold tracking-[-0.01em]">{p.k}</span>
              <span className="text-[0.95rem] leading-relaxed text-ink-muted">{p.v}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
