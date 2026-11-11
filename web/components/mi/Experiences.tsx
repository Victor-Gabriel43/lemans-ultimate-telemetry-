"use client";

import { useEffect, useRef, useState } from "react";
import { EXPERIENCES } from "./experiences";
import { ExperienceArt } from "./ExperienceArt";
import { Line, Reveal } from "./motion";

/**
 * Scroll-driven chapter: a sticky art frame on the left crossfades between the
 * four experiences while their chapters scroll past on the right.
 */
export function Experiences() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative bg-bg text-text">
      {/* Section introduction */}
      <div className="mx-auto max-w-[1400px] px-4 pb-16 pt-28 sm:px-8 sm:pt-40">
        <Reveal className="mb-10 flex items-center justify-between border-b border-border pb-4">
          <span className="mi-label text-text-muted">(Four ways in)</span>
          <span className="mi-label text-text-dim">01 — 04</span>
        </Reveal>
        <Reveal fade={false} as="h2">
          <Line className="mi-display text-[clamp(3rem,10vw,9.5rem)]">Four ways</Line>
          <Line delay={0.12} className="mi-serif text-[clamp(3rem,9.5vw,9rem)] leading-[0.95] text-text-muted">
            to read a race.
          </Line>
        </Reveal>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 pb-32 sm:px-8 lg:grid-cols-12">
        {/* Sticky frame (desktop) */}
        <div className="hidden lg:col-span-6 lg:block">
          <div className="sticky top-[12vh] aspect-[4/5] max-h-[76vh] w-full overflow-hidden rounded-[28px]">
            {EXPERIENCES.map((x, i) => (
              <div
                key={x.id}
                className="absolute inset-0 transition-[opacity,transform,clip-path] duration-[1100ms] ease-[var(--ease-out)]"
                style={{
                  opacity: i === active ? 1 : 0,
                  transform: i === active ? "scale(1)" : "scale(1.06)",
                  clipPath: i <= active ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
                }}
              >
                <ExperienceArt tone={x.tone} className="h-full w-full" />
              </div>
            ))}
            <div className="absolute right-5 top-5 flex gap-1.5">
              {EXPERIENCES.map((x, i) => (
                <span
                  key={x.id}
                  className={`h-1 rounded-full transition-all duration-500 ${i === active ? "w-6 bg-brand" : "w-1.5 bg-white/40"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Chapters */}
        <div className="lg:col-span-5 lg:col-start-8">
          {EXPERIENCES.map((x, i) => (
            <article
              key={x.id}
              id={x.id}
              data-i={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="flex scroll-mt-24 flex-col justify-center gap-6 border-t border-border py-14 lg:min-h-[78vh] lg:border-t-0"
            >
              <ExperienceArt tone={x.tone} className="aspect-[4/3] w-full rounded-[20px] lg:hidden" />
              <Reveal className="flex items-center gap-3">
                <span className="font-mono text-xs text-brand">{x.n}</span>
                <span className="h-px w-10 bg-border-strong" />
                <span className="mi-label text-text-dim">Experience</span>
              </Reveal>
              <Reveal fade={false} as="h3">
                <Line className="mi-display text-[clamp(2.6rem,5.5vw,5rem)]">{x.title}</Line>
                <Line delay={0.08} className="mi-serif text-[clamp(2.6rem,5.2vw,4.8rem)] leading-[1]">
                  {x.serif}
                </Line>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="max-w-md text-[1.05rem] leading-relaxed text-text-muted">{x.body}</p>
              </Reveal>
              <Reveal delay={0.22} className="flex flex-wrap items-center gap-2">
                {x.tags.map((t) => (
                  <span key={t} className="rounded-full border border-border px-3 py-1.5 text-[0.75rem] text-text-muted">
                    {t}
                  </span>
                ))}
                <span className="mi-label ml-2 text-text-dim">Coming soon</span>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
