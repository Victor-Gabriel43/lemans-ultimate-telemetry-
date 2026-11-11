"use client";

import { useId, useRef, useState, type ReactNode } from "react";

export type TabItem = { id: string; label: string; content: ReactNode };

/** Accessible tabs (WAI-ARIA pattern) with arrow-key navigation. */
export function Tabs({ items, initial, label, align = "start" }: { items: TabItem[]; initial?: string; label: string; align?: "start" | "center" }) {
  const [current, setCurrent] = useState(initial ?? items[0]?.id);
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const move = (dir: number) => {
    const i = items.findIndex((t) => t.id === current);
    const next = (i + dir + items.length) % items.length;
    setCurrent(items[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: align === "center" ? "center" : "flex-start" }}>
        <div className="tabs-list" role="tablist" aria-label={label}>
          {items.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              id={`${base}-tab-${t.id}`}
              role="tab"
              type="button"
              className="tab"
              aria-selected={current === t.id}
              aria-controls={`${base}-panel-${t.id}`}
              tabIndex={current === t.id ? 0 : -1}
              onClick={() => setCurrent(t.id)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") move(1);
                if (e.key === "ArrowLeft") move(-1);
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      {items.map((t) =>
        t.id === current ? (
          <div
            key={t.id}
            id={`${base}-panel-${t.id}`}
            role="tabpanel"
            aria-labelledby={`${base}-tab-${t.id}`}
            className="tab-panel"
            style={{ marginTop: 32 }}
          >
            {t.content}
          </div>
        ) : null,
      )}
    </div>
  );
}
