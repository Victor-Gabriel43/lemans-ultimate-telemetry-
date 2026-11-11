import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { eraForYear } from "@/lib/f1/eras";
import { FIRST_YEAR, LAST_YEAR, SEASONS, getSeason, pointsFor } from "@/lib/f1/seasons";
import { getDriver } from "@/lib/f1/drivers";
import { getTeam } from "@/lib/f1/teams";
import { carsForYear } from "@/lib/f1/cars";
import { CarCard, DriverCard, TeamCard } from "@/components/site/cards";
import { Breadcrumbs, DataNotice, LinkArrow, Pending, Plate } from "@/components/site/ui";
import { LocalNav } from "@/components/site/LocalNav";
import { SeasonJump } from "@/components/site/SeasonJump";

export function generateStaticParams() {
  return SEASONS.map((s) => ({ year: String(s.year) }));
}

export async function generateMetadata({ params }: PageProps<"/seasons/[year]">): Promise<Metadata> {
  const { year } = await params;
  const s = getSeason(Number(year));
  return s ? { title: `${s.year} Formula 1 season`, description: s.headline ?? `The ${s.year} Formula One World Championship.` } : {};
}

const ordinal = (n: number) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

export default async function SeasonPage({ params }: PageProps<"/seasons/[year]">) {
  const { year: y } = await params;
  const year = Number(y);
  const season = getSeason(year);
  if (!season) notFound();

  const era = eraForYear(year);
  const c = season.champions;
  const champion = c?.driverSlug ? getDriver(c.driverSlug) : undefined;
  const team = c?.constructorSlug ? getTeam(c.constructorSlug) : undefined;
  const cars = carsForYear(year);
  const points = pointsFor(year);
  const moments = era.developments.filter((d) => d.year === String(year));
  const number = year - FIRST_YEAR + 1;

  return (
    <>
      <LocalNav
        title={`${year} Season`}
        titleHref={`/seasons/${year}`}
        links={[
          { label: "Overview", href: "#overview" },
          { label: "Championship", href: "#championship" },
          { label: "Calendar", href: "#calendar" },
          { label: "Drivers", href: "#drivers" },
          { label: "Constructors", href: "#constructors" },
          { label: "Cars", href: "#cars" },
          { label: "Context", href: "#context" },
        ]}
      />

      <section className="tone-paper" style={{ paddingTop: 28 }} id="overview">
        <div className="wrap">
          <div className="flex-row space-between">
            <Breadcrumbs items={[{ label: "Seasons", href: "/seasons" }, { label: era.decade, href: `/seasons?decade=${era.start}` }, { label: String(year) }]} />
            <SeasonJump year={year} first={FIRST_YEAR} last={LAST_YEAR} />
          </div>
          <div className="grid grid-2" style={{ marginTop: "clamp(36px,6vw,72px)", gap: "clamp(32px,5vw,72px)", alignItems: "end" }}>
            <div>
              <p className="eyebrow-f1">
                The {ordinal(number)} World Championship · <Link href={`/history/${era.slug}`}>{era.name}</Link>
              </p>
              <h1 className="display num" style={{ fontSize: "clamp(80px,14vw,180px)", lineHeight: 0.9 }}>
                {year}
              </h1>
            </div>
            <p className="lede pretty">{season.headline ?? era.tagline}</p>
          </div>
        </div>
        <div className="wrap" style={{ paddingTop: "clamp(36px,5vw,56px)", paddingBottom: "clamp(56px,8vw,96px)" }}>
          <Plate alt={`The ${year} Formula One season`} mediaId={`season-${year}`} tone={era.tone} ratio="ratio-cinema" tag={season.status === "in-progress" ? "Season in progress" : `${year} season`} glyph={String(year)} priority />
        </div>
      </section>

      {/* Introduction & champions */}
      <section className="section tone-off" id="championship">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <div className="prose">
              <p className="eyebrow-f1">Season introduction</p>
              <p>
                The {year} season {season.status === "in-progress" ? "is" : "was"} the <strong>{ordinal(number)}</strong> running of the FIA Formula One World Championship and part of
                the era we call <Link href={`/history/${era.slug}`}>{era.name.toLowerCase()}</Link>.
                {season.headline ? ` ${season.headline}` : ""}
              </p>
              {c ? (
                <p>
                  {champion ? <Link href={`/drivers/${champion.slug}`}>{c.driver}</Link> : <strong>{c.driver}</strong>} won the drivers’
                  championship driving for {c.driverTeam}.{" "}
                  {year < 1958
                    ? "There was no constructors’ championship yet — it was introduced in 1958."
                    : c.constructor
                      ? `${c.constructor} won the constructors’ championship.`
                      : ""}
                </p>
              ) : (
                <p>
                  This season is in progress. Its results will be added once they have been verified against official sources. Read
                  about the <Link href="/technology/technical-regulations">new technical regulations</Link> introduced this year.
                </p>
              )}
            </div>

            <div>
              <div className="grid grid-2 keep-2" style={{ gap: 16 }}>
                <div className="tile" style={{ background: "var(--paper)" }}>
                  <div className="tile-body">
                    <p className="kicker">Drivers’ champion</p>
                    <p className="title-2">{c?.driver ?? "To be decided"}</p>
                    <p className="small muted">{c ? c.driverTeam : "Season in progress"}</p>
                  </div>
                </div>
                <div className="tile" style={{ background: "var(--paper)" }}>
                  <div className="tile-body">
                    <p className="kicker">Constructors’ champion</p>
                    <p className="title-2">{c?.constructor ?? (year < 1958 ? "Not awarded" : "To be decided")}</p>
                    <p className="small muted">{year < 1958 ? "Introduced in 1958" : c ? "Champion constructor" : "Season in progress"}</p>
                  </div>
                </div>
              </div>

              {points && (
                <div className="tile mt-s" style={{ background: "var(--paper)" }}>
                  <div className="tile-body">
                    <p className="kicker">Championship structure</p>
                    <p className="small muted">Grand Prix points by finishing position</p>
                    <div className="table-wrap" style={{ border: 0, marginTop: 8 }}>
                      <table className="dtable num" style={{ fontSize: 14 }}>
                        <thead>
                          <tr>
                            <th scope="row">Pos.</th>
                            {points.points.map((_, i) => (
                              <th key={i} scope="col" style={{ textAlign: "center", padding: "8px 6px" }}>
                                {i + 1}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row" style={{ position: "static" }}>
                              Pts
                            </th>
                            {points.points.map((p, i) => (
                              <td key={i} style={{ textAlign: "center", padding: "8px 6px", fontWeight: 600 }}>
                                {p}
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <ul className="small muted" style={{ marginTop: 8, paddingLeft: 18, listStyle: "disc" }}>
                      {points.notes.map((n) => (
                        <li key={n}>{n}</li>
                      ))}
                    </ul>
                    <LinkArrow href="/learn/how-points-work" className="small mt-xs">
                      How points work
                    </LinkArrow>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Calendar & Grands Prix */}
      <section className="section tone-paper" id="calendar">
        <div className="wrap">
          <p className="eyebrow-f1">Calendar & Grands Prix</p>
          <h2 className="title-1">The {year} calendar.</h2>
          <div className="grid grid-2 mt-m">
            <Pending title="Race calendar">
              Rounds, dates and venues for {year} will be published from verified records. Meanwhile, explore the{" "}
              <Link href="/circuits" className="inline-link">
                circuit archive
              </Link>
              .
            </Pending>
            <Pending title="Grand Prix results">
              Winners, pole positions and podiums for every Grand Prix of {year}, each with its own race page.
            </Pending>
          </div>
        </div>
      </section>

      {/* Drivers */}
      <section className="section tone-off" id="drivers">
        <div className="wrap">
          <p className="eyebrow-f1">Drivers</p>
          <h2 className="title-1">Who raced in {year}.</h2>
          <div className="grid grid-3 mt-m">
            {champion && (
              <div>
                <p className="kicker" style={{ marginBottom: 10 }}>
                  World champion
                </p>
                <DriverCard d={champion} />
              </div>
            )}
            <div className={champion ? "span-2" : "span-all"}>
              <p className="kicker" style={{ marginBottom: 10 }}>
                Entry list & standings
              </p>
              <Pending title="Drivers’ standings">
                The complete entry list and final drivers’ standings for {year} arrive with verified data.
              </Pending>
            </div>
          </div>
        </div>
      </section>

      {/* Constructors */}
      <section className="section tone-paper" id="constructors">
        <div className="wrap">
          <p className="eyebrow-f1">Constructors</p>
          <h2 className="title-1">The teams of {year}.</h2>
          <div className="grid grid-3 mt-m">
            {team && (
              <div>
                <p className="kicker" style={{ marginBottom: 10 }}>
                  Constructors’ champion
                </p>
                <TeamCard t={team} />
              </div>
            )}
            <div className={team ? "span-2" : "span-all"}>
              <p className="kicker" style={{ marginBottom: 10 }}>
                Standings
              </p>
              <Pending title="Constructors’ standings">
                {year < 1958
                  ? "No constructors’ championship was held before 1958. A list of the season’s entrants will be added."
                  : `Final constructors’ standings for ${year} arrive with verified data.`}
              </Pending>
            </div>
          </div>
        </div>
      </section>

      {/* Cars */}
      <section className="section tone-off" id="cars">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow-f1">Cars</p>
              <h2 className="title-1">Machines of {year}.</h2>
            </div>
            <LinkArrow href="/cars">The car archive</LinkArrow>
          </div>
          {cars.length ? (
            <div className="grid grid-3">
              {cars.map((car) => (
                <CarCard key={car.slug} c={car} />
              ))}
            </div>
          ) : (
            <Pending title={`No ${year} car profiles yet`}>
              The car archive is growing. Profiles for the cars of {year} will be added alongside verified technical specifications.
            </Pending>
          )}
        </div>
      </section>

      {/* Context */}
      <section className="section tone-night" id="context">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <div>
              <p className="eyebrow-f1">Historical context</p>
              <h2 className="title-1 balance">
                {year} in the story of {era.name.toLowerCase()}.
              </h2>
              <p className="muted mt-s">{era.context[0]}</p>
              <p className="mt-m">
                <LinkArrow href={`/history/${era.slug}`}>Read the {era.decade} chapter</LinkArrow>
              </p>
            </div>
            <div>
              {moments.length > 0 ? (
                <ol className="milestones">
                  {moments.map((m) => (
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
          <DataNotice title="Data status">
            Season introductions and champions are editorial references. Calendars, results, standings and entry lists are
            reserved for verified data in Phase 2. <Link href="/about#data" className="inline-link">Read our data policy</Link>.
          </DataNotice>
        </div>
      </section>
    </>
  );
}
