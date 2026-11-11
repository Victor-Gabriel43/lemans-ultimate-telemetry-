import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { lp, type Lang } from "@/lib/i18n/config";
import { fmt, getDict } from "@/lib/i18n/dict";
import { chassis, chassisName, circuit, ctor, ctorName, db, driver, engine, engineMfrName, entrantName, formatDate, gpName, season, seasonStatus, tyreName } from "@/lib/f1/db";
import { eraForYear, pointsFor, pointsNotes, seasonHeadline } from "@/lib/f1/content";
import { chassisPhoto, driverPhoto } from "@/lib/f1/media";
import { championChassis } from "@/lib/f1/derive";
import { docsForYear } from "@/lib/f1/regs";
import { CarCard } from "@/components/site/cards";
import { BlockHead, Breadcrumbs, DataNotice, LinkArrow, Plate, StatusBadge } from "@/components/site/ui";
import { LocalNav } from "@/components/site/LocalNav";
import { YearJump } from "@/components/site/YearJump";

export function generateStaticParams() {
  return db().seasons.map((s) => ({ year: String(s.year) }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/seasons/[year]">): Promise<Metadata> {
  const { lang, year } = await params;
  const t = getDict(lang as Lang);
  return { title: fmt(t.seasons.seasonN, { y: year }), description: seasonHeadline(Number(year), lang as Lang) };
}

const ordinal = (n: number, lang: Lang) => {
  if (lang === "pt") return `${n}º`;
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

export default async function SeasonPage({ params }: PageProps<"/[lang]/seasons/[year]">) {
  const { lang: l, year: y } = await params;
  const lang = l as Lang;
  const t = getDict(lang);
  const S = t.seasons;
  const year = Number(y);
  const sum = db().seasons.find((s) => s.year === year);
  const sd = season(year);
  if (!sum || !sd) notFound();

  const era = eraForYear(year, lang);
  const live = sum.status === "in-progress";
  const status = seasonStatus(year);
  const champ = driver(sum.champion);
  const cchamp = ctor(sum.constructorChampion);
  const leader = driver(sum.leader);
  const number = year - db().meta.firstYear + 1;
  const points = pointsFor(year);
  const champTeam = champ ? ctorName([...new Set(sd.races.flatMap((r) => r.results.filter((x) => x.d === champ.id).map((x) => x.c)))][0]) : undefined;
  const allChassis = [...new Set(sd.entrants.flatMap((e) => e.chassis))].map((id) => chassis(id)!).filter(Boolean);
  const champCar = championChassis(year);
  const events = era.developments.filter((d) => d.year === String(year));
  const regChanges = era.regulationChanges.filter((d) => d.year === String(year));
  const regDocs = docsForYear(year);
  const years = db().seasons.map((s) => s.year);
  const champPhoto = champ ? driverPhoto(champ.id) : undefined;
  const carPhoto = champCar ? chassisPhoto(champCar) : undefined;

  // entrants grouped by constructor
  const byCtor = new Map<string, typeof sd.entrants>();
  sd.entrants.forEach((e) => byCtor.set(e.c, [...(byCtor.get(e.c) ?? []), e]));

  return (
    <>
      <LocalNav
        lang={lang}
        title={fmt(S.seasonN, { y: year })}
        titleHref={`/seasons/${year}`}
        links={[
          { label: S.sections.overview, href: "#overview" },
          { label: S.sections.calendar, href: "#calendar" },
          { label: S.sections.drivers, href: "#drivers" },
          { label: S.sections.constructors, href: "#constructors" },
          { label: S.sections.entrants, href: "#entrants" },
          { label: S.sections.cars, href: "#cars" },
          { label: S.sections.regulations, href: "#regulations" },
          { label: S.sections.context, href: "#context" },
        ]}
      />

      {/* 1 · Overview */}
      <section className="tone-paper" style={{ paddingTop: 28 }} id="overview">
        <div className="wrap">
          <div className="flex-row space-between">
            <Breadcrumbs lang={lang} items={[{ label: t.nav.seasons, href: "/seasons" }, { label: `${era.decade}`, href: `/seasons?decade=${era.start}` }, { label: String(year) }]} />
            <YearJump lang={lang} year={year} years={years} base="/seasons" label={S.chooseSeason} />
          </div>
          <div className="grid grid-2" style={{ marginTop: "clamp(36px,6vw,72px)", gap: "clamp(32px,5vw,72px)", alignItems: "end" }}>
            <div>
              <p className="eyebrow-f1">
                {fmt(S.ordinal, { n: ordinal(number, lang) })} · <Link href={lp(lang, `/history/${era.slug}`)}>{era.name}</Link>
              </p>
              <h1 className="display num" style={{ fontSize: "clamp(80px,14vw,180px)", lineHeight: 0.9 }}>
                {year}
              </h1>
              <div className="flex-row mt-s" style={{ gap: 8 }}>
                <StatusBadge lang={lang} status={live ? "provisional" : status} />
                <span className="badge">{live ? fmt(t.home.currentProgress, { done: sum.completed, total: sum.rounds }) : `${sum.rounds} ${t.common.rounds.toLowerCase()}`}</span>
                {sum.sprints > 0 && <span className="badge">{sum.sprints} sprints</span>}
              </div>
            </div>
            <p className="lede pretty">{seasonHeadline(year, lang) ?? era.tagline}</p>
          </div>

          <div className="grid grid-2 mt-l" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <div className="prose">
              <p className="eyebrow-f1" style={{ fontSize: 17 }}>
                {S.overviewEyebrow}
              </p>
              <p>
                {fmt(S.overviewText1, { y: year, verb: live ? S.verbIs : S.verbWas, n: ordinal(number, lang), rounds: sum.rounds, drivers: sum.drivers, teams: sum.constructors })}
              </p>
              {champ ? (
                <p>
                  {fmt(S.overviewChampion, { driver: champ.name, team: champTeam ?? "" })} {year < 1958 ? S.overviewNoConstructor : cchamp ? fmt(S.overviewConstructor, { team: cchamp.name }) : ""}
                </p>
              ) : (
                <p>{fmt(S.overviewProvisional, { done: sum.completed, total: sum.rounds })}</p>
              )}
            </div>
            <div className="grid grid-2 keep-2" style={{ gap: 16 }}>
              <div className="tile" style={{ background: "var(--paper-2)" }}>
                <div className="tile-body">
                  <p className="kicker">{live ? S.leaderProvisional : S.champion}</p>
                  <p className="title-2">{(champ ?? leader) ? <Link href={lp(lang, `/drivers/${(champ ?? leader)!.id}`)}>{(champ ?? leader)!.name}</Link> : "—"}</p>
                  <p className="small muted">
                    {sd.driverStandings[0]?.pts} {t.common.points.toLowerCase()}
                  </p>
                </div>
              </div>
              <div className="tile" style={{ background: "var(--paper-2)" }}>
                <div className="tile-body">
                  <p className="kicker">{S.constructorChampion}</p>
                  <p className="title-2">
                    {year < 1958 ? S.notAwarded : (cchamp ?? ctor(sum.constructorLeader)) ? <Link href={lp(lang, `/teams/${(cchamp ?? ctor(sum.constructorLeader))!.id}`)}>{(cchamp ?? ctor(sum.constructorLeader))!.name}</Link> : "—"}
                  </p>
                  <p className="small muted">{year >= 1958 ? `${sd.constructorStandings[0]?.pts ?? "—"} ${t.common.points.toLowerCase()}` : ""}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Photography: the champion and the car, when licensed images exist */}
        {(champPhoto || carPhoto) && (
          <div className="wrap" style={{ paddingTop: 40 }}>
            <div className="grid grid-2">
              {champPhoto && champ && <Plate lang={lang} alt={champ.name} photo={champPhoto} ratio="ratio-photo" position="center 25%" caption={champ.name} />}
              {carPhoto && champCar && <Plate lang={lang} alt={chassisName(champCar)} photo={carPhoto} ratio="ratio-photo" caption={chassisName(champCar)} />}
            </div>
          </div>
        )}
        <div style={{ height: "clamp(48px,7vw,80px)" }} />
      </section>

      {/* 3–5 · Calendar, Grands Prix and race results */}
      <section className="section tone-off" id="calendar">
        <div className="wrap-wide">
          <BlockHead eyebrow={S.calendarEyebrow} title={fmt(S.calendarTitle, { y: year })} />
          <div className="table-wrap">
            <table className="dtable compact">
              <thead>
                <tr>
                  <th scope="col">{t.common.round}</th>
                  <th scope="col">{t.common.date}</th>
                  <th scope="col">{t.common.grandPrix}</th>
                  <th scope="col">{t.common.circuit}</th>
                  <th scope="col">{t.common.winner}</th>
                  <th scope="col">{t.common.constructor}</th>
                  <th scope="col">{t.common.pole}</th>
                  <th scope="col">{t.common.status}</th>
                </tr>
              </thead>
              <tbody>
                {sd.races.map((r) => {
                  const w = r.results.find((x) => x.pos === 1);
                  const c = circuit(r.circuit);
                  return (
                    <tr key={r.slug}>
                      <td className="num">{r.round}</td>
                      <td className="num small">{formatDate(r.date, lang, { day: "numeric", month: "short" })}</td>
                      <td style={{ fontWeight: 600 }}>
                        <Link href={lp(lang, `/seasons/${year}/${r.slug}`)}>{gpName(r.gp)}</Link>
                        {r.sprint && <span className="badge" style={{ marginLeft: 6 }}>{S.sprint}</span>}
                      </td>
                      <td className="small">{c ? <Link href={lp(lang, `/circuits/${c.id}`)}>{c.name}</Link> : r.circuit}</td>
                      <td>{w ? <Link href={lp(lang, `/drivers/${w.d}`)}>{driver(w.d)?.name}</Link> : "—"}</td>
                      <td className="small">{w ? <Link href={lp(lang, `/teams/${w.c}`)}>{ctorName(w.c)}</Link> : "—"}</td>
                      <td className="small">{r.pole ? <Link href={lp(lang, `/drivers/${r.pole.d}`)}>{driver(r.pole.d)?.last}</Link> : "—"}</td>
                      <td>
                        <span className={`badge ${r.status === "completed" ? "" : "status-warn"}`}>{r.status === "completed" ? S.completedRace : S.scheduledRace}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6 · Drivers' standings */}
      <section className="section tone-paper" id="drivers">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(24px,4vw,48px)", alignItems: "start" }}>
            <div>
              <div className="flex-row" style={{ marginBottom: 16 }}>
                <h2 className="title-2">{live ? S.driverStandingsProvisional : S.driverStandingsFinal}</h2>
                {live && <StatusBadge lang={lang} status="provisional" />}
              </div>
              <div className="table-wrap">
                <table className="dtable compact">
                  <thead>
                    <tr>
                      <th scope="col">{t.common.position}</th>
                      <th scope="col">{t.common.driver}</th>
                      <th scope="col" className="r">
                        {t.common.points}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sd.driverStandings.map((s) => (
                      <tr key={s.d}>
                        <td className={`pos-cell ${s.pos === 1 ? "pos-1" : ""}`}>{s.pos}</td>
                        <td>
                          <Link href={lp(lang, `/drivers/${s.d}`)} style={{ fontWeight: s.pos <= 3 ? 600 : 400 }}>
                            {driver(s.d)?.name ?? s.d}
                          </Link>
                        </td>
                        <td className="r num">{s.pts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {year < 1991 && <p className="caption mt-xs">{t.drivers.pointsNote}</p>}
            </div>

            {/* 7 · Constructors' standings */}
            <div id="constructors">
              <div className="flex-row" style={{ marginBottom: 16 }}>
                <h2 className="title-2">{live ? S.constructorStandingsProvisional : S.constructorStandingsFinal}</h2>
                {live && year >= 1958 && <StatusBadge lang={lang} status="provisional" />}
              </div>
              {year < 1958 ? (
                <div className="pending">
                  <p>{S.noConstructorStandings}</p>
                </div>
              ) : (
                <div className="table-wrap">
                  <table className="dtable compact">
                    <thead>
                      <tr>
                        <th scope="col">{t.common.position}</th>
                        <th scope="col">{t.common.constructor}</th>
                        <th scope="col">{t.common.engine}</th>
                        <th scope="col" className="r">
                          {t.common.points}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sd.constructorStandings.map((s) => (
                        <tr key={`${s.c}-${s.e}`}>
                          <td className={`pos-cell ${s.pos === 1 ? "pos-1" : ""}`}>{s.pos}</td>
                          <td>
                            <Link href={lp(lang, `/teams/${s.c}`)} style={{ fontWeight: s.pos <= 3 ? 600 : 400 }}>
                              {ctorName(s.c)}
                            </Link>
                          </td>
                          <td className="small muted">{s.e ? engineMfrName(s.e) : ""}</td>
                          <td className="r num">{s.pts}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Points system */}
              {points && (
                <div className="tile mt-m" style={{ background: "var(--paper-2)" }}>
                  <div className="tile-body">
                    <p className="kicker">{S.pointsSystem}</p>
                    <p className="small muted">{S.pointsNote}</p>
                    <p className="num" style={{ fontWeight: 600, letterSpacing: "0.02em" }}>
                      {points.points.join(" · ")}
                    </p>
                    <ul className="small muted" style={{ paddingLeft: 18, listStyle: "disc" }}>
                      {pointsNotes(year, lang).map((n) => (
                        <li key={n}>{n}</li>
                      ))}
                    </ul>
                    <LinkArrow lang={lang} href="/learn/how-points-work" className="small">
                      {t.learn.metaTitle}
                    </LinkArrow>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 8–9 · Participating drivers and teams */}
      <section className="section tone-off" id="entrants">
        <div className="wrap-wide">
          <BlockHead eyebrow={S.entrantsEyebrow} title={fmt(S.entrantsTitle, { y: year })} />
          <div className="table-wrap">
            <table className="dtable compact">
              <thead>
                <tr>
                  <th scope="col">{t.common.constructor}</th>
                  <th scope="col">{S.entrant}</th>
                  <th scope="col">{S.chassisCol}</th>
                  <th scope="col">{S.engineCol}</th>
                  <th scope="col">{S.tyreCol}</th>
                  <th scope="col">{t.common.drivers}</th>
                </tr>
              </thead>
              <tbody>
                {[...byCtor.entries()].flatMap(([c, list]) =>
                  list.map((e, i) => (
                    <tr key={`${c}-${e.entrant}-${i}`}>
                      <td style={{ fontWeight: 600 }}>{i === 0 ? <Link href={lp(lang, `/teams/${c}`)}>{ctorName(c)}</Link> : ""}</td>
                      <td className="small">{entrantName(e.entrant)}</td>
                      <td className="small">
                        {e.chassis.map((ch, k) => (
                          <span key={ch}>
                            <Link href={lp(lang, `/cars/${ch}`)}>{chassis(ch)?.name ?? ch}</Link>
                            {k < e.chassis.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </td>
                      <td className="small muted">{e.engines.map((x) => engine(x)?.full ?? engineMfrName(e.e)).join(", ") || engineMfrName(e.e)}</td>
                      <td className="small muted">{tyreName(e.tyre) ?? ""}</td>
                      <td className="small">
                        {e.drivers
                          .filter((x) => !x.test)
                          .map((x, k, a) => (
                            <span key={x.d}>
                              <Link href={lp(lang, `/drivers/${x.d}`)}>{driver(x.d)?.name ?? x.d}</Link>
                              {k < a.length - 1 ? ", " : ""}
                            </span>
                          ))}
                      </td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 10 · Cars */}
      <section className="section tone-paper" id="cars">
        <div className="wrap-wide">
          <BlockHead
            eyebrow={S.carsEyebrow}
            title={fmt(S.carsTitle, { y: year })}
            action={
              <LinkArrow lang={lang} href={`/cars?by=season&v=${year}`}>
                {t.nav.cars}
              </LinkArrow>
            }
          />
          {champCar && (
            <div className="grid grid-4 keep-2" style={{ marginBottom: 20 }}>
              <CarCard ch={chassis(champCar)!} lang={lang} />
            </div>
          )}
          <div className="flex-row" style={{ gap: 8 }}>
            {allChassis.map((ch) => (
              <Link key={ch.id} href={lp(lang, `/cars/${ch.id}`)} className="chip">
                {chassisName(ch.id)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 11 · Regulations */}
      <section className="section tone-off" id="regulations">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <div>
              <p className="eyebrow-f1">{S.regEyebrow}</p>
              <h2 className="title-1">{fmt(S.regTitle, { y: year })}</h2>
              {regChanges.length > 0 && (
                <ul className="mt-m" style={{ display: "grid", gap: 12 }}>
                  {regChanges.map((r) => (
                    <li key={r.title} className="tile" style={{ background: "var(--paper)" }}>
                      <div className="tile-body" style={{ padding: "16px 20px" }}>
                        <span className="title-3">{r.title}</span>
                        <span className="small muted">{r.text}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <p className="kicker" style={{ marginBottom: 12 }}>
                {fmt(S.regDocs, { y: year })}
              </p>
              {regDocs.length ? (
                <ul style={{ display: "grid", gap: 8 }}>
                  {[...new Map(regDocs.map((d) => [d.kind, d])).values()].map((d) => (
                    <li key={d.id}>
                      <Link href={lp(lang, `/regulations/archive/${year}/${d.id}`)} className="card" style={{ padding: "14px 18px" }}>
                        <span style={{ fontWeight: 600 }}>{t.regulations.sectionNames[d.kind]}</span>
                        <span className="caption">{d.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="pending">
                  <p>{fmt(S.regNoDocs, { y: year })}</p>
                  <LinkArrow lang={lang} href={`/regulations/archive/${year}`}>
                    {t.regulations.openArchive}
                  </LinkArrow>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2 · Historical context and 12 · important events */}
      <section className="section tone-night" id="context">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <div>
              <p className="eyebrow-f1">{S.contextEyebrow}</p>
              <h2 className="title-1 balance">{fmt(S.contextTitle, { y: year, era: era.name.toLowerCase() })}</h2>
              <p className="muted mt-s">{era.context[0]}</p>
              <p className="mt-m">
                <LinkArrow lang={lang} href={`/history/${era.slug}`}>
                  {fmt(S.readEra, { d: era.decade })}
                </LinkArrow>
              </p>
            </div>
            <div>
              <p className="kicker" style={{ marginBottom: 16 }}>
                {S.eventsTitle}
              </p>
              {events.length > 0 ? (
                <ol className="milestones">
                  {events.map((m) => (
                    <li key={m.title} className="milestone">
                      <p className="milestone-year">{m.year}</p>
                      <p className="milestone-title">{m.title}</p>
                      <p className="milestone-text">{m.text}</p>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="muted">{era.technology[0]}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight tone-paper">
        <div className="wrap">
          <DataNotice title={t.status.legend}>
            {lang === "pt"
              ? `Resultados e classificações: F1DB (CC BY 4.0). ${live ? "Temporada em andamento — classificações provisórias." : status === "cross-checked" ? "Campeões e vencedores conferidos com a API Jolpica." : ""}`
              : `Results and standings: F1DB (CC BY 4.0). ${live ? "Season in progress — standings are provisional." : status === "cross-checked" ? "Champions and winners cross-checked against the Jolpica API." : ""}`}{" "}
            <Link href={lp(lang, "/about#data")} className="inline-link">
              {t.footer.dataLink}
            </Link>
          </DataNotice>
        </div>
      </section>
    </>
  );
}
