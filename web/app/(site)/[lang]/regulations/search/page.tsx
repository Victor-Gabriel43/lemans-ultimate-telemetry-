import Link from "next/link";
import type { Metadata } from "next";
import { Search } from "lucide-react";
import { lp, type Lang } from "@/lib/i18n/config";
import { fmt, getDict } from "@/lib/i18n/dict";
import { KIND_ORDER, indexedDocs, searchArticles } from "@/lib/f1/regs";
import { DataNotice, PageIntro } from "@/components/site/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/regulations/search">): Promise<Metadata> {
  const t = getDict((await params).lang as Lang);
  return { title: t.regulations.searchTitle, description: t.regulations.searchLede };
}

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function RegSearch({ params, searchParams }: PageProps<"/[lang]/regulations/search">) {
  const lang = (await params).lang as Lang;
  const sp = await searchParams;
  const t = getDict(lang);
  const R = t.regulations;
  const q = one(sp.q).slice(0, 200);
  const year = Number(one(sp.year)) || undefined;
  const kind = one(sp.kind) || undefined;
  const docs = indexedDocs();
  const years = [...new Set(docs.map((d) => d.year!))].sort((a, b) => b - a);
  const kinds = KIND_ORDER.filter((k) => docs.some((d) => d.kind === k));
  const { hits, total } = q ? searchArticles(q, { year, kind, limit: 80 }) : { hits: [], total: 0 };

  return (
    <>
      <PageIntro lang={lang} crumbs={[{ label: t.nav.regulations, href: "/regulations" }, { label: R.searchArticles }]} eyebrow={R.archiveEyebrow} title={R.searchTitle} lede={R.searchLede} />
      <section className="section-tight tone-off" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <form action={lp(lang, "/regulations/search")} method="get" className="flex-row" style={{ gap: 10, alignItems: "stretch" }}>
            <label className="field" style={{ flex: "1 1 320px" }}>
              <Search size={16} aria-hidden />
              <input name="q" defaultValue={q} placeholder={R.searchPlaceholder} aria-label={R.searchTitle} />
            </label>
            <select name="year" defaultValue={year ?? ""} className="select" aria-label={R.searchYear} style={{ maxWidth: "100%" }}>
              <option value="">{R.allYears}</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <select name="kind" defaultValue={kind ?? ""} className="select" aria-label={R.searchKind} style={{ maxWidth: "100%" }}>
              <option value="">{R.allKinds}</option>
              {kinds.map((k) => (
                <option key={k} value={k}>
                  {R.sectionNames[k]}
                </option>
              ))}
            </select>
            <button type="submit" className="btn btn-primary">
              {t.search.title}
            </button>
          </form>

          {q && (
            <div className="mt-m">
              <p className="kicker">{fmt(R.results, { n: total })}</p>
              {total > hits.length && <p className="caption">{fmt(R.resultsCapped, { n: hits.length })}</p>}
              <ul className="mt-s">
                {hits.map((h) => (
                  <li key={`${h.docId}-${h.num}`} style={{ borderBottom: "1px solid var(--line-soft)", padding: "16px 0" }}>
                    <Link href={lp(lang, `/regulations/archive/${h.year}/${h.docId}/${encodeURIComponent(h.num)}`)} style={{ display: "block" }}>
                      <p className="caption">
                        {R.sectionNames[h.kind]} {h.year}
                        {h.issue ? ` · ${fmt(R.issue, { n: h.issue })}` : ""}
                        {h.page ? ` · ${R.pdfPage} ${h.page}` : ""}
                      </p>
                      <p style={{ fontWeight: 600, marginTop: 2 }}>
                        <span className="num">{h.num}</span> {h.title ?? ""}
                      </p>
                      {h.snippet && (
                        <p className="small muted mt-xs" lang="en">
                          {h.snippet}
                        </p>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
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
