import Link from "next/link";
import type { Metadata } from "next";
import { lp, type Lang } from "@/lib/i18n/config";
import { fmt, getDict } from "@/lib/i18n/dict";
import { KIND_ORDER, compareDocs, doc as getDoc, indexedDocs, type ComparedArticle } from "@/lib/f1/regs";
import { formatDate } from "@/lib/f1/db";
import { DataNotice, PageIntro } from "@/components/site/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/regulations/compare">): Promise<Metadata> {
  const t = getDict((await params).lang as Lang);
  return { title: t.regulations.compareTitle, description: t.regulations.compareLede };
}

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function RegCompare({ params, searchParams }: PageProps<"/[lang]/regulations/compare">) {
  const lang = (await params).lang as Lang;
  const sp = await searchParams;
  const t = getDict(lang);
  const R = t.regulations;
  const docs = indexedDocs().sort((x, y) => (y.year ?? 0) - (x.year ?? 0) || KIND_ORDER.indexOf(x.kind) - KIND_ORDER.indexOf(y.kind) || (y.issue ?? 0) - (x.issue ?? 0));
  const label = (d: (typeof docs)[number]) => `${d.year} · ${R.sectionNames[d.kind]}${d.issue ? ` · ${fmt(R.issue, { n: d.issue })}` : ""}${d.published ? ` (${formatDate(d.published, lang)})` : ""}`;
  const aId = one(sp.a);
  const bId = one(sp.b);
  const art = one(sp.art);
  const showSame = one(sp.same) === "1";
  const A = aId ? getDoc(aId) : undefined;
  const B = bId ? getDoc(bId) : undefined;
  let rows: ComparedArticle[] = A && B ? compareDocs(A, B) : [];
  const counts = { changed: 0, added: 0, removed: 0, same: 0 };
  rows.forEach((r) => (r.status === "unchanged" ? counts.same++ : counts[r.status]++));
  if (art) rows = rows.filter((r) => r.a?.num === art || r.b?.num === art);
  const filtered = rows.filter((r) => showSame || r.status !== "unchanged");
  const PAGE = 25;
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE));
  const page = Math.min(pages, Math.max(1, Number(one(sp.page)) || 1));
  const visible = filtered.slice((page - 1) * PAGE, page * PAGE);
  const kindMismatch = A && B && A.kind !== B.kind;
  const statusLabel = { changed: R.changed, added: R.added, removed: R.removed, unchanged: R.unchanged };
  const statusClass = { changed: "status-warn", added: "status-ok", removed: "status-bad", unchanged: "status-neutral" };
  const matchLabel = { number: R.matchNumber, title: R.matchTitle, "number-only": R.matchNumberOnly };
  const artHref = (d: NonNullable<typeof A>, num: string) => lp(lang, `/regulations/archive/${d.year}/${d.id}/${encodeURIComponent(num)}`);
  const qs = (extra: Record<string, string>) => {
    const p = new URLSearchParams({ a: aId, b: bId, ...(art ? { art } : {}), ...(showSame ? { same: "1" } : {}), ...extra });
    [...p.entries()].forEach(([k, v]) => !v && p.delete(k));
    return lp(lang, `/regulations/compare?${p}`);
  };

  return (
    <>
      <PageIntro lang={lang} crumbs={[{ label: t.nav.regulations, href: "/regulations" }, { label: R.compare }]} eyebrow={R.archiveEyebrow} title={R.compareTitle} lede={R.compareLede} />
      <section className="section-tight tone-off" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <form action={lp(lang, "/regulations/compare")} method="get" className="flex-row" style={{ gap: 10, alignItems: "flex-end" }}>
            {[
              ["a", R.compareLeft, aId],
              ["b", R.compareRight, bId],
            ].map(([name, lbl, val]) => (
              <label key={name} style={{ display: "grid", gap: 6, flex: "1 1 300px" }}>
                <span className="kicker">{lbl}</span>
                <select name={name} defaultValue={val} className="select" style={{ width: "100%" }} required>
                  <option value="">—</option>
                  {docs.map((d) => (
                    <option key={d.id} value={d.id}>
                      {label(d)}
                    </option>
                  ))}
                </select>
              </label>
            ))}
            <label className="flex-row small" style={{ gap: 6 }}>
              <input type="checkbox" name="same" value="1" defaultChecked={showSame} /> {R.showUnchanged}
            </label>
            <button type="submit" className="btn btn-primary">
              {R.compareRun}
            </button>
          </form>

          {A && B && (
            <div className="mt-m">
              <p className="kicker">{fmt(R.compareSummary, counts)}</p>
              {pages > 1 && <p className="caption">{lang === "pt" ? `Página ${page} de ${pages} · ${filtered.length} artigos` : `Page ${page} of ${pages} · ${filtered.length} articles`}</p>}
              {kindMismatch && <p className="small mt-xs">⚠ {lang === "pt" ? "Os documentos escolhidos são de tipos diferentes; a comparação tem pouco significado." : "The selected documents are of different kinds; the comparison has little meaning."}</p>}
              {art && (
                <p className="small mt-xs">
                  {R.article.replace("{n}", art)} ·{" "}
                  <Link href={qs({ art: "" })} className="inline-link">
                    {lang === "pt" ? "ver todos os artigos" : "show all articles"}
                  </Link>
                </p>
              )}
              <p className="caption mt-xs">{R.compareCaveat}</p>
              <div className="mt-s">
                {visible.map((r, i) => {
                  const x = r.b ?? r.a!;
                  return (
                    <article key={i} style={{ borderBottom: "1px solid var(--line-soft)", padding: "20px 0" }}>
                      <div className="flex-row" style={{ gap: 10, alignItems: "baseline" }}>
                        <span className={`badge ${statusClass[r.status]}`}>{statusLabel[r.status]}</span>
                        <p style={{ fontWeight: 600 }}>
                          {r.a && r.b && r.a.num !== r.b.num ? (
                            <>
                              <span className="num">{r.a.num}</span> → <span className="num">{r.b.num}</span>
                            </>
                          ) : (
                            <span className="num">{x.num}</span>
                          )}{" "}
                          {x.title ?? ""}
                        </p>
                      </div>
                      {r.match && r.status !== "unchanged" && (
                        <p className="caption mt-xs" style={r.match === "number-only" ? { color: "var(--red-ink)" } : undefined}>
                          {R.compareMatchedBy}: {matchLabel[r.match]}
                          {r.a && r.a.title !== r.b?.title && r.a.title && ` · A: “${r.a.title}”`}
                        </p>
                      )}
                      {r.status === "changed" && r.diff && (
                        <div className="official-text mt-xs" lang="en" style={{ maxHeight: 420, overflow: "auto" }}>
                          {r.diff.map((p, j) => (p.t === "=" ? <span key={j}>{p.s}</span> : <span key={j} className={p.t === "+" ? "diff-add" : "diff-del"}>{p.s}</span>))}
                        </div>
                      )}
                      {r.status === "added" && r.b?.text && (
                        <div className="official-text mt-xs" lang="en" style={{ maxHeight: 260, overflow: "auto" }}>
                          <span className="diff-add">{r.b.text}</span>
                        </div>
                      )}
                      {r.status === "removed" && r.a?.text && (
                        <div className="official-text mt-xs" lang="en" style={{ maxHeight: 260, overflow: "auto" }}>
                          <span className="diff-del">{r.a.text}</span>
                        </div>
                      )}
                      <p className="caption mt-xs">
                        {r.a && (
                          <Link href={artHref(A, r.a.num)} className="inline-link">
                            A · {r.a.num}
                          </Link>
                        )}
                        {r.a && r.b && " · "}
                        {r.b && (
                          <Link href={artHref(B, r.b.num)} className="inline-link">
                            B · {r.b.num}
                          </Link>
                        )}
                      </p>
                    </article>
                  );
                })}
                {visible.length === 0 && <p className="small mt-s">{R.unchanged}</p>}
                {pages > 1 && (
                  <nav className="flex-row mt-m" style={{ gap: 6 }} aria-label={lang === "pt" ? "Páginas" : "Pages"}>
                    {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                      <Link key={n} href={qs({ page: n === 1 ? "" : String(n) })} className={`chip ${n === page ? "active" : ""}`} aria-current={n === page ? "page" : undefined}>
                        {n}
                      </Link>
                    ))}
                  </nav>
                )}
              </div>
            </div>
          )}
          <div className="mt-l">
            <DataNotice title={t.status.legend}>{R.compareCaveat}</DataNotice>
          </div>
        </div>
      </section>
    </>
  );
}
