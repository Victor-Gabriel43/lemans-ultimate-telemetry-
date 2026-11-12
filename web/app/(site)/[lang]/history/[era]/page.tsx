import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { lp, type Lang } from "@/lib/i18n/config";
import { fmt, getDict } from "@/lib/i18n/dict";
import { ERAS } from "@/lib/f1/eras";
import { era as getEra, eras, seasonHeadline } from "@/lib/f1/content";
import { chassis, ctor, ctorName, db, driver } from "@/lib/f1/db";
import { chassisPhoto, circuitPhoto } from "@/lib/f1/media";
import { KEY_RACES } from "@/lib/f1/history-races";
import { gpName, season as seasonData, circuit as getCircuit, formatDate } from "@/lib/f1/db";
import { championChassis, raceHero, winsInRange } from "@/lib/f1/derive";
import { CarCard, DriverCard } from "@/components/site/cards";
import { BlockHead, Breadcrumbs, LinkArrow, Milestones, Plate } from "@/components/site/ui";
import { LocalNav } from "@/components/site/LocalNav";

export function generateStaticParams() {
  return ERAS.map((e) => ({ era: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/history/[era]">): Promise<Metadata> {
  const { lang, era } = await params;
  const e = getEra(era, lang as Lang);
  return e ? { title: `${e.decade}: ${e.name}`, description: e.tagline } : {};
}

export default async function EraPage({ params }: PageProps<"/[lang]/history/[era]">) {
  const { lang: l, era: slug } = await params;
  const lang = l as Lang;
  const t = getDict(lang);
  const era = getEra(slug, lang);
  if (!era) notFound();
  const all = eras(lang);
  const idx = all.findIndex((e) => e.slug === slug);
  const prev = all[idx - 1];
  const next = all[idx + 1];

  const end = Math.min(era.end, db().meta.lastYear);
  const seasons = db().seasons.filter((s) => s.year >= era.start && s.year <= end);
  const { drivers: topDrivers, constructors: topCtors } = winsInRange(era.start, end);
  const champCars = [...new Set(seasons.map((s) => championChassis(s.year)).filter(Boolean) as string[])];
  const heroPhoto = champCars.map((c) => chassisPhoto(c)).find(Boolean);
  const decadeLabel = era.decade;
  const pt = lang === "pt";
  const keyRaces = (KEY_RACES[era.slug] ?? [])
    .map((k) => {
      const r = seasonData(k.year)?.races.find((x) => x.slug === k.slug);
      if (!r) return null;
      const w = r.results.find((x) => x.pos === 1);
      const hero = raceHero(k.year, k.slug, w);
      const c = getCircuit(r.circuit);
      return { ...k, r, w, photo: hero?.photo ?? (c ? circuitPhoto(c.id) : undefined), circuitName: c?.full ?? r.circuit };
    })
    .filter((x) => x !== null);
  const racesHeld = seasons.reduce((n, s) => n + s.completed, 0);
  const winnersCount = topDrivers.length;
  const champions = [...new Set(seasons.map((s) => s.champion).filter(Boolean))].map((id) => driver(id)?.last ?? id);
  const titlesIn = (id: string, kind: "d" | "c") => seasons.filter((s) => (kind === "d" ? s.champion === id : s.constructorChampion === id)).map((s) => s.year);

  return (
    <>
      <LocalNav
        lang={lang}
        title={era.decade}
        titleHref={`/history/${era.slug}`}
        links={[
          { label: t.history.sections.context, href: "#context" },
          { label: pt ? "Corridas" : "Races", href: "#races" },
          { label: t.history.sections.seasons, href: "#seasons" },
          { label: t.history.sections.technology, href: "#technology" },
          { label: t.history.sections.regulations, href: "#regulations" },
          { label: t.history.sections.rivalries, href: "#rivalries" },
          { label: t.history.sections.events, href: "#events" },
          { label: t.history.sections.people, href: "#people" },
          { label: t.history.sections.cars, href: "#cars" },
        ]}
      />

      <section className="tone-night" style={{ paddingTop: 28 }}>
        <div className="wrap">
          <Breadcrumbs lang={lang} items={[{ label: t.nav.history, href: "/history" }, { label: era.decade }]} />
          <div className="center" style={{ padding: "clamp(48px,8vw,96px) 0 clamp(36px,5vw,56px)" }}>
            <p className="eyebrow-f1 rise">
              {fmt(t.history.chapter, { n: idx + 1 })} · {era.start}–{Math.min(era.end, 2026)}
            </p>
            <h1 className="display balance rise rise-2">{era.name}</h1>
            <p className="lede mx-auto mt-m pretty rise rise-3" style={{ maxWidth: 720 }}>
              {era.tagline}
            </p>
          </div>
        </div>
        <div className="wrap-wide" style={{ paddingBottom: "clamp(56px,8vw,96px)" }}>
          <Plate lang={lang} alt={`${era.decade} — ${era.name}`} photo={heroPhoto} tone={era.tone} ratio="ratio-cinema" tag={era.themes.join(" · ")} glyph={era.decade} priority />
        </div>
      </section>

      <section className="section tone-paper" id="context">
        <div className="wrap-text">
          <p className="lede" style={{ color: "var(--ink)", fontWeight: 600 }}>
            {era.intro}
          </p>
          <div className="decade-numbers mt-l">
            <div>
              <span className="num">{racesHeld}</span>
              <span>{pt ? "Grandes Prêmios" : "Grands Prix"}</span>
            </div>
            <div>
              <span className="num">{winnersCount}</span>
              <span>{pt ? "pilotos vencedores" : "different winners"}</span>
            </div>
            {topDrivers[0] && (
              <div>
                <span className="num">{topDrivers[0][1]}</span>
                <span>
                  {pt ? "vitórias de" : "wins for"} {driver(topDrivers[0][0])?.name}
                </span>
              </div>
            )}
            {topCtors[0] && (
              <div>
                <span className="num">{topCtors[0][1]}</span>
                <span>
                  {pt ? "vitórias da" : "wins for"} {ctorName(topCtors[0][0])}
                </span>
              </div>
            )}
          </div>
          {champions.length > 0 && (
            <p className="small muted mt-s">
              {pt ? "Campeões da década" : "Champions of the decade"}: {champions.join(" · ")}
            </p>
          )}
          <div className="prose mt-l">
            <h3 style={{ marginTop: 0 }}>{t.history.contextTitle}</h3>
            {era.context.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* The races that defined the decade */}
      {keyRaces.length > 0 && (
        <section className="section tone-night" id="races">
          <div className="wrap-wide">
            <BlockHead eyebrow={pt ? "Corridas que definiram a década" : "The races that defined the decade"} title={pt ? "O que aconteceu na pista" : "What happened on track"} />
            <div className="key-races">
              {keyRaces.map((k) => (
                <article key={`${k.year}-${k.slug}`} className="key-race">
                  <Link href={lp(lang, `/seasons/${k.year}/${k.slug}`)} className="key-race-photo">
                    <Plate linked lang={lang} alt={`${k.year} ${gpName(k.r.gp, lang)}`} photo={k.photo} tone="graphite" ratio="ratio-wide" flat glyph={String(k.year)} glyphSize="sm" />
                  </Link>
                  <div className="key-race-body">
                    <p className="kicker">
                      {k.year} · {gpName(k.r.gp, lang)} · {formatDate(k.r.date, lang)}
                    </p>
                    <h3 className="title-2 mt-xs">{k.title[lang]}</h3>
                    <p className="mt-s" style={{ fontSize: 17, lineHeight: 1.6 }}>
                      {k.text[lang]}
                    </p>
                    <p className="small muted mt-s">
                      {k.circuitName}
                      {k.w ? ` · ${pt ? "Vencedor" : "Winner"}: ${driver(k.w.d)?.name ?? k.w.d}` : ""}
                    </p>
                    <Link href={lp(lang, `/seasons/${k.year}/${k.slug}`)} className="link-arrow mt-s">
                      {pt ? "Resultado completo" : "Full result"} <ChevronRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Important seasons — from the data */}
      <section className="section tone-off" id="seasons">
        <div className="wrap">
          <BlockHead
            eyebrow={t.history.importantSeasons}
            title={t.history.importantSeasonsTitle}
            action={
              <LinkArrow lang={lang} href={`/seasons?decade=${era.start}`}>
                {t.nav.seasons}
              </LinkArrow>
            }
          />
          <div className="table-wrap">
            <table className="dtable">
              <thead>
                <tr>
                  <th scope="col">{t.common.season}</th>
                  <th scope="col">{t.seasons.champion}</th>
                  <th scope="col">{t.seasons.constructorChampion}</th>
                  <th scope="col">{t.common.car}</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {seasons.map((s) => {
                  const ch = championChassis(s.year);
                  return (
                    <tr key={s.year}>
                      <td className="num" style={{ fontWeight: 700 }}>
                        <Link href={lp(lang, `/seasons/${s.year}`)}>{s.year}</Link>
                      </td>
                      <td>{s.champion ? <Link href={lp(lang, `/drivers/${s.champion}`)}>{driver(s.champion)?.name}</Link> : <span className="muted">{t.seasons.inProgress}</span>}</td>
                      <td>
                        {s.constructorChampion ? (
                          <Link href={lp(lang, `/teams/${s.constructorChampion}`)}>{ctorName(s.constructorChampion)}</Link>
                        ) : (
                          <span className="muted">{s.year < 1958 ? t.seasons.notAwarded : "—"}</span>
                        )}
                      </td>
                      <td>{ch ? <Link href={lp(lang, `/cars/${ch}`)}>{chassis(ch)?.full ?? ch}</Link> : "—"}</td>
                      <td className="muted small" style={{ minWidth: 240 }}>
                        {seasonHeadline(s.year, lang) ?? ""}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section tone-paper" id="technology">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <div>
              <p className="eyebrow-f1">{t.history.techEyebrow}</p>
              <h2 className="headline balance">{t.history.techTitle}</h2>
              <div className="flex-row mt-m" style={{ gap: 8 }}>
                {era.themes.map((x) => (
                  <span key={x} className="badge">
                    {x}
                  </span>
                ))}
              </div>
            </div>
            <div className="prose">
              {era.technology.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p>
                <LinkArrow lang={lang} href="/engineering">
                  {t.nav.engineering}
                </LinkArrow>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section tone-off" id="regulations">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <div>
              <p className="eyebrow-f1">{t.history.regEyebrow}</p>
              <h2 className="title-1 balance">{t.history.regTitle}</h2>
              <p className="mt-m">
                <LinkArrow lang={lang} href="/regulations/history">
                  {t.nav.regulations}
                </LinkArrow>
              </p>
            </div>
            <Milestones lang={lang} items={era.regulationChanges} linkYears />
          </div>
        </div>
      </section>

      <section className="section tone-night" id="rivalries">
        <div className="wrap">
          <p className="eyebrow-f1">{t.history.rivalriesEyebrow}</p>
          <h2 className="title-1 balance">{t.history.rivalriesTitle}</h2>
          <div className="grid grid-3 mt-m">
            {era.rivalries.map((r) => (
              <div key={r.title} className="tile">
                <div className="tile-body">
                  <p className="title-3">{r.title}</p>
                  <p className="small muted pretty">{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section tone-paper" id="events">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <div>
              <p className="eyebrow-f1">{t.history.eventsEyebrow}</p>
              <h2 className="headline balance">{t.history.eventsTitle}</h2>
            </div>
            <Milestones lang={lang} items={era.developments} linkYears />
          </div>
        </div>
      </section>

      <section className="section tone-off" id="people">
        <div className="wrap-wide">
          <BlockHead
            eyebrow={t.history.driversEyebrow}
            title={fmt(t.history.driversTitle, { d: decadeLabel })}
            action={
              <LinkArrow lang={lang} href={`/drivers`}>
                {t.drivers.metaTitle}
              </LinkArrow>
            }
          />
          <p className="caption" style={{ marginTop: -12, marginBottom: 20 }}>
            {t.history.driversNote}
          </p>
          <div className="grid grid-4 keep-2">
            {topDrivers.slice(0, 8).map(([id, w]) => {
              const d = driver(id)!;
              const titles = titlesIn(id, "d");
              return <DriverCard key={id} d={d} lang={lang} note={`${fmt(t.history.winsInDecade, { n: w })}${titles.length ? ` · ${titles.join(", ")}` : ""}`} />;
            })}
          </div>

          <div className="mt-xl">
            <BlockHead eyebrow={t.history.teamsEyebrow} title={fmt(t.history.teamsTitle, { d: decadeLabel })} />
            <div className="table-wrap">
              <table className="dtable">
                <thead>
                  <tr>
                    <th scope="col">{t.common.constructor}</th>
                    <th scope="col" className="r">
                      {t.common.wins}
                    </th>
                    <th scope="col">{t.history.titlesInDecade}</th>
                  </tr>
                </thead>
                <tbody>
                  {topCtors.slice(0, 8).map(([id, w]) => (
                    <tr key={id}>
                      <td style={{ fontWeight: 600 }}>
                        <Link href={lp(lang, `/teams/${id}`)}>{ctor(id)?.name ?? id}</Link>
                      </td>
                      <td className="r num">{w}</td>
                      <td className="num small">
                        {titlesIn(id, "c").map((y, i, a) => (
                          <span key={y}>
                            <Link href={lp(lang, `/seasons/${y}`)}>{y}</Link>
                            {i < a.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {champCars.length > 0 && (
        <section className="section tone-paper" id="cars">
          <div className="wrap-wide">
            <BlockHead
              eyebrow={t.history.carsEyebrow}
              title={fmt(t.history.carsTitle, { d: decadeLabel })}
              action={
                <LinkArrow lang={lang} href="/teams">
                  {t.nav.teams}
                </LinkArrow>
              }
            />
            <div className="grid grid-4 keep-2">
              {champCars.map((id) => (
                <CarCard key={id} ch={chassis(id)!} lang={lang} />
              ))}
            </div>
          </div>
        </section>
      )}

      <nav className="section-tight tone-off" aria-label={t.history.eyebrow}>
        <div className="wrap flex-row space-between">
          {prev ? (
            <Link href={lp(lang, `/history/${prev.slug}`)} className="flex-row" style={{ gap: 8 }}>
              <ChevronLeft size={20} />
              <span>
                <span className="caption" style={{ display: "block" }}>
                  {t.history.prevEra}
                </span>
                <span className="title-3">
                  {prev.decade} — {prev.name}
                </span>
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={lp(lang, `/history/${next.slug}`)} className="flex-row" style={{ gap: 8, textAlign: "right" }}>
              <span>
                <span className="caption" style={{ display: "block" }}>
                  {t.history.nextEra}
                </span>
                <span className="title-3">
                  {next.decade} — {next.name}
                </span>
              </span>
              <ChevronRight size={20} />
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
