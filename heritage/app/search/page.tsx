import type { Metadata } from "next";
import Link from "next/link";
import { globalSearch } from "@/lib/queries";
import { Container, SectionHeading } from "@/components/Section";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Search", robots: { index: false } };

function Group({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  if (!count) return null;
  return (
    <section className="mt-12">
      <h2 className="display mb-3 text-3xl">{title} <span className="text-fog">{count}</span></h2>
      <ul className="divide-y divide-asphalt border-y rule">{children}</ul>
    </section>
  );
}
const Row = ({ href, title, meta }: { href: string; title: string; meta: string }) => (
  <li><Link href={href} className="flex flex-wrap items-baseline justify-between gap-2 py-3 hover:text-white"><span>{title}</span><span className="text-xs text-fog">{meta}</span></Link></li>
);

export default async function Search({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const q = (await searchParams).q ?? "";
  const r = await globalSearch(q);
  const total = r ? Object.values(r).reduce((n, a) => n + a.length, 0) : 0;
  return (
    <Container className="py-16">
      <SectionHeading title="Search the archive" />
      <form className="flex max-w-2xl items-center border-b border-fog focus-within:border-paper">
        <label htmlFor="q" className="sr-only">Search</label>
        <input id="q" name="q" defaultValue={q} autoFocus placeholder="Try “Daytona”, “Mobil 1”, “Estre”, “#99”…" className="w-full bg-transparent py-3 text-xl placeholder:text-fog focus:outline-none" />
        <button className="text-sm text-fog px-2 py-3 hover:text-chalk">Search</button>
      </form>
      {q && r ? <p className="mt-4 text-xs text-fog">{total} results for “{q}”</p> : null}
      {q && q.length < 2 ? <p className="mt-4 text-sm text-fog">Type at least two characters.</p> : null}
      {r ? (
        <>
          <Group title="Vehicles" count={r.vehicles.length}>{r.vehicles.map((v) => <Row key={v.id} href={`/vehicles/${v.slug}`} title={v.fullName} meta={`${v.manufacturer.name}, ${v.category}`} />)}</Group>
          <Group title="Liveries" count={r.liveries.length}>{r.liveries.map((l) => <Row key={l.id} href={`/vehicles/${l.vehicle.slug}/liveries/${l.slug}`} title={l.name} meta={`${l.year}, ${l.team?.name ?? l.vehicle.fullName}`} />)}</Group>
          <Group title="Races & events" count={r.events.length}>{r.events.map((e) => <Row key={e.id} href={e.results[0] ? `/vehicles/${e.results[0].vehicle.slug}#racing-history` : "#"} title={`${e.name} ${e.season}`} meta={e.circuit} />)}</Group>
          <Group title="Timeline" count={r.timeline.length}>{r.timeline.map((t) => <Row key={t.id} href={`/vehicles/${t.vehicle.slug}/timeline#${t.id}`} title={t.title} meta={formatDate(t.date, t.datePrecision)} />)}</Group>
          <Group title="Teams" count={r.teams.length}>{r.teams.map((t) => <Row key={t.id} href={`/teams/${t.slug}`} title={t.name} meta={t.kind} />)}</Group>
          <Group title="Drivers" count={r.drivers.length}>{r.drivers.map((d) => <Row key={d.id} href={`/drivers/${d.slug}`} title={d.name} meta={d.nationality} />)}</Group>
        </>
      ) : null}
    </Container>
  );
}
