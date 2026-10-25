import type { Metadata } from "next";
import { Fraunces, Mukta, Rozha_One } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
});

// Covers both Latin and Devanagari body text
const mukta = Mukta({
  variable: "--font-mukta",
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "700"],
});

const rozha = Rozha_One({
  variable: "--font-rozha",
  subsets: ["devanagari", "latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thanelitfest.in"),
  title: {
    default: "Thane Literature Festival 2026",
    template: "%s · Thane Literature Festival 2026",
  },
  description:
    "The second edition of the Thane Literature Festival — three days of sessions in Marathi, Hindi and English, 4–6 December 2026. Free entry with prior registration.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${mukta.variable} ${rozha.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-cream text-ink">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-rani px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          Skip to content
        </a>
        <SiteHeader />
        {/* Each page renders its own <main id="main"> */}
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
