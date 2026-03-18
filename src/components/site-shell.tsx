"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { SiteData, SiteLanguageCode } from "@/types/site";

type SiteShellProps = {
  locale: SiteLanguageCode;
  siteData: SiteData;
};

function SocialIcon({ label }: { label: string }) {
  const key = label.toLowerCase();

  if (key.includes("instagram")) {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
        />
        <circle
          cx="12"
          cy="12"
          r="3.2"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
        />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
      </svg>
    );
  }

  if (key.includes("youtube")) {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          x="2"
          y="6"
          width="20"
          height="12"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
        />
        <path d="M10 9.5L15 12L10 14.5V9.5Z" fill="currentColor" />
      </svg>
    );
  }

  if (key.includes("soundcloud")) {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M4 15c0-1.1.9-2 2-2s2 .9 2 2v1H4v-1z" fill="currentColor" />
        <path
          d="M8 14c0-2 1.79-3.5 4-3.5s4 1.5 4 3.5v0.5H8v-0.5z"
          fill="currentColor"
        />
        <path
          d="M16 9c.55 0 1 .45 1 1v6h-6v-7h3z"
          fill="currentColor"
          opacity="0.95"
        />
      </svg>
    );
  }

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M2 12h20M12 2v20" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

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

          <footer className="footer">
            <ul className="social-links">
              {languageData.social.map((item) => (
                <li key={`${locale}-${item.label}`}>
                  <a
                    className="social-link"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={item.label}
                  >
                    <span className="social-link__icon" aria-hidden="true">
                      <SocialIcon label={item.label} />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </footer>
        </main>
      </div>
    </>
  );
}