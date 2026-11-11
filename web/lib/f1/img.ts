/** Wikimedia Commons thumbnail at a standard width (keeps non-Commons URLs unchanged). */
export function sized(src: string, width: 330 | 500 | 960 | 1280) {
  return /\/thumb\/.+\/\d+px-[^/]+$/.test(src) ? src.replace(/\/\d+px-([^/]+)$/, `/${width}px-$1`) : src;
}
