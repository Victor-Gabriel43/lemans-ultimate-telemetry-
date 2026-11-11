import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { lp, type Lang } from "@/lib/i18n/config";
import { fmt, getDict } from "@/lib/i18n/dict";
import { FIRST_REG_YEAR, KIND_ORDER, docsForYear, lastRegYear } from "@/lib/f1/regs";
import { formatDate } from "@/lib/f1/db";
import { Breadcrumbs, LinkArrow, StatusBadge } from "@/components/site/ui";
import { YearJump } from "@/components/site/YearJump";

export async function generateMetadata({ params }: PageProps<"/[lang]/regulations/archive/[year]">): Promise<Metadata> {
  const { lang, year } = await params;
  const t = getDict(lang as Lang);
  return { title: `${t.regulations.archiveEyebrow} ${year}` };
}

export default async function ArchiveYear({ params }: PageProps<"/[lang]/regulations/archive/[year]">) {
  const { lang: l, year: y } = await params;
  const lang = l as Lang;
  const t = getDict(lang);
  const R = t.regulations;
  const year = Number(y);
  const last = lastRegYear();
  if (!Number.isInteger(year) || year < FIRST_REG_YEAR || year > last) notFound();
  const docs = docsForYear(year);
  const years = Array.from({ length: last - FIRST_REG_YEAR + 1 }, (_, i) => FIRST_REG_YEAR + i);
  const groups = KIND_ORDER.map((k) => ({ kind: k, items: docs.filter((d) => d.kind === k) })).filter((g) => g.items.length);

  return (
    <>
      <section className="tone-paper" style={{ paddingTop: 28 }}>
        <div className="wrap">
          <div className="flex-row space-between">
            <Breadcrumbs lang={lang} items={[{ label: t.nav.regulations, href: "/regulations" }, { label: R.archiveEyebrow, href: "/regulations/archive" }, { label: String(year) }]} />
            <YearJump lang={lang} year={year} years={years} base="/regulations/archive" label={R.yearSelector} />
          </div>
          <div style={{ padding: "clamp(40px,6vw,72px) 0 clamp(32px,4vw,48px)" }}>
            <p className="eyebrow-f1">{R.archiveEyebrow}</p>
            <h1 className="display">{fmt(R.documentsFor, { y: year })}</h1>
            {year <= 2026 && (
              <p className="lede mt-s">
                <Link href={lp(lang, `/seasons/${year}`)} className="inline-link">
                  {fmt(t.seasons.seasonN, { y: year })}
                </Link>
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="section-tight tone-off">
        <div className="wrap">
          {groups.length === 0 ? (
            <div className="pending">
              <span className="badge status-warn">{R.gapTitle}</span>
              <p className="pending-title">{R.noDocuments}</p>
              <p>{fmt(R.gapText, { y: year })}</p>
              <LinkArrow lang={lang} href="https://www.fia.com/fia-archives-digitisation-and-e-library-project">
                {R.gapLink}
              </LinkArrow>
            </div>
          ) : (
            groups.map((g) => (
              <div key={g.kind} style={{ marginBottom: 40 }}>
                <h2 className="title-2" style={{ marginBottom: 12 }}>
                  {R.sectionNames[g.kind]}
                </h2>
                <div className="table-wrap">
                  <table className="dtable compact">
                    <thead>
                      <tr>
                        <th scope="col">{R.issues}</th>
                        <th scope="col">{t.common.status}</th>
                        <th scope="col">{R.published}</th>
                        <th scope="col">FIA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {g.items.map((d, i) => (
                        <tr key={d.id}>
                          <td>
                            <Link href={lp(lang, `/regulations/archive/${year}/${d.id}`)} style={{ fontWeight: 600 }}>
                              {d.issue ? fmt(R.issue, { n: d.issue }) : d.title}
                            </Link>
                            {i === 0 && <span className="badge badge-red" style={{ marginLeft: 8 }}>{R.latestIssue}</span>}
                            {i === g.items.length - 1 && g.items.length > 1 && <span className="badge" style={{ marginLeft: 8 }}>{R.firstIssue}</span>}
                            <span className="caption" style={{ display: "block" }}>
                              {d.title}
                            </span>
                          </td>
                          <td>{d.indexed ? <StatusBadge lang={lang} status="official" /> : <span className="badge">{R.notIndexed}</span>}</td>
                          <td className="small num">{d.published ? formatDate(d.published, lang) : "—"}</td>
                          <td>
                            <a href={d.url} target="_blank" rel="noreferrer" className="link-arrow small">
                              PDF <ExternalLink size={12} />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
