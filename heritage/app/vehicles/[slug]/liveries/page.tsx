import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Container, SectionHeading } from "@/components/Section";
import LiveryArchive from "@/components/LiveryArchive";
import type { LiveryFilters } from "@/lib/liveries";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<LiveryFilters> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const v = await db.vehicle.findUnique({ where: { slug: (await params).slug } });
  return v ? { title: `${v.fullName} livery archive`, description: `Every documented livery of the ${v.fullName}, with sources.`, alternates: { canonical: `/vehicles/${v.slug}/liveries` } } : {};
}

export default async function VehicleLiveries({ params, searchParams }: Props) {
  const v = await db.vehicle.findUnique({ where: { slug: (await params).slug } });
  if (!v) notFound();
  return (
    <Container className="py-16">
      <nav className="eyebrow mb-6"><Link href={`/vehicles/${v.slug}`} className="hover:text-paper">{v.fullName}</Link> / Liveries</nav>
      <SectionHeading eyebrow="Complete livery archive" title={`${v.fullName}: every colour scheme`}>
        From the {v.debutYear - 1} development camouflage to today. Genuinely new designs are separate records; seasonal sponsor updates are
        archived as variations of their parent design so the two are never confused.{" "}
        <Link href={`/vehicles/${v.slug}/compare`} className="text-amber hover:underline">Compare liveries →</Link>
      </SectionHeading>
      <LiveryArchive filters={await searchParams} vehicleId={v.id} />
    </Container>
  );
}
