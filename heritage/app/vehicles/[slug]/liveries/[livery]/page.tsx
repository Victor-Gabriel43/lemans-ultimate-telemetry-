import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getLivery, sourcesFor } from "@/lib/queries";
import { Container } from "@/components/Section";
import { Plate, NoPhoto, PhotoFrame } from "@/components/Photo";
import Gallery from "@/components/Gallery";
import { SourceList } from "@/components/Sources";
import { VerificationBadge, VerificationNotice } from "@/components/Verification";
import { formatDate, splitList } from "@/lib/format";
import { asPhoto } from "@/lib/photos";
import { LIVERY_KINDS } from "@/lib/vocab";

type Params = { params: Promise<{ slug: string; livery: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug, livery } = await params;
  const l = await getLivery(livery);
  if (!l || l.vehicle.slug !== slug) return {};
  return {
    title: `${l.name}, ${l.vehicle.fullName} (${l.year})`,
    description: l.background.slice(0, 155),
    alternates: { canonical: `/vehicles/${slug}/liveries/${l.slug}` },
    openGraph: l.photos[0] ? { images: [{ url: l.photos[0].url }] } : undefined,
  };
}

export async function generateStaticParams() {
  return (await db.livery.findMany({ select: { slug: true, vehicle: { select: { slug: true } } } })).map((l) => ({ slug: l.vehicle.slug, livery: l.slug }));
}

const VIEWS = [["front", "Front"], ["rear", "Rear"], ["side", "Side"], ["top", "Top"]] as const;

