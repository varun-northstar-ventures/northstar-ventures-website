import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";

import { RevealObserver } from "@/components/RevealObserver";
import { contactLinks, SITE_URL } from "@/content/site";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

const title = "Varun Nair | Autodesk Certified Instructor & Founder, Northstar Ventures";
const description =
  "Varun Nair is an Autodesk Certified Instructor with 12+ years of AutoCAD, Revit and professional software training, and founder of Northstar Ventures, supporting Autodesk Learning Partner onboarding and training programmes.";

// og:image / twitter:image come from app/opengraph-image.jpg and app/twitter-image.jpg.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  applicationName: "Northstar Ventures",
  authors: [{ name: "Varun Nair", url: SITE_URL }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Northstar Ventures",
    locale: "en_IN",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

/** Structured data so search engines understand who the site is about. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#varun-nair`,
      name: "Varun Nair",
      alternateName: "B Varun Nair",
      jobTitle: "Autodesk Certified Instructor",
      url: SITE_URL,
      image: `${SITE_URL}/opengraph-image.jpg`,
      email: "mailto:varun@northstar-ventures.in",
      worksFor: { "@id": `${SITE_URL}/#organization` },
      sameAs: contactLinks.filter((link) => link.href.startsWith("http")).map((link) => link.href),
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Northstar Ventures",
      url: SITE_URL,
      logo: `${SITE_URL}/logo-dark.svg`,
      founder: { "@id": `${SITE_URL}/#varun-nair` },
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#c800ff",
  // Light design only: tells browsers not to apply dark mode / auto-darkening.
  colorScheme: "only light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <head>
        {/* Enables reveal animations before first paint; content stays visible without JS. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
