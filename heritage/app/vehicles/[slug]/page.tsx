import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getVehicle, sourcesFor, type VehicleFull, type SourceRow } from "@/lib/queries";
import { Container, SectionHeading } from "@/components/Section";
import LiveryArt from "@/components/LiveryArt";
import Gallery, { type GalleryItem } from "@/components/Gallery";
import { LiveryCard } from "@/components/Cards";
import { Cite, SourceList } from "@/components/Sources";
import { VerificationBadge } from "@/components/Verification";
import { formatDate, ordinalPosition, parseDesign, resultLabel, splitList } from "@/lib/format";
import { country } from "@/lib/vocab";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const v = await getVehicle((await params).slug);
  if (!v) return {};
  return {
    title: `${v.fullName} — history, specifications & liveries`,
    description: v.summary || v.tagline,
    alternates: { canonical: `/vehicles/${v.slug}` },
  };
}

export async function generateStaticParams() {
  return (await db.vehicle.findMany({ select: { slug: true } })).map((v) => ({ slug: v.slug }));
}

const SECTIONS = [
  ["overview", "Overview"], ["specifications", "Specifications"], ["racing-history", "Racing history"], ["teams", "Teams"],
  ["drivers", "Drivers"], ["achievements", "Achievements"], ["gallery", "Gallery"], ["liveries", "Liveries"], ["sources", "Sources"],
] as const;

