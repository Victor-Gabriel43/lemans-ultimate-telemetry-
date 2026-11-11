import Link from "next/link";
import { ChevronRight, Info, Plus } from "lucide-react";
import type { ReactNode } from "react";
import type { Tone } from "@/lib/f1/types";
import { lp, type Lang } from "@/lib/i18n/config";
import { fmt, getDict } from "@/lib/i18n/dict";
import { TONES } from "./tones";

export { TONES };

export type PhotoProp = { src: string; credit: string; license: string; sourceUrl: string };

/* ---------------------------------------------------------------------------
 * Plate — an editorial image slot.
 * Shows a licensed photograph (with visible credit) when one is verified for
 * the subject; otherwise a typographic plate. Never a substitute photo.
 * ------------------------------------------------------------------------- */
export function Plate({
  photo,
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
  lang,
  position = "center",
  linked = false,
}: {
  photo?: PhotoProp;
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
  lang: Lang;
  position?: string;
  /** True when the plate sits inside a link (cards): the credit stays visible but is not a nested link. */
  linked?: boolean;
}) {
  const t = getDict(lang);
  return (
    <figure className={className}>
      <div className={`plate ${ratio} ${flat ? "plate-flat" : ""}`} style={photo ? undefined : { background: TONES[tone] }}>
        {photo ? (
          <>
            {/* Remote Commons thumbnails: plain <img> keeps the original licence-bearing URL. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={alt}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: position }}
            />
            {tag && (
              <span className="plate-tag" style={{ position: "absolute", top: 16, left: 16, color: "#fff" }}>
                {tag}
              </span>
            )}
            {linked ? (
              <span className="plate-credit">{fmt(t.common.photoCredit, { credit: photo.credit, license: photo.license })}</span>
            ) : (
              <a className="plate-credit" href={photo.sourceUrl} target="_blank" rel="noreferrer">
                {fmt(t.common.photoCredit, { credit: photo.credit, license: photo.license })}
              </a>
            )}
          </>
        ) : (
          <div className="plate-art" role="img" aria-label={`${alt} — ${t.common.illustration}`}>
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

export function Breadcrumbs({ items, lang, className = "" }: { items: Crumb[]; lang: Lang; className?: string }) {
  const all: Crumb[] = [{ label: "Paddock", href: "/" }, ...items];
  return (
    <nav aria-label={getDict(lang).nav.breadcrumb} className={className}>
      <ol className="crumbs">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={i} className="flex-row" style={{ gap: 6 }}>
              {c.href && !last ? <Link href={lp(lang, c.href)}>{c.label}</Link> : <span aria-current={last ? "page" : undefined}>{c.label}</span>}
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
export function LinkArrow({ href, children, className = "", lang }: { href: string; children: ReactNode; className?: string; lang: Lang }) {
  const external = /^https?:/.test(href);
  const Comp = external ? "a" : Link;
  return (
    <Comp href={external ? href : lp(lang, href)} className={`link-arrow ${className}`} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      {children}
      <ChevronRight size={16} strokeWidth={2} aria-hidden />
    </Comp>
  );
}

export function SectionHead({ eyebrow, title, lede, action, center = false }: { eyebrow?: string; title: ReactNode; lede?: ReactNode; action?: ReactNode; center?: boolean }) {
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

/** Smaller section header for data blocks within a page. */
export function BlockHead({ eyebrow, title, action }: { eyebrow?: string; title: ReactNode; action?: ReactNode }) {
  return (
    <div className="section-head" style={{ marginBottom: 24 }}>
      <div>
        {eyebrow && <p className="eyebrow-f1">{eyebrow}</p>}
        <h2 className="title-1 balance">{title}</h2>
      </div>
      {action}
    </div>
  );
}

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

export function DataNotice({ children, title }: { children: ReactNode; title: string }) {
  return (
    <aside className="notice" aria-label={title}>
      <Info size={18} aria-hidden />
      <div>
        <strong>{title}.</strong> {children}
      </div>
    </aside>
  );
}

export function Pending({ title, children, badge }: { title: string; children: ReactNode; badge?: string }) {
  return (
    <div className="pending">
      {badge && <span className="badge">{badge}</span>}
      <p className="pending-title">{title}</p>
      <div>{children}</div>
    </div>
  );
}

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

export function Milestones({ items, linkYears = false, lang }: { items: { year: string; title: string; text: string }[]; linkYears?: boolean; lang: Lang }) {
  return (
    <ol className="milestones">
      {items.map((m, i) => (
        <li key={i} className="milestone">
          <p className="milestone-year">
            {linkYears && /^\d{4}$/.test(m.year) && +m.year >= 1950 && +m.year <= 2026 ? <Link href={lp(lang, `/seasons/${m.year}`)}>{m.year}</Link> : m.year}
          </p>
          <p className="milestone-title">{m.title}</p>
          <p className="milestone-text">{m.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function PageIntro({
  crumbs,
  eyebrow,
  title,
  lede,
  tone = "tone-paper",
  children,
  lang,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: string;
  children?: ReactNode;
  lang: Lang;
}) {
  return (
    <section className={tone} style={{ paddingTop: 28, paddingBottom: "clamp(40px,6vw,72px)" }}>
      <div className="wrap">
        <Breadcrumbs items={crumbs} lang={lang} />
        <div style={{ marginTop: "clamp(36px,6vw,72px)", maxWidth: 860 }}>
          {eyebrow && <p className="eyebrow-f1 rise">{eyebrow}</p>}
          <h1 className="display balance rise rise-2">{title}</h1>
          {lede && (
            <p className="lede mt-m pretty rise rise-3" style={{ maxWidth: 720 }}>
              {lede}
            </p>
          )}
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

/** Visible data status badge. */
export function StatusBadge({ status, lang, title }: { status: string; lang: Lang; title?: string }) {
  const t = getDict(lang).status;
  const map: Record<string, [string, string]> = {
    "cross-checked": [t.crossChecked, "status-ok"],
    verified: [t.verified, "status-ok"],
    official: [t.official, "status-ok"],
    provisional: [t.provisional, "status-warn"],
    "in-progress": [t.inProgress, "status-warn"],
    incomplete: [t.incomplete, "status-warn"],
    disputed: [t.disputed, "status-bad"],
    "single-source": [t.singleSource, "status-neutral"],
    editorial: [t.editorial, "status-neutral"],
    scheduled: [t.scheduled, "status-neutral"],
    completed: [t.completed, "status-ok"],
  };
  const [label, cls] = map[status] ?? [status, "status-neutral"];
  return (
    <span className={`badge badge-dot ${cls}`} title={title}>
      {label}
    </span>
  );
}
