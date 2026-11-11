import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Line, Reveal } from "@/components/mi/motion";
import type { WikiSummary } from "@/lib/f1/wiki";

/** Chapter header for platform pages: index, expanded display + serif. */
export function PageHeader({
  n,
  kicker,
  title,
  serif,
  intro,
  children,
}: {
  n: string;
  kicker: string;
  title: string;
  serif: string;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="mx-auto max-w-[1400px] px-4 pb-14 pt-32 sm:px-8 sm:pt-40">
      <Reveal className="mb-8 flex items-center justify-between border-b border-border pb-4">
        <span className="mi-label flex items-center gap-3 text-text-muted">
          <span className="text-brand">{n}</span> {kicker}
        </span>
        {children}
      </Reveal>
      <Reveal fade={false} as="h1">
        <Line className="mi-display text-[clamp(2.8rem,9vw,8.5rem)]">{title}</Line>
        <Line delay={0.1} className="mi-serif text-[clamp(2.8rem,8.5vw,8rem)] leading-[0.95] text-text-muted">
          {serif}
        </Line>
      </Reveal>
      {intro && (
        <Reveal delay={0.2} className="mt-8 max-w-xl text-[1.05rem] leading-relaxed text-text-muted">
          {intro}
        </Reveal>
      )}
    </header>
  );
}

export function SectionTitle({ label, title, aside }: { label: string; title: ReactNode; aside?: ReactNode }) {
  return (
    <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-current/10 pb-4">
      <div className="flex flex-col gap-3">
        <span className="mi-label opacity-60">{label}</span>
        <h2 className="text-[clamp(1.6rem,3.2vw,2.6rem)] font-semibold leading-none tracking-[-0.03em]">{title}</h2>
      </div>
      {aside}
    </Reveal>
  );
}

export function Stat({ label, value, sub, accent = false }: { label: string; value: ReactNode; sub?: ReactNode; accent?: boolean }) {
  return (
    <div className="flex flex-col gap-2 border-t border-current/10 pt-4">
      <span className="mi-label opacity-60">{label}</span>
      <span className={`mi-display tabular text-[clamp(2rem,4vw,3.4rem)] ${accent ? "text-brand" : ""}`}>{value ?? "—"}</span>
      {sub && <span className="text-sm opacity-60">{sub}</span>}
    </div>
  );
}

/** SVG outline of a real circuit from its baked metre-space geometry. */
export function CircuitOutline({
  outline,
  className = "",
  stroke = "currentColor",
  width = 2,
  start = true,
}: {
  outline: [number, number][];
  className?: string;
  stroke?: string;
  width?: number;
  start?: boolean;
}) {
  if (!outline.length) return null;
  const xs = outline.map((p) => p[0]);
  const zs = outline.map((p) => p[1]);
  const minX = Math.min(...xs), maxX = Math.max(...xs), minZ = Math.min(...zs), maxZ = Math.max(...zs);
  const pad = Math.max(maxX - minX, maxZ - minZ) * 0.06;
  const vb = `${minX - pad} ${minZ - pad} ${maxX - minX + pad * 2} ${maxZ - minZ + pad * 2}`;
  const d = "M" + outline.map((p) => p.join(" ")).join(" L") + " Z";
  const sw = (Math.max(maxX - minX, maxZ - minZ) / 300) * width;
  return (
    <svg viewBox={vb} className={className} aria-hidden fill="none">
      <path d={d} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" strokeLinecap="round" vectorEffect="none" />
      {start && <circle cx={outline[0][0]} cy={outline[0][1]} r={sw * 2.2} className="fill-brand" />}
    </svg>
  );
}

/** Wikipedia-sourced photograph with attribution link. */
export function WikiFigure({ wiki, className = "", priority = false, sizes = "(min-width: 1024px) 50vw, 100vw" }: { wiki: WikiSummary | null; className?: string; priority?: boolean; sizes?: string }) {
  if (!wiki?.image) return null;
  return (
    <figure className={`mi-grain relative isolate overflow-hidden bg-surface ${className}`}>
      <Image unoptimized src={wiki.image.src} alt={wiki.title} fill sizes={sizes} priority={priority} className="object-cover" />
      <figcaption className="absolute bottom-3 right-3 z-10 rounded-full bg-black/55 px-2.5 py-1 text-[0.6rem] text-white/80 backdrop-blur">
        <a href={wiki.url} target="_blank" rel="noreferrer" className="hover:text-white">
          Image via Wikipedia
        </a>
      </figcaption>
    </figure>
  );
}

export function SourceNote({ children }: { children: ReactNode }) {
  return <p className="mi-label mt-6 leading-relaxed opacity-50">{children}</p>;
}

export function Pill({ href, children, active = false }: { href: string; children: ReactNode; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`rounded-full border px-3.5 py-1.5 text-[0.8rem] transition-colors ${
        active ? "border-brand bg-brand text-brand-fg" : "border-border-strong text-text-muted hover:border-text hover:text-text"
      }`}
    >
      {children}
    </Link>
  );
}

export function Unavailable({ what }: { what: string }) {
  return (
    <div className="rounded-2xl border border-border p-8 text-text-muted">
      {what} is temporarily unavailable — the live data source could not be reached. Please try again shortly.
    </div>
  );
}