export default async function VehiclePage({ params }: Params) {
  const v = await getVehicle((await params).slug);
  if (!v) notFound();
  if (v.status === "in-research") return <InResearch v={v} />;

  const [vehicleSrc, specSrc, resultSrc, entrySrc] = await Promise.all([
    sourcesFor("Vehicle", [v.id]),
    sourcesFor("Spec", v.specs.map((s) => s.id)),
    sourcesFor("Result", v.results.map((r) => r.id)),
    sourcesFor("Entry", v.entries.map((e) => e.id)),
  ]);
  const allSources: SourceRow[] = [vehicleSrc, specSrc, resultSrc, entrySrc].flatMap((m) => [...m.values()].flat());
  const hero = v.liveries.find((l) => l.id === v.heroLiveryId) ?? v.liveries[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: v.fullName,
    brand: { "@type": "Brand", name: v.manufacturer.name },
    model: v.model,
    vehicleModelDate: String(v.debutYear),
    description: v.summary,
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* ── Hero ── */}
      <header className="grain relative overflow-hidden border-b hairline">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_70%,rgba(208,2,27,0.14),transparent_60%)]" />
        <Container className="relative pt-14 pb-6">
          <nav aria-label="Breadcrumb" className="eyebrow">
            <Link href="/vehicles" className="hover:text-paper">Collection</Link> / {v.manufacturer.name}
          </nav>
          <h1 className="display rise mt-6 text-[clamp(3rem,10vw,9rem)]">{v.fullName}</h1>
          <p className="rise rise-2 mt-4 max-w-2xl text-lg text-soft">{v.tagline}</p>
          <dl className="rise rise-3 mt-8 flex flex-wrap gap-x-10 gap-y-3">
            {[["Manufacturer", v.manufacturer.name], ["Category", v.category], ["Debut", String(v.debutYear)], ["Country", country(v.country)], ["Era", v.era]].map(([k, val]) => (
              <div key={k}>
                <dt className="eyebrow">{k}</dt>
                <dd className="mt-1 capitalize">{val}</dd>
              </div>
            ))}
          </dl>
          {hero ? <LiveryArt design={parseDesign(hero.design)} title={hero.name} className="drift mx-auto mt-6 max-w-6xl" /> : null}
        </Container>
        <nav aria-label="Profile sections" className="scrollbar-none sticky top-16 z-30 overflow-x-auto border-t hairline bg-ink/85 backdrop-blur">
          <Container className="flex gap-1 py-2 text-sm">
            {SECTIONS.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="whitespace-nowrap rounded-full px-3 py-1 text-soft hover:text-paper">{label}</a>
            ))}
            <Link href={`/vehicles/${v.slug}/timeline`} className="whitespace-nowrap rounded-full px-3 py-1 text-amber hover:text-paper">Timeline →</Link>
            <Link href={`/vehicles/${v.slug}/compare`} className="whitespace-nowrap rounded-full px-3 py-1 text-amber hover:text-paper">Compare liveries →</Link>
          </Container>
        </nav>
      </header>

      <Container>
        <Overview v={v} sources={vehicleSrc.get(v.id) ?? []} />
        <Specs v={v} sources={specSrc} />
        <RacingHistory v={v} sources={resultSrc} />
        <Teams v={v} />
        <Drivers v={v} sources={entrySrc} />
        <Achievements v={v} />
        <GallerySection v={v} />
        <section id="liveries" className="scroll-mt-32 pt-24">
          <SectionHeading index="H" eyebrow="Livery archive" title="Liveries">
            {v.liveries.filter((l) => !l.isVariation).length} distinct designs and {v.liveries.filter((l) => l.isVariation).length} seasonal variations.
          </SectionHeading>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {v.liveries.filter((l) => !l.isVariation).slice(0, 8).map((l) => <LiveryCard key={l.id} l={l} vehicleSlug={v.slug} />)}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/vehicles/${v.slug}/liveries`} className="rounded-full bg-paper px-5 py-2.5 text-sm text-ink hover:bg-white">Complete livery archive</Link>
            <Link href={`/vehicles/${v.slug}/compare`} className="rounded-full border hairline px-5 py-2.5 text-sm hover:border-mute">Compare liveries</Link>
            <Link href={`/vehicles/${v.slug}/timeline`} className="rounded-full border hairline px-5 py-2.5 text-sm hover:border-mute">Interactive timeline</Link>
          </div>
        </section>
        <section id="sources" className="scroll-mt-32 pt-24">
          <SectionHeading index="I" eyebrow="Research" title="Sources & references">
            Every statement on this page is attributed. Click a ↗ marker beside any record to open its source. Records marked
            <span className="mx-1"><VerificationBadge status="reported" /></span>or<span className="mx-1"><VerificationBadge status="unverified" /></span>
            are awaiting cross-checking against official classifications.
          </SectionHeading>
          <SourceList sources={allSources} title={`${new Set(allSources.map((s) => s.id)).size} sources cited`} />
        </section>
      </Container>
    </article>
  );
}

function Overview({ v, sources }: { v: VehicleFull; sources: SourceRow[] }) {
  const blocks = [
    ["Development history", v.development], ["Official unveiling", v.unveiling], ["First public appearance", v.firstAppearance],
    ["First competitive race", v.firstRace], ["Historical background", v.background],
  ].filter(([, t]) => t);
  return (
    <section id="overview" className="scroll-mt-32 pt-20">
      <SectionHeading index="A" eyebrow="Overview" title="History of the car" />
      <div className="grid gap-16 lg:grid-cols-[1fr_320px] [&>*]:min-w-0">
        <div className="space-y-12">
          <p className="display text-2xl leading-snug text-paper md:text-3xl">{v.summary}</p>
          {blocks.map(([h, t]) => (
            <div key={h} className="grid gap-3 md:grid-cols-[200px_1fr]">
              <h3 className="eyebrow pt-1.5">{h}</h3>
              <div className="prose-archive"><p>{t}</p></div>
            </div>
          ))}
        </div>
        <aside className="h-fit border-t hairline pt-6 lg:sticky lg:top-36">
          <SourceList sources={sources} title="Overview sources" />
        </aside>
      </div>
    </section>
  );
}

function Specs({ v, sources }: { v: VehicleFull; sources: Map<string, SourceRow[]> }) {
  const groups = [...new Set(v.specs.map((s) => s.group))];
  return (
    <section id="specifications" className="scroll-mt-32 pt-24">
      <SectionHeading index="B" eyebrow="Technical specifications" title="Engineering">
        Figures as published by the manufacturer. Output and weight in LMDh are governed by the regulations and Balance of Performance.
      </SectionHeading>
      <div className="grid gap-10 md:grid-cols-2 [&>*]:min-w-0">
        {groups.map((g) => (
          <div key={g}>
            <h3 className="eyebrow mb-2 text-paper">{g}</h3>
            <dl className="divide-y divide-line border-y hairline">
              {v.specs.filter((s) => s.group === g).map((s) => (
                <div key={s.id} className="grid grid-cols-[150px_1fr] gap-4 py-3.5 text-sm">
                  <dt className="text-mute">{s.label}</dt>
                  <dd>
                    {s.value}
                    <Cite sources={sources.get(s.id)} />
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
  { key: "le-mans", label: "24 Hours of Le Mans", match: "Le Mans (Centenary)|24 Hours of Le Mans" },
  { key: "daytona", label: "24 Hours of Daytona", match: "Daytona" },
  { key: "sebring", label: "Sebring", match: "Sebring" },
];

function ResultRow({ r, src }: { r: VehicleFull["results"][number]; src?: SourceRow[] }) {
  const drivers = r.entry?.drivers.map((d) => d.driver.name).join(", ");
  return (
    <tr className="border-b hairline align-top">
      <td className="py-3 pr-4 font-mono text-xs whitespace-nowrap text-mute">{formatDate(r.event.date, r.event.datePrecision)}</td>
      <td className="py-3 pr-4">
        <span className="block">{r.event.name}</span>
        <span className="text-xs text-mute">{r.event.circuit}</span>
      </td>
      <td className="py-3 pr-4 whitespace-nowrap">#{r.entry?.carNumber} <span className="text-xs text-mute">{r.entry?.team.name}</span></td>
      <td className="py-3 pr-4 font-mono">{ordinalPosition(r.position)}</td>
      <td className="py-3 text-sm text-soft">
        {r.headline}
        {r.notes ? <span className="block text-xs text-mute">{r.notes}</span> : null}
        {drivers ? <span className="block text-xs text-mute">Crew (season entry): {drivers}</span> : null}
        <span className="mt-1 inline-flex items-center gap-2"><VerificationBadge status={r.verification} compact /><Cite sources={src} /></span>
      </td>
    </tr>
  );
}

function RacingHistory({ v, sources }: { v: VehicleFull; sources: Map<string, SourceRow[]> }) {
  const champs = [...new Map(v.results.map((r) => [r.event.championship.id, r.event.championship])).values()];
  return (
    <section id="racing-history" className="scroll-mt-32 pt-24">
      <SectionHeading index="C" eyebrow="Racing history" title="In competition">
        Results documented in this archive. This is a curated, sourced record — not yet a complete race-by-race classification for every round.
      </SectionHeading>

      <div className="mb-16 grid gap-px bg-line md:grid-cols-3">
        {CLASSICS.map((c) => {
          const rs = v.results.filter((r) => new RegExp(c.match).test(r.event.name));
          return (
            <div key={c.key} className="bg-ink p-6">
              <h3 className="display text-2xl">{c.label}</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {rs.length ? rs.map((r) => (
                  <li key={r.id} className="flex justify-between gap-3">
                    <span className="text-soft">{r.event.season} · #{r.entry?.carNumber}</span>
                    <span className="font-mono">{ordinalPosition(r.position)}</span>
                  </li>
                )) : <li className="text-mute">No documented result yet.</li>}
              </ul>
            </div>
          );
        })}
      </div>

      {champs.map((c) => {
        const rs = v.results.filter((r) => r.event.championshipId === c.id);
        const seasons = [...new Set(rs.map((r) => r.event.season))];
        return (
          <div key={c.id} className="mb-14">
            <h3 className="mb-1 text-2xl">{c.name}</h3>
            <p className="eyebrow mb-6">{c.body}</p>
            {seasons.map((s) => (
              <div key={s} className="mb-8">
                <p className="mb-2 font-mono text-sm text-amber">{s}</p>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] text-left text-sm">
                    <thead className="eyebrow">
                      <tr className="border-b hairline"><th className="py-2 pr-4 font-normal">Date</th><th className="py-2 pr-4 font-normal">Event</th><th className="py-2 pr-4 font-normal">Car</th><th className="py-2 pr-4 font-normal">Result</th><th className="py-2 font-normal">Notes</th></tr>
                    </thead>
                    <tbody>{rs.filter((r) => r.event.season === s).map((r) => <ResultRow key={r.id} r={r} src={sources.get(r.id)} />)}</tbody>
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

function Teams({ v }: { v: VehicleFull }) {
  const teams = [...new Map(v.entries.map((e) => [e.team.id, e.team])).values()];
  const block = (kind: string, title: string) => {
    const list = teams.filter((t) => t.kind === kind);
    return (
      <div>
        <h3 className="eyebrow mb-4 text-paper">{title}</h3>
        <div className="space-y-4">
          {list.map((t) => {
            const es = v.entries.filter((e) => e.teamId === t.id);
            const seasons = [...new Set(es.map((e) => e.season))];
            return (
              <Link key={t.id} href={`/teams/${t.slug}`} className="block rounded-sm border hairline bg-carbon p-5 transition-colors hover:border-mute">
                <div className="flex items-baseline justify-between gap-4">
                  <h4 className="display text-2xl">{t.name}</h4>
                  <span className="font-mono text-xs text-mute">{country(t.country)}</span>
                </div>
                <p className="mt-2 text-sm text-soft">{t.description}</p>
                <p className="mt-3 font-mono text-xs text-mute">
                  {seasons[0]}–{seasons.at(-1)} · {[...new Set(es.map((e) => e.championship.shortName))].join(" & ")} · #{[...new Set(es.map((e) => e.carNumber))].join(" #")}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    );
  };
  return (
    <section id="teams" className="scroll-mt-32 pt-24">
      <SectionHeading index="D" eyebrow="Teams" title="Who raced it">
        Factory and customer operations are recorded separately. Only operations confirmed by sources are listed; no other customer
        programmes have been verified to archive standard.
      </SectionHeading>
      <div className="grid gap-10 lg:grid-cols-2 [&>*]:min-w-0">
        {block("factory", "Factory team")}
        {block("customer", "Customer teams")}
      </div>
    </section>
  );
}

function Drivers({ v, sources }: { v: VehicleFull; sources: Map<string, SourceRow[]> }) {
  const rows = v.entries.flatMap((e) =>
    e.drivers.map((d) => ({
      e, d: d.driver,
      major: v.results.filter((r) => r.entryId === e.id && r.highlight).map(resultLabel),
    })),
  ).sort((a, b) => a.d.name.localeCompare(b.d.name) || a.e.season - b.e.season);
  const undocumented = v.entries.filter((e) => !e.drivers.length);
  return (
    <section id="drivers" className="scroll-mt-32 pt-24">
      <SectionHeading index="E" eyebrow="Drivers" title="Crews">
        {new Set(rows.map((r) => r.d.id)).size} drivers documented across {v.entries.length} season entries. Major results are those attributed to the
        driver&apos;s season entry.
      </SectionHeading>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="eyebrow">
            <tr className="border-b hairline">
              {["Driver", "Car", "Team", "Season", "Championship", "Major results", ""].map((h) => <th key={h} className="py-2 pr-4 font-normal">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ e, d, major }) => (
              <tr key={`${e.id}-${d.id}`} className="border-b hairline align-top">
                <td className="py-3 pr-4"><Link href={`/drivers/${d.slug}`} className="hover:underline">{d.name}</Link> <span className="font-mono text-[10px] text-mute">{d.nationality}</span></td>
                <td className="py-3 pr-4 font-mono">#{e.carNumber}</td>
                <td className="py-3 pr-4">{e.team.name}</td>
                <td className="py-3 pr-4 font-mono">{e.season}</td>
                <td className="py-3 pr-4">{e.championship.shortName}{e.scope !== "full-season" ? <span className="block text-xs text-mute">{e.scope}</span> : null}</td>
                <td className="py-3 pr-4 text-soft">{major.join("; ") || <span className="text-mute">—</span>}</td>
                <td className="py-3"><span className="inline-flex items-center gap-1"><VerificationBadge status={e.verification} compact /><Cite sources={sources.get(e.id)} /></span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {undocumented.length ? (
        <p className="mt-6 text-sm text-mute">
          Line-ups still to be documented: {undocumented.map((e) => `${e.team.name} #${e.carNumber} (${e.championship.shortName} ${e.season})`).join("; ")}.
        </p>
      ) : null}
      {v.entries.some((e) => e.notes) ? (
        <ul className="mt-6 space-y-1 text-xs text-mute">
          {v.entries.filter((e) => e.notes).map((e) => <li key={e.id}>#{e.carNumber} {e.championship.shortName} {e.season}: {e.notes}</li>)}
        </ul>
      ) : null}
    </section>
  );
}

