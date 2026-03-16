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
  languageSwitcher: document.querySelector("[data-language-switcher]"),
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

  elements.languageSwitcher?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-language]");

    if (!button) {
      return;
    }

    const nextLanguage = button.dataset.language;

    if (
      !state.siteData.languages[nextLanguage] ||
      nextLanguage === state.activeLanguage
    ) {
      return;
    }

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
    const label = fragment.querySelector(".social-link__label");

    link.href = item.href;
    link.setAttribute("aria-label", item.label);
    icon.textContent = item.short;
    label.textContent = item.label;
    elements.socialList.append(fragment);
  });
}

function renderLanguageButtons(languageData) {
  elements.languageSwitcher.replaceChildren();
  elements.languageSwitcher.setAttribute(
    "aria-label",
    languageData.languageSwitcherLabel,
  );

  state.siteData.supportedLanguages.forEach((languageCode) => {
    const button = document.createElement("button");
    const isActive = languageCode === state.activeLanguage;

    button.type = "button";
    button.className = "language-switcher__button";
    button.dataset.language = languageCode;
    button.textContent =
      state.siteData.languageLabels[languageCode] ?? languageCode.toUpperCase();
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
    elements.languageSwitcher.append(button);
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
    elements.menu?.removeAttribute("hidden");
    document.body.classList.remove("menu-open");
    return;
  }

  if (!state.menuOpen) {
    elements.menu?.setAttribute("hidden", "");
  } else {
    elements.menu?.removeAttribute("hidden");
  }
}

function updateMetaDescription(content) {
  const descriptionTag = document.querySelector('meta[name="description"]');

  if (descriptionTag) {
    descriptionTag.setAttribute("content", content);
  }
}

init();
