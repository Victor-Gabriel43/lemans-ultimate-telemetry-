import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Container, SectionHeading } from "@/components/Section";
import CompareTool, { type CompareLivery } from "@/components/CompareTool";
import { parseDesign, splitList } from "@/lib/format";
import { LIVERY_KINDS } from "@/lib/vocab";
import { liveryCovers } from "@/lib/photos";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ l?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const v = await db.vehicle.findUnique({ where: { slug: (await params).slug } });
  return v ? { title: `Compare ${v.fullName} liveries` } : {};
}

export default async function ComparePage({ params, searchParams }: Props) {
  const v = await db.vehicle.findUnique({ where: { slug: (await params).slug } });
  if (!v) notFound();
  const rows = await db.livery.findMany({
    where: { vehicleId: v.id },
    include: { team: true, championship: true, drivers: { include: { driver: true } } },
    orderBy: [{ year: "asc" }, { firstUsed: "asc" }],
  });
  const covers = await liveryCovers(rows.map((l) => l.id));
  const liveries: CompareLivery[] = rows.map((l) => ({
    slug: l.slug, name: l.name, year: l.year, kind: l.kind, kindLabel: LIVERY_KINDS[l.kind] ?? l.kind, team: l.team?.name ?? "",
    numbers: splitList(l.carNumbers), championship: l.championship?.name ?? "", event: l.event, sponsors: splitList(l.sponsors),
    drivers: l.drivers.map((d) => d.driver.name), background: l.background, inspiration: l.inspiration, design: parseDesign(l.design),
    verification: l.verification, isVariation: l.isVariation, photo: covers.get(l.id) ?? null,
  }));
  const initial = splitList((await searchParams).l ?? "");
  return (
    <Container className="py-16">
      <nav className="text-sm text-fog mb-6"><Link href={`/vehicles/${v.slug}`} className="hover:text-chalk">{v.fullName}</Link> / Compare</nav>
      <SectionHeading title="Side by side">
        Choose liveries of the {v.fullName} to compare their look, sponsors, teams and history. The selection is kept in the URL so a comparison
        can be shared.
      </SectionHeading>
      <CompareTool liveries={liveries} initial={initial} vehicleSlug={v.slug} />
    </Container>
  );
}
