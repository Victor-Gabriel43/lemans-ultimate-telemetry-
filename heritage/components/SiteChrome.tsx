import Link from "next/link";
import { Container } from "./Section";

const NAV = [
  { href: "/vehicles", label: "Collection" },
  { href: "/liveries", label: "Liveries" },
  { href: "/vehicles/porsche-963/timeline", label: "Timeline" },
  { href: "/vehicles/porsche-963/compare", label: "Compare" },
  { href: "/sources", label: "Method" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b hairline bg-ink/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="group flex items-baseline gap-3">
          <span className="display text-xl tracking-tight">Racing Heritage</span>
          <span className="eyebrow hidden sm:inline group-hover:text-paper">Archive</span>
        </Link>
        <nav aria-label="Primary" className="scrollbar-none -mr-2 flex items-center gap-1 overflow-x-auto text-sm">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="hidden whitespace-nowrap rounded-full px-3 py-1.5 text-soft transition-colors hover:text-paper md:block">
              {n.label}
            </Link>
          ))}
          <Link href="/search" aria-label="Search the archive" className="rounded-full border hairline px-3 py-1.5 text-soft transition-colors hover:border-mute hover:text-paper">
            Search
          </Link>
        </nav>
      </Container>
      <nav aria-label="Primary mobile" className="scrollbar-none flex gap-1 overflow-x-auto border-t hairline px-4 py-2 text-sm md:hidden">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className="whitespace-nowrap rounded-full px-3 py-1 text-soft hover:text-paper">
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t hairline">
      <Container className="grid gap-10 py-14 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="display text-3xl">Racing Heritage Archive</p>
          <p className="mt-3 max-w-md text-sm text-mute">
            A digital museum and technical encyclopaedia of racing cars. Every record carries its sources and a verification
            status; information that could not be confirmed is marked as such and never presented as fact.
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="eyebrow mb-3">Archive</p>
          <Link className="block text-soft hover:text-paper" href="/vehicles">Vehicle collection</Link>
          <Link className="block text-soft hover:text-paper" href="/liveries">Livery archive</Link>
          <Link className="block text-soft hover:text-paper" href="/teams">Teams</Link>
          <Link className="block text-soft hover:text-paper" href="/drivers">Drivers</Link>
        </div>
        <div className="space-y-2 text-sm">
          <p className="eyebrow mb-3">Research</p>
          <Link className="block text-soft hover:text-paper" href="/sources">Method &amp; sources</Link>
          <Link className="block text-soft hover:text-paper" href="/admin">Curator dashboard</Link>
        </div>
      </Container>
      <Container className="border-t hairline py-6">
        <p className="font-mono text-[11px] text-mute">
          Independent archive — not affiliated with any manufacturer, team or series organiser. Trademarks belong to their owners.
          Livery images are archival illustrations unless credited as photographs.
        </p>
      </Container>
    </footer>
  );
}
