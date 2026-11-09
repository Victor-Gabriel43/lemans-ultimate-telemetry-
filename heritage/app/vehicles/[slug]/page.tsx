import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getVehicle, sourcesFor, type VehicleFull, type SourceRow } from "@/lib/queries";
import { Container, SectionHeading } from "@/components/Section";
import { Plate, PhotoFrame, NoPhoto, type PhotoData } from "@/components/Photo";
import Gallery from "@/components/Gallery";
import { LiveryCard } from "@/components/Cards";
import { Cite, SourceList } from "@/components/Sources";
import { VerificationBadge } from "@/components/Verification";
import { formatDate, ordinalPosition, resultLabel } from "@/lib/format";
import { asPhoto, liveryCovers, vehicleCovers } from "@/lib/photos";
import { country } from "@/lib/vocab";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const v = await getVehicle((await params).slug);
  if (!v) return {};
  const cover = (await vehicleCovers([v])).get(v.id);
  return {
    title: `${v.fullName}: history, specifications and liveries`,
    description: v.summary || v.tagline,
    alternates: { canonical: `/vehicles/${v.slug}` },
    openGraph: cover ? { images: [{ url: cover.url }] } : undefined,
  };
}

export async function generateStaticParams() {
  return (await db.vehicle.findMany({ select: { slug: true } })).map((v) => ({ slug: v.slug }));
}

const SECTIONS = [
  ["overview", "History"], ["specifications", "Specifications"], ["racing-history", "Racing"], ["teams", "Teams"],
  ["drivers", "Drivers"], ["achievements", "Honours"], ["gallery", "Photographs"], ["liveries", "Liveries"], ["sources", "Sources"],
] as const;

