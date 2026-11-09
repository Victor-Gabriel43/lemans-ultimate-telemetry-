import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { Container, SectionHeading } from "@/components/Section";

export const metadata: Metadata = { title: "Drivers" };

export default async function Drivers() {
  const drivers = await db.driver.findMany({ include: { _count: { select: { entries: true } } }, orderBy: { name: "asc" } });
  return (
    <Container className="py-16">
      <SectionHeading title="Drivers in the archive">{drivers.length} drivers documented.</SectionHeading>
      <ul className="grid gap-px bg-asphalt sm:grid-cols-2 lg:grid-cols-4">
        {drivers.map((d) => (
          <li key={d.id} className="bg-black">
            <Link href={`/drivers/${d.slug}`} className="flex items-baseline justify-between p-4 hover:bg-pit">
              <span>{d.name}</span><span className=" text-[11px] text-fog">{d.nationality}, {d._count.entries} {d._count.entries === 1 ? "entry" : "entries"}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
