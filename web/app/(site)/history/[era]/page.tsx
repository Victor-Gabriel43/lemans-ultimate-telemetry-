import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ERAS, getEra } from "@/lib/f1/eras";
import { seasonsInEra } from "@/lib/f1/seasons";
import { DRIVERS } from "@/lib/f1/drivers";
import { TEAMS } from "@/lib/f1/teams";
import { CARS } from "@/lib/f1/cars";
import { CarCard, DriverCard, TeamCard } from "@/components/site/cards";
import { Breadcrumbs, LinkArrow, Milestones, Plate } from "@/components/site/ui";
import { LocalNav } from "@/components/site/LocalNav";

export function generateStaticParams() {
  return ERAS.map((e) => ({ era: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/history/[era]">): Promise<Metadata> {
  const { era } = await params;
  const e = getEra(era);
  return e ? { title: `The ${e.decade}: ${e.name}`, description: e.tagline } : {};
}

export default async function EraPage({ params }: PageProps<"/history/[era]">) {
  const { era: slug } = await params;
  const era = getEra(slug);
  if (!era) notFound();

  const idx = ERAS.findIndex((e) => e.slug === slug);
  const prev = ERAS[idx - 1];
  const next = ERAS[idx + 1];
  const seasons = seasonsInEra(era.id);
  const drivers = era.drivers.map((s) => DRIVERS.find((d) => d.slug === s)).filter((d) => d !== undefined);
  const teams = era.teams.map((s) => TEAMS.find((t) => t.slug === s)).filter((t) => t !== undefined);
  const cars = era.cars.map((s) => CARS.find((c) => c.slug === s)).filter((c) => c !== undefined);

  return (
    <>
      <LocalNav
        title={`The ${era.decade}`}
        titleHref={`/history/${era.slug}`}
        links={[
          { label: "Context", href: "#context" },
          { label: "Technology", href: "#technology" },
          { label: "Developments", href: "#developments" },
          { label: "People & teams", href: "#people" },
          { label: "Seasons", href: "#seasons" },
        ]}
      />

      <section className="tone-night" style={{ paddingTop: 28 }}>
        <div className="wrap">
          <Breadcrumbs items={[{ label: "History", href: "/history" }, { label: era.decade }]} />
          <div className="center" style={{ padding: "clamp(48px,8vw,96px) 0 clamp(36px,5vw,56px)" }}>
            <p className="eyebrow-f1 rise">
              Chapter {idx + 1} · {era.start}–{Math.min(era.end, 2026)}
            </p>
            <h1 className="display balance rise rise-2">{era.name}</h1>
            <p className="lede mx-auto mt-m pretty rise rise-3" style={{ maxWidth: 720 }}>
              {era.tagline}
            </p>
          </div>
        </div>
        <div className="wrap-wide" style={{ paddingBottom: "clamp(56px,8vw,96px)" }}>
          <Plate alt={`Formula One in the ${era.decade}`} mediaId={`era-${era.slug}`} tone={era.tone} ratio="ratio-cinema" tag={era.themes.join(" · ")} glyph={era.decade} priority />
        </div>
      </section>

      <section className="section tone-paper" id="context">
        <div className="wrap-text">
          <p className="lede" style={{ color: "var(--ink)", fontWeight: 600 }}>
            {era.intro}
          </p>
          <div className="prose mt-l">
            <h3 style={{ marginTop: 0 }}>Historical context</h3>
            {era.context.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section tone-off" id="technology">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <div style={{ position: "sticky", top: 120 }}>
              <p className="eyebrow-f1">Technology</p>
              <h2 className="headline balance">How the cars changed.</h2>
              <div className="flex-row mt-m" style={{ gap: 8 }}>
                {era.themes.map((t) => (
                  <span key={t} className="badge">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="prose">
              {era.technology.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p>
                <LinkArrow href="/technology">Explore regulations & technology</LinkArrow>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section tone-paper" id="developments">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <div>
              <p className="eyebrow-f1">Important developments</p>
              <h2 className="headline balance">The decade, year by year.</h2>
              <p className="lede mt-s">The moments that defined the {era.decade}. Select a year to open its season page.</p>
            </div>
            <Milestones items={era.developments} linkYears />
          </div>
        </div>
      </section>

      {cars.length > 0 && (
        <section className="section tone-off">
          <div className="wrap-wide">
            <div className="section-head">
              <div>
                <p className="eyebrow-f1">Visual references</p>
                <h2 className="title-1">Cars of the {era.decade}.</h2>
              </div>
              <LinkArrow href="/cars">The car archive</LinkArrow>
            </div>
            <div className="grid grid-3">
              {cars.map((c) => (
                <CarCard key={c.slug} c={c} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section tone-paper" id="people">
        <div className="wrap-wide">
          <div className="section-head">
            <div>
              <p className="eyebrow-f1">Notable drivers</p>
              <h2 className="title-1">The people of the {era.decade}.</h2>
            </div>
            <LinkArrow href="/drivers">All drivers</LinkArrow>
          </div>
          <div className="grid grid-4 keep-2">
            {drivers.map((d) => (
              <DriverCard key={d.slug} d={d} />
            ))}
          </div>

          <div className="section-head mt-xl">
            <div>
              <p className="eyebrow-f1">Notable teams</p>
              <h2 className="title-1">The constructors.</h2>
            </div>
            <LinkArrow href="/teams">All teams</LinkArrow>
          </div>
          <div className="grid grid-3">
            {teams.map((t) => (
              <TeamCard key={t.slug} t={t} />
            ))}
          </div>
        </div>
      </section>

      <section className="section tone-off" id="seasons">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow-f1">Seasons</p>
              <h2 className="title-1">Every season of the {era.decade}.</h2>
            </div>
            <LinkArrow href={`/seasons?decade=${era.start}`}>Season archive</LinkArrow>
          </div>
          <div className="year-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))" }}>
            {seasons.map((s) => (
              <Link key={s.year} href={`/seasons/${s.year}`} className="year-cell">
                <span className="year-cell-year">{s.year}</span>
                <span className="year-cell-champ">{s.champions?.driver ?? "In progress"}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <nav className="section-tight tone-paper" aria-label="Adjacent eras">
        <div className="wrap flex-row space-between">
          {prev ? (
            <Link href={`/history/${prev.slug}`} className="flex-row" style={{ gap: 8 }}>
              <ChevronLeft size={20} />
              <span>
                <span className="caption" style={{ display: "block" }}>
                  Previous chapter
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
            <Link href={`/history/${next.slug}`} className="flex-row" style={{ gap: 8, textAlign: "right" }}>
              <span>
                <span className="caption" style={{ display: "block" }}>
                  Next chapter
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
