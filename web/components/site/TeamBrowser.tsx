"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Team } from "@/lib/f1/teams";
import { constructorTitles } from "@/lib/f1/seasons";
import { TeamCard } from "./cards";

const FILTERS = [
  { id: "all", label: "All teams" },
  { id: "active", label: "2026 grid" },
  { id: "historic", label: "Historic" },
  { id: "champions", label: "Constructors’ champions" },
] as const;

export function TeamBrowser({ teams }: { teams: Team[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const filter = FILTERS.find((f) => f.id === params.get("filter"))?.id ?? "all";
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"titles" | "founded" | "name">("titles");

  const setFilter = (id: string) => {
    const sp = new URLSearchParams(params.toString());
    if (id === "all") sp.delete("filter");
    else sp.set("filter", id);
    router.replace(`${pathname}${sp.toString() ? `?${sp}` : ""}`, { scroll: false });
  };

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return teams
      .map((t) => ({ t, titles: constructorTitles(t.slug).length }))
      .filter(({ t, titles }) =>
        (filter === "active" ? t.active : filter === "historic" ? !t.active : filter === "champions" ? titles > 0 : true) &&
        (!query || `${t.name} ${t.base} ${t.country} ${(t.lineage ?? []).join(" ")}`.toLowerCase().includes(query)),
      )
      .sort((a, b) => (sort === "titles" ? b.titles - a.titles || a.t.firstSeason - b.t.firstSeason : sort === "founded" ? a.t.firstSeason - b.t.firstSeason : a.t.name.localeCompare(b.t.name)))
      .map(({ t }) => t);
  }, [teams, filter, q, sort]);

  return (
    <div>
      <div className="flex-row space-between" style={{ gap: 12 }}>
        <div className="chip-row" role="group" aria-label="Filter teams">
          {FILTERS.map((f) => (
            <button key={f.id} type="button" className="chip" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex-row" style={{ gap: 10 }}>
          <label className="field" style={{ width: 240 }}>
            <Search size={16} aria-hidden />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search teams or lineage" aria-label="Search teams" />
          </label>
          <select className="select" aria-label="Sort teams" value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}>
            <option value="titles">Sort: titles</option>
            <option value="founded">Sort: first season</option>
            <option value="name">Sort: name</option>
          </select>
        </div>
      </div>
      <p className="caption mt-s" aria-live="polite">
        Showing {list.length} of {teams.length} teams
      </p>
      {list.length ? (
        <div className="grid grid-3 mt-m">
          {list.map((t) => (
            <TeamCard key={t.slug} t={t} />
          ))}
        </div>
      ) : (
        <div className="pending mt-m">
          <p className="pending-title">No teams match.</p>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setQ(""); setFilter("all"); }}>
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
