import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { lp, type Lang } from "@/lib/i18n/config";
import { fmt, getDict } from "@/lib/i18n/dict";
import { ageAt, chassis, chassisForDriverYear, countryName, ctorName, db, driver as getDriver, formatDate, formatNumber, gpName, race } from "@/lib/f1/db";
import { driverPhoto } from "@/lib/f1/media";
import { driverEditorial } from "@/lib/f1/content";
import { CarCard, DriverCard, toneFor } from "@/components/site/cards";
import { BlockHead, Breadcrumbs, DataNotice, Milestones, Plate, Specs, Stat, StatusBadge } from "@/components/site/ui";
import type { Tone } from "@/lib/f1/types";

export async function generateMetadata({ params }: PageProps<"/[lang]/drivers/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const d = getDriver(slug);
  if (!d) return {};
  return { title: d.name, description: driverEditorial(slug, lang as Lang)?.summary ?? `${d.name} — ${d.first_}–${d.last_}` };
}

const FAMILY: Record<string, { pt: string; en: string }> = {
  SIBLING: { pt: "Irmão/irmã", en: "Sibling" },
  PARENT: { pt: "Pai/mãe", en: "Parent" },
  CHILD: { pt: "Filho/filha", en: "Child" },
  SIBLINGS_CHILD: { pt: "Sobrinho/sobrinha", en: "Nephew/niece" },
  PARENTS_SIBLING: { pt: "Tio/tia", en: "Uncle/aunt" },
  GRANDPARENT: { pt: "Avô/avó", en: "Grandparent" },
  GRANDCHILD: { pt: "Neto/neta", en: "Grandchild" },
  COUSIN: { pt: "Primo/prima", en: "Cousin" },
};

