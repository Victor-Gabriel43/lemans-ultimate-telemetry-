"use client";

import { ExperienceArt } from "./ExperienceArt";
import { Line, Reveal, useScrollProgress } from "./motion";

/**
 * Full-bleed cinematic interlude. The frame opens from an inset card to
 * full-bleed as it scrolls in; outline type slides across at its own speed;
 * the image layer moves slower than the page (parallax).
 */
export function Cinematic() {
  const ref = useScrollProgress<HTMLElement>();
  return (
    <section ref={ref} className="relative h-[180vh] bg-bg" style={{ ["--p" as string]: 0 }}>
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        <div
          className="relative h-full w-full overflow-hidden"
          style={{
            clipPath:
              "inset(calc(max(0, 0.45 - var(--p)) * 30%) calc(max(0, 0.45 - var(--p)) * 40%) round calc(max(0, 0.45 - var(--p)) * 90px))",
          }}
        >
          <div
            className="absolute inset-[-10%]"
            style={{ transform: "translate3d(0, calc((var(--p) - 0.5) * -12%), 0) scale(1.05)" }}
          >
            <ExperienceArt tone="ember" className="h-full w-full" />
          </div>

          <div
            aria-hidden
            className="mi-display mi-outline absolute top-[16%] whitespace-nowrap text-[clamp(6rem,22vw,22rem)]"
            style={{ transform: "translate3d(calc((0.5 - var(--p)) * 60vw), 0, 0)" }}
          >
            Through the night
          </div>

          <div className="absolute inset-x-0 bottom-0 mx-auto flex max-w-[1400px] flex-col gap-6 px-4 pb-[12vh] sm:px-8 md:flex-row md:items-end md:justify-between">
            <Reveal fade={false} as="h2" className="text-white">
              <Line className="mi-serif text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.95]">Twenty-four hours.</Line>
              <Line delay={0.1} className="mi-display text-[clamp(2.4rem,6vw,5.5rem)]">One story.</Line>
            </Reveal>
            <Reveal delay={0.2} className="max-w-sm text-[0.95rem] leading-relaxed text-white/70">
              Cinematic Editorial brings long-form storytelling to the paddock — photography first,
              told with the patience of an endurance race.
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

const WORDS = ["Endurance", "Hypercar", "Night stints", "Pit strategy", "GT3", "Rain", "Dawn", "Le Mans"];

/** Infinite type band between chapters. Pauses on hover. */
export function Marquee() {
  const row = (
    <div className="flex shrink-0 items-center">
      {WORDS.map((w, i) => (
        <span key={i} className="flex items-center">
          <span className={`px-6 text-[clamp(2.2rem,6vw,5rem)] leading-none ${i % 2 ? "mi-serif" : "mi-display"}`}>{w}</span>
          <svg viewBox="0 0 10 10" className="h-3 w-3 shrink-0 text-ink" aria-hidden>
            <path d="M5 0 L6.2 3.8 L10 5 L6.2 6.2 L5 10 L3.8 6.2 L0 5 L3.8 3.8 Z" fill="currentColor" />
          </svg>
        </span>
      ))}
    </div>
  );
  return (
    <div className="mi-marquee-wrap overflow-hidden border-y border-ink/10 bg-brand py-6 text-ink" aria-hidden>
      <div className="mi-marquee" style={{ ["--speed" as string]: "42s" }}>
        {row}
        {row}
      </div>
    </div>
  );
}
