import type { Bi } from "./weekend";

export type ChampionRow = {
  year: number;
  name?: string; // omitted = pending verification
  /** F1DB driver id when the champion reached Formula One. */
  f1?: string;
  series?: string; // predecessor series name, e.g. "GP2"
};

export type Category = {
  slug: string;
  name: string;
  short: string;
  color: string;
  colorSoft: string;
  ladderStep: number;
  ageGuide: Bi;
  tagline: Bi;
  summary: Bi;
  history: Bi<string[]>;
  regulations: Bi<string[]>;
  cars: Bi<string[]>;
  facts: { label: Bi; value: Bi }[];
  connection: Bi;
  /** Official FIA page for the championship (from the FIA regulations site). */
  fiaUrl?: string;
  champions?: ChampionRow[];
  championsLabel?: Bi;
};

export const CATEGORIES: Category[] = [
  {
    slug: "karting",
    name: "Karting",
    short: "Kart",
    color: "#f59e0b",
    colorSoft: "#fef3c7",
    ladderStep: 1,
    ageGuide: { en: "From childhood", pt: "Desde a infância" },
    tagline: { en: "Where almost every driver begins.", pt: "Onde quase todo piloto começa." },
    summary: {
      en: "Small, light, direct and fiercely competitive: karting teaches racecraft before drivers ever sit in a car.",
      pt: "Pequeno, leve, direto e extremamente competitivo: o kart ensina a correr antes de o piloto sentar num carro.",
    },
    history: {
      en: ["Karting emerged in the United States in the late 1950s and spread quickly to Europe. Its international championships are now governed by the FIA's karting commission. Nearly every modern Formula One driver came through karting, many starting as young children."],
      pt: ["O kart surgiu nos Estados Unidos no fim dos anos 1950 e se espalhou rapidamente pela Europa. Seus campeonatos internacionais hoje são regidos pela comissão de kart da FIA. Quase todo piloto moderno de Fórmula 1 veio do kart, muitos começando ainda crianças."],
    },
    regulations: {
      en: ["Classes are divided by age and engine. Local clubs feed national championships, which in turn feed European and world championships organised under FIA Karting."],
      pt: ["As classes são divididas por idade e motor. Os clubes locais alimentam os campeonatos nacionais, que por sua vez alimentam os campeonatos europeus e mundiais organizados pela FIA Karting."],
    },
    cars: {
      en: ["Karts have a tubular frame, no suspension and minimal bodywork, so drivers learn to feel grip, manage momentum and race wheel-to-wheel at close quarters."],
      pt: ["O kart tem chassi tubular, nenhuma suspensão e carroceria mínima, por isso o piloto aprende a sentir a aderência, administrar o embalo e disputar roda a roda de perto."],
    },
    facts: [
      { label: { en: "Governing body", pt: "Entidade" }, value: { en: "FIA Karting", pt: "FIA Karting" } },
      { label: { en: "Starting age", pt: "Idade inicial" }, value: { en: "Varies by country, often under 10", pt: "Varia por país, muitas vezes antes dos 10" } },
      { label: { en: "Chassis", pt: "Chassi" }, value: { en: "Tubular frame, no suspension", pt: "Tubular, sem suspensão" } },
    ],
    connection: { en: "Successful karters move into Formula 4, usually in their mid-teens.", pt: "Os destaques do kart passam para a Fórmula 4, geralmente por volta dos 15 anos." },
    fiaUrl: "https://www.fia.com/events/karting/season-2024/karting",
  },
  {
    slug: "formula-4",
    name: "Formula 4",
    short: "F4",
    color: "#10b981",
    colorSoft: "#d1fae5",
    ladderStep: 2,
    ageGuide: { en: "Typically 15+", pt: "Normalmente a partir de 15" },
    tagline: { en: "The first step in single-seaters.", pt: "O primeiro passo nos monopostos." },
    summary: {
      en: "An affordable, FIA-certified entry level for drivers moving from karts into cars.",
      pt: "Uma porta de entrada acessível e certificada pela FIA para quem sai do kart para os carros.",
    },
    history: {
      en: ["The FIA introduced the Formula 4 concept in 2014 to create a clear, affordable entry point on the single-seater ladder. It runs as national and regional championships around the world, all using FIA-certified cars."],
      pt: ["A FIA criou o conceito de Fórmula 4 em 2014 para ter uma porta de entrada clara e acessível na escada dos monopostos. Ela é disputada em campeonatos nacionais e regionais pelo mundo, todos com carros certificados pela FIA."],
    },
    regulations: {
      en: ["Each national F4 championship is certified by the FIA against common technical and cost requirements. Because there are many championships, there is no single F4 champion — results in each series award Super Licence points."],
      pt: ["Cada campeonato nacional de F4 é certificado pela FIA segundo requisitos técnicos e de custo comuns. Como há muitos campeonatos, não existe um único campeão da F4 — os resultados de cada série valem pontos para a Superlicença."],
    },
    cars: {
      en: ["Low-power single-seaters with slick and wet tyres and simple aerodynamics: drivers learn set-up, working with engineers and aerodynamic grip."],
      pt: ["Monopostos de baixa potência, com pneus slick e de chuva e aerodinâmica simples: o piloto aprende acerto, a trabalhar com engenheiros e a usar a aderência aerodinâmica."],
    },
    facts: [
      { label: { en: "Introduced", pt: "Criação" }, value: { en: "2014", pt: "2014" } },
      { label: { en: "Format", pt: "Formato" }, value: { en: "National and regional championships", pt: "Campeonatos nacionais e regionais" } },
      { label: { en: "Cars", pt: "Carros" }, value: { en: "FIA-certified, cost-controlled", pt: "Certificados pela FIA, custo controlado" } },
    ],
    connection: { en: "F4 champions typically move to Formula Regional or directly to FIA Formula 3.", pt: "Os campeões de F4 costumam ir para a Fórmula Regional ou direto para a Fórmula 3 da FIA." },
    fiaUrl: "https://www.fia.com/events/formula-4-certified-fia/season-2020/formula-4-certified-fia",
  },
  {
    slug: "f1-academy",
    name: "F1 Academy",
    short: "F1A",
    color: "#ec4899",
    colorSoft: "#fce7f3",
    ladderStep: 2,
    ageGuide: { en: "Typically 16+", pt: "Normalmente a partir de 16" },
    tagline: { en: "Developing the next generation of female racers.", pt: "Formando a próxima geração de pilotas." },
    summary: {
      en: "An all-female series created by Formula One to increase opportunity and representation in single-seater racing.",
      pt: "Uma categoria exclusivamente feminina criada pela Fórmula 1 para ampliar oportunidades e representatividade nos monopostos.",
    },
    history: {
      en: ["F1 Academy launched in 2023 to help young female drivers progress to higher categories, providing track time, coaching and visibility. From 2024 each Formula One team has supported a driver, and races are held on Formula One weekends."],
      pt: ["A F1 Academy começou em 2023 para ajudar jovens pilotas a subir de categoria, oferecendo tempo de pista, treinamento e visibilidade. Desde 2024 cada equipe de Fórmula 1 apoia uma pilota, e as corridas acontecem nos fins de semana da Fórmula 1."],
    },
    regulations: {
      en: ["The series is organised by Formula One and runs on a single-make basis, so results reflect driver performance."],
      pt: ["A categoria é organizada pela Fórmula 1 e usa carros iguais para todas, de modo que os resultados reflitam o desempenho de cada pilota."],
    },
    cars: { en: ["F4-level single-seaters — a development step between karting and higher formulae."], pt: ["Monopostos de nível F4 — um degrau de desenvolvimento entre o kart e as fórmulas superiores."] },
    facts: [
      { label: { en: "First season", pt: "Primeira temporada" }, value: { en: "2023", pt: "2023" } },
      { label: { en: "Level", pt: "Nível" }, value: { en: "F4-specification cars", pt: "Carros de especificação F4" } },
      { label: { en: "Support", pt: "Apoio" }, value: { en: "Every F1 team backs a driver", pt: "Cada equipe de F1 apoia uma pilota" } },
    ],
    connection: { en: "Drivers aim to progress to Formula Regional and FIA Formula 3.", pt: "As pilotas buscam avançar para a Fórmula Regional e a Fórmula 3 da FIA." },
    champions: [{ year: 2023, name: "Marta García" }, { year: 2024, name: "Abbi Pulling" }, { year: 2025 }],
  },
  {
    slug: "formula-regional",
    name: "Formula Regional",
    short: "FR",
    color: "#06b6d4",
    colorSoft: "#cffafe",
    ladderStep: 3,
    ageGuide: { en: "Typically 16+", pt: "Normalmente a partir de 16" },
    tagline: { en: "The bridge between F4 and FIA Formula 3.", pt: "A ponte entre a F4 e a Fórmula 3 da FIA." },
    summary: {
      en: "Regional F3-level championships that add power and aerodynamic complexity.",
      pt: "Campeonatos regionais de nível F3 que acrescentam potência e complexidade aerodinâmica.",
    },
    history: {
      en: ["Formula Regional championships sit between F4 and FIA Formula 3, preparing drivers for the international stage. The best-known is the Formula Regional European Championship, which began in 2019."],
      pt: ["Os campeonatos de Fórmula Regional ficam entre a F4 e a Fórmula 3 da FIA, preparando os pilotos para o cenário internacional. O mais conhecido é o Campeonato Europeu de Fórmula Regional, iniciado em 2019."],
    },
    regulations: {
      en: ["Like F4, Formula Regional series are certified by the FIA against common requirements and award Super Licence points."],
      pt: ["Como na F4, as séries de Fórmula Regional são certificadas pela FIA segundo requisitos comuns e valem pontos para a Superlicença."],
    },
    cars: { en: ["More powerful cars with more downforce than F4."], pt: ["Carros mais potentes e com mais pressão aerodinâmica que os da F4."] },
    facts: [
      { label: { en: "Level", pt: "Nível" }, value: { en: "Regional F3", pt: "F3 regional" } },
      { label: { en: "Format", pt: "Formato" }, value: { en: "Regional championships", pt: "Campeonatos regionais" } },
    ],
    connection: { en: "Leading drivers progress to FIA Formula 3.", pt: "Os melhores pilotos avançam para a Fórmula 3 da FIA." },
    fiaUrl: "https://www.fia.com/events/fia-formula-regional-european-championship/season-2026/fia-formula-regional-european",
    championsLabel: { en: "Formula Regional European Championship", pt: "Campeonato Europeu de Fórmula Regional" },
    champions: [
      { year: 2019, name: "Frederik Vesti" },
      { year: 2020, name: "Gianluca Petecof" },
      { year: 2021, name: "Grégoire Saucy" },
      { year: 2022, name: "Dino Beganovic" },
      { year: 2023, name: "Andrea Kimi Antonelli", f1: "kimi-antonelli" },
      { year: 2024 },
      { year: 2025 },
    ],
  },
  {
    slug: "formula-3",
    name: "FIA Formula 3",
    short: "F3",
    color: "#64748b",
    colorSoft: "#e2e8f0",
    ladderStep: 4,
    ageGuide: { en: "Typically 17+", pt: "Normalmente a partir de 17" },
    tagline: { en: "The international stage begins.", pt: "Começa o palco internacional." },
    summary: {
      en: "A single-make championship on Formula One weekends — the first time young drivers race in front of the paddock.",
      pt: "Um campeonato de carros iguais nos fins de semana da Fórmula 1 — a primeira vez que os jovens correm diante do paddock.",
    },
    history: {
      en: ["FIA Formula 3 was created in 2019, succeeding the GP3 Series (2010–2018). Weekends include a sprint race and a feature race, supporting Formula One events, mainly in Europe."],
      pt: ["A Fórmula 3 da FIA foi criada em 2019, sucedendo a GP3 Series (2010–2018). Os fins de semana têm uma corrida sprint e uma corrida principal, nas etapas da Fórmula 1, principalmente na Europa."],
    },
    regulations: {
      en: ["All teams use the same chassis and engine, so results reflect driver and team performance rather than budget."],
      pt: ["Todas as equipes usam o mesmo chassi e o mesmo motor, de modo que os resultados reflitam o desempenho de pilotos e equipes, e não o orçamento."],
    },
    cars: { en: ["A single-make Dallara chassis."], pt: ["Chassi Dallara único para todos."] },
    facts: [
      { label: { en: "First season", pt: "Primeira temporada" }, value: { en: "2019 (successor to GP3)", pt: "2019 (sucessora da GP3)" } },
      { label: { en: "Cars", pt: "Carros" }, value: { en: "Single-make Dallara chassis", pt: "Chassi Dallara único" } },
      { label: { en: "Races", pt: "Corridas" }, value: { en: "Sprint + feature race", pt: "Sprint + corrida principal" } },
    ],
    connection: { en: "The top F3 drivers graduate to Formula 2.", pt: "Os melhores da F3 sobem para a Fórmula 2." },
    fiaUrl: "https://www.fia.com/events/fia-formula-3-championship/season-2026/fia-formula-3",
    champions: [
      { year: 2010, name: "Esteban Gutiérrez", f1: "esteban-gutierrez", series: "GP3" },
      { year: 2011, name: "Valtteri Bottas", f1: "valtteri-bottas", series: "GP3" },
      { year: 2012, name: "Mitch Evans", series: "GP3" },
      { year: 2013, name: "Daniil Kvyat", f1: "daniil-kvyat", series: "GP3" },
      { year: 2014, name: "Alex Lynn", series: "GP3" },
      { year: 2015, name: "Esteban Ocon", f1: "esteban-ocon", series: "GP3" },
      { year: 2016, name: "Charles Leclerc", f1: "charles-leclerc", series: "GP3" },
      { year: 2017, name: "George Russell", f1: "george-russell", series: "GP3" },
      { year: 2018, name: "Anthoine Hubert", series: "GP3" },
      { year: 2019, name: "Robert Shwartzman" },
      { year: 2020, name: "Oscar Piastri", f1: "oscar-piastri" },
      { year: 2021, name: "Dennis Hauger" },
      { year: 2022, name: "Victor Martins" },
      { year: 2023, name: "Gabriel Bortoleto", f1: "gabriel-bortoleto" },
      { year: 2024, name: "Leonardo Fornaroli" },
      { year: 2025 },
    ],
  },
  {
    slug: "formula-2",
    name: "FIA Formula 2",
    short: "F2",
    color: "#2563eb",
    colorSoft: "#dbeafe",
    ladderStep: 5,
    ageGuide: { en: "Typically 18+", pt: "Normalmente a partir de 18" },
    tagline: { en: "The final step before Formula One.", pt: "O último degrau antes da Fórmula 1." },
    summary: {
      en: "The last rung on the ladder: powerful single-make cars, pit stops and tyre strategy on Formula One weekends.",
      pt: "O último degrau da escada: carros potentes e iguais, pit stops e estratégia de pneus nos fins de semana da Fórmula 1.",
    },
    history: {
      en: ["Formula 2 took its current name in 2017, succeeding the GP2 Series (2005–2016). Champions such as Charles Leclerc, George Russell and Oscar Piastri moved directly to Formula One."],
      pt: ["A Fórmula 2 adotou o nome atual em 2017, sucedendo a GP2 Series (2005–2016). Campeões como Charles Leclerc, George Russell e Oscar Piastri foram direto para a Fórmula 1."],
    },
    regulations: {
      en: [
        "Teams run identical cars, and the feature race includes a mandatory pit stop, introducing drivers to tyre strategy.",
        "To race in Formula One, drivers need an FIA Super Licence. Points are awarded for results in qualifying championships, with Formula 2 offering the most; drivers typically need 40 points accumulated over three seasons, alongside requirements such as age and experience.",
      ],
      pt: [
        "As equipes usam carros idênticos, e a corrida principal tem um pit stop obrigatório, que apresenta aos pilotos a estratégia de pneus.",
        "Para correr na Fórmula 1, o piloto precisa da Superlicença da FIA. Os resultados em campeonatos reconhecidos valem pontos, e a Fórmula 2 é a que mais pontua; normalmente são necessários 40 pontos acumulados em três temporadas, além de requisitos como idade e experiência.",
      ],
    },
    cars: { en: ["A single-make Dallara chassis — the most powerful car on the ladder."], pt: ["Chassi Dallara único — o carro mais potente da escada."] },
    facts: [
      { label: { en: "Name since", pt: "Nome desde" }, value: { en: "2017 (successor to GP2)", pt: "2017 (sucessora da GP2)" } },
      { label: { en: "Cars", pt: "Carros" }, value: { en: "Single-make Dallara chassis", pt: "Chassi Dallara único" } },
      { label: { en: "Races", pt: "Corridas" }, value: { en: "Sprint + feature race with pit stop", pt: "Sprint + corrida principal com pit stop" } },
    ],
    connection: { en: "The final step before a Formula One seat.", pt: "O último passo antes de uma vaga na Fórmula 1." },
    fiaUrl: "https://www.fia.com/events/formula-2-championship/season-2026/fia-formula-2",
    champions: [
      { year: 2005, name: "Nico Rosberg", f1: "nico-rosberg", series: "GP2" },
      { year: 2006, name: "Lewis Hamilton", f1: "lewis-hamilton", series: "GP2" },
      { year: 2007, name: "Timo Glock", f1: "timo-glock", series: "GP2" },
      { year: 2008, name: "Giorgio Pantano", f1: "giorgio-pantano", series: "GP2" },
      { year: 2009, name: "Nico Hülkenberg", f1: "nico-hulkenberg", series: "GP2" },
      { year: 2010, name: "Pastor Maldonado", f1: "pastor-maldonado", series: "GP2" },
      { year: 2011, name: "Romain Grosjean", f1: "romain-grosjean", series: "GP2" },
      { year: 2012, name: "Davide Valsecchi", series: "GP2" },
      { year: 2013, name: "Fabio Leimer", series: "GP2" },
      { year: 2014, name: "Jolyon Palmer", f1: "jolyon-palmer", series: "GP2" },
      { year: 2015, name: "Stoffel Vandoorne", f1: "stoffel-vandoorne", series: "GP2" },
      { year: 2016, name: "Pierre Gasly", f1: "pierre-gasly", series: "GP2" },
      { year: 2017, name: "Charles Leclerc", f1: "charles-leclerc" },
      { year: 2018, name: "George Russell", f1: "george-russell" },
      { year: 2019, name: "Nyck de Vries", f1: "nyck-de-vries" },
      { year: 2020, name: "Mick Schumacher", f1: "mick-schumacher" },
      { year: 2021, name: "Oscar Piastri", f1: "oscar-piastri" },
      { year: 2022, name: "Felipe Drugovich" },
      { year: 2023, name: "Théo Pourchaire" },
      { year: 2024, name: "Gabriel Bortoleto", f1: "gabriel-bortoleto" },
      { year: 2025 },
    ],
  },
];

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}
