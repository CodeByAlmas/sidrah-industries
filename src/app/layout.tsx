import type { Metadata } from "next";
import { Syne, Karla, Azeret_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/ui/Preloader";
import { ShedTransition } from "@/components/ui/ShedTransition";
import { ScrollThread } from "@/components/ui/ScrollThread";
import { Warp } from "@/components/ui/Warp";
import { RevealProvider } from "@/components/ui/Reveal";
import { Cursor } from "@/components/ui/Cursor";
import { site } from "@/data/site";

const display = Syne({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-display", display: "swap" });
const sans = Karla({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-sans", display: "swap" });
const mono = Azeret_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
  themeColor: "#141613",
};

const getBaseUrl = () => {
  try {
    return new URL(site.siteUrl || "https://www.sidrahindustries.com");
  } catch {
    return new URL("https://www.sidrahindustries.com");
  }
};

export const metadata: Metadata = {
  metadataBase: getBaseUrl(),
  title: {
    default: `${site.name} — industrial woven fabric & multiple-ply yarn`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "heavy canvas manufacturer India",
    "filter cloth manufacturer",
    "tarpaulin manufacturer Unnao",
    "multiple ply yarn supplier",
    "industrial fabric exporter India",
    "canvas tent manufacturer",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — industrial woven fabric & multiple-ply yarn`,
    description: site.description,
    locale: "en_IN",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    description: site.description,
    url: site.siteUrl,
    telephone: site.phoneDisplay,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.postalCode,
      addressCountry: "IN",
    },
  };

  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[99] focus:bg-indigo focus:px-4 focus:py-2 focus:text-cloth-3"
        >
          Skip to content
        </a>

        <Preloader />
        <ScrollThread />
        <Warp />
        <ShedTransition />
        <RevealProvider />
        <Cursor />

        <Navbar />
        <main id="main">{children}</main>
        <Footer />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}