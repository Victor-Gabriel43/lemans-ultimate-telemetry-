"use client";

import { useMemo, useState } from "react";
import type { Car, Generation } from "@/lib/f1/cars";
import { CarCard } from "./cards";

type GroupBy = "generation" | "constructor" | "season" | "regulation";

const GROUPS: { id: GroupBy; label: string }[] = [
  { id: "generation", label: "Technical generation" },
  { id: "constructor", label: "Constructor" },
  { id: "season", label: "Season" },
  { id: "regulation", label: "Regulation era" },
];

export function CarBrowser({ cars, generations }: { cars: Car[]; generations: { id: Generation; name: string; years: string; text: string }[] }) {
  const [group, setGroup] = useState<GroupBy>("generation");

  const sections = useMemo(() => {
    const byYear = [...cars].sort((a, b) => a.year - b.year);
    if (group === "generation") {
      return generations
        .map((g) => ({ key: g.id, title: g.name, sub: `${g.years} · ${g.text}`, items: byYear.filter((c) => c.generation === g.id) }))
        .filter((s) => s.items.length);
    }
    if (group === "constructor") {
      const names = [...new Set(byYear.map((c) => c.team))].sort();
      return names.map((n) => ({ key: n, title: n, sub: "", items: byYear.filter((c) => c.team === n) }));
    }
    if (group === "regulation") {
      const regs = [...new Set(byYear.map((c) => c.regulation))];
      return regs.map((r) => ({ key: r, title: r, sub: "", items: byYear.filter((c) => c.regulation === r) }));
    }
    const decades = [...new Set(byYear.map((c) => Math.floor(c.year / 10) * 10))];
    return decades.map((d) => ({ key: String(d), title: `${d}s`, sub: "", items: byYear.filter((c) => Math.floor(c.year / 10) * 10 === d) }));
  }, [cars, generations, group]);

  return (
    <div>
      <div className="tabs-list" role="tablist" aria-label="Organise cars by">
        {GROUPS.map((g) => (
          <button key={g.id} type="button" role="tab" className="tab" aria-selected={group === g.id} onClick={() => setGroup(g.id)}>
            {g.label}
          </button>
        ))}
      </div>

      <div className="tab-panel" key={group}>
        {sections.map((s) => (
          <section key={s.key} style={{ marginTop: 48 }} aria-label={s.title}>
            <div className="flex-row" style={{ alignItems: "baseline", gap: 14, marginBottom: 18 }}>
              <h3 className="title-2">{s.title}</h3>
              {s.sub && <p className="small muted">{s.sub}</p>}
              <span className="caption" style={{ marginLeft: "auto" }}>
                {s.items.length} {s.items.length === 1 ? "car" : "cars"}
              </span>
            </div>
            <div className="grid grid-3">
              {s.items.map((c) => (
                <CarCard key={c.slug} c={c} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
