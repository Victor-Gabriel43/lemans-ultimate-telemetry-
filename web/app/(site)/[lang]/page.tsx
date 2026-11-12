import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { lp, type Lang } from "@/lib/i18n/config";
import { fmt, getDict } from "@/lib/i18n/dict";
import { chassis, chassisName, circuit, ctor, db, driver, formatDate, gpName, season } from "@/lib/f1/db";
import { eras } from "@/lib/f1/content";
import { eraHero } from "@/lib/f1/derive";
import { chassisPhoto, circuitPhoto, driverPhoto, photo } from "@/lib/f1/media";
import { sized } from "@/lib/f1/img";
import { DriverCard } from "@/components/site/cards";
import { Plate } from "@/components/site/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const t = getDict(lang as Lang);
  return { title: { absolute: `Paddock — ${t.meta.tagline}` } };
}

const LEGENDS = ["juan-manuel-fangio", "jim-clark", "jackie-stewart", "niki-lauda", "alain-prost", "ayrton-senna", "michael-schumacher", "sebastian-vettel", "lewis-hamilton", "max-verstappen"];

const ICONIC_CARS: { id: string; line: { pt: string; en: string } }[] = [
  { id: "mclaren-mp4-4", line: { pt: "1988 · Senna e Prost venceram 15 das 16 corridas.", en: "1988 · Senna and Prost won 15 of the 16 races." } },
  { id: "ferrari-f2004", line: { pt: "2004 · 15 vitórias em 18 corridas e o sétimo título de Schumacher.", en: "2004 · 15 wins from 18 races and Schumacher's seventh title." } },
  { id: "red-bull-rb19", line: { pt: "2023 · 21 vitórias em 22 corridas.", en: "2023 · 21 wins from 22 races." } },
  { id: "williams-fw14b", line: { pt: "1992 · Suspensão ativa e o título de Nigel Mansell.", en: "1992 · Active suspension and Nigel Mansell's title." } },
  { id: "lotus-79", line: { pt: "1978 · O carro-asa de Mario Andretti.", en: "1978 · Mario Andretti's wing car." } },
  { id: "mercedes-f1-w05", line: { pt: "2014 · O primeiro campeão da era híbrida.", en: "2014 · The first champion of the hybrid era." } },
];

