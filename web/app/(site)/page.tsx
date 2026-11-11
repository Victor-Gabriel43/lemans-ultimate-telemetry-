import Link from "next/link";
import { ArrowRight, BookOpen, Flag, Gauge, Layers, Map, Trophy, Users, Wrench } from "lucide-react";
import { ERAS } from "@/lib/f1/eras";
import { DRIVERS } from "@/lib/f1/drivers";
import { CARS } from "@/lib/f1/cars";
import { CIRCUITS } from "@/lib/f1/circuits";
import { CATEGORIES } from "@/lib/f1/categories";
import { LESSONS } from "@/lib/f1/learn";
import { SEASONS } from "@/lib/f1/seasons";
import { TEAMS } from "@/lib/f1/teams";
import { EraTimeline } from "@/components/site/EraTimeline";
import { CarCard, CircuitCard, DriverCard } from "@/components/site/cards";
import { LinkArrow, Plate, SectionHead, Stat } from "@/components/site/ui";

export const metadata = {
  title: { absolute: "Paddock — The Formula 1 Encyclopedia" },
};

const completedSeasons = SEASONS.filter((s) => s.status === "complete").length;
const distinctChampions = new Set(SEASONS.map((s) => s.champions?.driver).filter(Boolean)).size;

const FEATURED_DRIVERS = ["juan-manuel-fangio", "jim-clark", "niki-lauda", "ayrton-senna", "michael-schumacher", "lewis-hamilton", "max-verstappen", "lando-norris"];
const FEATURED_CARS = ["lotus-25", "lotus-49", "lotus-79", "mclaren-mp4-4", "williams-fw14b", "brawn-bgp-001", "mercedes-w05", "red-bull-rb19"];
const FEATURED_CIRCUITS = ["silverstone", "monaco", "monza", "spa-francorchamps", "suzuka", "interlagos"];

