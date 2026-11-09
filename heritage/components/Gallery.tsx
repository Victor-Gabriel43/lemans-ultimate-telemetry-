"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import LiveryArt from "./LiveryArt";
import type { LiveryDesign } from "@/lib/format";

export type GalleryItem =
  | { kind: "photo"; id: string; url: string; alt: string; caption?: string; credit?: string; view?: string }
  | { kind: "art"; id: string; design: LiveryDesign; number?: string; title: string; caption?: string };

/** Grid of photographs/illustrations with a zoomable, pannable lightbox. */
export default function Gallery({ items, columns = 3 }: { items: GalleryItem[]; columns?: 2 | 3 | 4 }) {
  const [open, setOpen] = useState<number | null>(null);
  const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <>
      <ul className={`grid gap-3 ${cols}`}>
        {items.map((it, i) => (
          <li key={it.id} className="min-w-0">
            <button onClick={() => setOpen(i)} className="group block w-full overflow-hidden rounded-sm border hairline bg-carbon text-left transition-colors hover:border-mute">
              <div className="flex aspect-[16/9] items-center justify-center overflow-hidden bg-gradient-to-b from-graphite to-carbon">
                {it.kind === "photo" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={it.url} alt={it.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <LiveryArt design={it.design} number={it.number} caption={false} title={it.title} className="w-[92%] transition-transform duration-700 group-hover:scale-105" />
                )}
              </div>
              <div className="flex items-baseline justify-between gap-3 px-3 py-2.5">
                <span className="min-w-0 truncate text-sm">{it.kind === "photo" ? it.alt : it.title}</span>
                <span className="shrink-0 font-mono text-[10px] text-mute uppercase">{it.kind === "photo" ? it.view ?? "photo" : "illustration"}</span>
              </div>
            </button>
          </li>
        ))}
      </ul>
      {open !== null ? <Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(null)} /> : null}
    </>
  );
}

function Lightbox({ items, index, onIndex, onClose }: { items: GalleryItem[]; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number } | null>(null);
  const it = items[index];

  const go = useCallback((d: number) => { onIndex((index + d + items.length) % items.length); setZoom(1); setPan({ x: 0, y: 0 }); }, [index, items.length, onIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(5, z + 0.5));
      if (e.key === "-") setZoom((z) => Math.max(1, z - 0.5));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [go, onClose]);

  return (
    <div role="dialog" aria-modal="true" aria-label="Image viewer" className="fixed inset-0 z-50 flex flex-col bg-black/95">
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <p className="eyebrow">{index + 1} / {items.length}</p>
        <div className="flex items-center gap-2 font-mono text-xs">
          <button className="rounded border hairline px-3 py-1 hover:border-mute" onClick={() => setZoom((z) => Math.max(1, z - 0.5))} aria-label="Zoom out">−</button>
          <span className="w-12 text-center tabular-nums">{Math.round(zoom * 100)}%</span>
          <button className="rounded border hairline px-3 py-1 hover:border-mute" onClick={() => setZoom((z) => Math.min(5, z + 0.5))} aria-label="Zoom in">+</button>
          <button className="ml-4 rounded border hairline px-3 py-1 hover:border-mute" onClick={onClose} aria-label="Close viewer">Close ✕</button>
        </div>
      </div>
      <div
        className={`relative flex flex-1 items-center justify-center overflow-hidden ${zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`}
        onWheel={(e) => setZoom((z) => Math.min(5, Math.max(1, z - e.deltaY * 0.002)))}
        onDoubleClick={() => { setZoom((z) => (z > 1 ? 1 : 2.5)); setPan({ x: 0, y: 0 }); }}
        onPointerDown={(e) => { drag.current = { x: e.clientX - pan.x, y: e.clientY - pan.y }; (e.target as HTMLElement).setPointerCapture?.(e.pointerId); }}
        onPointerMove={(e) => { if (drag.current && zoom > 1) setPan({ x: e.clientX - drag.current.x, y: e.clientY - drag.current.y }); }}
        onPointerUp={() => { drag.current = null; }}
      >
        <div style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }} className="w-[min(1400px,94vw)] transition-transform duration-100 select-none">
          {it.kind === "photo" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={it.url} alt={it.alt} draggable={false} className="mx-auto max-h-[78vh] w-auto" />
          ) : (
            <LiveryArt design={it.design} number={it.number} title={it.title} />
          )}
        </div>
        <button onClick={() => go(-1)} aria-label="Previous" className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full border hairline bg-ink/70 px-4 py-3 hover:border-mute">←</button>
        <button onClick={() => go(1)} aria-label="Next" className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full border hairline bg-ink/70 px-4 py-3 hover:border-mute">→</button>
      </div>
      <div className="px-4 py-4 text-center">
        <p className="text-sm">{it.kind === "photo" ? it.caption || it.alt : it.title}</p>
        <p className="mt-1 font-mono text-[11px] text-mute">
          {it.kind === "photo" ? (it.credit ? `© ${it.credit}` : "Credit pending") : it.caption ?? "Archival illustration — colours approximate, not a photograph"}
          {" · "}scroll or double-click to zoom, drag to pan, ← → to navigate
        </p>
      </div>
    </div>
  );
}
