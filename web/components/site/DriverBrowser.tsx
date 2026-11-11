"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Driver } from "@/lib/f1/drivers";
import type { EraId } from "@/lib/f1/types";
import type { MediaAsset } from "@/lib/f1/media";
import { DriverCardClient } from "./DriverCardClient";

const STATUS = [
  { id: "all", label: "All drivers" },
  { id: "champions", label: "World champions" },
  { id: "active", label: "Current drivers" },
] as const;
const ERAS: EraId[] = ["1950s", "1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s"];
type Sort = "chronological" | "titles" | "name";

export type DriverRow = Driver & { titles: number[]; media?: MediaAsset };

export function DriverBrowser({ drivers }: { drivers: DriverRow[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const status = (STATUS.find((s) => s.id === params.get("filter"))?.id ?? "all") as (typeof STATUS)[number]["id"];
  const [era, setEra] = useState<EraId | "all">("all");
  const [nation, setNation] = useState("all");
  const [sort, setSort] = useState<Sort>("chronological");
  const [q, setQ] = useState("");

  const nations = useMemo(() => [...new Set(drivers.map((d) => d.nationality))].sort(), [drivers]);

  const setStatus = (id: string) => {
    const sp = new URLSearchParams(params.toString());
    if (id === "all") sp.delete("filter");
    else sp.set("filter", id);
    router.replace(`${pathname}${sp.toString() ? `?${sp}` : ""}`, { scroll: false });
  };

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    const out = drivers.filter(
      (d) =>
        (status === "champions" ? d.titles.length > 0 : status === "active" ? d.active : true) &&
        (era === "all" || d.eras.includes(era)) &&
        (nation === "all" || d.nationality === nation) &&
        (!query || `${d.name} ${d.nationality} ${d.knownFor} ${d.teams.map((t) => t.name).join(" ")}`.toLowerCase().includes(query)),
    );
    return out.sort((a, b) =>
      sort === "titles" ? b.titles.length - a.titles.length || a.firstSeason - b.firstSeason : sort === "name" ? a.lastName.localeCompare(b.lastName) : a.firstSeason - b.firstSeason,
    );
  }, [drivers, status, era, nation, sort, q]);

  const reset = () => {
    setEra("all");
    setNation("all");
    setQ("");
    setStatus("all");
  };

  return (
    <div>
      <div className="chip-row" role="group" aria-label="Driver status">
        {STATUS.map((s) => (
          <button key={s.id} type="button" className="chip" aria-pressed={status === s.id} onClick={() => setStatus(s.id)}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="flex-row mt-s" style={{ gap: 10 }}>
        <label className="field" style={{ flex: "1 1 240px" }}>
          <Search size={16} aria-hidden />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, team or nationality" aria-label="Search drivers" />
        </label>
        <select className="select" aria-label="Filter by era" value={era} onChange={(e) => setEra(e.target.value as EraId | "all")}>
          <option value="all">All eras</option>
          {ERAS.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
        <select className="select" aria-label="Filter by nationality" value={nation} onChange={(e) => setNation(e.target.value)}>
          <option value="all">All nationalities</option>
          {nations.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <select className="select" aria-label="Sort drivers" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
          <option value="chronological">Sort: debut</option>
          <option value="titles">Sort: championships</option>
          <option value="name">Sort: surname</option>
        </select>
      </div>

      <p className="caption mt-s" aria-live="polite">
        Showing {list.length} of {drivers.length} profiles
      </p>

      {list.length === 0 ? (
        <div className="pending mt-m">
          <p className="pending-title">No drivers match these filters.</p>
          <button type="button" className="btn btn-ghost btn-sm" onClick={reset}>
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-4 keep-2 mt-m">
          {list.map((d) => (
            <DriverCardClient key={d.slug} d={d} />
          ))}
        </div>
      )}
    </div>
  );
}