export default async function VehiclePage({ params }: Params) {
  const v = await getVehicle((await params).slug);
  if (!v) notFound();
  const cover = (await vehicleCovers([v])).get(v.id);
  if (v.status === "in-research") return <InResearch v={v} cover={cover} />;

  const [vehicleSrc, specSrc, resultSrc, entrySrc, covers] = await Promise.all([
    sourcesFor("Vehicle", [v.id]),
    sourcesFor("Spec", v.specs.map((s) => s.id)),
    sourcesFor("Result", v.results.map((r) => r.id)),
    sourcesFor("Entry", v.entries.map((e) => e.id)),
    liveryCovers(v.liveries.map((l) => l.id)),
  ]);
  const allSources: SourceRow[] = [vehicleSrc, specSrc, resultSrc, entrySrc].flatMap((m) => [...m.values()].flat());
  const photos = v.photos.map(asPhoto);

  const jsonLd = {
    "@context": "https://schema.org", "@type": "Vehicle", name: v.fullName, brand: { "@type": "Brand", name: v.manufacturer.name },
    model: v.model, vehicleModelDate: String(v.debutYear), description: v.summary, image: cover?.url,
  };

  const title = (
    <Container className="absolute inset-x-0 bottom-0 pb-10">
      <nav aria-label="Breadcrumb" className="text-sm text-fog"><Link href="/vehicles" className="hover:text-chalk">Collection</Link> / {v.manufacturer.name}</nav>
      <h1 className="display mt-3 text-[clamp(4.5rem,14vw,14rem)]">{v.fullName}</h1>
      <p className="lede mt-4">{v.tagline}</p>
    </Container>
  );

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {cover ? <Plate p={cover} priority className="h-[calc(100svh-3.5rem)] min-h-[620px]">{title}</Plate> : <div className="relative h-[60vh] bg-pit">{title}</div>}

      <Container>
        <dl className="grid grid-cols-2 gap-6 border-b rule py-8 md:grid-cols-5">
          {[["Maker", v.manufacturer.name], ["Category", v.category], ["Race debut", String(v.debutYear)], ["Country", country(v.country)], ["Era", v.era === "modern" ? "Modern" : "Historic"]].map(([k, val]) => (
            <div key={k}><dt className="text-sm text-fog">{k}</dt><dd className="mt-1 text-lg leading-snug">{val}</dd></div>
          ))}
        </dl>
      </Container>

      <nav aria-label="On this page" className="scrollbar-none sticky top-14 z-30 overflow-x-auto border-b rule bg-black/90 backdrop-blur">
        <Container className="flex gap-6 py-3 text-[15px]">
          {SECTIONS.map(([id, label]) => <a key={id} href={`#${id}`} className="whitespace-nowrap text-fog hover:text-chalk">{label}</a>)}
          <Link href={`/vehicles/${v.slug}/timeline`} className="whitespace-nowrap text-chalk underline underline-offset-4">Timeline</Link>
          <Link href={`/vehicles/${v.slug}/compare`} className="whitespace-nowrap text-chalk underline underline-offset-4">Compare liveries</Link>
        </Container>
      </nav>

      <Container>
        <Overview v={v} sources={vehicleSrc.get(v.id) ?? []} photos={photos} />
        <Specs v={v} sources={specSrc} />
        <RacingHistory v={v} sources={resultSrc} covers={covers} />
        <Teams v={v} covers={covers} />
        <Drivers v={v} sources={entrySrc} />
        <Achievements v={v} />
        <section className="pt-28">
          <SectionHeading id="gallery" title="Photographs">
            {photos.length ? `${photos.length} photographs, each credited to its author and used under the licence shown.` : "No licensed photographs archived yet."}
          </SectionHeading>
          <Gallery items={photos} />
        </section>
        <section className="pt-28">
          <SectionHeading id="liveries" title="Liveries" aside={<Link href={`/vehicles/${v.slug}/liveries`} className="text-fog underline underline-offset-4 hover:text-chalk">Open the livery archive</Link>}>
            {v.liveries.filter((l) => !l.isVariation).length} distinct designs and {v.liveries.filter((l) => l.isVariation).length} seasonal updates of an existing design.
          </SectionHeading>
          <div className="grid gap-x-4 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
            {v.liveries.filter((l) => !l.isVariation).map((l) => <LiveryCard key={l.id} l={l} vehicleSlug={v.slug} photo={covers.get(l.id)} />)}
          </div>
        </section>
        <section className="pt-28">
          <SectionHeading id="sources" title="Sources">
            Every statement on this page links to where it came from. Records marked reported or unverified are still waiting to be checked against official results.
          </SectionHeading>
          <SourceList sources={allSources} title={`${new Set(allSources.map((s) => s.id)).size} sources cited on this page`} />
        </section>
      </Container>
    </article>
  );
}

function Overview({ v, sources, photos }: { v: VehicleFull; sources: SourceRow[]; photos: PhotoData[] }) {
  const blocks = [
    ["How it was developed", v.development], ["The unveiling", v.unveiling], ["First public appearance", v.firstAppearance],
    ["First race", v.firstRace], ["Background", v.background],
  ].filter(([, t]) => t);
  const side = photos.slice(1, 4);
  return (
    <section className="pt-24">
      <SectionHeading id="overview" title="History" />
      <p className="lede max-w-[40ch] text-[clamp(1.5rem,2.6vw,2.1rem)]">{v.summary}<Cite sources={sources} /></p>
      <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_420px] [&>*]:min-w-0">
        <div className="space-y-12">
          {blocks.map(([h, t]) => (
            <div key={h}>
              <h3 className="display text-3xl">{h}</h3>
              <div className="essay mt-3"><p>{t}</p></div>
            </div>
          ))}
        </div>
        <aside className="space-y-10">
          {side.map((p) => <PhotoFrame key={p.id} p={p} sizes="420px" />)}
        </aside>
      </div>
    </section>
  );
}

