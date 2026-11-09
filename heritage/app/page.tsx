import Link from "next/link";
import { db } from "@/lib/db";
import { Container, SectionHeading } from "@/components/Section";
import LiveryArt from "@/components/LiveryArt";
import { LiveryCard, VehicleCard } from "@/components/Cards";
import { parseDesign, formatDate } from "@/lib/format";
import { TIMELINE_CATEGORIES } from "@/lib/vocab";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [featured, vehicles, recent, liveries, milestones, manufacturers, counts] = await Promise.all([
    db.vehicle.findFirst({ where: { featured: true, status: "published" }, include: { manufacturer: true, _count: { select: { liveries: true, results: true, timeline: true, entries: true } } } }),
    db.vehicle.findMany({ include: { manufacturer: true, _count: { select: { liveries: true, timeline: true, results: true } } }, orderBy: [{ status: "desc" }, { era: "asc" }, { debutYear: "asc" }], take: 6 }),
    db.vehicle.findMany({ include: { manufacturer: true }, orderBy: { createdAt: "desc" }, take: 5 }),
    db.livery.findMany({ where: { isVariation: false }, include: { team: true, vehicle: true }, orderBy: [{ year: "desc" }, { firstUsed: "desc" }], take: 8 }),
    db.timelineEntry.findMany({ where: { milestone: true }, include: { vehicle: true }, orderBy: { date: "asc" } }),
    db.manufacturer.findMany({ include: { _count: { select: { vehicles: true } } }, orderBy: { name: "asc" } }),
    Promise.all([db.vehicle.count(), db.livery.count(), db.source.count(), db.timelineEntry.count()]),
  ]);

  const featuredTeams = featured
    ? await db.team.findMany({ where: { entries: { some: { vehicleId: featured.id } } }, select: { kind: true } })
    : [];
  const factoryCount = featuredTeams.filter((t) => t.kind === "factory").length;
  const heroLivery = featured?.heroLiveryId ? await db.livery.findUnique({ where: { id: featured.heroLiveryId } }) : null;
  const designMap = new Map<string, string>();
  for (const v of vehicles) if (v.heroLiveryId) designMap.set(v.id, (await db.livery.findUnique({ where: { id: v.heroLiveryId } }))?.design ?? "");

  return (
    <>
      {/* ── Hero ── */}
      <section className="grain relative overflow-hidden border-b hairline">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_60%,rgba(208,2,27,0.16),transparent_55%),radial-gradient(ellipse_at_20%_10%,rgba(255,255,255,0.06),transparent_50%)]" />
        <Container className="relative grid min-h-[78vh] content-center gap-10 py-20">
          <div className="max-w-4xl">
            <p className="eyebrow rise">Digital museum of historic motorsport cars · Est. 2026</p>
            <h1 className="display rise rise-2 mt-6 text-[clamp(3.2rem,9vw,8.5rem)]">
              Every car.<br />
              Every livery. <em className="text-mute">Every source.</em>
            </h1>
            <p className="rise rise-3 mt-8 max-w-xl text-lg text-soft">
              An authoritative archive of racing machines — their engineering, the teams and drivers who raced them, the results they
              earned and every colour scheme they wore.
            </p>
            <form action="/search" className="rise rise-3 mt-10 flex max-w-xl items-center border-b border-mute focus-within:border-paper">
              <label htmlFor="hero-q" className="sr-only">Search the archive</label>
              <input id="hero-q" name="q" placeholder="Search cars, liveries, drivers, races…" className="w-full bg-transparent py-3 text-lg placeholder:text-mute focus:outline-none" />
              <button className="eyebrow px-2 py-3 hover:text-paper">Search →</button>
            </form>
          </div>
          {heroLivery ? (
            <div className="drift pointer-events-none relative -mr-[10%] ml-auto w-[min(1100px,110%)] opacity-95 lg:-mt-24">
              <LiveryArt design={parseDesign(heroLivery.design)} title={heroLivery.name} />
            </div>
          ) : null}
        </Container>
        <Container className="relative grid grid-cols-2 border-t hairline md:grid-cols-4">
          {[
            ["Vehicles catalogued", counts[0]],
            ["Liveries documented", counts[1]],
            ["Timeline records", counts[3]],
            ["Cited sources", counts[2]],
          ].map(([label, n]) => (
            <div key={label as string} className="border-r hairline py-6 pr-4 last:border-r-0 [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r">
              <p className="display text-4xl tabular-nums">{n}</p>
              <p className="eyebrow mt-1">{label}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* ── Featured: Porsche 963 ── */}
      {featured ? (
        <section className="py-24">
          <Container>
            <SectionHeading index="01" eyebrow="First complete collection" title={featured.fullName}>
              {featured.tagline}
            </SectionHeading>
            <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
              <div className="prose-archive">
                <p>{featured.summary}</p>
                <p>{featured.unveiling}</p>
              </div>
              <div className="grid content-start gap-px bg-line">
                {[
                  ["Debut season", String(featured.debutYear)],
                  ["Category", featured.category],
                  ["Teams documented", `${factoryCount} factory · ${featuredTeams.length - factoryCount} customer`],
                  ["Season entries", String(featured._count.entries)],
                  ["Results recorded", String(featured._count.results)],
                  ["Liveries archived", String(featured._count.liveries)],
                ].map(([k, val]) => (
                  <div key={k} className="flex items-baseline justify-between gap-6 bg-ink py-3">
                    <span className="eyebrow">{k}</span>
                    <span className="text-right text-sm">{val}</span>
                  </div>
                ))}
                <div className="flex flex-wrap gap-3 bg-ink pt-6">
                  <Link href={`/vehicles/${featured.slug}`} className="rounded-full bg-paper px-5 py-2.5 text-sm text-ink hover:bg-white">Open the profile</Link>
                  <Link href={`/vehicles/${featured.slug}/liveries`} className="rounded-full border hairline px-5 py-2.5 text-sm hover:border-mute">Livery archive</Link>
                  <Link href={`/vehicles/${featured.slug}/timeline`} className="rounded-full border hairline px-5 py-2.5 text-sm hover:border-mute">Timeline</Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {/* ── Featured liveries ── */}
      <section className="py-16">
        <Container>
          <SectionHeading index="02" eyebrow="Featured liveries" title="Colours of competition">
            Launch schemes, anniversary designs, historic tributes and customer colours. Seasonal sponsor updates are archived as variations of
            their parent design, never as new liveries.
          </SectionHeading>
        </Container>
        <div className="scrollbar-none flex snap-x gap-4 overflow-x-auto px-4 pb-4 sm:px-6 lg:px-[max(2.5rem,calc((100vw-1400px)/2+2.5rem))]">
          {liveries.map((l) => (
            <div key={l.id} className="w-[300px] shrink-0 snap-start sm:w-[340px]">
              <LiveryCard l={l} vehicleSlug={l.vehicle.slug} />
            </div>
          ))}
          <Link href="/liveries" className="flex w-[220px] shrink-0 items-center justify-center rounded-sm border border-dashed hairline text-sm text-soft hover:text-paper">
            All liveries →
          </Link>
        </div>
      </section>

      {/* ── Collection ── */}
      <section className="py-16">
        <Container>
          <SectionHeading index="03" eyebrow="Featured racing cars" title="The collection">
            The Porsche 963 is the first fully documented profile. The cars below are catalogued and their histories are being researched to
            the same standard before publication.
          </SectionHeading>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((v) => (
              <VehicleCard key={v.id} v={v} design={designMap.get(v.id)} />
            ))}
          </div>
        </Container>
      </section>

      {/* ── Timeline ── */}
      <section className="py-16">
        <Container>
          <SectionHeading index="04" eyebrow="Motorsport timeline" title="Milestones">
            Key moments across the archive, in chronological order.
          </SectionHeading>
        </Container>
        <ol className="scrollbar-none flex gap-0 overflow-x-auto px-4 pb-6 sm:px-6 lg:px-[max(2.5rem,calc((100vw-1400px)/2+2.5rem))]">
          {milestones.map((m) => (
            <li key={m.id} className="w-[260px] shrink-0 border-l hairline pr-6 pl-5">
              <Link href={`/vehicles/${m.vehicle.slug}/timeline#${m.id}`} className="group block">
                <p className="font-mono text-xs text-amber">{formatDate(m.date, m.datePrecision)}</p>
                <p className="eyebrow mt-1">{TIMELINE_CATEGORIES[m.category]}</p>
                <h3 className="mt-3 text-lg leading-snug group-hover:underline">{m.title}</h3>
                <p className="mt-2 text-sm text-mute">{m.description}</p>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Recently added + browse ── */}
      <section className="py-16">
        <Container className="grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Recently added" title="New to the archive" />
            <ul className="divide-y divide-line border-y hairline">
              {recent.map((v) => (
                <li key={v.id}>
                  <Link href={`/vehicles/${v.slug}`} className="flex items-baseline justify-between gap-4 py-4 hover:text-white">
                    <span>
                      <span className="text-lg">{v.fullName}</span>
                      <span className="ml-3 text-xs text-mute">{v.category}</span>
                    </span>
                    <span className="font-mono text-xs text-mute">{v.status === "in-research" ? "in research" : formatDate(v.createdAt)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Browse the collection" title="By manufacturer" />
            <ul className="grid grid-cols-2 border-t border-l hairline sm:grid-cols-3">
              {manufacturers.map((m) => (
                <li key={m.id} className="border-r border-b hairline">
                  <Link href={`/vehicles?manufacturer=${m.slug}`} className="block p-4 hover:bg-carbon">
                    <span className="block">{m.name}</span>
                    <span className="font-mono text-[11px] text-mute">{m._count.vehicles} {m._count.vehicles === 1 ? "car" : "cars"}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2 text-sm">
              <Link href="/vehicles?era=historic" className="rounded-full border hairline px-4 py-2 hover:border-mute">Historic cars</Link>
              <Link href="/vehicles?era=modern" className="rounded-full border hairline px-4 py-2 hover:border-mute">Modern cars</Link>
              <Link href="/vehicles?championship=wec" className="rounded-full border hairline px-4 py-2 hover:border-mute">WEC</Link>
              <Link href="/vehicles?championship=imsa" className="rounded-full border hairline px-4 py-2 hover:border-mute">IMSA</Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
