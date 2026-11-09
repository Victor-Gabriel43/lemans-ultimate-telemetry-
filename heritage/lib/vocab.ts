// Controlled vocabularies. Stored as plain strings in the database
// (portable across SQLite/Postgres) and validated against these lists.

export const VERIFICATION = {
  verified: { label: "Verified", hint: "Confirmed by an official or multiple independent sources." },
  reported: { label: "Reported", hint: "Published by a reputable source; not yet cross-checked against official records." },
  unverified: { label: "Unverified", hint: "Recorded for research. Not confirmed — treat with caution." },
} as const;
export type Verification = keyof typeof VERIFICATION;

export const LIVERY_KINDS: Record<string, string> = {
  launch: "Launch livery",
  season: "Factory season livery",
  special: "Special livery",
  anniversary: "Anniversary livery",
  tribute: "Historic tribute",
  "le-mans": "Le Mans livery",
  daytona: "Daytona livery",
  sebring: "Sebring livery",
  race: "Race-specific livery",
  customer: "Customer team livery",
  promotional: "Promotional livery",
  demonstration: "Demonstration livery",
  test: "Test / camouflage",
  "special-edition": "Special edition",
};

export const TIMELINE_CATEGORIES: Record<string, string> = {
  development: "Development", reveal: "Reveal", race: "Race", title: "Championship", livery: "Livery", business: "Programme", milestone: "Milestone",
};

export const ERAS: Record<string, string> = { modern: "Modern", historic: "Historic" };
export const TEAM_KINDS: Record<string, string> = { factory: "Factory", customer: "Customer" };
export const PHOTO_VIEWS = ["main", "front", "rear", "side", "top", "detail", "action"] as const;

export const COUNTRY: Record<string, string> = {
  DEU: "Germany", USA: "United States", GBR: "United Kingdom", FRA: "France", ITA: "Italy", JPN: "Japan", BEL: "Belgium",
  BRA: "Brazil", AUS: "Australia", DNK: "Denmark", PRT: "Portugal", CHN: "China", CHE: "Switzerland", NLD: "Netherlands",
  CHL: "Chile", QAT: "Qatar", BHR: "Bahrain", "DEU / USA": "Germany / United States",
};
export const country = (c: string) => COUNTRY[c] ?? c;
