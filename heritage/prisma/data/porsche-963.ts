/**
 * PORSCHE 963 — first complete collection.
 *
 * Research rules applied to this file:
 *  - Every record cites at least one source key from SOURCES.
 *  - "verified"   → confirmed by an official source (manufacturer, team,
 *                   series organiser) or by several independent outlets.
 *  - "reported"   → a single reputable report, or sources that slightly
 *                   disagree; shown with a notice on the site.
 *  - "unverified" → recorded so researchers can confirm it; shown with a
 *                   warning. Never presented as fact.
 *  - Livery colour palettes drive *illustrations* only. They are
 *    approximations and are labelled as such everywhere they render.
 *
 * Research cut-off for this dataset: 9 November 2026.
 */

export type V = "verified" | "reported" | "unverified";

/** Photograph used to open the car's profile and the homepage. */
export const HERO_PHOTO = "porsche963night-cropped.webp";

export const SOURCES: Record<string, { title: string; publisher: string; url: string; kind: string; published?: string }> = {
  "pn-goodwood-2022": { title: "Global quest for Porsche Penske Motorsport with the new 963", publisher: "Porsche Newsroom", url: "https://newsroom.porsche.com/en_US/2022/motorsport/porsche-penske-motorsport-963-presentation-goodwood-lmdh-reglement-fia-wec-imsa-28851.html", kind: "official", published: "2022-06-24" },
  "imsa-goodwood-2022": { title: "Porsche's newest magic number: 963 will be GTP prototype", publisher: "IMSA", url: "https://imsa.com/news/2022/06/24/porsches-newest-magic-number-963-will-be-gtp-prototype", kind: "governing-body", published: "2022-06-24" },
  "goodwood-fos-2022": { title: "Porsche 963 2023 Le Mans challenger revealed at FoS", publisher: "Goodwood Road & Racing", url: "https://www.goodwood.com/grr/event-coverage/festival-of-speed/porsche-963-2023-le-mans-challenger-revealed-at-fos/", kind: "publication", published: "2022-06-24" },
  "pn-20-times": { title: "20 times from Stuttgart to Le Mans and back", publisher: "Porsche Newsroom (Le Mans 2023 press kit)", url: "https://newsroom.porsche.com/en/press-kits/le-mans-2023/20-times-from-Stuttgart-to-Le-Mans-and-back.html", kind: "official", published: "2023-06-01" },
  "pn-dna": { title: "The Porsche 963 banks on powerful DNA from RS Spyder and 918 Spyder", publisher: "Porsche Newsroom (Le Mans 2023 press kit)", url: "https://newsroom.porsche.com/en/press-kits/le-mans-2023/The-Porsche-963-banks-on-powerful-DNA-from-RS-Spyder-and-918-Spyder-.html", kind: "official", published: "2023-06-01" },
  "multimatic-963": { title: "Introducing the Porsche 963 built on the Multimatic chassis", publisher: "Multimatic", url: "https://www.multimatic.com/press/introducing-the-porsche-963-built-on-the-multimatic-chassis/", kind: "official" },
  "wiki-963": { title: "Porsche 963", publisher: "Wikipedia (secondary — used only for cross-checking)", url: "https://en.wikipedia.org/wiki/Porsche_963", kind: "publication" },
  "pn-daytona-2023": { title: "Disappointing race debut for the new Porsche 963 at Daytona", publisher: "Porsche Newsroom", url: "https://newsroom.porsche.com/en/2023/motorsports/porsche-963-imsa-weather-tech-sportscar-championsship-lmdh-round-1-24-hours-daytona-usa-30965.html", kind: "official", published: "2023-01-29" },
  "penske-daytona-2023": { title: "Porsche Penske Motorsport shows strong pace in 24 Hours of Daytona", publisher: "Team Penske", url: "https://www.teampenske.com/news/index.cfm/c/720/54813/Porsche_Penske_Motorsport_Shows_Strong_Pace_in_24_Hours_of_Daytona", kind: "official", published: "2023-01-29" },
  "pn-sebring-wec-2023": { title: "Porsche Penske Motorsport heads to the first WEC race well prepared", publisher: "Porsche Newsroom (Le Mans 2023 press kit)", url: "https://newsroom.porsche.com/en/press-kits/le-mans-2023/WEC-1-Sebring.html", kind: "official", published: "2023-03-13" },
  "pn-longbeach-2023": { title: "Porsche Penske Motorsport celebrates historic first win with the Porsche 963", publisher: "Porsche Newsroom", url: "https://newsroom.porsche.com/en/2023/motorsports/porsche-imsa-weathertech-sportscar-championship-round-3-long-beach-usa-31909.html", kind: "official", published: "2023-04-15" },
  "motorsport-longbeach-2023": { title: "IMSA Long Beach: Porsche 963 takes first win, Taylor crashes", publisher: "Motorsport.com", url: "https://www.motorsport.com/imsa/news/imsa-long-beach-porsche-wins-wild-race-taylor-crashes-out/10456884/", kind: "publication", published: "2023-04-15" },
  "pn-spa-2023": { title: "Three Porsche 963 tackled Spa-Francorchamps for the first time", publisher: "Porsche Newsroom (Le Mans 2023 press kit)", url: "https://newsroom.porsche.com/en/press-kits/le-mans-2023/Three-Porsche-963-tackled-Spa-Francorchamps-for-the-first-time.html", kind: "official", published: "2023-04-29" },
  "thedrive-jota-2023": { title: "Behind the pit wall: Hertz Team Jota's Porsche 963 Hypercar debut at 6 Hours of Spa", publisher: "The Drive", url: "https://www.thedrive.com/news/behind-the-pit-wall-hertz-team-jotas-porsche-963-hypercar-debut-at-6-hours-of-spa", kind: "publication", published: "2023-05-01" },
  "aco-jota-livery-2023": { title: "Hertz Team Jota unveils its Porsche 963 livery", publisher: "24h-lemans.com (ACO)", url: "https://www.24h-lemans.com/en/news/24-hours-of-le-mans-hertz-team-jota-unveils-its-porsche-963-livery-57160", kind: "governing-body", published: "2023-04-01" },
  "stuttcars-jota-2023": { title: "Hertz, Singer and Tom Brady back a Porsche 963 Hypercar at the 100th Le Mans 24 Hours", publisher: "Stuttcars", url: "https://www.stuttcars.com/porsche-963-hypercar-le-mans-24-jota/", kind: "publication" },
  "pn-lemans-livery-2023": { title: "Porsche Penske Motorsport sends three 963 with a special livery to Le Mans", publisher: "Porsche Newsroom", url: "https://newsroom.porsche.com/en/2023/motorsports/porsche-963-special-livery-24-hours-le-mans-32172.html", kind: "official", published: "2023-04-28" },
  "fiawec-lemans-livery-2023": { title: "Porsche Penske reveals special livery for Le Mans", publisher: "FIA WEC", url: "https://www.fiawec.com/en/news/porsche-penske-reveals-special-livery-for-le-mans/7657", kind: "governing-body", published: "2023-04-28" },
  "motorsportmag-stripes": { title: "The hidden history in Porsche's stripy 963 Le Mans livery", publisher: "Motor Sport Magazine", url: "https://www.motorsportmagazine.com/articles/sports-cars/the-hidden-history-in-porsches-stripy-963-le-mans-livery-now-in-132-scale/", kind: "publication" },
  "pn-daytona-2024": { title: "Porsche 963 of Porsche Penske Motorsport victorious after gripping 24 Hours of Daytona", publisher: "Porsche Newsroom", url: "https://newsroom.porsche.com/en_US/2024/motorsport/Porsche_963_of_porsche_penske_motorsport_victorious_after_gripping_24_Hours_of_Daytona.html", kind: "official", published: "2024-01-28" },
  "racer-proton-2024": { title: "Proton reveals throwback look for its WEC Porsche 963", publisher: "RACER", url: "https://racer.com/2024/02/16/proton-reveals-throwback-look-for-its-wec-porsche-963/", kind: "publication", published: "2024-02-16" },
  "fiawec-proton-2024": { title: "Proton Competition and United Autosports reveal 2024 liveries", publisher: "FIA WEC", url: "https://www.fiawec.com/en/news/proton-competition-and-united-autosports-reveal-2024-liveries/7880", kind: "governing-body", published: "2024-02-16" },
  "pn-success-2024": { title: "The success story of the Porsche 963", publisher: "Porsche Newsroom", url: "https://newsroom.porsche.com/en/ppdb/2024/11/the-success-story-of-the-porsche-963.html", kind: "official", published: "2024-11-02" },
  "porsche-wec-2024-review": { title: "WEC 2024 season review", publisher: "Porsche Motorsport", url: "https://racing.porsche.com/articles/wec-2024-season-review", kind: "official" },
  "autosport-fuji-2024": { title: "WEC Fuji: Porsche extends points lead with win, disaster for Toyota", publisher: "Autosport", url: "https://www.autosport.com/wec/news/wec-fuji-porsche-extends-points-lead-with-win-disaster-for-toyota/10654423/", kind: "publication", published: "2024-09-15" },
  "pn-lemans-pole-2024": { title: "Kévin Estre plants Porsche 963 on pole position at Le Mans", publisher: "Porsche Newsroom", url: "https://newsroom.porsche.com/en_AU/2024/motorsports/porsche-fia-world-endurance-championship-wec-race-4-le-mans-france-36509.html", kind: "official", published: "2024-06-13" },
  "porsche-lemans-2024-report": { title: "Le Mans 2024 race report", publisher: "Porsche Motorsport", url: "https://racing.porsche.com/articles/le-mans-2024-race-report", kind: "official", published: "2024-06-16" },
  "pn-imsa-2024-titles": { title: "Nine titles for Porsche in the 2024 IMSA Championship", publisher: "Porsche Newsroom", url: "https://newsroom.porsche.com/en/2024/motorsports/porsche-imsa-weathertech-sportscar-championship-race-11-road-atlanta-37516.html", kind: "official", published: "2024-10-12" },
  "penske-2024-review": { title: "Porsche Penske Motorsport 2024 IMSA season review", publisher: "Team Penske", url: "https://www.teampenske.com/news/index.cfm/c/726/55183/Porsche_Penske_Motorsport_2024_IMSA_Season_Review", kind: "official" },
  "pn-daytona-2025": { title: "Porsche claims 20th victory at the 24 Hours of Daytona", publisher: "Porsche Newsroom", url: "https://newsroom.porsche.com/en_US/2025/motorsport/Porsche-claims-20th-victory-at-the-24-Hours-of-Daytona-38484.html", kind: "official", published: "2025-01-26" },
  "pn-963rsp": { title: "Von der Rennstrecke auf die Strasse: Der Porsche 963 RSP", publisher: "Porsche Newsroom", url: "https://newsroom.porsche.com/de_CH/2025/motorsport/porsche-963-rsp-einzelstueck-39691.html", kind: "official", published: "2025-06-06" },
  "aco-963rsp": { title: "Porsche introduces a road-legal version of the 963 Hypercar", publisher: "24h-lemans.com (ACO)", url: "https://www.24h-lemans.com/en/news/porsche-introduces-a-road-legal-version-of-the-963-hypercar-59677", kind: "governing-body", published: "2025-06-06" },
  "motor1-963rsp": { title: "963 RSP revealed: meet Porsche's street-legal Le Mans hypercar", publisher: "Motor1", url: "https://www.motor1.com/news/761849/porsche-963-rsp-reveal/", kind: "publication", published: "2025-06-06" },
  "penske-lemans-2025": { title: "FIA World Endurance Championship, Round 4, Le Mans", publisher: "Team Penske", url: "https://www.teampenske.com/news/index.cfm/c/731/55301/FIA_World_Endurance_Championship_WEC,_Round_4,_Le_Mans", kind: "official", published: "2025-06-15" },
  "fia-cota-2025": { title: "WEC: Porsche takes first victory of season at COTA", publisher: "FIA", url: "https://www.fia.com/news/wec-porsche-takes-first-victory-season-cota", kind: "governing-body", published: "2025-09-07" },
  "racer-cota-2025": { title: "No. 6 Porsche wins wet and wild Lone Star Le Mans at COTA", publisher: "RACER", url: "https://racer.com/2025/09/07/no-6-porsche-wins-wet-and-wild-lone-star-le-mans-at-cota", kind: "publication", published: "2025-09-07" },
  "autosport-wec-exit": { title: "Porsche confirms WEC departure but keeps IMSA programme", publisher: "Autosport", url: "https://www.autosport.com/wec/news/porsche-confirms-wec-departure-but-keeps-imsa-programme/10765984/", kind: "publication", published: "2025-10-01" },
  "porsche-wec-2025-review": { title: "WEC season review 2025", publisher: "Porsche Motorsport", url: "https://racing.porsche.com/articles/wec-season-review-2025", kind: "official" },
  "racer-bahrain-2025": { title: "Toyota closes WEC season on much-needed high with Bahrain 8 Hour domination", publisher: "RACER", url: "https://racer.com/2025/11/08/Toyota-closes-WEC-season-on-much-needed-high-with-Bahrain-8-Hour-domination", kind: "publication", published: "2025-11-08" },
  "pn-imsa-2025-titles": { title: "Porsche defends all titles in the 2025 IMSA Championship", publisher: "Porsche Newsroom", url: "https://newsroom.porsche.com/en/ppdb/2025/10/porsche-defends-all-titles-in-the-2025-imsa-championship.html", kind: "official", published: "2025-10-11" },
  "penske-2025-review": { title: "Porsche Penske Motorsport 2025 IMSA season review", publisher: "Team Penske", url: "https://www.teampenske.com/news/index.cfm/c/730/55422/Porsche_Penske_Motorsport_2025_IMSA_Season_Review", kind: "official" },
  "imsa-jdc-2025": { title: "JDC-Miller MotorSports Porsche GTP confirmed for 2025 season", publisher: "IMSA", url: "https://www.imsa.com/news/2024/09/11/jdc-miller-motorsports-porsche-gtp-confirmed-for-2025-season/", kind: "governing-body", published: "2024-09-11" },
  "commons-jdc-2023": { title: "Porsche 963 of JDC-Miller MotorSports, Watkins Glen 2023 (photograph and caption)", publisher: "Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:JDC_Porsche_963_WGI23_07.jpg", kind: "publication", published: "2023-06-23" },
  "commons-proton-2023": { title: "No. 99 Porsche 963 during the 2023 6 Hours of Monza (photograph)", publisher: "Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:99_Porsche_963_during_2023_Monza_6h_2.jpg", kind: "publication", published: "2023-07-09" },
  "commons-proton-wgi-2024": { title: "Porsche 963 of Proton Competition, Watkins Glen 2024 (photograph and caption)", publisher: "Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Proton_963_WGI24_04.jpg", kind: "publication", published: "2024-06-23" },
  "racer-proton-exit": { title: "Proton forced to shutter privateer Porsche 963 program in FIA WEC", publisher: "RACER", url: "https://racer.com/2025/12/05/proton-forced-to-shutter-privateer-porsche-963-program-in-fia-wec", kind: "publication", published: "2025-12-05" },
  "pn-daytona-2026-preview": { title: "Nine Porsche race cars tackle the 24 Hours of Daytona", publisher: "Porsche Newsroom", url: "https://newsroom.porsche.com/en_US/2026/motorsport/nine-porsche-race-cars-tackle-the-24-hours-of-daytona.html", kind: "official", published: "2026-01-20" },
  "pn-daytona-2026": { title: "Another victory for Porsche Penske Motorsport at the 24 Hours of Daytona", publisher: "Porsche Newsroom", url: "https://newsroom.porsche.com/en_US/2026/motorsport/another-victory-for-porsche-penske-motorsport-at-the-24-hours-of-daytona-41604.html", kind: "official", published: "2026-01-25" },
  "racer-sebring-livery-2026": { title: "Porsche Penske Motorsport reveals special Sebring Mobil 1 throwback livery", publisher: "RACER", url: "https://racer.com/2026/03/17/porsche-penske-motorsport-reveals-special-sebring-mobil-1-throwback-livery", kind: "publication", published: "2026-03-17" },
  "pn-serial-winner-2026": { title: "Consistent development makes the Porsche 963 a serial winner", publisher: "Porsche Newsroom", url: "https://newsroom.porsche.com/en_US/2026/motorsport/porsche-imsa-weathertech-sportscar-championship-963-consistent-development-serial-winner-42117.html", kind: "official", published: "2026-04-01" },
  "pn-longbeach-2026": { title: "Porsche 963 takes Apple Music's colours to Long Beach", publisher: "Porsche Newsroom", url: "https://newsroom.porsche.com/en/2026/motorsports/porsche-imsa-weathertech-sportscar-championship-preview-long-beach-42159.html", kind: "official", published: "2026-04-14" },
  "pn-laguna-2026": { title: "Porsche will contest Laguna Seca in historic colors of the Apple Computer livery", publisher: "Porsche Newsroom", url: "https://newsroom.porsche.com/en_US/2026/motorsport/porsche-will-contest-laguna-seca-in-historic-colors-of-the-apple-computer-livery.html", kind: "official", published: "2026-04-29" },
  "porsche-apple-story": { title: "The story behind the livery of an iconic partnership between Porsche Motorsport and Apple", publisher: "Porsche", url: "https://www.porsche.com/stories/culture/porsche-963-in-apple-computer-livery-images/", kind: "official", published: "2026-04-30" },
  "pn-watkins-2026": { title: "Porsche secures a podium finish for the 963 and a one-two in the GT class at Watkins Glen", publisher: "Porsche Newsroom", url: "https://newsroom.porsche.com/en/ppdb/2026/06/porsche-secures-a-podium-finish-for-the-963-and-a-one-two-in-the-gt-class-at-watkins-glen.html", kind: "official", published: "2026-06-01" },
  "therace-lemans-2026": { title: "Porsche's Le Mans 2026 dilemma: what we've learned so far", publisher: "The Race", url: "https://the-race.com/endurance/porsche-le-mans-2026-dilemma-what-weve-learned-so-far", kind: "publication" },
  "imsa-petit-2026": { title: "Porsche finally takes Motul Petit Le Mans overall win", publisher: "IMSA", url: "https://www.imsa.com/news/2026/october/04/porsche-finally-takes-motul-petit-le-mans-overall-win", kind: "governing-body", published: "2026-10-04" },
  "pn-petit-2026": { title: "Porsche Penske Motorsport wins IWSC season finale, sweeps IMSA Michelin Endurance Championship", publisher: "Porsche Newsroom", url: "https://newsroom.porsche.com/en_US/2026/motorsport/petit-le-mans-2026-43401.html", kind: "official", published: "2026-10-04" },
  "imsa-champions-2026": { title: "IMSA honors all its best at 2026 WeatherTech Night of Champions", publisher: "IMSA", url: "https://www.imsa.com/news/2026/october/05/imsa-honors-all-its-best-at-2026-weathertech-night-of-champions", kind: "governing-body", published: "2026-10-05" },
  "porsche-imsa-2026-review": { title: "A year in highlights: looking back on the 2026 IMSA season", publisher: "Porsche Motorsport", url: "https://racing.porsche.com/en-TH/articles/imsa-2026-season-review", kind: "official" },
};