export default async function DriverPage({ params }: PageProps<"/[lang]/drivers/[slug]">) {
  const { lang: l, slug } = await params;
  const lang = l as Lang;
  const t = getDict(lang);
  const D = t.drivers;
  const d = getDriver(slug);
  if (!d) notFound();
  const ed = driverEditorial(d.id, lang);
  const photo = driverPhoto(d.id);
  const cars = [...new Set(d.seasons.flatMap((s) => chassisForDriverYear(d.id, s.y)))].map((id) => chassis(id)!).filter(Boolean);
  const notableCars = [...cars].sort((a, b) => b.wins - a.wins).slice(0, 8);
  const peers = db()
    .drivers.filter((x) => x.id !== d.id && x.first_ <= d.last_ && x.last_ >= d.first_ && x.st.wins > 0)
    .sort((a, b) => b.titles.length - a.titles.length || b.st.wins - a.st.wins)
    .slice(0, 4);
  const wins = d.winList.map((k) => {
    const [y, s] = k.split("/");
    const r = race(Number(y), s);
    return { y: Number(y), s, name: r ? gpName(r.gp) : s };
  });

  return (
    <>
      <section className="tone-paper" style={{ paddingTop: 28 }}>
        <div className="wrap">
          <Breadcrumbs lang={lang} items={[{ label: t.nav.drivers, href: "/drivers" }, { label: d.name }]} />
          <div className="grid grid-2" style={{ marginTop: "clamp(32px,5vw,64px)", gap: "clamp(32px,6vw,80px)", alignItems: "center" }}>
            <Plate
              lang={lang}
              alt={d.name}
              photo={photo}
              tone={(ed?.tone as Tone) ?? toneFor(d.id)}
              ratio="ratio-portrait"
              position="center 20%"
              tag={countryName(d.nat, lang)}
              glyph={
                <span style={{ letterSpacing: "-0.02em" }}>
                  {d.first[0]}
                  {d.last[0]}
                </span>
              }
              priority
            />
            <div>
              {ed && <p className="eyebrow-f1">{ed.knownFor}</p>}
              <h1 className="display balance">
                {d.first}
                <br />
                {d.last}
              </h1>
              {ed && <p className="lede mt-s pretty">{ed.summary}</p>}
              <div className="flex-row mt-m" style={{ gap: 8 }}>
                {d.titles.length > 0 && <span className="badge badge-red">{fmt(D.champion, { n: d.titles.length })}</span>}
                <span className="badge">{d.active ? t.common.active : t.common.retired}</span>
                <StatusBadge lang={lang} status={d.active ? "provisional" : "cross-checked"} title={d.active ? t.status.inProgress : undefined} />
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: "clamp(48px,7vw,80px)" }} />
      </section>

      {/* Career statistics */}
      <section className="section-tight tone-night">
        <div className="wrap">
          <p className="kicker" style={{ marginBottom: 20 }}>
            {D.careerStats}
          </p>
          <div className="stat-row">
            <Stat value={d.titles.length} label={t.common.championships} />
            <Stat value={d.st.entries} label={t.common.entries} />
            <Stat value={d.st.starts} label={t.common.starts} />
            <Stat value={d.st.wins} label={t.common.wins} />
            <Stat value={d.st.podiums} label={t.common.podiums} />
            <Stat value={d.st.poles} label={t.common.poles} />
            <Stat value={d.st.fl} label={t.common.fastestLaps} />
            <Stat value={formatNumber(d.st.points, lang, 1)} label={t.common.countedPoints} />
          </div>
          {d.active && (
            <p className="caption mt-m" style={{ color: "var(--on-night-2)" }}>
              {t.status.provisional}: {t.seasons.inProgress.toLowerCase()} {db().meta.lastYear}.
            </p>
          )}
        </div>
      </section>

      {/* Profile & biography */}
      <section className="section tone-paper">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <div>
              <p className="eyebrow-f1">{D.profile}</p>
              <Specs
                rows={[
                  ...(d.full ? ([[t.common.fullName, d.full]] as [string, string][]) : []),
                  [t.common.nationality, countryName(d.nat, lang) + (d.nat2 ? ` / ${countryName(d.nat2, lang)}` : "")],
                  [t.common.born, d.dob ? `${formatDate(d.dob, lang)}${d.pob ? ` · ${d.pob}` : ""}` : "—"],
                  ...(d.dod ? ([[t.common.died, `${formatDate(d.dod, lang)} (${fmt(D.age, { n: ageAt(d.dob!, d.dod) })})`]] as [string, string][]) : []),
                  [t.common.career, `${d.first_} – ${d.active ? t.common.present : d.last_}`],
                  [
                    D.teamsDriven,
                    <span key="teams">
                      {d.teams.map((c, i) => (
                        <span key={c}>
                          <Link href={lp(lang, `/teams/${c}`)} className="inline-link">
                            {ctorName(c)}
                          </Link>
                          {i < d.teams.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </span>,
                  ],
                  [
                    t.common.championships,
                    d.titles.length ? (
                      <span key="titles">
                        {d.titles.map((y, i) => (
                          <span key={y}>
                            <Link href={lp(lang, `/seasons/${y}`)} className="inline-link">
                              {y}
                            </Link>
                            {i < d.titles.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </span>
                    ) : (
                      "—"
                    ),
                  ],
                  ...(d.family?.length
                    ? ([
                        [
                          D.family,
                          <span key="family">
                            {d.family.map((f, i) => (
                              <span key={f.d}>
                                <Link href={lp(lang, `/drivers/${f.d}`)} className="inline-link">
                                  {getDriver(f.d)?.name ?? f.d}
                                </Link>{" "}
                                <span className="muted">({FAMILY[f.t]?.[lang] ?? f.t})</span>
                                {i < d.family!.length - 1 ? ", " : ""}
                              </span>
                            ))}
                          </span>,
                        ],
                      ] as [string, React.ReactNode][])
                    : []),
                ]}
              />
            </div>
            <div className="prose">
              <p className="eyebrow-f1" style={{ fontSize: 17 }}>
                {D.careerStory}
              </p>
              {ed ? ed.bio.map((p, i) => <p key={i}>{p}</p>) : <p className="muted">{D.noBio}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* Season by season */}
      <section className="section tone-off">
        <div className="wrap">
          <BlockHead eyebrow={D.timeline} title={D.seasonBySeason} />
          <div className="table-wrap">
            <table className="dtable compact">
              <thead>
                <tr>
                  <th scope="col">{t.common.season}</th>
                  <th scope="col">{t.common.team}</th>
                  <th scope="col">{t.common.car}</th>
                  <th scope="col" className="r">
                    {t.common.starts}
                  </th>
                  <th scope="col" className="r">
                    {t.common.wins}
                  </th>
                  <th scope="col" className="r">
                    {t.common.podiums}
                  </th>
                  <th scope="col" className="r">
                    {t.common.poles}
                  </th>
                  <th scope="col" className="r">
                    {D.standing}
                  </th>
                  <th scope="col" className="r">
                    {D.seasonPoints}
                  </th>
                </tr>
              </thead>
              <tbody>
                {d.seasons.map((s) => (
                  <tr key={s.y}>
                    <td className="num" style={{ fontWeight: 700 }}>
                      <Link href={lp(lang, `/seasons/${s.y}`)}>{s.y}</Link>
                      {d.titles.includes(s.y) && <span className="badge badge-red" style={{ marginLeft: 6 }}>{t.seasons.champion}</span>}
                    </td>
                    <td className="small">
                      {s.c.map((c, i) => (
                        <span key={c}>
                          <Link href={lp(lang, `/teams/${c}`)}>{ctorName(c)}</Link>
                          {i < s.c.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </td>
                    <td className="small">
                      {chassisForDriverYear(d.id, s.y).map((ch, i, a) => (
                        <span key={ch}>
                          <Link href={lp(lang, `/cars/${ch}`)}>{chassis(ch)?.name ?? ch}</Link>
                          {i < a.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </td>
                    <td className="r num">{s.s ?? 0}</td>
                    <td className="r num">{s.w ?? 0}</td>
                    <td className="r num">{s.p ?? 0}</td>
                    <td className="r num">{s.pl ?? 0}</td>
                    <td className="r num">{s.pos ?? "—"}</td>
                    <td className="r num">{s.pts ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {d.first_ < 1991 && <p className="caption mt-xs">{D.pointsNote}</p>}
        </div>
      </section>

      {(wins.length > 0 || ed?.timeline.length) && (
        <section className="section tone-paper">
          <div className="wrap">
            <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
              {ed && ed.timeline.length > 0 && (
                <div>
                  <p className="eyebrow-f1">{D.keyMoments}</p>
                  <Milestones lang={lang} items={ed.timeline} linkYears />
                </div>
              )}
              {wins.length > 0 && (
                <div>
                  <p className="eyebrow-f1">
                    {D.winsTitle} · {wins.length}
                  </p>
                  <ol style={{ columns: wins.length > 12 ? 2 : 1, columnGap: 24 }}>
                    {wins.map((w, i) => (
                      <li key={`${w.y}-${w.s}`} className="small" style={{ breakInside: "avoid", padding: "4px 0", borderBottom: "1px solid var(--line-soft)" }}>
                        <span className="num muted" style={{ display: "inline-block", width: 28 }}>
                          {i + 1}.
                        </span>
                        <Link href={lp(lang, `/seasons/${w.y}/${w.s}`)}>
                          {w.y} · {w.name}
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {notableCars.length > 0 && (
        <section className="section tone-off">
          <div className="wrap-wide">
            <BlockHead eyebrow={t.nav.cars} title={D.carsDriven} />
            <div className="grid grid-4 keep-2">
              {notableCars.map((c) => (
                <CarCard key={c.id} ch={c} lang={lang} />
              ))}
            </div>
          </div>
        </section>
      )}

      {peers.length > 0 && (
        <section className="section tone-paper">
          <div className="wrap-wide">
            <BlockHead eyebrow={t.nav.drivers} title={D.contemporaries} />
            <div className="grid grid-4 keep-2">
              {peers.map((p) => (
                <DriverCard key={p.id} d={p} lang={lang} />
              ))}
            </div>
            <div className="mt-l">
              <DataNotice title={t.status.legend}>
                {lang === "pt"
                  ? "Dados de carreira: F1DB (CC BY 4.0), calculados corrida a corrida. Biografia: texto editorial do Paddock."
                  : "Career data: F1DB (CC BY 4.0), computed race by race. Biography: Paddock editorial."}
              </DataNotice>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
