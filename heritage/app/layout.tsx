import type { Metadata } from "next";
import { Archivo, Source_Serif_4 } from "next/font/google";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo" });
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-source-serif" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3100"),
  title: { default: "Racing Heritage Archive", template: "%s | Racing Heritage Archive" },
  description: "A photographic archive of racing cars: histories, specifications, teams, drivers, results and every livery they raced in, with sources for every record.",
  openGraph: { siteName: "Racing Heritage Archive", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${serif.variable}`}>
      <body className="min-h-screen">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-chalk focus:px-3 focus:py-2 focus:text-black">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
