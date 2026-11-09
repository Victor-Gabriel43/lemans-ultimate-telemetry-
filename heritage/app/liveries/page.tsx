import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/Section";
import LiveryArchive from "@/components/LiveryArchive";
import type { LiveryFilters } from "@/lib/liveries";

export const metadata: Metadata = { title: "Livery archive", description: "Every documented racing livery across the collection, filterable by year, team, car number and championship." };

export default async function AllLiveries({ searchParams }: { searchParams: Promise<LiveryFilters> }) {
  return (
    <Container className="py-16">
      <SectionHeading title="Every colour scheme">
        The archive&apos;s complete livery database across all vehicles.
      </SectionHeading>
      <LiveryArchive filters={await searchParams} />
    </Container>
  );
}
