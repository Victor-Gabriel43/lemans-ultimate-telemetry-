import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronLeft, ChevronRight, ExternalLink, GitCompare } from "lucide-react";
import { lp, type Lang } from "@/lib/i18n/config";
import { fmt, getDict } from "@/lib/i18n/dict";
import { article as getArticle, catalogDoc, doc as getDoc, latestIndexed, mainChapters, siblings } from "@/lib/f1/regs";
import { explainerFor } from "@/lib/f1/explainers";
import { formatDate } from "@/lib/f1/db";
import { Breadcrumbs, DataNotice, Specs, StatusBadge } from "@/components/site/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/regulations/archive/[year]/[doc]/[article]">): Promise<Metadata> {
  const { doc: id, article: num } = await params;
  const d = getDoc(id);
  const a = d && getArticle(d, decodeURIComponent(num));
  return d && a ? { title: `${a.num} ${a.title ?? ""} · ${d.title}` } : {};
}

export default async function ArticlePage({ params }: PageProps<"/[lang]/regulations/archive/[year]/[doc]/[article]">) {
  const { lang: l, year: y, doc: id, article: raw } = await params;
  const lang = l as Lang;
  const t = getDict(lang);
  const R = t.regulations;
  const cd = catalogDoc(id);
  const d = getDoc(id);
  if (!cd || !d || String(cd.year) !== y) notFound();
  const num = decodeURIComponent(raw);
  const a = getArticle(d, num);
  if (!a) notFound();
  const idx = d.articles.indexOf(a);
  const prev = d.articles[idx - 1];
  const next = d.articles[idx + 1];
  const chapter = mainChapters(d).find((c) => c.num === a.chapter);
  const ex = explainerFor(d.year, d.kind, a.num);
  const base = `/regulations/archive/${d.year}/${d.id}`;
  const pdfHref = a.pdfPage ? `${d.url}#page=${a.pdfPage}` : d.url;

  // Same article in other indexed editions (same number), for quick comparison.
  const others = [
    ...siblings(cd).filter((s) => s.indexed && s.id !== d.id),
    ...[latestIndexed(d.year - 1, d.kind), latestIndexed(d.year + 1, d.kind)].filter((x): x is NonNullable<typeof x> => !!x),
  ].filter((s, i, arr) => arr.findIndex((z) => z.id === s.id) === i);
  const otherWithArticle = others.map((s) => ({ s, has: !!getDoc(s.id)?.articles.some((x) => x.num === a.num) })).filter((o) => o.has);

  const issueLabel = d.issue ? fmt(R.issue, { n: d.issue }) : String(d.year);

  return (
    <>
      <section className="tone-paper" style={{ paddingTop: 28 }}>
        <div className="wrap">
          <Breadcrumbs
            lang={lang}
            items={[
              { label: t.nav.regulations, href: "/regulations" },
              { label: R.archiveEyebrow, href: "/regulations/archive" },
              { label: String(d.year), href: `/regulations/archive/${d.year}` },
              { label: `${R.sectionNames[d.kind]} · ${issueLabel}`, href: base },
              { label: a.num },
            ]}
          />
          <div style={{ padding: "clamp(40px,6vw,72px) 0 clamp(24px,3vw,40px)", maxWidth: 900 }}>
            <p className="eyebrow-f1">
              {R.sectionNames[d.kind]} {d.year} · {issueLabel}
              {chapter && ` · ${chapter.num} ${chapter.title}`}
            </p>
            <h1 className="title-1 balance">
              <span className="num">{a.num}</span> {a.title ?? ""}
            </h1>
            <div className="flex-row mt-s" style={{ gap: 8 }}>
              <StatusBadge lang={lang} status="official" />
              {!a.text && <StatusBadge lang={lang} status="incomplete" />}
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight tone-paper" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="grid" style={{ gridTemplateColumns: "minmax(0,1fr)", gap: 32, maxWidth: 900 }}>
            <div>
              <p className="kicker" style={{ marginBottom: 10 }}>
                {R.officialText}
              </p>
              {a.text ? (
                <div className="official-text" lang="en">
                  {a.text}
                </div>
              ) : (
                <div className="pending">
                  <p>{R.unlocated}</p>
                </div>
              )}
              <p className="caption mt-xs">{R.officialTextNote}</p>
              <div className="flex-row mt-s" style={{ gap: 10 }}>
                <a href={pdfHref} target="_blank" rel="noreferrer" className="btn btn-primary">
                  {a.pdfPage ? fmt(R.openPdfAtPage, { p: a.pdfPage }) : R.openPdf} <ExternalLink size={14} />
                </a>
                <Link href={lp(lang, base)} className="btn btn-ghost">
                  {R.backToDoc}
                </Link>
              </div>
            </div>

            {ex && (
              <div style={{ borderTop: "1px solid var(--line)", paddingTop: 28 }}>
                <p className="kicker" style={{ marginBottom: 4 }}>
                  {R.explanation}
                </p>
                <p className="caption" style={{ marginBottom: 16 }}>
                  <StatusBadge lang={lang} status="editorial" /> {R.explanationNote}{" "}
                  {ex.basedOn !== d.id && fmt(R.explBasedOn, { doc: catalogDoc(ex.basedOn)?.title ?? ex.basedOn })}
                </p>
                <Specs
                  rows={[
                    [R.explWhat, ex.says[lang]],
                    [R.explPractice, ex.practice[lang]],
                    [R.explAffects, ex.affects[lang]],
                    [R.explWhy, ex.why[lang]],
                    ...(ex.introduced ? ([[R.explIntroduced, ex.introduced[lang]]] as [string, string][]) : []),
                  ]}
                />
                {ex.related && (
                  <p className="mt-s">
                    <Link href={lp(lang, ex.related)} className="link-arrow">
                      {t.common.readMore} <ChevronRight size={14} />
                    </Link>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section-tight tone-off">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <Specs
              rows={[
                [t.common.source, R.sourceType.official],
                [lang === "pt" ? "Documento" : "Document", d.title],
                [R.issues, issueLabel],
                [R.published, d.published ? formatDate(d.published, lang) : "—"],
                [R.language, R.english],
                [R.pdfPage, a.pdfPage ? String(a.pdfPage) : "—"],
                ...(a.page ? ([[R.printedPage, a.page]] as [string, string][]) : []),
                ["PDF", <a key="u" href={d.url} target="_blank" rel="noreferrer" className="inline-link" style={{ wordBreak: "break-all" }}>{d.url}</a>],
              ]}
            />
            <div>
              {otherWithArticle.length > 0 && (
                <>
                  <p className="kicker" style={{ marginBottom: 8 }}>
                    {R.explCompare}
                  </p>
                  <div className="flex-row" style={{ gap: 8 }}>
                    {otherWithArticle.map(({ s }) => {
                      const older = (s.year ?? 0) < d.year || ((s.year ?? 0) === d.year && (s.issue ?? 0) < (d.issue ?? 0));
                      const [A, B] = older ? [s.id, d.id] : [d.id, s.id];
                      return (
                        <Link key={s.id} href={lp(lang, `/regulations/compare?a=${A}&b=${B}&art=${encodeURIComponent(a.num)}`)} className="chip">
                          <GitCompare size={14} /> {s.year} · {s.issue ? fmt(R.issue, { n: s.issue }) : ""}
                        </Link>
                      );
                    })}
                  </div>
                </>
              )}
              <div className="flex-row mt-m space-between" style={{ gap: 12 }}>
                {prev ? (
                  <Link href={lp(lang, `${base}/${encodeURIComponent(prev.num)}`)} className="link-arrow">
                    <ChevronLeft size={14} /> {R.prevArticle}: {prev.num}
                  </Link>
                ) : (
                  <span />
                )}
                {next && (
                  <Link href={lp(lang, `${base}/${encodeURIComponent(next.num)}`)} className="link-arrow">
                    {R.nextArticle}: {next.num} <ChevronRight size={14} />
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="mt-l">
            <DataNotice title={t.status.legend}>{R.officialTextNote}</DataNotice>
          </div>
        </div>
      </section>
    </>
  );
}
