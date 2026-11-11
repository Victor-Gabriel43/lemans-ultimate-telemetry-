import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Info, Plus } from "lucide-react";
import type { ReactNode } from "react";
import { getMedia } from "@/lib/f1/media";
import type { Tone } from "@/lib/f1/types";
import { TONES } from "./tones";

/* ---------------------------------------------------------------------------
 * Plate — an editorial image slot.
 *
 * Renders a registered, licensed photograph when one exists for `mediaId`;
 * otherwise a designed typographic plate in the given tone. We never show an
 * unverified photo in place of the real subject.
 * ------------------------------------------------------------------------- */
export { TONES };

export function Plate({
  mediaId,
  alt,
  tone = "graphite",
  glyph,
  tag,
  caption,
  ratio = "ratio-wide",
  className = "",
  flat = false,
  glyphSize,
  priority = false,
}: {
  mediaId?: string;
  alt: string;
  tone?: Tone;
  glyph?: ReactNode;
  tag?: string;
  caption?: ReactNode;
  ratio?: string;
  className?: string;
  flat?: boolean;
  glyphSize?: "sm";
  priority?: boolean;
}) {
  const media = getMedia(mediaId);
  return (
    <figure className={className}>
      <div className={`plate ${ratio} ${flat ? "plate-flat" : ""}`} style={media ? undefined : { background: TONES[tone] }}>
        {media ? (
          <>
            <Image src={media.src} alt={alt} fill sizes="(max-width: 768px) 100vw, 1200px" priority={priority} style={{ objectFit: "cover" }} />
            <a className="plate-credit" href={media.sourceUrl} target="_blank" rel="noreferrer">
              {media.credit} · {media.license}
            </a>
          </>
        ) : (
          <div className="plate-art" role="img" aria-label={`${alt} — illustration; licensed photograph to be added`}>
            {tag ? <span className="plate-tag">{tag}</span> : <span />}
            {glyph != null && <span className={`plate-glyph ${glyphSize === "sm" ? "plate-glyph-sm" : ""}`}>{glyph}</span>}
          </div>
        )}
      </div>
      {caption && <figcaption className="caption mt-xs">{caption}</figcaption>}
    </figure>
  );
}

/* ---------------------------------------------------------------------------
 * Breadcrumbs
 * ------------------------------------------------------------------------- */
export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items, className = "" }: { items: Crumb[]; className?: string }) {
  const all: Crumb[] = [{ label: "Paddock", href: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="crumbs">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={i} className="flex-row" style={{ gap: 6 }}>
              {c.href && !last ? <Link href={c.href}>{c.label}</Link> : <span aria-current={last ? "page" : undefined}>{c.label}</span>}
              {!last && <ChevronRight size={12} aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ---------------------------------------------------------------------------
 * Text helpers
 * ------------------------------------------------------------------------- */
export function LinkArrow({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`link-arrow ${className}`}>
      {children}
      <ChevronRight size={16} strokeWidth={2} aria-hidden />
    </Link>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  action,
  center = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  action?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={center ? "center" : "section-head"} style={center ? { marginBottom: "clamp(28px,4vw,56px)" } : undefined}>
      <div className={center ? "mx-auto" : ""} style={{ maxWidth: 760 }}>
        {eyebrow && <p className="eyebrow-f1">{eyebrow}</p>}
        <h2 className="headline balance">{title}</h2>
        {lede && <p className="lede mt-s pretty">{lede}</p>}
      </div>
      {action && <div style={center ? { marginTop: 20 } : { flexShrink: 0 }}>{action}</div>}
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * Disclosure — native <details>, works without JavaScript.
 * ------------------------------------------------------------------------- */
export function Disclosure({ title, children, open = false, id }: { title: ReactNode; children: ReactNode; open?: boolean; id?: string }) {
  return (
    <details className="disclosure" open={open} id={id}>
      <summary>
        <span>{title}</span>
        <span className="plus" aria-hidden>
          <Plus size={16} strokeWidth={2} />
        </span>
      </summary>
      <div className="disclosure-body">{children}</div>
    </details>
  );
}

/* ---------------------------------------------------------------------------
 * Data notices — make the provenance of information explicit.
 * ------------------------------------------------------------------------- */
export function DataNotice({ children, title = "About this data" }: { children: ReactNode; title?: string }) {
  return (
    <aside className="notice" aria-label={title}>
      <Info size={18} aria-hidden />
      <div>
        <strong>{title}.</strong> {children}
      </div>
    </aside>
  );
}

export function Pending({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="pending">
      <span className="badge">Arrives in Phase 2</span>
      <p className="pending-title">{title}</p>
      <p>{children}</p>
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * Spec sheet
 * ------------------------------------------------------------------------- */
export function Specs({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <dl className="specs">
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------------------------------------------------------------------------
 * Milestones (vertical timeline)
 * ------------------------------------------------------------------------- */
export function Milestones({ items }: { items: { year: string; title: string; text: string }[] }) {
  return (
    <ol className="milestones">
      {items.map((m, i) => (
        <li key={i} className="milestone">
          <p className="milestone-year">{m.year}</p>
          <p className="milestone-title">{m.title}</p>
          <p className="milestone-text">{m.text}</p>
        </li>
      ))}
    </ol>
  );
}

/* ---------------------------------------------------------------------------
 * Page hero for section index pages
 * ------------------------------------------------------------------------- */
export function PageIntro({
  crumbs,
  eyebrow,
  title,
  lede,
  tone = "tone-paper",
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: string;
  children?: ReactNode;
}) {
  return (
    <section className={`${tone}`} style={{ paddingTop: 28, paddingBottom: "clamp(40px,6vw,72px)" }}>
      <div className="wrap">
        <Breadcrumbs items={crumbs} />
        <div style={{ marginTop: "clamp(36px,6vw,72px)", maxWidth: 860 }}>
          {eyebrow && <p className="eyebrow-f1 rise">{eyebrow}</p>}
          <h1 className="display balance rise rise-2">{title}</h1>
          {lede && <p className="lede mt-m pretty rise rise-3" style={{ maxWidth: 720 }}>{lede}</p>}
        </div>
        {children && <div className="mt-l">{children}</div>}
      </div>
    </section>
  );
}

export function Stat({ value, label }: { value: ReactNode; label: ReactNode }) {
  return (
    <div>
      <p className="stat-value">{value}</p>
      <p className="stat-label">{label}</p>
    </div>
  );
}
