import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { lp, type Lang } from "@/lib/i18n/config";
import { fmt, getDict } from "@/lib/i18n/dict";
import { chassis as getChassis, chassisHonours, chassisName, chassisOf, ctor, ctorName, driver, engine, engineMfrName, gpName, season } from "@/lib/f1/db";
import { chassisPhoto } from "@/lib/f1/media";
import { carEditorial, techArticles } from "@/lib/f1/content";
import { generationOf } from "@/lib/f1/generations";
import { CarCard, toneFor } from "@/components/site/cards";
import { BlockHead, Breadcrumbs, DataNotice, Plate, Specs, StatusBadge } from "@/components/site/ui";
import type { Tone } from "@/lib/f1/types";

export async function generateMetadata({ params }: PageProps<"/[lang]/cars/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const c = getChassis(slug);
  return c ? { title: chassisName(slug), description: carEditorial(slug, lang as Lang)?.intro } : {};
}

export default async function CarPage({ params }: PageProps<"/[lang]/cars/[slug]">) {
  const { lang: l, slug } = await params;
  const lang = l as Lang;
  const t = getDict(lang);
  const C = t.cars;
  const ch = getChassis(slug);
  if (!ch) notFound();
  const ed = carEditorial(ch.id, lang);
  const gen = generationOf(ch.years[0]);
  const name = ed?.name ?? chassisName(ch.id);
  const honours = chassisHonours(ch);
  const engines = ch.engines.map((e) => engine(e)).filter(Boolean);
  const mfrs = [...new Set(engines.map((e) => e!.m))];
  // wins with this chassis, from race records
  const wins: { y: number; s: string; gp: string; d: string }[] = [];
  for (const y of ch.years) {
    const sd = season(y);
    if (!sd) continue;
    for (const r of sd.races) {
      const w = r.results.find((x) => x.pos === 1 && x.c === ch.c);
      if (!w) continue;
      const used = sd.entrants.filter((e) => e.c === ch.c && e.drivers.some((x) => x.d === w.d)).flatMap((e) => e.chassis);
      if (used.length === 1 && used[0] === ch.id) wins.push({ y, s: r.slug, gp: gpName(r.gp), d: w.d });
    }
  }
  const siblings = chassisOf(ch.c).filter((x) => x.id !== ch.id);
  const near = siblings.filter((x) => Math.abs(x.years[0] - ch.years[0]) <= 3).slice(0, 4);
  const relatedTech = techArticles(lang, "engineering").filter((a) => a.cars.includes(ch.id));

  return (
    <>
      <section className="tone-paper" style={{ paddingTop: 28 }}>
        <div className="wrap">
          <Breadcrumbs lang={lang} items={[{ label: t.nav.cars, href: "/cars" }, { label: ctorName(ch.c), href: `/teams/${ch.c}` }, { label: name }]} />
          <div className="center" style={{ padding: "clamp(40px,7vw,88px) 0 clamp(32px,5vw,48px)" }}>
            <p className="eyebrow-f1">
              <Link href={lp(lang, `/teams/${ch.c}`)}>{ctorName(ch.c)}</Link> · {ch.years.join(", ")}
            </p>
            <h1 className="display balance mx-auto" style={{ maxWidth: 900 }}>
              {name}
            </h1>
            {ed && (
              <p className="lede mx-auto mt-s" style={{ maxWidth: 640 }}>
                {ed.headline}
              </p>
            )}
            <div className="flex-row mt-s" style={{ justifyContent: "center", gap: 8 }}>
              {honours.map((h) => (
                <span key={`${h.y}-${h.kind}`} className="badge badge-red">
                  {fmt(h.kind === "constructor" ? C.championCar : C.driverChampionCar, { y: h.y })}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="wrap-wide">
          <Plate lang={lang} alt={name} photo={chassisPhoto(ch.id)} tone={(ed?.tone as Tone) ?? toneFor(ch.c)} ratio="ratio-cinema" tag={`${gen.name[lang]} · ${ch.years[0]}`} glyph={ch.name} priority />
        </div>
        <div style={{ height: "clamp(56px,8vw,96px)" }} />
      </section>

      {ed && (
        <section className="section tone-off">
          <div className="wrap-text">
            <p className="lede" style={{ color: "var(--ink)", fontWeight: 600 }}>
              {ed.intro}
            </p>
            <div className="prose mt-l">
              <h3 style={{ marginTop: 0 }}>{C.historicalImportance}</h3>
              {ed.context.map((p, n) => (
                <p key={n}>{p}</p>
              ))}
              <h3>{C.designCharacteristics}</h3>
              {ed.design.map((p, n) => (
                <p key={n}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section tone-night">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <div>
              <p className="eyebrow-f1">{C.technicalOverview}</p>
              <h2 className="title-1">{name}</h2>
              <div className="mt-m">
                <Specs
                  rows={[
                    [C.officialName, ch.full ?? `${ctorName(ch.c)} ${ch.name}`],
                    [t.common.constructor, ctor(ch.c) ? <Link key="c" href={lp(lang, `/teams/${ch.c}`)}>{ctorName(ch.c)}</Link> : ch.c],
                    [
                      C.racedIn,
                      <span key="y">
                        {ch.years.map((y, n) => (
                          <span key={y}>
                            <Link href={lp(lang, `/seasons/${y}`)}>{y}</Link>
                            {n < ch.years.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </span>,
                    ],
                    [C.engineSupplier, mfrs.map((m) => engineMfrName(m)).join(", ") || "—"],
                    [C.engineDesignation, engines.map((e) => e!.full ?? e!.name).join(" · ") || "—"],
                    [C.regulationEra, `${gen.name[lang]} (${gen.from}–${gen.to > 2030 ? "" : gen.to})`],
                    ...(ed?.designer ? ([[lang === "pt" ? "Projeto" : "Design", ed.designer]] as [string, string][]) : []),
                  ]}
                />
              </div>
            </div>
            <div>
              <p className="eyebrow-f1">{C.drivenBy}</p>
              <div className="flex-row" style={{ gap: 8 }}>
                {ch.drivers.map((d) => (
                  <Link key={d} href={lp(lang, `/drivers/${d}`)} className="chip">
                    {driver(d)?.name ?? d}
                  </Link>
                ))}
              </div>
              {ed && (
                <>
                  <p className="eyebrow-f1 mt-l">{C.innovations}</p>
                  <ul style={{ display: "grid", gap: 10 }}>
                    {ed.innovations.map((x) => (
                      <li key={x} className="tile" style={{ background: "var(--night-3)" }}>
                        <div className="tile-body" style={{ padding: "16px 20px" }}>
                          <span className="title-3">{x}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {!ed && <p className="muted mt-m small">{C.noEditorial}</p>}
            </div>
          </div>
        </div>
      </section>

      <section className="section tone-paper">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <div>
              <div className="flex-row" style={{ marginBottom: 12 }}>
                <h2 className="title-2">{C.achievements}</h2>
                <StatusBadge lang={lang} status="cross-checked" />
              </div>
              {wins.length ? (
                <ol>
                  {wins.map((w, n) => (
                    <li key={`${w.y}-${w.s}`} className="small" style={{ padding: "6px 0", borderBottom: "1px solid var(--line-soft)" }}>
                      <span className="num muted" style={{ display: "inline-block", width: 28 }}>
                        {n + 1}.
                      </span>
                      <Link href={lp(lang, `/seasons/${w.y}/${w.s}`)}>
                        {w.y} · {w.gp}
                      </Link>{" "}
                      <span className="muted">— {driver(w.d)?.name}</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="muted">{C.noWins}</p>
              )}
            </div>
            <div>
              {relatedTech.length > 0 && (
                <>
                  <p className="kicker" style={{ marginBottom: 10 }}>
                    {t.nav.engineering}
                  </p>
                  <div className="flex-row" style={{ gap: 8 }}>
                    {relatedTech.map((a) => (
                      <Link key={a.slug} href={lp(lang, `/engineering/${a.slug}`)} className="chip">
                        {a.title}
                      </Link>
                    ))}
                  </div>
                </>
              )}
              <p className="kicker mt-m" style={{ marginBottom: 10 }}>
                {C.relatedRegs}
              </p>
              <div className="flex-row" style={{ gap: 8 }}>
                <Link href={lp(lang, `/regulations/archive/${ch.years[0]}`)} className="chip">
                  {t.regulations.archiveEyebrow} · {ch.years[0]}
                </Link>
                <Link href={lp(lang, "/regulations/history")} className="chip">
                  {t.nav.regulations}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {near.length > 0 && (
        <section className="section tone-off">
          <div className="wrap-wide">
            <BlockHead eyebrow={ctorName(ch.c)} title={C.sameConstructor} />
            <div className="grid grid-4 keep-2">
              {near.map((c) => (
                <CarCard key={c.id} ch={c} lang={lang} />
              ))}
            </div>
            <div className="mt-l">
              <DataNotice title={t.status.legend}>
                {lang === "pt"
                  ? "Temporadas, motores, pilotos e vitórias: registros de inscrição e resultados da F1DB (CC BY 4.0). Vitórias só são atribuídas a um modelo quando o piloto vencedor estava inscrito com um único chassi naquela temporada."
                  : "Seasons, engines, drivers and wins: F1DB entry and result records (CC BY 4.0). Wins are credited to a model only when the winning driver was entered with a single chassis that season."}
              </DataNotice>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