function decadeLabel(start: number, lang: Lang) {
  const d = String(start).slice(2, 4);
  return lang === "pt" ? `Anos ${d}` : `The '${d}s`;
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang: l } = await params;
  const lang = l as Lang;
  const pt = lang === "pt";
  const t = getDict(lang);
  const i = db();
  const cur = i.seasons[i.seasons.length - 1];
  const curData = season(cur.year)!;
  const standings = curData.driverStandings;
  const champ = driver(cur.champion);
  const leader = driver(cur.leader ?? cur.champion);
  const first = standings[0];
  const second = standings[1];
  const secondDriver = driver(second?.d);
  const remaining = cur.rounds - cur.completed;
  const wins = curData.races.filter((r) => r.results.some((x) => x.pos === 1 && x.d === first?.d)).length;
  const nextRace = curData.races.find((r) => !r.results.length);
  const nextCircuit = nextRace ? circuit(nextRace.circuit) : undefined;
  const hero = photo("home-hero");
  const raceShot = photo("home-race");
  const E = eras(lang);
  const cLead = ctor(cur.constructorChampion ?? cur.constructorLeader);
  const championsCount = new Set(i.seasons.map((s) => s.champion).filter(Boolean)).size;

  const headline = champ ? (pt ? `${champ.last} é campeão do mundo.` : `${champ.last} is world champion.`) : pt ? `${leader?.last ?? ""} lidera ${cur.year}.` : `${leader?.last ?? ""} leads ${cur.year}.`;
  const sub = champ
    ? pt
      ? `${champ.name} garantiu matematicamente o título de ${cur.year}: ${first.pts} pontos, ${first.pts - second.pts} à frente de ${secondDriver?.name}, com ${remaining} ${remaining === 1 ? "etapa" : "etapas"} ainda por disputar. ${wins} vitórias em ${cur.completed} corridas.`
      : `${champ.name} has mathematically secured the ${cur.year} title: ${first.pts} points, ${first.pts - second.pts} clear of ${secondDriver?.name}, with ${remaining} ${remaining === 1 ? "round" : "rounds"} still to run. ${wins} wins from ${cur.completed} races.`
    : pt
      ? `${first?.pts} pontos depois de ${cur.completed} de ${cur.rounds} etapas.`
      : `${first?.pts} points after ${cur.completed} of ${cur.rounds} rounds.`;

  return (
    <>
      {/* Hero — full-bleed photograph */}
      <section className="home-hero">
        {hero && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={hero.src} alt={pt ? "Kimi Antonelli com a Mercedes no GP da Holanda de 2026" : "Kimi Antonelli in the Mercedes at the 2026 Dutch Grand Prix"} className="home-hero-img" fetchPriority="high" />
        )}
        <div className="home-hero-shade" aria-hidden />
        <div className="wrap-wide home-hero-content">
          <p className="eyebrow-f1">
            {pt ? `Temporada ${cur.year}` : `${cur.year} season`} · {champ ? (pt ? "Título decidido" : "Title decided") : pt ? "Em andamento" : "In progress"}
          </p>
          <h1 className="home-hero-title balance">{headline}</h1>
          <p className="home-hero-sub pretty">{sub}</p>
          <div className="flex-row mt-m" style={{ gap: 10 }}>
            <Link href={lp(lang, `/seasons/${cur.year}`)} className="btn btn-red">
              {pt ? `A temporada ${cur.year}` : `The ${cur.year} season`}
            </Link>
            {(champ ?? leader) && (
              <Link href={lp(lang, `/drivers/${(champ ?? leader)!.id}`)} className="btn btn-ghost">
                {pt ? "Perfil do piloto" : "Driver profile"}
              </Link>
            )}
          </div>
        </div>
        {hero && (
          <a className="home-hero-credit" href={hero.sourceUrl} target="_blank" rel="noreferrer">
            {fmt(t.common.photoCredit, { credit: hero.credit, license: hero.license })}
          </a>
        )}
      </section>

      {/* Next race + standings */}
      <section className="section tone-night" style={{ paddingTop: "clamp(48px,6vw,72px)" }}>
        <div className="wrap-wide">
          <div className="grid grid-2" style={{ gap: "clamp(24px,4vw,48px)", alignItems: "start" }}>
            {nextRace && nextCircuit ? (
              <Link href={lp(lang, `/seasons/${cur.year}/${nextRace.slug}`)} className="photo-card">
                <Plate linked lang={lang} alt={nextCircuit.full} photo={circuitPhoto(nextCircuit.id)} tone="red" ratio="ratio-wide" flat glyph={nextCircuit.name} glyphSize="sm" />
                <div className="photo-card-body">
                  <p className="kicker">
                    {pt ? "Próxima corrida" : "Next race"} · {fmt(t.race.eyebrow, { y: cur.year, r: nextRace.round })}
                  </p>
                  <p className="title-1">{gpName(nextRace.gp)}</p>
                  <p className="muted">
                    {formatDate(nextRace.date, lang)} · {nextCircuit.full}
                  </p>
                </div>
              </Link>
            ) : (
              raceShot && <Plate lang={lang} alt="Formula 1" photo={raceShot} ratio="ratio-wide" />
            )}
            <div>
              <p className="kicker">{pt ? "Classificação de pilotos" : "Drivers' standings"}</p>
              <ol className="standings-mini mt-s">
                {standings.slice(0, 8).map((s) => (
                  <li key={s.d}>
                    <span className="num pos">{s.pos}</span>
                    <Link href={lp(lang, `/drivers/${s.d}`)} className="name">
                      {driver(s.d)?.name ?? s.d}
                    </Link>
                    <span className="num pts">{s.pts}</span>
                  </li>
                ))}
              </ol>
              <Link href={lp(lang, `/seasons/${cur.year}#drivers`)} className="link-arrow mt-s">
                {pt ? "Classificação completa" : "Full standings"} <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The calendar, circuit by circuit */}
      <section className="section tone-paper">
        <div className="wrap-wide home-head">
          <h2 className="headline">{pt ? `O calendário ${cur.year}` : `The ${cur.year} calendar`}</h2>
          <Link href={lp(lang, "/circuits")} className="link-arrow">
            {pt ? "Todos os circuitos" : "All circuits"} <ArrowRight size={14} />
          </Link>
        </div>
        <div className="rail mt-m">
          {curData.races.map((r) => {
            const c = circuit(r.circuit);
            const w = r.results.find((x) => x.pos === 1);
            return (
              <Link key={r.slug} href={lp(lang, `/seasons/${cur.year}/${r.slug}`)} className="card">
                <Plate linked lang={lang} alt={c?.full ?? r.circuit} photo={c ? circuitPhoto(c.id) : undefined} tone="graphite" ratio="ratio-photo" flat tag={`R${r.round}`} glyph={c?.name ?? ""} glyphSize="sm" />
                <div className="card-body">
                  <p className="card-meta">
                    {formatDate(r.date, lang)} · {c?.name}
                  </p>
                  <p className="card-title">{gpName(r.gp)}</p>
                  <p className="small muted">{w ? `${pt ? "Vencedor" : "Winner"}: ${driver(w.d)?.name ?? w.d}` : pt ? "A disputar" : "Still to run"}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Iconic cars */}
      <section className="section tone-off">
        <div className="wrap-wide">
          <div className="home-head">
            <h2 className="headline">{pt ? "Os carros que mudaram tudo" : "The cars that changed everything"}</h2>
            <Link href={lp(lang, "/teams")} className="link-arrow">
              {pt ? "Todas as equipes e seus carros" : "Every team and its cars"} <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-3 mt-m">
            {ICONIC_CARS.map(({ id, line }) => {
              const ch = chassis(id);
              if (!ch) return null;
              return (
                <Link key={id} href={lp(lang, `/cars/${id}`)} className="card">
                  <Plate linked lang={lang} alt={chassisName(id)} photo={chassisPhoto(id)} tone="graphite" ratio="ratio-wide" flat glyph={ch.name} glyphSize="sm" />
                  <div className="card-body">
                    <p className="card-title">{chassisName(id)}</p>
                    <p className="small muted">{line[lang]}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Champions */}
      <section className="section tone-paper">
        <div className="wrap-wide home-head">
          <h2 className="headline">{pt ? "Campeões" : "Champions"}</h2>
          <Link href={lp(lang, "/drivers?filter=champions")} className="link-arrow">
            {pt ? `Os ${championsCount} campeões` : `All ${championsCount} champions`} <ArrowRight size={14} />
          </Link>
        </div>
        <div className="rail mt-m">
          {[...(champ ? [champ.id] : []), ...LEGENDS.slice().reverse()]
            .map((id) => driver(id))
            .filter((d) => d && driverPhoto(d.id))
            .map((d) => (
              <DriverCard key={d!.id} d={d!} lang={lang} />
            ))}
        </div>
      </section>

      {/* Decades */}
      <section className="section tone-night">
        <div className="wrap-wide">
          <div className="home-head">
            <h2 className="headline">{pt ? "De 1950 até hoje" : "From 1950 to today"}</h2>
            <Link href={lp(lang, "/history")} className="link-arrow">
              {pt ? "A história completa" : "The full history"} <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-4 keep-2 mt-m">
            {E.map((e) => {
              const h = eraHero(e.start, e.end);
              const champs = [...new Set(i.seasons.filter((s) => s.year >= e.start && s.year <= e.end && s.champion).map((s) => driver(s.champion)?.last))].slice(0, 4);
              return (
                <Link key={e.id} href={lp(lang, `/history/${e.slug}`)} className="decade-tile">
                  {h && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={sized(h.photo.src, 500)} alt={h.label} loading="lazy" decoding="async" />
                  )}
                  <div className="decade-tile-text">
                    <span className="decade-tile-year">{decadeLabel(e.start, lang)}</span>
                    <span className="decade-tile-names">{champs.join(" · ")}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Engineering & regulations */}
      <section className="section tone-paper">
        <div className="wrap-wide">
          <div className="grid grid-2" style={{ gap: 24 }}>
            {[
              { href: "/engineering", title: pt ? "Como funciona um F1" : "How an F1 car works", text: pt ? "Aerodinâmica, motor híbrido, pneus, freios e segurança — com os carros que mudaram cada área." : "Aerodynamics, hybrid engines, tyres, brakes and safety — with the cars that changed each one.", car: "lotus-79" },
              { href: "/regulations", title: pt ? "O regulamento, artigo por artigo" : "The rulebook, article by article", text: pt ? "Os documentos oficiais da FIA desde 2018, com busca e comparação entre versões." : "The official FIA documents since 2018, searchable and comparable between versions.", car: "red-bull-rb19" },
            ].map((x) => (
              <Link key={x.href} href={lp(lang, x.href)} className="photo-card">
                <Plate linked lang={lang} alt={x.title} photo={chassisPhoto(x.car)} tone="graphite" ratio="ratio-wide" flat />
                <div className="photo-card-body">
                  <p className="title-1">{x.title}</p>
                  <p className="muted">{x.text}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex-row mt-l" style={{ gap: 10 }}>
            <Link href={lp(lang, "/race-weekend")} className="chip">
              {t.nav.weekend}
            </Link>
            <Link href={lp(lang, "/categories")} className="chip">
              {t.nav.categories}
            </Link>
            <Link href={lp(lang, "/learn")} className="chip">
              {t.nav.learn}
            </Link>
            {cLead && (
              <Link href={lp(lang, `/teams/${cLead.id}`)} className="chip">
                {cLead.name}
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
