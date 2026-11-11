import type { EraId, Tone } from "./types";

export type Generation =
  | "front-engined"
  | "rear-engined"
  | "wings-and-wedges"
  | "ground-effect"
  | "turbo"
  | "v10-v8"
  | "hybrid"
  | "modern-ground-effect";

export const GENERATIONS: { id: Generation; name: string; years: string; text: string }[] = [
  { id: "front-engined", name: "Front-engined", years: "1950–1960", text: "Engine ahead of the driver, narrow tyres, little aerodynamic thinking." },
  { id: "rear-engined", name: "Rear-engined", years: "1959–1967", text: "The engine moves behind the driver; monocoques replace space frames." },
  { id: "wings-and-wedges", name: "Wings and wedges", years: "1968–1976", text: "Wings generate downforce and wedge shapes appear." },
  { id: "ground-effect", name: "Ground effect", years: "1977–1982", text: "The underbody becomes an inverted wing sealed by skirts." },
  { id: "turbo", name: "Turbo and carbon", years: "1977–1988", text: "Turbocharged engines and carbon-fibre monocoques." },
  { id: "v10-v8", name: "Naturally aspirated", years: "1989–2013", text: "V8, V10 and V12 engines, electronics, then refined aerodynamics." },
  { id: "hybrid", name: "Turbo-hybrid", years: "2014–2021", text: "1.6-litre V6 turbo power units with energy recovery." },
  { id: "modern-ground-effect", name: "Modern ground effect", years: "2022–2025", text: "Venturi tunnels return with simplified wings and 18-inch wheels." },
];

export type Car = {
  slug: string;
  name: string;
  team: string;
  teamSlug?: string;
  seasons: string; // e.g. "1950–1951"
  year: number; // headline season
  era: EraId;
  generation: Generation;
  regulation: string; // regulation era label
  tone: Tone;
  designer?: string;
  engine: string;
  drivers: string[]; // driver slugs
  headline: string;
  intro: string;
  context: string[];
  design: string[];
  innovations: string[];
};

