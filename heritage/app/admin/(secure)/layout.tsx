import Link from "next/link";
import type { Metadata } from "next";
import { requireAdmin, authMode } from "@/lib/auth";
import { MODELS } from "@/lib/admin-schema";
import { logout } from "@/lib/admin-actions";

export const metadata: Metadata = { title: "Curator dashboard", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  const mode = authMode();
  return (
    <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[220px_1fr] lg:px-10">
      <aside className="space-y-1 text-sm lg:sticky lg:top-24 lg:h-fit">
        <Link href="/admin" className="text-sm text-fog mb-4 block text-chalk">Curator dashboard</Link>
        {MODELS.map((m) => (
          <Link key={m.key} href={`/admin/${m.key}`} className="block rounded px-2 py-1.5 text-fog hover:bg-pit hover:text-chalk">{m.plural}</Link>
        ))}
        {mode === "password" ? (
          <form action={logout} className="pt-4"><button className="text-sm text-fog hover:text-chalk">Sign out</button></form>
        ) : null}
      </aside>
      <div>
        {mode === "open-dev" ? (
          <p className="mb-6 border border-lamp/40 bg-lamp/5 px-4 py-2 text-xs text-lamp">
            Development mode: no ADMIN_PASSWORD is set, so the dashboard is open. In production it is locked until a password is configured.
          </p>
        ) : null}
        {children}
      </div>
    </div>
  );
}
