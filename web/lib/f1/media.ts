/**
 * Media registry.
 *
 * Every photograph shown on the site must be registered here with its
 * source, author and licence. Pages reference images by id; when an id has
 * no registered asset, the <Plate> component renders a designed typographic
 * plate instead of an unverified photo.
 *
 * Why it is empty in Phase 1: we will not hotlink or ship images whose
 * licence, subject (correct car / team / driver / year) and attribution have
 * not been verified. Adding an image is a one-line change:
 *
 *   "car-lotus-49": {
 *     src: "/media/cars/lotus-49.jpg",          // file in web/public/media
 *     width: 2400, height: 1600,
 *     credit: "Photographer Name",
 *     license: "CC BY-SA 4.0",
 *     sourceUrl: "https://commons.wikimedia.org/wiki/File:…",
 *   },
 */

export type MediaAsset = {
  src: string;
  width: number;
  height: number;
  credit: string;
  license: string;
  sourceUrl: string;
};

export const MEDIA: Record<string, MediaAsset> = {};

export function getMedia(id?: string): MediaAsset | undefined {
  return id ? MEDIA[id] : undefined;
}
