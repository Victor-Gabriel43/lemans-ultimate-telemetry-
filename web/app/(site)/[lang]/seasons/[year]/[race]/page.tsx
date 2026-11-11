import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { lp, type Lang } from "@/lib/i18n/config";
import { fmt, getDict } from "@/lib/i18n/dict";
import { circuit, countryName, ctorName, driver, formatDate, formatNumber, gpName, race as getRace, raceStatus, season } from "@/lib/f1/db";
import { ResultsTable, posLabel } from "@/components/site/cards";
import { BlockHead, Breadcrumbs, DataNotice, LinkArrow, Plate, Specs, StatusBadge } from "@/components/site/ui";
import { raceHero } from "@/lib/f1/derive";
import { circuitPhoto } from "@/lib/f1/media";

export async function generateMetadata({ params }: PageProps<"/[lang]/seasons/[year]/[race]">): Promise<Metadata> {
  const { year, race } = await params;
  const r = getRace(Number(year), race);
  return r ? { title: `${gpName(r.gp)} ${year}`, description: r.name } : {};
}

export default async function RacePage({ params }: PageProps<"/[lang]/seasons/[year]/[race]">) {
  const { lang: l, year: y, race: slug } = await params;
  const lang = l as Lang;
  const t = getDict(lang);
  const year = Number(y);
  const r = getRace(year, slug);
  const sd = season(year);
  if (!r || !sd) notFound();
  const c = circuit(r.circuit);
  const layout = c?.layouts.find((x) => x.id === r.layout);
  const status = raceStatus(year, slug);
  const i = sd.races.findIndex((x) => x.slug === slug);
  const prev = sd.races[i - 1];
  const next = sd.races[i + 1];
  const winner = r.results.find((x) => x.pos === 1);
  const hero = raceHero(year, slug, winner);
  const heroPhoto = hero?.photo ?? (c ? circuitPhoto(c.id) : undefined);
  const heroCaption = hero?.chassisId ? `${hero.label} · ${driver(winner!.d)?.name ?? ""}` : hero ? `${year} ${gpName(r.gp)}` : c?.full;
  const others = (c?.editions ?? []).filter((e) => !(e.y === year && e.s === slug) && !e.scheduled).slice(-8).reverse();

  return (
    <>
      <section className="tone-paper" style={{ paddingTop: 28 }}>
        <div className="wrap">
          <Breadcrumbs lang={lang} items={[{ label: t.nav.seasons, href: "/seasons" }, { label: String(year), href: `/seasons/${year}` }, { label: gpName(r.gp) }]} />
          <div className="grid grid-2" style={{ padding: "clamp(40px,6vw,72px) 0", gap: "clamp(32px,6vw,80px)", alignItems: "center" }}>
            <div>
              <p className="eyebrow-f1">{fmt(t.race.eyebrow, { y: year, r: r.round })}</p>
              <h1 className="display balance" style={{ fontSize: "clamp(40px,6vw,80px)" }}>
                {gpName(r.gp)}
              </h1>
              <p className="lede mt-s">
                {formatDate(r.date, lang)} · {c ? <Link href={lp(lang, `/circuits/${c.id}`)}>{c.full}</Link> : r.circuit}
                {c ? `, ${countryName(c.country, lang)}` : ""}
              </p>
              <div className="flex-row mt-s" style={{ gap: 8 }}>
                <StatusBadge lang={lang} status={status} />
                {r.sprint && <span className="badge">{t.seasons.sprint}</span>}
              </div>
            </div>
            {layout?.svg && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={`/media/circuits/${layout.id}.svg`} alt={fmt(t.circuits.layoutDrawing, { id: layout.id })} className="layout-drawing" style={{ maxWidth: 380, justifySelf: "center", background: "var(--paper-2)" }} />
            )}
          </div>
          {heroPhoto && (
            <div style={{ paddingBottom: "clamp(40px,6vw,72px)" }}>
              <Plate lang={lang} alt={heroCaption ?? gpName(r.gp)} photo={heroPhoto} ratio="ratio-cinema" priority caption={hero?.chassisId ? <Link href={lp(lang, `/cars/${hero.chassisId}`)} className="inline-link">{heroCaption}</Link> : heroCaption} />
            </div>
          )}
        </div>
      </section>

      <section className="section-tight tone-off">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <Specs
              rows={[
                [t.race.officialName, r.name ?? gpName(r.gp)],
                [t.common.circuit, c ? <Link key="c" href={lp(lang, `/circuits/${c.id}`)} className="inline-link">{c.full}</Link> : r.circuit],
                [t.common.length, r.length ? `${formatNumber(r.length, lang, 3)} km` : "—"],
                [t.common.laps, r.laps ? String(r.laps) : "—"],
                [t.common.distance, r.distance ? `${formatNumber(r.distance, lang, 3)} km` : "—"],
              ]}
            />
            <Specs
              rows={[
                [t.common.winner, winner ? <Link key="w" href={lp(lang, `/drivers/${winner.d}`)} className="inline-link">{driver(winner.d)?.name}</Link> : "—"],
                [t.common.constructor, winner ? <Link key="wc" href={lp(lang, `/teams/${winner.c}`)} className="inline-link">{ctorName(winner.c)}</Link> : "—"],
                [t.common.pole, r.pole ? `${driver(r.pole.d)?.name ?? r.pole.d}${r.pole.time ? ` · ${r.pole.time}` : ""}` : "—"],
                [t.common.fastestLap, r.fastestLap ? `${driver(r.fastestLap.d)?.name ?? r.fastestLap.d}${r.fastestLap.time ? ` · ${r.fastestLap.time}` : ""}${r.fastestLap.lap ? ` (${t.common.laps.toLowerCase()} ${r.fastestLap.lap})` : ""}` : "—"],
              ]}
            />
          </div>
        </div>
      </section>

      <section className="section tone-paper">
        <div className="wrap-wide">
          <BlockHead eyebrow={t.common.grandPrix} title={t.race.resultsTitle} />
          {r.status === "completed" ? <ResultsTable rows={r.results} lang={lang} /> : <div className="pending">{t.race.notYet}</div>}
          {r.results.some((x) => typeof x.pos !== "number") && (
            <p className="caption mt-xs">
              {["DNF", "DNS", "DSQ", "NC", "DNQ", "DNPQ", "EX"]
                .filter((p) => r.results.some((x) => x.pos === p))
                .map((p) => `${p} = ${posLabel(p as "DNF", lang)}`)
                .join(" · ")}
            </p>
          )}

          {r.sprint && (
            <div className="mt-xl">
              <BlockHead eyebrow={t.seasons.sprint} title={t.race.sprintTitle} />
              <ResultsTable rows={r.sprint} lang={lang} />
            </div>
          )}

          {r.qualifying && r.qualifying.length > 0 && (
            <div className="mt-xl">
              <BlockHead eyebrow={t.common.grid} title={t.race.qualifyingTitle} />
              <div className="table-wrap">
                <table className="dtable compact">
                  <thead>
                    <tr>
                      <th scope="col">{t.common.position}</th>
                      <th scope="col">{t.common.driver}</th>
                      <th scope="col">{t.common.constructor}</th>
                      <th scope="col">Q1</th>
                      <th scope="col">Q2</th>
                      <th scope="col">Q3</th>
                      <th scope="col">{t.common.time}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {r.qualifying.map((q, k) => (
                      <tr key={`${q.d}-${k}`}>
                        <td className="pos-cell">{typeof q.pos === "number" ? q.pos : posLabel(q.pos, lang)}</td>
                        <td>
                          <Link href={lp(lang, `/drivers/${q.d}`)}>{driver(q.d)?.name ?? q.d}</Link>
                        </td>
                        <td className="small">{ctorName(q.c)}</td>
                        <td className="num small">{q.q1 ?? ""}</td>
                        <td className="num small">{q.q2 ?? ""}</td>
                        <td className="num small">{q.q3 ?? ""}</td>
                        <td className="num small">{q.time ?? ""}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {others.length > 0 && (
        <section className="section-tight tone-off">
          <div className="wrap">
            <p className="kicker" style={{ marginBottom: 12 }}>
              {t.race.otherEditions}
            </p>
            <div className="flex-row" style={{ gap: 8 }}>
              {others.map((e) => (
                <Link key={`${e.y}-${e.s}`} href={lp(lang, `/seasons/${e.y}/${e.s}`)} className="chip">
                  {e.y} · {driver(e.w)?.last ?? "—"}
                </Link>
              ))}
              {c && (
                <LinkArrow lang={lang} href={`/circuits/${c.id}#editions`}>
                  {t.common.seeAll}
                </LinkArrow>
              )}
            </div>
          </div>
        </section>
      )}

      <nav className="section-tight tone-paper" aria-label={t.common.grandPrix}>
        <div className="wrap flex-row space-between">
          {prev ? (
            <Link href={lp(lang, `/seasons/${year}/${prev.slug}`)} className="flex-row" style={{ gap: 8 }}>
              <ChevronLeft size={20} />
              <span>
                <span className="caption" style={{ display: "block" }}>
                  {t.race.prevRace}
                </span>
                <span className="title-3">{gpName(prev.gp)}</span>
              </span>
            </Link>
          ) : (
            <Link href={lp(lang, `/seasons/${year}`)} className="link-arrow">
              {fmt(t.race.allRaces, { y: year })}
            </Link>
          )}
          {next ? (
            <Link href={lp(lang, `/seasons/${year}/${next.slug}`)} className="flex-row" style={{ gap: 8, textAlign: "right" }}>
              <span>
                <span className="caption" style={{ display: "block" }}>
                  {t.race.nextRace}
                </span>
                <span className="title-3">{gpName(next.gp)}</span>
              </span>
              <ChevronRight size={20} />
            </Link>
          ) : (
            <Link href={lp(lang, `/seasons/${year}`)} className="link-arrow">
              {fmt(t.race.allRaces, { y: year })}
            </Link>
          )}
        </div>
        <div className="wrap mt-m">
          <DataNotice title={t.status.legend}>
            {lang === "pt" ? "Resultado: F1DB (CC BY 4.0); vencedor conferido com a API Jolpica." : "Result: F1DB (CC BY 4.0); winner cross-checked against the Jolpica API."}
          </DataNotice>
        </div>
      </nav>
    </>
  );
}
