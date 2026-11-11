"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { lp, type Lang } from "@/lib/i18n/config";
import { fmt, type Dict } from "@/lib/i18n/dict";

export type CarRow = { id: string; name: string; c: string; cName: string; years: number[]; wins: number; engines: { id: string; name: string }[]; gen: string; photo?: string };
export type GenOpt = { id: string; name: string; years: string; text: string };

type By = "season" | "constructor" | "generation" | "engine";
const PAGE = 60;

export function CarBrowser({ cars, gens, lang, t }: { cars: CarRow[]; gens: GenOpt[]; lang: Lang; t: Dict }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const C = t.cars;
  const by = (["season", "constructor", "generation", "engine"].includes(params.get("by") ?? "") ? params.get("by") : "season") as By;
  const v = params.get("v") ?? "";
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(PAGE);

  const years = useMemo(() => [...new Set(cars.flatMap((c) => c.years))].sort((a, b) => b - a), [cars]);
  const ctors = useMemo(() => [...new Map(cars.map((c) => [c.c, c.cName])).entries()].sort((a, b) => a[1].localeCompare(b[1])), [cars]);
  const engines = useMemo(() => [...new Map(cars.flatMap((c) => c.engines.map((e) => [e.id, e.name] as const))).entries()].sort((a, b) => a[1].localeCompare(b[1])), [cars]);

  const value = v || (by === "season" ? String(years[0]) : by === "generation" ? gens[gens.length - 1].id : "");
  const set = (nextBy: By, nextV = "") => {
    const sp = new URLSearchParams();
    sp.set("by", nextBy);
    if (nextV) sp.set("v", nextV);
    router.replace(`${pathname}?${sp}`, { scroll: false });
    setShown(PAGE);
  };

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return cars
      .filter((c) => {
        if (query && !`${c.name} ${c.cName}`.toLowerCase().includes(query)) return false;
        if (by === "season") return c.years.includes(Number(value));
        if (by === "constructor") return !value || c.c === value;
        if (by === "generation") return c.gen === value;
        return !value || c.engines.some((e) => e.id === value);
      })
      .sort((a, b) => (by === "constructor" || by === "engine" ? a.years[0] - b.years[0] : b.wins - a.wins || a.name.localeCompare(b.name)));
  }, [cars, by, value, q]);

  const tabs: [By, string][] = [
    ["season", C.bySeason],
    ["constructor", C.byConstructor],
    ["generation", C.byGeneration],
    ["engine", C.byEngine],
  ];

  return (
    <div>
      <div className="tabs-list" role="tablist" aria-label={C.browseBy}>
        {tabs.map(([id, label]) => (
          <button key={id} type="button" role="tab" className="tab" aria-selected={by === id} onClick={() => set(id)}>
            {label}
          </button>
        ))}
      </div>

      <div className="flex-row mt-m" style={{ gap: 10 }}>
        {by === "season" && (
          <select className="select" aria-label={C.chooseSeason} value={value} onChange={(e) => set("season", e.target.value)}>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        )}
        {by === "constructor" && (
          <select className="select" aria-label={C.chooseConstructor} value={value} onChange={(e) => set("constructor", e.target.value)} style={{ maxWidth: 280 }}>
            <option value="">{C.chooseConstructor}</option>
            {ctors.map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        )}
        {by === "engine" && (
          <select className="select" aria-label={C.chooseEngine} value={value} onChange={(e) => set("engine", e.target.value)} style={{ maxWidth: 280 }}>
            <option value="">{C.chooseEngine}</option>
            {engines.map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        )}
        {by === "generation" && (
          <div className="chip-row" role="group" aria-label={C.generations}>
            {gens.map((g) => (
              <button key={g.id} type="button" className="chip" aria-pressed={value === g.id} onClick={() => set("generation", g.id)}>
                {g.name} <span className="caption">{g.years}</span>
              </button>
            ))}
          </div>
        )}
        <label className="field" style={{ flex: "1 1 200px", maxWidth: 320 }}>
          <Search size={16} aria-hidden />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.common.searchPlaceholder} aria-label={t.common.searchPlaceholder} />
        </label>
      </div>
      {by === "generation" && <p className="small muted mt-xs">{gens.find((g) => g.id === value)?.text}</p>}

      <p className="caption mt-s" aria-live="polite">
        {fmt(C.modelCount, { n: list.length })}
      </p>

      {(by === "constructor" || by === "engine") && !value ? (
        <div className="pending mt-m">{by === "constructor" ? C.chooseConstructor : C.chooseEngine}</div>
      ) : (
        <div className="grid grid-4 keep-2 mt-m">
          {list.slice(0, shown).map((c) => (
            <Link key={c.id} href={lp(lang, `/cars/${c.id}`)} className="card">
              {c.photo && (
                <div className="plate plate-flat ratio-photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.photo} alt={c.name} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
              <div className="card-body">
                <p className="card-meta">
                  {c.cName} · {c.years.length > 1 ? `${c.years[0]}–${c.years[c.years.length - 1]}` : c.years[0]}
                </p>
                <p className="card-title">{c.name}</p>
                <p className="small muted">
                  {c.engines.map((e) => e.name).join(", ")}
                  {c.wins ? ` · ${fmt(C.winsWith, { n: c.wins })}` : ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
      {shown < list.length && (
        <div className="center mt-m">
          <button type="button" className="btn btn-ghost" onClick={() => setShown((s) => s + PAGE)}>
            {fmt(t.drivers.showMore, { n: Math.min(PAGE, list.length - shown) })}
          </button>
        </div>
      )}
    </div>
  );
}
