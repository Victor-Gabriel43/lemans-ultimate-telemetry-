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

  return (
    <div className={`border-y hairline py-4 transition-opacity ${pending ? "opacity-60" : ""}`}>
      <div className="flex flex-wrap items-end gap-3">
        {search ? (
          <label className="flex min-w-[220px] flex-1 flex-col gap-1">
            <span className="eyebrow">Search</span>
            <input
              defaultValue={params.get("q") ?? ""}
              onChange={(e) => set("q", e.target.value)}
              placeholder="Name, sponsor, number…"
              className="border-b hairline bg-transparent py-1.5 text-sm placeholder:text-mute focus:border-paper focus:outline-none"
            />
          </label>
        ) : null}
        {[...filters, ...(sort ? [sort] : [])].map((f) => (
          <label key={f.name} className="flex min-w-[140px] flex-col gap-1">
            <span className="eyebrow">{f.label}</span>
            <select
              value={params.get(f.name) ?? ""}
              onChange={(e) => set(f.name, e.target.value)}
              className="cursor-pointer border-b hairline bg-ink py-1.5 text-sm focus:border-paper focus:outline-none"
            >
              {f.name !== "sort" ? <option value="">All</option> : null}
              {f.options.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </label>
        ))}
        {active ? (
          <button onClick={() => start(() => router.replace(pathname, { scroll: false }))} className="eyebrow pb-2 hover:text-paper">
            Clear ({active})
          </button>
        ) : null}
      </div>
    </div>
  );
}
