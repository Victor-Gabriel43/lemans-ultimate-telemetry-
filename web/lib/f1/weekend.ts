export type WeekendStep = {
  id: string;
  day: string;
  title: string;
  short: string;
  body: string[];
  facts: string[];
};

/** A standard (non-sprint) Grand Prix weekend. */
export const STANDARD_WEEKEND: WeekendStep[] = [
  {
    id: "practice",
    day: "Friday – Saturday",
    title: "Practice",
    short: "Three sessions to learn the track and set up the car.",
    body: [
      "Free Practice 1 and 2 take place on Friday, and Free Practice 3 on Saturday morning. Teams test set-up changes, evaluate tyre compounds, run long stints with heavy fuel to simulate the race and short runs on low fuel to prepare for qualifying.",
      "Teams also give practice outings to young drivers: each team must run rookies in a number of sessions every season.",
    ],
    facts: ["No points are awarded", "Data from practice shapes race strategy"],
  },
  {
    id: "qualifying",
    day: "Saturday",
    title: "Qualifying",
    short: "A knockout session that decides the starting grid.",
    body: [
      "Qualifying is split into three parts. In Q1 every driver sets lap times and the slowest are eliminated. Q2 eliminates another group. The fastest ten fight for pole position in Q3.",
      "The order of the final classification sets the grid for the Grand Prix, subject to any penalties.",
    ],
    facts: ["Pole position: starting first", "Grid penalties can drop drivers down the order"],
  },
  {
    id: "grand-prix",
    day: "Sunday",
    title: "The Grand Prix",
    short: "The race itself — around 305 km, the event that scores the most points.",
    body: [
      "Cars complete a formation lap and then start from a standstill as five red lights go out. Most races cover the minimum number of laps exceeding 305 kilometres; Monaco is the main exception.",
      "There is an overall time limit, and the top ten finishers score points.",
    ],
    facts: ["Standing start", "Points to the top ten", "At least two dry compounds in a dry race"],
  },
];

/** A sprint weekend. */
export const SPRINT_WEEKEND: WeekendStep[] = [
  {
    id: "practice",
    day: "Friday",
    title: "One practice session",
    short: "A single hour to prepare before competitive running begins.",
    body: ["Sprint weekends have only one practice session, putting a premium on preparation and simulation done back at the factory."],
    facts: ["Less time to set up the car"],
  },
  {
    id: "sprint-qualifying",
    day: "Friday",
    title: "Sprint Qualifying",
    short: "A shorter knockout session that sets the sprint grid.",
    body: ["Sprint Qualifying follows the same three-part knockout format as regular qualifying, with shorter sessions."],
    facts: ["Sets the grid for the sprint only"],
  },
  {
    id: "sprint",
    day: "Saturday",
    title: "The Sprint",
    short: "A race of around 100 km, with no mandatory pit stop.",
    body: ["The sprint is a flat-out race with points for the top eight. It is followed by qualifying for the Grand Prix later the same day."],
    facts: ["About a third of a Grand Prix distance", "Points to the top eight"],
  },
  {
    id: "qualifying",
    day: "Saturday",
    title: "Qualifying",
    short: "The usual three-part session for the Grand Prix grid.",
    body: ["Grand Prix qualifying runs to the normal format."],
    facts: ["Sets Sunday's grid"],
  },
  {
    id: "grand-prix",
    day: "Sunday",
    title: "The Grand Prix",
    short: "The main race, exactly as on a standard weekend.",
    body: ["The Grand Prix itself is unchanged by the sprint format."],
    facts: ["Full points to the top ten"],
  },
];

export type RaceTopic = {
  id: string;
  title: string;
  summary: string;
  body: string[];
};

export const RACE_TOPICS: RaceTopic[] = [
  {
    id: "pit-stops",
    title: "Pit stops",
    summary: "A crew of around twenty people changes four tyres in a couple of seconds.",
    body: [
      "During a stop, the car is lifted on front and rear jacks while three mechanics work on each wheel — one operating the wheel gun, one removing the old wheel and one fitting the new one. The fastest stops take around two seconds.",
      "Cars must respect a speed limit in the pit lane. Time lost in the pit lane — not just the stationary time — is what strategists account for.",
    ],
  },
  {
    id: "strategy",
    title: "Strategy",
    summary: "When to stop, which tyres to use, and how to react to rivals.",
    body: [
      "Strategists choose between one-stop, two-stop or more aggressive plans, depending on tyre wear and how long a pit stop costs at that circuit.",
      "The 'undercut' — stopping before a rival to use fresh tyres' extra pace — and the 'overcut' — staying out longer on old tyres while the rival is held up — are the two classic strategic moves.",
    ],
  },
  {
    id: "safety-car",
    title: "Safety Car",
    summary: "A real car that leads the field at reduced speed after an incident.",
    body: [
      "When there is danger on track that requires marshals to work, the Safety Car is deployed. Drivers form up in a queue behind it and may not overtake. The gaps between cars disappear — which can transform a race.",
      "Pitting under the Safety Car costs less time than under green-flag conditions, so teams often take the opportunity to change tyres.",
    ],
  },
  {
    id: "virtual-safety-car",
    title: "Virtual Safety Car",
    summary: "Every driver must slow to a set pace, without a physical Safety Car.",
    body: [
      "Introduced in 2015, the Virtual Safety Car (VSC) requires every driver to stay above a minimum time across marshalling sectors. Unlike the Safety Car, the gaps between cars are roughly preserved.",
    ],
  },
  {
    id: "red-flag",
    title: "Red flag",
    summary: "The session is suspended and cars return to the pit lane.",
    body: [
      "If conditions are too dangerous to continue — a heavy crash, barrier repairs or extreme rain — the session is stopped. Teams may usually change tyres during the suspension, and the race restarts later.",
    ],
  },
  {
    id: "race-control",
    title: "Race Control",
    summary: "The officials who run the race and judge incidents.",
    body: [
      "The race director manages the event: starting procedures, flags, the Safety Car and track conditions. Incidents are referred to the stewards, an independent panel that includes a former driver, who decide whether a penalty is deserved.",
    ],
  },
  {
    id: "penalties",
    title: "Penalties",
    summary: "From five-second time penalties to grid drops and race bans.",
    body: [
      "Common penalties include five- or ten-second time penalties (served at a pit stop or added to the race time), drive-through and stop-go penalties, grid penalties for the next race and, rarely, disqualification.",
      "Drivers also receive penalty points on their Super Licence. Accumulating twelve within twelve months results in a race ban.",
    ],
  },
  {
    id: "flags",
    title: "Flags",
    summary: "The visual language between race control and drivers.",
    body: [
      "Yellow: danger, slow down, no overtaking. Green: track clear. Red: session stopped. Blue: let a faster car through. Chequered: end of the session. Black-and-white diagonal: warning for unsporting behaviour.",
    ],
  },
];
