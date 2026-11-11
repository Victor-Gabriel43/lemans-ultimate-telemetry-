import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { lp, type Lang } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dict";
import { CATEGORIES } from "@/lib/f1/categories";
import { DataNotice, LinkArrow, PageIntro, SectionHead } from "@/components/site/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/categories">): Promise<Metadata> {
  const t = getDict((await params).lang as Lang);
  return { title: t.categories.metaTitle, description: t.categories.lede };
}

export default async function CategoriesPage({ params }: PageProps<"/[lang]/categories">) {
  const lang = (await params).lang as Lang;
  const t = getDict(lang);
  const K = t.categories;
  const ladder = [...CATEGORIES].sort((a, b) => b.ladderStep - a.ladderStep);
  const f2 = CATEGORIES.find((c) => c.slug === "formula-2")!;
  return (
    <>
      <PageIntro lang={lang} crumbs={[{ label: t.nav.categories }]} eyebrow={K.eyebrow} title={K.title} lede={K.lede} />
      <section className="section tone-off">
        <div className="wrap">
          <SectionHead eyebrow={K.pathwayEyebrow} title={K.pathwayTitle} lede={K.pathwayLede} />
          <ol style={{ display: "grid", gap: 12 }}>
            <li className="tile tile-dark">
              <div className="tile-body" style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
                <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.04em", color: "#ff5a4f", width: 96 }}>F1</span>
                <div>
                  <p className="title-3">Formula 1</p>
                  <p className="small muted">{K.destination}</p>
                </div>
              </div>
            </li>
            {ladder.map((c) => (
              <li key={c.slug}>
                <Link href={lp(lang, `/categories/${c.slug}`)} className="tile tile-link" style={{ background: "var(--paper)", borderLeft: `6px solid ${c.color}` }}>
                  <div className="tile-body" style={{ flexDirection: "row", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.04em", color: c.color, width: 96 }}>{c.short}</span>
                    <div style={{ flex: "1 1 260px" }}>
                      <p className="title-3">{c.name}</p>
                      <p className="small muted">{c.summary[lang]}</p>
                    </div>
                    <span className="badge">{c.ageGuide[lang]}</span>
                    <ArrowRight size={18} color="var(--ink-3)" aria-hidden />
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section tone-paper">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <div>
              <p className="eyebrow-f1">{K.superLicence}</p>
              <h2 className="headline balance">{K.superLicenceTitle}</h2>
            </div>
            <div className="prose">
              <p>{f2.regulations[lang][1]}</p>
              <p>
                <LinkArrow lang={lang} href="/categories/formula-2">
                  FIA Formula 2
                </LinkArrow>
              </p>
            </div>
          </div>
          <div className="mt-l">
            <DataNotice title={t.status.legend}>
              {lang === "pt"
                ? "As tabelas de pontos da Superlicença mudam com o tempo e estão no Código Esportivo Internacional da FIA."
                : "Super Licence points tables change over time and are set out in the FIA International Sporting Code."}
            </DataNotice>
          </div>
        </div>
      </section>
    </>
  );
}