export const CHAMPIONSHIPS = [
  { slug: "wec", name: "FIA World Endurance Championship", shortName: "WEC", body: "FIA / ACO" },
  { slug: "imsa", name: "IMSA WeatherTech SportsCar Championship", shortName: "IMSA", body: "IMSA" },
  { slug: "exhibition", name: "Exhibitions & demonstrations", shortName: "Exhibition", body: "—" },
];

export const TEAMS = [
  { slug: "porsche-penske-motorsport", name: "Porsche Penske Motorsport", country: "DEU / USA", kind: "factory", description: "Joint factory operation of Porsche Motorsport and Team Penske, running the 963 in both the FIA WEC (2023–2025) and the IMSA WeatherTech SportsCar Championship (2023–present)." },
  { slug: "hertz-team-jota", name: "Hertz Team JOTA", country: "GBR", kind: "customer", description: "British privateer and the first customer to receive a Porsche 963. Debuted the car at the 2023 6 Hours of Spa and won the 2024 FIA World Cup for Hypercar Teams." },
  { slug: "proton-competition", name: "Proton Competition", country: "DEU", kind: "customer", description: "German privateer that ran a customer 963 in the WEC Hypercar class, famously in the F.A.T. colours of the 1994 Le Mans-winning Dauer 962. Announced in December 2025 that it would not field a 963 in 2026." },
  { slug: "jdc-miller-motorsports", name: "JDC-Miller MotorSports", country: "USA", kind: "customer", description: "American privateer that joined the IMSA GTP class with a customer 963 at the fourth round of 2023, and the sole privateer 963 operation on the 2026 IMSA grid." },
];

