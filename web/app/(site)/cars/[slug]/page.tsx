import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CARS, GENERATIONS, getCar } from "@/lib/f1/cars";
import { DRIVERS } from "@/lib/f1/drivers";
import { getEra } from "@/lib/f1/eras";
import { CarCard } from "@/components/site/cards";
import { Breadcrumbs, DataNotice, LinkArrow, Pending, Plate, Specs } from "@/components/site/ui";

export function generateStaticParams() {
  return CARS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/cars/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCar(slug);
  return c ? { title: c.name, description: c.intro } : {};
}

export default async function CarPage({ params }: PageProps<"/cars/[slug]">) {
  const { slug } = await params;
  const car = getCar(slug);
  if (!car) notFound();
  const gen = GENERATIONS.find((g) => g.id === car.generation)!;
  const era = getEra(car.era)!;
  const drivers = car.drivers.map((s) => DRIVERS.find((d) => d.slug === s)).filter((d) => d !== undefined);
  const sorted = [...CARS].sort((a, b) => a.year - b.year);
  const i = sorted.findIndex((c) => c.slug === car.slug);
  const related = [sorted[i - 1], sorted[i + 1], ...CARS.filter((c) => c.generation === car.generation && c.slug !== car.slug)]
    .filter((c, n, arr) => c && arr.findIndex((x) => x?.slug === c.slug) === n)
    .slice(0, 3);

  return (
    <>
      <section className="tone-paper" style={{ paddingTop: 28 }}>
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Cars", href: "/cars" }, { label: car.name }]} />
          <div className="center" style={{ padding: "clamp(40px,7vw,88px) 0 clamp(32px,5vw,48px)" }}>
            <p className="eyebrow-f1">
              {car.team} · {car.seasons}
            </p>
            <h1 className="display balance mx-auto" style={{ maxWidth: 900 }}>
              {car.name}
            </h1>
            <p className="lede mx-auto mt-s" style={{ maxWidth: 640 }}>
              {car.headline}
            </p>
          </div>
        </div>
        <div className="wrap-wide">
          <Plate alt={car.name} mediaId={`car-${car.slug}`} tone={car.tone} ratio="ratio-cinema" tag={`${gen.name} · ${car.regulation}`} glyph={car.year} priority />
        </div>
        <div style={{ height: "clamp(56px,8vw,96px)" }} />
      </section>

      <section className="section tone-off">
        <div className="wrap-text">
          <p className="lede" style={{ color: "var(--ink)", fontWeight: 600 }}>
            {car.intro}
          </p>
          <div className="prose mt-l">
            <h3 style={{ marginTop: 0 }}>Historical context</h3>
            {car.context.map((p, n) => (
              <p key={n}>{p}</p>
            ))}
            <h3>Design characteristics</h3>
            {car.design.map((p, n) => (
              <p key={n}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section tone-night">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <div>
              <p className="eyebrow-f1">Technical overview</p>
              <h2 className="title-1">Under the skin.</h2>
              <div className="mt-m">
                <Specs
                  rows={[
                    ["Constructor", car.teamSlug ? <Link href={`/teams/${car.teamSlug}`}>{car.team}</Link> : car.team],
                    ["Raced", car.seasons],
                    ["Engine", car.engine],
                    ["Regulations", car.regulation],
                    ["Generation", `${gen.name} (${gen.years})`],
                    ["Era", <Link key="era" href={`/history/${era.slug}`}>{era.decade} — {era.name}</Link>],
                    ...(car.designer ? ([["Design", car.designer]] as [string, string][]) : []),
                  ]}
                />
              </div>
            </div>
            <div>
              <p className="eyebrow-f1">Important innovations</p>
              <ul style={{ display: "grid", gap: 12, marginTop: 8 }}>
                {car.innovations.map((x) => (
                  <li key={x} className="tile" style={{ background: "var(--night-3)" }}>
                    <div className="tile-body" style={{ padding: "18px 22px" }}>
                      <span className="title-3">{x}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-m" style={{ color: "var(--ink-3)" }}>
                <Pending title="Full specifications">Weight, power output, dimensions and gearbox details from verified sources.</Pending>
              </div>
            </div>
          </div>
        </div>
      </section>

      {drivers.length > 0 && (
        <section className="section-tight tone-paper">
          <div className="wrap">
            <p className="kicker">Notable drivers</p>
            <div className="flex-row mt-s" style={{ gap: 10 }}>
              {drivers.map((d) => (
                <Link key={d.slug} href={`/drivers/${d.slug}`} className="chip">
                  {d.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section tone-off">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow-f1">Continue exploring</p>
              <h2 className="title-1">Related cars.</h2>
            </div>
            <LinkArrow href="/cars">All cars</LinkArrow>
          </div>
          <div className="grid grid-3">
            {related.map((c) => (
              <CarCard key={c!.slug} c={c!} />
            ))}
          </div>
          <div className="mt-l">
            <DataNotice>Car pages are editorial. Detailed specifications and licensed photography will be added in Phase 2.</DataNotice>
          </div>
        </div>
      </section>
    </>
  );
}
