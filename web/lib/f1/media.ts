import "server-only";
import fs from "node:fs";
import path from "node:path";

/**
 * Licensed photography registry.
 *
 * Built by scripts/media/resolve.py: each photograph is the lead image of the
 * subject's own Wikipedia article, hosted on Wikimedia Commons under a free
 * licence (CC0, public domain, CC BY, CC BY-SA), with author and source kept.
 * Subjects without a verified free image get a typographic plate instead.
 */
export type Photo = { src: string; width?: number; height?: number; credit: string; license: string; sourceUrl: string };
type Resolved = Record<string, { status: string } & Partial<Photo>>;

let cache: Resolved | null = null;
function registry(): Resolved {
  if (!cache) {
    const p = path.join(process.cwd(), "data", "media", "resolved.json");
    cache = fs.existsSync(p) ? (JSON.parse(fs.readFileSync(p, "utf8")) as Resolved) : {};
  }
  return cache;
}

export function photo(id: string): Photo | undefined {
  const r = registry()[id];
  if (!r || r.status !== "ok" || !r.src) return undefined;
  return { src: r.src.split("?")[0].replace("https://thumb.wikimedia.org/", "https://upload.wikimedia.org/"), width: r.width, height: r.height, credit: r.credit ?? "Wikimedia Commons", license: r.license ?? "", sourceUrl: r.sourceUrl ?? "" };
}
export const driverPhoto = (id: string) => photo(`driver-${id}`);
export const circuitPhoto = (id: string) => photo(`circuit-${id}`);
export const chassisPhoto = (id: string) => photo(`chassis-${id}`);

export function allPhotos() {
  return Object.entries(registry())
    .filter(([, r]) => r.status === "ok")
    .map(([id]) => ({ id, ...photo(id)! }));
}
