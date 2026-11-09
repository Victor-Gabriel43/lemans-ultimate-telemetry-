import { Suspense } from "react";
import FilterBar from "./FilterBar";
import { LiveryCard } from "./Cards";
import { LIVERY_KINDS } from "@/lib/vocab";
import { findLiveries, liveryFacets, type LiveryFilters } from "@/lib/liveries";
import { liveryCovers } from "@/lib/photos";

export default async function LiveryArchive({ filters, vehicleId }: { filters: LiveryFilters; vehicleId?: string }) {
  const [rows, facets] = await Promise.all([findLiveries(filters, vehicleId), liveryFacets(vehicleId)]);
  const years = [...new Set(rows.map((l) => l.year))];
  const covers = await liveryCovers(rows.map((l) => l.id));
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
            { name: "variations", label: "Seasonal updates", options: [{ value: "hide", label: "Hide seasonal updates" }] },
          ]}
        />
      </Suspense>
      <p className="mt-4 text-xs text-fog">{rows.length} {rows.length === 1 ? "record" : "records"}</p>
      {years.map((y) => (
        <section key={y} className="mt-12">
          <h2 className="display mb-8 border-b rule pb-2 text-[clamp(4rem,9vw,8rem)] text-fog/50">{y}</h2>
          <div className="grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rows.filter((l) => l.year === y).map((l) => <LiveryCard key={l.id} l={l} vehicleSlug={l.vehicle.slug} photo={covers.get(l.id)} />)}
          </div>
        </section>
      ))}
      {!rows.length ? <p className="mt-16 text-center text-fog">No liveries match these filters.</p> : null}
    </>
  );
}
