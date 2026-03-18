import siteDataJson from "@/data/site.json";
import { SiteData, SiteLanguageCode } from "@/types/site";

export const siteData = siteDataJson as SiteData;

export const DEFAULT_LOCALE = siteData.defaultLanguage;
export const SUPPORTED_LOCALES = siteData.supportedLanguages;

export function isSupportedLocale(locale: string): locale is SiteLanguageCode {
  return SUPPORTED_LOCALES.includes(locale as SiteLanguageCode);
}

export function normalizeLocale(locale?: string): SiteLanguageCode {
  if (!locale) {
    return DEFAULT_LOCALE;
  }

  return isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
}

export function getLocalePath(locale: SiteLanguageCode): string {
  return `/${locale}`;
}

export function getLocaleOpenGraph(locale: SiteLanguageCode): string {
  return locale === "de" ? "de_DE" : "en_US";
}