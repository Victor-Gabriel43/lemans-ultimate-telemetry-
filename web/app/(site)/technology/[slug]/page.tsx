import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Lightbulb } from "lucide-react";
import { TECH, getTech } from "@/lib/f1/technology";
import { Breadcrumbs, Disclosure, LinkArrow, Milestones } from "@/components/site/ui";
import { LocalNav } from "@/components/site/LocalNav";
import { TONES } from "@/components/site/tones";

export function generateStaticParams() {
  return TECH.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/technology/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const t = getTech(slug);
  return t ? { title: t.title, description: t.summary } : {};
}

export default async function TechArticle({ params }: PageProps<"/technology/[slug]">) {
  const { slug } = await params;
  const t = getTech(slug);
  if (!t) notFound();
  const related = t.related.map((r) => getTech(r)).filter((r) => r !== undefined);
  const siblings = TECH.filter((x) => x.group === t.group);

  return (
    <>
      <LocalNav title={t.group} titleHref="/technology" links={siblings.map((s) => ({ label: s.title, href: `/technology/${s.slug}` }))} />

      <section className="tone-paper" style={{ paddingTop: 28 }}>
        <div className="wrap-text">
          <Breadcrumbs items={[{ label: "Technology", href: "/technology" }, { label: t.title }]} />
          <div style={{ padding: "clamp(40px,7vw,80px) 0 0" }}>
            <p className="eyebrow-f1">{t.group}</p>
            <h1 className="display balance">{t.title}</h1>
            <p className="lede mt-s pretty">{t.summary}</p>
          </div>
        </div>
        <div className="wrap" style={{ padding: "clamp(40px,6vw,64px) var(--gutter)" }}>
          <div className="plate ratio-cinema" style={{ background: TONES[t.tone] }}>
            <div className="plate-art">
              <span className="plate-tag">{t.group}</span>
              <span className="plate-glyph plate-glyph-sm">{t.title}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="tone-paper" style={{ paddingBottom: "clamp(56px,8vw,96px)" }}>
        <div className="wrap-text">
          <aside className="notice" style={{ background: "var(--red-soft)", color: "var(--ink)" }}>
            <Lightbulb size={20} color="var(--red-ink)" aria-hidden />
            <div>
              <strong>In simple terms.</strong> {t.simple}
            </div>
          </aside>

          <div className="prose mt-l">
            {t.sections.map((s) => (
              <div key={s.heading}>
                <h3>{s.heading}</h3>
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section tone-off">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <div>
              <p className="eyebrow-f1">Key concepts</p>
              <h2 className="title-1">Glossary.</h2>
              <p className="muted mt-s">Open a term to see its definition.</p>
              <div className="mt-m">
                {t.concepts.map((c) => (
                  <Disclosure key={c.term} title={c.term}>
                    <p>{c.definition}</p>
                  </Disclosure>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow-f1">How it changed</p>
              <h2 className="title-1">Through the years.</h2>
              <div className="mt-m">
                <Milestones items={t.history} linkYears />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section tone-paper">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow-f1">Continue learning</p>
              <h2 className="title-1">Related topics.</h2>
            </div>
            <LinkArrow href="/technology">All articles</LinkArrow>
          </div>
          <div className="grid grid-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/technology/${r.slug}`} className="card">
                <div style={{ height: 6, background: TONES[r.tone] }} />
                <div className="card-body">
                  <p className="card-meta">{r.group}</p>
                  <p className="card-title">{r.title}</p>
                  <p className="small muted">{r.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
