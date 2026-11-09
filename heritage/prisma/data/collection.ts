/**
 * Future collection — catalogue records for vehicles whose full historical
 * profiles are still being researched. Only identity-level facts are stored
 * (manufacturer, category, debut season); every profile is flagged
 * `in-research` and renders as such on the site.
 */
export const MANUFACTURERS = [
  { slug: "porsche", name: "Porsche", country: "DEU" },
  { slug: "ferrari", name: "Ferrari", country: "ITA" },
  { slug: "toyota", name: "Toyota Gazoo Racing", country: "JPN" },
  { slug: "cadillac", name: "Cadillac", country: "USA" },
  { slug: "peugeot", name: "Peugeot", country: "FRA" },
  { slug: "bmw", name: "BMW", country: "DEU" },
  { slug: "mercedes-amg", name: "Mercedes-AMG", country: "DEU" },
  { slug: "ford", name: "Ford", country: "USA" },
  { slug: "audi", name: "Audi", country: "DEU" },
  { slug: "nissan", name: "Nissan", country: "JPN" },
];

// [slug, manufacturer, model, fullName, category, era, debutYear, retiredYear|null, country, tagline]
export const IN_RESEARCH: [string, string, string, string, string, string, number, number | null, string, string][] = [
  ["porsche-919-hybrid", "porsche", "919 Hybrid", "Porsche 919 Hybrid", "LMP1-H", "historic", 2014, 2017, "DEU", "Three consecutive Le Mans victories, 2015–2017."],
  ["porsche-956", "porsche", "956", "Porsche 956", "Group C", "historic", 1982, null, "DEU", "The ground-effect Group C car that defined an era."],
  ["porsche-962", "porsche", "962", "Porsche 962", "IMSA GTP / Group C", "historic", 1984, null, "DEU", "The long-wheelbase evolution of the 956 for IMSA and Group C."],
  ["ferrari-499p", "ferrari", "499P", "Ferrari 499P", "Hypercar (LMH)", "modern", 2023, null, "ITA", "Ferrari's return to top-class endurance racing."],
  ["ferrari-488-gte", "ferrari", "488 GTE", "Ferrari 488 GTE", "LMGTE", "historic", 2016, null, "ITA", "Ferrari's GTE contender of the late 2010s."],
  ["ferrari-296-gt3", "ferrari", "296 GT3", "Ferrari 296 GT3", "GT3 / LMGT3", "modern", 2023, null, "ITA", "Ferrari's V6 GT3 car."],
  ["toyota-gr010-hybrid", "toyota", "GR010 Hybrid", "Toyota GR010 Hybrid", "Hypercar (LMH)", "modern", 2021, null, "JPN", "Toyota's first Le Mans Hypercar."],
  ["cadillac-v-series-r", "cadillac", "V-Series.R", "Cadillac V-Series.R", "LMDh — Hypercar / GTP", "modern", 2023, null, "USA", "Cadillac's naturally aspirated V8 LMDh prototype."],
  ["peugeot-9x8", "peugeot", "9X8", "Peugeot 9X8", "Hypercar (LMH)", "modern", 2022, null, "FRA", "The wingless Hypercar that marked Peugeot's return."],
  ["bmw-m-hybrid-v8", "bmw", "M Hybrid V8", "BMW M Hybrid V8", "LMDh — Hypercar / GTP", "modern", 2023, null, "DEU", "BMW's LMDh prototype."],
  ["mercedes-amg-gt3", "mercedes-amg", "GT3", "Mercedes-AMG GT3", "GT3", "modern", 2016, null, "DEU", "Mercedes-AMG's customer GT3 racer."],
  ["ford-gt-gte", "ford", "GT", "Ford GT (GTE)", "LMGTE", "historic", 2016, 2019, "USA", "Ford's return to Le Mans fifty years after 1966."],
  ["audi-r18", "audi", "R18", "Audi R18", "LMP1", "historic", 2011, 2016, "DEU", "Audi's closed-cockpit diesel and diesel-hybrid prototype."],
  ["nissan-gt-r-lm-nismo", "nissan", "GT-R LM Nismo", "Nissan GT-R LM Nismo", "LMP1-H", "historic", 2015, 2015, "JPN", "The front-engined, front-wheel-drive LMP1 experiment."],
];
