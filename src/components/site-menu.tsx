"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { SiteData, SiteLanguageCode } from "@/types/site";

type SiteMenuProps = {
  locale: SiteLanguageCode;
  siteData: SiteData;
};

function getLanguageSwitcherHref(
  pathname: string,
  currentLocale: SiteLanguageCode,
  targetLocale: SiteLanguageCode,
  siteData: SiteData,
): string {
  const segments = pathname.split("/").filter(Boolean);
  const localeIndex = segments.findIndex((segment) =>
    siteData.supportedLanguages.includes(segment as SiteLanguageCode),
  );

  if (localeIndex === -1) {
    return `/${targetLocale}`;
  }

  const sectionSlug = segments[localeIndex + 1];

  if (!sectionSlug) {
    return `/${targetLocale}`;
  }

  const currentNavigation = siteData.languages[currentLocale].navigation;
  const targetNavigation = siteData.languages[targetLocale].navigation;
  const sectionIndex = currentNavigation.findIndex((item) => item.href === sectionSlug);

  if (sectionIndex === -1) {
    return `/${targetLocale}`;
  }

  const targetSection = targetNavigation[sectionIndex]?.href;

  return targetSection ? `/${targetLocale}/${targetSection}` : `/${targetLocale}`;
}

export function SiteMenu({ locale, siteData }: SiteMenuProps) {
  const languageData = siteData.languages[locale];
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

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
            <Link
              className="site-menu__link"
              href={`/${locale}/${item.href}`}
              onClick={() => {
                if (window.innerWidth < 768) {
                  setMenuOpen(false);
                }
              }}
            >
              {item.label}
            </Link>
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
            <Link
              key={languageCode}
              href={getLanguageSwitcherHref(pathname, locale, languageCode, siteData)}
              className={`language-switcher__button ${isActive ? "is-active" : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              {siteData.languageLabels[languageCode] ?? languageCode.toUpperCase()}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
