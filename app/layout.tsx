import type { Metadata } from "next";
import {
  IBM_Plex_Sans_Arabic,
  El_Messiri,
  Manrope,
  Instrument_Serif,
} from "next/font/google";
import "./globals.css";
import siteConfig from "@/data/site_config.json";
import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
import DirectionManager from "@/components/DirectionManager";

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

const elMessiri = El_Messiri({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-ar",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-english",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display-en",
  display: "swap",
});

import { getPageMetadata } from "@/lib/seo";

const baseMeta = getPageMetadata("ar", "home");

export const metadata: Metadata = {
  ...baseMeta,
  title: {
    default: (baseMeta.title as string) || siteConfig.brand.site_title_ar,
    template: `%s | ${siteConfig.brand.name_ar}`,
  },
  authors: [{ name: siteConfig.brand.name_ar }],
  creator: siteConfig.brand.name_ar,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "64x64", type: "image/x-icon" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${ibmArabic.variable} ${elMessiri.variable} ${manrope.variable} ${instrumentSerif.variable} font-sans antialiased`}
      >
        <SmoothScroll />
        <DirectionManager />
        <main className="min-h-screen flex flex-col">
          <Preloader />
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
