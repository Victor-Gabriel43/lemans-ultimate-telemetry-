"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Wordmark } from "./Brand";
import { usePathname } from "next/navigation";
import { NAV } from "./experiences";

/**
 * Floating capsule navigation. Hides on scroll-down, returns on scroll-up,
 * tightens once the hero is passed. Mobile opens a full-bleed index.
 */
export function SiteNav() {
  const [hidden, setHidden] = useState(false);
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setCompact(y > 40);
      setHidden(y > 320 && y > last + 2);
      if (y < last - 2) setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 flex justify-center px-4 transition-transform duration-700 ease-[var(--ease-out)] ${
          hidden && !open ? "-translate-y-[130%]" : "translate-y-0"
        } ${compact ? "pt-3" : "pt-5"}`}
      >
        <nav
          aria-label="Principal"
          className={`flex w-full items-center justify-between gap-6 rounded-full border text-text transition-all duration-700 ease-[var(--ease-out)] ${
            compact
              ? "max-w-[980px] border-white/10 bg-bg/85 py-2 pl-5 pr-2 backdrop-blur-xl backdrop-saturate-150"
              : "max-w-[1400px] border-transparent bg-transparent py-2 pl-1 pr-0"
          }`}
        >
          <Link href="/" aria-label="Motorsport Intelligence — início" className="shrink-0">
            <Wordmark />
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {NAV.map((x) => {
              const active = path.startsWith(x.href);
              return (
                <li key={x.href}>
                  <Link
                    href={x.href}
                    aria-current={active ? "page" : undefined}
                    className={`mi-link group flex items-baseline gap-1.5 text-[0.82rem] transition-colors hover:text-text ${active ? "text-text" : "text-text/75"}`}
                  >
                    <span className={`font-mono text-[0.6rem] transition-colors group-hover:text-brand ${active ? "text-brand" : "text-text-dim"}`}>{x.n}</span>
                    {x.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/#race-room"
              className="group hidden items-center gap-2 rounded-full bg-brand px-4 py-2 text-[0.8rem] font-semibold text-brand-fg sm:flex"
            >
              <span className="mi-roll">
                <span>Race Room</span>
                <span>Enter →</span>
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mi-menu"
              className="flex h-9 w-9 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-full border border-white/15 lg:hidden"
            >
              <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
              <span className={`h-px w-4 bg-current transition-transform duration-500 ${open ? "translate-y-[3px] rotate-45" : ""}`} />
              <span className={`h-px w-4 bg-current transition-transform duration-500 ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile index */}
      <div
        id="mi-menu"
        className={`fixed inset-0 z-40 flex flex-col justify-end bg-bg px-4 pb-10 pt-28 transition-[clip-path] duration-700 ease-[var(--ease-io)] lg:hidden ${
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
        aria-hidden={!open}
      >
        <ul className="flex flex-col">
          {NAV.map((x, i) => (
            <li key={x.href} className="border-t border-border">
              <Link
                href={x.href}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between py-4"
                style={{ transitionDelay: `${0.1 + i * 0.05}s` }}
              >
                <span className="mi-display text-[clamp(1.8rem,9vw,3rem)]">{x.label}</span>
                <span className="font-mono text-xs text-brand">{x.n}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/#race-room"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
          className="mt-6 flex items-center justify-between rounded-full bg-brand px-6 py-4 font-semibold text-brand-fg"
        >
          Race Room <span aria-hidden>→</span>
        </Link>
      </div>
    </>
  );
}
