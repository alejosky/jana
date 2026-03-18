export type SiteLanguageCode = "de" | "en";

export type SiteMeta = {
  title: string;
  description: string;
};

export type SiteNavItem = {
  label: string;
  href: string;
};

export type SiteSocialItem = {
  label: string;
  short: string;
  href: string;
};

export type SiteLanguageContent = {
  meta: SiteMeta;
  menuButton: string;
  languageSwitcherLabel: string;
  title: string;
  introText: string;
  navigation: SiteNavItem[];
  social: SiteSocialItem[];
};

export type SiteData = {
  defaultLanguage: SiteLanguageCode;
  supportedLanguages: SiteLanguageCode[];
  languageLabels: Record<SiteLanguageCode, string>;
  languages: Record<SiteLanguageCode, SiteLanguageContent>;
};