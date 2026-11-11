import type { Lang } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dict";
import { eras } from "./content";
import { CATEGORIES } from "./categories";
import { LESSONS } from "./learn";

export type NavLink = { label: string; href: string };
export type NavSection = { id: string; label: string; href: string; explore: NavLink[]; columns: { title: string; links: NavLink[] }[] };

/** Global navigation, localised. Hrefs are internal paths (prefix with `lp`). */
export function getNav(lang: Lang): NavSection[] {
  const t = getDict(lang);
  const E = eras(lang);
  const pt = lang === "pt";
  return [
    {
      id: "history",
      label: t.nav.history,
      href: "/history",
      explore: [
        { label: pt ? "Explorar a história" : "Explore History", href: "/history" },
        { label: pt ? "A linha do tempo" : "The Timeline", href: "/history#timeline" },
        { label: pt ? "Todas as temporadas" : "Every Season", href: "/seasons" },
      ],
      columns: [
        { title: pt ? "Eras" : "Eras", links: E.slice(0, 4).map((e) => ({ label: `${e.decade} — ${e.name}`, href: `/history/${e.slug}` })) },
        { title: "", links: E.slice(4).map((e) => ({ label: `${e.decade} — ${e.name}`, href: `/history/${e.slug}` })) },
      ],
    },
    {
      id: "seasons",
      label: t.nav.seasons,
      href: "/seasons",
      explore: [
        { label: pt ? "Todas as temporadas" : "All Seasons", href: "/seasons" },
        { label: pt ? "Temporada 2026" : "2026 Season", href: "/seasons/2026" },
        { label: pt ? "Temporada 2025" : "2025 Season", href: "/seasons/2025" },
      ],
      columns: [
        { title: pt ? "Por década" : "By decade", links: E.slice(0, 4).map((e) => ({ label: e.decade, href: `/seasons?decade=${e.start}` })) },
        { title: "", links: E.slice(4).map((e) => ({ label: e.decade, href: `/seasons?decade=${e.start}` })) },
      ],
    },
    {
      id: "drivers",
      label: t.nav.drivers,
      href: "/drivers",
      explore: [
        { label: pt ? "Todos os pilotos" : "All Drivers", href: "/drivers" },
        { label: pt ? "Campeões mundiais" : "World Champions", href: "/drivers?filter=champions" },
        { label: pt ? "Pilotos em atividade" : "Current Drivers", href: "/drivers?filter=active" },
      ],
      columns: [
        {
          title: pt ? "Em destaque" : "Featured",
          links: [
            { label: "Juan Manuel Fangio", href: "/drivers/juan-manuel-fangio" },
            { label: "Ayrton Senna", href: "/drivers/ayrton-senna" },
            { label: "Michael Schumacher", href: "/drivers/michael-schumacher" },
            { label: "Lewis Hamilton", href: "/drivers/lewis-hamilton" },
          ],
        },
        {
          title: "",
          links: [
            { label: "Jim Clark", href: "/drivers/jim-clark" },
            { label: "Niki Lauda", href: "/drivers/niki-lauda" },
            { label: "Alain Prost", href: "/drivers/alain-prost" },
            { label: "Max Verstappen", href: "/drivers/max-verstappen" },
          ],
        },
      ],
    },
    {
      id: "teams",
      label: t.nav.teams,
      href: "/teams",
      explore: [
        { label: pt ? "Todas as equipes" : "All Teams", href: "/teams" },
        { label: pt ? "Grid de 2026" : "2026 Grid", href: "/teams?filter=active" },
        { label: pt ? "Equipes históricas" : "Historic Teams", href: "/teams?filter=historic" },
      ],
      columns: [
        {
          title: pt ? "Atuais" : "Current",
          links: [
            { label: "Ferrari", href: "/teams/ferrari" },
            { label: "McLaren", href: "/teams/mclaren" },
            { label: "Mercedes", href: "/teams/mercedes" },
            { label: "Red Bull", href: "/teams/red-bull" },
            { label: "Williams", href: "/teams/williams" },
          ],
        },
        {
          title: pt ? "Históricas" : "Historic",
          links: [
            { label: "Lotus", href: "/teams/lotus" },
            { label: "Brabham", href: "/teams/brabham" },
            { label: "Tyrrell", href: "/teams/tyrrell" },
            { label: "Cooper", href: "/teams/cooper" },
            { label: "Brawn", href: "/teams/brawn" },
          ],
        },
      ],
    },
    {
      id: "circuits",
      label: t.nav.circuits,
      href: "/circuits",
      explore: [
        { label: pt ? "Todos os circuitos" : "All Circuits", href: "/circuits" },
        { label: pt ? "Calendário 2026" : "2026 Calendar", href: "/circuits?filter=current" },
        { label: pt ? "Circuitos históricos" : "Historic Circuits", href: "/circuits?filter=historic" },
      ],
      columns: [
        {
          title: pt ? "Clássicos" : "Classics",
          links: [
            { label: "Silverstone", href: "/circuits/silverstone" },
            { label: "Monaco", href: "/circuits/monaco" },
            { label: "Monza", href: "/circuits/monza" },
            { label: "Spa-Francorchamps", href: "/circuits/spa-francorchamps" },
          ],
        },
        {
          title: pt ? "Históricos" : "Historic",
          links: [
            { label: "Nürburgring", href: "/circuits/nurburgring" },
            { label: "Hockenheim", href: "/circuits/hockenheimring" },
            { label: "Brands Hatch", href: "/circuits/brands-hatch" },
            { label: "Kyalami", href: "/circuits/kyalami" },
          ],
        },
      ],
    },
    {
      id: "engineering",
      label: t.nav.engineering,
      href: "/engineering",
      explore: [{ label: pt ? "Engenharia" : "Engineering", href: "/engineering" }],
      columns: [
        {
          title: pt ? "Sistemas do carro" : "Car systems",
          links: [
            { label: pt ? "Aerodinâmica" : "Aerodynamics", href: "/engineering/aerodynamics" },
            { label: pt ? "Unidades de potência" : "Power units", href: "/engineering/power-units" },
            { label: pt ? "Pneus" : "Tyres", href: "/engineering/tyres" },
            { label: pt ? "Sistemas híbridos" : "Hybrid systems", href: "/engineering/hybrid-systems" },
          ],
        },
        {
          title: "",
          links: [
            { label: pt ? "Chassi" : "Chassis", href: "/engineering/chassis" },
            { label: pt ? "Arrefecimento" : "Cooling", href: "/engineering/cooling" },
            { label: pt ? "Estruturas de segurança" : "Safety structures", href: "/engineering/safety-structures" },
            { label: pt ? "Freios" : "Brakes", href: "/engineering/brakes" },
          ],
        },
      ],
    },
    {
      id: "regulations",
      label: t.nav.regulations,
      href: "/regulations",
      explore: [
        { label: pt ? "Regulamentos" : "Regulations", href: "/regulations" },
        { label: pt ? "Arquivo oficial da FIA" : "Official FIA Archive", href: "/regulations/archive" },
        { label: pt ? "Buscar artigos" : "Search Articles", href: "/regulations/search" },
        { label: pt ? "Comparar versões" : "Compare Versions", href: "/regulations/compare" },
      ],
      columns: [
        {
          title: pt ? "Entenda" : "Understand",
          links: [
            { label: pt ? "Regulamento esportivo" : "Sporting regulations", href: "/regulations/sporting" },
            { label: pt ? "Regulamento técnico" : "Technical regulations", href: "/regulations/technical" },
            { label: pt ? "Regulamento financeiro" : "Financial regulations", href: "/regulations/financial" },
            { label: pt ? "Segurança" : "Safety", href: "/regulations/safety" },
            { label: pt ? "Como as regras mudaram" : "How the rules changed", href: "/regulations/history" },
          ],
        },
      ],
    },
    {
      id: "race-weekend",
      label: t.nav.weekend,
      href: "/race-weekend",
      explore: [
        { label: pt ? "Como funciona o fim de semana" : "How a Weekend Works", href: "/race-weekend" },
        { label: pt ? "Formato sprint" : "Sprint Format", href: "/race-weekend?format=sprint" },
      ],
      columns: [
        {
          title: pt ? "Durante a corrida" : "During the race",
          links: [
            { label: "Pit stops", href: "/race-weekend#pit-stops" },
            { label: pt ? "Estratégia" : "Strategy", href: "/race-weekend#strategy" },
            { label: "Safety Car", href: "/race-weekend#safety-car" },
            { label: pt ? "Punições" : "Penalties", href: "/race-weekend#penalties" },
            { label: pt ? "Parque fechado" : "Parc fermé", href: "/race-weekend#parc-ferme" },
          ],
        },
      ],
    },
    {
      id: "categories",
      label: t.nav.categories,
      href: "/categories",
      explore: [{ label: pt ? "A escada até a F1" : "The Ladder to F1", href: "/categories" }],
      columns: [{ title: pt ? "Categorias" : "Formulae", links: CATEGORIES.map((c) => ({ label: c.name, href: `/categories/${c.slug}` })) }],
    },
    {
      id: "learn",
      label: t.nav.learn,
      href: "/learn",
      explore: [
        { label: pt ? "Aprenda Fórmula 1" : "Learn Formula 1", href: "/learn" },
        { label: pt ? "Comece aqui" : "Start Here", href: `/learn/${LESSONS[0].slug}` },
      ],
      columns: [
        {
          title: pt ? "Por nível" : "By level",
          links: (["Beginner", "Intermediate", "Advanced"] as const).map((l) => ({ label: t.learn.levels[l], href: `/learn?level=${l}` })),
        },
      ],
    },
  ];
}
