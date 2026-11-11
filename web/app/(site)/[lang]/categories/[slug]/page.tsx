import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { CATEGORIES, getCategory } from "@/lib/f1/categories";
import { Breadcrumbs, DataNotice, Pending, Specs } from "@/components/site/ui";
import { LocalNav } from "@/components/site/LocalNav";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/categories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCategory(slug);
  return c ? { title: c.name, description: c.summary } : {};
}

export default async function CategoryPage({ params }: PageProps<"/categories/[slug]">) {
  const { slug } = await params;
  const c = getCategory(slug);
  if (!c) notFound();
  const ordered = [...CATEGORIES].sort((a, b) => a.ladderStep - b.ladderStep);
  const idx = ordered.findIndex((x) => x.slug === c.slug);
  const next = ordered.slice(idx + 1).find((x) => x.ladderStep > c.ladderStep);
  const prev = [...ordered.slice(0, idx)].reverse().find((x) => x.ladderStep < c.ladderStep);
  const style = { "--cat": c.color } as CSSProperties;

  return (
    <div style={style}>
      <LocalNav title="Categories" titleHref="/categories" links={ordered.map((x) => ({ label: x.name, href: `/categories/${x.slug}` }))} />

      {/* Each category gets its own identity colour within the shared system. */}
      <section style={{ background: c.colorSoft, paddingTop: 28 }}>
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Categories", href: "/categories" }, { label: c.name }]} />
          <div className="grid grid-2" style={{ padding: "clamp(48px,8vw,104px) 0", gap: "clamp(32px,6vw,80px)", alignItems: "end" }}>
            <div>
              <div className="cat-bar" style={{ marginBottom: 20 }} />
              <p className="kicker" style={{ color: "var(--ink-2)" }}>
                Step {c.ladderStep} on the ladder · {c.ageGuide}
              </p>
              <h1 className="display balance mt-xs">{c.name}</h1>
              <p className="lede mt-s pretty" style={{ color: "var(--ink-2)" }}>
                {c.tagline}
              </p>
            </div>
            <div style={{ fontSize: "clamp(96px,18vw,220px)", fontWeight: 800, letterSpacing: "-0.06em", lineHeight: 0.85, color: c.color, textAlign: "right" }} aria-hidden>
              {c.short}
            </div>
          </div>
        </div>
      </section>

      <section className="section tone-paper">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <div className="prose">
              <p style={{ fontSize: 22, color: "var(--ink)", fontWeight: 600, lineHeight: 1.4 }}>{c.summary}</p>
              {c.sections.map((s) => (
                <div key={s.heading}>
                  <h3>{s.heading}</h3>
                  {s.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              ))}
            </div>
            <div>
              <p className="kicker" style={{ marginBottom: 8 }}>
                At a glance
              </p>
              <Specs rows={c.facts.map((f) => [f.label, f.value] as [string, string])} />
              <div className="tile mt-m" style={{ background: c.colorSoft }}>
                <div className="tile-body">
                  <p className="kicker" style={{ color: "var(--ink-2)" }}>
                    How it connects
                  </p>
                  <p style={{ fontWeight: 600 }}>{c.connection}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight tone-off">
        <div className="wrap">
          <div className="grid grid-2">
            <Pending title={`${c.name} champions and seasons`}>Champion lists, calendars and notable graduates will be added from verified records.</Pending>
            <div>
              <p className="kicker">On the ladder</p>
              <div className="grid grid-2 mt-s" style={{ gap: 12 }}>
                {prev ? (
                  <Link href={`/categories/${prev.slug}`} className="card" style={{ padding: 18 }}>
                    <span className="caption">Previous step</span>
                    <span className="card-title" style={{ color: prev.color }}>
                      {prev.name}
                    </span>
                  </Link>
                ) : (
                  <span />
                )}
                <Link href={next ? `/categories/${next.slug}` : "/drivers?filter=active"} className="card" style={{ padding: 18 }}>
                  <span className="caption">Next step</span>
                  <span className="card-title" style={{ color: next?.color ?? "var(--red)" }}>
                    {next?.name ?? "Formula One"}
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-m">
            <DataNotice>Category descriptions are editorial. Current technical specifications and regulations will be verified in Phase 2.</DataNotice>
          </div>
        </div>
      </section>
    </div>
  );
}
