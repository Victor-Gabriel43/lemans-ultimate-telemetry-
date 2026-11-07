"use client";

import { useEffect, useState } from "react";
import { SystemPip } from "@/components/home/SystemPip";

/**
 * Barra fixa: wordmark, âncoras e o interruptor "1984" — devolve a página
 * inteira a um visual de computador antigo, monocromático e pixelado.
 */
export function TopBar() {
  const [retro, setRetro] = useState(false);

  useEffect(() => {
    let saved = false;
    try {
      saved = localStorage.getItem("raceops-1984") === "1";
    } catch {}
    if (saved) {
      document.documentElement.dataset.retro = "1";
      const t = setTimeout(() => setRetro(true), 0);
      return () => clearTimeout(t);
    }
  }, []);

  const toggle = () => {
    const next = !retro;
    setRetro(next);
    if (next) document.documentElement.dataset.retro = "1";
    else delete document.documentElement.dataset.retro;
    try {
      localStorage.setItem("raceops-1984", next ? "1" : "0");
    } catch {}
  };

  useEffect(() => () => void delete document.documentElement.dataset.retro, []);

  return (
    <header className="lx-topbar fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 px-5 py-4 sm:px-10">
      <a href="#top" className="font-display text-xl tracking-wide text-white">
        RACEOPS<span className="text-white/40">/001</span>
      </a>
      <nav className="hidden items-center gap-7 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-white/70 md:flex">
        <a href="#sistema" className="transition-colors hover:text-white">
          Sistema
        </a>
        <a href="#modulos" className="transition-colors hover:text-white">
          Módulos
        </a>
        <a href="#entrar" className="transition-colors hover:text-white">
          Entrar
        </a>
      </nav>
      <div className="flex items-center gap-4">
        <span className="hidden sm:block">
          <SystemPip />
        </span>
        <button
          type="button"
          onClick={toggle}
          aria-pressed={retro}
          className="lx-retro-toggle flex cursor-pointer items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/80"
          title="Modo 1984"
        >
          <span className={`lx-switch ${retro ? "is-on" : ""}`} aria-hidden>
            <span />
          </span>
          1984
        </button>
      </div>
    </header>
  );
}
