"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Circuit, CircuitType, Region } from "@/lib/f1/circuits";
import { CircuitCard } from "./cards";

const TYPES: CircuitType[] = ["Permanent", "Street", "Hybrid"];

export function CircuitBrowser({ circuits, regions }: { circuits: Circuit[]; regions: Region[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const type = TYPES.find((t) => t === params.get("type")) ?? null;
  const [region, setRegion] = useState<Region | "all">("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"first" | "name">("first");

  const setType = (t: CircuitType | null) => {
    const sp = new URLSearchParams(params.toString());
    if (t) sp.set("type", t);
    else sp.delete("type");
    router.replace(`${pathname}${sp.toString() ? `?${sp}` : ""}`, { scroll: false });
  };

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return circuits
      .filter(
        (c) =>
          (region === "all" || c.region === region) &&
          (!type || c.type === type) &&
          (!query || `${c.name} ${c.shortName} ${c.location} ${c.country} ${c.grandPrix} ${c.landmarks.join(" ")}`.toLowerCase().includes(query)),
      )
      .sort((a, b) => (sort === "first" ? a.firstGrandPrix - b.firstGrandPrix : a.shortName.localeCompare(b.shortName)));
  }, [circuits, region, type, q, sort]);

  return (
    <div>
      <div className="chip-row" role="group" aria-label="Filter by region">
        <button type="button" className="chip" aria-pressed={region === "all"} onClick={() => setRegion("all")}>
          All regions
        </button>
        {regions.map((r) => (
          <button key={r} type="button" className="chip" aria-pressed={region === r} onClick={() => setRegion(r)}>
            {r}
          </button>
        ))}
      </div>
      <div className="flex-row mt-s" style={{ gap: 10 }}>
        <label className="field" style={{ flex: "1 1 240px" }}>
          <Search size={16} aria-hidden />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search circuits, countries or corners" aria-label="Search circuits" />
        </label>
        <select className="select" aria-label="Circuit type" value={type ?? ""} onChange={(e) => setType((e.target.value || null) as CircuitType | null)}>
          <option value="">All types</option>
          {TYPES.map((t) => (
            <option key={t} value={t}>
              {t} circuits
            </option>
          ))}
        </select>
        <select className="select" aria-label="Sort circuits" value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}>
          <option value="first">Sort: first Grand Prix</option>
          <option value="name">Sort: name</option>
        </select>
      </div>
      <p className="caption mt-s" aria-live="polite">
        Showing {list.length} of {circuits.length} circuits
      </p>
      {list.length ? (
        <div className="grid grid-3 mt-m">
          {list.map((c) => (
            <CircuitCard key={c.slug} c={c} />
          ))}
        </div>
      ) : (
        <div className="pending mt-m">
          <p className="pending-title">No circuits match.</p>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setRegion("all"); setQ(""); setType(null); }}>
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