function Specs({ v, sources }: { v: VehicleFull; sources: Map<string, SourceRow[]> }) {
  const groups = [...new Set(v.specs.map((s) => s.group))];
  return (
    <section className="pt-28">
      <SectionHeading id="specifications" title="Specifications">
        As published by the manufacturer. In LMDh, power and weight are set by the rules and by Balance of Performance.
      </SectionHeading>
      <div className="grid gap-x-16 gap-y-12 md:grid-cols-2 [&>*]:min-w-0">
        {groups.map((g) => (
          <div key={g}>
            <h3 className="mb-2 text-lg font-semibold">{g}</h3>
            <dl className="divide-y divide-asphalt border-y rule">
              {v.specs.filter((s) => s.group === g).map((s) => (
                <div key={s.id} className="grid grid-cols-[120px_1fr] gap-4 py-4 sm:grid-cols-[150px_1fr]">
                  <dt className="text-fog">{s.label}</dt>
                  <dd className="text-[17px]">
                    {s.value}<Cite sources={sources.get(s.id)} />
                    {s.verification !== "verified" ? <span className="ml-2"><VerificationBadge status={s.verification} /></span> : null}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </section>
  );
}

const CLASSICS = [
  { label: "Le Mans", match: /Le Mans \(Centenary\)|24 Hours of Le Mans/, cover: /le-mans-2023/ },
  { label: "Daytona", match: /Daytona/, cover: /ppm-season-2023/ },
  { label: "Sebring", match: /Sebring/, cover: /sebring/ },
];

function RacingHistory({ v, sources, covers }: { v: VehicleFull; sources: Map<string, SourceRow[]>; covers: Map<string, PhotoData> }) {
  const champs = [...new Map(v.results.map((r) => [r.event.championship.id, r.event.championship])).values()];
  return (
    <section className="pt-28">
      <SectionHeading id="racing-history" title="Racing">
        The results documented so far, each with its source. This is a curated record, not yet every round of every season.
      </SectionHeading>

      <div className="grid gap-8 md:grid-cols-3">
        {CLASSICS.map((c) => {
          const rs = v.results.filter((r) => c.match.test(r.event.name));
          const p = covers.get(v.liveries.find((l) => c.cover.test(l.slug))?.id ?? "");
          return (
            <div key={c.label} className="min-w-0">
              {p ? <PhotoFrame p={p} credit="plain" ratio="aspect-[16/10]" sizes="33vw" /> : <NoPhoto ratio="aspect-[16/10]" note="" />}
              <h3 className="display mt-4 text-5xl">{c.label}</h3>
              <ul className="mt-3 divide-y divide-asphalt">
                {rs.length ? rs.map((r) => (
                  <li key={r.id} className="flex justify-between gap-3 py-2 text-[15px]">
                    <span className="text-fog">{r.event.season}, #{r.entry?.carNumber} {r.entry?.team.name}</span>
                    <span className="font-semibold">{ordinalPosition(r.position)}</span>
                  </li>
                )) : <li className="py-2 text-fog">No documented result yet.</li>}
              </ul>
            </div>
          );
        })}
      </div>

      {champs.map((c) => {
        const rs = v.results.filter((r) => r.event.championshipId === c.id);
        const seasons = [...new Set(rs.map((r) => r.event.season))];
        return (
          <div key={c.id} className="mt-20">
            <h3 className="display text-4xl">{c.name}</h3>
            {seasons.map((s) => (
              <div key={s} className="mt-8">
                <p className="display text-2xl text-fog">{s}</p>
                <div className="mt-2 overflow-x-auto">
                  <table className="w-full min-w-[760px] text-left text-[15px]">
                    <thead className="text-sm text-fog">
                      <tr className="border-b rule"><th className="py-2 pr-4 font-normal">Date</th><th className="py-2 pr-4 font-normal">Race</th><th className="py-2 pr-4 font-normal">Car</th><th className="py-2 pr-4 font-normal">Result</th><th className="py-2 font-normal">Notes</th></tr>
                    </thead>
                    <tbody>
                      {rs.filter((r) => r.event.season === s).map((r) => (
                        <tr key={r.id} className="border-b rule align-top">
                          <td className="py-3 pr-4 whitespace-nowrap text-fog">{formatDate(r.event.date, r.event.datePrecision)}</td>
                          <td className="py-3 pr-4">{r.event.name}<span className="block text-sm text-fog">{r.event.circuit}</span></td>
                          <td className="py-3 pr-4 whitespace-nowrap">#{r.entry?.carNumber}<span className="block text-sm text-fog">{r.entry?.team.name}</span></td>
                          <td className="py-3 pr-4 text-lg font-semibold">{ordinalPosition(r.position)}</td>
                          <td className="py-3">
                            {r.headline}<Cite sources={sources.get(r.id)} />
                            {r.notes ? <span className="block text-sm text-fog">{r.notes}</span> : null}
                            {r.entry?.drivers.length ? <span className="block text-sm text-fog">Season crew: {r.entry.drivers.map((d) => d.driver.name).join(", ")}</span> : null}
                            {r.verification !== "verified" ? <span className="mt-1 block"><VerificationBadge status={r.verification} /></span> : null}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </section>
  );
}

function Teams({ v, covers }: { v: VehicleFull; covers: Map<string, PhotoData> }) {
  const teams = [...new Map(v.entries.map((e) => [e.team.id, e.team])).values()];
  const block = (kind: string, title: string) => (
    <div>
      <h3 className="display mb-6 text-3xl text-fog">{title}</h3>
      <div className="space-y-12">
        {teams.filter((t) => t.kind === kind).map((t) => {
          const es = v.entries.filter((e) => e.teamId === t.id);
          const seasons = [...new Set(es.map((e) => e.season))];
          const liv = v.liveries.find((l) => l.teamId === t.id && covers.has(l.id));
          return (
            <Link key={t.id} href={`/teams/${t.slug}`} className="group grid gap-5 sm:grid-cols-[220px_1fr]">
              {liv ? <PhotoFrame p={covers.get(liv.id)!} credit="plain" sizes="220px" /> : <NoPhoto note="" />}
              <div className="min-w-0">
                <h4 className="display text-4xl group-hover:underline group-hover:underline-offset-4">{t.name}</h4>
                <p className="mt-1 text-sm text-fog">
                  {country(t.country)}. Raced the car {seasons[0] === seasons.at(-1) ? `in ${seasons[0]}` : `from ${seasons[0]} to ${seasons.at(-1)}`} in{" "}
                  {[...new Set(es.map((e) => e.championship.shortName))].join(" and ")}, as #{[...new Set(es.map((e) => e.carNumber))].join(", #")}.
                </p>
                <p className="mt-3 font-serif text-[16px] leading-relaxed text-chalk/85">{t.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
  return (
    <section className="pt-28">
      <SectionHeading id="teams" title="Teams">
        Factory and customer teams are listed separately. Only teams confirmed by sources appear; no other customer programme has been verified.
      </SectionHeading>
      <div className="grid gap-16 xl:grid-cols-2 [&>*]:min-w-0">
        {block("factory", "Factory team")}
        {block("customer", "Customer teams")}
      </div>
    </section>
  );
}

function Drivers({ v, sources }: { v: VehicleFull; sources: Map<string, SourceRow[]> }) {
  const rows = v.entries.flatMap((e) => e.drivers.map((d) => ({
    e, d: d.driver, major: v.results.filter((r) => r.entryId === e.id && r.highlight).map(resultLabel),
  }))).sort((a, b) => a.d.name.localeCompare(b.d.name) || a.e.season - b.e.season);
  const undocumented = v.entries.filter((e) => !e.drivers.length);
  return (
    <section className="pt-28">
      <SectionHeading id="drivers" title="Drivers">
        {new Set(rows.map((r) => r.d.id)).size} drivers across {v.entries.length} season entries. Major results are those won by the driver&apos;s season entry.
      </SectionHeading>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-left text-[15px]">
          <thead className="text-sm text-fog">
            <tr className="border-b rule">{["Driver", "Car", "Team", "Season", "Championship", "Major results", ""].map((h) => <th key={h} className="py-2 pr-4 font-normal">{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map(({ e, d, major }) => (
              <tr key={`${e.id}-${d.id}`} className="border-b rule align-top">
                <td className="py-3 pr-4"><Link href={`/drivers/${d.slug}`} className="font-semibold hover:underline">{d.name}</Link> <span className="text-sm text-fog">{d.nationality}</span></td>
                <td className="py-3 pr-4">#{e.carNumber}</td>
                <td className="py-3 pr-4">{e.team.name}</td>
                <td className="py-3 pr-4">{e.season}</td>
                <td className="py-3 pr-4">{e.championship.shortName}{e.scope !== "full-season" ? <span className="block text-sm text-fog">{e.scope.replace("-", " ")}</span> : null}</td>
                <td className="py-3 pr-4 text-fog">{major.join("; ") || "–"}</td>
                <td className="py-3"><VerificationBadge status={e.verification} compact /><Cite sources={sources.get(e.id)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {undocumented.length ? (
        <p className="mt-6 text-[15px] text-fog">Line-ups still to be documented: {undocumented.map((e) => `${e.team.name} #${e.carNumber} (${e.championship.shortName} ${e.season})`).join("; ")}.</p>
      ) : null}
      <ul className="mt-6 space-y-1 text-sm text-fog">
        {v.entries.filter((e) => e.notes).map((e) => <li key={e.id}>#{e.carNumber}, {e.championship.shortName} {e.season}: {e.notes}</li>)}
      </ul>
    </section>
  );
}

function Achievements({ v }: { v: VehicleFull }) {
  const list = v.results.filter((r) => r.highlight);
  return (
    <section className="pt-28">
      <SectionHeading id="achievements" title="Honours" />
      <ol className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((r) => (
          <li key={r.id} className="border-t-2 border-chalk pt-4">
            <p className="text-sm text-lamp">{formatDate(r.event.date, r.event.datePrecision)}</p>
            <h3 className="mt-1 text-xl leading-tight font-semibold">{r.headline}</h3>
            <p className="mt-1 text-[15px] text-fog">{r.event.name}, #{r.entry?.carNumber} {r.entry?.team.name}</p>
            <div className="mt-2"><VerificationBadge status={r.verification} compact /></div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function InResearch({ v, cover }: { v: VehicleFull; cover?: PhotoData }) {
  const body = (
    <Container className="absolute inset-x-0 bottom-0 pb-10">
      <nav className="text-sm text-fog"><Link href="/vehicles" className="hover:text-chalk">Collection</Link> / {v.manufacturer.name}</nav>
      <h1 className="display mt-3 text-[clamp(4rem,12vw,11rem)]">{v.fullName}</h1>
      <p className="lede mt-4">{v.tagline}</p>
    </Container>
  );
  return (
    <>
      {cover ? <Plate p={cover} priority className="h-[70vh] min-h-[520px]">{body}</Plate> : <div className="relative h-[60vh] bg-pit">{body}</div>}
      <Container className="py-16">
        <div className="max-w-2xl border-l-2 border-lamp pl-5">
          <p className="text-lg font-semibold text-lamp">This history is still being researched</p>
          <p className="essay mt-2">
            The car is in the collection, but its specifications, results, teams, drivers and liveries have not yet been sourced to the
            archive&apos;s standard. Nothing is published until they are.
          </p>
        </div>
        <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-6">
          {[["Maker", v.manufacturer.name], ["Category", v.category], ["Debut season", String(v.debutYear)], ["Era", v.era === "modern" ? "Modern" : "Historic"]].map(([k, val]) => (
            <div key={k}><dt className="text-sm text-fog">{k}</dt><dd className="mt-1 text-lg">{val}</dd></div>
          ))}
        </dl>
      </Container>
    </>
  );
}
