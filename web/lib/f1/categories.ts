import type { Section } from "./types";

export type Category = {
  slug: string;
  name: string;
  short: string;
  /** Distinct identity colour within the shared design system. */
  color: string;
  colorSoft: string;
  ladderStep: number; // 1 = entry level
  ageGuide: string;
  tagline: string;
  summary: string;
  sections: Section[];
  facts: { label: string; value: string }[];
  connection: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: "karting",
    name: "Karting",
    short: "Kart",
    color: "#f59e0b",
    colorSoft: "#fef3c7",
    ladderStep: 1,
    ageGuide: "From childhood",
    tagline: "Where almost every driver begins.",
    summary: "Small, light, direct and fiercely competitive: karting teaches racecraft before drivers ever sit in a car.",
    sections: [
      {
        heading: "Why karting matters",
        body: [
          "Karts have no suspension and minimal bodywork, so drivers learn to feel grip, manage momentum and race wheel-to-wheel at close quarters. Nearly every modern Formula One driver came through karting, many starting as young children.",
        ],
      },
      {
        heading: "How it is organised",
        body: [
          "Karting runs from local club races through national series to international championships organised under the FIA's karting commission (CIK-FIA), with classes divided by age and engine.",
        ],
      },
    ],
    facts: [
      { label: "Governing body", value: "FIA Karting (CIK-FIA)" },
      { label: "Starting age", value: "Varies by country, often under 10" },
      { label: "Chassis", value: "Tubular frame, no suspension" },
    ],
    connection: "Successful karters move into Formula 4, usually in their mid-teens.",
  },
  {
    slug: "formula-4",
    name: "Formula 4",
    short: "F4",
    color: "#10b981",
    colorSoft: "#d1fae5",
    ladderStep: 2,
    ageGuide: "Typically 15+",
    tagline: "The first step in single-seaters.",
    summary: "An affordable, FIA-certified entry level for drivers moving from karts into cars.",
    sections: [
      {
        heading: "The concept",
        body: [
          "The FIA introduced the Formula 4 concept in 2014 to create a clear, affordable entry point on the single-seater ladder. F4 is run as national and regional championships around the world, all using FIA-certified cars.",
        ],
      },
      {
        heading: "What drivers learn",
        body: ["Drivers learn the basics of car set-up, working with engineers, slick and wet tyres, and the fundamentals of aerodynamic grip."],
      },
    ],
    facts: [
      { label: "Introduced", value: "2014" },
      { label: "Format", value: "National and regional championships" },
      { label: "Cars", value: "FIA-certified, cost-controlled" },
    ],
    connection: "F4 champions typically move to Formula Regional or directly to FIA Formula 3.",
  },
  {
    slug: "f1-academy",
    name: "F1 Academy",
    short: "F1A",
    color: "#ec4899",
    colorSoft: "#fce7f3",
    ladderStep: 2,
    ageGuide: "Typically 16+",
    tagline: "Developing the next generation of female racers.",
    summary: "An all-female series created by Formula One to increase opportunity and representation in single-seater racing.",
    sections: [
      {
        heading: "Purpose",
        body: [
          "F1 Academy launched in 2023 to help young female drivers progress to higher categories, providing track time, coaching and visibility.",
          "From 2024, each Formula One team has supported a driver in the series, and races are held on Formula One weekends.",
        ],
      },
      {
        heading: "Cars",
        body: ["The series uses F4-level single-seaters, making it a development step between karting and higher formulae."],
      },
    ],
    facts: [
      { label: "First season", value: "2023" },
      { label: "Level", value: "F4-specification cars" },
      { label: "Support", value: "Every F1 team backs a driver" },
    ],
    connection: "Drivers aim to progress to Formula Regional and FIA Formula 3.",
  },
  {
    slug: "formula-regional",
    name: "Formula Regional",
    short: "FR",
    color: "#06b6d4",
    colorSoft: "#cffafe",
    ladderStep: 3,
    ageGuide: "Typically 16+",
    tagline: "The bridge between F4 and FIA Formula 3.",
    summary: "Regional F3-level championships that add power and aerodynamic complexity.",
    sections: [
      {
        heading: "Where it fits",
        body: [
          "Formula Regional championships sit between F4 and FIA Formula 3. They use more powerful cars with more downforce, preparing drivers for the international stage. Championships run in Europe and other regions around the world.",
        ],
      },
    ],
    facts: [
      { label: "Level", value: "Regional F3" },
      { label: "Format", value: "Regional championships" },
    ],
    connection: "Leading drivers progress to FIA Formula 3.",
  },
  {
    slug: "formula-3",
    name: "FIA Formula 3",
    short: "F3",
    color: "#64748b",
    colorSoft: "#e2e8f0",
    ladderStep: 4,
    ageGuide: "Typically 17+",
    tagline: "The international stage begins.",
    summary: "A single-make championship on Formula One weekends — the first time young drivers race in front of the paddock.",
    sections: [
      {
        heading: "Format",
        body: [
          "FIA Formula 3 was created in 2019, succeeding the GP3 Series. All teams use the same chassis and engine, so results reflect driver and team performance rather than budget.",
          "Weekends include a sprint race and a feature race, supporting Formula One events, mainly in Europe.",
        ],
      },
    ],
    facts: [
      { label: "First season", value: "2019 (successor to GP3)" },
      { label: "Cars", value: "Single-make Dallara chassis" },
      { label: "Races", value: "Sprint + feature race" },
    ],
    connection: "The top F3 drivers graduate to Formula 2.",
  },
  {
    slug: "formula-2",
    name: "FIA Formula 2",
    short: "F2",
    color: "#2563eb",
    colorSoft: "#dbeafe",
    ladderStep: 5,
    ageGuide: "Typically 18+",
    tagline: "The final step before Formula One.",
    summary: "The last rung on the ladder: powerful single-make cars, pit stops and tyre strategy on Formula One weekends.",
    sections: [
      {
        heading: "Format",
        body: [
          "Formula 2 took its current name in 2017, succeeding the GP2 Series (2005–2016). Teams run identical cars, and races include a mandatory pit stop in the feature race, introducing drivers to tyre strategy.",
          "Champions such as Charles Leclerc, George Russell and Oscar Piastri have moved directly to Formula One.",
        ],
      },
      {
        heading: "Super Licence",
        body: [
          "To race in Formula One, drivers need an FIA Super Licence. Points are awarded for results in qualifying championships, with Formula 2 offering the most. Drivers typically need 40 points accumulated over three seasons, alongside other requirements such as age and experience.",
        ],
      },
    ],
    facts: [
      { label: "Name since", value: "2017 (successor to GP2)" },
      { label: "Cars", value: "Single-make Dallara chassis" },
      { label: "Races", value: "Sprint + feature race with pit stop" },
    ],
    connection: "The final step before a Formula One seat.",
  },
];

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}
