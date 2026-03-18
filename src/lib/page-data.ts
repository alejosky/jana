import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

import pagesJson from "@/data/pages.json";
import { SUPPORTED_LOCALES } from "@/lib/site-data";
import { ContentImage, ContentPagesData, ContentPage, ResolvedPage } from "@/types/page";
import { SiteLanguageCode } from "@/types/site";

const pagesData = pagesJson as ContentPagesData;

validatePages(pagesData);

function isSupportedLocaleEntry(
  value: string,
): value is SiteLanguageCode {
  return SUPPORTED_LOCALES.includes(value as SiteLanguageCode);
}

function getContentPath(locale: SiteLanguageCode, bodyFile: string): string {
  return path.join(process.cwd(), "src", "content", locale, bodyFile);
}

function getPublicAssetPath(assetPath: string): string {
  return path.join(process.cwd(), "public", assetPath.replace(/^\//, ""));
}

function assertAsset(image: ContentImage, pageId: string, locale: SiteLanguageCode): void {
  if (!image.src.startsWith("/assets/")) {
    throw new Error(`Page ${pageId} (${locale}) must use /assets paths for images.`);
  }

  if (!existsSync(getPublicAssetPath(image.src))) {
    throw new Error(`Missing asset for page ${pageId} (${locale}): ${image.src}`);
  }
}

function validatePages(data: ContentPagesData): void {
  const slugRegistry = new Map<string, string>();

  for (const page of data.pages) {
    for (const locale of SUPPORTED_LOCALES) {
      const localizedPage = page.locales[locale];

      if (!localizedPage) {
        throw new Error(`Missing locale ${locale} for page ${page.id}.`);
      }

      const slugKey = `${locale}:${localizedPage.slug}`;

      if (slugRegistry.has(slugKey)) {
        throw new Error(`Duplicate slug detected for ${slugKey}.`);
      }

      slugRegistry.set(slugKey, page.id);

      const contentPath = getContentPath(locale, localizedPage.body);

      if (!existsSync(contentPath)) {
        throw new Error(`Missing Markdown body for page ${page.id} (${locale}): ${localizedPage.body}`);
      }

      if (localizedPage.heroImage) {
        assertAsset(localizedPage.heroImage, page.id, locale);
      }

      for (const galleryImage of localizedPage.gallery ?? []) {
        assertAsset(galleryImage, page.id, locale);
      }

      for (const download of localizedPage.downloads ?? []) {
        if (download.href.startsWith("/") && !existsSync(getPublicAssetPath(download.href))) {
          throw new Error(`Missing download asset for page ${page.id} (${locale}): ${download.href}`);
        }
      }
    }

    for (const localeKey of Object.keys(page.locales)) {
      if (!isSupportedLocaleEntry(localeKey)) {
        throw new Error(`Unsupported locale ${localeKey} on page ${page.id}.`);
      }
    }
  }
}

export function getAllSectionParams(): Array<{ locale: SiteLanguageCode; section: string }> {
  return pagesData.pages.flatMap((page) =>
    SUPPORTED_LOCALES.flatMap((locale) => {
      const localizedPage = page.locales[locale];

      if (!localizedPage.published) {
        return [];
      }

      return {
        locale,
        section: localizedPage.slug,
      };
    }),
  );
}

export function getPageBySlug(locale: SiteLanguageCode, section: string): ContentPage | undefined {
  return pagesData.pages.find((page) => page.locales[locale].slug === section);
}

export async function getResolvedPage(
  locale: SiteLanguageCode,
  section: string,
): Promise<ResolvedPage | undefined> {
  const page = getPageBySlug(locale, section);

  if (!page) {
    return undefined;
  }

  const localizedPage = page.locales[locale];

  if (!localizedPage.published) {
    return undefined;
  }

  const bodyContent = await readFile(getContentPath(locale, localizedPage.body), "utf8");

  return {
    id: page.id,
    locale,
    bodyContent,
    alternates: Object.fromEntries(
      SUPPORTED_LOCALES.map((languageCode) => [languageCode, `/${languageCode}/${page.locales[languageCode].slug}`]),
    ) as Record<SiteLanguageCode, string>,
    ...localizedPage,
  };
}