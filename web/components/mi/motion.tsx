"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

/** Adds `.is-in` to the element once it enters the viewport (one-shot). */
export function useReveal<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}

/** Wrapper that reveals itself and any `.mi-line` / `.mi-rule` children. */
export function Reveal({
  as: Tag = "div",
  children,
  className = "",
  delay = 0,
  fade = true,
  style,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  /** false → only drives children (line masks), no fade on the wrapper. */
  fade?: boolean;
  style?: CSSProperties;
}) {
  const ref = useReveal<HTMLElement>();
  return (
    <Tag
      ref={ref}
      {...(fade ? { "data-reveal": "" } : {})}
      className={className}
      style={{ ["--d" as string]: `${delay}s`, ...style }}
    >
      {children}
    </Tag>
  );
}

/** Masked headline line. Wrap inside a <Reveal fade={false}>. */
export function Line({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <span className={`mi-line ${className}`} style={{ ["--d" as string]: `${delay}s` }}>
      <span>{children}</span>
    </span>
  );
}

/**
 * Writes the element's scroll progress through the viewport into the CSS
 * variable `--p` (0 when its top hits the viewport bottom, 1 when its bottom
 * leaves the top). One rAF loop per element, only while visible.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "0.5");
      return;
    }
    let raf = 0;
    let visible = false;
    const tick = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      el.style.setProperty("--p", p.toFixed(4));
      if (visible) raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    tick();
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);
  return ref;
}
