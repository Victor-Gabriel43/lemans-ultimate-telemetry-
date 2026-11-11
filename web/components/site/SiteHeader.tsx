"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { NAV, type NavSection } from "@/lib/f1/nav";
import type { SearchEntry } from "@/lib/f1/search";
import { SearchOverlay } from "./SearchOverlay";

/**
 * Global navigation — Apple-style thin bar with full-width flyouts on
 * desktop (hover or keyboard) and a full-screen sheet on mobile.
 */
export function SiteHeader({ index }: { index: SearchEntry[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeAll = useCallback(() => {
    setOpen(null);
    setMobile(false);
  }, []);

  // Close menus on navigation.
  useEffect(() => {
    closeAll();
    setSearching(false);
  }, [pathname, closeAll]);

  // Keyboard: Esc closes; "/" or Cmd/Ctrl+K opens search.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
      const target = e.target as HTMLElement | null;
      const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setSearching(true);
        setOpen(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll under the mobile sheet.
  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  const enter = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(id);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 160);
  };

  const isCurrent = (s: NavSection) => pathname === s.href || pathname.startsWith(`${s.href}/`);
  const active = NAV.find((s) => s.id === open);

  return (
    <>
      <header className="gnav" onMouseLeave={leave}>
        <nav className="wrap-wide gnav-inner" aria-label="Main">
          <Link href="/" className="gnav-brand" aria-label="Paddock — home">
            <span className="gnav-brand-mark" aria-hidden />
            Paddock
          </Link>

          <ul className="gnav-links">
            {NAV.map((s) => (
              <li key={s.id} className="gnav-item" onMouseEnter={() => enter(s.id)}>
                <Link
                  href={s.href}
                  className="gnav-link"
                  aria-current={isCurrent(s) ? "page" : undefined}
                  aria-expanded={open === s.id}
                  aria-haspopup="true"
                  onFocus={() => enter(s.id)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setOpen(s.id);
                      requestAnimationFrame(() => {
                        document.querySelector<HTMLAnchorElement>(".flyout a")?.focus();
                      });
                    }
                  }}
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="gnav-actions">
            <button
              type="button"
              className="icon-btn"
              aria-label="Search the encyclopedia"
              onClick={() => {
                setSearching(true);
                closeAll();
              }}
            >
              <Search size={17} strokeWidth={1.8} />
            </button>
            <button
              type="button"
              className="icon-btn gnav-menu-btn"
              aria-label={mobile ? "Close menu" : "Open menu"}
              aria-expanded={mobile}
              onClick={() => setMobile((m) => !m)}
            >
              {mobile ? <X size={20} strokeWidth={1.8} /> : <Menu size={20} strokeWidth={1.8} />}
            </button>
          </div>
        </nav>

        {active && (
          <>
            <div
              className="flyout"
              onMouseEnter={() => enter(active.id)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(null);
              }}
            >
              <div className="wrap-wide flyout-inner">
                <div>
                  <p className="flyout-col-title">Explore {active.label}</p>
                  <ul className="flyout-primary">
                    {active.explore.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href}>{l.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                {active.columns.map((col, i) => (
                  <div key={i}>
                    <p className="flyout-col-title" aria-hidden={!col.title}>
                      {col.title || " "}
                    </p>
                    <ul className="flyout-secondary">
                      {col.links.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href}>{l.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="gnav-scrim" aria-hidden onMouseEnter={() => setOpen(null)} />
          </>
        )}
      </header>

      {mobile && (
        <div className="mnav" role="dialog" aria-modal="true" aria-label="Site menu">
          <button
            type="button"
            className="field"
            style={{ width: "100%", marginBottom: 20, cursor: "text" }}
            onClick={() => {
              setMobile(false);
              setSearching(true);
            }}
          >
            <Search size={16} />
            <span style={{ fontSize: 16 }}>Search drivers, seasons, circuits…</span>
          </button>
          <ul>
            {NAV.map((s) => {
              const expanded = mobileSection === s.id;
              return (
                <li key={s.id} style={{ borderBottom: "1px solid var(--line-soft)" }}>
                  <button
                    type="button"
                    className="mnav-link"
                    aria-expanded={expanded}
                    onClick={() => setMobileSection(expanded ? null : s.id)}
                  >
                    {s.label}
                    <ChevronDown
                      size={20}
                      style={{ transition: "transform .25s", transform: expanded ? "rotate(180deg)" : "none", color: "var(--ink-3)" }}
                    />
                  </button>
                  {expanded && (
                    <div className="mnav-sub">
                      {[...s.explore, ...s.columns.flatMap((c) => c.links)].map((l) => (
                        <Link key={l.href + l.label} href={l.href}>
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {searching && <SearchOverlay index={index} onClose={() => setSearching(false)} />}
    </>
  );
}