function Achievements({ v }: { v: VehicleFull }) {
  const list = v.results.filter((r) => r.highlight);
  return (
    <section id="achievements" className="scroll-mt-32 pt-24">
      <SectionHeading index="F" eyebrow="Major achievements" title="Honours" />
      <ol className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
        {list.map((r) => (
          <li key={r.id} className="bg-ink p-6">
            <p className="font-mono text-xs text-amber">{formatDate(r.event.date, r.event.datePrecision)}</p>
            <h3 className="mt-2 text-lg">{r.headline}</h3>
            <p className="mt-1 text-sm text-mute">{r.event.name} · #{r.entry?.carNumber} {r.entry?.team.name}</p>
            <div className="mt-3"><VerificationBadge status={r.verification} compact /></div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function GallerySection({ v }: { v: VehicleFull }) {
  const photos: GalleryItem[] = v.photos.map((p) => ({ kind: "photo", id: p.id, url: p.url, alt: p.alt, caption: p.caption, credit: p.credit, view: p.view }));
  const art: GalleryItem[] = v.liveries.map((l) => ({ kind: "art", id: l.id, design: parseDesign(l.design), number: splitList(l.carNumbers)[0], title: `${l.name} (${l.year})` }));
  return (
    <section id="gallery" className="scroll-mt-32 pt-24">
      <SectionHeading index="G" eyebrow="Photo gallery" title="Gallery">
        {photos.length
          ? `${photos.length} credited photographs.`
          : "No licensed photographs have been archived for this car yet. Curators can attach credited images from the dashboard; until then the gallery shows archival livery illustrations."}
      </SectionHeading>
      <Gallery items={[...photos, ...art]} />
    </section>
  );
}

async function InResearch({ v }: { v: VehicleFull }) {
  return (
    <Container className="py-24">
      <nav className="eyebrow"><Link href="/vehicles" className="hover:text-paper">Collection</Link> / {v.manufacturer.name}</nav>
      <h1 className="display mt-6 text-[clamp(3rem,9vw,8rem)]">{v.fullName}</h1>
      <p className="mt-4 max-w-2xl text-lg text-soft">{v.tagline}</p>
      <div className="mt-10 max-w-2xl rounded-sm border border-amber/30 bg-amber/5 p-6">
        <p className="eyebrow text-amber">Profile in research</p>
        <p className="mt-3 text-soft">
          This car is catalogued in the collection, but its historical profile — specifications, results, teams, drivers and liveries —
          has not yet been researched and sourced to archive standard. Nothing is published until it is.
        </p>
      </div>
      <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-6">
        {[["Manufacturer", v.manufacturer.name], ["Category", v.category], ["Debut season", String(v.debutYear)], ["Era", v.era]].map(([k, val]) => (
          <div key={k}><dt className="eyebrow">{k}</dt><dd className="mt-1 capitalize">{val}</dd></div>
        ))}
      </dl>
    </Container>
  );
}