// [slug, name, nationality]
export const DRIVERS: [string, string, string][] = [
  ["nick-tandy", "Nick Tandy", "GBR"], ["mathieu-jaminet", "Mathieu Jaminet", "FRA"], ["dane-cameron", "Dane Cameron", "USA"],
  ["felipe-nasr", "Felipe Nasr", "BRA"], ["matt-campbell", "Matt Campbell", "AUS"], ["michael-christensen", "Michael Christensen", "DNK"],
  ["frederic-makowiecki", "Frédéric Makowiecki", "FRA"], ["kevin-estre", "Kévin Estre", "FRA"], ["andre-lotterer", "André Lotterer", "DEU"],
  ["laurens-vanthoor", "Laurens Vanthoor", "BEL"], ["josef-newgarden", "Josef Newgarden", "USA"], ["antonio-felix-da-costa", "António Félix da Costa", "PRT"],
  ["will-stevens", "Will Stevens", "GBR"], ["yifei-ye", "Yifei Ye", "CHN"], ["callum-ilott", "Callum Ilott", "GBR"],
  ["norman-nato", "Norman Nato", "FRA"], ["jenson-button", "Jenson Button", "GBR"], ["phil-hanson", "Phil Hanson", "GBR"],
  ["oliver-rasmussen", "Oliver Rasmussen", "DNK"], ["neel-jani", "Neel Jani", "CHE"], ["harry-tincknell", "Harry Tincknell", "GBR"],
  ["julien-andlauer", "Julien Andlauer", "FRA"], ["gianmaria-bruni", "Gianmaria Bruni", "ITA"], ["tijmen-van-der-helm", "Tijmen van der Helm", "NLD"],
  ["nico-pino", "Nico Pino", "CHL"], ["kaylen-frederick", "Kaylen Frederick", "USA"], ["laurin-heinrich", "Laurin Heinrich", "DEU"],
  ["nico-muller", "Nico Müller", "CHE"], ["mike-rockenfeller", "Mike Rockenfeller", "DEU"], ["bent-viscaal", "Bent Viscaal", "NLD"],
];

export const VEHICLE = {
  slug: "porsche-963",
  manufacturer: "porsche",
  model: "963",
  fullName: "Porsche 963 LMDh",
  category: "LMDh — Hypercar (WEC) / GTP (IMSA)",
  era: "modern",
  debutYear: 2023,
  country: "DEU",
  featured: true,
  tagline: "Porsche's return to the top class of endurance racing — one car for Le Mans, Daytona and the world.",
  summary:
    "The 963 is Porsche's prototype built to the LMDh regulations, eligible for the Hypercar class of the FIA World Endurance Championship and the GTP class of the IMSA WeatherTech SportsCar Championship. Developed in Weissach on a Multimatic LMP2-derived chassis and powered by a twin-turbo V8 with a standardised hybrid system, it won the Rolex 24 at Daytona three years in a row (2024–2026), the 2024 WEC Drivers' World Championship and back-to-back IMSA GTP titles in 2024 and 2025.",
  development:
    "The LMDh rule set allowed one car to race for overall victory on both sides of the Atlantic, using a chassis from one of four approved constructors and a spec hybrid system. Porsche chose Multimatic as its chassis partner and partnered with Team Penske to form Porsche Penske Motorsport. The 4.6-litre twin-turbo V8 (internal designation 9RD) traces its lineage to the RS Spyder programme. The car first turned a wheel on 14 January 2022 at the Porsche Development Centre in Weissach, driven by works driver Frédéric Makowiecki and wearing a camouflage wrap. Porsche reported 7,889 test kilometres in the first half of 2022; testing ran on a single chassis until a second car joined the programme at Monza in August 2022.",
  unveiling:
    "Porsche Penske Motorsport revealed the car's name and final race livery at the Goodwood Festival of Speed on 24 June 2022 — a white, red and black works design that Goodwood's coverage linked to Porsche racers from the 919 back to the 1970 Le Mans-winning 917.",
  firstAppearance:
    "Its first public run came at the same Goodwood Festival of Speed in June 2022, with Dane Cameron driving the car up the hill.",
  firstRace:
    "The 963 made its race debut at the 2023 Rolex 24 at Daytona (28–29 January 2023), the first race of the LMDh era. Porsche itself called the debut \"disappointing\": both cars were hit by technical problems. Its WEC debut followed at the 1000 Miles of Sebring in March 2023, and the first victory came on 15 April 2023 at the Grand Prix of Long Beach.",
  background:
    "The 963 marked Porsche's return to the top class of sports-car racing after the 919 Hybrid's LMP1 programme ended in 2017, and the reunion of Porsche and Penske, who had raced together with the RS Spyder in the American Le Mans Series. In October 2025 Porsche confirmed it would end its factory WEC Hypercar programme after the 2025 season as part of a realignment of its motorsport activities, while continuing in IMSA. With Proton Competition also withdrawing, no 963 contested the 2026 24 Hours of Le Mans.",
};

