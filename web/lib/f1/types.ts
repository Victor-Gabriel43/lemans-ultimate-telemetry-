/**
 * Shared types for the Paddock F1 encyclopedia content layer.
 *
 * Content is authored editorially in `lib/f1/*`. Anything that is a precise,
 * record-level statistic (race-by-race results, calendars, lap records…) is
 * intentionally NOT authored here — it arrives in Phase 2 from verified
 * sources. Fields that will be filled then are typed as optional.
 */

export type Tone =
  | "red"
  | "graphite"
  | "night"
  | "silver"
  | "blue"
  | "green"
  | "gold"
  | "orange"
  | "teal"
  | "purple"
  | "papaya"
  | "navy";

export type EraId = "1950s" | "1960s" | "1970s" | "1980s" | "1990s" | "2000s" | "2010s" | "2020s";

export type Milestone = { year: string; title: string; text: string };

export type Section = { heading: string; body: string[] };

/** How confident we are in a piece of information, surfaced in the UI. */
export type DataStatus = "editorial" | "pending";

export type MediaRef = {
  /** Key into the media registry (lib/f1/media.ts). */
  id?: string;
  alt: string;
};
