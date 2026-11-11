import Link from "next/link";
import { lp, type Lang } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dict";

export function SiteFooter({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const cols: { title: string; links: [string, string][] }[] = [
    { title: t.footer.explore, links: [[t.nav.history, "/history"], [t.nav.seasons, "/seasons"], [t.nav.drivers, "/drivers"], [t.nav.teams, "/teams"]] },
    { title: t.footer.engineering, links: [[t.nav.cars, "/cars"], [t.nav.engineering, "/engineering"], [t.nav.regulations, "/regulations"], [t.regulations.archiveEyebrow, "/regulations/archive"]] },
    { title: t.footer.sport, links: [[t.nav.circuits, "/circuits"], [t.nav.weekend, "/race-weekend"], [t.nav.categories, "/categories"], ["Formula 2", "/categories/formula-2"]] },
    {
      title: t.footer.learn,
      links: [
        [t.learn.levels.Beginner, "/learn?level=Beginner"],
        [t.learn.levels.Intermediate, "/learn?level=Intermediate"],
        [t.learn.levels.Advanced, "/learn?level=Advanced"],
        [t.nav.search, "/search"],
      ],
    },
    { title: t.footer.about, links: [[t.footer.aboutPaddock, "/about"], [t.footer.dataSources, "/about#data"], [t.footer.imagePolicy, "/about#images"], [t.about.creditsTitle, "/about#credits"]] },
  ];
  return (
    <footer className="gfoot">
      <div className="wrap-wide">
        <div className="gfoot-notes">
          <p>{t.footer.disclaimer}</p>
          <p>
            {t.footer.data}{" "}
            <Link href={lp(lang, "/about#data")} className="inline-link">
              {t.footer.dataLink}
            </Link>
            .
          </p>
        </div>
        <div className="gfoot-cols">
          {cols.map((c) => (
            <div key={c.title} className="gfoot-col">
              <h3>{c.title}</h3>
              {c.links.map(([label, href]) => (
                <Link key={href} href={lp(lang, href)}>
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="gfoot-legal">
          <span>{t.footer.bottom}</span>
          <span className="flex-row" style={{ gap: 16 }}>
            <Link href={lp(lang, "/about")}>{t.footer.about}</Link>
            <a href={lang === "pt" ? "/en" : "/"}>{t.nav.switchTo}</a>
            {/* different root layout → full navigation is required */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/race-engineer">{t.footer.raceEngineer}</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