export const VEHICLE_SOURCES = ["pn-goodwood-2022", "pn-20-times", "pn-dna", "goodwood-fos-2022", "pn-daytona-2023", "pn-longbeach-2023", "autosport-wec-exit", "therace-lemans-2026"];

// [group, label, value, verification, sources]
export const SPECS: [string, string, string, V, string[]][] = [
  ["Powertrain", "Engine", "Porsche 9RD twin-turbocharged V8", "verified", ["pn-dna"]],
  ["Powertrain", "Displacement", "4,593 cc (4.6 litres)", "verified", ["pn-dna"]],
  ["Powertrain", "Engine configuration", "90° V8, two turbochargers; lineage traced to the RS Spyder engine", "verified", ["pn-dna"]],
  ["Powertrain", "System power output", "500 kW (680 PS) maximum combined, as set by the LMDh regulations and Balance of Performance", "reported", ["wiki-963", "pn-dna"]],
  ["Hybrid", "Hybrid system", "Spec LMDh hybrid: Bosch motor-generator unit, electronics and software; Williams Advanced Engineering high-voltage battery", "verified", ["pn-dna"]],
  ["Hybrid", "Transmission", "Xtrac 7-speed sequential gearbox (P1359) with integrated MGU", "reported", ["wiki-963"]],
  ["Chassis", "Chassis", "Carbon-fibre monocoque on an LMP2 basis supplied by Multimatic", "verified", ["pn-dna", "multimatic-963"]],
  ["Chassis", "Minimum weight", "1,030 kg", "verified", ["pn-dna"]],
  ["Partners", "Technical partners", "Multimatic (chassis), Bosch (MGU & electronics), Williams Advanced Engineering (battery), Xtrac (gearbox), Michelin (tyres)", "reported", ["pn-dna", "multimatic-963", "wiki-963"]],
];

// Season entries: [team, champ, season, number, drivers[], scope, verification, sources, notes]
export const ENTRIES: [string, string, number, string, string[], string, V, string[], string?][] = [
  ["porsche-penske-motorsport", "imsa", 2023, "6", ["nick-tandy", "mathieu-jaminet"], "full-season", "verified", ["pn-longbeach-2023"]],
  ["porsche-penske-motorsport", "imsa", 2023, "7", ["felipe-nasr", "matt-campbell"], "full-season", "verified", ["pn-longbeach-2023"], "Michael Christensen added for endurance rounds; Dane Cameron joined the #6 at Daytona."],
  ["porsche-penske-motorsport", "wec", 2023, "5", ["dane-cameron", "frederic-makowiecki", "michael-christensen"], "full-season", "verified", ["pn-sebring-wec-2023", "pn-lemans-livery-2023"]],
  ["porsche-penske-motorsport", "wec", 2023, "6", ["kevin-estre", "andre-lotterer", "laurens-vanthoor"], "full-season", "verified", ["pn-lemans-livery-2023"]],
  ["porsche-penske-motorsport", "wec", 2023, "75", ["felipe-nasr", "nick-tandy", "mathieu-jaminet"], "one-off", "verified", ["pn-lemans-livery-2023"], "Third car for the 24 Hours of Le Mans centenary only, crewed by the IMSA drivers."],
  ["hertz-team-jota", "wec", 2023, "38", ["antonio-felix-da-costa", "will-stevens", "yifei-ye"], "full-season", "verified", ["pn-spa-2023", "thedrive-jota-2023"], "Joined from round 3 (6 Hours of Spa) after the customer car was delivered in mid-April 2023."],
  ["jdc-miller-motorsports", "imsa", 2023, "5", ["tijmen-van-der-helm", "mike-rockenfeller"], "full-season", "reported", ["imsa-jdc-2025", "commons-jdc-2023"], "Joined the GTP class at round four of 2023. Raced as No. 5 that year, as captioned in dated photographs from Watkins Glen and Road America; later seasons as No. 85."],
  ["proton-competition", "wec", 2023, "99", [], "one-off", "reported", ["commons-proton-2023"], "Documented by a dated photograph at the 2023 6 Hours of Monza. Full 2023 programme and line-up not yet researched."],
  ["porsche-penske-motorsport", "imsa", 2024, "6", ["mathieu-jaminet", "nick-tandy"], "full-season", "verified", ["pn-imsa-2024-titles"], "Kévin Estre joined for Petit Le Mans."],
  ["porsche-penske-motorsport", "imsa", 2024, "7", ["dane-cameron", "felipe-nasr"], "full-season", "verified", ["pn-imsa-2024-titles", "pn-daytona-2024"], "Josef Newgarden was part of the Daytona-winning crew."],
  ["porsche-penske-motorsport", "wec", 2024, "6", ["kevin-estre", "andre-lotterer", "laurens-vanthoor"], "full-season", "verified", ["pn-success-2024", "pn-lemans-pole-2024"]],
  ["porsche-penske-motorsport", "wec", 2024, "5", ["matt-campbell", "michael-christensen", "frederic-makowiecki"], "full-season", "unverified", ["porsche-wec-2024-review"], "Line-up pending confirmation against the official WEC entry list."],
  ["hertz-team-jota", "wec", 2024, "12", ["will-stevens", "callum-ilott", "norman-nato"], "full-season", "unverified", ["porsche-wec-2024-review"], "Car number and Spa win verified; complete driver line-up pending confirmation."],
  ["hertz-team-jota", "wec", 2024, "38", ["jenson-button", "phil-hanson", "oliver-rasmussen"], "full-season", "unverified", ["porsche-wec-2024-review"], "Line-up pending confirmation against the official WEC entry list."],
  ["proton-competition", "wec", 2024, "99", ["neel-jani", "harry-tincknell", "julien-andlauer"], "full-season", "verified", ["racer-proton-2024", "fiawec-proton-2024"]],
  ["porsche-penske-motorsport", "imsa", 2025, "6", ["matt-campbell", "mathieu-jaminet"], "full-season", "verified", ["pn-imsa-2025-titles", "penske-2025-review"]],
  ["porsche-penske-motorsport", "imsa", 2025, "7", ["felipe-nasr", "nick-tandy"], "full-season", "verified", ["penske-2025-review", "pn-daytona-2025"], "Laurens Vanthoor completed the Daytona-winning crew."],
  ["porsche-penske-motorsport", "wec", 2025, "6", ["kevin-estre", "laurens-vanthoor", "matt-campbell"], "full-season", "verified", ["fia-cota-2025", "penske-lemans-2025"]],
  ["porsche-penske-motorsport", "wec", 2025, "5", [], "full-season", "reported", ["racer-bahrain-2025"], "Car confirmed at the 2025 Bahrain finale; line-up not yet documented in this archive."],
  ["proton-competition", "wec", 2025, "99", [], "full-season", "reported", ["racer-proton-exit"], "Continued in the F.A.T. retro colours; line-up not yet documented in this archive."],
  ["jdc-miller-motorsports", "imsa", 2025, "85", ["gianmaria-bruni", "tijmen-van-der-helm"], "full-season", "reported", ["imsa-jdc-2025"], "Nico Müller added for Sebring (reported)."],
  ["porsche-penske-motorsport", "imsa", 2026, "7", ["felipe-nasr", "julien-andlauer", "laurin-heinrich"], "full-season", "reported", ["pn-daytona-2026"], "Daytona-winning trio verified; full-season pairing reported."],
  ["porsche-penske-motorsport", "imsa", 2026, "6", ["laurens-vanthoor", "kevin-estre", "matt-campbell"], "full-season", "reported", ["imsa-petit-2026"], "Petit Le Mans-winning trio verified; full-season pairing reported."],
  ["jdc-miller-motorsports", "imsa", 2026, "85", ["nico-pino", "tijmen-van-der-helm", "kaylen-frederick"], "full-season", "reported", ["pn-daytona-2026-preview"], "Daytona line-up verified; a team recap later referred to the car as No. 5 — number change unconfirmed."],
];

