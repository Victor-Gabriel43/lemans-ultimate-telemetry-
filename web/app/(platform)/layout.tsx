import { SiteNav } from "@/components/mi/SiteNav";
import { SiteFooter } from "@/components/mi/SiteFooter";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      <main className="flex-1 bg-bg text-text">{children}</main>
      <SiteFooter />
    </>
  );
}
