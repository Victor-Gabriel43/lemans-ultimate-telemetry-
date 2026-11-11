import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section tone-paper">
      <div className="wrap center">
        <p className="eyebrow-f1">404 · Off track</p>
        <h1 className="display">This page took the escape road.</h1>
        <p className="lede mx-auto mt-s" style={{ maxWidth: 560 }}>
          The page you were looking for doesn’t exist. Try the search, or head back to the start.
        </p>
        <div className="flex-row mt-m" style={{ justifyContent: "center" }}>
          <Link href="/" className="btn btn-primary">
            Home
          </Link>
          <Link href="/search" className="btn btn-ghost">
            Search
          </Link>
        </div>
      </div>
    </section>
  );
}
