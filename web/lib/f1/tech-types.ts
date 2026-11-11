import type { Tone } from "./types";

/** Bilingual text. */
export type Bi = { pt: string; en: string };

export type TechGroup = "engineering" | "regulations";

/** A reference to an article in an indexed FIA document (verified against the extracted 2026 texts). */
export type RegRef = { year: number; kind: "technical" | "sporting" | "financial" | "general" | "operational"; num: string };

/** Source form of an Engineering topic or Regulation explainer — both languages side by side. */
export type BiTech = {
  slug: string;
  group: TechGroup;
  tone: Tone;
  title: Bi;
  summary: Bi;
  /** "Explain it simply" — one short paragraph for beginners. */
  simple: Bi;
  /** Key numbers — only figures established in the regulations or the record books. */
  facts: { label: Bi; value: Bi }[];
  sections: { heading: Bi; body: Bi[] }[];
  concepts: { term: Bi; definition: Bi }[];
  history: { year: string; title: Bi; text: Bi }[];
  related: string[];
  /** F1DB chassis ids of cars that illustrate the topic. */
  cars: string[];
  regs: RegRef[];
};

export const T = (num: string): RegRef => ({ year: 2026, kind: "technical", num });
export const S = (num: string): RegRef => ({ year: 2026, kind: "sporting", num });
export const F = (num: string): RegRef => ({ year: 2026, kind: "financial", num });