// Events: [slug, name, champ, season, date, circuit, country, precision?]
export const EVENTS: [string, string, string, number, string, string, string, string?][] = [
  ["2023-rolex-24-daytona", "Rolex 24 at Daytona", "imsa", 2023, "2023-01-29", "Daytona International Speedway", "USA"],
  ["2023-sebring-1000-miles", "1000 Miles of Sebring", "wec", 2023, "2023-03-17", "Sebring International Raceway", "USA"],
  ["2023-long-beach", "Grand Prix of Long Beach", "imsa", 2023, "2023-04-15", "Long Beach street circuit", "USA"],
  ["2023-6h-spa", "6 Hours of Spa-Francorchamps", "wec", 2023, "2023-04-29", "Circuit de Spa-Francorchamps", "BEL"],
  ["2023-24h-le-mans", "24 Hours of Le Mans (Centenary)", "wec", 2023, "2023-06-11", "Circuit de la Sarthe", "FRA"],
  ["2024-rolex-24-daytona", "Rolex 24 at Daytona", "imsa", 2024, "2024-01-28", "Daytona International Speedway", "USA"],
  ["2024-qatar-1812km", "Qatar 1812 km", "wec", 2024, "2024-03-02", "Lusail International Circuit", "QAT"],
  ["2024-6h-spa", "6 Hours of Spa-Francorchamps", "wec", 2024, "2024-05-11", "Circuit de Spa-Francorchamps", "BEL"],
  ["2024-24h-le-mans", "24 Hours of Le Mans", "wec", 2024, "2024-06-16", "Circuit de la Sarthe", "FRA"],
  ["2024-6h-fuji", "6 Hours of Fuji", "wec", 2024, "2024-09-15", "Fuji Speedway", "JPN"],
  ["2024-petit-le-mans", "Motul Petit Le Mans", "imsa", 2024, "2024-10-12", "Michelin Raceway Road Atlanta", "USA"],
  ["2024-8h-bahrain", "8 Hours of Bahrain", "wec", 2024, "2024-11-02", "Bahrain International Circuit", "BHR"],
  ["2025-rolex-24-daytona", "Rolex 24 at Daytona", "imsa", 2025, "2025-01-26", "Daytona International Speedway", "USA"],
  ["2025-24h-le-mans", "24 Hours of Le Mans", "wec", 2025, "2025-06-15", "Circuit de la Sarthe", "FRA"],
  ["2025-lone-star-le-mans", "Lone Star Le Mans", "wec", 2025, "2025-09-07", "Circuit of the Americas", "USA"],
  ["2025-petit-le-mans", "Motul Petit Le Mans", "imsa", 2025, "2025-10-11", "Michelin Raceway Road Atlanta", "USA"],
  ["2025-8h-bahrain", "8 Hours of Bahrain", "wec", 2025, "2025-11-08", "Bahrain International Circuit", "BHR"],
  ["2026-rolex-24-daytona", "Rolex 24 at Daytona", "imsa", 2026, "2026-01-25", "Daytona International Speedway", "USA"],
  ["2026-12h-sebring", "Mobil 1 Twelve Hours of Sebring", "imsa", 2026, "2026-03-21", "Sebring International Raceway", "USA"],
  ["2026-long-beach", "Grand Prix of Long Beach", "imsa", 2026, "2026-04-18", "Long Beach street circuit", "USA"],
  ["2026-laguna-seca", "Monterey SportsCar Championship", "imsa", 2026, "2026-05-03", "WeatherTech Raceway Laguna Seca", "USA"],
  ["2026-6h-watkins-glen", "Six Hours of The Glen", "imsa", 2026, "2026-06-01", "Watkins Glen International", "USA", "month"],
  ["2026-petit-le-mans", "Motul Petit Le Mans", "imsa", 2026, "2026-10-03", "Michelin Raceway Road Atlanta", "USA"],
];

// Results: [event, team, season-number key "champ:season:number", position, headline, notes, highlight, verification, sources]
export const RESULTS: [string, string, string, string, string, boolean, V, string[]][] = [
  ["2023-rolex-24-daytona", "imsa:2023:7", "7th (GTP)", "Race debut", "Battery defect. Sources disagree slightly on the final classification.", false, "reported", ["pn-daytona-2023", "penske-daytona-2023"]],
  ["2023-rolex-24-daytona", "imsa:2023:6", "DNF", "Race debut", "Retired with technical problems; Porsche called the debut \"disappointing\".", false, "reported", ["pn-daytona-2023"]],
  ["2023-long-beach", "imsa:2023:6", "1", "First ever Porsche 963 victory", "Won under caution after a no-tyre-change strategy; Porsche's first overall win of the modern IMSA era.", true, "verified", ["pn-longbeach-2023", "motorsport-longbeach-2023"]],
  ["2023-long-beach", "imsa:2023:7", "3", "Podium", "", false, "verified", ["pn-longbeach-2023"]],
  ["2023-6h-spa", "wec:2023:38", "6", "First customer 963 race", "Hertz Team JOTA's debut after only a brief shakedown at Weissach.", false, "verified", ["thedrive-jota-2023"]],
  ["2024-rolex-24-daytona", "imsa:2024:7", "1", "Rolex 24 at Daytona overall victory", "The 963's first win in one of the major endurance classics.", true, "verified", ["pn-daytona-2024"]],
  ["2024-qatar-1812km", "wec:2024:6", "1", "First WEC victory", "Season opener; the factory 963s finished first and third.", true, "verified", ["pn-success-2024"]],
  ["2024-qatar-1812km", "wec:2024:5", "3", "Podium", "", false, "verified", ["pn-success-2024"]],
  ["2024-qatar-1812km", "wec:2024:12", "2", "Customer podium", "Reported by Porsche Motorsport's season review; not cross-checked against official classification.", false, "reported", ["porsche-wec-2024-review"]],
  ["2024-6h-spa", "wec:2024:12", "1", "First WEC win for a customer 963", "Hertz Team JOTA won after a red-flag restart; JOTA's first outright WEC victory.", true, "verified", ["porsche-wec-2024-review", "pn-success-2024"]],
  ["2024-6h-spa", "wec:2024:6", "2", "Podium", "", false, "verified", ["porsche-wec-2024-review"]],
  ["2024-24h-le-mans", "wec:2024:6", "Pole", "Le Mans pole position", "Kévin Estre, 3:24.634 in Hyperpole.", true, "verified", ["pn-lemans-pole-2024"]],
  ["2024-24h-le-mans", "wec:2024:6", "4", "Narrowly missed the podium", "Porsche's race report states the car narrowly missed the podium; exact position pending official classification check.", false, "reported", ["porsche-lemans-2024-report"]],
  ["2024-6h-fuji", "wec:2024:6", "1", "Second WEC victory of 2024", "", true, "verified", ["autosport-fuji-2024", "pn-success-2024"]],
  ["2024-petit-le-mans", "imsa:2024:7", "3", "IMSA GTP drivers' title clinched", "Cameron and Nasr crowned 2024 GTP champions; Porsche also took the teams' and manufacturers' titles.", true, "verified", ["pn-imsa-2024-titles", "penske-2024-review"]],
  ["2024-petit-le-mans", "imsa:2024:6", "2", "Podium", "", false, "verified", ["pn-imsa-2024-titles"]],
  ["2024-8h-bahrain", "wec:2024:6", "—", "WEC Drivers' World Champions", "Estre, Lotterer and Vanthoor won the 2024 drivers' title; Porsche missed the manufacturers' title by two points. Hertz Team JOTA won the FIA World Cup for Hypercar Teams.", true, "verified", ["pn-success-2024", "porsche-wec-2024-review"]],
  ["2025-rolex-24-daytona", "imsa:2025:7", "1", "Second consecutive Daytona win", "Porsche's 20th overall Daytona win. Nick Tandy became the first driver to win the Le Mans, Spa, Nürburgring and Daytona 24-hour races.", true, "verified", ["pn-daytona-2025"]],
  ["2025-24h-le-mans", "wec:2025:6", "2", "Le Mans runner-up", "Finished 14.084 seconds behind the winning Ferrari.", true, "verified", ["penske-lemans-2025", "porsche-wec-2025-review"]],
  ["2025-lone-star-le-mans", "wec:2025:6", "1", "Final WEC win of the factory programme", "Wet race at COTA; Estre passed the #51 Ferrari as the final safety car ended.", true, "verified", ["fia-cota-2025", "racer-cota-2025"]],
  ["2025-petit-le-mans", "imsa:2025:6", "4", "IMSA GTP titles retained", "Campbell and Jaminet clinched the drivers' title; Porsche swept drivers', teams' and manufacturers' crowns. Nasr and Tandy won the Michelin Endurance Cup.", true, "verified", ["pn-imsa-2025-titles", "penske-2025-review"]],
  ["2025-8h-bahrain", "wec:2025:6", "13", "Final factory WEC race", "The #6 crossed the line 13th, a few seconds ahead of the #5.", false, "verified", ["racer-bahrain-2025"]],
  ["2026-rolex-24-daytona", "imsa:2026:7", "1", "Third consecutive Daytona win", "Won by 1.569 s; Porsche's 21st overall Daytona victory and Nasr's third in a row.", true, "verified", ["pn-daytona-2026"]],
  ["2026-12h-sebring", "imsa:2026:7", "1", "Sebring one-two", "Reported by Porsche as a one-two finish in the Mobil 1 tribute livery.", true, "reported", ["pn-serial-winner-2026"]],
  ["2026-laguna-seca", "imsa:2026:85", "1", "First customer win of the GTP era (reported)", "Reported in a Porsche Newsroom summary; pending official classification check.", true, "reported", ["pn-watkins-2026"]],
  ["2026-6h-watkins-glen", "imsa:2026:85", "3", "Customer podium", "Factory cars finished fifth and sixth.", false, "reported", ["pn-watkins-2026"]],
  ["2026-petit-le-mans", "imsa:2026:6", "1", "First Petit Le Mans overall win", "Beat the #24 BMW by 1.205 s; Porsche swept the Michelin Endurance Cup titles. The 2026 GTP drivers' title went to Jack Aitken (Cadillac).", true, "verified", ["imsa-petit-2026", "pn-petit-2026", "imsa-champions-2026"]],
];

