"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { lp, stripLang, type Lang } from "@/lib/i18n/config";

/** Sticky section sub-navigation. Hrefs are internal paths or in-page anchors. */
export function LocalNav({ title, titleHref, links, lang }: { title: string; titleHref: string; links: { label: string; href: string }[]; lang: Lang }) {
  const { path } = stripLang(usePathname());
  const href = (h: string) => (h.startsWith("#") ? h : lp(lang, h));
  return (
    <nav className="lnav" aria-label={title}>
      <div className="wrap-wide lnav-inner">
        <Link href={href(titleHref)} className="lnav-title">
          {title}
        </Link>
        <div className="lnav-links">
          {links.map((l) => (
            <Link key={l.href} href={href(l.href)} aria-current={path === l.href ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
