"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { lp, stripLang } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dict";

export default function NotFound() {
  const { lang } = stripLang(usePathname() ?? "/");
  const t = getDict(lang);
  return (
    <section className="section tone-paper">
      <div className="wrap center">
        <p className="eyebrow-f1">{t.notFound.eyebrow}</p>
        <h1 className="display">{t.notFound.title}</h1>
        <p className="lede mx-auto mt-s" style={{ maxWidth: 560 }}>
          {t.notFound.lede}
        </p>
        <div className="flex-row mt-m" style={{ justifyContent: "center" }}>
          <Link href={lp(lang, "/")} className="btn btn-primary">
            {t.notFound.home}
          </Link>
          <Link href={lp(lang, "/search")} className="btn btn-ghost">
            {t.search.title}
          </Link>
        </div>
      </div>
    </section>
  );
}
