"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Credit, type PhotoData } from "./Photo";

/** Contact-sheet grid of photographs with a zoomable, pannable viewer. */
export default function Gallery({ items, columns = 3 }: { items: PhotoData[]; columns?: 2 | 3 | 4 }) {
  const [open, setOpen] = useState<number | null>(null);
  const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <>
      <ul className={`grid gap-x-4 gap-y-8 ${cols}`}>
        {items.map((p, i) => (
          <li key={p.id} className="min-w-0">
            <button onClick={() => setOpen(i)} className="group block w-full cursor-zoom-in text-left" aria-label={`Open photograph: ${p.alt}`}>
              <div className="relative aspect-[3/2] overflow-hidden bg-pit">
                <Image src={p.url} unoptimized={p.url.startsWith("http")} alt={p.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" style={{ objectPosition: p.focal }} />
              </div>
            </button>
            <p className="mt-2 font-serif text-[15px] leading-snug">{p.caption || p.alt}</p>
            <Credit p={p} className="mt-1" />
          </li>
        ))}
      </ul>
      {open !== null ? <Viewer items={items} index={open} onIndex={setOpen} onClose={() => setOpen(null)} /> : null}
    </>
  );
}

function Viewer({ items, index, onIndex, onClose }: { items: PhotoData[]; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number } | null>(null);
  const p = items[index];
  const reset = () => { setZoom(1); setPan({ x: 0, y: 0 }); };
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
    <div role="dialog" aria-modal="true" aria-label="Photograph viewer" className="fixed inset-0 z-50 flex flex-col bg-black">
      <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
        <span className="text-fog tabular-nums">{index + 1} of {items.length}</span>
        <div className="flex items-center gap-2">
          <button className="rounded-full border rule px-3 py-1 hover:border-fog" onClick={() => setZoom((z) => Math.max(1, z - 0.5))} aria-label="Zoom out">−</button>
          <span className="w-12 text-center tabular-nums">{Math.round(zoom * 100)}%</span>
          <button className="rounded-full border rule px-3 py-1 hover:border-fog" onClick={() => setZoom((z) => Math.min(5, z + 0.5))} aria-label="Zoom in">+</button>
          <button className="ml-3 rounded-full bg-chalk px-4 py-1 text-black" onClick={onClose}>Close</button>
        </div>
      </div>
      <div
        className={`relative flex-1 overflow-hidden ${zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`}
        onWheel={(e) => setZoom((z) => Math.min(5, Math.max(1, z - e.deltaY * 0.002)))}
        onDoubleClick={() => (zoom > 1 ? reset() : setZoom(2.5))}
        onPointerDown={(e) => { drag.current = { x: e.clientX - pan.x, y: e.clientY - pan.y }; }}
        onPointerMove={(e) => { if (drag.current && zoom > 1) setPan({ x: e.clientX - drag.current.x, y: e.clientY - drag.current.y }); }}
        onPointerUp={() => { drag.current = null; }}
        onPointerLeave={() => { drag.current = null; }}
      >
        <div className="absolute inset-0 select-none" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}>
          <Image src={p.url} unoptimized={p.url.startsWith("http")} alt={p.alt} fill sizes="100vw" quality={90} draggable={false} className="object-contain" />
        </div>
        <button onClick={() => go(-1)} aria-label="Previous photograph" className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-black/70 px-4 py-3 text-lg hover:bg-black">‹</button>
        <button onClick={() => go(1)} aria-label="Next photograph" className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-black/70 px-4 py-3 text-lg hover:bg-black">›</button>
      </div>
      <div className="mx-auto max-w-3xl px-4 py-4 text-center">
        <p className="font-serif">{p.caption || p.alt}</p>
        <Credit p={p} className="mt-1" />
        <p className="mt-1 text-[12px] text-fog">Scroll or double-click to zoom, drag to move, arrow keys to browse.</p>
      </div>
    </div>
  );
}
