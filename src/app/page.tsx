import type { Metadata } from "next";

import { SiteShell } from "@/components/site-shell";
import { getLocaleOpenGraph, siteData } from "@/lib/site-data";

const locale = siteData.defaultLanguage;
const languageData = siteData.languages[locale];

export const metadata: Metadata = {
  title: languageData.meta.title,
  description: languageData.meta.description,
  alternates: {
    canonical: "/",
    languages: {
      de: "/de",
      en: "/en",
    },
  },
  openGraph: {
    type: "website",
    title: languageData.meta.title,
    description: languageData.meta.description,
    locale: getLocaleOpenGraph(locale),
    images: [
      {
        url: "/assets/jana_guitar_bw.jpg",
        width: 1600,
        height: 1067,
        alt: languageData.meta.title,
      },
    ],
  },
};

export default function HomePage() {
  return <SiteShell locale={locale} siteData={siteData} />;
}