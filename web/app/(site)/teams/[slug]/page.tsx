import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TEAMS, getTeam } from "@/lib/f1/teams";
import { DRIVERS } from "@/lib/f1/drivers";
import { CARS } from "@/lib/f1/cars";
import { constructorTitles, teamDriverTitles } from "@/lib/f1/seasons";
import { CarCard, DriverCard } from "@/components/site/cards";
import { Breadcrumbs, DataNotice, LinkArrow, Milestones, Pending, Specs, Stat } from "@/components/site/ui";

export function generateStaticParams() {
  return TEAMS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/teams/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const t = getTeam(slug);
  return t ? { title: t.name, description: t.summary } : {};
}

export default async function TeamPage({ params }: PageProps<"/teams/[slug]">) {
  const { slug } = await params;
  const t = getTeam(slug);
  if (!t) notFound();
  const cTitles = constructorTitles(t.slug);
  const dTitles = teamDriverTitles(t.matchName);
  const drivers = t.drivers.map((s) => DRIVERS.find((d) => d.slug === s)).filter((d) => d !== undefined);
  const cars = CARS.filter((c) => c.teamSlug === t.slug);

  return (
    <>
      <section className="tone-night" style={{ paddingTop: 28, position: "relative", overflow: "hidden" }}>
        <div
          aria-hidden
          style={{ position: "absolute", inset: 0, background: `radial-gradient(80% 60% at 85% 10%, ${t.color}55, transparent 60%)` }}
        />
        <div className="wrap" style={{ position: "relative" }}>
          <Breadcrumbs items={[{ label: "Teams", href: "/teams" }, { label: t.name }]} />
          <div style={{ padding: "clamp(56px,9vw,120px) 0 clamp(56px,8vw,96px)", maxWidth: 860 }}>
            <div className="cat-bar" style={{ ["--cat" as string]: t.color, marginBottom: 20 }} />
            <p className="eyebrow-f1">
              {t.base}, {t.country} · {t.firstSeason}–{t.active ? "present" : t.lastSeason}
            </p>
            <h1 className="display balance">{t.name}</h1>
            <p className="lede mt-m pretty">{t.summary}</p>
          </div>
          <div className="stat-row" style={{ paddingBottom: "clamp(56px,8vw,96px)" }}>
            <Stat value={cTitles.length} label="Constructors’ championships" />
            <Stat value={dTitles.length} label="Drivers’ championships won by its drivers" />
            <Stat value={t.firstSeason} label="First World Championship season" />
            <Stat value={t.active ? "2026" : t.lastSeason} label={t.active ? "On the current grid" : "Final season"} />
          </div>
        </div>
      </section>

      <section className="section tone-paper">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <div className="prose">
              <p className="eyebrow-f1" style={{ fontSize: 17 }}>
                Team history
              </p>
              {t.history.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <h3>Identity and evolution</h3>
              <p>{t.identity}</p>
            </div>
            <div>
              <Specs
                rows={[
                  ["Base", `${t.base}, ${t.country}`],
                  ["Founder", t.founders ?? "—"],
                  ["Status", t.active ? "Competing in 2026" : "No longer competing"],
                  [
                    "Constructors’ titles",
                    cTitles.length ? (
                      <span>
                        {cTitles.map((y, i) => (
                          <span key={y}>
                            <Link href={`/seasons/${y}`} className="inline-link">
                              {y}
                            </Link>
                            {i < cTitles.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </span>
                    ) : (
                      "—"
                    ),
                  ],
                  [
                    "Drivers’ titles",
                    dTitles.length ? (
                      <span>
                        {dTitles.map((y, i) => (
                          <span key={y}>
                            <Link href={`/seasons/${y}`} className="inline-link">
                              {y}
                            </Link>
                            {i < dTitles.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </span>
                    ) : (
                      "—"
                    ),
                  ],
                ]}
              />
              {t.lineage && (
                <div className="mt-m">
                  <p className="kicker">Lineage</p>
                  <ol className="flex-row mt-xs" style={{ gap: 6 }}>
                    {t.lineage.map((l, i) => (
                      <li key={l + i} className="flex-row" style={{ gap: 6 }}>
                        <span className="badge">{l}</span>
                        {i < t.lineage!.length - 1 && <span className="muted" aria-hidden>→</span>}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section tone-off">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <div>
              <p className="eyebrow-f1">Timeline</p>
              <h2 className="title-1">Milestones.</h2>
            </div>
            <Milestones items={t.timeline} linkYears />
          </div>
        </div>
      </section>

      <section className="section tone-paper">
        <div className="wrap-wide">
          <div className="section-head">
            <div>
              <p className="eyebrow-f1">Cars</p>
              <h2 className="title-1">Landmark {t.name} cars.</h2>
            </div>
            <LinkArrow href="/cars">The car archive</LinkArrow>
          </div>
          {cars.length ? (
            <div className="grid grid-3">
              {cars.map((c) => (
                <CarCard key={c.slug} c={c} />
              ))}
            </div>
          ) : (
            <Pending title="Car profiles">Profiles of {t.name}’s cars will be added with verified technical specifications.</Pending>
          )}

          <div className="section-head mt-xl">
            <div>
              <p className="eyebrow-f1">Drivers</p>
              <h2 className="title-1">Who drove for {t.name}.</h2>
            </div>
            <LinkArrow href="/drivers">All drivers</LinkArrow>
          </div>
          {drivers.length ? (
            <div className="grid grid-4 keep-2">
              {drivers.map((d) => (
                <DriverCard key={d.slug} d={d} />
              ))}
            </div>
          ) : (
            <Pending title="Driver history">The team’s full driver history will be added from verified entry lists.</Pending>
          )}
          <div className="mt-l">
            <DataNotice>Championship counts are derived from the editorial season index and will be reconciled with official records.</DataNotice>
          </div>
        </div>
      </section>
    </>
  );
}
