import { SiteLanguageCode } from "@/types/site";

export type ContentImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  credit?: string;
};

export type ContentDownload = {
  label: string;
  href: string;
  description?: string;
};

export type ContentEmbed = {
  title: string;
  src: string;
};

export type LocalizedPageContent = {
  slug: string;
  title: string;
  description: string;
  body: string;
  published: boolean;
  heroImage?: ContentImage;
  gallery?: ContentImage[];
  downloads?: ContentDownload[];
  embeds?: ContentEmbed[];
};

export type ContentPage = {
  id: string;
  locales: Record<SiteLanguageCode, LocalizedPageContent>;
};

export type ContentPagesData = {
  pages: ContentPage[];
};

export type ResolvedPage = LocalizedPageContent & {
  id: string;
  locale: SiteLanguageCode;
  bodyContent: string;
  alternates: Record<SiteLanguageCode, string>;
};