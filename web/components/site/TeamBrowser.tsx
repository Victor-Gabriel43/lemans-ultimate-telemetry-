"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { lp, type Lang } from "@/lib/i18n/config";
import { fmt, type Dict } from "@/lib/i18n/dict";

export type TeamRow = { id: string; name: string; country: string; from: number; to: number; active: boolean; titles: number; wins: number; entries: number; color?: string; summary?: string; lineage: string; logo?: string };

const FILTERS = ["all", "active", "historic", "champions"] as const;
type Filter = (typeof FILTERS)[number];

export function TeamBrowser({ teams, lang, t }: { teams: TeamRow[]; lang: Lang; t: Dict }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const T = t.teams;
  const filter = (FILTERS.find((f) => f === params.get("filter")) ?? "all") as Filter;
  const [q, setQ] = useState("");
  const [decade, setDecade] = useState<number | "all">("all");
  const [sort, setSort] = useState<"wins" | "titles" | "first" | "name">("wins");

  const setFilter = (id: Filter) => {
    const sp = new URLSearchParams(params.toString());
    if (id === "all") sp.delete("filter");
    else sp.set("filter", id);
    router.replace(`${pathname}${sp.toString() ? `?${sp}` : ""}`, { scroll: false });
  };

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return teams
      .filter(
        (c) =>
          (filter === "active" ? c.active : filter === "historic" ? !c.active : filter === "champions" ? c.titles > 0 : true) &&
          (decade === "all" || (c.from <= decade + 9 && c.to >= decade)) &&
          (!query || `${c.name} ${c.country} ${c.lineage}`.toLowerCase().includes(query)),
      )
      .sort((a, b) =>
        sort === "wins" ? b.wins - a.wins || b.entries - a.entries : sort === "titles" ? b.titles - a.titles || b.wins - a.wins : sort === "first" ? a.from - b.from : a.name.localeCompare(b.name),
      );
  }, [teams, filter, q, sort, decade]);

  const labels: Record<Filter, string> = { all: T.filterAll, active: T.filterActive, historic: T.filterHistoric, champions: T.filterChampions };

  return (
    <div>
      <div className="flex-row space-between" style={{ gap: 12 }}>
        <div className="chip-row" role="group" aria-label={t.common.filter}>
          {FILTERS.map((f) => (
            <button key={f} type="button" className="chip" aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {labels[f]}
            </button>
          ))}
        </div>
        <div className="flex-row" style={{ gap: 10 }}>
          <label className="field" style={{ width: 220 }}>
            <Search size={16} aria-hidden />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={T.searchPlaceholder} aria-label={T.searchLabel} />
          </label>
          <select className="select" aria-label={t.common.decade} value={decade} onChange={(e) => setDecade(e.target.value === "all" ? "all" : Number(e.target.value))}>
            <option value="all">{t.common.allDecades}</option>
            {[1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020].map((d) => (
              <option key={d} value={d}>
                {d}s
              </option>
            ))}
          </select>
          <select className="select" aria-label={t.common.sortBy} value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}>
            <option value="wins">{T.sortWins}</option>
            <option value="titles">{T.sortTitles}</option>
            <option value="first">{T.sortFirst}</option>
            <option value="name">{T.sortName}</option>
          </select>
        </div>
      </div>
      <p className="caption mt-s" aria-live="polite">
        {fmt(t.common.showing, { n: list.length, total: teams.length })}
      </p>
      {list.length ? (
        <div className="grid grid-3 mt-m">
          {list.map((c) => (
            <Link key={c.id} href={lp(lang, `/teams/${c.id}`)} className="card">
              <div style={{ height: 6, background: c.color ?? "var(--line)" }} aria-hidden />
              <div className="team-logo-box">
                {c.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.logo} alt={`${c.name} logo`} loading="lazy" decoding="async" />
                ) : (
                  <span className="team-logo-fallback" style={{ color: c.color ?? "var(--ink)" }}>
                    {c.name}
                  </span>
                )}
              </div>
              <div className="card-body" style={{ paddingTop: 20 }}>
                <p className="card-meta">
                  {c.country} · {c.from}–{c.active ? t.common.present : c.to}
                </p>
                <p className="card-title">{c.name}</p>
                <p className="small muted pretty">
                  {c.summary ?? `${c.entries} ${t.common.entries.toLowerCase()} · ${c.wins} ${t.common.wins.toLowerCase()}`}
                </p>
                <div className="flex-row" style={{ marginTop: "auto", paddingTop: 12, gap: 8 }}>
                  {c.titles > 0 && <span className="badge badge-red">{fmt(T.constructorTitles, { n: c.titles })}</span>}
                  <span className="badge">{c.active ? T.onGrid : t.common.historic}</span>
                </div>
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
              setDecade("all");
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
