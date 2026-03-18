"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteData, SiteLanguageCode } from "@/types/site";

type SiteShellProps = {
  locale: SiteLanguageCode;
  siteData: SiteData;
};

export function SiteShell({ locale, siteData }: SiteShellProps) {
  const languageData = siteData.languages[locale];
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    const closeOnResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    document.body.classList.toggle("menu-open", menuOpen && window.innerWidth < 768);

    document.addEventListener("keydown", closeOnEsc);
    window.addEventListener("resize", closeOnResize);

    return () => {
      document.removeEventListener("keydown", closeOnEsc);
      window.removeEventListener("resize", closeOnResize);
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen]);

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

        <main className="content-card">
          <nav className={`site-menu ${menuOpen ? "is-open" : ""}`} aria-label="Primary">
            <button
              className="menu-toggle"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="site-menu-list"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="menu-toggle__label">{languageData.menuButton}</span>
              <span className="menu-toggle__icon" aria-hidden="true">
                <span />
                <span />
              </span>
            </button>

            <ul id="site-menu-list" className="site-menu__list">
              {languageData.navigation.map((item) => (
                <li className="site-menu__item" key={`${locale}-${item.label}`}>
                  <a
                    className="site-menu__link"
                    href={item.href}
                    onClick={() => {
                      if (window.innerWidth < 768) {
                        setMenuOpen(false);
                      }
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div
              className="language-switcher"
              role="group"
              aria-label={languageData.languageSwitcherLabel}
            >
              {siteData.supportedLanguages.map((languageCode) => {
                const isActive = languageCode === locale;

                return (
                  <a
                    key={languageCode}
                    href={`/${languageCode}`}
                    className={`language-switcher__button ${isActive ? "is-active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {siteData.languageLabels[languageCode] ?? languageCode.toUpperCase()}
                  </a>
                );
              })}
            </div>
          </nav>

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