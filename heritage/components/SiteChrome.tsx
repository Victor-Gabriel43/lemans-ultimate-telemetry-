import Link from "next/link";
import { Container } from "./Section";

const NAV = [
  { href: "/vehicles", label: "Collection" },
  { href: "/liveries", label: "Liveries" },
  { href: "/vehicles/porsche-963/timeline", label: "Timeline" },
  { href: "/vehicles/porsche-963/compare", label: "Compare" },
  { href: "/sources", label: "Sources" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b rule bg-black/85 backdrop-blur-md">
      <Container className="flex h-14 items-center justify-between gap-6">
        <Link href="/" className="display text-[1.6rem] leading-none whitespace-nowrap">
          Racing Heritage Archive
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 text-[15px] md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-fog transition-colors hover:text-chalk">{n.label}</Link>
          ))}
          <Link href="/search" className="rounded-full bg-chalk px-4 py-1.5 text-black hover:bg-white">Search</Link>
        </nav>
        <Link href="/search" className="rounded-full bg-chalk px-3 py-1 text-sm text-black md:hidden">Search</Link>
      </Container>
      <nav aria-label="Primary mobile" className="scrollbar-none flex gap-5 overflow-x-auto border-t rule px-4 py-2 text-sm md:hidden">
        {NAV.map((n) => <Link key={n.href} href={n.href} className="whitespace-nowrap text-fog hover:text-chalk">{n.label}</Link>)}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t rule bg-pit">
      <Container className="grid gap-10 py-16 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="display text-5xl">Racing Heritage Archive</p>
          <p className="mt-4 max-w-md font-serif text-fog">
            Racing cars, the people who raced them and every colour they wore. Each record names its sources, and anything not yet
            confirmed is marked as such.
          </p>
        </div>
        <div className="space-y-2 text-[15px]">
          <p className="mb-3 font-semibold">Archive</p>
          <Link className="block text-fog hover:text-chalk" href="/vehicles">Vehicle collection</Link>
          <Link className="block text-fog hover:text-chalk" href="/liveries">Livery archive</Link>
          <Link className="block text-fog hover:text-chalk" href="/teams">Teams</Link>
          <Link className="block text-fog hover:text-chalk" href="/drivers">Drivers</Link>
        </div>
        <div className="space-y-2 text-[15px]">
          <p className="mb-3 font-semibold">Research</p>
          <Link className="block text-fog hover:text-chalk" href="/sources">How we verify</Link>
          <Link className="block text-fog hover:text-chalk" href="/admin">Curator dashboard</Link>
        </div>
      </Container>
      <Container className="border-t rule py-6">
        <p className="text-[13px] text-fog">
          Independent archive, not affiliated with any manufacturer, team or series organiser. Photographs are credited to their authors
          and used under the licence shown with each image.
        </p>
      </Container>
    </footer>
  );
}