export default async function LiveryPage({ params }: Params) {
  const { slug, livery } = await params;
  const l = await getLivery(livery);
  if (!l || l.vehicle.slug !== slug) notFound();
  const sources = (await sourcesFor("Livery", [l.id])).get(l.id) ?? [];
  const numbers = splitList(l.carNumbers);
  const photos = l.photos.map(asPhoto);
  const main = photos.find((p) => p.view === "main") ?? photos[0];
  const siblings = await db.livery.findMany({ where: { vehicleId: l.vehicleId }, orderBy: [{ year: "asc" }, { firstUsed: "asc" }], select: { slug: true, name: true, year: true } });
  const idx = siblings.findIndex((s) => s.slug === l.slug);
  const prev = siblings[idx - 1];
  const next = siblings[idx + 1];

  const facts: [string, React.ReactNode][] = [
    ["Year", l.year],
    ["Season", l.season || "–"],
    ["Team", l.team ? <Link href={`/teams/${l.team.slug}`} className="underline underline-offset-4">{l.team.name}</Link> : "–"],
    ["Car number", numbers.length ? numbers.map((n) => `#${n}`).join(", ") : "–"],
    ["Championship", l.championship?.name ?? "–"],
    ["Race or event", l.event || "–"],
    ["First seen", formatDate(l.firstUsed)],
    ["Type", LIVERY_KINDS[l.kind] ?? l.kind],
    ["Drivers", l.drivers.length ? l.drivers.map((d) => <Link key={d.driverId} href={`/drivers/${d.driver.slug}`} className="block hover:underline">{d.driver.name}</Link>) : "Not documented"],
    ["Sponsors", splitList(l.sponsors).join(", ") || "Not documented"],
  ];

  const heading = (
    <Container className="absolute inset-x-0 bottom-0 pb-10">
      <nav aria-label="Breadcrumb" className="text-sm text-fog">
        <Link href={`/vehicles/${slug}`} className="hover:text-chalk">{l.vehicle.fullName}</Link> /{" "}
        <Link href={`/vehicles/${slug}/liveries`} className="hover:text-chalk">Liveries</Link> / {l.year}
      </nav>
      <h1 className="display mt-3 max-w-6xl text-[clamp(3.25rem,8vw,8rem)]">{l.name}</h1>
      <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-fog">
        <span>{LIVERY_KINDS[l.kind] ?? l.kind}</span>
        {l.isVariation ? <span>Seasonal update of an earlier design</span> : null}
        <VerificationBadge status={l.verification} />
      </p>
    </Container>
  );

  return (
    <article>
      {main ? (
        <Plate p={main} priority className="h-[calc(100svh-3.5rem)] min-h-[600px]">
          {numbers.length === 1 ? <span aria-hidden className="race-number pointer-events-none absolute top-6 right-6 text-[clamp(8rem,22vw,22rem)] opacity-70">{numbers[0]}</span> : null}
          {heading}
        </Plate>
      ) : (
        <div className="relative h-[70vh] overflow-hidden bg-pit">
          {numbers[0] ? <span aria-hidden className="race-number absolute top-6 right-6 text-[clamp(8rem,22vw,22rem)] opacity-50">{numbers[0]}</span> : null}
          {heading}
        </div>
      )}

      <Container className="grid gap-16 py-20 lg:grid-cols-[1fr_380px] [&>*]:min-w-0">
        <div className="space-y-16">
          <VerificationNotice status={l.verification} />
          {!main ? <p className="border-l-2 border-lamp pl-4 text-fog">No licensed photograph of this livery has been archived yet. Curators can add one from the dashboard.</p> : null}
          {l.parent ? (
            <p className="text-lg">
              This is a {l.isVariation ? "seasonal update" : "derivative"} of{" "}
              <Link className="underline underline-offset-4" href={`/vehicles/${slug}/liveries/${l.parent.slug}`}>{l.parent.name}</Link>, not a new design.
            </p>
          ) : null}
          <section>
            <h2 className="display text-4xl">The story</h2>
            <div className="essay mt-4"><p>{l.background}</p></div>
          </section>
          <section>
            <h2 className="display text-4xl">Inspiration</h2>
            <div className="essay mt-4"><p>{l.inspiration}</p></div>
          </section>
          <section>
            <h2 className="display text-4xl">Front, rear, side and top</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {VIEWS.map(([view, label]) => {
                const p = photos.find((x) => x.view === view);
                return (
                  <div key={view} className="min-w-0">
                    {p ? <PhotoFrame p={p} ratio="aspect-[4/3]" sizes="(min-width: 1024px) 15vw, 50vw" /> : <NoPhoto ratio="aspect-[4/3]" note="Not archived yet" />}
                    <p className="mt-1 text-sm font-semibold">{label}</p>
                  </div>
                );
              })}
            </div>
          </section>
          {photos.length ? (
            <section>
              <h2 className="display mb-6 text-4xl">All photographs</h2>
              <Gallery items={photos} columns={2} />
            </section>
          ) : null}
          {l.timeline.length ? (
            <section>
              <h2 className="display text-4xl">In the timeline</h2>
              <ul className="mt-4 divide-y divide-asphalt border-y rule">
                {l.timeline.map((t) => (
                  <li key={t.id}>
                    <Link href={`/vehicles/${slug}/timeline#${t.id}`} className="flex flex-wrap gap-x-6 py-3 hover:text-white">
                      <span className="w-40 shrink-0 text-lamp">{formatDate(t.date, t.datePrecision)}</span>
                      <span>{t.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {l.variants.length ? (
            <section>
              <h2 className="display text-4xl">Seasonal updates of this design</h2>
              <ul className="mt-4 space-y-2 text-lg">
                {l.variants.map((vr) => <li key={vr.id}><Link className="hover:underline" href={`/vehicles/${slug}/liveries/${vr.slug}`}>{vr.year}: {vr.name}</Link></li>)}
              </ul>
            </section>
          ) : null}
        </div>

        <aside className="space-y-10 lg:sticky lg:top-20 lg:h-fit">
          <dl className="divide-y divide-asphalt border-y rule">
            {facts.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[120px_1fr] gap-4 py-3 text-[15px]">
                <dt className="text-fog">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <SourceList sources={sources} />
          <Link href={`/vehicles/${slug}/compare?l=${l.slug}`} className="inline-block rounded-full bg-chalk px-5 py-2.5 text-black hover:bg-white">Compare with other liveries</Link>
        </aside>
      </Container>

      <Container>
        <nav aria-label="Other liveries" className="grid grid-cols-2 gap-6 border-t rule pt-6">
          {prev ? <Link href={`/vehicles/${slug}/liveries/${prev.slug}`} className="text-fog hover:text-chalk"><span className="block text-sm">Previous</span>{prev.year}: {prev.name}</Link> : <span />}
          {next ? <Link href={`/vehicles/${slug}/liveries/${next.slug}`} className="text-right text-fog hover:text-chalk"><span className="block text-sm">Next</span>{next.year}: {next.name}</Link> : <span />}
        </nav>
      </Container>
    </article>
  );
}
