import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { SiteFooter } from "@/components/site-footer";
import { SiteMenu } from "@/components/site-menu";
import { getAllSectionParams, getResolvedPage } from "@/lib/page-data";
import { getLocaleOpenGraph, isSupportedLocale, siteData } from "@/lib/site-data";

type PageParams = {
  locale: string;
  section: string;
};

type PageProps = {
  params: Promise<PageParams>;
};

export function generateStaticParams() {
  return getAllSectionParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, section } = await params;

  if (!isSupportedLocale(locale)) {
    return {};
  }

  const page = await getResolvedPage(locale, section);

  if (!page) {
    return {};
  }

  return {
    title: `${page.title} | ${siteData.languages[locale].meta.title}`,
    description: page.description,
    alternates: {
      canonical: `/${locale}/${page.slug}`,
      languages: page.alternates,
    },
    openGraph: {
      type: "article",
      title: page.title,
      description: page.description,
      locale: getLocaleOpenGraph(locale),
      images: page.heroImage
        ? [
          {
            url: page.heroImage.src,
            width: page.heroImage.width,
            height: page.heroImage.height,
            alt: page.heroImage.alt,
          },
        ]
        : undefined,
    },
  };
}

export default async function SectionPage({ params }: PageProps) {
  const { locale, section } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const page = await getResolvedPage(locale, section);

  if (!page) {
    notFound();
  }

  return (
    <main className="main-content">
      <div className="content-page__menu-wrap">
        <Image
          src="/assets/logo.png"
          alt="Logo"
          className="content-page__menu-logo"
          width={144}
          height={144}
        />
        <SiteMenu locale={locale} siteData={siteData} />
      </div>
      <article className="content-page" aria-labelledby="section-title">
        <header className="topbar intro-topbar content-page__header">
          <h1 id="section-title">{page.title}</h1>
        </header>
        <p className="content-page__summary">{page.description}</p>

        {page.heroImage ? (
          <figure className="content-page__hero">
            <Image
              src={page.heroImage.src}
              alt={page.heroImage.alt}
              width={page.heroImage.width}
              height={page.heroImage.height}
              className="content-page__hero-image"
            />
            {page.heroImage.caption ? (
              <figcaption className="content-page__caption">{page.heroImage.caption}</figcaption>
            ) : null}
          </figure>
        ) : null}

        <div className="markdown-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{page.bodyContent}</ReactMarkdown>
        </div>

        {page.gallery?.length ? (
          <section className="content-page__gallery" aria-label={locale === "de" ? "Galerie" : "Gallery"}>
            {page.gallery.map((image) => (
              <figure key={image.src} className="content-page__gallery-item">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="content-page__gallery-image"
                />
                {image.caption ? (
                  <figcaption className="content-page__caption">{image.caption}</figcaption>
                ) : null}
              </figure>
            ))}
          </section>
        ) : null}

        {page.embeds?.length ? (
          <section className="content-page__embeds" aria-label={locale === "de" ? "Eingebettete Medien" : "Embedded media"}>
            {page.embeds.map((embed) => (
              <div className="content-page__embed" key={embed.src}>
                <iframe
                  src={embed.src}
                  title={embed.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ))}
          </section>
        ) : null}

        {page.downloads?.length ? (
          <section className="content-page__downloads" aria-label={locale === "de" ? "Downloads" : "Downloads"}>
            <h2>{locale === "de" ? "Downloads" : "Downloads"}</h2>
            <ul className="content-page__download-list">
              {page.downloads.map((download) => (
                <li key={download.href}>
                  <a href={download.href}>{download.label}</a>
                  {download.description ? <span>{` — ${download.description}`}</span> : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <p className="content-page__backlink">
          <Link href={`/${locale}`}>{locale === "de" ? "Zurück zur Startseite" : "Back to home"}</Link>
        </p>
      </article>
      <SiteFooter socialItems={siteData.languages[locale].social} />
    </main>
  );
}
