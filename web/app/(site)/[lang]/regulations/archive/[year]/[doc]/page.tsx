import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ExternalLink, GitCompare } from "lucide-react";
import { lp, type Lang } from "@/lib/i18n/config";
import { fmt, getDict } from "@/lib/i18n/dict";
import { catalogDoc, doc as getDoc, latestIndexed, mainChapters, siblings } from "@/lib/f1/regs";
import { formatDate } from "@/lib/f1/db";
import { Breadcrumbs, DataNotice, Specs, StatusBadge } from "@/components/site/ui";
import { ArticleIndex, IssueSelect } from "@/components/site/RegControls";

export async function generateMetadata({ params }: PageProps<"/[lang]/regulations/archive/[year]/[doc]">): Promise<Metadata> {
  const { doc } = await params;
  const d = catalogDoc(doc);
  return d ? { title: d.title } : {};
}

export default async function DocPage({ params }: PageProps<"/[lang]/regulations/archive/[year]/[doc]">) {
  const { lang: l, year: y, doc: id } = await params;
  const lang = l as Lang;
  const t = getDict(lang);
  const R = t.regulations;
  const cd = catalogDoc(id);
  if (!cd || String(cd.year) !== y) notFound();
  const d = getDoc(id);
  const sibs = siblings(cd);
  const prevYear = cd.year ? latestIndexed(cd.year - 1, cd.kind) : undefined;
  const firstIndexed = sibs.filter((s) => s.indexed).at(-1);
  const total = d?.extraction.articlesInToc || d?.articles.length || 0;
  const located = d?.articles.filter((a) => a.text).length ?? 0;

  return (
    <>
      <section className="tone-paper" style={{ paddingTop: 28 }}>
        <div className="wrap">
          <Breadcrumbs
            lang={lang}
            items={[
              { label: t.nav.regulations, href: "/regulations" },
              { label: R.archiveEyebrow, href: "/regulations/archive" },
              { label: String(cd.year), href: `/regulations/archive/${cd.year}` },
              { label: R.sectionNames[cd.kind] },
            ]}
          />
          <div style={{ padding: "clamp(40px,6vw,72px) 0 clamp(32px,4vw,48px)", maxWidth: 900 }}>
            <p className="eyebrow-f1">
              {R.sectionNames[cd.kind]} · {cd.year}
            </p>
            <h1 className="title-1 balance">{cd.title}</h1>
            <div className="flex-row mt-s" style={{ gap: 8 }}>
              <StatusBadge lang={lang} status="official" />
              {d ? <span className="badge">{R.indexed}</span> : <span className="badge status-warn">{R.notIndexed}</span>}
              {d && located < total && <StatusBadge lang={lang} status="incomplete" />}
            </div>
            <div className="flex-row mt-m" style={{ gap: 10 }}>
              <a href={cd.url} target="_blank" rel="noreferrer" className="btn btn-primary">
                {R.openPdf} <ExternalLink size={14} />
              </a>
              <IssueSelect lang={lang} current={cd.id} label={R.issues} options={sibs.map((s) => ({ id: s.id, year: s.year!, label: `${s.issue ? fmt(R.issue, { n: s.issue }) : s.title} · ${s.published ? formatDate(s.published, lang) : ""}${s.indexed ? "" : ` · ${R.notIndexed}`}` }))} />
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight tone-off">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <Specs
              rows={[
                [t.common.year, String(cd.year)],
                [t.common.source, R.sourceType.official],
                ...(cd.section ? ([[lang === "pt" ? "Seção" : "Section", `${cd.section}${cd.sectionName ? ` [${cd.sectionName}]` : ""}`]] as [string, string][]) : []),
                ...(cd.issue ? ([[R.issues, String(cd.issue)]] as [string, string][]) : []),
                [R.published, cd.published ? formatDate(cd.published, lang) : "—"],
                ...(cd.titleDate ? ([[R.titleDate, formatDate(cd.titleDate, lang)]] as [string, string][]) : []),
                [R.language, R.english],
                ...(d ? ([[R.pdfPage, fmt(R.pages, { n: d.pages })]] as [string, string][]) : []),
                ["URL", <a key="u" href={cd.url} target="_blank" rel="noreferrer" className="inline-link" style={{ wordBreak: "break-all" }}>{cd.url}</a>],
              ]}
            />
            <div>
              {d && <p className="small">{fmt(R.extraction, { located, total })}</p>}
              {d && located < total && <p className="small muted mt-xs">{R.extractionPartial}</p>}
              <p className="kicker mt-m" style={{ marginBottom: 8 }}>
                {R.compare}
              </p>
              <div className="flex-row" style={{ gap: 8 }}>
                {firstIndexed && firstIndexed.id !== cd.id && d && (
                  <Link href={lp(lang, `/regulations/compare?a=${firstIndexed.id}&b=${cd.id}`)} className="chip">
                    <GitCompare size={14} /> {R.firstIssue} → {cd.issue ? fmt(R.issue, { n: cd.issue }) : cd.year}
                  </Link>
                )}
                {prevYear && d && (
                  <Link href={lp(lang, `/regulations/compare?a=${prevYear.id}&b=${cd.id}`)} className="chip">
                    <GitCompare size={14} /> {prevYear.year} → {cd.year}
                  </Link>
                )}
                <Link href={lp(lang, `/regulations/compare?b=${cd.id}`)} className="chip">
                  {R.compareTitle}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section tone-paper">
        <div className="wrap-wide">
          <h2 className="title-1" style={{ marginBottom: 20 }}>
            {R.articleIndex}
          </h2>
          {d ? (
            <ArticleIndex
              lang={lang}
              base={`/regulations/archive/${cd.year}/${cd.id}`}
              articles={d.articles.map((a) => ({ num: a.num, title: a.title, chapter: a.chapter, located: !!a.text }))}
              chapters={mainChapters(d)}
              placeholder={R.filterArticles}
              unlocatedLabel={t.status.incomplete}
            />
          ) : (
            <div className="pending">
              <p>{R.notIndexedText}</p>
              <a href={cd.url} target="_blank" rel="noreferrer" className="link-arrow">
                {R.openPdf} <ExternalLink size={14} />
              </a>
            </div>
          )}
          <div className="mt-l">
            <DataNotice title={t.status.legend}>{R.officialTextNote}</DataNotice>
          </div>
        </div>
      </section>
    </>
  );
}