export default function Home() {
  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="tone-night" style={{ paddingTop: "clamp(56px,9vw,112px)", overflow: "hidden" }}>
        <div className="wrap center">
          <p className="eyebrow-f1 rise">The Formula 1 Encyclopedia</p>
          <h1 className="display balance rise rise-2" style={{ fontSize: "clamp(48px, 9vw, 112px)" }}>
            Seventy-six seasons.
            <br />
            <span className="gradient-ink">One story.</span>
          </h1>
          <p className="lede mx-auto mt-m pretty rise rise-3" style={{ maxWidth: 680 }}>
            From the first World Championship race at Silverstone in 1950 to the new formula of 2026 — the drivers, teams, cars,
            circuits and ideas that made Formula One.
          </p>
          <div className="flex-row mt-m rise rise-3" style={{ justifyContent: "center" }}>
            <Link href="/history" className="btn btn-red">
              Begin with the history
            </Link>
            <Link href="/learn" className="btn btn-ghost">
              New to F1? Start here
            </Link>
          </div>
        </div>
        <div className="wrap-wide" style={{ marginTop: "clamp(48px,7vw,88px)" }}>
          <Plate
            alt="Formula One, 1950 to 2026"
            mediaId="home-hero"
            tone="red"
            ratio="ratio-cinema"
            priority
            tag="1950 — 2026"
            glyph={<span style={{ fontSize: "clamp(72px,16vw,240px)" }}>F1</span>}
            className="rise rise-3"
          />
        </div>
        <div style={{ height: "clamp(56px,8vw,96px)" }} />
      </section>

      {/* ----------------------------------------------------- Introduction */}
      <section className="section tone-paper">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <div>
              <p className="eyebrow-f1">What is Formula One?</p>
              <h2 className="headline balance">The pinnacle of single-seater racing.</h2>
            </div>
            <div className="prose">
              <p>
                Formula One is the highest class of open-wheel racing sanctioned by the FIA. The <strong>“formula”</strong> is the
                set of rules every car must obey — and inside those rules, each team designs and builds its own car.
              </p>
              <p>
                That makes Formula One two contests at once: a <strong>drivers’ championship</strong> decided by talent and
                racecraft, and a <strong>constructors’ championship</strong> decided by engineering, organisation and strategy.
              </p>
              <p>
                <LinkArrow href="/learn/what-is-formula-1">Read the beginner’s guide</LinkArrow>
              </p>
            </div>
          </div>

          <div className="stat-row mt-xl">
            <Stat value={completedSeasons} label="Completed World Championship seasons, 1950–2025" />
            <Stat value={distinctChampions} label="Different drivers have been world champion" />
            <Stat value="1958" label="The first constructors’ championship" />
            <Stat value="11" label="Teams on the 2026 grid — the first eleven-team field since 2016" />
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- History */}
      <section className="section tone-off" id="history">
        <div className="wrap">
          <SectionHead
            eyebrow="History"
            title="Eight decades. Eight chapters."
            lede="Every era of Formula One was shaped by a new idea — a rear engine, a wing, a carbon chassis, a hybrid power unit. Choose a decade to begin."
            action={<LinkArrow href="/history">Explore the full history</LinkArrow>}
          />
          <EraTimeline eras={ERAS} />
        </div>
      </section>

      {/* ---------------------------------------------------- Current era */}
      <section className="section tone-night">
        <div className="wrap">
          <SectionHead
            eyebrow="The current era"
            title={
              <>
                2026. <span style={{ color: "var(--on-night-2)" }}>A new formula.</span>
              </>
            }
            lede="Smaller, lighter cars. Wings that change shape on the straights. Power units with a far larger electric share, running on fully sustainable fuel. And eleven teams on the grid."
            action={<LinkArrow href="/seasons/2026">Inside the 2026 season</LinkArrow>}
          />
          <div className="grid grid-4">
            {[
              { icon: Layers, title: "Active aerodynamics", text: "Movable front and rear wing elements switch between cornering and low-drag modes.", href: "/technology/aerodynamics" },
              { icon: Gauge, title: "New power units", text: "No MGU-H, a much more powerful MGU-K and a near-even split between combustion and electric power.", href: "/technology/power-units" },
              { icon: Flag, title: "Sustainable fuel", text: "Every car runs on fuel made entirely from non-fossil sources.", href: "/technology/fuel" },
              { icon: Users, title: "Eleven teams", text: "Cadillac joins the grid and Audi arrives as a full works manufacturer.", href: "/teams?filter=active" },
            ].map((f) => (
              <Link key={f.title} href={f.href} className="tile tile-link">
                <div className="tile-body">
                  <f.icon size={28} strokeWidth={1.6} color="#ff5a4f" aria-hidden />
                  <p className="title-3 mt-s">{f.title}</p>
                  <p className="small muted pretty">{f.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Drivers & teams */}
      <section className="section tone-paper">
        <div className="wrap-wide">
          <SectionHead
            eyebrow="Drivers & teams"
            title="The people who raced. The teams who built."
            lede="Profiles of world champions and legends, and the constructors behind them — from Ferrari, present since 1950, to the newest entrants of 2026."
          />
        </div>
        <div className="rail" aria-label="Featured drivers">
          {FEATURED_DRIVERS.map((slug) => {
            const d = DRIVERS.find((x) => x.slug === slug)!;
            return <DriverCard key={slug} d={d} />;
          })}
        </div>
        <div className="wrap-wide mt-l">
          <div className="grid grid-2">
            <Link href="/drivers" className="tile tile-link tone-off" style={{ background: "var(--paper-2)" }}>
              <div className="tile-body">
                <Trophy size={28} strokeWidth={1.6} color="var(--red)" aria-hidden />
                <p className="title-2 mt-s">Driver archive</p>
                <p className="muted">
                  {DRIVERS.length} profiles with career timelines, teams and championships. Filter by era, nationality or titles.
                </p>
                <span className="link-arrow mt-s">
                  Browse drivers <ArrowRight size={16} />
                </span>
              </div>
            </Link>
            <Link href="/teams" className="tile tile-link" style={{ background: "var(--paper-2)" }}>
              <div className="tile-body">
                <Wrench size={28} strokeWidth={1.6} color="var(--red)" aria-hidden />
                <p className="title-2 mt-s">Teams & constructors</p>
                <p className="muted">
                  {TEAMS.length} teams — their history, identity, lineage and championships, past and present.
                </p>
                <span className="link-arrow mt-s">
                  Browse teams <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Cars */}
      <section className="section tone-off">
        <div className="wrap-wide">
          <SectionHead
            eyebrow="Cars & engineering"
            title="Machines that changed the rules of the game."
            lede="The monocoque, the stressed engine, ground effect, carbon fibre, active suspension, the double diffuser, the hybrid. Each landmark car tells the story of an idea."
            action={<LinkArrow href="/cars">Open the car archive</LinkArrow>}
          />
        </div>
        <div className="rail" aria-label="Landmark cars">
          {FEATURED_CARS.map((slug) => (
            <CarCard key={slug} c={CARS.find((c) => c.slug === slug)!} />
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------ Circuits */}
      <section className="section tone-paper">
        <div className="wrap-wide">
          <SectionHead
            eyebrow="Circuits"
            title="From Silverstone’s airfield to the Las Vegas Strip."
            lede="Permanent racetracks, historic road courses and modern street circuits — each with its own character, history and demands."
            action={<LinkArrow href="/circuits">All circuits</LinkArrow>}
          />
          <div className="grid grid-3">
            {FEATURED_CIRCUITS.map((slug) => (
              <CircuitCard key={slug} c={CIRCUITS.find((c) => c.slug === slug)!} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------- Weekend + technology */}
      <section className="section tone-off">
        <div className="wrap-wide">
          <div className="grid grid-2">
            <Link href="/race-weekend" className="tile tile-link tile-dark" style={{ minHeight: 420 }}>
              <div className="tile-body" style={{ justifyContent: "space-between" }}>
                <div>
                  <p className="eyebrow-f1" style={{ color: "#ff5a4f" }}>
                    Race weekends
                  </p>
                  <p className="title-1 balance">Friday to Sunday, explained.</p>
                  <p className="muted mt-s">Practice, qualifying, sprints, the Grand Prix, pit stops, the Safety Car and penalties.</p>
                </div>
                <div className="flex-row" style={{ gap: 8 }}>
                  {["Practice", "Qualifying", "Sprint", "Grand Prix"].map((s) => (
                    <span key={s} className="badge">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
            <Link href="/technology" className="tile tile-link" style={{ minHeight: 420, background: "var(--paper)" }}>
              <div className="tile-body" style={{ justifyContent: "space-between" }}>
                <div>
                  <p className="eyebrow-f1">Regulations & technology</p>
                  <p className="title-1 balance">How a Formula One car really works.</p>
                  <p className="muted mt-s">Aerodynamics, power units, tyres, fuel, brakes, suspension, chassis and safety — clearly explained.</p>
                </div>
                <div className="flex-row" style={{ gap: 8 }}>
                  {["Aero", "Power units", "Tyres", "Safety"].map((s) => (
                    <span key={s} className="badge">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Other categories */}
      <section className="section tone-paper">
        <div className="wrap">
          <SectionHead
            center
            eyebrow="Beyond Formula One"
            title="Every champion climbs a ladder."
            lede="Karting, Formula 4, F1 Academy, Formula Regional, Formula 3 and Formula 2 — the pathway that develops the drivers of the future."
          />
          <ol className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
            {[...CATEGORIES].sort((a, b) => a.ladderStep - b.ladderStep).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/categories/${c.slug}`}
                  className="tile tile-link"
                  style={{ background: c.colorSoft, height: "100%" }}
                >
                  <div className="tile-body" style={{ padding: 20 }}>
                    <span className="kicker" style={{ color: "var(--ink-2)" }}>
                      Step {c.ladderStep}
                    </span>
                    <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.04em", color: c.color, lineHeight: 1 }}>{c.short}</span>
                    <span className="small" style={{ fontWeight: 600 }}>
                      {c.name}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
          <p className="center mt-m">
            <LinkArrow href="/categories">How the ladder works</LinkArrow>
          </p>
        </div>
      </section>

      {/* ----------------------------------------------------------- Learn */}
      <section className="section tone-off">
        <div className="wrap">
          <SectionHead
            eyebrow="Learn Formula 1"
            title="Complicated, made clear."
            lede="Short lessons organised from beginner to advanced. No prior knowledge required — but nothing is dumbed down."
            action={<LinkArrow href="/learn">All lessons</LinkArrow>}
          />
          <div className="grid grid-3">
            {(["Beginner", "Intermediate", "Advanced"] as const).map((level) => {
              const lessons = LESSONS.filter((l) => l.level === level).slice(0, 3);
              return (
                <div key={level} className="tile" style={{ background: "var(--paper)" }}>
                  <div className="tile-body">
                    <span className={`badge ${level === "Beginner" ? "badge-red" : ""}`} style={{ alignSelf: "flex-start" }}>
                      {level}
                    </span>
                    <ul style={{ marginTop: 10 }}>
                      {lessons.map((l) => (
                        <li key={l.slug} style={{ borderTop: "1px solid var(--line-soft)" }}>
                          <Link href={`/learn/${l.slug}`} className="flex-row space-between" style={{ padding: "12px 0", flexWrap: "nowrap" }}>
                            <span style={{ fontWeight: 600 }}>{l.title}</span>
                            <span className="caption">{l.minutes} min</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <LinkArrow href={`/learn?level=${level}`} className="mt-xs">
                      {level} lessons
                    </LinkArrow>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Explore */}
      <section className="section-tight tone-paper">
        <div className="wrap">
          <p className="kicker">Explore the encyclopedia</p>
          <div className="grid grid-4 keep-2 mt-s">
            {[
              { icon: BookOpen, label: "History", href: "/history" },
              { icon: Flag, label: "Seasons", href: "/seasons" },
              { icon: Trophy, label: "Drivers", href: "/drivers" },
              { icon: Users, label: "Teams", href: "/teams" },
              { icon: Wrench, label: "Cars", href: "/cars" },
              { icon: Map, label: "Circuits", href: "/circuits" },
              { icon: Gauge, label: "Technology", href: "/technology" },
              { icon: Layers, label: "Categories", href: "/categories" },
            ].map((x) => (
              <Link key={x.href} href={x.href} className="card" style={{ flexDirection: "row", alignItems: "center", gap: 14, padding: "18px 20px" }}>
                <x.icon size={22} strokeWidth={1.7} color="var(--red)" aria-hidden />
                <span style={{ fontWeight: 600 }}>{x.label}</span>
                <ArrowRight size={16} style={{ marginLeft: "auto", color: "var(--ink-3)" }} aria-hidden />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
