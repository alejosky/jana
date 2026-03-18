import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/site-footer";
import { isSupportedLocale, siteData, SUPPORTED_LOCALES } from "@/lib/site-data";
import { SiteLanguageCode } from "@/types/site";

type SectionCopy = {
  title: string;
  placeholder: string;
};

const SECTION_CONTENT: Record<SiteLanguageCode, Record<string, SectionCopy>> = {
  de: {
    biografie: {
      title: "Biografie",
      placeholder: "Platzhalterseite: Inhalt für den Bereich Biografie folgt in Kürze.",
    },
    media: {
      title: "Media",
      placeholder: "Platzhalterseite: Inhalt für den Bereich Media folgt in Kürze.",
    },
    unterricht: {
      title: "Unterricht",
      placeholder: "Platzhalterseite: Inhalt für den Bereich Unterricht folgt in Kürze.",
    },
    inklusion: {
      title: "Inklusion",
      placeholder: "Platzhalterseite: Inhalt für den Bereich Inklusion folgt in Kürze.",
    },
    kontakt: {
      title: "Kontakt",
      placeholder: "Platzhalterseite: Inhalt für den Bereich Kontakt folgt in Kürze.",
    },
  },
  en: {
    biography: {
      title: "Biography",
      placeholder: "Placeholder page: Content for Biography will be added soon.",
    },
    media: {
      title: "Media",
      placeholder: "Placeholder page: Content for Media will be added soon.",
    },
    lessons: {
      title: "Lessons",
      placeholder: "Placeholder page: Content for Lessons will be added soon.",
    },
    inclusion: {
      title: "Inclusion",
      placeholder: "Placeholder page: Content for Inclusion will be added soon.",
    },
    contact: {
      title: "Contact",
      placeholder: "Placeholder page: Content for Contact will be added soon.",
    },
  },
};

type PageParams = {
  locale: string;
  section: string;
};

type PageProps = {
  params: Promise<PageParams>;
};

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    Object.keys(SECTION_CONTENT[locale]).map((section) => ({ locale, section })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, section } = await params;

  if (!isSupportedLocale(locale)) {
    return {};
  }

  const sectionCopy = SECTION_CONTENT[locale][section];

  if (!sectionCopy) {
    return {};
  }

  return {
    title: `${sectionCopy.title} | ${siteData.languages[locale].meta.title}`,
    description: sectionCopy.placeholder,
  };
}

export default async function SectionPage({ params }: PageProps) {
  const { locale, section } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const sectionCopy = SECTION_CONTENT[locale][section];

  if (!sectionCopy) {
    notFound();
  }

  return (
    <main className="content-card">
      <section className="intro" aria-labelledby="section-title">
        <header className="topbar intro-topbar">
          <h1 id="section-title">{sectionCopy.title}</h1>
        </header>
        <p className="intro__text">{sectionCopy.placeholder}</p>
        <p>
          <Link href={`/${locale}`}>{locale === "de" ? "Zurück zur Startseite" : "Back to home"}</Link>
        </p>
      </section>
      <SiteFooter socialItems={siteData.languages[locale].social} />
    </main>
  );
}
