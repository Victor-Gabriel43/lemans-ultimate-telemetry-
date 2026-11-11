import Link from "next/link";
import { Mark } from "./Brand";
import { EXPERIENCES } from "./experiences";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-bg text-text">
      <div className="mx-auto max-w-[1400px] px-4 pt-24 sm:px-8">
        <div className="grid gap-10 border-b border-border pb-16 md:grid-cols-12">
          <div className="flex flex-col gap-5 md:col-span-5">
            <Mark className="h-8 w-auto self-start" />
            <p className="max-w-xs text-text-muted">
              Built for people who watch the timing screen at 4am — <span className="mi-serif text-text">and love it.</span>
            </p>
          </div>
          <nav aria-label="Experiências" className="md:col-span-4 md:col-start-7">
            <span className="mi-label text-text-dim">Experiences</span>
            <ul className="mt-5 flex flex-col gap-3">
              {EXPERIENCES.map((x) => (
                <li key={x.id}>
                  <Link href={x.href} className="mi-link text-text-muted transition-colors hover:text-text">
                    {x.title} {x.serif}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-2">
            <span className="mi-label text-text-dim">Tools</span>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <Link href="/calendar" className="mi-link text-text-muted transition-colors hover:text-text">World Calendar</Link>
              </li>
              <li>
                <Link href="/#race-room" className="mi-link text-text-muted transition-colors hover:text-text">Race Room</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-between gap-6 py-6">
          <span className="mi-label text-text-dim">
            © 2026 Motorsport Intelligence · Data: Jolpica F1 API, Wikipedia (CC BY-SA), OpenStreetMap (ODbL), bacinger/f1-circuits (MIT). Not affiliated with Formula 1.
          </span>
          <a href="#" className="mi-label text-text-dim transition-colors hover:text-brand">Back to top ↑</a>
        </div>
      </div>
      {/* Giant wordmark, bleeding off the bottom edge */}
      <div aria-hidden className="pointer-events-none select-none px-2 leading-none">
        <div className="mi-display translate-y-[18%] whitespace-nowrap text-center text-[15.2vw] text-surface-raised">
          Motorsport
        </div>
      </div>
    </footer>
  );
}
