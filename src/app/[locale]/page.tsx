import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteShell } from "@/components/site-shell";
import {
  getLocaleOpenGraph,
  isSupportedLocale,
  siteData,
  SUPPORTED_LOCALES,
} from "@/lib/site-data";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    return {};
  }

  const languageData = siteData.languages[locale];

  return {
    title: languageData.meta.title,
    description: languageData.meta.description,
    alternates: {
      canonical: `/${locale}`,
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
}

export default async function LocalePage({ params }: PageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return <SiteShell locale={locale} siteData={siteData} />;
}