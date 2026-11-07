"use client";

import { useEffect, useRef, useSyncExternalStore, type RefObject } from "react";

/**
 * Progresso de rolagem de uma seção "pinada" (altura > viewport, conteúdo
 * sticky dentro). 0 = topo da seção encostou no topo da tela; 1 = fim da
 * seção encostou no fim da tela.
 *
 * Não re-renderiza o React a cada frame: escreve `--p` (cru) e `--ps`
 * (suavizado por lerp, o "smooth scroll" estilo Amber, sem sequestrar a
 * rolagem nativa) direto no style do elemento. Quem precisa do valor em JS
 * (canvas, troca de capítulo) passa `onFrame`.
 */
export function useScrollProgress<T extends HTMLElement>(
  onFrame?: (p: number, smooth: number) => void
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const cb = useRef(onFrame);

  useEffect(() => {
    cb.current = onFrame;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let smooth = -1;

    const tick = () => {
      const rect = el.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const raw = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
      smooth = smooth < 0 || reduced ? raw : smooth + (raw - smooth) * 0.12;
      if (Math.abs(raw - smooth) < 0.0005) smooth = raw;
      el.style.setProperty("--p", raw.toFixed(4));
      el.style.setProperty("--ps", smooth.toFixed(4));
      cb.current?.(raw, smooth);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return ref;
}

function subscribeReduced(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}
