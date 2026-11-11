"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { LayoutGrid, List, Search } from "lucide-react";
import { lp, type Lang } from "@/lib/i18n/config";
import { fmt, type Dict } from "@/lib/i18n/dict";

export type SeasonRow = {
  year: number;
  status: "completed" | "in-progress";
  champion?: { id: string; name: string; last: string };
  team?: string;
  constructor?: { id: string; name: string };
  leader?: { id: string; name: string; last: string };
  rounds: number;
  completed: number;
  headline?: string;
};

const DECADES = [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];

/** Season selector: decade filter (?decade=), search, grid/table views and a year jump. */
export function SeasonBrowser({ seasons, lang, t }: { seasons: SeasonRow[]; lang: Lang; t: Dict }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const decadeParam = Number(params.get("decade"));
  const decade = DECADES.includes(decadeParam) ? decadeParam : null;
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "table">("grid");
  const S = t.seasons;

  const setDecade = (d: number | null) => {
    const sp = new URLSearchParams(params.toString());
    if (d) sp.set("decade", String(d));
    else sp.delete("decade");
    router.replace(`${pathname}${sp.toString() ? `?${sp}` : ""}`, { scroll: false });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return seasons
      .filter((s) => (decade ? s.year >= decade && s.year < decade + 10 : true))
      .filter((s) => (q ? `${s.year} ${s.champion?.name ?? ""} ${s.team ?? ""} ${s.constructor?.name ?? ""} ${s.headline ?? ""}`.toLowerCase().includes(q) : true));
  }, [seasons, decade, query]);

  return (
    <div>
      <div className="flex-row space-between" style={{ gap: 16 }}>
        <div className="chip-row" role="group" aria-label={S.filterDecade} style={{ flex: "1 1 420px" }}>
          <button type="button" className="chip" aria-pressed={decade === null} onClick={() => setDecade(null)}>
            {t.common.all}
          </button>
          {DECADES.map((d) => (
            <button key={d} type="button" className="chip" aria-pressed={decade === d} onClick={() => setDecade(d)}>
              {d}s
            </button>
          ))}
        </div>
        <div className="flex-row" style={{ gap: 8 }}>
          <label className="field" style={{ width: 240 }}>
            <Search size={16} aria-hidden />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={S.filterPlaceholder} aria-label={S.filterPlaceholder} />
          </label>
          <select className="select" aria-label={S.jumpTo} value="" onChange={(e) => e.target.value && router.push(lp(lang, `/seasons/${e.target.value}`))}>
            <option value="">{S.jumpTo}</option>
            {[...seasons].reverse().map((s) => (
              <option key={s.year} value={s.year}>
                {s.year}
              </option>
            ))}
          </select>
          <div className="tabs-list" role="group" aria-label="View">
            <button type="button" className="tab" aria-pressed={view === "grid"} aria-label={S.gridView} onClick={() => setView("grid")} style={{ padding: "0 12px" }}>
              <LayoutGrid size={16} />
            </button>
            <button type="button" className="tab" aria-pressed={view === "table"} aria-label={S.tableView} onClick={() => setView("table")} style={{ padding: "0 12px" }}>
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      <p className="caption mt-s" aria-live="polite">
        {fmt(S.count, { n: filtered.length })}
        {decade ? fmt(S.inDecade, { d: `${decade}s` }) : ""}
        {query ? fmt(S.matching, { q: query }) : ""}
      </p>

      {filtered.length === 0 && (
        <div className="pending mt-m">
          <p className="pending-title">{S.noneMatch}</p>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => {
              setQuery("");
              setDecade(null);
            }}
          >
            {t.common.resetFilters}
          </button>
        </div>
      )}

      {view === "grid" ? (
        <div className="year-grid mt-m">
          {filtered.map((s) => (
            <Link key={s.year} href={lp(lang, `/seasons/${s.year}`)} className={`year-cell ${s.status === "in-progress" ? "is-current" : ""}`} title={s.headline}>
              <span className="year-cell-year">{s.year}</span>
              <span className="year-cell-champ">{s.champion?.last ?? (s.leader ? `${S.inProgress} · ${s.leader.last}` : S.inProgress)}</span>
            </Link>
          ))}
        </div>
      ) : (
        filtered.length > 0 && (
          <div className="table-wrap mt-m">
            <table className="dtable">
              <thead>
                <tr>
                  <th scope="col">{t.common.season}</th>
                  <th scope="col">{S.champion}</th>
                  <th scope="col">{t.common.team}</th>
                  <th scope="col">{S.constructorChampion}</th>
                  <th scope="col" className="r">
                    {t.common.rounds}
                  </th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.year}>
                    <td className="num" style={{ fontWeight: 700 }}>
                      <Link href={lp(lang, `/seasons/${s.year}`)}>{s.year}</Link>
                    </td>
                    <td>
                      {s.champion ? (
                        <Link href={lp(lang, `/drivers/${s.champion.id}`)}>{s.champion.name}</Link>
                      ) : s.leader ? (
                        <span>
                          <span className="badge status-warn">{S.leaderProvisional}</span> <Link href={lp(lang, `/drivers/${s.leader.id}`)}>{s.leader.name}</Link>
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="muted">{s.team ?? "—"}</td>
                    <td>{s.constructor ? <Link href={lp(lang, `/teams/${s.constructor.id}`)}>{s.constructor.name}</Link> : <span className="muted">{s.year < 1958 ? S.notAwarded : "—"}</span>}</td>
                    <td className="r num">{s.status === "completed" ? s.rounds : `${s.completed}/${s.rounds}`}</td>
                    <td className="muted small" style={{ minWidth: 240 }}>
                      {s.headline ?? ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
}
