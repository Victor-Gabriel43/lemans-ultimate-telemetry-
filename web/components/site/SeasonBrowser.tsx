"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { LayoutGrid, List, Search } from "lucide-react";
import type { Season } from "@/lib/f1/seasons";

const DECADES = [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];

/**
 * Season selector: decade filter (synced to ?decade=), champion search,
 * grid/table views and a direct year jump.
 */
export function SeasonBrowser({ seasons }: { seasons: Season[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const decadeParam = Number(params.get("decade"));
  const decade = DECADES.includes(decadeParam) ? decadeParam : null;
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "table">("grid");

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
      .filter((s) =>
        q
          ? `${s.year} ${s.champions?.driver ?? ""} ${s.champions?.driverTeam ?? ""} ${s.champions?.constructor ?? ""} ${s.headline ?? ""}`
              .toLowerCase()
              .includes(q)
          : true,
      );
  }, [seasons, decade, query]);

  const latest = seasons[seasons.length - 1].year;

  return (
    <div>
      <div className="flex-row space-between" style={{ gap: 16, alignItems: "center" }}>
        <div className="chip-row" role="group" aria-label="Filter by decade" style={{ flex: "1 1 420px" }}>
          <button type="button" className="chip" aria-pressed={decade === null} onClick={() => setDecade(null)}>
            All
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
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Champion, team or year" aria-label="Filter seasons" />
          </label>
          <select
            className="select"
            aria-label="Jump to a season"
            value=""
            onChange={(e) => e.target.value && router.push(`/seasons/${e.target.value}`)}
          >
            <option value="">Jump to…</option>
            {[...seasons].reverse().map((s) => (
              <option key={s.year} value={s.year}>
                {s.year}
              </option>
            ))}
          </select>
          <div className="tabs-list" role="group" aria-label="View">
            <button type="button" className="tab" aria-pressed={view === "grid"} aria-label="Grid view" onClick={() => setView("grid")} style={{ padding: "0 12px" }}>
              <LayoutGrid size={16} />
            </button>
            <button type="button" className="tab" aria-pressed={view === "table"} aria-label="Table view" onClick={() => setView("table")} style={{ padding: "0 12px" }}>
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      <p className="caption mt-s" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "season" : "seasons"}
        {decade ? ` in the ${decade}s` : ""}
        {query ? ` matching “${query}”` : ""}
      </p>

      {filtered.length === 0 && (
        <div className="pending mt-m">
          <p className="pending-title">No seasons match.</p>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setQuery(""); setDecade(null); }}>
            Clear filters
          </button>
        </div>
      )}

      {view === "grid" ? (
        <div className="year-grid mt-m">
          {filtered.map((s) => (
            <Link key={s.year} href={`/seasons/${s.year}`} className={`year-cell ${s.year === latest ? "is-current" : ""}`} title={s.headline}>
              <span className="year-cell-year">{s.year}</span>
              <span className="year-cell-champ">{s.champions?.driver.split(" ").slice(-1)[0] ?? "In progress"}</span>
            </Link>
          ))}
        </div>
      ) : (
        filtered.length > 0 && (
          <div className="table-wrap mt-m">
            <table className="dtable">
              <thead>
                <tr>
                  <th scope="col">Season</th>
                  <th scope="col">Drivers’ champion</th>
                  <th scope="col">Team</th>
                  <th scope="col">Constructors’ champion</th>
                  <th scope="col">Headline</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.year}>
                    <td className="num" style={{ fontWeight: 700 }}>
                      <Link href={`/seasons/${s.year}`}>{s.year}</Link>
                    </td>
                    <td>
                      {s.champions?.driverSlug ? <Link href={`/drivers/${s.champions.driverSlug}`}>{s.champions.driver}</Link> : s.champions?.driver ?? <span className="muted">—</span>}
                    </td>
                    <td className="muted">{s.champions?.driverTeam ?? "—"}</td>
                    <td>
                      {s.champions?.constructorSlug ? (
                        <Link href={`/teams/${s.champions.constructorSlug}`}>{s.champions.constructor}</Link>
                      ) : (
                        <span className="muted">{s.year < 1958 ? "Not awarded" : "—"}</span>
                      )}
                    </td>
                    <td className="muted small" style={{ minWidth: 260 }}>
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
