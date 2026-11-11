import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { lp, type Lang } from "@/lib/i18n/config";
import { fmt, getDict } from "@/lib/i18n/dict";
import { chassis, chassisOf, countryName, ctor, driver, engineMfrName } from "@/lib/f1/db";
import { chassisPhoto } from "@/lib/f1/media";
import { teamEditorial } from "@/lib/f1/content";
import { BlockHead, Breadcrumbs, DataNotice, Milestones, Plate, Specs, Stat } from "@/components/site/ui";
import { toneFor } from "@/components/site/cards";
import { LocalNav } from "@/components/site/LocalNav";

export async function generateMetadata({ params }: PageProps<"/[lang]/teams/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const c = ctor(slug);
  return c ? { title: c.name, description: teamEditorial(slug, lang as Lang)?.summary } : {};
}

export default async function TeamPage({ params }: PageProps<"/[lang]/teams/[slug]">) {
  const { lang: l, slug } = await params;
  const lang = l as Lang;
  const t = getDict(lang);
  const T = t.teams;
  const c = ctor(slug);
  if (!c) notFound();
  const ed = teamEditorial(c.id, lang);
  const color = ed?.color ?? "#6e6e73";
  const cars = chassisOf(c.id);
  const lineage = c.chronology ?? [];
  // Hero: the team's most successful car with a verified photograph.
  const heroCar = [...cars].sort((a, b) => (b.wins ?? 0) - (a.wins ?? 0) || b.years[0] - a.years[0]).find((ch) => chassisPhoto(ch.id));

  return (
    <>
      <LocalNav
        lang={lang}
        title={c.name}
        titleHref={`/teams/${c.id}`}
        links={[
          { label: T.history, href: "#history" },
          { label: T.carGallery.split(",")[0], href: "#cars" },
          { label: T.engineSuppliers, href: "#engines" },
          { label: T.driversBySeason, href: "#drivers" },
        ]}
      />
      <section className="tone-night" style={{ paddingTop: 28, position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(80% 60% at 85% 10%, ${color}55, transparent 60%)` }} />
        <div className="wrap" style={{ position: "relative" }}>
          <Breadcrumbs lang={lang} items={[{ label: t.nav.teams, href: "/teams" }, { label: c.name }]} />
          <div style={{ padding: "clamp(56px,9vw,120px) 0 clamp(40px,6vw,72px)", maxWidth: 860 }}>
            <div className="cat-bar" style={{ ["--cat" as string]: color, marginBottom: 20 }} />
            <p className="eyebrow-f1">
              {countryName(c.country, lang)} · {c.first_}–{c.active ? t.common.present : c.last_}
            </p>
            <h1 className="display balance">{c.name}</h1>
            {c.full && <p className="muted mt-xs">{c.full}</p>}
            {ed && <p className="lede mt-m pretty">{ed.summary}</p>}
          </div>
          <div className="stat-row" style={{ paddingBottom: "clamp(56px,8vw,96px)" }}>
            <Stat value={c.titles.length} label={t.common.championships} />
            <Stat value={c.driverTitles.length} label={T.driverTitlesWith} />
            <Stat value={c.st.wins} label={t.common.wins} />
            <Stat value={c.st.poles} label={t.common.poles} />
            <Stat value={c.st.entries} label={t.common.entries} />
          </div>
          {heroCar && (
            <div style={{ paddingBottom: "clamp(56px,8vw,96px)", marginTop: "calc(-1 * clamp(24px,4vw,48px))" }}>
              <Link href={lp(lang, `/cars/${heroCar.id}`)} style={{ display: "block" }}>
                <Plate
                  linked
                  lang={lang}
                  alt={heroCar.full ?? heroCar.name}
                  photo={chassisPhoto(heroCar.id)}
                  ratio="ratio-cinema"
                  tag={`${heroCar.full ?? heroCar.name} · ${heroCar.years.join(", ")}`}
                  glyph={heroCar.name}
                  priority
                />
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="section tone-paper" id="history">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <div className="prose">
              <p className="eyebrow-f1" style={{ fontSize: 17 }}>
                {T.history}
              </p>
              {ed ? (
                <>
                  {ed.history.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  <h3>{T.identity}</h3>
                  <p>{ed.identity}</p>
                </>
              ) : (
                <p className="muted">{T.noEditorial}</p>
              )}
            </div>
            <div>
              <Specs
                rows={[
                  [t.common.country, countryName(c.country, lang)],
                  ...(ed ? ([[T.base, ed.base]] as [string, string][]) : []),
                  ...(ed?.founders ? ([[T.founders, ed.founders]] as [string, string][]) : []),
                  [T.firstSeason, <Link key="f" href={lp(lang, `/seasons/${c.first_}`)} className="inline-link">{c.first_}</Link>],
                  [c.active ? T.statusLabel : T.finalSeason, c.active ? T.competing : <Link key="l" href={lp(lang, `/seasons/${c.last_}`)} className="inline-link">{c.last_}</Link>],
                  [
                    t.common.championships,
                    c.titles.length ? (
                      <span key="ct">
                        {c.titles.map((y, i) => (
                          <span key={y}>
                            <Link href={lp(lang, `/seasons/${y}`)} className="inline-link">
                              {y}
                            </Link>
                            {i < c.titles.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </span>
                    ) : (
                      "—"
                    ),
                  ],
                  [
                    T.driverTitlesWith,
                    c.driverTitles.length ? (
                      <span key="dt">
                        {c.driverTitles.map((y, i) => (
                          <span key={y}>
                            <Link href={lp(lang, `/seasons/${y}`)} className="inline-link">
                              {y}
                            </Link>
                            {i < c.driverTitles.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </span>
                    ) : (
                      "—"
                    ),
                  ],
                ]}
              />
              {lineage.length > 1 && (
                <div className="mt-m">
                  <p className="kicker">{T.lineage}</p>
                  <ol className="flex-row mt-xs" style={{ gap: 6 }}>
                    {lineage.map((x, i) => (
                      <li key={x.c + i} className="flex-row" style={{ gap: 6 }}>
                        {ctor(x.c) && x.c !== c.id ? (
                          <Link href={lp(lang, `/teams/${x.c}`)} className="badge">
                            {ctor(x.c)!.name} {x.from}–{x.to ?? ""}
                          </Link>
                        ) : (
                          <span className="badge badge-red">
                            {ctor(x.c)?.name ?? x.c} {x.from}–{x.to ?? ""}
                          </span>
                        )}
                        {i < lineage.length - 1 && (
                          <span className="muted" aria-hidden>
                            →
                          </span>
                        )}
                      </li>
                    ))}
                  </ol>
                  <p className="caption mt-xs">{T.lineageNote}</p>
                </div>
              )}
            </div>
          </div>
          {ed && ed.timeline.length > 0 && !ed.isAlias && (
            <div className="mt-xl" style={{ maxWidth: 720 }}>
              <Milestones lang={lang} items={ed.timeline} linkYears />
            </div>
          )}
        </div>
      </section>

      <section className="section tone-off" id="cars">
        <div className="wrap-wide">
          <BlockHead eyebrow={`${cars.length} ${t.common.cars.toLowerCase()}`} title={T.carGallery} />
          <div className="grid grid-4 keep-2">
            {cars.map((ch) => (
              <Link key={ch.id} href={lp(lang, `/cars/${ch.id}`)} className="card">
                <Plate linked lang={lang} alt={ch.full ?? ch.name} photo={chassisPhoto(ch.id)} tone={toneFor(c.id)} ratio="ratio-photo" flat tag={ch.years.join(", ")} glyph={ch.name} glyphSize="sm" />
                <div className="card-body">
                  <p className="card-meta">{ch.years.length > 1 ? `${ch.years[0]}–${ch.years[ch.years.length - 1]}` : ch.years[0]}</p>
                  <p className="card-title">{ch.full ?? ch.name}</p>
                  <p className="small muted">{ch.wins ? fmt(t.cars.winsWith, { n: ch.wins }) : t.cars.noWins}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-l">
            <DataNotice title={t.status.legend}>
              {lang === "pt"
                ? "Títulos, vitórias, motores, pilotos e carros: F1DB (CC BY 4.0), calculados a partir dos resultados e inscrições de cada temporada. História: texto editorial do Paddock."
                : "Titles, wins, engines, drivers and cars: F1DB (CC BY 4.0), computed from each season's results and entries. History: Paddock editorial."}
            </DataNotice>
          </div>
        </div>
      </section>

      <section className="section tone-paper" id="engines">
        <div className="wrap">
          <BlockHead eyebrow={t.common.engines} title={T.engineSuppliers} />
          <div className="table-wrap">
            <table className="dtable compact">
              <thead>
                <tr>
                  <th scope="col">{t.common.engine}</th>
                  <th scope="col">{t.common.seasons}</th>
                </tr>
              </thead>
              <tbody>
                {c.engines.map((e) => (
                  <tr key={e.e}>
                    <td style={{ fontWeight: 600 }}>
                      <Link href={lp(lang, `/cars?by=engine&v=${e.e}`)}>{engineMfrName(e.e)}</Link>
                    </td>
                    <td className="num small">{e.years.length > 3 ? `${e.years[0]}–${e.years[e.years.length - 1]} (${e.years.length})` : e.years.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="caption mt-xs">{T.entrantNote}</p>
        </div>
      </section>

      <section className="section tone-off" id="drivers">
        <div className="wrap">
          <BlockHead eyebrow={t.common.drivers} title={T.driversBySeason} />
          <div className="table-wrap">
            <table className="dtable compact">
              <thead>
                <tr>
                  <th scope="col">{t.common.season}</th>
                  <th scope="col">{t.common.drivers}</th>
                  <th scope="col">{t.common.cars}</th>
                  <th scope="col" className="r">
                    {T.championshipPos}
                  </th>
                  <th scope="col" className="r">
                    {t.common.points}
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...c.seasons].reverse().map((s) => (
                  <tr key={s.y}>
                    <td className="num" style={{ fontWeight: 700 }}>
                      <Link href={lp(lang, `/seasons/${s.y}`)}>{s.y}</Link>
                      {c.titles.includes(s.y) && (
                        <span className="badge badge-red" style={{ marginLeft: 6 }}>
                          {t.common.championships.slice(0, -1)}
                        </span>
                      )}
                    </td>
                    <td className="small">
                      {s.d.map((id, i) => (
                        <span key={id}>
                          <Link href={lp(lang, `/drivers/${id}`)}>{driver(id)?.name ?? id}</Link>
                          {i < s.d.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </td>
                    <td className="small">
                      {s.ch.map((id, i) => (
                        <span key={id}>
                          <Link href={lp(lang, `/cars/${id}`)}>{chassis(id)?.name ?? id}</Link>
                          {i < s.ch.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </td>
                    <td className="r num">{s.pos ?? "—"}</td>
                    <td className="r num">{s.pts ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </>
  );
}
