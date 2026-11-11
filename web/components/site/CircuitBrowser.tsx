"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { lp, type Lang } from "@/lib/i18n/config";
import { fmt, type Dict } from "@/lib/i18n/dict";

export type CircuitRow = {
  id: string;
  name: string;
  full: string;
  place: string;
  country: string;
  continent: string;
  type: "RACE" | "STREET" | "ROAD";
  from: number;
  to: number;
  current: boolean;
  hosted: number;
  layout?: string;
  photo?: string;
};

const FILTERS = ["all", "current", "historic"] as const;
type Filter = (typeof FILTERS)[number];

export function CircuitBrowser({ circuits, lang, t }: { circuits: CircuitRow[]; lang: Lang; t: Dict }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const CI = t.circuits;
  const filter = (FILTERS.find((f) => f === params.get("filter")) ?? "all") as Filter;
  const [type, setType] = useState<string>("all");
  const [region, setRegion] = useState("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"first" | "name" | "hosted">("hosted");

  const setFilter = (f: Filter) => {
    const sp = new URLSearchParams(params.toString());
    if (f === "all") sp.delete("filter");
    else sp.set("filter", f);
    router.replace(`${pathname}${sp.toString() ? `?${sp}` : ""}`, { scroll: false });
  };
  const regions = useMemo(() => [...new Set(circuits.map((c) => c.continent))].filter(Boolean), [circuits]);

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return circuits
      .filter(
        (c) =>
          (filter === "current" ? c.current : filter === "historic" ? !c.current : true) &&
          (type === "all" || c.type === type) &&
          (region === "all" || c.continent === region) &&
          (!query || `${c.name} ${c.full} ${c.place} ${c.country}`.toLowerCase().includes(query)),
      )
      .sort((a, b) => (sort === "first" ? a.from - b.from : sort === "hosted" ? b.hosted - a.hosted : a.name.localeCompare(b.name)));
  }, [circuits, filter, type, region, q, sort]);

  const labels: Record<Filter, string> = { all: CI.filterAll, current: CI.filterCurrent, historic: CI.filterHistoric };

  return (
    <div>
      <div className="chip-row" role="group" aria-label={t.common.filter}>
        {FILTERS.map((f) => (
          <button key={f} type="button" className="chip" aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {labels[f]}
          </button>
        ))}
      </div>
      <div className="flex-row mt-s" style={{ gap: 10 }}>
        <label className="field" style={{ flex: "1 1 220px" }}>
          <Search size={16} aria-hidden />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={CI.searchPlaceholder} aria-label={CI.searchPlaceholder} />
        </label>
        <select className="select" aria-label={t.common.filter} value={type} onChange={(e) => setType(e.target.value)}>
          <option value="all">{CI.allTypes}</option>
          {(["RACE", "STREET", "ROAD"] as const).map((x) => (
            <option key={x} value={x}>
              {CI.typeLong[x]}
            </option>
          ))}
        </select>
        <select className="select" aria-label={t.common.country} value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="all">{CI.allRegions}</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {CI.continent[r] ?? r}
            </option>
          ))}
        </select>
        <select className="select" aria-label={t.common.sortBy} value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}>
          <option value="hosted">{CI.sortHosted}</option>
          <option value="first">{CI.sortFirst}</option>
          <option value="name">{CI.sortName}</option>
        </select>
      </div>
      <p className="caption mt-s" aria-live="polite">
        {fmt(t.common.showing, { n: list.length, total: circuits.length })}
      </p>
      {list.length ? (
        <div className="grid grid-4 keep-2 mt-m">
          {list.map((c) => (
            <Link key={c.id} href={lp(lang, `/circuits/${c.id}`)} className="card">
              <div className="plate plate-flat ratio-photo" style={{ background: "var(--paper-2)" }}>
                {c.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.photo} alt={c.full} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                ) : c.layout ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`/media/circuits/${c.layout}.svg`} alt={fmt(CI.layoutDrawing, { id: c.layout })} loading="lazy" style={{ position: "absolute", inset: "12%", width: "76%", height: "76%", objectFit: "contain" }} />
                ) : null}
              </div>
              <div className="card-body">
                <p className="card-meta">
                  {c.place}, {c.country}
                </p>
                <p className="card-title">{c.full}</p>
                <div className="flex-row" style={{ gap: 6, marginTop: 6 }}>
                  <span className={`badge ${c.current ? "badge-red" : ""}`}>{c.current ? CI.current : CI.historicVenue}</span>
                  <span className="badge">{fmt(CI.hosted, { n: c.hosted })}</span>
                </div>
                <p className="caption mt-xs">
                  {CI.types[c.type]} · {c.from}–{c.current ? t.common.present : c.to}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="pending mt-m">
          <p className="pending-title">{t.common.noMatches}</p>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => {
              setQ("");
              setType("all");
              setRegion("all");
              setFilter("all");
            }}
          >
            {t.common.resetFilters}
          </button>
        </div>
      )}
    </div>
  );
}
