"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { searchEntries, type SearchEntry, type SearchKind } from "@/lib/f1/search";

const KINDS: SearchKind[] = ["Driver", "Team", "Season", "Era", "Car", "Circuit", "Technology", "Category", "Lesson", "Page"];

export function SearchPage({ index }: { index: SearchEntry[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const initial = params.get("q") ?? "";
  const [q, setQ] = useState(initial);
  const [kind, setKind] = useState<SearchKind | "all">("all");

  const results = useMemo(() => searchEntries(index, q, 500), [index, q]);
  const counts = useMemo(() => {
    const m = new Map<SearchKind, number>();
    results.forEach((r) => m.set(r.kind, (m.get(r.kind) ?? 0) + 1));
    return m;
  }, [results]);
  const shown = kind === "all" ? results : results.filter((r) => r.kind === kind);

  const update = (value: string) => {
    setQ(value);
    const sp = new URLSearchParams();
    if (value.trim()) sp.set("q", value.trim());
    router.replace(`${pathname}${sp.toString() ? `?${sp}` : ""}`, { scroll: false });
  };

  return (
    <div>
      <label className="field" style={{ minHeight: 60, borderRadius: 16 }}>
        <Search size={20} aria-hidden />
        <input autoFocus value={q} onChange={(e) => update(e.target.value)} placeholder="Search the encyclopedia" aria-label="Search the encyclopedia" style={{ fontSize: 21 }} />
      </label>

      {q.trim() && (
        <div className="chip-row mt-s" role="group" aria-label="Filter results by type">
          <button type="button" className="chip" aria-pressed={kind === "all"} onClick={() => setKind("all")}>
            All · {results.length}
          </button>
          {KINDS.filter((k) => counts.get(k)).map((k) => (
            <button key={k} type="button" className="chip" aria-pressed={kind === k} onClick={() => setKind(k)}>
              {k} · {counts.get(k)}
            </button>
          ))}
        </div>
      )}

      <div className="mt-m" aria-live="polite">
        {!q.trim() && <p className="muted">Type a driver, team, year, circuit or topic.</p>}
        {q.trim() && shown.length === 0 && (
          <div className="pending">
            <p className="pending-title">No results for “{q}”.</p>
            <p>Try a surname (“Clark”), a year (“1976”) or a topic (“tyres”).</p>
          </div>
        )}
        <ul style={{ display: "grid", gap: 8 }}>
          {shown.map((r) => (
            <li key={r.href + r.title}>
              <Link href={r.href} className="card" style={{ flexDirection: "row", alignItems: "center", gap: 16, padding: "14px 18px" }}>
                <span className="badge" style={{ minWidth: 86, justifyContent: "center" }}>
                  {r.kind}
                </span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: "block", fontWeight: 600 }}>{r.title}</span>
                  <span className="small muted" style={{ display: "block" }}>
                    {r.subtitle}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
