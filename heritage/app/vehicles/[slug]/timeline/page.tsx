import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getTimeline, sourcesFor } from "@/lib/queries";
import { Container, SectionHeading } from "@/components/Section";
import TimelineExplorer, { type TLItem } from "@/components/TimelineExplorer";
import { formatDate, parseDesign, splitList } from "@/lib/format";
import { TIMELINE_CATEGORIES } from "@/lib/vocab";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const v = await db.vehicle.findUnique({ where: { slug: (await params).slug } });
  return v ? { title: `${v.fullName} timeline`, description: `Chronology of the ${v.fullName}, season by season.`, alternates: { canonical: `/vehicles/${v.slug}/timeline` } } : {};
}

export default async function TimelinePage({ params }: Props) {
  const v = await db.vehicle.findUnique({ where: { slug: (await params).slug } });
  if (!v) notFound();
  const rows = await getTimeline(v.id);
  const src = await sourcesFor("TimelineEntry", rows.map((r) => r.id));
  const items: TLItem[] = rows.map((r) => ({
    id: r.id,
    date: r.date.toISOString(),
    dateLabel: formatDate(r.date, r.datePrecision),
    year: r.date.getUTCFullYear(),
    title: r.title,
    description: r.description,
    category: r.category,
    categoryLabel: TIMELINE_CATEGORIES[r.category] ?? r.category,
    milestone: r.milestone,
    verification: r.verification,
    team: r.team ? { name: r.team.name, slug: r.team.slug } : null,
    livery: r.livery ? { name: r.livery.name, slug: r.livery.slug, design: parseDesign(r.livery.design), number: splitList(r.livery.carNumbers)[0] } : null,
    photo: r.photos[0] ? { url: r.photos[0].url, alt: r.photos[0].alt, credit: r.photos[0].credit } : null,
    sources: (src.get(r.id) ?? []).map((s) => ({ id: s.id, title: s.title, publisher: s.publisher, url: s.url })),
  }));
  return (
    <Container className="py-16">
      <nav className="eyebrow mb-6"><Link href={`/vehicles/${v.slug}`} className="hover:text-paper">{v.fullName}</Link> / Timeline</nav>
      <SectionHeading eyebrow="Interactive timeline" title={`${v.fullName}, ${items[0]?.year ?? v.debutYear}–${items.at(-1)?.year ?? ""}`}>
        {items.length} dated records. Choose a season or step through them; red markers are milestones. Images are archival livery
        illustrations unless a credited photograph has been archived.
      </SectionHeading>
      <TimelineExplorer items={items} vehicleSlug={v.slug} />
    </Container>
  );
}
