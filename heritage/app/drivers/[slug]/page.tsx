import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Container, SectionHeading } from "@/components/Section";
import { VerificationBadge } from "@/components/Verification";
import { country } from "@/lib/vocab";
import { resultLabel } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

const load = (slug: string) => db.driver.findUnique({
  where: { slug },
  include: {
    entries: { include: { entry: { include: { vehicle: true, team: true, championship: true, results: { where: { highlight: true }, include: { event: true } } } } } },
    liveries: { include: { livery: { include: { vehicle: true } } } },
  },
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = await load((await params).slug);
  return d ? { title: d.name } : {};
}

export default async function DriverPage({ params }: Props) {
  const d = await load((await params).slug);
  if (!d) notFound();
  const entries = d.entries.map((x) => x.entry).sort((a, b) => a.season - b.season);
  return (
    <Container className="py-16">
      <nav className="text-sm text-fog mb-6"><Link href="/drivers" className="hover:text-chalk">Drivers</Link> / {d.name}</nav>
      <SectionHeading title={d.name}>{country(d.nationality)}</SectionHeading>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="text-sm text-fog"><tr className="border-b rule">{["Season", "Vehicle", "Car", "Team", "Championship", "Major results", ""].map((h) => <th key={h} className="py-2 pr-4 font-normal">{h}</th>)}</tr></thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.id} className="border-b rule align-top">
                <td className="py-3 pr-4">{e.season}</td>
                <td className="py-3 pr-4"><Link href={`/vehicles/${e.vehicle.slug}`} className="hover:underline">{e.vehicle.fullName}</Link></td>
                <td className="py-3 pr-4">#{e.carNumber}</td>
                <td className="py-3 pr-4"><Link href={`/teams/${e.team.slug}`} className="hover:underline">{e.team.name}</Link></td>
                <td className="py-3 pr-4">{e.championship.shortName}</td>
                <td className="py-3 pr-4 text-fog">{e.results.map(resultLabel).join("; ") || "—"}</td>
                <td className="py-3"><VerificationBadge status={e.verification} compact /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {d.liveries.length ? (
        <>
          <h2 className="text-sm text-fog mt-12 mb-3">Liveries raced</h2>
          <ul className="space-y-1">
            {d.liveries.map(({ livery: l }) => (
              <li key={l.id}><Link className="hover:underline" href={`/vehicles/${l.vehicle.slug}/liveries/${l.slug}`}>{l.year} — {l.name}</Link></li>
            ))}
          </ul>
        </>
      ) : null}
    </Container>
  );
}
