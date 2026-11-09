import { Suspense } from "react";
import FilterBar from "./FilterBar";
import { LiveryCard } from "./Cards";
import { LIVERY_KINDS } from "@/lib/vocab";
import { findLiveries, liveryFacets, type LiveryFilters } from "@/lib/liveries";

export default async function LiveryArchive({ filters, vehicleId }: { filters: LiveryFilters; vehicleId?: string }) {
  const [rows, facets] = await Promise.all([findLiveries(filters, vehicleId), liveryFacets(vehicleId)]);
  const years = [...new Set(rows.map((l) => l.year))];
  return (
    <>
      <Suspense>
        <FilterBar
          filters={[
            { name: "year", label: "Year", options: facets.years.map((y) => ({ value: String(y), label: String(y) })) },
            { name: "team", label: "Team", options: facets.teams.map(([value, label]) => ({ value, label })) },
            { name: "number", label: "Car number", options: facets.numbers.map((n) => ({ value: n, label: `#${n}` })) },
            { name: "championship", label: "Championship", options: facets.championships.map(([value, label]) => ({ value, label })) },
            { name: "kind", label: "Type", options: facets.kinds.map((k) => ({ value: k, label: LIVERY_KINDS[k] ?? k })) },
            { name: "variations", label: "Seasonal variations", options: [{ value: "hide", label: "Hide variations" }] },
          ]}
        />
      </Suspense>
      <p className="mt-4 font-mono text-xs text-mute">{rows.length} {rows.length === 1 ? "record" : "records"}</p>
      {years.map((y) => (
        <section key={y} className="mt-12">
          <h2 className="display mb-6 border-b hairline pb-2 text-5xl text-mute">{y}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rows.filter((l) => l.year === y).map((l) => <LiveryCard key={l.id} l={l} vehicleSlug={l.vehicle.slug} />)}
          </div>
        </section>
      ))}
      {!rows.length ? <p className="mt-16 text-center text-mute">No liveries match these filters.</p> : null}
    </>
  );
}
