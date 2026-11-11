import type { Section } from "./types";

export type Level = "Beginner" | "Intermediate" | "Advanced";

export const LEVELS: { id: Level; description: string }[] = [
  { id: "Beginner", description: "No knowledge needed. Start here to understand the basics." },
  { id: "Intermediate", description: "For viewers who know the basics and want to understand the strategy." },
  { id: "Advanced", description: "Engineering and regulation — how performance is really created." },
];

export type Lesson = {
  slug: string;
  title: string;
  level: Level;
  minutes: number;
  summary: string;
  keyIdea: string;
  sections: Section[];
  takeaways: string[];
  related: { label: string; href: string }[];
};

export const LESSONS: Lesson[] = [
  {
    slug: "what-is-formula-1",
    title: "What is Formula One?",
    level: "Beginner",
    minutes: 4,
    summary: "The world's leading single-seater championship, in a few minutes.",
    keyIdea: "Formula One is two championships at once: one for drivers, one for teams that design and build their own cars.",
    sections: [
      {
        heading: "The 'formula'",
        body: [
          "The word 'formula' refers to the set of rules that every car must follow. Formula One is the highest class of single-seater racing governed by the FIA, motorsport's international federation.",
        ],
      },
      {
        heading: "Teams build their own cars",
        body: [
          "Unlike many series in which everyone uses the same car, each Formula One team — called a constructor — designs and builds its own chassis. Engineering is as important as driving.",
        ],
      },
      {
        heading: "A world tour",
        body: ["A season visits circuits across several continents, from permanent racetracks to city streets, each event called a Grand Prix."],
      },
    ],
    takeaways: ["Formula One means 'the top-level set of rules'", "Teams are constructors", "Two championships: drivers and constructors"],
    related: [
      { label: "History of Formula One", href: "/history" },
      { label: "How a race weekend works", href: "/race-weekend" },
    ],
  },
  {
    slug: "how-championships-work",
    title: "How championships work",
    level: "Beginner",
    minutes: 4,
    summary: "Two titles, decided by points over a whole season.",
    keyIdea: "Consistency across a season matters as much as winning individual races.",
    sections: [
      {
        heading: "Drivers' championship",
        body: [
          "Every driver scores points according to their finishing position in each race (and in sprints). The driver with the most points at the end of the season is world champion. Ties are broken by the number of wins, then second places, and so on.",
        ],
      },
      {
        heading: "Constructors' championship",
        body: [
          "Each team adds together the points scored by both of its drivers. The constructors' championship, first awarded in 1958, also determines how prize money is distributed between teams.",
        ],
      },
    ],
    takeaways: ["Points accumulate across the season", "Team points = both drivers' points combined", "Constructors' position affects prize money"],
    related: [
      { label: "How points are awarded", href: "/learn/how-points-work" },
      { label: "Browse every season", href: "/seasons" },
    ],
  },
  {
    slug: "how-points-work",
    title: "How points are awarded",
    level: "Beginner",
    minutes: 3,
    summary: "From 25 points for a win down to one point for tenth.",
    keyIdea: "Since 2010, points go to the top ten: 25, 18, 15, 12, 10, 8, 6, 4, 2, 1.",
    sections: [
      {
        heading: "The modern scale",
        body: [
          "A Grand Prix win is worth 25 points, second place 18 and third 15, descending to one point for tenth. Sprints award points to the top eight, from eight points for the winner to one point for eighth.",
          "From 2019 to 2024, one extra point was available for the fastest lap if the driver finished in the top ten.",
        ],
      },
      {
        heading: "It has changed many times",
        body: [
          "In 1950 only the top five scored, with a win worth eight points. The scale has been widened several times so that more drivers and teams score. Each season page in this encyclopedia shows the system used that year.",
        ],
      },
    ],
    takeaways: ["Top ten score in a Grand Prix", "Top eight score in a sprint", "Systems have changed over history"],
    related: [{ label: "Seasons archive", href: "/seasons" }],
  },
  {
    slug: "reading-a-race",
    title: "How to follow a race",
    level: "Beginner",
    minutes: 5,
    summary: "Gaps, tyres, pit stops and flags — what to watch on screen.",
    keyIdea: "The running order is only part of the story; tyre age and pit stops still to come matter just as much.",
    sections: [
      {
        heading: "The timing tower",
        body: ["The list on the side of the TV picture shows the running order and the gap to the car ahead or to the leader. Watch whether gaps are growing or shrinking."],
      },
      {
        heading: "Tyres and stops",
        body: [
          "A car leading on old tyres may be about to stop and lose places. A car further back on fresh tyres may be faster. Graphics show each car's compound and tyre age.",
        ],
      },
      {
        heading: "Flags and neutralisations",
        body: ["Yellow flags, the Safety Car and the Virtual Safety Car change the race — often creating cheaper pit-stop opportunities."],
      },
    ],
    takeaways: ["Watch the gaps", "Know who still needs to stop", "Neutralisations change strategy"],
    related: [{ label: "Race weekends", href: "/race-weekend" }],
  },
  {
    slug: "how-qualifying-works",
    title: "How qualifying works",
    level: "Intermediate",
    minutes: 5,
    summary: "The knockout session that sets the grid, and why it matters so much.",
    keyIdea: "Track position is valuable because overtaking is difficult — so a single perfect lap can decide a race.",
    sections: [
      {
        heading: "Three knockout rounds",
        body: [
          "In Q1 all drivers run and the slowest are eliminated. Q2 repeats the process with the remaining drivers. The fastest ten contest Q3 for pole position.",
        ],
      },
      {
        heading: "Track evolution and timing",
        body: [
          "As more rubber is laid down, the track gets faster, so drivers often aim to set their best lap at the end of a session. Finding clear track space without being blocked — or blocking others — is an art in itself.",
        ],
      },
      {
        heading: "Low fuel, fresh tyres",
        body: ["Cars run with minimal fuel and new soft tyres to extract maximum performance for one lap."],
      },
    ],
    takeaways: ["Three knockout phases", "Track gets faster through the session", "Grid position matters most where overtaking is hard"],
    related: [{ label: "Weekend format", href: "/race-weekend" }],
  },
  {
    slug: "how-pit-stops-work",
    title: "How pit stops work",
    level: "Intermediate",
    minutes: 4,
    summary: "Twenty people, four wheels, about two seconds.",
    keyIdea: "The stationary time is short; the real cost of a stop is the time lost driving through the pit lane.",
    sections: [
      {
        heading: "The crew",
        body: [
          "Each wheel has a gun operator, a person removing the old wheel and one fitting the new one. Jack operators lift the car at the front and rear. Lights or a signal release the driver when every wheel is secure.",
        ],
      },
      {
        heading: "The pit-loss",
        body: [
          "Because of the pit-lane speed limit, a stop costs around 20 seconds of total race time at many circuits — different at every track. Strategists calculate where the car will rejoin, ideally in clean air rather than behind slower cars.",
        ],
      },
    ],
    takeaways: ["Crews practise thousands of stops", "Pit-loss varies by circuit", "Where you rejoin matters"],
    related: [{ label: "Strategy", href: "/learn/tyres-and-strategy" }],
  },
  {
    slug: "tyres-and-strategy",
    title: "How tyres affect strategy",
    level: "Intermediate",
    minutes: 6,
    summary: "Soft, medium, hard — and the undercut.",
    keyIdea: "Strategy is a trade-off between the speed of fresh tyres and the time lost making a pit stop.",
    sections: [
      {
        heading: "Compounds",
        body: [
          "Softer compounds are faster but degrade sooner. In a dry race each car must use at least two different compounds, so every driver makes at least one stop.",
        ],
      },
      {
        heading: "The undercut",
        body: [
          "If a driver stops first, the speed of fresh tyres over the next lap or two may allow them to emerge ahead when the rival stops. This is the undercut.",
        ],
      },
      {
        heading: "The overcut",
        body: [
          "Sometimes staying out longer is better — if the rival rejoins in traffic or the new tyres take time to warm up.",
        ],
      },
    ],
    takeaways: ["Speed vs longevity", "Undercut and overcut", "Neutralisations open strategic windows"],
    related: [{ label: "Tyres in depth", href: "/technology/tyres" }],
  },
  {
    slug: "overtaking",
    title: "Why overtaking is difficult",
    level: "Intermediate",
    minutes: 4,
    summary: "Dirty air, braking zones and the tools that help.",
    keyIdea: "A following car loses downforce in the turbulent wake of the car ahead.",
    sections: [
      {
        heading: "Dirty air",
        body: ["The car ahead disturbs the airflow. In corners, the following car loses grip and its tyres overheat."],
      },
      {
        heading: "Help to overtake",
        body: [
          "From 2011 to 2025, the Drag Reduction System (DRS) let a car within one second of the car ahead at a detection point open its rear-wing flap on designated straights. From 2026, active aerodynamics and extra electrical deployment take its place.",
        ],
      },
    ],
    takeaways: ["Turbulence costs grip", "Overtaking aids have evolved", "Slipstreaming helps on straights"],
    related: [{ label: "Aerodynamics", href: "/technology/aerodynamics" }],
  },
  {
    slug: "how-aerodynamics-work",
    title: "How aerodynamics work",
    level: "Advanced",
    minutes: 7,
    summary: "Downforce, drag, floors and the aerodynamic platform.",
    keyIdea: "Downforce adds grip without adding mass, but costs drag — the whole car is shaped around that compromise.",
    sections: [
      {
        heading: "Pressure difference",
        body: [
          "Wings and floors create downforce by producing lower pressure beneath a surface than above it. Accelerating air under the car's floor creates a powerful suction effect — ground effect.",
        ],
      },
      {
        heading: "Platform sensitivity",
        body: [
          "Floors are very sensitive to ride height and pitch. Suspension design is therefore largely aerodynamic: keeping the floor at the right distance from the track. Instability can cause porpoising — a violent bouncing at speed.",
        ],
      },
      {
        heading: "Efficiency",
        body: ["The best cars do not simply make the most downforce; they make it with the least drag and keep it consistent across speeds, corners and ride heights."],
      },
    ],
    takeaways: ["Downforce vs drag", "The floor is the most important surface", "Consistency beats peak numbers"],
    related: [{ label: "Aerodynamics article", href: "/technology/aerodynamics" }],
  },
  {
    slug: "how-teams-develop-cars",
    title: "How teams develop cars",
    level: "Advanced",
    minutes: 6,
    summary: "Wind tunnels, CFD, simulators and the upgrade cycle.",
    keyIdea: "A car is never finished: teams bring upgrades throughout the season, within strict limits.",
    sections: [
      {
        heading: "The tools",
        body: [
          "Aerodynamicists use computational fluid dynamics (CFD) and scale models in wind tunnels. Driver-in-the-loop simulators test set-ups and new parts virtually before they reach the track.",
        ],
      },
      {
        heading: "Restrictions",
        body: [
          "Testing is heavily restricted. Aerodynamic testing time is allocated on a sliding scale — teams lower in the constructors' championship receive more — and the budget cap limits total spending on car performance.",
        ],
      },
      {
        heading: "Correlation",
        body: ["A key challenge is correlation: ensuring that the gains predicted in CFD and the wind tunnel appear on the real car."],
      },
    ],
    takeaways: ["CFD, tunnels, simulators", "Sliding-scale testing allowances", "Correlation is everything"],
    related: [{ label: "Technical regulations", href: "/technology/technical-regulations" }],
  },
  {
    slug: "regulations-and-performance",
    title: "How regulations influence performance",
    level: "Advanced",
    minutes: 6,
    summary: "Why rule changes reshuffle the order.",
    keyIdea: "Every major regulation reset gives teams a chance to leap forward — or fall behind.",
    sections: [
      {
        heading: "Resets",
        body: [
          "Major regulation changes have frequently produced new dominant teams: Brawn in 2009, Mercedes in 2014 and Red Bull in 2022. The team that best understands the new rules first gains an advantage that can last years.",
        ],
      },
      {
        heading: "Convergence",
        body: [
          "Under stable rules, teams copy successful ideas and performance converges. This is why the field often becomes closer towards the end of a regulation cycle.",
        ],
      },
    ],
    takeaways: ["Resets create opportunity", "Stable rules bring convergence", "Interpretation is a competitive skill"],
    related: [{ label: "Regulations & technology", href: "/technology" }],
  },
  {
    slug: "the-budget-cap",
    title: "The budget cap",
    level: "Advanced",
    minutes: 4,
    summary: "How a spending limit changed the sport's economics.",
    keyIdea: "Since 2021, the money a team may spend on car performance is capped, rewarding efficiency.",
    sections: [
      {
        heading: "What it covers",
        body: [
          "The financial regulations limit spending on items related to car performance. Certain costs — such as drivers' salaries and marketing — are excluded. Breaches can lead to financial and sporting penalties.",
        ],
      },
      {
        heading: "Why it matters",
        body: ["The cap aims to make the competition closer and teams more financially sustainable, increasing the value of Formula One franchises."],
      },
    ],
    takeaways: ["Introduced in 2021", "Covers performance spending", "Penalties for breaches"],
    related: [{ label: "Sporting regulations", href: "/technology/sporting-regulations" }],
  },
];

export function getLesson(slug: string) {
  return LESSONS.find((l) => l.slug === slug);
}