type Design = { base: string; accents: string[]; pattern: string; note?: string };

export type LiverySeed = {
  slug: string; name: string; kind: string; parent?: string; isVariation?: boolean; year: number; season: string;
  team?: string; champ?: string; carNumbers: string; event: string; firstUsed?: string; sponsors: string;
  drivers: string[]; background: string; inspiration: string; design: Design; verification: V; sources: string[];
};

export const LIVERIES: LiverySeed[] = [
  {
    slug: "963-camouflage-test-2022", name: "Development camouflage", kind: "test", year: 2022, season: "2022 development",
    team: "porsche-penske-motorsport", carNumbers: "", event: "First rollout, Porsche Development Centre Weissach", firstUsed: "2022-01-14",
    sponsors: "", drivers: ["frederic-makowiecki"],
    background: "The 963 turned its first wheel on 14 January 2022 at Weissach in a camouflage wrap, with Frédéric Makowiecki at the wheel. The disguise concealed the bodywork's details through the first phase of testing until the race livery was revealed in June.",
    inspiration: "Functional development camouflage — not a race livery.",
    design: { base: "#d9d9d6", accents: ["#111111", "#6b6b6b"], pattern: "camo", note: "Illustrative — actual pattern not reproduced." },
    verification: "verified", sources: ["pn-20-times"],
  },
  {
    slug: "963-launch-livery-goodwood-2022", name: "Launch livery — Goodwood world premiere", kind: "launch", year: 2022, season: "2022 reveal",
    team: "porsche-penske-motorsport", champ: "exhibition", carNumbers: "", event: "Goodwood Festival of Speed", firstUsed: "2022-06-24",
    sponsors: "Porsche, Penske", drivers: ["dane-cameron"],
    background: "Unveiled with the car's name at the Goodwood Festival of Speed on 24 June 2022 and driven up the hill by Dane Cameron. IMSA reported at the time that the scheme would likely carry over into the 2023 racing season.",
    inspiration: "The traditional Porsche works colours of white, red and black. Goodwood's coverage tied the design to Porsche racers from the 919 Hybrid back to the 1970 Le Mans-winning 917; Stuttcars noted a nod to the Salzburg 917 K.",
    design: { base: "#f2f1ee", accents: ["#c8102e", "#121212"], pattern: "works" },
    verification: "verified", sources: ["pn-goodwood-2022", "imsa-goodwood-2022", "goodwood-fos-2022"],
  },
  {
    slug: "963-ppm-season-2023", name: "Porsche Penske Motorsport — 2023 race livery", kind: "season", parent: "963-launch-livery-goodwood-2022", isVariation: true,
    year: 2023, season: "2023", team: "porsche-penske-motorsport", carNumbers: "5, 6, 7", event: "IMSA & WEC 2023 season", firstUsed: "2023-01-28",
    sponsors: "Porsche, Penske, Mobil 1", drivers: ["nick-tandy", "mathieu-jaminet", "felipe-nasr", "matt-campbell", "kevin-estre", "andre-lotterer", "laurens-vanthoor", "dane-cameron", "frederic-makowiecki", "michael-christensen"],
    background: "Race application of the Goodwood design, debuted at the 2023 Rolex 24 at Daytona. Recorded as a seasonal variation of the launch livery rather than a new design.",
    inspiration: "Carries over the Goodwood launch scheme.",
    design: { base: "#f2f1ee", accents: ["#c8102e", "#121212"], pattern: "works" },
    verification: "reported", sources: ["imsa-goodwood-2022", "pn-daytona-2023"],
  },
  {
    slug: "963-le-mans-2023-75-years", name: "Le Mans centenary — 75 years of Porsche sports cars", kind: "anniversary",
    year: 2023, season: "2023", team: "porsche-penske-motorsport", champ: "wec", carNumbers: "5, 6, 75", event: "24 Hours of Le Mans (Centenary)", firstUsed: "2023-06-10",
    sponsors: "Porsche, Penske", drivers: ["dane-cameron", "frederic-makowiecki", "michael-christensen", "kevin-estre", "andre-lotterer", "laurens-vanthoor", "felipe-nasr", "nick-tandy", "mathieu-jaminet"],
    background: "Three factory 963s raced the 100th-anniversary 24 Hours of Le Mans in a one-off design marking 75 years of Porsche sports cars. The cars were distinguished by the colour of their engine-cover fins: black for #5, white for #6 and red for the one-off third car, #75.",
    inspiration: "Fifteen stripes in seven colours flow from the nose and flare out at the rear, each colour a tribute to a historic Porsche Le Mans livery — including the \"Pink Pig\" 917/20 and the psychedelic \"Hippie\" 917 of 1970 — and to the striped RS Spyder that won ALMS titles in 2006–08.",
    design: { base: "#f2f1ee", accents: ["#c8102e", "#121212", "#2f7d4f", "#e7a1b0", "#1f4fa0", "#e3b23c", "#7a3fa0"], pattern: "stripes", note: "Stripe colours are representative of the seven-colour scheme, not exact paint codes." },
    verification: "verified", sources: ["pn-lemans-livery-2023", "fiawec-lemans-livery-2023", "motorsportmag-stripes"],
  },
  {
    slug: "963-hertz-team-jota-2023", name: "Hertz Team JOTA — Singer-designed debut livery", kind: "customer",
    year: 2023, season: "2023", team: "hertz-team-jota", champ: "wec", carNumbers: "38", event: "FIA WEC 2023 from the 6 Hours of Spa", firstUsed: "2023-04-29",
    sponsors: "Hertz, Singer Vehicle Design, BRADY", drivers: ["antonio-felix-da-costa", "will-stevens", "yifei-ye"],
    background: "The first customer 963. The car's livery was designed by Singer Vehicle Design, with Hertz as title partner and backing from Tom Brady's BRADY brand. It debuted at the 6 Hours of Spa in April 2023 and raced at the Le Mans centenary.",
    inspiration: "Hertz corporate yellow and black, styled by Singer.",
    design: { base: "#f6c400", accents: ["#111111"], pattern: "split", note: "Colours approximate." },
    verification: "verified", sources: ["aco-jota-livery-2023", "stuttcars-jota-2023", "thedrive-jota-2023"],
  },
  {
    slug: "963-ppm-season-2024", name: "Porsche Penske Motorsport — 2024 race livery", kind: "season", parent: "963-launch-livery-goodwood-2022", isVariation: true,
    year: 2024, season: "2024", team: "porsche-penske-motorsport", carNumbers: "5, 6, 7", event: "IMSA & WEC 2024 season", firstUsed: "2024-01-27",
    sponsors: "Porsche, Penske, Mobil 1", drivers: ["kevin-estre", "andre-lotterer", "laurens-vanthoor", "dane-cameron", "felipe-nasr", "mathieu-jaminet", "nick-tandy"],
    background: "The championship-winning season: Daytona, Qatar and Fuji victories, the WEC drivers' title and the IMSA GTP sweep. Recorded as a seasonal continuation of the works design; sponsor-level changes from 2023 are not yet documented.",
    inspiration: "Continuation of the works white/red/black design.",
    design: { base: "#f2f1ee", accents: ["#c8102e", "#121212"], pattern: "works" },
    verification: "unverified", sources: ["pn-success-2024"],
  },
  {
    slug: "963-proton-fat-dauer-tribute-2024", name: "Proton Competition — F.A.T. / Dauer 962 tribute", kind: "tribute",
    year: 2024, season: "2024", team: "proton-competition", champ: "wec", carNumbers: "99", event: "FIA WEC 2024 season", firstUsed: "2024-02-26",
    sponsors: "F.A.T. International", drivers: ["neel-jani", "harry-tincknell", "julien-andlauer"],
    background: "Revealed in February 2024 ahead of the WEC pre-season test, marking the 30th anniversary of Porsche's 1994 Le Mans victory. Proton kept the scheme for 2025, when it was the only customer 963 left in the WEC.",
    inspiration: "The colours of the 1994 Le Mans-winning Dauer 962 LM, driven by Yannick Dalmas, Hurley Haywood and Mauro Baldi, including the period F.A.T. sponsor branding.",
    design: { base: "#f4f4f0", accents: ["#0b3d91", "#f2c200"], pattern: "band", note: "Colours approximate." },
    verification: "verified", sources: ["racer-proton-2024", "fiawec-proton-2024"],
  },
  {
    slug: "963-hertz-team-jota-2024", name: "Hertz Team JOTA — 2024 livery", kind: "customer", parent: "963-hertz-team-jota-2023", isVariation: true,
    year: 2024, season: "2024", team: "hertz-team-jota", champ: "wec", carNumbers: "12, 38", event: "FIA WEC 2024 season", firstUsed: "2024-03-02",
    sponsors: "Hertz", drivers: ["will-stevens", "callum-ilott"],
    background: "JOTA expanded to two cars and won the 6 Hours of Spa with #12 and the FIA World Cup for Hypercar Teams. Design changes relative to 2023 are not yet documented — recorded as a seasonal variation.",
    inspiration: "Continuation of the Hertz yellow and black identity.",
    design: { base: "#f6c400", accents: ["#111111"], pattern: "split", note: "Colours approximate." },
    verification: "unverified", sources: ["porsche-wec-2024-review"],
  },
  {
    slug: "963-ppm-season-2025", name: "Porsche Penske Motorsport — 2025 race livery", kind: "season", parent: "963-launch-livery-goodwood-2022", isVariation: true,
    year: 2025, season: "2025", team: "porsche-penske-motorsport", carNumbers: "5, 6, 7", event: "IMSA & WEC 2025 season", firstUsed: "2025-01-25",
    sponsors: "Porsche, Penske, Mobil 1", drivers: ["felipe-nasr", "nick-tandy", "laurens-vanthoor", "matt-campbell", "mathieu-jaminet", "kevin-estre"],
    background: "The final season of the factory WEC programme and a second IMSA title sweep. Recorded as a seasonal continuation; sponsor-level differences are not yet documented.",
    inspiration: "Continuation of the works design.",
    design: { base: "#f2f1ee", accents: ["#c8102e", "#121212"], pattern: "works" },
    verification: "unverified", sources: ["pn-daytona-2025"],
  },
  {
    slug: "963-rsp-martini-silver-2025", name: "963 RSP — Martini Silver road car", kind: "special-edition",
    year: 2025, season: "2025", carNumbers: "", event: "Revealed on public roads around the Circuit de la Sarthe", firstUsed: "2025-06-06",
    sponsors: "", drivers: [],
    background: "A one-off, road-legal 963 commissioned for and named after Roger S. Penske. Road-legal under specific conditions in France on manufacturer plates. It was revealed in the build-up to the 2025 24 Hours of Le Mans alongside the original 917 road car, and is the first 963 to be painted rather than wrapped.",
    inspiration: "The 1975 road-going 917 that Porsche built for Count Gregorio Rossi di Montelera. The Martini Silver paint was matched from Porsche Museum records; the interior is trimmed in tan leather and Alcantara.",
    design: { base: "#b9bcbf", accents: ["#8d9094"], pattern: "solid" },
    verification: "verified", sources: ["pn-963rsp", "aco-963rsp", "motor1-963rsp"],
  },
  {
    slug: "963-ppm-season-2026", name: "Porsche Penske Motorsport — 2026 race livery", kind: "season", parent: "963-launch-livery-goodwood-2022", isVariation: true,
    year: 2026, season: "2026", team: "porsche-penske-motorsport", champ: "imsa", carNumbers: "6, 7", event: "IMSA 2026 season", firstUsed: "2026-01-24",
    sponsors: "Porsche, Penske, Mobil 1", drivers: ["felipe-nasr", "julien-andlauer", "laurin-heinrich", "laurens-vanthoor", "kevin-estre", "matt-campbell"],
    background: "IMSA-only season after the WEC exit. Won the Rolex 24 for a third straight year. Design details relative to earlier seasons are not yet documented.",
    inspiration: "Continuation of the works design.",
    design: { base: "#f2f1ee", accents: ["#c8102e", "#121212"], pattern: "works" },
    verification: "unverified", sources: ["pn-daytona-2026"],
  },
  {
    slug: "963-sebring-2026-mobil1-gt1-tribute", name: "Sebring 2026 — Mobil 1 911 GT1 throwback", kind: "tribute",
    year: 2026, season: "2026", team: "porsche-penske-motorsport", champ: "imsa", carNumbers: "6, 7", event: "Mobil 1 Twelve Hours of Sebring", firstUsed: "2026-03-21",
    sponsors: "Mobil 1, Porsche, Penske", drivers: ["felipe-nasr", "julien-andlauer", "laurin-heinrich", "laurens-vanthoor", "kevin-estre", "matt-campbell"],
    background: "Revealed on 17 March 2026. The decals marked the 30th anniversary of the Porsche–Mobil 1 partnership and the 75th anniversary of Porsche Motorsport. The #6 carried blue accents and the #7 red. Porsche reported a one-two finish.",
    inspiration: "The Mobil 1-backed Porsche 911 GT1 of the 1996 24 Hours of Le Mans — a predominantly white base with bold blue and red striping.",
    design: { base: "#f6f6f4", accents: ["#0a3d8f", "#d0021b"], pattern: "gt1" },
    verification: "verified", sources: ["racer-sebring-livery-2026", "pn-serial-winner-2026"],
  },
  {
    slug: "963-long-beach-2026-apple-music", name: "Long Beach 2026 — Apple Music", kind: "special",
    year: 2026, season: "2026", team: "porsche-penske-motorsport", champ: "imsa", carNumbers: "6, 7", event: "Grand Prix of Long Beach", firstUsed: "2026-04-18",
    sponsors: "Apple Music, Porsche, Penske", drivers: [],
    background: "Both factory 963s raced the streets of Long Beach on 18 April 2026 in an Apple Music livery — a separate design from the Apple Computer tribute run at Laguna Seca two weeks later.",
    inspiration: "Apple Music brand identity.",
    design: { base: "#141414", accents: ["#fa2d48", "#f2f1ee"], pattern: "band", note: "Palette approximate — design detail not yet documented." },
    verification: "verified", sources: ["pn-longbeach-2026"],
  },
  {
    slug: "963-laguna-seca-2026-apple-computer-935", name: "Laguna Seca 2026 — Apple Computer 935 K3 tribute", kind: "tribute",
    year: 2026, season: "2026", team: "porsche-penske-motorsport", champ: "imsa", carNumbers: "6, 7", event: "Monterey SportsCar Championship", firstUsed: "2026-05-03",
    sponsors: "Apple, Porsche, Penske", drivers: [],
    background: "A one-off for round four of the 2026 IMSA season at Laguna Seca on 3 May 2026, marking the 75th anniversary of Porsche Motorsport and the 50th anniversary of Apple's founding.",
    inspiration: "The 1980 Dick Barbour Racing Porsche 935 K3, which carried Apple's rainbow-striped branding during the 1980 season, including at the 24 Hours of Le Mans.",
    design: { base: "#f6f6f4", accents: ["#61bb46", "#fdb827", "#f5821f", "#e03a3e", "#963d97", "#009ddc"], pattern: "rainbow" },
    verification: "verified", sources: ["pn-laguna-2026", "porsche-apple-story"],
  },
  {
    slug: "963-jdc-miller-85", name: "JDC-Miller MotorSports customer livery", kind: "customer",
    year: 2023, season: "2023–2026", team: "jdc-miller-motorsports", champ: "imsa", carNumbers: "85", event: "IMSA GTP from round four of 2023",
    sponsors: "", drivers: ["tijmen-van-der-helm", "mike-rockenfeller", "gianmaria-bruni", "nico-pino", "kaylen-frederick"],
    background: "IMSA's privateer 963, raced as No. 5 in 2023 and No. 85 from 2025. This record groups the team's colours until each season's design and sponsors are researched to archive standard; the photographs show how the car looked at each event.",
    inspiration: "Not yet documented.",
    design: { base: "#3a3a3a", accents: ["#6b6b6b"], pattern: "neutral", note: "Palette not documented — neutral placeholder." },
    verification: "unverified", sources: ["imsa-jdc-2025", "pn-daytona-2026-preview"],
  },
];

