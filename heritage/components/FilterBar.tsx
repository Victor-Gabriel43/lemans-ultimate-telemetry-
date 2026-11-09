"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export type FilterDef = { name: string; label: string; options: { value: string; label: string }[] };

/** URL-driven filters: every state is shareable and indexable. */
export default function FilterBar({ filters, search = true, sort }: { filters: FilterDef[]; search?: boolean; sort?: FilterDef }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, start] = useTransition();

  const set = (name: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(name, value);
    else next.delete(name);
    start(() => router.replace(`${pathname}${next.size ? `?${next}` : ""}`, { scroll: false }));
  };
  const active = filters.filter((f) => params.get(f.name)).length + (params.get("q") ? 1 : 0);
  const field = "rounded-full border rule bg-black px-4 py-2 text-[15px] focus:border-chalk focus:outline-none";

  return (
    <div className={`flex flex-wrap items-center gap-2 border-y rule py-4 transition-opacity ${pending ? "opacity-60" : ""}`}>
      {search ? (
        <input
          defaultValue={params.get("q") ?? ""}
          onChange={(e) => set("q", e.target.value)}
          placeholder="Search by name, sponsor or number"
          aria-label="Search"
          className={`${field} min-w-[240px] flex-1 placeholder:text-fog`}
        />
      ) : null}
      {[...filters, ...(sort ? [sort] : [])].map((f) => (
        <select key={f.name} aria-label={f.label} value={params.get(f.name) ?? ""} onChange={(e) => set(f.name, e.target.value)} className={`${field} cursor-pointer`}>
          {f.name !== "sort" ? <option value="">{f.label}: all</option> : null}
          {f.options.map((o) => <option key={o.value} value={o.value}>{f.name === "sort" ? `Sort: ${o.label}` : o.label}</option>)}
        </select>
      ))}
      {active ? (
        <button onClick={() => start(() => router.replace(pathname, { scroll: false }))} className="px-3 text-[15px] text-fog underline underline-offset-4 hover:text-chalk">
          Clear {active} {active === 1 ? "filter" : "filters"}
        </button>
      ) : null}
    </div>
  );
}
