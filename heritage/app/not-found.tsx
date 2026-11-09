import Link from "next/link";
import { Container } from "@/components/Section";

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="display mt-4 text-6xl">Not in the archive</h1>
      <p className="mt-4 text-soft">This record does not exist — or has not been researched yet.</p>
      <Link href="/vehicles" className="mt-8 inline-block rounded-full border hairline px-5 py-2.5 text-sm hover:border-mute">Browse the collection</Link>
    </Container>
  );
}
