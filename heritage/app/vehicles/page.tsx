import type { Metadata } from "next";
import { Suspense } from "react";
import { vehicleCovers } from "@/lib/photos";
import { catalogFacets, searchVehicles, type CatalogFilters } from "@/lib/queries";
import { Container, SectionHeading } from "@/components/Section";
import FilterBar from "@/components/FilterBar";
import { VehicleCard } from "@/components/Cards";
import { country, ERAS } from "@/lib/vocab";

export const metadata: Metadata = {
  title: "Vehicle collection",
  description: "Searchable catalogue of racing cars. Filter by manufacturer, category, year, championship, team, country and era.",
};

export default async function Vehicles({ searchParams }: { searchParams: Promise<CatalogFilters> }) {
  const f = await searchParams;
  const [vehicles, facets] = await Promise.all([searchVehicles(f), catalogFacets()]);
  const covers = await vehicleCovers(vehicles);

  return (
    <Container className="py-16">
      <SectionHeading title="The collection">
        {vehicles.length} {vehicles.length === 1 ? "vehicle" : "vehicles"} match. A year filter shows cars that were racing in that season.
      </SectionHeading>
      <Suspense>
        <FilterBar
          filters={[
            { name: "manufacturer", label: "Manufacturer", options: facets.manufacturers.map((m) => ({ value: m.slug, label: m.name })) },
            { name: "category", label: "Category", options: facets.categories.map((c) => ({ value: c, label: c })) },
            { name: "year", label: "Year", options: Array.from({ length: 2026 - 1982 + 1 }, (_, i) => String(2026 - i)).map((y) => ({ value: y, label: y })) },
            { name: "championship", label: "Championship", options: facets.championships.filter((c) => c.slug !== "exhibition").map((c) => ({ value: c.slug, label: c.shortName })) },
            { name: "team", label: "Team", options: facets.teams.map((t) => ({ value: t.slug, label: t.name })) },
            { name: "country", label: "Country", options: facets.countries.map((c) => ({ value: c, label: country(c) })) },
            { name: "era", label: "Era", options: Object.entries(ERAS).map(([value, label]) => ({ value, label })) },
          ]}
          sort={{ name: "sort", label: "Sort", options: [
            { value: "", label: "Featured" }, { value: "recent", label: "Recently added" }, { value: "oldest", label: "Debut: oldest" }, { value: "name", label: "Name A–Z" },
          ] }}
        />
      </Suspense>
      <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((v) => (
          <VehicleCard key={v.id} v={v} photo={covers.get(v.id)} />
        ))}
      </div>
      {!vehicles.length ? <p className="mt-16 text-center text-fog">No vehicles match these filters.</p> : null}
    </Container>
  );
}
