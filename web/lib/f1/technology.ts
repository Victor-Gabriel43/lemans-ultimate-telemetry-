import type { Lang } from "@/lib/i18n/config";
import type { Milestone, Section, Tone } from "./types";
import type { BiTech, RegRef, TechGroup } from "./tech-types";
import { ENGINEERING_BI } from "./tech-engineering";
import { REGULATIONS_BI } from "./tech-regulations";

export type { RegRef, TechGroup } from "./tech-types";

/** A localised Engineering topic or Regulation explainer. */
export type TechArticle = {
  slug: string;
  title: string;
  group: TechGroup;
  tone: Tone;
  summary: string;
  simple: string;
  facts: { label: string; value: string }[];
  sections: Section[];
  concepts: { term: string; definition: string }[];
  history: Milestone[];
  related: string[];
  cars: string[];
  regs: RegRef[];
};

export const TECH_BI: BiTech[] = [...ENGINEERING_BI, ...REGULATIONS_BI];

export function localizeTech(t: BiTech, lang: Lang): TechArticle {
  return {
    slug: t.slug,
    group: t.group,
    tone: t.tone,
    title: t.title[lang],
    summary: t.summary[lang],
    simple: t.simple[lang],
    facts: t.facts.map((f) => ({ label: f.label[lang], value: f.value[lang] })),
    sections: t.sections.map((s) => ({ heading: s.heading[lang], body: s.body.map((b) => b[lang]) })),
    concepts: t.concepts.map((c) => ({ term: c.term[lang], definition: c.definition[lang] })),
    history: t.history.map((h) => ({ year: h.year, title: h.title[lang], text: h.text[lang] })),
    related: t.related,
    cars: t.cars,
    regs: t.regs,
  };
}

/** English versions (slugs, static params). */
export const TECH: TechArticle[] = TECH_BI.map((t) => localizeTech(t, "en"));
export const ENGINEERING = TECH.filter((t) => t.group === "engineering");
export const REG_EXPLAINERS = TECH.filter((t) => t.group === "regulations");

export function getTech(slug: string, group?: TechGroup) {
  return TECH.find((t) => t.slug === slug && (!group || t.group === group));
}
