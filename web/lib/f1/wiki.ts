/**
 * Wikipedia REST summaries — used for biographies, circuit history and
 * editorial imagery. Content is CC BY-SA; every render links back.
 */
import "server-only";

export type WikiSummary = {
  title: string;
  extract: string;
  url: string;
  image?: { src: string; width: number; height: number };
};

/** Accepts a full Wikipedia URL (as Jolpica returns) or a page title. */
export async function getWikiSummary(urlOrTitle: string | undefined): Promise<WikiSummary | null> {
  if (!urlOrTitle) return null;
  const title = decodeURIComponent(urlOrTitle.split("/wiki/").pop() ?? urlOrTitle);
  try {
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}?redirect=true`, {
      next: { revalidate: 86400 },
      headers: { "User-Agent": "MotorsportIntelligence/1.0" },
    });
    if (!res.ok) return null;
    const j = await res.json();
    if (j.type === "disambiguation") return null;
    // SVG originals (e.g. circuit maps) can't go through the image optimizer — use the PNG thumbnail.
    // Use Wikimedia's standard 1280px thumbnail (served straight to the browser, as Wikimedia
    // recommends) — never multi-MB originals, and never SVGs through the optimizer.
    const isSvg = (u?: string) => !!u && /\.svg($|\?)/i.test(u);
    let img: { source: string; width: number; height: number } | null = null;
    const o = j.originalimage, t = j.thumbnail;
    if (t?.source && /\/thumb\//.test(t.source) && o?.width > 1280) {
      const scale = 1280 / o.width;
      img = { source: t.source.replace(/\/\d+px-/, "/1280px-"), width: 1280, height: Math.round(o.height * scale) };
    } else if (o?.source && !isSvg(o.source)) img = o;
    else if (t?.source) img = t;
    return {
      title: j.title,
      extract: j.extract,
      url: j.content_urls?.desktop?.page ?? `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`,
      image: img ? { src: img.source, width: img.width, height: img.height } : undefined,
    };
  } catch {
    return null;
  }
}
