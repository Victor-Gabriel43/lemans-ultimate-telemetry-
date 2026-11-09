import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { Container, SectionHeading } from "@/components/Section";
import { country, TEAM_KINDS } from "@/lib/vocab";

export const metadata: Metadata = { title: "Teams" };

export default async function Teams() {
  const teams = await db.team.findMany({ include: { _count: { select: { entries: true, liveries: true } } }, orderBy: [{ kind: "asc" }, { name: "asc" }] });
  return (
    <Container className="py-16">
      <SectionHeading title="Racing teams" />
      <ul className="grid gap-px bg-asphalt md:grid-cols-2">
        {teams.map((t) => (
          <li key={t.id} className="bg-black">
            <Link href={`/teams/${t.slug}`} className="block p-6 hover:bg-pit">
              <p className="text-sm text-fog">{TEAM_KINDS[t.kind]} team, {country(t.country)}</p>
              <h2 className="display mt-2 text-3xl">{t.name}</h2>
              <p className="mt-2 text-sm text-fog">{t._count.entries} season entries, {t._count.liveries} liveries</p>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
