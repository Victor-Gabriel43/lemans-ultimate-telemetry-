import type { EraId, Milestone, Tone } from "./types";

export type Era = {
  id: EraId;
  slug: string;
  decade: string;
  start: number;
  end: number;
  name: string;
  tagline: string;
  tone: Tone;
  intro: string;
  context: string[];
  technology: string[];
  developments: Milestone[];
  drivers: string[]; // driver slugs
  teams: string[]; // team slugs
  cars: string[]; // car slugs
  /** Short phrases that define the decade — used on cards. */
  themes: string[];
};

export const ERAS: Era[] = [
  {
    id: "1950s",
    slug: "1950s",
    decade: "1950s",
    start: 1950,
    end: 1959,
    name: "The Founding Years",
    tagline: "Front-engined giants, open roads and the birth of a world championship.",
    tone: "red",
    themes: ["Front-engined cars", "Pre-war manufacturers", "Fangio's five titles"],
    intro:
      "The FIA Formula One World Championship for Drivers began at Silverstone on 13 May 1950. For a decade, it was a championship of heavy front-engined cars, open circuits with few protections, and drivers who were often older, wealthy amateurs or seasoned pre-war professionals.",
    context: [
      "Grand Prix racing existed long before 1950. What changed was organisation: for the first time, a series of national Grands Prix counted toward a single world title for drivers. Europe was still rebuilding after the Second World War, and many of the first competitive cars were developments of pre-war designs.",
      "The calendar was short and mostly European. The Indianapolis 500 was formally part of the championship from 1950 to 1960, although very few drivers contested both it and the European rounds.",
      "Racing was extraordinarily dangerous. Circuits used public roads lined with trees, walls and spectators; seat belts were rarely worn and helmets offered little protection. Many of the era's greatest drivers lost their lives in racing accidents.",
    ],
    technology: [
      "Cars placed the engine in front of the driver, driving the rear wheels through a long propeller shaft. Tyres were narrow, aerodynamics were barely considered beyond a smooth body, and drum brakes were standard for most of the decade before disc brakes spread from sports-car racing.",
      "Regulations changed engine formulae several times: supercharged 1.5-litre and unsupercharged 4.5-litre engines at first, Formula Two rules in 1952–53, then 2.5-litre engines from 1954. Mercedes-Benz arrived in 1954 with the W196, bringing fuel injection and desmodromic valve gear to the grid.",
      "By the end of the decade, small British teams had shown that placing the engine behind the driver produced a lighter, more agile car. That idea would reshape the sport.",
    ],
    developments: [
      { year: "1950", title: "The first World Championship race", text: "The British Grand Prix at Silverstone opens the championship. Alfa Romeo's 158 dominates the season and Giuseppe Farina becomes the first world champion." },
      { year: "1952", title: "Formula Two rules", text: "With too few competitive Formula One cars available, the championship is run to Formula Two regulations for 1952 and 1953. Alberto Ascari and Ferrari win both titles." },
      { year: "1954", title: "Mercedes-Benz returns", text: "A new 2.5-litre formula begins and Mercedes-Benz enters with the W196. Juan Manuel Fangio wins the title, having started the year with Maserati." },
      { year: "1955", title: "Mercedes withdraws", text: "After a second title with Fangio, Mercedes-Benz withdraws from motor racing at the end of a season overshadowed by the Le Mans disaster." },
      { year: "1957", title: "Fangio's fifth title", text: "Fangio wins his fifth championship, with Maserati — a record that would stand for 46 years." },
      { year: "1958", title: "A championship for constructors", text: "The International Cup for F1 Manufacturers is introduced. Vanwall wins it; Mike Hawthorn becomes Britain's first world champion with Ferrari." },
      { year: "1959", title: "The rear-engined revolution", text: "Jack Brabham and Cooper win both championships with a mid-engined car, signalling the end of the front-engined era." },
    ],
    drivers: ["giuseppe-farina", "juan-manuel-fangio", "alberto-ascari", "stirling-moss", "mike-hawthorn", "jack-brabham"],
    teams: ["alfa-romeo", "ferrari", "maserati", "mercedes", "vanwall", "cooper"],
    cars: ["alfa-romeo-158", "mercedes-w196", "cooper-t51"],
  },
  {
    id: "1960s",
    slug: "1960s",
    decade: "1960s",
    start: 1960,
    end: 1969,
    name: "The Garagistes",
    tagline: "Small British teams, monocoques and the engine that changed everything.",
    tone: "green",
    themes: ["Rear-engined cars", "Monocoque chassis", "Cosworth DFV"],
    intro:
      "The 1960s belonged to engineers who built light, rear-engined cars in small workshops — the teams Enzo Ferrari dismissed as garagistes. Lotus, Cooper, BRM and Brabham turned British engineering into the centre of Formula One.",
    context: [
      "Engine capacity was cut to 1.5 litres from 1961, which Ferrari prepared for best: Phil Hill became the first American world champion in the shark-nosed Ferrari 156. The British teams adapted and dominated the rest of the small-engine years.",
      "Jim Clark and Lotus became the defining partnership of the decade. Clark won titles in 1963 and 1965 and was widely considered the fastest driver of his generation until his death in a Formula Two race at Hockenheim in 1968.",
      "Towards the end of the decade the sport changed commercially. From 1968, teams were allowed to carry sponsors' colours rather than national racing colours — Lotus appeared in the red, white and gold of a tobacco brand — and the modern sponsored Formula One team was born.",
    ],
    technology: [
      "The Lotus 25 of 1962 replaced the traditional tubular space frame with a monocoque: a stressed, aircraft-style structure that was lighter and stiffer. Within a few years every serious team followed.",
      "A new 3-litre formula began in 1966. In 1967 the Ford-funded Cosworth DFV V8 made its debut in the Lotus 49 and won first time out. Because the DFV was a stressed member of the chassis and was sold to customer teams, it would power cars to championships for well over a decade.",
      "Aerodynamic wings arrived in 1968. Early wings were mounted high on tall struts directly to the suspension; several failures led to them being restricted in 1969, but downforce had become a central part of car design.",
    ],
    developments: [
      { year: "1961", title: "The 1.5-litre formula", text: "Engine capacity is reduced. Ferrari's 156 dominates and Phil Hill wins the title in a season marred by the death of his team-mate Wolfgang von Trips at Monza." },
      { year: "1962", title: "The monocoque arrives", text: "Colin Chapman's Lotus 25 introduces a monocoque chassis to Formula One." },
      { year: "1964", title: "Two wheels and four", text: "John Surtees wins the title with Ferrari, becoming the only world champion on both motorcycles and in Formula One." },
      { year: "1966", title: "Brabham's own car", text: "Jack Brabham wins the championship in a car bearing his own name — a feat no other driver has repeated." },
      { year: "1967", title: "The Cosworth DFV", text: "The DFV debuts in the Lotus 49 at the Dutch Grand Prix and Jim Clark wins first time out." },
      { year: "1968", title: "Sponsorship and wings", text: "Commercial liveries replace national colours and wings appear. Graham Hill takes the title for Lotus after Clark's death." },
      { year: "1969", title: "Stewart and Matra", text: "Jackie Stewart wins his first title in a Matra run by Ken Tyrrell's team." },
    ],
    drivers: ["jim-clark", "graham-hill", "john-surtees", "jack-brabham", "denny-hulme", "jackie-stewart", "phil-hill"],
    teams: ["lotus", "cooper", "brm", "brabham", "ferrari", "matra"],
    cars: ["lotus-25", "lotus-49"],
  },
  {
    id: "1970s",
    slug: "1970s",
    decade: "1970s",
    start: 1970,
    end: 1979,
    name: "Wings, Wedges and Ground Effect",
    tagline: "Aerodynamics take over, safety becomes a cause, and Formula One goes global.",
    tone: "gold",
    themes: ["Wedge-shaped cars", "Safety campaigns", "Ground effect"],
    intro:
      "In the 1970s Formula One became a global television sport and an aerodynamic laboratory. Cars grew wings, sidepods and finally ground-effect underbodies, while drivers such as Jackie Stewart forced the sport to confront its appalling safety record.",
    context: [
      "Jochen Rindt became the sport's only posthumous champion in 1970, killed in practice at Monza after building an unbeatable points lead in the Lotus 72. Stewart, already champion in 1969, added titles in 1971 and 1973 and campaigned relentlessly for barriers, medical facilities and safer circuits.",
      "Ferrari rebuilt around Niki Lauda and the 312T. In 1976 Lauda suffered life-threatening burns at the Nürburgring, returned six weeks later, and lost the championship to James Hunt by a single point at a rain-soaked final race in Japan.",
      "Bernie Ecclestone, owner of Brabham, began organising the teams collectively to negotiate with circuits and broadcasters, laying the foundations of the sport's modern commercial structure.",
    ],
    technology: [
      "The Lotus 72 moved radiators to the sides of the car and adopted a wedge profile — a template followed by most teams. Teams experimented boldly: Tyrrell raced a six-wheeled car, the P34, and won with it in 1976.",
      "Lotus discovered ground effect: shaping the underside of the car like an inverted wing, sealed with sliding skirts, to create enormous downforce with little drag. The Lotus 79 won the 1978 titles; Brabham's BT46B 'fan car' won its only race before being withdrawn.",
      "Renault introduced the turbocharged 1.5-litre engine in 1977. It was unreliable at first, but its first victory at the 1979 French Grand Prix announced the turbo era.",
    ],
    developments: [
      { year: "1970", title: "The Lotus 72", text: "A new design language — wedge nose, side radiators. Rindt wins the title posthumously." },
      { year: "1973", title: "Stewart's third title", text: "Jackie Stewart wins his third championship and retires, his campaign for safety having changed the sport." },
      { year: "1976", title: "Lauda and Hunt", text: "Lauda survives his Nürburgring crash; Hunt wins the title by one point. Tyrrell's six-wheeler wins in Sweden." },
      { year: "1977", title: "Turbo and ground effect", text: "Renault debuts the turbo engine, and the Lotus 78 introduces ground-effect aerodynamics." },
      { year: "1978", title: "The Lotus 79", text: "Mario Andretti wins the title in the ground-effect Lotus 79. Professor Sid Watkins begins his long tenure as the sport's medical delegate." },
      { year: "1979", title: "First turbo victory", text: "Renault wins its home Grand Prix in Dijon; Williams scores its first win at Silverstone. Jody Scheckter wins the title for Ferrari." },
    ],
    drivers: ["jochen-rindt", "jackie-stewart", "emerson-fittipaldi", "niki-lauda", "james-hunt", "mario-andretti", "jody-scheckter"],
    teams: ["lotus", "tyrrell", "ferrari", "mclaren", "brabham", "renault"],
    cars: ["lotus-72", "ferrari-312t", "tyrrell-p34", "lotus-79", "brabham-bt46b", "renault-rs01"],
  },
  {
    id: "1980s",
    slug: "1980s",
    decade: "1980s",
    start: 1980,
    end: 1989,
    name: "The Turbo Years",
    tagline: "Carbon fibre, extraordinary horsepower and the great rivalries.",
    tone: "orange",
    themes: ["Turbocharged engines", "Carbon-fibre chassis", "Prost and Senna"],
    intro:
      "The 1980s began in political conflict and ended with the most famous rivalry in Formula One. In between came carbon-fibre chassis, turbocharged engines producing unprecedented power in qualifying trim, and the rise of McLaren, Williams and Honda.",
    context: [
      "The decade opened with a power struggle between the governing body (FISA) and the teams' association (FOCA). The first Concorde Agreement, signed in 1981, settled how the sport would be governed and how its commercial revenues would be shared.",
      "Gilles Villeneuve, adored for his commitment, was killed in qualifying at Zolder in 1982. That season had eleven different race winners and Keke Rosberg won the title with a single victory.",
      "Alain Prost and Ayrton Senna became team-mates at McLaren in 1988. Their rivalry — technical precision against raw speed, culminating in a collision at Suzuka in 1989 — defined the end of the decade.",
    ],
    technology: [
      "McLaren's MP4/1 of 1981 introduced the carbon-fibre composite monocoque, far stronger and lighter than aluminium. It transformed both performance and driver safety and became universal.",
      "Turbocharged 1.5-litre engines took over. Nelson Piquet won the 1983 title in the BMW-powered Brabham BT52, the first turbo champion. Regulators progressively restricted boost pressure and fuel, then banned turbos after 1988.",
      "Ground-effect skirts were banned and flat bottoms made mandatory from 1983. In 1989 the sport switched to 3.5-litre naturally aspirated engines, and the semi-automatic gearbox appeared on Ferrari's 640 the same year.",
    ],
    developments: [
      { year: "1981", title: "Carbon fibre and Concorde", text: "The McLaren MP4/1 debuts the carbon monocoque; the Concorde Agreement ends the FISA–FOCA war." },
      { year: "1983", title: "First turbo champion", text: "Nelson Piquet and Brabham-BMW win the drivers' title with a turbo engine." },
      { year: "1984", title: "Half a point", text: "Niki Lauda beats team-mate Alain Prost to the title by half a point — the smallest margin in championship history." },
      { year: "1986", title: "Adelaide", text: "Nigel Mansell's tyre fails in the final race and Prost retains his title." },
      { year: "1988", title: "McLaren-Honda", text: "The MP4/4 wins 15 of 16 races. Senna wins his first championship." },
      { year: "1989", title: "Turbos banned", text: "The 3.5-litre naturally aspirated formula begins; Prost and Senna collide at Suzuka and Prost takes the title." },
    ],
    drivers: ["nelson-piquet", "alain-prost", "ayrton-senna", "niki-lauda", "keke-rosberg", "nigel-mansell", "gilles-villeneuve", "alan-jones"],
    teams: ["mclaren", "williams", "brabham", "ferrari", "lotus", "renault"],
    cars: ["mclaren-mp4-1", "mclaren-mp4-4"],
  },
  {
    id: "1990s",
    slug: "1990s",
    decade: "1990s",
    start: 1990,
    end: 1999,
    name: "Electronics and a Reckoning",
    tagline: "Active suspension, the tragedy of Imola, and the modern safety era.",
    tone: "blue",
    themes: ["Driver aids", "Imola 1994", "Schumacher's rise"],
    intro:
      "The early 1990s produced the most technologically sophisticated cars Formula One had seen, full of electronic driver aids. Then, in 1994, the deaths of Roland Ratzenberger and Ayrton Senna at Imola forced a fundamental rethink of safety that shapes the sport to this day.",
    context: [
      "Senna won his second and third titles in 1990 and 1991. Williams and Renault then built the dominant car of the early decade, carrying Nigel Mansell to the 1992 title and Alain Prost to his fourth in 1993.",
      "Electronic aids were banned for 1994, and in-race refuelling returned. At the San Marino Grand Prix, Ratzenberger died in qualifying and Senna in the race. The FIA responded with sweeping changes to cars and circuits.",
      "Michael Schumacher won titles with Benetton in 1994 and 1995, then moved to Ferrari in 1996 to rebuild the team. Damon Hill (1996) and Jacques Villeneuve (1997) won for Williams; Mika Häkkinen won in 1998 and 1999 for McLaren-Mercedes.",
    ],
    technology: [
      "Active suspension, traction control, anti-lock brakes and semi-automatic gearboxes reached their peak in the Williams FW14B and FW15C. Most driver aids were banned for 1994.",
      "After Imola, the FIA introduced higher cockpit sides, tougher crash tests, reduced engine capacity (3.0 litres from 1995), pit-lane speed limits and changes to dangerous corners at many circuits.",
      "In 1998, cars became narrower and grooved tyres replaced slicks — both measures intended to reduce cornering speeds.",
    ],
    developments: [
      { year: "1990", title: "Suzuka again", text: "Senna and Prost collide at the first corner in Japan; Senna wins the title." },
      { year: "1992", title: "Active suspension", text: "Nigel Mansell wins the title in the Williams FW14B." },
      { year: "1994", title: "Imola", text: "Roland Ratzenberger and Ayrton Senna are killed. Schumacher wins his first title after a collision with Damon Hill in Adelaide." },
      { year: "1995", title: "3.0-litre engines", text: "Engine capacity is reduced as part of the post-Imola safety package." },
      { year: "1996", title: "Schumacher joins Ferrari", text: "Damon Hill becomes champion, the first son of a world champion to win the title." },
      { year: "1998", title: "Narrow cars, grooved tyres", text: "New rules cut grip; Mika Häkkinen wins the first of two titles with McLaren-Mercedes." },
    ],
    drivers: ["ayrton-senna", "alain-prost", "nigel-mansell", "michael-schumacher", "damon-hill", "jacques-villeneuve", "mika-hakkinen"],
    teams: ["williams", "mclaren", "benetton", "ferrari"],
    cars: ["williams-fw14b"],
  },
  {
    id: "2000s",
    slug: "2000s",
    decade: "2000s",
    start: 2000,
    end: 2009,
    name: "The Manufacturer Era",
    tagline: "Ferrari's dynasty, the tyre war and a season of radical rules.",
    tone: "navy",
    themes: ["Ferrari dominance", "Manufacturer teams", "V10 to V8"],
    intro:
      "The 2000s opened with the most successful driver-team partnership the sport had yet seen — Michael Schumacher and Ferrari — and were shaped by car manufacturers who bought or built entire teams, spending at levels never seen before.",
    context: [
      "Schumacher won five consecutive titles with Ferrari from 2000 to 2004, taking his total to a record seven. Fernando Alonso and Renault ended that run in 2005 and 2006.",
      "BMW, Honda, Toyota, Renault, Mercedes-Benz and Ferrari all had major works involvement. When the global financial crisis struck, Honda withdrew at the end of 2008; its team was rescued and became Brawn GP.",
      "Lewis Hamilton arrived in 2007 and won the 2008 championship by a single point on the final lap in Brazil. The same year Singapore hosted Formula One's first night race.",
    ],
    technology: [
      "Michelin and Bridgestone fought a tyre war until 2006; the conflict culminated in only six cars starting the 2005 United States Grand Prix. A single tyre supplier followed from 2007.",
      "Engines changed from 3.0-litre V10s to 2.4-litre V8s in 2006. Engine life requirements and development freezes were introduced to control costs.",
      "In 2009 the rules were rewritten: slick tyres returned, aerodynamics were simplified to aid overtaking, and the Kinetic Energy Recovery System (KERS) was permitted — Formula One's first hybrid technology. Brawn GP's double diffuser exploited the new rules and won both championships.",
    ],
    developments: [
      { year: "2000", title: "Ferrari's first drivers' title in 21 years", text: "Schumacher wins with Ferrari, beginning a five-year run." },
      { year: "2004", title: "The record seventh", text: "Schumacher wins his seventh title, surpassing Fangio's five." },
      { year: "2005", title: "Alonso and the tyre war", text: "Alonso becomes the then-youngest champion. Only six cars start at Indianapolis." },
      { year: "2006", title: "V8 engines", text: "Engines shrink to 2.4-litre V8s. Alonso and Renault win again." },
      { year: "2008", title: "Night racing", text: "Singapore hosts the first night race; Hamilton wins the title by a point." },
      { year: "2009", title: "Brawn GP", text: "A team rescued from Honda's withdrawal wins both championships with Jenson Button." },
    ],
    drivers: ["michael-schumacher", "fernando-alonso", "kimi-raikkonen", "lewis-hamilton", "jenson-button"],
    teams: ["ferrari", "renault", "mclaren", "brawn", "williams"],
    cars: ["ferrari-f2004", "brawn-bgp-001"],
  },
  {
    id: "2010s",
    slug: "2010s",
    decade: "2010s",
    start: 2010,
    end: 2019,
    name: "The Hybrid Revolution",
    tagline: "Red Bull's aero mastery, then the most efficient racing engines ever built.",
    tone: "teal",
    themes: ["Red Bull's four titles", "Turbo-hybrid power units", "Mercedes dynasty"],
    intro:
      "The 2010s were split by a technical revolution. Red Bull and Sebastian Vettel dominated the final years of the V8 era with aerodynamic excellence; then, in 2014, Formula One adopted turbocharged hybrid power units, and Mercedes built a dynasty.",
    context: [
      "In-race refuelling was banned from 2010 and the modern points system — 25 points for a win — was introduced. Vettel won four consecutive titles from 2010 to 2013, becoming the youngest champion in history in 2010.",
      "From 2014, Mercedes won every constructors' championship of the decade. Lewis Hamilton won five drivers' titles in the period and Nico Rosberg one, in 2016, before retiring immediately afterwards.",
      "After Jules Bianchi's accident at Suzuka in 2014, the Virtual Safety Car was introduced. In 2017, Liberty Media completed its acquisition of Formula One's commercial rights, beginning a new phase of global growth.",
    ],
    technology: [
      "Pirelli became the sole tyre supplier in 2011, with tyres deliberately designed to degrade and create strategic variety. The Drag Reduction System (DRS) was introduced the same year to help overtaking.",
      "The 2014 power unit combined a 1.6-litre turbocharged V6 with two energy recovery systems — the MGU-K, harvesting braking energy, and the MGU-H, harvesting energy from the turbocharger — reaching thermal efficiencies above 50%.",
      "Cars became wider and faster in 2017. The halo cockpit protection device was made mandatory in 2018 despite initial objections to its appearance.",
    ],
    developments: [
      { year: "2010", title: "No more refuelling", text: "Races are run without refuelling; Vettel wins his first title." },
      { year: "2011", title: "Pirelli and DRS", text: "A new tyre supplier and the Drag Reduction System change race strategy." },
      { year: "2014", title: "The hybrid era", text: "1.6-litre turbo-hybrid power units arrive. Mercedes begins its run of titles." },
      { year: "2015", title: "Virtual Safety Car", text: "A new neutralisation procedure is introduced after Bianchi's accident." },
      { year: "2017", title: "Wider cars", text: "New aerodynamic rules make cars significantly faster. Liberty Media takes over the commercial rights." },
      { year: "2018", title: "The halo", text: "Cockpit protection becomes mandatory on every car." },
    ],
    drivers: ["sebastian-vettel", "lewis-hamilton", "nico-rosberg", "fernando-alonso", "max-verstappen"],
    teams: ["red-bull", "mercedes", "ferrari", "mclaren"],
    cars: ["mercedes-w05"],
  },
  {
    id: "2020s",
    slug: "2020s",
    decade: "2020s",
    start: 2020,
    end: 2029,
    name: "Cost Caps and New Rules",
    tagline: "Ground effect returns, budgets are capped, and 2026 resets the sport.",
    tone: "papaya",
    themes: ["Budget cap", "Ground-effect return", "2026 regulations"],
    intro:
      "The current decade began with a pandemic-shortened season and brought the most significant structural reforms in Formula One's history: a financial cost cap, a return to ground-effect aerodynamics in 2022 and an entirely new car and power-unit formula in 2026.",
    context: [
      "Lewis Hamilton won his seventh title in 2020, equalling Michael Schumacher's record. In 2021, Max Verstappen won his first after a season-long duel decided at the final race in Abu Dhabi.",
      "Verstappen and Red Bull dominated the first years of the ground-effect rules; the RB19 won all but one race in 2023. McLaren then rose to win the constructors' championship in 2024 and 2025, with Lando Norris claiming the 2025 drivers' title.",
      "The grid expands to eleven teams in 2026 with the arrival of Cadillac, while Audi takes over the Sauber team as a full works manufacturer.",
    ],
    technology: [
      "A budget cap introduced in 2021 limits what teams may spend on car performance, while aerodynamic testing allowances are scaled so that less successful teams receive more wind-tunnel and CFD time.",
      "The 2022 rules brought back ground-effect underfloor tunnels and simplified wings to let cars follow each other more closely, with larger 18-inch wheels.",
      "The 2026 regulations introduce smaller, lighter cars with active aerodynamics, power units with a much larger electrical share and no MGU-H, and fuels that must be fully sustainable.",
    ],
    developments: [
      { year: "2020", title: "A season reshaped", text: "The calendar is rebuilt around the pandemic. Hamilton equals Schumacher's seven titles." },
      { year: "2021", title: "Cost cap and sprints", text: "The budget cap begins and the sprint format is trialled. Verstappen wins in Abu Dhabi." },
      { year: "2022", title: "Ground effect returns", text: "Venturi-tunnel floors and 18-inch wheels arrive." },
      { year: "2023", title: "RB19", text: "Red Bull wins 21 of 22 Grands Prix." },
      { year: "2025", title: "McLaren's double", text: "Lando Norris wins the drivers' title as McLaren retains the constructors' championship." },
      { year: "2026", title: "A new formula", text: "Active aero, new power units, sustainable fuels and an eleven-team grid." },
    ],
    drivers: ["max-verstappen", "lewis-hamilton", "lando-norris", "charles-leclerc", "oscar-piastri", "george-russell"],
    teams: ["red-bull", "mercedes", "mclaren", "ferrari", "aston-martin", "audi", "cadillac"],
    cars: ["red-bull-rb19"],
  },
];

export function getEra(slug: string) {
  return ERAS.find((e) => e.slug === slug);
}

export function eraForYear(year: number): Era {
  return ERAS.find((e) => year >= e.start && year <= e.end) ?? ERAS[ERAS.length - 1];
}
