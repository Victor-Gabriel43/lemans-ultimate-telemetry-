import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Lang } from "@/lib/i18n/config";
import { REG_EXPLAINERS } from "@/lib/f1/technology";
import { techArticle } from "@/lib/f1/content";
import { TechArticleView } from "@/components/site/TechArticleView";

export function generateStaticParams() {
  return REG_EXPLAINERS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/regulations/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const a = techArticle(slug, "regulations", lang as Lang);
  return a ? { title: a.title, description: a.summary } : {};
}

export default async function RegulationExplainer({ params }: PageProps<"/[lang]/regulations/[slug]">) {
  const { lang, slug } = await params;
  const a = techArticle(slug, "regulations", lang as Lang);
  if (!a) notFound();
  return <TechArticleView a={a} lang={lang as Lang} />;
}