export const CARS: Car[] = [
  {
    slug: "alfa-romeo-158",
    name: "Alfa Romeo 158 / 159 'Alfetta'",
    team: "Alfa Romeo",
    teamSlug: "alfa-romeo",
    seasons: "1950–1951",
    year: 1950,
    era: "1950s",
    generation: "front-engined",
    regulation: "1.5-litre supercharged / 4.5-litre unsupercharged",
    tone: "red",
    engine: "1.5-litre supercharged straight-eight, front-mounted",
    drivers: ["giuseppe-farina", "juan-manuel-fangio"],
    headline: "A pre-war design that won the first two world championships.",
    intro: "Designed in the late 1930s, the 'Alfetta' was so far ahead when racing resumed after the war that it won the first two World Championships.",
    context: [
      "The car had been hidden during the war and emerged as the benchmark of post-war Grand Prix racing. In 1950 Alfa Romeo's drivers won every championship Grand Prix they entered.",
      "Its supercharged engine was progressively developed for more power, at the cost of extraordinary fuel consumption.",
    ],
    design: [
      "A classic front-engined layout: tubular chassis, long bonnet over a straight-eight engine and the driver sitting high behind a large steering wheel.",
    ],
    innovations: ["Highly developed supercharging", "Proof that pre-war engineering could still dominate"],
  },
  {
    slug: "mercedes-w196",
    name: "Mercedes-Benz W196",
    team: "Mercedes-Benz",
    teamSlug: "mercedes",
    seasons: "1954–1955",
    year: 1954,
    era: "1950s",
    generation: "front-engined",
    regulation: "2.5-litre formula",
    tone: "silver",
    engine: "2.5-litre straight-eight with fuel injection and desmodromic valves",
    drivers: ["juan-manuel-fangio", "stirling-moss"],
    headline: "The Silver Arrow that won Fangio two titles.",
    intro: "Mercedes-Benz's return to Grand Prix racing brought aerospace-level engineering to the 2.5-litre formula.",
    context: [
      "The W196 won on its debut at the 1954 French Grand Prix. Fangio won the championships of 1954 and 1955 before Mercedes withdrew from racing.",
    ],
    design: [
      "It raced in two forms: a streamlined, enclosed-wheel body for fast circuits and an open-wheel body for twisty ones.",
    ],
    innovations: ["Direct fuel injection", "Desmodromic (mechanically closed) valves", "Streamlined bodywork"],
  },
  {
    slug: "cooper-t51",
    name: "Cooper T51",
    team: "Cooper",
    teamSlug: "cooper",
    seasons: "1959–1960",
    year: 1959,
    era: "1950s",
    generation: "rear-engined",
    regulation: "2.5-litre formula",
    tone: "green",
    engine: "Coventry Climax 2.5-litre four-cylinder, mid-mounted",
    drivers: ["jack-brabham", "stirling-moss"],
    headline: "The car that put the engine behind the driver for good.",
    intro: "The small, light Cooper T51 won the 1959 championships and proved the mid-engined layout superior.",
    context: [
      "Cooper had been building rear-engined racing cars in smaller classes for years. With a Coventry Climax engine, the T51 carried Jack Brabham to the 1959 drivers' title and Cooper to the constructors' championship.",
    ],
    design: [
      "Placing the engine behind the driver reduced the car's frontal area and improved weight distribution and handling, while removing the need for a long driveshaft.",
    ],
    innovations: ["Mid-engined layout at the top level", "Lightweight construction"],
  },
  {
    slug: "lotus-25",
    name: "Lotus 25",
    team: "Team Lotus",
    teamSlug: "lotus",
    seasons: "1962–1965",
    year: 1963,
    era: "1960s",
    generation: "rear-engined",
    regulation: "1.5-litre formula",
    tone: "green",
    designer: "Colin Chapman",
    engine: "Coventry Climax 1.5-litre V8",
    drivers: ["jim-clark"],
    headline: "The first monocoque Formula One car.",
    intro: "Colin Chapman's Lotus 25 replaced the tubular space frame with a stressed monocoque — and changed racing-car construction forever.",
    context: [
      "Jim Clark used the 25 to win the 1963 championship, taking seven of the ten races.",
    ],
    design: [
      "The monocoque was formed from riveted aluminium panels, making the car lighter, stiffer and lower. Clark drove in a reclined position, reducing the frontal area further.",
    ],
    innovations: ["Monocoque chassis", "Reclined driving position"],
  },
  {
    slug: "lotus-49",
    name: "Lotus 49",
    team: "Team Lotus",
    teamSlug: "lotus",
    seasons: "1967–1970",
    year: 1967,
    era: "1960s",
    generation: "rear-engined",
    regulation: "3.0-litre formula",
    tone: "gold",
    designer: "Colin Chapman and Maurice Philippe",
    engine: "Ford-Cosworth DFV 3.0-litre V8",
    drivers: ["jim-clark", "graham-hill", "jochen-rindt"],
    headline: "The debut of the Cosworth DFV.",
    intro: "The Lotus 49 introduced the Cosworth DFV, the most successful engine in Formula One history, and won on its first race.",
    context: [
      "Clark won the 1967 Dutch Grand Prix on the car's debut. In 1968 Graham Hill won the championship with it, and the 49 was among the first cars to carry sponsorship colours and wings.",
    ],
    design: [
      "The engine was bolted directly to the monocoque and carried the rear suspension: a 'fully stressed' engine, saving weight and becoming the template for decades.",
    ],
    innovations: ["Engine as a stressed member", "Cosworth DFV", "Early use of wings"],
  },
  {
    slug: "lotus-72",
    name: "Lotus 72",
    team: "Team Lotus",
    teamSlug: "lotus",
    seasons: "1970–1975",
    year: 1970,
    era: "1970s",
    generation: "wings-and-wedges",
    regulation: "3.0-litre formula",
    tone: "night",
    designer: "Colin Chapman and Maurice Philippe",
    engine: "Ford-Cosworth DFV 3.0-litre V8",
    drivers: ["jochen-rindt", "emerson-fittipaldi"],
    headline: "Wedge shape and side radiators.",
    intro: "One of the longest-serving and most influential cars in history, the 72 won championships in 1970 and 1972.",
    context: [
      "Rindt won the posthumous 1970 title in the 72, and Fittipaldi won the 1972 championship in its black-and-gold form.",
    ],
    design: [
      "Moving the radiators from the nose to the sides allowed a sharp wedge nose and better weight distribution. Inboard brakes reduced unsprung weight, and torsion-bar suspension was used.",
    ],
    innovations: ["Side-mounted radiators", "Wedge profile", "Inboard brakes"],
  },
  {
    slug: "ferrari-312t",
    name: "Ferrari 312T",
    team: "Ferrari",
    teamSlug: "ferrari",
    seasons: "1975–1980",
    year: 1975,
    era: "1970s",
    generation: "wings-and-wedges",
    regulation: "3.0-litre formula",
    tone: "red",
    designer: "Mauro Forghieri",
    engine: "Ferrari 3.0-litre flat-12",
    drivers: ["niki-lauda", "jody-scheckter", "gilles-villeneuve"],
    headline: "The 'T' was for transversale.",
    intro: "Ferrari's 312T series won three drivers' titles and four constructors' titles in the late 1970s.",
    context: [
      "Niki Lauda won the 1975 championship in the original 312T. Developments of the design took titles in 1977 and, with Jody Scheckter, in 1979.",
    ],
    design: [
      "The gearbox was mounted transversely — across the car — ahead of the rear axle, concentrating mass within the wheelbase and improving handling.",
    ],
    innovations: ["Transverse gearbox", "Low, wide flat-12 engine"],
  },
  {
    slug: "tyrrell-p34",
    name: "Tyrrell P34",
    team: "Tyrrell",
    teamSlug: "tyrrell",
    seasons: "1976–1977",
    year: 1976,
    era: "1970s",
    generation: "wings-and-wedges",
    regulation: "3.0-litre formula",
    tone: "blue",
    designer: "Derek Gardner",
    engine: "Ford-Cosworth DFV 3.0-litre V8",
    drivers: ["jody-scheckter"],
    headline: "The six-wheeler that won.",
    intro: "With four small front wheels, the P34 is one of the most recognisable cars ever raced — and it won a Grand Prix.",
    context: [
      "Jody Scheckter and Patrick Depailler finished first and second in the 1976 Swedish Grand Prix. The concept was abandoned after 1977, partly because of difficulties with the special small tyres.",
    ],
    design: [
      "Four 10-inch front wheels hid behind a narrow nose, intended to reduce frontal drag while increasing front grip and braking.",
    ],
    innovations: ["Six-wheel layout"],
  },
  {
    slug: "lotus-79",
    name: "Lotus 79",
    team: "Team Lotus",
    teamSlug: "lotus",
    seasons: "1978–1979",
    year: 1978,
    era: "1970s",
    generation: "ground-effect",
    regulation: "3.0-litre formula",
    tone: "night",
    designer: "Colin Chapman, Peter Wright and team",
    engine: "Ford-Cosworth DFV 3.0-litre V8",
    drivers: ["mario-andretti"],
    headline: "Ground effect perfected.",
    intro: "The Lotus 79 turned the whole car into a wing, and won both 1978 championships.",
    context: [
      "Following the Lotus 78 of 1977, the 79 refined ground-effect aerodynamics. Mario Andretti won the 1978 drivers' title and Lotus the constructors'.",
    ],
    design: [
      "Shaped sidepods formed inverted wing profiles; sliding skirts sealed the gap to the track, so low pressure under the car pulled it down with enormous force and little drag.",
    ],
    innovations: ["Full ground-effect sidepods", "Sliding skirts"],
  },
  {
    slug: "brabham-bt46b",
    name: "Brabham BT46B 'Fan Car'",
    team: "Brabham",
    teamSlug: "brabham",
    seasons: "1978",
    year: 1978,
    era: "1970s",
    generation: "ground-effect",
    regulation: "3.0-litre formula",
    tone: "red",
    designer: "Gordon Murray",
    engine: "Alfa Romeo 3.0-litre flat-12",
    drivers: ["niki-lauda"],
    headline: "Raced once, won once.",
    intro: "Brabham's answer to ground effect used a large fan to suck the car to the road.",
    context: [
      "Niki Lauda won the 1978 Swedish Grand Prix in the BT46B. Brabham withdrew the car afterwards amid protests from rivals.",
    ],
    design: [
      "A fan at the rear, officially for engine cooling, extracted air from beneath the sealed underbody, creating downforce independent of speed.",
    ],
    innovations: ["Fan-assisted ground effect"],
  },
  {
    slug: "renault-rs01",
    name: "Renault RS01",
    team: "Renault",
    teamSlug: "renault",
    seasons: "1977–1979",
    year: 1977,
    era: "1970s",
    generation: "turbo",
    regulation: "1.5-litre turbo / 3.0-litre",
    tone: "gold",
    engine: "Renault 1.5-litre turbocharged V6",
    drivers: [],
    headline: "The first turbocharged Formula One car.",
    intro: "Mocked as the 'Yellow Teapot' for its early failures, the RS01 began the turbo revolution.",
    context: [
      "The rules allowed 1.5-litre forced-induction engines as an alternative to 3.0-litre naturally aspirated ones. Renault was the first to exploit it, debuting at the 1977 British Grand Prix. Its successor won in 1979.",
    ],
    design: [
      "Early turbo engines suffered from severe throttle lag — a delay between pressing the accelerator and the power arriving — and poor reliability.",
    ],
    innovations: ["Turbocharging in Formula One", "Radial tyres (Michelin)"],
  },
  {
    slug: "mclaren-mp4-1",
    name: "McLaren MP4/1",
    team: "McLaren",
    teamSlug: "mclaren",
    seasons: "1981–1983",
    year: 1981,
    era: "1980s",
    generation: "turbo",
    regulation: "3.0-litre / 1.5-litre turbo",
    tone: "red",
    designer: "John Barnard",
    engine: "Ford-Cosworth DFV 3.0-litre V8",
    drivers: [],
    headline: "The first carbon-fibre monocoque.",
    intro: "John Barnard's MP4/1 introduced carbon-fibre composite construction to Formula One.",
    context: [
      "John Watson won the 1981 British Grand Prix in the MP4/1. Within a few years every team built carbon monocoques.",
    ],
    design: [
      "Carbon composite is far stiffer and lighter than aluminium. It also proved remarkably strong in crashes, transforming driver safety.",
    ],
    innovations: ["Carbon-fibre composite monocoque"],
  },
  {
    slug: "mclaren-mp4-4",
    name: "McLaren MP4/4",
    team: "McLaren",
    teamSlug: "mclaren",
    seasons: "1988",
    year: 1988,
    era: "1980s",
    generation: "turbo",
    regulation: "1.5-litre turbo (final year)",
    tone: "red",
    designer: "Steve Nichols, Gordon Murray and team",
    engine: "Honda RA168E 1.5-litre turbocharged V6",
    drivers: ["ayrton-senna", "alain-prost"],
    headline: "Fifteen wins from sixteen races.",
    intro: "Driven by Senna and Prost, the MP4/4 is one of the most dominant cars in Formula One history.",
    context: [
      "In the final year of turbos, with boost and fuel restricted, Honda's engine and McLaren's low chassis were unbeatable. Senna won the title from Prost.",
    ],
    design: [
      "An extremely low-slung chassis, with the driver almost lying down, reduced the car's height and improved airflow to the rear wing.",
    ],
    innovations: ["Very low-line chassis", "Fuel-efficient turbo engine"],
  },
  {
    slug: "williams-fw14b",
    name: "Williams FW14B",
    team: "Williams",
    teamSlug: "williams",
    seasons: "1992",
    year: 1992,
    era: "1990s",
    generation: "v10-v8",
    regulation: "3.5-litre naturally aspirated",
    tone: "navy",
    designer: "Adrian Newey and Patrick Head",
    engine: "Renault 3.5-litre V10",
    drivers: ["nigel-mansell"],
    headline: "The high point of electronic driver aids.",
    intro: "Active suspension, traction control and a semi-automatic gearbox made the FW14B the most technologically advanced car of its time.",
    context: [
      "Nigel Mansell won the first five races of 1992 and the championship with the FW14B. Most of its electronic systems were banned for 1994.",
    ],
    design: [
      "Computer-controlled hydraulic actuators kept the car at a constant ride height, maintaining the ideal aerodynamic platform through every corner.",
    ],
    innovations: ["Active suspension", "Traction control", "Semi-automatic gearbox"],
  },
  {
    slug: "ferrari-f2004",
    name: "Ferrari F2004",
    team: "Ferrari",
    teamSlug: "ferrari",
    seasons: "2004",
    year: 2004,
    era: "2000s",
    generation: "v10-v8",
    regulation: "3.0-litre V10",
    tone: "red",
    designer: "Rory Byrne and Ross Brawn's technical team",
    engine: "Ferrari 3.0-litre V10",
    drivers: ["michael-schumacher"],
    headline: "The peak of the V10 era.",
    intro: "The F2004 carried Michael Schumacher to his seventh and final title, the end of Ferrari's five-year run.",
    context: [
      "Schumacher won 12 of the first 13 races of 2004. The car represents the high point of the V10 era and Bridgestone's tyre partnership with Ferrari.",
    ],
    design: [
      "A refined evolution of Ferrari's championship-winning cars, with a screaming V10 approaching 19,000 rpm.",
    ],
    innovations: ["Integrated tyre development", "High-revving V10"],
  },
  {
    slug: "brawn-bgp-001",
    name: "Brawn BGP 001",
    team: "Brawn GP",
    teamSlug: "brawn",
    seasons: "2009",
    year: 2009,
    era: "2000s",
    generation: "v10-v8",
    regulation: "2.4-litre V8, KERS permitted",
    tone: "silver",
    engine: "Mercedes-Benz FO 108W 2.4-litre V8",
    drivers: ["jenson-button"],
    headline: "The double diffuser.",
    intro: "Designed by Honda's staff and raced by a team saved weeks before the season, the BGP 001 won both 2009 titles.",
    context: [
      "After Honda withdrew, the team gained a Mercedes engine and arrived late to testing — then won six of the first seven races with Jenson Button.",
    ],
    design: [
      "Its double-deck diffuser exploited a gap in the new rules to generate far more rear downforce than rivals expected. After protests, it was declared legal and quickly copied.",
    ],
    innovations: ["Double diffuser"],
  },
  {
    slug: "mercedes-w05",
    name: "Mercedes F1 W05 Hybrid",
    team: "Mercedes",
    teamSlug: "mercedes",
    seasons: "2014",
    year: 2014,
    era: "2010s",
    generation: "hybrid",
    regulation: "1.6-litre V6 turbo-hybrid",
    tone: "silver",
    engine: "Mercedes PU106A Hybrid 1.6-litre V6 turbo with MGU-K and MGU-H",
    drivers: ["lewis-hamilton", "nico-rosberg"],
    headline: "The beginning of a dynasty.",
    intro: "Mercedes mastered the first turbo-hybrid regulations and the W05 won 16 of 19 races in 2014.",
    context: [
      "Lewis Hamilton won the 2014 title from team-mate Nico Rosberg. It was the first of eight consecutive constructors' titles for Mercedes.",
    ],
    design: [
      "Mercedes split the turbocharger — compressor at the front of the engine, turbine at the back, connected by a shaft through the V — improving packaging and efficiency.",
    ],
    innovations: ["Split turbocharger layout", "Energy recovery integration"],
  },
  {
    slug: "red-bull-rb19",
    name: "Red Bull RB19",
    team: "Red Bull Racing",
    teamSlug: "red-bull",
    seasons: "2023",
    year: 2023,
    era: "2020s",
    generation: "modern-ground-effect",
    regulation: "Ground-effect aerodynamics, 1.6-litre V6 turbo-hybrid",
    tone: "navy",
    designer: "Adrian Newey and Pierre Waché's technical team",
    engine: "Honda RBPT 1.6-litre V6 turbo-hybrid",
    drivers: ["max-verstappen"],
    headline: "21 wins from 22 races.",
    intro: "The most dominant car of the ground-effect era — winning every Grand Prix of 2023 but one.",
    context: [
      "Max Verstappen won 19 races in the RB19 and Sergio Pérez two. Only Carlos Sainz's Ferrari in Singapore broke the sequence.",
    ],
    design: [
      "Red Bull's understanding of ground-effect floors gave stable downforce across ride heights, along with exceptional DRS efficiency.",
    ],
    innovations: ["Floor and suspension platform control", "DRS efficiency"],
  },
];

export function getCar(slug: string) {
  return CARS.find((c) => c.slug === slug);
}

export function carsForYear(year: number) {
  return CARS.filter((c) => {
    const [a, b] = c.seasons.split("–").map(Number);
    return year >= a && year <= (b || a);
  });
}
