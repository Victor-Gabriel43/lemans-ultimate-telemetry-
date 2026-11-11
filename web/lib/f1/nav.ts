import { ERAS } from "./eras";
import { CATEGORIES } from "./categories";

export type NavLink = { label: string; href: string };
export type NavSection = {
  id: string;
  label: string;
  href: string;
  explore: NavLink[];
  columns: { title: string; links: NavLink[] }[];
};

export const NAV: NavSection[] = [
  {
    id: "history",
    label: "History",
    href: "/history",
    explore: [
      { label: "Explore History", href: "/history" },
      { label: "The Timeline", href: "/history#timeline" },
      { label: "Every Season", href: "/seasons" },
    ],
    columns: [
      { title: "Eras", links: ERAS.slice(0, 4).map((e) => ({ label: `${e.decade} — ${e.name}`, href: `/history/${e.slug}` })) },
      { title: "", links: ERAS.slice(4).map((e) => ({ label: `${e.decade} — ${e.name}`, href: `/history/${e.slug}` })) },
    ],
  },
  {
    id: "seasons",
    label: "Seasons",
    href: "/seasons",
    explore: [
      { label: "All Seasons", href: "/seasons" },
      { label: "2026 Season", href: "/seasons/2026" },
      { label: "2025 Season", href: "/seasons/2025" },
    ],
    columns: [
      {
        title: "By decade",
        links: ERAS.slice(0, 4).map((e) => ({ label: e.decade, href: `/seasons?decade=${e.start}` })),
      },
      { title: "", links: ERAS.slice(4).map((e) => ({ label: e.decade, href: `/seasons?decade=${e.start}` })) },
    ],
  },
  {
    id: "drivers",
    label: "Drivers",
    href: "/drivers",
    explore: [
      { label: "All Drivers", href: "/drivers" },
      { label: "World Champions", href: "/drivers?filter=champions" },
      { label: "Current Drivers", href: "/drivers?filter=active" },
    ],
    columns: [
      {
        title: "Featured",
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
    label: "Teams",
    href: "/teams",
    explore: [
      { label: "All Teams", href: "/teams" },
      { label: "Current Grid", href: "/teams?filter=active" },
      { label: "Historic Teams", href: "/teams?filter=historic" },
    ],
    columns: [
      {
        title: "Current",
        links: [
          { label: "Ferrari", href: "/teams/ferrari" },
          { label: "McLaren", href: "/teams/mclaren" },
          { label: "Mercedes", href: "/teams/mercedes" },
          { label: "Red Bull Racing", href: "/teams/red-bull" },
          { label: "Williams", href: "/teams/williams" },
        ],
      },
      {
        title: "Historic",
        links: [
          { label: "Team Lotus", href: "/teams/lotus" },
          { label: "Brabham", href: "/teams/brabham" },
          { label: "Tyrrell", href: "/teams/tyrrell" },
          { label: "Cooper", href: "/teams/cooper" },
          { label: "Brawn GP", href: "/teams/brawn" },
        ],
      },
    ],
  },
  {
    id: "cars",
    label: "Cars",
    href: "/cars",
    explore: [
      { label: "The Car Archive", href: "/cars" },
      { label: "By Generation", href: "/cars#generations" },
    ],
    columns: [
      {
        title: "Landmark cars",
        links: [
          { label: "Lotus 25", href: "/cars/lotus-25" },
          { label: "Lotus 49", href: "/cars/lotus-49" },
          { label: "Lotus 79", href: "/cars/lotus-79" },
          { label: "McLaren MP4/4", href: "/cars/mclaren-mp4-4" },
        ],
      },
      {
        title: "",
        links: [
          { label: "Williams FW14B", href: "/cars/williams-fw14b" },
          { label: "Brawn BGP 001", href: "/cars/brawn-bgp-001" },
          { label: "Mercedes W05", href: "/cars/mercedes-w05" },
          { label: "Red Bull RB19", href: "/cars/red-bull-rb19" },
        ],
      },
    ],
  },
  {
    id: "circuits",
    label: "Circuits",
    href: "/circuits",
    explore: [
      { label: "All Circuits", href: "/circuits" },
      { label: "Street Circuits", href: "/circuits?type=Street" },
    ],
    columns: [
      {
        title: "Classics",
        links: [
          { label: "Silverstone", href: "/circuits/silverstone" },
          { label: "Monaco", href: "/circuits/monaco" },
          { label: "Monza", href: "/circuits/monza" },
          { label: "Spa-Francorchamps", href: "/circuits/spa-francorchamps" },
        ],
      },
      {
        title: "",
        links: [
          { label: "Suzuka", href: "/circuits/suzuka" },
          { label: "Interlagos", href: "/circuits/interlagos" },
          { label: "Singapore", href: "/circuits/singapore" },
          { label: "Las Vegas", href: "/circuits/las-vegas" },
        ],
      },
    ],
  },
  {
    id: "technology",
    label: "Technology",
    href: "/technology",
    explore: [
      { label: "Regulations & Technology", href: "/technology" },
      { label: "Safety", href: "/technology/safety" },
    ],
    columns: [
      {
        title: "Regulations",
        links: [
          { label: "Sporting regulations", href: "/technology/sporting-regulations" },
          { label: "Technical regulations", href: "/technology/technical-regulations" },
          { label: "Safety", href: "/technology/safety" },
        ],
      },
      {
        title: "Car systems",
        links: [
          { label: "Aerodynamics", href: "/technology/aerodynamics" },
          { label: "Power units", href: "/technology/power-units" },
          { label: "Tyres", href: "/technology/tyres" },
          { label: "Hybrid systems", href: "/technology/hybrid-systems" },
        ],
      },
    ],
  },
  {
    id: "race-weekend",
    label: "Race Weekend",
    href: "/race-weekend",
    explore: [
      { label: "How a Weekend Works", href: "/race-weekend" },
      { label: "Sprint Format", href: "/race-weekend?format=sprint" },
    ],
    columns: [
      {
        title: "During the race",
        links: [
          { label: "Pit stops", href: "/race-weekend#pit-stops" },
          { label: "Strategy", href: "/race-weekend#strategy" },
          { label: "Safety Car", href: "/race-weekend#safety-car" },
          { label: "Penalties", href: "/race-weekend#penalties" },
        ],
      },
    ],
  },
  {
    id: "categories",
    label: "Categories",
    href: "/categories",
    explore: [
      { label: "The Ladder to F1", href: "/categories" },
    ],
    columns: [
      { title: "Formulae", links: CATEGORIES.map((c) => ({ label: c.name, href: `/categories/${c.slug}` })) },
    ],
  },
  {
    id: "learn",
    label: "Learn",
    href: "/learn",
    explore: [
      { label: "Learn Formula 1", href: "/learn" },
      { label: "Start Here", href: "/learn/what-is-formula-1" },
    ],
    columns: [
      {
        title: "By level",
        links: [
          { label: "Beginner", href: "/learn?level=Beginner" },
          { label: "Intermediate", href: "/learn?level=Intermediate" },
          { label: "Advanced", href: "/learn?level=Advanced" },
        ],
      },
    ],
  },
];
