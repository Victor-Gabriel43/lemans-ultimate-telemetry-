import type { Milestone, Section, Tone } from "./types";

export type TechGroup = "engineering" | "regulations";

/** A reference to an article in an indexed FIA document (verified against the extracted 2026 texts). */
export type RegRef = { year: number; kind: "technical" | "sporting" | "financial" | "general" | "operational"; num: string };

export type TechArticle = {
  slug: string;
  title: string;
  group: TechGroup;
  tone: Tone;
  summary: string;
  /** "Explain it simply" — one short paragraph for beginners. */
  simple: string;
  sections: Section[];
  concepts: { term: string; definition: string }[];
  history: Milestone[];
  related: string[];
  /** F1DB chassis ids of cars that illustrate the topic. */
  cars: string[];
  regs: RegRef[];
};

const T = (num: string): RegRef => ({ year: 2026, kind: "technical", num });
const S = (num: string): RegRef => ({ year: 2026, kind: "sporting", num });
const F = (num: string): RegRef => ({ year: 2026, kind: "financial", num });

export const TECH: TechArticle[] = [
  /* ============================== ENGINEERING ============================== */
  {
    slug: "aerodynamics",
    title: "Aerodynamics",
    group: "engineering",
    tone: "teal",
    summary: "How a Formula One car uses airflow to press itself onto the track.",
    simple:
      "An aeroplane wing creates lift. A Formula One car uses wings and its underbody upside-down, creating 'downforce' that pushes the tyres into the road so the car can corner much faster.",
    sections: [
      { heading: "Downforce and drag", body: ["Downforce increases grip without adding weight, which allows far higher cornering speeds. The cost is drag — air resistance that slows the car on straights. Every circuit demands a different compromise: high downforce at Monaco, low downforce at Monza."] },
      { heading: "Wings and floors", body: ["Front and rear wings are the most visible devices, but the floor is often the most powerful. Ground-effect floors accelerate air beneath the car, lowering its pressure and pulling the car down. This principle dominated 1977–1982 and returned in 2022."] },
      { heading: "Dirty air", body: ["A car leaves turbulent 'dirty' air behind it. A following car loses downforce in this wake, making it hard to stay close in corners. Rule changes in 2022 aimed to reduce this effect."] },
      { heading: "Active aerodynamics in 2026", body: ["From 2026, movable front and rear wing elements allow the car to switch between a high-downforce configuration for corners and a low-drag configuration on straights. When and where they may be used is set by the Sporting Regulations."] },
    ],
    concepts: [
      { term: "Downforce", definition: "Aerodynamic force pushing the car toward the track." },
      { term: "Drag", definition: "Aerodynamic resistance opposing motion." },
      { term: "DRS", definition: "Drag Reduction System — an opening rear-wing flap used to aid overtaking (2011–2025)." },
      { term: "Porpoising", definition: "Aerodynamic bouncing seen with ground-effect floors at high speed." },
    ],
    history: [
      { year: "1968", title: "Wings", text: "Downforce enters Formula One." },
      { year: "1977", title: "Ground effect", text: "The Lotus 78 uses its underbody as a wing." },
      { year: "2011", title: "DRS", text: "Overtaking aid introduced." },
      { year: "2022", title: "Ground effect returns", text: "Venturi tunnels under the car." },
    ],
    related: ["suspension", "tyres", "technical"],
    cars: ["lotus-49", "lotus-79", "brabham-bt46b", "brawn-bgp-001", "red-bull-rb19"],
    regs: [T("C3.5"), T("C3.10"), T("C3.11"), S("B7.1")],
  },
  {
    slug: "chassis",
    title: "Chassis",
    group: "engineering",
    tone: "graphite",
    summary: "The structure the whole car is built around — and the shell that protects the driver.",
    simple: "The chassis is the car's backbone. Today it is a carbon-fibre shell called the monocoque, which is both very light and extremely strong.",
    sections: [
      { heading: "From frames to monocoques", body: ["Early cars used tubular steel frames. The Lotus 25 introduced an aluminium monocoque in 1962, and the McLaren MP4/1 introduced carbon-fibre composite in 1981."] },
      { heading: "The survival cell", body: ["Today's monocoque — called the survival cell in the regulations — must pass demanding static and dynamic tests and incorporates side-impact protection, intrusion panels and the mounting points of the halo."] },
    ],
    concepts: [
      { term: "Monocoque", definition: "A structure in which the outer skin carries the loads." },
      { term: "Stressed member", definition: "A component, such as the engine, that also forms part of the structure." },
      { term: "Survival cell", definition: "The regulation term for the driver's protective monocoque." },
    ],
    history: [
      { year: "1962", title: "Monocoque", text: "The Lotus 25." },
      { year: "1967", title: "Stressed engine", text: "The Lotus 49." },
      { year: "1981", title: "Carbon fibre", text: "The McLaren MP4/1." },
    ],
    related: ["safety-structures", "suspension"],
    cars: ["lotus-25", "lotus-49", "mclaren-mp4-1"],
    regs: [T("C12.1"), T("C12.2"), T("C15.2")],
  },
  {
    slug: "power-units",
    title: "Engines and power units",
    group: "engineering",
    tone: "orange",
    summary: "From straight-eights to turbo-hybrids: the heart of a Formula One car.",
    simple: "Today's Formula One 'engine' is a power unit — a petrol engine working together with an electric motor-generator and a battery.",
    sections: [
      { heading: "Engine formulae through history", body: ["Formula One has used many engine rules: 1.5-litre supercharged and 4.5-litre engines (1950), 2.5 litres (1954), 1.5 litres (1961), 3.0 litres (1966), 1.5-litre turbos alongside 3.0-litre engines (from 1977), 3.5 litres (1989), 3.0 litres (1995), 2.4-litre V8s (2006) and 1.6-litre V6 turbo-hybrids (2014)."] },
      { heading: "The 2014–2025 power unit", body: ["A 1.6-litre turbocharged V6 internal combustion engine worked with two motor-generator units: the MGU-K, recovering energy under braking, and the MGU-H, recovering energy from the turbocharger's exhaust. Energy was stored in a battery and redeployed for extra power."] },
      { heading: "The 2026 power unit", body: ["The 2026 rules keep a 1.6-litre V6 but remove the MGU-H and greatly increase the power of the MGU-K, so that electrical power makes up a much larger share of the total. The engines run on fully sustainable fuel. The engine specification itself — capacity, cylinder layout, valves — is set out in Article C5.1 of the Technical Regulations."] },
    ],
    concepts: [
      { term: "ICE", definition: "Internal combustion engine." },
      { term: "MGU-K", definition: "Motor Generator Unit – Kinetic: recovers braking energy and adds electric power." },
      { term: "MGU-H", definition: "Motor Generator Unit – Heat: linked to the turbocharger (2014–2025)." },
      { term: "Energy Store", definition: "The battery." },
    ],
    history: [
      { year: "1967", title: "Cosworth DFV", text: "The most successful engine in F1 history debuts." },
      { year: "1977", title: "Turbo", text: "Renault's turbo arrives." },
      { year: "2014", title: "Hybrid", text: "Turbo-hybrid V6 power units." },
      { year: "2026", title: "New power units", text: "More electric power, sustainable fuel." },
    ],
    related: ["hybrid-systems", "fuel", "cooling"],
    cars: ["lotus-49", "renault-rs01", "mclaren-mp4-4", "mercedes-f1-w05"],
    regs: [T("C5.1"), T("C5.2"), T("C5.3"), S("B8.2")],
  },
  {
    slug: "hybrid-systems",
    title: "Hybrid systems",
    group: "engineering",
    tone: "teal",
    summary: "How Formula One cars recover, store and redeploy energy.",
    simple: "When a Formula One car brakes, an electric motor works as a generator, charging a battery. That energy is then used to accelerate.",
    sections: [
      { heading: "KERS", body: ["The Kinetic Energy Recovery System was first permitted in 2009. It offered a short boost per lap and was optional; several teams chose not to use it at first."] },
      { heading: "Energy Recovery Systems", body: ["From 2014, the MGU-K and MGU-H made hybrid power central to performance. Managing when to harvest and when to deploy energy became a key part of driving and strategy."] },
      { heading: "Deployment rules in 2026", body: ["With DRS removed, the Sporting Regulations define limits and conditions for energy deployment, including additional deployment available to a driver close to the car ahead."] },
    ],
    concepts: [
      { term: "Harvesting", definition: "Recovering energy into the battery." },
      { term: "Deployment", definition: "Using stored energy for extra power." },
      { term: "Lift and coast", definition: "Lifting off the throttle before braking to save fuel or harvest energy." },
    ],
    history: [
      { year: "2009", title: "KERS", text: "First hybrid technology." },
      { year: "2014", title: "ERS", text: "Full hybrid power units." },
    ],
    related: ["power-units", "brakes"],
    cars: ["mercedes-f1-w05"],
    regs: [T("C5.17"), T("C5.18"), T("C5.19"), S("B7.2")],
  },
  {
    slug: "tyres",
    title: "Tyres",
    group: "engineering",
    tone: "night",
    summary: "The only contact with the track — and the biggest variable in race strategy.",
    simple: "Softer tyres are faster but wear out quickly. Harder tyres last longer but are slower. Choosing when to use which is the heart of race strategy.",
    sections: [
      { heading: "Compounds", body: ["A single supplier — Pirelli since 2011 — brings a selection of dry compounds to each race, labelled soft (red), medium (yellow) and hard (white), plus intermediate (green) and full wet (blue) tyres for rain. Rules on how many sets each driver receives and how they must be used are in the Sporting Regulations."] },
      { heading: "Degradation and temperature", body: ["Tyres work only in a narrow temperature window. Too cold and they lack grip; too hot and they overheat and wear rapidly. Drivers manage tyres throughout a stint, balancing pace against longevity."] },
      { heading: "History", body: ["Tyre wars between competing manufacturers repeatedly raised performance. Slick tyres were banned in favour of grooved tyres from 1998 to 2008, then returned in 2009. Wheels grew from 13 to 18 inches in 2022."] },
    ],
    concepts: [
      { term: "Compound", definition: "The rubber mixture — softer compounds grip more but wear faster." },
      { term: "Degradation", definition: "Loss of performance as the tyre wears or overheats." },
      { term: "Graining", definition: "Rubber tearing and rolling on the tyre's surface, reducing grip." },
    ],
    history: [
      { year: "1998", title: "Grooved tyres", text: "Introduced to reduce grip." },
      { year: "2009", title: "Slicks return", text: "Smooth tyres back." },
      { year: "2011", title: "Pirelli", text: "Single supplier." },
      { year: "2022", title: "18-inch wheels", text: "Larger wheels, lower-profile tyres." },
    ],
    related: ["aerodynamics", "suspension"],
    cars: ["ferrari-f2004", "red-bull-rb19"],
    regs: [T("C10.8"), S("B6.1"), S("B6.2"), S("B6.3")],
  },
  {
    slug: "fuel",
    title: "Fuel",
    group: "engineering",
    tone: "green",
    summary: "From exotic alcohol blends to fully sustainable fuels.",
    simple: "Formula One cars use fuel similar in principle to road petrol, but tightly regulated — and from 2026, fully sustainable.",
    sections: [
      { heading: "Regulated fuel", body: ["Early Grand Prix cars used powerful alcohol-based mixtures; aviation petrol was mandated from 1958. Modern rules define the fuel's properties and composition precisely, and samples are tested at every event."] },
      { heading: "Fuel limits and refuelling", body: ["In the turbo-hybrid era the rules limited both the total fuel per race and the maximum fuel-flow rate, rewarding efficiency. In-race refuelling has been banned since 2010, so cars start the race with all the fuel they need."] },
      { heading: "Sustainable fuel", body: ["From 2026, the fuel must be fully sustainable — made from non-fossil sources. Its required properties and composition are in Chapter C16 of the Technical Regulations."] },
    ],
    concepts: [
      { term: "Fuel-flow limit", definition: "A cap on how fast fuel may enter the engine." },
      { term: "Refuelling", definition: "Adding fuel during the race — banned since 2010." },
    ],
    history: [
      { year: "1958", title: "Aviation petrol", text: "Alcohol fuels replaced by commercial aviation fuel." },
      { year: "1994", title: "Refuelling returns", text: "Allowed from 1994 to 2009." },
      { year: "2010", title: "Refuelling banned", text: "Cars start with all their fuel." },
      { year: "2026", title: "Sustainable fuel", text: "100% sustainable fuel required." },
    ],
    related: ["power-units", "cooling"],
    cars: ["alfa-romeo-158"],
    regs: [T("C6.1"), T("C6.4"), T("C16.2"), T("C16.3")],
  },
  {
    slug: "brakes",
    title: "Brakes",
    group: "engineering",
    tone: "orange",
    summary: "Carbon brakes that glow red-hot and slow a car from over 300 km/h in seconds.",
    simple: "Formula One brakes are made of carbon, work best when extremely hot, and are combined with electric energy recovery.",
    sections: [
      { heading: "Carbon-carbon", body: ["Since the 1980s, Formula One has used carbon-carbon discs and pads. They are light and work at very high temperatures, with cooling ducts carefully designed for each circuit."] },
      { heading: "Brake-by-wire", body: ["Because the MGU-K also slows the car while harvesting energy, the rear braking is electronically controlled and blended between the friction brakes and the energy-recovery system. Drivers adjust the brake balance between front and rear many times per lap."] },
    ],
    concepts: [
      { term: "Brake balance", definition: "The split of braking force between front and rear." },
      { term: "Lock-up", definition: "A wheel stopping while the car is still moving, flat-spotting the tyre." },
    ],
    history: [
      { year: "1950s", title: "Disc brakes", text: "Disc brakes replace drums." },
      { year: "1980s", title: "Carbon", text: "Carbon brakes become standard." },
      { year: "2014", title: "Brake-by-wire", text: "Rear braking blended with energy recovery." },
    ],
    related: ["hybrid-systems", "tyres", "cooling"],
    cars: [],
    regs: [T("C11.1"), T("C11.3"), T("C11.6")],
  },
  {
    slug: "suspension",
    title: "Suspension",
    group: "engineering",
    tone: "blue",
    summary: "Holding the aerodynamic platform steady and the tyres on the road.",
    simple: "A Formula One car's suspension is very stiff — its main job is to keep the car at the right height so the aerodynamics work properly.",
    sections: [
      { heading: "Platform control", body: ["Modern suspension uses pushrods or pullrods to operate springs and dampers inside the bodywork. The priority is controlling ride height and pitch, because the car's floor is extremely sensitive to its distance from the ground."] },
      { heading: "Active suspension", body: ["Computer-controlled active suspension, perfected by Williams in 1992, was banned for 1994. Teams have since found many clever passive ways to achieve similar effects within the rules."] },
    ],
    concepts: [
      { term: "Pushrod / pullrod", definition: "Two ways to link the wheel to the springs and dampers." },
      { term: "Ride height", definition: "The distance between the floor and the track." },
    ],
    history: [
      { year: "1992", title: "Active suspension", text: "Williams FW14B dominates." },
      { year: "1994", title: "Banned", text: "Active systems prohibited." },
    ],
    related: ["aerodynamics", "chassis"],
    cars: ["lotus-72c", "williams-fw14b", "red-bull-rb19"],
    regs: [T("C10.2"), T("C10.3"), T("C10.4")],
  },
  {
    slug: "cooling",
    title: "Cooling",
    group: "engineering",
    tone: "blue",
    summary: "Radiators, ducts and heat — the constant compromise between temperature and aerodynamics.",
    simple: "A Formula One car produces enormous heat in its engine, battery and brakes. Getting rid of it needs air, and every opening for air costs aerodynamic performance.",
    sections: [
      { heading: "Radiators and sidepods", body: ["Engine coolant, oil and charge air pass through heat exchangers mounted in the sidepods. The size of the cooling inlets is a key aerodynamic decision: bigger openings cool better but add drag. The Lotus 72 of 1970 popularised side-mounted radiators."] },
      { heading: "Hybrid components", body: ["Batteries and electronics must be kept within narrow temperature limits, adding separate cooling circuits to the car."] },
      { heading: "Cooling the driver", body: ["In very hot conditions, the regulations allow a driver cooling system and adjust the minimum mass when a heat hazard is declared."] },
    ],
    concepts: [
      { term: "Heat exchanger", definition: "A radiator transferring heat from a fluid to the air." },
      { term: "Cooling package", definition: "The set of radiators and ducts a team chooses for a circuit's temperature." },
    ],
    history: [
      { year: "1970", title: "Side radiators", text: "The Lotus 72 moves radiators from the nose to the sides." },
      { year: "2014", title: "Hybrid cooling", text: "Batteries and electronics add new cooling demands." },
    ],
    related: ["power-units", "aerodynamics", "brakes"],
    cars: ["lotus-72c"],
    regs: [T("C7.4"), T("C14.6"), T("C4.6")],
  },
  {
    slug: "safety-structures",
    title: "Safety structures",
    group: "engineering",
    tone: "red",
    summary: "The crash structures, halo and tethers engineered around the driver.",
    simple: "Around the driver, a Formula One car is designed to crush in a controlled way in an accident — absorbing energy so that the driver does not have to.",
    sections: [
      { heading: "Impact structures", body: ["Front, side and rear impact structures must absorb set amounts of energy in FIA tests before a car may race. They are designed to deform progressively while the survival cell stays intact."] },
      { heading: "Roll structures and the halo", body: ["Roll structures above the driver's head and the halo protect the driver if the car overturns or is struck by debris or another car."] },
      { heading: "Wheel tethers", body: ["High-strength tethers keep wheels attached to the car after suspension failures, protecting other drivers, marshals and spectators."] },
    ],
    concepts: [
      { term: "Homologation", definition: "Approval of a safety structure after passing the FIA tests." },
      { term: "Halo", definition: "Titanium cockpit protection above the driver's head, mandatory since 2018." },
    ],
    history: [
      { year: "1981", title: "Carbon fibre", text: "Composite monocoques transform crash safety." },
      { year: "1994", title: "Higher cockpit sides", text: "Part of the post-Imola safety package." },
      { year: "2018", title: "Halo", text: "Mandatory cockpit protection." },
    ],
    related: ["chassis", "safety"],
    cars: ["mclaren-mp4-1"],
    regs: [T("C12.4"), T("C13.5"), T("C13.6"), T("C14.4")],
  },

  /* ============================== REGULATIONS ============================== */
  {
    slug: "sporting",
    title: "Sporting regulations",
    group: "regulations",
    tone: "graphite",
    summary: "The rules that govern how a championship is run: the weekend, the race, procedures and penalties.",
    simple: "If the technical regulations describe what a car may be, the sporting regulations describe how teams and drivers may compete with it.",
    sections: [
      { heading: "What they cover", body: ["The Sporting Regulations define the format of a competition — practice, qualifying, sprint and race — as well as starting procedures, pit-lane rules, Safety Car procedures, tyre allocation and how penalties are applied. In the 2026 document they form Section B."] },
      { heading: "Who writes and enforces them", body: ["The FIA publishes the regulations after consultation with the teams and Formula One's commercial rights holder through the F1 Commission; changes are approved by the FIA World Motor Sport Council. At each event, the stewards judge incidents and apply penalties, while the race director runs the event."] },
    ],
    concepts: [
      { term: "Parc fermé", definition: "Conditions under which teams may not make significant changes to the car, from qualifying until the race." },
      { term: "Stewards", definition: "The officials who investigate incidents and decide penalties." },
      { term: "Super Licence", definition: "The licence a driver must hold to compete in Formula One." },
    ],
    history: [
      { year: "1950", title: "A drivers' championship", text: "Points awarded to the top five, plus fastest lap." },
      { year: "1958", title: "Constructors' title", text: "A championship for manufacturers is introduced." },
      { year: "2010", title: "25 points for a win", text: "The modern points scale arrives." },
      { year: "2021", title: "Sprints", text: "A shorter race is introduced at selected events." },
    ],
    related: ["technical", "safety"],
    cars: [],
    regs: [S("B1.9"), S("B2.5"), S("B3.5"), S("B5.13")],
  },
  {
    slug: "technical",
    title: "Technical regulations",
    group: "regulations",
    tone: "graphite",
    summary: "The rulebook that defines what a Formula One car may be — dimensions, materials, power units and safety structures.",
    simple: "Every team designs its own car, but it must fit inside a box of rules. The best teams find the most performance inside that box.",
    sections: [
      { heading: "A design envelope", body: ["The Technical Regulations specify dimensions, minimum mass, the shapes aerodynamic surfaces may take, the power-unit architecture, permitted materials and mandatory safety structures and crash tests. In 2026 they form Section C."] },
      { heading: "Interpretation and innovation", body: ["Much of Formula One's history is the story of engineers finding gaps in the wording of the rules: the fan car, the double diffuser and many others. The FIA can clarify or close loopholes, sometimes immediately and sometimes for the following season."] },
    ],
    concepts: [
      { term: "Legality boxes", definition: "Defined volumes within which bodywork may exist." },
      { term: "Minimum mass", definition: "The lowest permitted mass of the car with driver — ballast is used to reach it." },
      { term: "Homologation", definition: "Approval of a component's design, often freezing it for a period." },
    ],
    history: [
      { year: "1983", title: "Flat bottoms", text: "Ground-effect skirts banned; flat floors mandatory." },
      { year: "1994", title: "Aids banned", text: "Active suspension and traction control prohibited." },
      { year: "2014", title: "Power units", text: "Turbo-hybrid V6s introduced." },
      { year: "2026", title: "New formula", text: "Active aero and new power units." },
    ],
    related: ["sporting", "history"],
    cars: ["brabham-bt46b", "brawn-bgp-001"],
    regs: [T("C1.3"), T("C1.4"), T("C4.1")],
  },
  {
    slug: "financial",
    title: "Financial regulations",
    group: "regulations",
    tone: "gold",
    summary: "The cost cap: how much a team may spend on performance, and what happens if it spends more.",
    simple: "Since 2021, each team has a limit on how much it can spend each year on making its car faster. It reports its spending to the FIA, which checks it.",
    sections: [
      { heading: "What the cost cap covers", body: ["The Financial Regulations define the costs that count against the cap and those excluded from it, such as drivers' remuneration. Teams submit annual reports that are reviewed by the FIA's Cost Cap Administration."] },
      { heading: "Breaches and sanctions", body: ["The regulations distinguish procedural breaches from overspends of different sizes and set out the sanctions available, from financial penalties to sporting penalties."] },
      { heading: "Power unit manufacturers", body: ["From 2026, a separate set of Financial Regulations applies to power unit manufacturers."] },
    ],
    concepts: [
      { term: "Cost cap", definition: "The maximum permitted relevant spending in a reporting period." },
      { term: "Exclusions", definition: "Costs that do not count against the cap." },
    ],
    history: [
      { year: "2021", title: "Cost cap introduced", text: "Financial Regulations come into force." },
      { year: "2026", title: "PU financial regulations", text: "A cost cap also applies to power unit manufacturers." },
    ],
    related: ["sporting", "history"],
    cars: [],
    regs: [F("D1.2"), F("D4.1"), F("D12.1")],
  },
  {
    slug: "safety",
    title: "Safety",
    group: "regulations",
    tone: "red",
    summary: "From straw bales to the halo: how Formula One became dramatically safer.",
    simple: "Racing at more than 300 km/h will never be risk-free, but cars, circuits and medical care have made serious injuries far rarer than in the sport's early decades.",
    sections: [
      { heading: "Early decades", body: ["In the 1950s and 1960s circuits had trees, walls and spectators close to the track, and many drivers were killed. Jackie Stewart's campaign from 1966 onward brought barriers, run-off, better medical services and full-face helmets into common use."] },
      { heading: "After Imola", body: ["The deaths of Roland Ratzenberger and Ayrton Senna in 1994 led to a systematic, research-led approach to safety: higher cockpit sides, increasingly demanding crash tests, wheel tethers, pit-lane speed limits and the HANS head-and-neck support device."] },
      { heading: "The halo and beyond", body: ["The halo became mandatory in 2018. It has been credited with protecting drivers in several serious accidents, including Romain Grosjean's crash in Bahrain in 2020."] },
    ],
    concepts: [
      { term: "Survival cell", definition: "The monocoque structure around the driver, designed not to deform in an impact." },
      { term: "HANS", definition: "Head and Neck Support device, restraining the head in frontal impacts." },
      { term: "Halo", definition: "Cockpit protection device above the driver's head." },
    ],
    history: [
      { year: "1978", title: "Medical delegate", text: "Professor Sid Watkins begins his work for the sport." },
      { year: "1994", title: "Imola", text: "A turning point in safety research." },
      { year: "2015", title: "Virtual Safety Car", text: "Introduced after Bianchi's accident." },
      { year: "2018", title: "The halo", text: "Mandatory cockpit protection." },
    ],
    related: ["safety-structures", "sporting"],
    cars: ["mclaren-mp4-1"],
    regs: [T("C12.3"), T("C14.5"), S("B1.5"), S("B5.12")],
  },
  {
    slug: "history",
    title: "How the regulations changed",
    group: "regulations",
    tone: "navy",
    summary: "Seventy-six years of rule changes — engines, aerodynamics, safety and sporting format.",
    simple: "The rules are rewritten every few years to control speed, improve safety, reduce costs or improve racing. Each major reset reshapes the competition.",
    sections: [
      { heading: "Engine formulae", body: ["Engine rules have changed more than any other area: supercharged 1.5 litres or 4.5 litres (1950), 2.5 litres (1954), 1.5 litres (1961), 3.0 litres (1966), turbo era (1977–1988), 3.5 litres (1989), 3.0 litres (1995), V8s (2006), turbo-hybrids (2014) and the 2026 power units."] },
      { heading: "Aerodynamics", body: ["Wings were restricted in 1969, ground-effect skirts banned in 1981 and flat floors required from 1983. Aerodynamics were simplified in 2009, cars widened in 2017, ground effect returned in 2022 and active aerodynamics arrived in 2026."] },
      { heading: "Sporting format", body: ["Points systems, qualifying formats, refuelling, tyre rules, sprints and the cost cap have all been changed repeatedly. Each season page in Paddock shows the points system used that year."] },
    ],
    concepts: [
      { term: "Regulation cycle", definition: "The period during which the main technical rules stay stable." },
      { term: "Reset", definition: "A major rewrite of the rules that changes the cars substantially." },
    ],
    history: [
      { year: "1950", title: "First championship", text: "1.5-litre supercharged or 4.5-litre engines." },
      { year: "1966", title: "3-litre formula", text: "The return to power." },
      { year: "1989", title: "Turbos banned", text: "3.5-litre naturally aspirated engines." },
      { year: "2014", title: "Turbo-hybrids", text: "1.6-litre V6 power units." },
      { year: "2026", title: "New formula", text: "Active aerodynamics and new power units." },
    ],
    related: ["technical", "sporting", "financial"],
    cars: ["cooper-t51", "lotus-79", "mclaren-mp4-4", "mercedes-f1-w05", "red-bull-rb19"],
    regs: [],
  },
];

export const ENGINEERING = TECH.filter((t) => t.group === "engineering");
export const REG_EXPLAINERS = TECH.filter((t) => t.group === "regulations");

export function getTech(slug: string, group?: TechGroup) {
  return TECH.find((t) => t.slug === slug && (!group || t.group === group));
}
