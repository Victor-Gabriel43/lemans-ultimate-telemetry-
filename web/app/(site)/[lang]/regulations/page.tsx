import Link from "next/link";
import type { Metadata } from "next";
import { FileText, GitCompare, Search } from "lucide-react";
import { lp, type Lang } from "@/lib/i18n/config";
import { fmt, getDict } from "@/lib/i18n/dict";
import { techArticles } from "@/lib/f1/content";
import { docsForYear, indexedDocs, lastRegYear, yearsWithDocs } from "@/lib/f1/regs";
import { LinkArrow, PageIntro, SectionHead, StatusBadge } from "@/components/site/ui";
import { TONES } from "@/components/site/tones";

export async function generateMetadata({ params }: PageProps<"/[lang]/regulations">): Promise<Metadata> {
  const t = getDict((await params).lang as Lang);
  return { title: t.regulations.metaTitle, description: t.regulations.lede };
}

export default async function RegulationsPage({ params }: PageProps<"/[lang]/regulations">) {
  const lang = (await params).lang as Lang;
  const t = getDict(lang);
  const R = t.regulations;
  const explainers = techArticles(lang, "regulations");
  const current = Math.min(2026, lastRegYear());
  const latest = [...new Map(docsForYear(current).map((d) => [d.kind, d])).values()];
  const years = yearsWithDocs();

  return (
    <>
      <PageIntro lang={lang} crumbs={[{ label: t.nav.regulations }]} eyebrow={R.eyebrow} title={R.title} lede={R.lede}>
        <div className="flex-row" style={{ gap: 10 }}>
          <Link href={lp(lang, "/regulations/archive")} className="btn btn-primary">
            <FileText size={16} /> {R.openArchive}
          </Link>
          <Link href={lp(lang, "/regulations/search")} className="btn btn-ghost">
            <Search size={16} /> {R.searchArticles}
          </Link>
          <Link href={lp(lang, "/regulations/compare")} className="btn btn-ghost">
            <GitCompare size={16} /> {R.compare}
          </Link>
        </div>
      </PageIntro>

      <section className="section tone-night">
        <div className="wrap">
          <SectionHead
            eyebrow={R.archiveEyebrow}
            title={R.archiveTitle}
            lede={R.archiveLede}
            action={
              <LinkArrow lang={lang} href="/regulations/archive">
                {R.openArchive}
              </LinkArrow>
            }
          />
          <p className="kicker" style={{ marginBottom: 12 }}>
            {fmt(R.documentsFor, { y: current })}
          </p>
          <div className="grid grid-3" style={{ gap: 12 }}>
            {latest.map((d) => (
              <Link key={d.id} href={lp(lang, `/regulations/archive/${d.year}/${d.id}`)} className="tile tile-link">
                <div className="tile-body" style={{ padding: "20px 22px" }}>
                  <StatusBadge lang={lang} status="official" />
                  <span className="title-3">{R.sectionNames[d.kind]}</span>
                  <span className="caption" style={{ color: "var(--on-night-2)" }}>
                    {d.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <p className="caption mt-m" style={{ color: "var(--on-night-2)" }}>
            {R.yearsAvailable}: {years[0]}–{years[years.length - 1]} · {indexedDocs().length} {lang === "pt" ? "edições indexadas" : "indexed issues"}
          </p>
        </div>
      </section>

      <section className="section tone-off">
        <div className="wrap">
          <SectionHead eyebrow={R.explainersEyebrow} title={R.explainersTitle} />
          <div className="grid grid-3">
            {explainers.map((a) => (
              <Link key={a.slug} href={lp(lang, `/regulations/${a.slug}`)} className="tile tile-link" style={{ background: "var(--paper)" }}>
                <div style={{ height: 6, background: TONES[a.tone] }} aria-hidden />
                <div className="tile-body">
                  <p className="title-2">{a.title}</p>
                  <p className="muted small pretty">{a.summary}</p>
                  <span className="link-arrow small" style={{ marginTop: "auto", paddingTop: 12 }}>
                    {t.common.readArticle}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
