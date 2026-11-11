/**
 * The four core experiences. Each carries its own personality token
 * (`tone`) so future sections can diverge visually while sharing one brand.
 */
export type Experience = {
  id: string;
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
    n: "04",
    short: "Drivers",
    title: "Driver",
    serif: "Intelligence",
    body: "Style, rhythm and consistency of the people in the seat — the human signal inside the machine.",
    tone: "steel",
    tags: ["Profiles", "Rhythm", "Consistency"],
  },
];
