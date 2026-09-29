import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Manrope } from "next/font/google";
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

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-english",
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

import { LoaderProvider } from "@/components/LoaderContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        "@id": `${siteConfig.contact.site_url}/#organization`,
        name: siteConfig.brand.name_ar,
        alternateName: siteConfig.brand.name_en,
        url: siteConfig.contact.site_url,
        logo: `${siteConfig.contact.site_url}/logo.svg`,
        telephone: siteConfig.contact.phone,
        email: siteConfig.contact.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Cairo",
          addressCountry: "EG",
        },
        sameAs: [
          siteConfig.social.facebook,
          siteConfig.social.instagram,
          siteConfig.social.linkedin,
          siteConfig.social.youtube,
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.contact.site_url}/#website`,
        url: siteConfig.contact.site_url,
        name: siteConfig.brand.name_ar,
        publisher: {
          "@id": `${siteConfig.contact.site_url}/#organization`,
        },
        inLanguage: ["ar-EG", "en-US"],
      },
    ],
  };

  return (
    <html lang="ar" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${ibmArabic.variable} ${manrope.variable} font-sans antialiased`}
      >
        <SmoothScroll />
        <DirectionManager />
        <LoaderProvider>
          <main className="min-h-screen flex flex-col">
            <Preloader />
            <Header />
            {children}
          </main>
        </LoaderProvider>
      </body>
    </html>
  );
}
