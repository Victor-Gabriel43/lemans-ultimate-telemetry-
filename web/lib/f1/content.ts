/**
 * Localised editorial content accessors.
 *
 * English editorial lives in the original modules (eras, drivers, teams,
 * cars, circuits, technology); Portuguese text lives in `./pt/*`. These
 * helpers merge the two so that pages never mix languages.
 */
import type { Lang } from "@/lib/i18n/config";
import { ERAS, type Era } from "./eras";
import { DRIVERS } from "./drivers";
import { TEAMS } from "./teams";
import { CARS } from "./cars";
import { CIRCUITS } from "./circuits";
import { TECH, type TechArticle, type TechGroup } from "./technology";
import { HEADLINES, POINTS_SYSTEMS } from "./seasons";
import { ERAS_PT } from "./pt/eras";
import { DRIVERS_PT } from "./pt/drivers";
import { TEAMS_PT } from "./pt/teams";
import { CARS_PT } from "./pt/cars";
import { CIRCUITS_PT } from "./pt/circuits";
import { TECH_PT } from "./pt/technology";
import { HEADLINES_PT } from "./pt/seasons";

/* ------------------------------------------------------------------- eras */
export function eras(lang: Lang): Era[] {
  return ERAS.map((e) => (lang === "pt" ? { ...e, ...ERAS_PT[e.id] } : e));
}
export function era(slug: string, lang: Lang) {
  return eras(lang).find((e) => e.slug === slug);
}
export function eraForYear(year: number, lang: Lang) {
  return eras(lang).find((e) => year >= e.start && year <= e.end) ?? eras(lang)[eras(lang).length - 1];
}

/* ------------------------------------------------------------------ drivers */
export type DriverEditorial = { knownFor: string; summary: string; bio: string[]; timeline: { year: string; title: string; text: string }[]; tone: string };
export function driverEditorial(id: string, lang: Lang): DriverEditorial | undefined {
  const d = DRIVERS.find((x) => x.slug === id);
  if (!d) return undefined;
  const base = { knownFor: d.knownFor, summary: d.summary, bio: d.bio, timeline: d.timeline, tone: d.tone };
  return lang === "pt" && DRIVERS_PT[id] ? { ...base, ...DRIVERS_PT[id] } : base;
}
export const editorialDriverIds = () => DRIVERS.map((d) => d.slug);

/* -------------------------------------------------------------------- teams */
/** Editorial team texts also describe other F1DB constructor ids in the same lineage. */
const TEAM_ALIASES: Record<string, string> = {
  alpine: "renault",
  sauber: "audi",
  "kick-sauber": "audi",
  "bmw-sauber": "audi",
  minardi: "racing-bulls",
  "toro-rosso": "racing-bulls",
  alphatauri: "racing-bulls",
  rb: "racing-bulls",
  "racing-point": "aston-martin",
  "force-india": "aston-martin",
};
export type TeamEditorial = {
  slug: string;
  name: string;
  summary: string;
  history: string[];
  identity: string;
  timeline: { year: string; title: string; text: string }[];
  base: string;
  founders?: string;
  color: string;
  tone: string;
  isAlias: boolean;
};
export function teamEditorial(id: string, lang: Lang): TeamEditorial | undefined {
  const key = TEAMS.some((t) => t.slug === id) ? id : TEAM_ALIASES[id];
  const t = TEAMS.find((x) => x.slug === key);
  if (!t) return undefined;
  const base: TeamEditorial = {
    slug: t.slug,
    name: t.name,
    summary: t.summary,
    history: t.history,
    identity: t.identity,
    timeline: t.timeline,
    base: t.base,
    founders: t.founders,
    color: t.color,
    tone: t.tone,
    isAlias: key !== id,
  };
  if (lang === "pt" && TEAMS_PT[t.slug]) {
    const p = TEAMS_PT[t.slug];
    return { ...base, summary: p.summary, history: p.history, identity: p.identity, timeline: p.timeline, base: p.base ?? base.base, founders: p.founders ?? base.founders };
  }
  return base;
}
export const teamColor = (id: string) => teamEditorial(id, "en")?.color;

