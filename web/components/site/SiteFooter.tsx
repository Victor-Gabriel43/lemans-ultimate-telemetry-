import Link from "next/link";

const COLS: { title: string; links: [string, string][] }[] = [
  {
    title: "Explore",
    links: [
      ["History", "/history"],
      ["Seasons", "/seasons"],
      ["Drivers", "/drivers"],
      ["Teams", "/teams"],
    ],
  },
  {
    title: "Engineering",
    links: [
      ["Cars", "/cars"],
      ["Regulations & Technology", "/technology"],
      ["Aerodynamics", "/technology/aerodynamics"],
      ["Power units", "/technology/power-units"],
    ],
  },
  {
    title: "The Sport",
    links: [
      ["Circuits", "/circuits"],
      ["Race Weekends", "/race-weekend"],
      ["Other Categories", "/categories"],
      ["Formula 2", "/categories/formula-2"],
    ],
  },
  {
    title: "Learn",
    links: [
      ["Start Here", "/learn/what-is-formula-1"],
      ["Beginner", "/learn?level=Beginner"],
      ["Intermediate", "/learn?level=Intermediate"],
      ["Advanced", "/learn?level=Advanced"],
    ],
  },
  {
    title: "About",
    links: [
      ["About Paddock", "/about"],
      ["Data & Sources", "/about#data"],
      ["Image Policy", "/about#images"],
      ["Search", "/search"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="gfoot">
      <div className="wrap-wide">
        <div className="gfoot-notes">
          <p>
            Paddock is an independent educational encyclopedia and is not affiliated with Formula One Group, the FIA or any team.
            Formula 1, F1 and related marks are trademarks of their respective owners.
          </p>
          <p>
            Editorial content is written for learning. Record-level statistics, calendars and results are being verified against
            official sources and will be published in a later phase. <Link href="/about#data" className="inline-link">Learn how we handle data.</Link>
          </p>
        </div>
        <div className="gfoot-cols">
          {COLS.map((c) => (
            <div key={c.title} className="gfoot-col">
              <h3>{c.title}</h3>
              {c.links.map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="gfoot-legal">
          <span>Paddock — The Formula 1 Encyclopedia. Phase 1: design and content structure.</span>
          <span className="flex-row" style={{ gap: 16 }}>
            <Link href="/about">About</Link>
            <Link href="/race-engineer">LMU Race Engineer</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
