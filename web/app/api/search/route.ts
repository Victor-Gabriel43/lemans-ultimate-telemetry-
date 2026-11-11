import { NextResponse, type NextRequest } from "next/server";
import { isLang } from "@/lib/i18n/config";
import { search, type SearchKind } from "@/lib/f1/search";

/** Global search across every Paddock entity and indexed FIA article titles. */
export function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const lang = sp.get("lang") ?? "pt";
  const q = sp.get("q") ?? "";
  const kind = (sp.get("kind") || undefined) as SearchKind | undefined;
  const limit = Math.min(Number(sp.get("limit") ?? 30) || 30, 200);
  if (!isLang(lang)) return NextResponse.json({ error: "lang" }, { status: 400 });
  return NextResponse.json({ results: search(lang, q, limit, kind) });
}
