import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, Flag, Gauge, Layers, Map, Scale, Trophy, Users, Wrench } from "lucide-react";
import { lp, type Lang } from "@/lib/i18n/config";
import { fmt, getDict } from "@/lib/i18n/dict";
import { chassis, circuit, countryName, ctor, db, driver, formatDate, gpName, season } from "@/lib/f1/db";
import { eras } from "@/lib/f1/content";
import { CATEGORIES } from "@/lib/f1/categories";
import { LESSONS } from "@/lib/f1/learn";
import { EraTimeline } from "@/components/site/EraTimeline";
import { CarCard, CircuitCard, DriverCard } from "@/components/site/cards";
import { LinkArrow, Plate, SectionHead, Stat, StatusBadge } from "@/components/site/ui";
import { teamColor } from "@/lib/f1/content";
import { eraHero, seasonHero } from "@/lib/f1/derive";
import { chassisPhoto } from "@/lib/f1/media";
import { sized } from "@/lib/f1/img";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const t = getDict(lang as Lang);
  return { title: { absolute: `Paddock — ${t.meta.tagline}` } };
}

const FEATURED_DRIVERS = ["juan-manuel-fangio", "jim-clark", "niki-lauda", "ayrton-senna", "michael-schumacher", "lewis-hamilton", "max-verstappen", "lando-norris"];
const FEATURED_CARS = ["lotus-25", "lotus-49", "lotus-79", "mclaren-mp4-4", "williams-fw14b", "brawn-bgp-001", "mercedes-f1-w05", "red-bull-rb19"];
const FEATURED_CIRCUITS = ["silverstone", "monaco", "monza", "spa-francorchamps", "suzuka", "interlagos"];

