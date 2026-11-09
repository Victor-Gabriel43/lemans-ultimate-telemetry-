const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function formatDate(d: Date | string | null | undefined, precision: string = "day") {
  if (!d) return "—";
  const date = typeof d === "string" ? new Date(d) : d;
  const y = date.getUTCFullYear();
  if (precision === "year") return String(y);
  const m = MONTHS[date.getUTCMonth()];
  if (precision === "month") return `${m} ${y}`;
  return `${date.getUTCDate()} ${m} ${y}`;
}

export const splitList = (s: string) => s.split(",").map((x) => x.trim()).filter(Boolean);

export type LiveryDesign = { base: string; accents: string[]; pattern: string; note?: string };
export function parseDesign(json: string): LiveryDesign {
  try {
    const d = JSON.parse(json);
    return { base: d.base ?? "#3a3a3a", accents: Array.isArray(d.accents) ? d.accents : [], pattern: d.pattern ?? "neutral", note: d.note };
  } catch {
    return { base: "#3a3a3a", accents: [], pattern: "neutral" };
  }
}

export function ordinalPosition(p: string) {
  if (!/^\d+$/.test(p)) return p;
  const n = Number(p);
  const s = n % 100 >= 11 && n % 100 <= 13 ? "th" : ({ 1: "st", 2: "nd", 3: "rd" } as Record<number, string>)[n % 10] ?? "th";
  return `${n}${s}`;
}

/** Short label for a result in lists: "1st Rolex 24 at Daytona", "Pole, 24 Hours of Le Mans", or its headline. */
export function resultLabel(r: { position: string; headline: string; event: { name: string } }) {
  if (/^\d+$/.test(r.position)) return `${ordinalPosition(r.position)} ${r.event.name}`;
  if (r.position === "Pole") return `Pole, ${r.event.name}`;
  return r.headline || r.event.name;
}
