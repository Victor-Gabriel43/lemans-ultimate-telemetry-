import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { LESSONS, LEVELS } from "@/lib/f1/learn";
import { LessonBrowser } from "@/components/site/LessonBrowser";
import { PageIntro } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Learn Formula 1",
  description: "Lessons on Formula One for beginners, intermediate and advanced fans.",
};

export default function LearnPage() {
  const total = LESSONS.reduce((n, l) => n + l.minutes, 0);
  return (
    <>
      <PageIntro
        crumbs={[{ label: "Learn" }]}
        eyebrow="Learn Formula 1"
        title="From first race to fluent."
        lede={`${LESSONS.length} short lessons — about ${total} minutes in total — organised by difficulty. Start as a beginner, or jump straight to the engineering.`}
      >
        <Link href="/learn/what-is-formula-1" className="btn btn-red">
          Start with lesson one
        </Link>
      </PageIntro>
      <section className="section-tight tone-off" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <Suspense fallback={<p className="muted">Loading lessons…</p>}>
            <LessonBrowser lessons={LESSONS} levels={LEVELS} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
