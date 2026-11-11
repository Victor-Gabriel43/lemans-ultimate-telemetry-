"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { searchEntries, type SearchEntry, type SearchKind } from "@/lib/f1/search";

const KIND_ICON: Record<SearchKind, string> = {
  Era: "ERA",
  Season: "YR",
  Driver: "DRV",
  Team: "TM",
  Car: "CAR",
  Circuit: "TRK",
  Technology: "TEC",
  Category: "CAT",
  Lesson: "EDU",
  Page: "→",
};

const SUGGESTIONS = ["Senna", "Monaco", "ground effect", "1976", "Ferrari", "pit stops", "Formula 2"];

export function SearchOverlay({ index, onClose }: { index: SearchEntry[]; onClose: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => searchEntries(index, q, 30), [index, q]);

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
    router.push(href);
  };

  return (
    <div
      className="search-layer"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
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
            placeholder="Search drivers, seasons, cars, circuits…"
            aria-label="Search query"
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
                else if (q.trim()) go(`/search?q=${encodeURIComponent(q.trim())}`);
              } else if (e.key === "Escape") {
                onClose();
              }
            }}
          />
          <button type="button" className="icon-btn" aria-label="Close search" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="search-results" id="search-results" role="listbox" ref={listRef}>
          {!q.trim() && (
            <div style={{ padding: "12px 12px 18px" }}>
              <p className="kicker" style={{ marginBottom: 12 }}>
                Try searching for
              </p>
              <div className="flex-row" style={{ gap: 8 }}>
                {SUGGESTIONS.map((s) => (
                  <button key={s} type="button" className="chip" onClick={() => {
                      setQ(s);
                      setActive(0);
                    }}>
                    {s}
                  </button>
                ))}
              </div>
              <p className="caption" style={{ marginTop: 20 }}>
                Tip: press <span className="kbd">/</span> or <span className="kbd">⌘K</span> anywhere to search.
              </p>
            </div>
          )}

          {q.trim() && results.length === 0 && (
            <div style={{ padding: "28px 12px" }}>
              <p className="title-3">No results for “{q}”</p>
              <p className="muted small mt-xs">Try a driver&apos;s surname, a year such as 1988, or a topic like “tyres”.</p>
            </div>
          )}

          {results.map((r, i) => (
            <Link
              key={r.href + r.title}
              id={`sr-${i}`}
              data-idx={i}
              href={r.href}
              role="option"
              aria-selected={i === active}
              data-active={i === active}
              className="search-hit"
              onMouseEnter={() => setActive(i)}
              onClick={onClose}
            >
              <span className="search-hit-icon" aria-hidden>
                {KIND_ICON[r.kind]}
              </span>
              <span style={{ minWidth: 0, flex: 1 }}>
                <span className="search-hit-title" style={{ display: "block" }}>
                  {r.title}
                </span>
                <span className="search-hit-sub" style={{ display: "block" }}>
                  {r.kind} · {r.subtitle}
                </span>
              </span>
              {i === active && <ArrowRight size={16} color="var(--ink-3)" />}
            </Link>
          ))}

          {q.trim() && results.length > 0 && (
            <Link
              href={`/search?q=${encodeURIComponent(q.trim())}`}
              className="search-hit"
              onClick={onClose}
              style={{ color: "var(--red-ink)", fontSize: 14, fontWeight: 500 }}
            >
              See all results for “{q.trim()}”
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
