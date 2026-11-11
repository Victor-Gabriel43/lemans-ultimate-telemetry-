import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { lp, type Lang } from "@/lib/i18n/config";
import { fmt, getDict } from "@/lib/i18n/dict";
import { CATEGORIES, getCategory } from "@/lib/f1/categories";
import { driver } from "@/lib/f1/db";
import { Breadcrumbs, DataNotice, LinkArrow, Specs, StatusBadge } from "@/components/site/ui";
import { LocalNav } from "@/components/site/LocalNav";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/categories/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const c = getCategory(slug);
  return c ? { title: c.name, description: c.summary[lang as Lang] } : {};
}

export default async function CategoryPage({ params }: PageProps<"/[lang]/categories/[slug]">) {
  const { lang: l, slug } = await params;
  const lang = l as Lang;
  const t = getDict(lang);
  const K = t.categories;
  const c = getCategory(slug);
  if (!c) notFound();
  const ordered = [...CATEGORIES].sort((a, b) => a.ladderStep - b.ladderStep);
  const idx = ordered.findIndex((x) => x.slug === c.slug);
  const next = ordered.slice(idx + 1).find((x) => x.ladderStep > c.ladderStep);
  const prev = [...ordered.slice(0, idx)].reverse().find((x) => x.ladderStep < c.ladderStep);
  const graduates = (c.champions ?? []).filter((x) => x.f1 && driver(x.f1));
  const style = { "--cat": c.color } as CSSProperties;

  return (
    <div style={style}>
      <LocalNav lang={lang} title={t.nav.categories} titleHref="/categories" links={ordered.map((x) => ({ label: x.name, href: `/categories/${x.slug}` }))} />
      <section style={{ background: c.colorSoft, paddingTop: 28 }}>
        <div className="wrap">
          <Breadcrumbs lang={lang} items={[{ label: t.nav.categories, href: "/categories" }, { label: c.name }]} />
          <div className="grid grid-2" style={{ padding: "clamp(48px,8vw,104px) 0", gap: "clamp(32px,6vw,80px)", alignItems: "end" }}>
            <div>
              <div className="cat-bar" style={{ marginBottom: 20 }} />
              <p className="kicker" style={{ color: "var(--ink-2)" }}>
                {fmt(K.step, { n: c.ladderStep, age: c.ageGuide[lang] })}
              </p>
              <h1 className="display balance mt-xs">{c.name}</h1>
              <p className="lede mt-s pretty" style={{ color: "var(--ink-2)" }}>
                {c.tagline[lang]}
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
              <p style={{ fontSize: 22, color: "var(--ink)", fontWeight: 600, lineHeight: 1.4 }}>{c.summary[lang]}</p>
              <h3>{K.history}</h3>
              {c.history[lang].map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <h3>{K.regulations}</h3>
              {c.regulations[lang].map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <h3>{K.cars}</h3>
              {c.cars[lang].map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div>
              <p className="kicker" style={{ marginBottom: 8 }}>
                {K.atAGlance}
              </p>
              <Specs rows={c.facts.map((f) => [f.label[lang], f.value[lang]] as [string, string])} />
              <div className="tile mt-m" style={{ background: c.colorSoft }}>
                <div className="tile-body">
                  <p className="kicker" style={{ color: "var(--ink-2)" }}>
                    {K.connects}
                  </p>
                  <p style={{ fontWeight: 600 }}>{c.connection[lang]}</p>
                </div>
              </div>
              {c.fiaUrl && (
                <p className="mt-m">
                  <LinkArrow lang={lang} href={c.fiaUrl}>
                    {K.officialRegs}
                  </LinkArrow>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {c.champions && (
        <section className="section tone-off">
          <div className="wrap">
            <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
              <div>
                <div className="flex-row" style={{ marginBottom: 12 }}>
                  <h2 className="title-1">{K.champions}</h2>
                  <StatusBadge lang={lang} status="editorial" />
                </div>
                {c.championsLabel && <p className="small muted">{c.championsLabel[lang]}</p>}
                <p className="caption mt-xs">{K.championsNote}</p>
                <div className="table-wrap mt-s">
                  <table className="dtable compact">
                    <tbody>
                      {[...c.champions].reverse().map((x) => (
                        <tr key={x.year}>
                          <td className="num" style={{ fontWeight: 700, width: 60 }}>
                            {x.year}
                          </td>
                          <td>
                            {x.name ? (
                              x.f1 && driver(x.f1) ? (
                                <Link href={lp(lang, `/drivers/${x.f1}`)}>{x.name}</Link>
                              ) : (
                                x.name
                              )
                            ) : (
                              <span className="badge status-warn">{K.seasonPending}</span>
                            )}
                          </td>
                          <td className="small muted">{x.series ?? ""}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {graduates.length > 0 && (
                <div>
                  <p className="kicker" style={{ marginBottom: 12 }}>
                    {K.graduates}
                  </p>
                  <div className="flex-row" style={{ gap: 8 }}>
                    {graduates.map((g) => (
                      <Link key={g.year} href={lp(lang, `/drivers/${g.f1}`)} className="chip">
                        {g.name} · {driver(g.f1)!.first_}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="section-tight tone-paper">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: 12 }}>
            {prev ? (
              <Link href={lp(lang, `/categories/${prev.slug}`)} className="card" style={{ padding: 18 }}>
                <span className="caption">{K.previousStep}</span>
                <span className="card-title" style={{ color: prev.color }}>
                  {prev.name}
                </span>
              </Link>
            ) : (
              <span />
            )}
            <Link href={lp(lang, next ? `/categories/${next.slug}` : "/drivers?filter=active")} className="card" style={{ padding: 18 }}>
              <span className="caption">{K.nextStep}</span>
              <span className="card-title" style={{ color: next?.color ?? "var(--red)" }}>
                {next?.name ?? "Formula 1"}
              </span>
            </Link>
          </div>
          <div className="mt-m">
            <DataNotice title={t.status.legend}>
              {lang === "pt"
                ? "Textos editoriais. Os campeões listados são de conhecimento público e ainda não foram conferidos numa segunda fonte; temporadas não confirmadas aparecem como pendentes. Os links para a F1 vêm da F1DB."
                : "Editorial text. Listed champions are public record but have not yet been cross-checked against a second source; unconfirmed seasons are shown as pending. Links to F1 profiles come from F1DB."}
            </DataNotice>
          </div>
        </div>
      </section>
    </div>
  );
}
