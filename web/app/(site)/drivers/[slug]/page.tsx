import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DRIVERS, getDriver } from "@/lib/f1/drivers";
import { driverTitles } from "@/lib/f1/seasons";
import { getEra } from "@/lib/f1/eras";
import { CARS } from "@/lib/f1/cars";
import { CarCard, DriverCard } from "@/components/site/cards";
import { Breadcrumbs, DataNotice, LinkArrow, Milestones, Pending, Plate, Specs } from "@/components/site/ui";

export function generateStaticParams() {
  return DRIVERS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/drivers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const d = getDriver(slug);
  return d ? { title: d.name, description: d.summary } : {};
}

export default async function DriverPage({ params }: PageProps<"/drivers/[slug]">) {
  const { slug } = await params;
  const d = getDriver(slug);
  if (!d) notFound();
  const titles = driverTitles(d.slug);
  const cars = CARS.filter((c) => c.drivers.includes(d.slug));
  const peers = DRIVERS.filter((x) => x.slug !== d.slug && x.eras.some((e) => d.eras.includes(e))).slice(0, 4);

  return (
    <>
      <section className="tone-paper" style={{ paddingTop: 28 }}>
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Drivers", href: "/drivers" }, { label: d.name }]} />
          <div className="grid grid-2" style={{ marginTop: "clamp(32px,5vw,64px)", gap: "clamp(32px,6vw,80px)", alignItems: "center" }}>
            <Plate
              alt={`Portrait of ${d.name}`}
              mediaId={`driver-${d.slug}`}
              tone={d.tone}
              ratio="ratio-portrait"
              tag={d.nationality}
              glyph={
                <span style={{ letterSpacing: "-0.02em" }}>
                  {d.firstName[0]}
                  {d.lastName[0]}
                </span>
              }
              priority
            />
            <div>
              <p className="eyebrow-f1">{d.knownFor}</p>
              <h1 className="display balance">
                {d.firstName}
                <br />
                {d.lastName}
              </h1>
              <p className="lede mt-s pretty">{d.summary}</p>
              <div className="flex-row mt-m" style={{ gap: 8 }}>
                {titles.length > 0 && <span className="badge badge-red">{titles.length}× World Champion</span>}
                <span className="badge">{d.active ? "Racing in 2026" : "Retired"}</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: "clamp(56px,8vw,96px)" }} />
      </section>

      <section className="section tone-off">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <div>
              <p className="eyebrow-f1">Profile</p>
              <Specs
                rows={[
                  ["Nationality", d.nationality],
                  ["World Championship career", `${d.firstSeason} – ${d.lastSeason ?? "present"}`],
                  ["Teams", d.teams.map((t, i) => (
                    <span key={t.name + i}>
                      {t.slug ? <Link href={`/teams/${t.slug}`} className="inline-link">{t.name}</Link> : t.name}
                      {i < d.teams.length - 1 ? ", " : ""}
                    </span>
                  ))],
                  [
                    "Championships",
                    titles.length ? (
                      <span>
                        {titles.map((y, i) => (
                          <span key={y}>
                            <Link href={`/seasons/${y}`} className="inline-link">{y}</Link>
                            {i < titles.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </span>
                    ) : (
                      "—"
                    ),
                  ],
                  ["Eras", d.eras.map((e, i) => (
                    <span key={e}>
                      <Link href={`/history/${getEra(e)?.slug}`} className="inline-link">{e}</Link>
                      {i < d.eras.length - 1 ? ", " : ""}
                    </span>
                  ))],
                ]}
              />
            </div>
            <div className="prose">
              <p className="eyebrow-f1" style={{ fontSize: 17 }}>
                Career story
              </p>
              {d.bio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section tone-paper">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <div>
              <p className="eyebrow-f1">Career timeline</p>
              <h2 className="title-1">Key moments.</h2>
              <div className="mt-m">
                <Pending title="Career statistics">Starts, wins, poles and podiums will be added from verified race records.</Pending>
              </div>
            </div>
            <Milestones items={d.timeline} linkYears />
          </div>
        </div>
      </section>

      {cars.length > 0 && (
        <section className="section tone-off">
          <div className="wrap">
            <p className="eyebrow-f1">Cars</p>
            <h2 className="title-1">Driven by {d.lastName}.</h2>
            <div className="grid grid-3 mt-m">
              {cars.map((c) => (
                <CarCard key={c.slug} c={c} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section tone-paper">
        <div className="wrap-wide">
          <div className="section-head">
            <div>
              <p className="eyebrow-f1">Contemporaries</p>
              <h2 className="title-1">From the same era.</h2>
            </div>
            <LinkArrow href="/drivers">All drivers</LinkArrow>
          </div>
          <div className="grid grid-4 keep-2">
            {peers.map((p) => (
              <DriverCard key={p.slug} d={p} />
            ))}
          </div>
          <div className="mt-l">
            <DataNotice>Biographies are editorial summaries. Detailed statistics arrive with verified data in Phase 2.</DataNotice>
          </div>
        </div>
      </section>
    </>
  );
}
