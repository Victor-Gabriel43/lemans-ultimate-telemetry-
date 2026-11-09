import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getTimeline, sourcesFor } from "@/lib/queries";
import { Container, SectionHeading } from "@/components/Section";
import TimelineExplorer, { type TLItem } from "@/components/TimelineExplorer";
import { formatDate } from "@/lib/format";
import { asPhoto } from "@/lib/photos";
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
    dateLabel: formatDate(r.date, r.datePrecision),
    year: r.date.getUTCFullYear(),
    title: r.title,
    description: r.description,
    category: r.category,
    categoryLabel: TIMELINE_CATEGORIES[r.category] ?? r.category,
    milestone: r.milestone,
    verification: r.verification,
    team: r.team ? { name: r.team.name, slug: r.team.slug } : null,
    livery: r.livery ? { name: r.livery.name, slug: r.livery.slug } : null,
    photo: r.photos[0] ? asPhoto(r.photos[0]) : r.livery?.photos.find((p) => p.view === "main") ? asPhoto(r.livery.photos.find((p) => p.view === "main")!) : r.livery?.photos[0] ? asPhoto(r.livery.photos[0]) : null,
    sources: (src.get(r.id) ?? []).map((s) => ({ id: s.id, title: s.title, publisher: s.publisher, url: s.url })),
  }));
  return (
    <Container className="py-16">
      <nav className="text-sm text-fog mb-6"><Link href={`/vehicles/${v.slug}`} className="hover:text-chalk">{v.fullName}</Link> / Timeline</nav>
      <SectionHeading title={`${v.fullName}, ${items[0]?.year ?? v.debutYear}–${items.at(-1)?.year ?? ""}`}>
        {items.length} dated records. Choose a season or step through them; each moment shows the car as it looked at the time.
      </SectionHeading>
      <TimelineExplorer items={items} vehicleSlug={v.slug} />
    </Container>
  );
}