// Timeline: [date, precision, title, description, category, team?, livery?, milestone, verification, sources]
export const TIMELINE: [string, string, string, string, string, string | null, string | null, boolean, V, string[]][] = [
  ["2022-01-14", "day", "First rollout at Weissach", "Frédéric Makowiecki drives the first LMDh car to run anywhere, in camouflage, at the Porsche Development Centre.", "development", "porsche-penske-motorsport", "963-camouflage-test-2022", true, "verified", ["pn-20-times"]],
  ["2022-06-24", "day", "World premiere at Goodwood", "Name and race livery revealed at the Festival of Speed; Dane Cameron drives the car up the hill.", "reveal", "porsche-penske-motorsport", "963-launch-livery-goodwood-2022", true, "verified", ["pn-goodwood-2022", "goodwood-fos-2022"]],
  ["2022-08-01", "month", "Second chassis joins testing at Monza", "Until now all running had been done with a single car.", "development", "porsche-penske-motorsport", null, false, "reported", ["pn-20-times"]],
  ["2023-01-29", "day", "Race debut at the Rolex 24", "Both cars are hit by technical problems on the LMDh era's opening weekend.", "race", "porsche-penske-motorsport", "963-ppm-season-2023", true, "verified", ["pn-daytona-2023"]],
  ["2023-03-17", "day", "WEC debut at Sebring", "Porsche Penske Motorsport enters #5 and #6 in the 1000 Miles of Sebring, the day before the IMSA 12 Hours.", "race", "porsche-penske-motorsport", "963-ppm-season-2023", false, "verified", ["pn-sebring-wec-2023"]],
  ["2023-04-15", "day", "First victory — Long Beach", "Tandy and Jaminet win under caution in the #6, Porsche's first overall win of the modern IMSA era.", "race", "porsche-penske-motorsport", "963-ppm-season-2023", true, "verified", ["pn-longbeach-2023", "motorsport-longbeach-2023"]],
  ["2023-04-29", "day", "First customer 963 races", "Hertz Team JOTA debuts the #38 at the 6 Hours of Spa and finishes sixth; three 963s start a WEC race for the first time.", "race", "hertz-team-jota", "963-hertz-team-jota-2023", false, "verified", ["thedrive-jota-2023", "pn-spa-2023"]],
  ["2023-06-10", "day", "Le Mans centenary in 75-year colours", "Three factory 963s in a seven-colour striped livery; #75 added as a one-off third car.", "livery", "porsche-penske-motorsport", "963-le-mans-2023-75-years", true, "verified", ["pn-lemans-livery-2023"]],
  ["2024-01-28", "day", "Rolex 24 at Daytona victory", "The #7 wins the first of three consecutive Daytona 24 Hours for the 963.", "race", "porsche-penske-motorsport", "963-ppm-season-2024", true, "verified", ["pn-daytona-2024"]],
  ["2024-02-16", "day", "Proton reveals Dauer 962 tribute", "The #99 customer car will race in the F.A.T. colours of the 1994 Le Mans winner.", "livery", "proton-competition", "963-proton-fat-dauer-tribute-2024", false, "verified", ["racer-proton-2024"]],
  ["2024-03-02", "day", "First WEC victory — Qatar", "The #6 wins the 2024 season opener.", "race", "porsche-penske-motorsport", "963-ppm-season-2024", true, "verified", ["pn-success-2024"]],
  ["2024-05-11", "day", "JOTA wins at Spa", "The #12 Hertz Team JOTA car takes the first WEC victory for a customer 963.", "race", "hertz-team-jota", "963-hertz-team-jota-2024", true, "verified", ["porsche-wec-2024-review"]],
  ["2024-06-13", "day", "Pole position at Le Mans", "Kévin Estre takes Hyperpole in the #6 with 3:24.634.", "race", "porsche-penske-motorsport", "963-ppm-season-2024", false, "verified", ["pn-lemans-pole-2024"]],
  ["2024-09-15", "day", "Victory at Fuji", "Second WEC win of the season for the #6 crew.", "race", "porsche-penske-motorsport", "963-ppm-season-2024", false, "verified", ["autosport-fuji-2024"]],
  ["2024-10-12", "day", "IMSA GTP champions", "Cameron and Nasr clinch the drivers' title at Petit Le Mans; Porsche also takes teams' and manufacturers' titles.", "title", "porsche-penske-motorsport", "963-ppm-season-2024", true, "verified", ["pn-imsa-2024-titles"]],
  ["2024-11-02", "day", "WEC Drivers' World Champions", "Estre, Lotterer and Vanthoor win the world title; JOTA wins the FIA World Cup for Hypercar Teams.", "title", "porsche-penske-motorsport", "963-ppm-season-2024", true, "verified", ["pn-success-2024"]],
  ["2025-01-26", "day", "Second straight Daytona win", "Nasr, Tandy and Vanthoor win; Porsche's 20th overall victory at Daytona.", "race", "porsche-penske-motorsport", "963-ppm-season-2025", true, "verified", ["pn-daytona-2025"]],
  ["2025-06-06", "day", "963 RSP revealed", "A one-off road-legal 963 in Martini Silver for Roger S. Penske, shown on the roads around Le Mans.", "livery", null, "963-rsp-martini-silver-2025", false, "verified", ["pn-963rsp", "aco-963rsp"]],
  ["2025-06-15", "day", "Second at Le Mans", "The #6 finishes 14.084 s behind the winning Ferrari.", "race", "porsche-penske-motorsport", "963-ppm-season-2025", false, "verified", ["penske-lemans-2025"]],
  ["2025-09-07", "day", "Lone Star Le Mans victory", "Rain-hit win at COTA — the factory programme's last WEC victory.", "race", "porsche-penske-motorsport", "963-ppm-season-2025", false, "verified", ["fia-cota-2025", "racer-cota-2025"]],
  ["2025-10-01", "month", "Factory WEC exit confirmed", "Porsche announces the end of its works Hypercar programme after 2025, keeping IMSA.", "business", "porsche-penske-motorsport", null, true, "verified", ["autosport-wec-exit"]],
  ["2025-10-11", "day", "IMSA titles retained", "Campbell and Jaminet win the GTP drivers' title; Porsche sweeps the championship again.", "title", "porsche-penske-motorsport", "963-ppm-season-2025", true, "verified", ["pn-imsa-2025-titles"]],
  ["2025-11-08", "day", "Final factory WEC race", "The #6 finishes 13th at the Bahrain 8 Hours, just ahead of the #5; the 963 leaves the WEC with four victories.", "race", "porsche-penske-motorsport", "963-ppm-season-2025", false, "verified", ["racer-bahrain-2025"]],
  ["2025-12-05", "day", "Proton ends WEC 963 programme", "The last customer 963 in the WEC will not return for 2026.", "business", "proton-competition", null, false, "verified", ["racer-proton-exit"]],
  ["2026-01-25", "day", "Third straight Daytona win", "Nasr, Andlauer and Heinrich win by 1.569 s — Porsche's 21st Daytona overall.", "race", "porsche-penske-motorsport", "963-ppm-season-2026", true, "verified", ["pn-daytona-2026"]],
  ["2026-03-21", "day", "Sebring in Mobil 1 GT1 colours", "Tribute to the 1996 911 GT1; Porsche reports a one-two finish.", "livery", "porsche-penske-motorsport", "963-sebring-2026-mobil1-gt1-tribute", false, "reported", ["racer-sebring-livery-2026", "pn-serial-winner-2026"]],
  ["2026-04-18", "day", "Apple Music livery at Long Beach", "Both factory cars race the streets in Apple Music colours.", "livery", "porsche-penske-motorsport", "963-long-beach-2026-apple-music", false, "verified", ["pn-longbeach-2026"]],
  ["2026-05-03", "day", "Apple Computer tribute at Laguna Seca", "Rainbow-striped homage to the 1980 935 K3; JDC-Miller reported as the first GTP-era customer winner.", "livery", "porsche-penske-motorsport", "963-laguna-seca-2026-apple-computer-935", false, "verified", ["pn-laguna-2026", "porsche-apple-story"]],
  ["2026-06-01", "month", "No 963 at Le Mans", "For the first time since its debut, no Porsche 963 contests the 24 Hours of Le Mans.", "business", null, null, false, "reported", ["therace-lemans-2026"]],
  ["2026-10-03", "day", "First Petit Le Mans win", "The #6 wins the IMSA finale and Porsche sweeps the Michelin Endurance Cup; the GTP title goes to Cadillac.", "race", "porsche-penske-motorsport", "963-ppm-season-2026", true, "verified", ["imsa-petit-2026", "pn-petit-2026", "imsa-champions-2026"]],
];
