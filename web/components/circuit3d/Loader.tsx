"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { Setting } from "./env";

/** Three.js is only downloaded when the experience scrolls near the viewport. */
const Experience = dynamic(() => import("./Experience"), {
  ssr: false,
  loading: () => <Placeholder label="Loading 3D engine…" />,
});

function Placeholder({ label }: { label: string }) {
  return (
    <div className="flex h-[min(86svh,860px)] w-full flex-col items-center justify-center gap-3 rounded-[28px] bg-[#05070b] text-white">
      <span className="mi-dot" />
      <span className="mi-label text-white/60">{label}</span>
    </div>
  );
}

export function CircuitExperienceLoader(props: { id: string; name: string; setting: Setting; lengthM: number | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setShow(true), io.disconnect()), { rootMargin: "300px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref}>{show ? <Experience {...props} /> : <Placeholder label="3D circuit" />}</div>;
}
