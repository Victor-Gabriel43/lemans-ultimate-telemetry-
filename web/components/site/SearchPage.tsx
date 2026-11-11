"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { lp, type Lang } from "@/lib/i18n/config";
import { fmt, type Dict } from "@/lib/i18n/dict";
import { useSearch } from "./SearchOverlay";

const KINDS = ["Driver", "Team", "Car", "Circuit", "Season", "Race", "Era", "Engineering", "Regulation", "Article", "Category", "Lesson", "Page"];

export function SearchPage({ lang, t }: { lang: Lang; t: Dict }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [kind, setKind] = useState<string>("");
  const { results, loading } = useSearch(lang, q, 200, kind || undefined);
  const S = t.search;

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
        <input autoFocus value={q} onChange={(e) => update(e.target.value)} placeholder={S.placeholder} aria-label={S.title} style={{ fontSize: 21 }} />
      </label>
      <div className="chip-row mt-s" role="group" aria-label={S.filterByType}>
        <button type="button" className="chip" aria-pressed={kind === ""} onClick={() => setKind("")}>
          {t.common.all}
        </button>
        {KINDS.map((k) => (
          <button key={k} type="button" className="chip" aria-pressed={kind === k} onClick={() => setKind(k)}>
            {(S.kinds as Record<string, string>)[k]}
          </button>
        ))}
      </div>
      <div className="mt-m" aria-live="polite">
        {!q.trim() && <p className="muted">{S.placeholder}</p>}
        {q.trim() && loading && results.length === 0 && <p className="muted">{S.loading}</p>}
        {q.trim() && !loading && results.length === 0 && (
          <div className="pending">
            <p className="pending-title">{fmt(S.noResults, { q })}</p>
            <p>{S.noResultsHint}</p>
          </div>
        )}
        <ul style={{ display: "grid", gap: 8 }}>
          {results.map((r) => (
            <li key={r.href + r.title}>
              <Link href={lp(lang, r.href)} className="card" style={{ flexDirection: "row", alignItems: "center", gap: 16, padding: "14px 18px" }}>
                <span className="badge" style={{ minWidth: 100, justifyContent: "center" }}>
                  {(S.kinds as Record<string, string>)[r.kind] ?? r.kind}
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