/* --------------------------------------------------------------------- cars */
const CAR_FAMILY: Record<string, string> = { "alfa-romeo-159": "alfa-romeo-158" };
export type CarEditorial = {
  slug: string;
  name: string;
  headline: string;
  intro: string;
  context: string[];
  design: string[];
  innovations: string[];
  engine: string;
  regulation: string;
  designer?: string;
  generation: string;
  tone: string;
  year: number;
};
export function carEditorial(chassisId: string, lang: Lang): CarEditorial | undefined {
  const key = CARS.some((c) => c.slug === chassisId) ? chassisId : CAR_FAMILY[chassisId];
  const c = CARS.find((x) => x.slug === key);
  if (!c) return undefined;
  const base: CarEditorial = {
    slug: c.slug,
    name: c.name,
    headline: c.headline,
    intro: c.intro,
    context: c.context,
    design: c.design,
    innovations: c.innovations,
    engine: c.engine,
    regulation: c.regulation,
    designer: c.designer,
    generation: c.generation,
    tone: c.tone,
    year: c.year,
  };
  return lang === "pt" && CARS_PT[c.slug] ? { ...base, ...CARS_PT[c.slug], name: CARS_PT[c.slug].name ?? base.name } : base;
}
export const landmarkCarIds = () => CARS.map((c) => c.slug);
export { GENERATIONS } from "./cars";

/* ----------------------------------------------------------------- circuits */
export type CircuitEditorial = {
  summary: string;
  history: string[];
  characteristics: string[];
  events: { year: string; title: string; text: string }[];
  evolution: string[];
  landmarks: string[];
  tone: string;
  region: string;
};
export function circuitEditorial(id: string, lang: Lang): CircuitEditorial | undefined {
  const c = CIRCUITS.find((x) => x.slug === id);
  if (!c) return undefined;
  const base = { summary: c.summary, history: c.history, characteristics: c.characteristics, events: c.events, evolution: c.evolution, landmarks: c.landmarks, tone: c.tone, region: c.region };
  return lang === "pt" && CIRCUITS_PT[id] ? { ...base, ...CIRCUITS_PT[id] } : base;
}

/* --------------------------------------------------------------- technology */
export function techArticles(lang: Lang, group?: TechGroup): TechArticle[] {
  return TECH.filter((t) => !group || t.group === group).map((t) => (lang === "pt" && TECH_PT[t.slug] ? { ...t, ...TECH_PT[t.slug] } : t));
}
export function techArticle(slug: string, group: TechGroup, lang: Lang) {
  return techArticles(lang, group).find((t) => t.slug === slug);
}

/* ------------------------------------------------------------------ seasons */
export function seasonHeadline(year: number, lang: Lang) {
  return lang === "pt" ? HEADLINES_PT[year] : HEADLINES[year];
}
export function pointsFor(year: number) {
  return POINTS_SYSTEMS.find((p) => year >= p.from && year <= p.to);
}
const POINTS_NOTES_PT: Record<string, string> = {
  "One additional point for the fastest lap.": "Um ponto extra pela volta mais rápida.",
  "Only a driver's best results counted toward the championship.": "Só os melhores resultados de cada piloto contavam para o campeonato.",
  "Shared drives split the points.": "Carros compartilhados dividiam os pontos.",
  "Points extended to sixth place; no fastest-lap point.": "Pontos estendidos até o sexto lugar; sem ponto pela volta mais rápida.",
  "Only a driver's best results counted.": "Só os melhores resultados de cada piloto contavam.",
  "A win worth nine points.": "A vitória passa a valer nove pontos.",
  "Dropped-score rules applied in many seasons, so a driver's best results counted.": "Em muitas temporadas valia o descarte: contavam só os melhores resultados.",
  "A win worth ten points; all results count from 1991.": "A vitória passa a valer dez pontos; todos os resultados contam a partir de 1991.",
  "Points extended to eighth place, narrowing the gap between first and second.": "Pontos estendidos até o oitavo lugar, reduzindo a diferença entre primeiro e segundo.",
  "Points extended to tenth place.": "Pontos estendidos até o décimo lugar.",
  "2019–2024: one point for the fastest lap if the driver finished in the top ten.": "2019–2024: um ponto pela volta mais rápida se o piloto terminasse entre os dez primeiros.",
  "From 2021: sprint races award additional points (top eight from 2022).": "A partir de 2021: as sprints valem pontos extras (oito primeiros a partir de 2022).",
};
export function pointsNotes(year: number, lang: Lang) {
  const p = pointsFor(year);
  if (!p) return [];
  return lang === "pt" ? p.notes.map((n) => POINTS_NOTES_PT[n] ?? n) : p.notes;
}
