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
      <nav className="text-sm text-fog mb-6"><Link href={`/vehicles/${v.slug}`} className="hover:text-chalk">{v.fullName}</Link> / Liveries</nav>
      <SectionHeading title={`${v.fullName}: every livery`} aside={<Link href={`/vehicles/${v.slug}/compare`} className="text-fog underline underline-offset-4 hover:text-chalk">Compare liveries</Link>}>
        New designs have their own record. Sponsor and seasonal changes are filed as updates of the design they came from.
      </SectionHeading>
      <LiveryArchive filters={await searchParams} vehicleId={v.id} />
    </Container>
  );
}
