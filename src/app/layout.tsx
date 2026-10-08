import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";

import { RevealObserver } from "@/components/RevealObserver";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Varun Nair | Autodesk Certified Instructor & Founder, NorthStar Ventures",
  description:
    "Varun Nair is an Autodesk Certified Instructor with 12+ years of AutoCAD, Revit and professional software training, and founder of NorthStar Ventures, supporting Autodesk Learning Partner onboarding and training programmes.",
  openGraph: {
    title: "Varun Nair | Autodesk Certified Instructor",
    description:
      "Practical, industry-focused Autodesk training and Autodesk Learning Partner support from Varun Nair, founder of NorthStar Ventures.",
    type: "website",
  },
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
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
