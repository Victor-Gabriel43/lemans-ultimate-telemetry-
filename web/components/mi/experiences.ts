/**
 * The four core experiences. Each carries its own personality token
 * (`tone`) so future sections can diverge visually while sharing one brand.
 */
export type Experience = {
  id: string;
  href: string;
  n: string;
  short: string;
  title: string;
  serif: string;
  body: string;
  tone: "lime" | "paper" | "ember" | "steel";
  tags: string[];
};

export const EXPERIENCES: Experience[] = [
  {
    id: "racing-intelligence",
    href: "/racing",
    n: "01",
    short: "Racing",
    title: "Racing",
    serif: "Intelligence",
    body: "Strategy, stints and pit windows read like a story — the decisions behind every lap, distilled to what matters right now.",
    tone: "lime",
    tags: ["Strategy", "Stints", "Pit windows"],
  },
  {
    id: "circuit-explorer",
    href: "/circuits",
    n: "02",
    short: "Circuits",
    title: "Circuit",
    serif: "Explorer",
    body: "Every corner, kerb and braking zone as a living map. Fly the lap, study the sectors, understand the place.",
    tone: "paper",
    tags: ["Sectors", "Corners", "Elevation"],
  },
  {
    id: "cinematic-editorial",
    href: "/editorial",
    n: "03",
    short: "Editorial",
    title: "Cinematic",
    serif: "Editorial",
    body: "Long-form stories told at night, in the rain, at 330 km/h. Photography first, words that earn their place.",
    tone: "ember",
    tags: ["Stories", "Photography", "Night stints"],
  },
  {
    id: "driver-intelligence",
    href: "/drivers",
    n: "04",
    short: "Drivers",
    title: "Driver",
    serif: "Intelligence",
    body: "Style, rhythm and consistency of the people in the seat — the human signal inside the machine.",
    tone: "steel",
    tags: ["Profiles", "Rhythm", "Consistency"],
  },
];

/** Primary navigation: the four experiences + the season calendar. */
export const NAV = [
  ...EXPERIENCES.map((x) => ({ href: x.href, n: x.n, label: x.short })),
  { href: "/calendar", n: "05", label: "Calendar" },
];
