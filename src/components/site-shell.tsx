"use client";

import Image from "next/image";

import { SiteFooter } from "@/components/site-footer";
import { SiteMenu } from "@/components/site-menu";
import { SiteData, SiteLanguageCode } from "@/types/site";

type SiteShellProps = {
  locale: SiteLanguageCode;
  siteData: SiteData;
};

export function SiteShell({ locale, siteData }: SiteShellProps) {
  const languageData = siteData.languages[locale];

  return (
    <>
      <div className="page-shell">
        <section className="hero" aria-label="Hero image placeholder">
          <Image
            src="/assets/logo.png"
            alt="Logo"
            className="fixed-logo"
            width={192}
            height={192}
            priority
          />
          <div className="hero__image" />
        </section>

        <main className="main-content">
          <SiteMenu locale={locale} siteData={siteData} />

          <section className="intro" aria-labelledby="site-title">
            <header className="topbar intro-topbar">
              <h1 id="site-title">{languageData.title}</h1>
            </header>

            <p className="intro__text">{languageData.introText}</p>
          </section>

          <SiteFooter socialItems={languageData.social} />
        </main>
      </div>
    </>
  );
}