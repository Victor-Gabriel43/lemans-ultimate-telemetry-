/**
 * Locale configuration for Paddock.
 *
 * Portuguese (Brazil) is the default and lives at the root (`/drivers`);
 * English lives under `/en` (`/en/drivers`). The proxy maps root URLs to the
 * internal `/pt` tree, so `/pt` never appears in public links.
 */
export const LOCALES = ["pt", "en"] as const;
export type Lang = (typeof LOCALES)[number];
export const DEFAULT_LANG: Lang = "pt";

export const HTML_LANG: Record<Lang, string> = { pt: "pt-BR", en: "en" };
export const INTL_LOCALE: Record<Lang, string> = { pt: "pt-BR", en: "en-GB" };

export function isLang(x: string): x is Lang {
  return (LOCALES as readonly string[]).includes(x);
}

/** Public href for an internal path in a language. `lp("pt", "/drivers")` → `/drivers`. */
export function lp(lang: Lang, path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (lang === DEFAULT_LANG) return p;
  return p === "/" ? `/${lang}` : `/${lang}${p}`;
}

/** Strip the language prefix from a public pathname. */
export function stripLang(pathname: string): { lang: Lang; path: string } {
  const m = pathname.match(/^\/(en|pt)(\/.*)?$/);
  if (m) return { lang: m[1] as Lang, path: m[2] || "/" };
  return { lang: DEFAULT_LANG, path: pathname || "/" };
}

/** Paths served by the separate LMU Race Engineer app, never localised. */
export const NON_SITE_PREFIXES = ["/race-engineer", "/room", "/api", "/_next", "/media", "/favicon"];
