import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Container, SectionHeading } from "@/components/Section";
import { LiveryCard } from "@/components/Cards";
import { VerificationBadge } from "@/components/Verification";
import { country, TEAM_KINDS } from "@/lib/vocab";

type Props = { params: Promise<{ slug: string }> };

const load = (slug: string) => db.team.findUnique({
  where: { slug },
  include: {
    entries: { include: { vehicle: true, championship: true, drivers: { include: { driver: true } } }, orderBy: [{ season: "asc" }, { carNumber: "asc" }] },
    liveries: { include: { team: true, vehicle: true }, orderBy: { year: "asc" } },
  },
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await load((await params).slug);
  return t ? { title: t.name, description: t.description } : {};
}

export default async function TeamPage({ params }: Props) {
  const t = await load((await params).slug);
  if (!t) notFound();
  return (
    <Container className="py-16">
      <nav className="eyebrow mb-6"><Link href="/teams" className="hover:text-paper">Teams</Link> / {t.name}</nav>
      <SectionHeading eyebrow={`${TEAM_KINDS[t.kind]} team · ${country(t.country)}`} title={t.name}>{t.description}</SectionHeading>
      <h2 className="eyebrow mb-3">Season entries</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="eyebrow"><tr className="border-b hairline">{["Season", "Car", "Vehicle", "Championship", "Drivers", ""].map((h) => <th key={h} className="py-2 pr-4 font-normal">{h}</th>)}</tr></thead>
          <tbody>
            {t.entries.map((e) => (
              <tr key={e.id} className="border-b hairline align-top">
                <td className="py-3 pr-4 font-mono">{e.season}</td>
                <td className="py-3 pr-4 font-mono">#{e.carNumber}</td>
                <td className="py-3 pr-4"><Link className="hover:underline" href={`/vehicles/${e.vehicle.slug}`}>{e.vehicle.fullName}</Link></td>
                <td className="py-3 pr-4">{e.championship.shortName}</td>
                <td className="py-3 pr-4">{e.drivers.map((d) => d.driver.name).join(", ") || <span className="text-mute">Not documented</span>}</td>
                <td className="py-3"><VerificationBadge status={e.verification} compact /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {t.liveries.length ? (
        <>
          <h2 className="eyebrow mt-14 mb-4">Liveries</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{t.liveries.map((l) => <LiveryCard key={l.id} l={l} vehicleSlug={l.vehicle.slug} />)}</div>
        </>
      ) : null}
    </Container>
  );
}
