"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Sticky section sub-navigation, like Apple's product nav. */
export function LocalNav({ title, titleHref, links }: { title: string; titleHref: string; links: { label: string; href: string }[] }) {
  const pathname = usePathname();
  return (
    <nav className="lnav" aria-label={`${title} sections`}>
      <div className="wrap-wide lnav-inner">
        <Link href={titleHref} className="lnav-title">
          {title}
        </Link>
        <div className="lnav-links">
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={pathname === l.href ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
