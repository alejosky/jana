const state = {
  siteData: null,
  activeLanguage: "de",
  menuOpen: false,
};

const elements = {
  documentElement: document.documentElement,
  menuToggle: document.querySelector("[data-menu-toggle]"),
  menu: document.querySelector("[data-menu]"),
  navList: document.querySelector("[data-nav-list]"),
  socialList: document.querySelector("[data-social-list]"),
  languageSwitchers: document.querySelectorAll("[data-language-switcher]"),
  navItemTemplate: document.getElementById("nav-item-template"),
  socialItemTemplate: document.getElementById("social-item-template"),
  translatable: document.querySelectorAll("[data-i18n]"),
};

async function init() {
  try {
    const response = await fetch("./data/site.json");

    if (!response.ok) {
      throw new Error(`Failed to load site data: ${response.status}`);
    }

    state.siteData = await response.json();
    state.activeLanguage = state.siteData.defaultLanguage;

    bindEvents();
    render();
    syncMenuPresentation();
  } catch (error) {
    console.error(error);
  }
}

function bindEvents() {
  elements.menuToggle?.addEventListener("click", () => {
    setMenuState(!state.menuOpen);
  });

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-language]");

    if (!button) return;

    const nextLanguage = button.dataset.language;

    if (!state.siteData || !state.siteData.languages[nextLanguage]) return;
    if (nextLanguage === state.activeLanguage) return;

    state.activeLanguage = nextLanguage;
    render();
    setMenuState(false);
  });

  window.addEventListener("resize", () => {
    syncMenuPresentation();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuState(false);
    }
  });

  elements.navList?.addEventListener("click", (event) => {
    const link = event.target.closest("a");

    if (link && window.innerWidth < 768) {
      setMenuState(false);
    }
  });
}

function render() {
  const languageData = state.siteData.languages[state.activeLanguage];

  if (!languageData) {
    return;
  }

  elements.documentElement.lang = state.activeLanguage;
  document.title = languageData.meta.title;
  updateMetaDescription(languageData.meta.description);
  renderText(languageData);
  renderNav(languageData.navigation);
  renderSocial(languageData.social);
  renderLanguageButtons(languageData);
}

function renderText(languageData) {
  elements.translatable.forEach((element) => {
    const key = element.dataset.i18n;

    if (key in languageData) {
      element.textContent = languageData[key];
    }
  });
}

function renderNav(items) {
  elements.navList.replaceChildren();

  items.forEach((item) => {
    const fragment = elements.navItemTemplate.content.cloneNode(true);
    const link = fragment.querySelector(".site-menu__link");

    link.textContent = item.label;
    link.href = item.href;
    elements.navList.append(fragment);
  });
}

function renderSocial(items) {
  elements.socialList.replaceChildren();

  items.forEach((item) => {
    const fragment = elements.socialItemTemplate.content.cloneNode(true);
    const link = fragment.querySelector(".social-link");
    const icon = fragment.querySelector(".social-link__icon");

    link.href = item.href;
    link.setAttribute("aria-label", item.label);
    icon.innerHTML = getSocialSVG(item.label);
    elements.socialList.append(fragment);
  });
}

function getSocialSVG(name) {
  const key = (name || "").toLowerCase();

  if (key.includes("instagram")) {
    return `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.6" fill="none" />
        <circle cx="12" cy="12" r="3.2" stroke="currentColor" stroke-width="1.6" fill="none" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
      </svg>`;
  }

  if (key.includes("youtube")) {
    return `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="2" y="6" width="20" height="12" rx="3" stroke="currentColor" stroke-width="1.6" fill="none" />
        <path d="M10 9.5L15 12L10 14.5V9.5Z" fill="currentColor" />
      </svg>`;
  }

  if (key.includes("soundcloud")) {
    return `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M4 15c0-1.1.9-2 2-2s2 .9 2 2v1H4v-1z" fill="currentColor" />
        <path d="M8 14c0-2 1.79-3.5 4-3.5s4 1.5 4 3.5v0.5H8v-0.5z" fill="currentColor" />
        <path d="M16 9c.55 0 1 .45 1 1v6h-6v-7h3z" fill="currentColor" opacity="0.95" />
      </svg>`;
  }

  // default: simple globe icon
  return `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6" fill="none" />
      <path d="M2 12h20M12 2v20" stroke="currentColor" stroke-width="1.2" />
    </svg>`;
}

function renderLanguageButtons(languageData) {
  // render buttons into all language-switcher containers (mobile + desktop)
  elements.languageSwitchers.forEach((container) => {
    container.replaceChildren();
    container.setAttribute("aria-label", languageData.languageSwitcherLabel);

    state.siteData.supportedLanguages.forEach((languageCode) => {
      const button = document.createElement("button");
      const isActive = languageCode === state.activeLanguage;

      button.type = "button";
      button.className = "language-switcher__button";
      button.dataset.language = languageCode;
      button.textContent =
        state.siteData.languageLabels[languageCode] ??
        languageCode.toUpperCase();
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
      container.append(button);
    });
  });
}

function setMenuState(isOpen, options = { syncBodyClass: true }) {
  state.menuOpen = isOpen;
  elements.menuToggle?.setAttribute("aria-expanded", String(isOpen));
  elements.menu?.classList.toggle("is-open", isOpen);
  syncMenuPresentation();

  if (options.syncBodyClass) {
    document.body.classList.toggle(
      "menu-open",
      isOpen && window.innerWidth < 768,
    );
  }
}

function syncMenuPresentation() {
  const isDesktop = window.innerWidth >= 768;

  if (isDesktop) {
    state.menuOpen = false;
    elements.menuToggle?.setAttribute("aria-expanded", "false");
    elements.menu?.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    return;
  }
}

function updateMetaDescription(content) {
  const descriptionTag = document.querySelector('meta[name="description"]');

  if (descriptionTag) {
    descriptionTag.setAttribute("content", content);
  }
}

init();
