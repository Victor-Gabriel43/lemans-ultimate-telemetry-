import Link from "next/link";
import { db } from "@/lib/db";
import { Container, SectionHeading } from "@/components/Section";
import { Plate, PhotoFrame, NoPhoto } from "@/components/Photo";
import { LiveryCard, VehicleCard } from "@/components/Cards";
import { formatDate, splitList } from "@/lib/format";
import { liveryCovers, vehicleCovers } from "@/lib/photos";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [featured, vehicles, recent, liveries, milestones, manufacturers, counts] = await Promise.all([
    db.vehicle.findFirst({ where: { featured: true, status: "published" }, include: { manufacturer: true, _count: { select: { liveries: true, results: true, entries: true } } } }),
    db.vehicle.findMany({ include: { manufacturer: true, _count: { select: { liveries: true, timeline: true, results: true } } }, orderBy: [{ status: "desc" }, { era: "asc" }, { debutYear: "asc" }] }),
    db.vehicle.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
    db.livery.findMany({ where: { isVariation: false }, include: { team: true, vehicle: true }, orderBy: [{ year: "desc" }, { firstUsed: "desc" }] }),
    db.timelineEntry.findMany({ where: { milestone: true }, include: { vehicle: true, livery: true }, orderBy: { date: "asc" } }),
    db.manufacturer.findMany({ include: { _count: { select: { vehicles: true } } }, orderBy: { name: "asc" } }),
    Promise.all([db.vehicle.count(), db.livery.count(), db.timelineEntry.count(), db.photo.count(), db.source.count()]),
  ]);

  const covers = await liveryCovers([...liveries.map((l) => l.id), ...(milestones.map((m) => m.liveryId).filter(Boolean) as string[])]);
  const vCovers = await vehicleCovers(vehicles);
  const researching = vehicles.filter((v) => v.status === "in-research").sort((a, b) => a.debutYear - b.debutYear);
  const heroPhoto = featured ? (await vehicleCovers([featured])).get(featured.id) : undefined;
  const photographed = liveries.filter((l) => covers.has(l.id));
  const [lead, ...rest] = photographed;
  const leadNumbers = lead ? splitList(lead.carNumbers) : [];
  const leadNumber = leadNumbers.length === 1 ? leadNumbers[0] : undefined;

  return (
    <>
      {heroPhoto ? (
        <Plate p={heroPhoto} priority className="h-[calc(100svh-3.5rem)] min-h-[620px]" labelTitle={featured?.fullName}>
          <Container className="absolute inset-x-0 bottom-0 pb-10 md:pb-14">
            <h1 className="display text-[clamp(4.5rem,13vw,13rem)]">Racing Heritage<br />Archive</h1>
            <p className="lede mt-5">Racing cars, the crews who drove them and every colour they wore. Photographed, dated and sourced.</p>
            <form action="/search" className="mt-8 flex max-w-lg items-center rounded-full bg-chalk p-1 pl-5 text-black">
              <label htmlFor="hero-q" className="sr-only">Search the archive</label>
              <input id="hero-q" name="q" placeholder="Search a car, livery, driver or race" className="w-full min-w-0 bg-transparent py-2 placeholder:text-black/50 focus:outline-none" />
              <button className="rounded-full bg-black px-5 py-2 text-chalk">Search</button>
            </form>
          </Container>
        </Plate>
      ) : null}

      {featured ? (
        <section className="py-28">
          <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="text-fog">The first complete collection</p>
              <h2 className="display mt-2 text-[clamp(4rem,9vw,8.5rem)]">{featured.fullName}</h2>
              <dl className="mt-10 grid max-w-md grid-cols-2 gap-x-8 gap-y-5 text-[15px]">
                <div><dt className="text-fog">Raced</dt><dd className="mt-0.5 text-lg">{featured.debutYear} to today</dd></div>
                <div><dt className="text-fog">Class</dt><dd className="mt-0.5 text-lg">Hypercar and GTP</dd></div>
                <div><dt className="text-fog">Liveries archived</dt><dd className="mt-0.5 text-lg">{featured._count.liveries}</dd></div>
                <div><dt className="text-fog">Results recorded</dt><dd className="mt-0.5 text-lg">{featured._count.results}</dd></div>
              </dl>
            </div>
            <div>
              <p className="lede">{featured.summary}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href={`/vehicles/${featured.slug}`} className="rounded-full bg-chalk px-6 py-3 text-black hover:bg-white">Read the full history</Link>
                <Link href={`/vehicles/${featured.slug}/liveries`} className="rounded-full border rule px-6 py-3 hover:border-fog">See every livery</Link>
                <Link href={`/vehicles/${featured.slug}/timeline`} className="rounded-full border rule px-6 py-3 hover:border-fog">Year by year</Link>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {lead ? (
        <section className="py-10">
          <Container>
            <SectionHeading title="Liveries" aside={<Link href="/liveries" className="text-fog underline underline-offset-4 hover:text-chalk">All {liveries.length} liveries</Link>}>
              Launch colours, anniversary designs, tributes and customer schemes, each photographed where it raced.
            </SectionHeading>
            <div className="grid gap-x-4 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
              <div className="md:col-span-2 xl:row-span-2">
                <Link href={`/vehicles/${lead.vehicle.slug}/liveries/${lead.slug}`} className="group block">
                  <PhotoFrame p={covers.get(lead.id)!} credit="plain" ratio="aspect-[4/3]" sizes="(min-width: 1280px) 50vw, 100vw"
                    overlay={leadNumber ? <span aria-hidden className="race-number absolute right-5 bottom-2 text-[12rem]">{leadNumber}</span> : null} />
                  <p className="mt-3 text-sm text-fog">{lead.year}, {lead.event}</p>
                  <h3 className="display mt-1 text-4xl group-hover:underline group-hover:underline-offset-4">{lead.name}</h3>
                </Link>
              </div>
              {rest.slice(0, 4).map((l) => <LiveryCard key={l.id} l={l} vehicleSlug={l.vehicle.slug} photo={covers.get(l.id)} />)}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="py-24">
        <Container>
          <SectionHeading title="Moments">Turning points in the archive, in the order they happened.</SectionHeading>
        </Container>
        <ol className="scrollbar-none flex snap-x gap-5 overflow-x-auto px-4 pb-4 sm:px-6 lg:px-[max(2.5rem,calc((100vw-1480px)/2+2.5rem))]">
          {milestones.map((m) => {
            const p = m.liveryId ? covers.get(m.liveryId) : undefined;
            return (
              <li key={m.id} className="w-[300px] shrink-0 snap-start sm:w-[360px]">
                <Link href={`/vehicles/${m.vehicle.slug}/timeline#${m.id}`} className="group block">
                  {p ? <PhotoFrame p={p} credit="plain" sizes="360px" /> : <NoPhoto note="No photograph of this moment archived yet" />}
                  <p className="mt-3 text-sm text-lamp">{formatDate(m.date, m.datePrecision)}</p>
                  <h3 className="mt-1 text-xl leading-tight font-semibold group-hover:underline group-hover:underline-offset-4">{m.title}</h3>
                  <p className="mt-2 font-serif text-[15px] leading-snug text-fog">{m.description}</p>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading title="The collection" aside={<Link href="/vehicles" className="text-fog underline underline-offset-4 hover:text-chalk">Browse all cars</Link>}>
            One car is fully documented so far. The others are catalogued, and nothing about them is published until it has been sourced.
          </SectionHeading>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div>{vehicles.filter((v) => v.status === "published").map((v) => <VehicleCard key={v.id} v={v} photo={vCovers.get(v.id)} />)}</div>
            <div>
              <h3 className="text-lg font-semibold">Being researched next</h3>
              <ul className="mt-3 divide-y divide-asphalt border-y rule">
                {researching.map((v) => (
                  <li key={v.id}>
                    <Link href={`/vehicles/${v.slug}`} className="flex items-baseline justify-between gap-4 py-3 hover:text-white">
                      <span className="display text-3xl">{v.fullName}</span>
                      <span className="text-sm whitespace-nowrap text-fog">{v.category}, {v.debutYear}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-16 border-t rule pt-14 lg:grid-cols-3">
          <div>
            <h2 className="display text-5xl">By maker</h2>
            <ul className="mt-6 space-y-2 text-lg">
              {manufacturers.map((m) => (
                <li key={m.id}>
                  <Link href={`/vehicles?manufacturer=${m.slug}`} className="hover:underline hover:underline-offset-4">{m.name}</Link>
                  <span className="ml-2 text-sm text-fog">{m._count.vehicles}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="display text-5xl">Recently added</h2>
            <ul className="mt-6 space-y-2 text-lg">
              {recent.map((v) => <li key={v.id}><Link href={`/vehicles/${v.slug}`} className="hover:underline hover:underline-offset-4">{v.fullName}</Link></li>)}
            </ul>
          </div>
          <div>
            <h2 className="display text-5xl">In numbers</h2>
            <p className="mt-6 font-serif text-lg leading-relaxed text-fog">
              {counts[0]} cars catalogued, {counts[1]} liveries, {counts[2]} dated events, {counts[3]} credited photographs and {counts[4]} cited sources.
            </p>
            <Link href="/sources" className="mt-4 inline-block underline underline-offset-4 hover:text-white">How records are verified</Link>
          </div>
        </Container>
      </section>
    </>
  );
}
