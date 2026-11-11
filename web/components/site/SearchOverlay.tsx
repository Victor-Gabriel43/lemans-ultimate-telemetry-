"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { lp, type Lang } from "@/lib/i18n/config";
import { fmt, type Dict } from "@/lib/i18n/dict";

export type SearchResult = { kind: string; title: string; subtitle: string; href: string };

const ICON: Record<string, string> = {
  Driver: "DRV",
  Team: "TM",
  Car: "CAR",
  Circuit: "TRK",
  Season: "YR",
  Race: "GP",
  Era: "ERA",
  Engineering: "ENG",
  Regulation: "REG",
  Article: "ART",
  Category: "CAT",
  Lesson: "EDU",
  Page: "→",
};

const SUGGESTIONS = { pt: ["Senna", "Mônaco", "efeito solo", "1976", "Ferrari", "Safety Car", "C4.6"], en: ["Senna", "Monaco", "ground effect", "1976", "Ferrari", "Safety Car", "C4.6"] };

/** Hook: debounced fetch against the global search API. */
export function useSearch(lang: Lang, q: string, limit = 30, kind?: string) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const query = q.trim();
    if (!query) return;
    const ctrl = new AbortController();
    const id = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?lang=${lang}&limit=${limit}&q=${encodeURIComponent(query)}${kind ? `&kind=${kind}` : ""}`, { signal: ctrl.signal });
        const j = await res.json();
        setResults(j.results ?? []);
      } catch {
        /* aborted */
      } finally {
        setLoading(false);
      }
    }, 140);
    return () => {
      clearTimeout(id);
      ctrl.abort();
    };
  }, [lang, q, limit, kind]);
  return { results: q.trim() ? results : [], loading };
}

export function SearchOverlay({ lang, t, onClose }: { lang: Lang; t: Dict["search"]; onClose: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { results, loading } = useSearch(lang, q, 24);

  useEffect(() => {
    inputRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const go = (href: string) => {
    onClose();
    router.push(lp(lang, href));
  };
  const all = `/search?q=${encodeURIComponent(q.trim())}`;

  return (
    <div className="search-layer" role="dialog" aria-modal="true" aria-label={t.title} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="search-panel">
        <div className="search-field">
          <Search size={20} color="var(--ink-3)" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            placeholder={t.placeholder}
            aria-label={t.title}
            aria-controls="search-results"
            aria-activedescendant={results[active] ? `sr-${active}` : undefined}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === "Enter") {
                if (results[active]) go(results[active].href);
                else if (q.trim()) go(all);
              } else if (e.key === "Escape") onClose();
            }}
          />
          <button type="button" className="icon-btn" aria-label="Close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="search-results" id="search-results" role="listbox" ref={listRef}>
          {!q.trim() && (
            <div style={{ padding: "12px 12px 18px" }}>
              <p className="kicker" style={{ marginBottom: 12 }}>
                {t.tryFor}
              </p>
              <div className="flex-row" style={{ gap: 8 }}>
                {SUGGESTIONS[lang].map((s) => (
                  <button key={s} type="button" className="chip" onClick={() => setQ(s)}>
                    {s}
                  </button>
                ))}
              </div>
              <p className="caption" style={{ marginTop: 20 }}>
                {fmt(t.tip, { k1: "/", k2: "⌘K" })}
              </p>
            </div>
          )}
          {q.trim() && !loading && results.length === 0 && (
            <div style={{ padding: "28px 12px" }}>
              <p className="title-3">{fmt(t.noResults, { q })}</p>
              <p className="muted small mt-xs">{t.noResultsHint}</p>
            </div>
          )}
          {results.map((r, i) => (
            <Link
              key={r.href + r.title}
              id={`sr-${i}`}
              data-idx={i}
              href={lp(lang, r.href)}
              role="option"
              aria-selected={i === active}
              data-active={i === active}
              className="search-hit"
              onMouseEnter={() => setActive(i)}
              onClick={onClose}
            >
              <span className="search-hit-icon" aria-hidden>
                {ICON[r.kind] ?? "·"}
              </span>
              <span style={{ minWidth: 0, flex: 1 }}>
                <span className="search-hit-title" style={{ display: "block" }}>
                  {r.title}
                </span>
                <span className="search-hit-sub" style={{ display: "block" }}>
                  {(t.kinds as Record<string, string>)[r.kind] ?? r.kind} · {r.subtitle}
                </span>
              </span>
              {i === active && <ArrowRight size={16} color="var(--ink-3)" />}
            </Link>
          ))}
          {q.trim() && results.length > 0 && (
            <Link href={lp(lang, all)} className="search-hit" onClick={onClose} style={{ color: "var(--red-ink)", fontSize: 14, fontWeight: 500 }}>
              {fmt(t.seeAll, { q: q.trim() })}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