const STORIES: { year: number; href: string; car?: string; tone: "red" | "navy" | "gold" | "silver"; title: { pt: string; en: string }; text: { pt: string; en: string } }[] = [
  {
    year: 1976,
    href: "/seasons/1976",
    tone: "red",
    title: { pt: "Lauda, Hunt e um ponto", en: "Lauda, Hunt and one point" },
    text: { pt: "Um acidente, uma volta por cima em seis semanas e um título decidido na chuva de Fuji.", en: "A crash, a comeback in six weeks and a title decided in the rain at Fuji." },
  },
  {
    year: 1988,
    href: "/cars/mclaren-mp4-4",
    car: "mclaren-mp4-4",
    tone: "gold",
    title: { pt: "Quinze em dezesseis", en: "Fifteen out of sixteen" },
    text: { pt: "Senna, Prost e o McLaren-Honda MP4/4: a temporada mais dominante da era turbo.", en: "Senna, Prost and the McLaren-Honda MP4/4: the most dominant season of the turbo era." },
  },
  {
    year: 1994,
    href: "/history/1990s",
    tone: "navy",
    title: { pt: "Ímola e a era da segurança", en: "Imola and the safety era" },
    text: { pt: "O fim de semana que obrigou a Fórmula 1 a repensar a segurança de carros e circuitos.", en: "The weekend that forced Formula One to rethink the safety of cars and circuits." },
  },
  {
    year: 2009,
    href: "/cars/brawn-bgp-001",
    car: "brawn-bgp-001",
    tone: "silver",
    title: { pt: "A equipe que quase não existiu", en: "The team that almost never was" },
    text: { pt: "Salva semanas antes da temporada, a Brawn GP venceu os dois títulos com o difusor duplo.", en: "Rescued weeks before the season, Brawn GP won both titles with its double diffuser." },
  },
];

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang: l } = await params;
  const lang = l as Lang;
  const t = getDict(lang);
  const i = db();
  const completed = i.seasons.filter((s) => s.status === "completed");
  const champions = new Set(completed.map((s) => s.champion)).size;
  const starters = i.drivers.filter((d) => d.st.starts > 0).length;
  const racesHeld = i.seasons.reduce((n, s) => n + s.completed, 0);
  const cur = i.seasons[i.seasons.length - 1];
  const curData = season(cur.year)!;
  const lastRace = [...curData.races].reverse().find((r) => r.status === "completed");
  const nextRace = curData.races.find((r) => r.status === "scheduled");
  const leader = driver(cur.leader ?? cur.champion);
  const cLeader = ctor(cur.constructorLeader ?? cur.constructorChampion);
  const grid = [...new Set(curData.entrants.map((e) => e.c))].map((id) => ctor(id)!).filter(Boolean);
  const E = eras(lang);
  const lastDone = [...i.seasons].reverse().find((s) => s.status === "completed")?.year ?? 2025;
  const homeHero = seasonHero(lastDone);

  return (
    <>
      {/* Hero */}
      <section className="tone-night" style={{ paddingTop: "clamp(56px,9vw,112px)", overflow: "hidden" }}>
        <div className="wrap center">
          <p className="eyebrow-f1 rise">{t.home.eyebrow}</p>
          <h1 className="display balance rise rise-2" style={{ fontSize: "clamp(48px, 9vw, 112px)" }}>
            {fmt(t.home.title1, { n: completed.length })}
            <br />
            <span className="gradient-ink">{t.home.title2}</span>
          </h1>
          <p className="lede mx-auto mt-m pretty rise rise-3" style={{ maxWidth: 680 }}>
            {t.home.lede}
          </p>
          <div className="flex-row mt-m rise rise-3" style={{ justifyContent: "center" }}>
            <Link href={lp(lang, "/history")} className="btn btn-red">
              {t.home.ctaHistory}
            </Link>
            <Link href={lp(lang, "/learn")} className="btn btn-ghost">
              {t.home.ctaLearn}
            </Link>
          </div>
        </div>
        <div className="wrap-wide" style={{ marginTop: "clamp(48px,7vw,88px)" }}>
          <Plate
            lang={lang}
            alt={homeHero?.label ?? "Formula 1, 1950–2026"}
            photo={homeHero?.photo}
            tone="red"
            ratio="ratio-cinema"
            priority
            tag="1950 — 2026"
            glyph={<span style={{ fontSize: "clamp(72px,16vw,240px)" }}>F1</span>}
            className="rise rise-3"
            caption={homeHero?.chassisId ? <Link href={lp(lang, `/cars/${homeHero.chassisId}`)} className="inline-link">{homeHero.label}</Link> : undefined}
          />
        </div>
        <div style={{ height: "clamp(56px,8vw,96px)" }} />
      </section>

      {/* What is F1 */}
      <section className="section tone-paper">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <div>
              <p className="eyebrow-f1">{t.home.whatEyebrow}</p>
              <h2 className="headline balance">{t.home.whatTitle}</h2>
            </div>
            <div className="prose">
              <p>{t.home.whatP1}</p>
              <p>{t.home.whatP2}</p>
              <p>
                <LinkArrow lang={lang} href="/learn/what-is-formula-1">
                  {t.home.whatLink}
                </LinkArrow>
              </p>
            </div>
          </div>
          <div className="stat-row mt-xl">
            <Stat value={completed.length} label={t.home.statSeasons} />
            <Stat value={champions} label={t.home.statChampions} />
            <Stat value={starters} label={t.home.statDrivers} />
            <Stat value={racesHeld} label={t.home.statRaces} />
          </div>
        </div>
      </section>

      {/* History */}
      <section className="section tone-off" id="history">
        <div className="wrap">
          <SectionHead
            eyebrow={t.home.historyEyebrow}
            title={t.home.historyTitle}
            lede={t.home.historyLede}
            action={
              <LinkArrow lang={lang} href="/history">
                {t.home.historyLink}
              </LinkArrow>
            }
          />
          <EraTimeline
            eras={E.map((e) => {
              const h = eraHero(e.start, e.end);
              return { id: e.id, slug: e.slug, decade: e.decade, start: e.start, end: e.end, name: e.name, tagline: e.tagline, intro: e.intro, themes: e.themes, tone: e.tone, photo: h ? { src: sized(h.photo.src, 960), credit: h.photo.credit, license: h.photo.license, label: h.label } : undefined };
            })}
            lang={lang}
            labels={{ read: t.history.readDecade, seasons: t.history.seasonsLink, prev: t.common.previous, next: t.common.next, tablist: t.history.eyebrow }}
          />
        </div>
      </section>

      {/* Featured stories */}
      <section className="section tone-paper">
        <div className="wrap-wide">
          <SectionHead eyebrow={t.home.storiesEyebrow} title={t.home.storiesTitle} />
          <div className="grid grid-4 keep-2">
            {STORIES.map((s) => (
              <Link key={s.year} href={lp(lang, s.href)} className="card">
                <Plate linked lang={lang} alt={s.title[lang]} photo={(s.car ? chassisPhoto(s.car) : undefined) ?? seasonHero(s.year)?.photo} tone={s.tone} ratio="ratio-photo" flat tag={String(s.year)} glyph={s.year} glyphSize="sm" />
                <div className="card-body">
                  <p className="card-title">{s.title[lang]}</p>
                  <p className="small muted pretty">{s.text[lang]}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Current season */}
      <section className="section tone-night">
        <div className="wrap">
          <SectionHead
            eyebrow={t.home.currentEyebrow}
            title={
              <>
                {cur.year}. <span style={{ color: "var(--on-night-2)" }}>{t.home.currentTitle.replace(/^\d{4}\.\s*/, "")}</span>
              </>
            }
            lede={t.home.currentLede}
            action={
              <LinkArrow lang={lang} href={`/seasons/${cur.year}`}>
                {t.home.currentLink}
              </LinkArrow>
            }
          />
          <div className="grid grid-4">
            <div className="tile">
              <div className="tile-body">
                <StatusBadge lang={lang} status={cur.status === "completed" ? "cross-checked" : "provisional"} />
                <p className="kicker mt-s">{cur.status === "completed" ? t.seasons.champion : cur.champion ? t.seasons.clinchedChampion : t.home.currentLeader}</p>
                <p className="title-2">{leader ? <Link href={lp(lang, `/drivers/${leader.id}`)}>{leader.name}</Link> : "—"}</p>
                <p className="small muted">
                  {curData.driverStandings[0]?.pts} {t.common.points.toLowerCase()}
                </p>
              </div>
            </div>
            <div className="tile">
              <div className="tile-body">
                <p className="kicker">{t.home.currentConstructorLeader}</p>
                <p className="title-2">{cLeader ? <Link href={lp(lang, `/teams/${cLeader.id}`)}>{cLeader.name}</Link> : "—"}</p>
                <p className="small muted">
                  {curData.constructorStandings[0]?.pts} {t.common.points.toLowerCase()}
                </p>
              </div>
            </div>
            <div className="tile">
              <div className="tile-body">
                <p className="kicker">{t.home.currentLast}</p>
                {lastRace ? (
                  <>
                    <p className="title-3">
                      <Link href={lp(lang, `/seasons/${cur.year}/${lastRace.slug}`)}>{gpName(lastRace.gp)}</Link>
                    </p>
                    <p className="small muted">
                      {formatDate(lastRace.date, lang)} · {t.common.winner}: {driver(lastRace.results.find((r) => r.pos === 1)?.d)?.name}
                    </p>
                  </>
                ) : (
                  <p className="muted">—</p>
                )}
              </div>
            </div>
            <div className="tile">
              <div className="tile-body">
                <p className="kicker">{t.home.currentNext}</p>
                {nextRace ? (
                  <>
                    <p className="title-3">
                      <Link href={lp(lang, `/seasons/${cur.year}/${nextRace.slug}`)}>{gpName(nextRace.gp)}</Link>
                    </p>
                    <p className="small muted">
                      {formatDate(nextRace.date, lang)} · {circuit(nextRace.circuit)?.place}
                    </p>
                  </>
                ) : (
                  <p className="muted">—</p>
                )}
                <p className="caption mt-xs" style={{ color: "var(--on-night-2)" }}>
                  {fmt(t.home.currentProgress, { done: cur.completed, total: cur.rounds })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Drivers */}
      <section className="section tone-paper">
        <div className="wrap-wide">
          <SectionHead
            eyebrow={t.home.driversEyebrow}
            title={t.home.driversTitle}
            lede={fmt(t.home.driversLede, { n: i.drivers.length })}
            action={
              <LinkArrow lang={lang} href="/drivers">
                {t.home.driversLink}
              </LinkArrow>
            }
          />
        </div>
        <div className="rail" aria-label={t.home.driversEyebrow}>
          {FEATURED_DRIVERS.map((id) => (
            <DriverCard key={id} d={driver(id)!} lang={lang} />
          ))}
        </div>
      </section>

      {/* Teams — the current grid */}
      <section className="section-tight tone-off">
        <div className="wrap-wide">
          <SectionHead
            eyebrow={t.home.teamsEyebrow}
            title={t.home.teamsTitle}
            lede={fmt(t.home.teamsLede, { n: i.constructors.length })}
            action={
              <LinkArrow lang={lang} href="/teams">
                {t.home.teamsLink}
              </LinkArrow>
            }
          />
          <ul className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
            {grid.map((c) => (
              <li key={c.id}>
                <Link href={lp(lang, `/teams/${c.id}`)} className="card" style={{ flexDirection: "row", alignItems: "center", gap: 12, padding: "16px 18px", height: "100%" }}>
                  <span style={{ width: 6, alignSelf: "stretch", borderRadius: 4, background: teamColor(c.id) ?? "var(--line)" }} aria-hidden />
                  <span>
                    <span style={{ display: "block", fontWeight: 600 }}>{c.name}</span>
                    <span className="caption">
                      {countryName(c.country, lang)} · {t.common.since} {c.first_}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Cars */}
      <section className="section tone-paper">
        <div className="wrap-wide">
          <SectionHead
            eyebrow={t.home.carsEyebrow}
            title={t.home.carsTitle}
            lede={t.home.carsLede}
            action={
              <LinkArrow lang={lang} href="/teams">
                {t.nav.teams}
              </LinkArrow>
            }
          />
        </div>
        <div className="rail" aria-label={t.home.carsEyebrow}>
          {FEATURED_CARS.map((id) => (
            <CarCard key={id} ch={chassis(id)!} lang={lang} />
          ))}
        </div>
      </section>

      {/* Circuits */}
      <section className="section tone-off">
        <div className="wrap-wide">
          <SectionHead
            eyebrow={t.home.circuitsEyebrow}
            title={t.home.circuitsTitle}
            lede={fmt(t.home.circuitsLede, { n: i.circuits.length })}
            action={
              <LinkArrow lang={lang} href="/circuits">
                {t.home.circuitsLink}
              </LinkArrow>
            }
          />
          <div className="grid grid-3">
            {FEATURED_CIRCUITS.map((id) => (
              <CircuitCard key={id} c={circuit(id)!} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* Weekend + Engineering/Regulations */}
      <section className="section tone-paper">
        <div className="wrap-wide">
          <div className="grid grid-2">
            <Link href={lp(lang, "/race-weekend")} className="tile tile-link tile-dark" style={{ minHeight: 400 }}>
              <div className="tile-body" style={{ justifyContent: "space-between" }}>
                <div>
                  <p className="eyebrow-f1" style={{ color: "#ff5a4f" }}>
                    {t.home.weekendEyebrow}
                  </p>
                  <p className="title-1 balance">{t.home.weekendTitle}</p>
                  <p className="muted mt-s">{t.home.weekendText}</p>
                </div>
                <Flag size={32} strokeWidth={1.5} aria-hidden />
              </div>
            </Link>
            <Link href={lp(lang, "/regulations")} className="tile tile-link" style={{ minHeight: 400, background: "var(--paper-2)" }}>
              <div className="tile-body" style={{ justifyContent: "space-between" }}>
                <div>
                  <p className="eyebrow-f1">{t.home.engEyebrow}</p>
                  <p className="title-1 balance">{t.home.engTitle}</p>
                  <p className="muted mt-s">{t.home.engText}</p>
                </div>
                <Scale size={32} strokeWidth={1.5} color="var(--red)" aria-hidden />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Ladder */}
      <section className="section tone-off">
        <div className="wrap">
          <SectionHead center eyebrow={t.home.ladderEyebrow} title={t.home.ladderTitle} lede={t.home.ladderLede} />
          <ol className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
            {[...CATEGORIES]
              .sort((a, b) => a.ladderStep - b.ladderStep)
              .map((c) => (
                <li key={c.slug}>
                  <Link href={lp(lang, `/categories/${c.slug}`)} className="tile tile-link" style={{ background: c.colorSoft, height: "100%" }}>
                    <div className="tile-body" style={{ padding: 20 }}>
                      <span className="kicker" style={{ color: "var(--ink-2)" }}>
                        {fmt(t.home.step, { n: c.ladderStep })}
                      </span>
                      <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.04em", color: c.color, lineHeight: 1 }}>{c.short}</span>
                      <span className="small" style={{ fontWeight: 600 }}>
                        {c.name}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
          </ol>
          <p className="center mt-m">
            <LinkArrow lang={lang} href="/categories">
              {t.home.ladderLink}
            </LinkArrow>
          </p>
        </div>
      </section>

      {/* Learn */}
      <section className="section tone-paper">
        <div className="wrap">
          <SectionHead
            eyebrow={t.home.learnEyebrow}
            title={t.home.learnTitle}
            lede={t.home.learnLede}
            action={
              <LinkArrow lang={lang} href="/learn">
                {t.home.learnLink}
              </LinkArrow>
            }
          />
          <div className="grid grid-3">
            {(["Beginner", "Intermediate", "Advanced"] as const).map((level) => (
              <div key={level} className="tile" style={{ background: "var(--paper-2)" }}>
                <div className="tile-body">
                  <span className={`badge ${level === "Beginner" ? "badge-red" : ""}`} style={{ alignSelf: "flex-start" }}>
                    {t.learn.levels[level]}
                  </span>
                  <ul style={{ marginTop: 10 }}>
                    {LESSONS.filter((x) => x.level === level)
                      .slice(0, 3)
                      .map((x) => (
                        <li key={x.slug} style={{ borderTop: "1px solid var(--line-soft)" }}>
                          <Link href={lp(lang, `/learn/${x.slug}`)} className="flex-row space-between" style={{ padding: "12px 0", flexWrap: "nowrap" }}>
                            <span style={{ fontWeight: 600 }}>{x.title[lang]}</span>
                            <span className="caption">{x.minutes} min</span>
                          </Link>
                        </li>
                      ))}
                  </ul>
                  <LinkArrow lang={lang} href={`/learn?level=${level}`} className="mt-xs">
                    {t.learn.levels[level]}
                  </LinkArrow>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore */}
      <section className="section-tight tone-off">
        <div className="wrap">
          <p className="kicker">{t.home.exploreKicker}</p>
          <div className="grid grid-4 keep-2 mt-s">
            {[
              { icon: BookOpen, label: t.nav.history, href: "/history" },
              { icon: Flag, label: t.nav.seasons, href: "/seasons" },
              { icon: Trophy, label: t.nav.drivers, href: "/drivers" },
              { icon: Users, label: t.nav.teams, href: "/teams" },
              { icon: Wrench, label: t.nav.weekend, href: "/race-weekend" },
              { icon: Map, label: t.nav.circuits, href: "/circuits" },
              { icon: Gauge, label: t.nav.engineering, href: "/engineering" },
              { icon: Layers, label: t.nav.regulations, href: "/regulations" },
            ].map((x) => (
              <Link key={x.href} href={lp(lang, x.href)} className="card" style={{ flexDirection: "row", alignItems: "center", gap: 14, padding: "18px 20px" }}>
                <x.icon size={22} strokeWidth={1.7} color="var(--red)" aria-hidden />
                <span style={{ fontWeight: 600 }}>{x.label}</span>
                <ArrowRight size={16} style={{ marginLeft: "auto", color: "var(--ink-3)" }} aria-hidden />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
