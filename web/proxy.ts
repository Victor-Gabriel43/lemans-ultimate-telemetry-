import { NextResponse, type NextRequest } from "next/server";
import { NON_SITE_PREFIXES } from "@/lib/i18n/config";

/**
 * Locale routing.
 *  - `/pt/...` is redirected to the canonical unprefixed URL.
 *  - `/en/...` is served as-is.
 *  - everything else (the Portuguese default) is rewritten to `/pt/...`.
 *  - legacy `/technology/*` URLs are redirected to their new homes.
 */
const TECH_TO_REG: Record<string, string> = {
  "sporting-regulations": "/regulations/sporting",
  "technical-regulations": "/regulations/technical",
  safety: "/regulations/safety",
};

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (NON_SITE_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`)) || /\.[a-z0-9]{2,5}$/i.test(pathname)) {
    return NextResponse.next();
  }

  // Legacy section moved: /technology → /engineering or /regulations
  const legacy = pathname.match(/^(\/en)?\/technology(?:\/([^/]+))?\/?$/);
  if (legacy) {
    const prefix = legacy[1] ?? "";
    const slug = legacy[2];
    const target = !slug ? "/engineering" : (TECH_TO_REG[slug] ?? `/engineering/${slug}`);
    return NextResponse.redirect(new URL(`${prefix}${target}${search}`, request.url), 308);
  }

  if (pathname === "/pt" || pathname.startsWith("/pt/")) {
    const clean = pathname.replace(/^\/pt/, "") || "/";
    return NextResponse.redirect(new URL(`${clean}${search}`, request.url), 308);
  }
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return NextResponse.next();
  }
  const url = request.nextUrl.clone();
  url.pathname = `/pt${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
