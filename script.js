/* TODO: Insert WhatsApp Business number provided by marketing. */
const WHATSAPP_NUMBER = "4915216857201";
const LANGUAGE_STORAGE_KEY = "anyweed_lang";
const translations = {
  de: {
    title: "Filialen | Any Weed — Premium Hemp Boutiquen in Deutschland",
    description: "Alle Any Weed Filialen in München, Berlin, Hamburg und Frankfurt. Premium Hemp und CBD Produkte. Legal, kuratiert, für Kenner.",
    eyebrow: "ANY WEED",
    heroTitle: "KEIN GEWÖHNLICHER CBD-SHOP.",
    heroSubtitle: "Premium Hemp-Boutiquen in ganz Deutschland. Legal, kuratiert und für die gemacht, die den Unterschied kennen.",
    storesKicker: "ANY WEED IN DEUTSCHLAND",
    storesTitle: "FILIALEN",
    whatsappTitle: "FRAGEN? SCHREIB UNS.",
    whatsappSubtitle: "Chatte mit uns auf WhatsApp — wir antworten schnell.",
    whatsappButton: "💬 AUF WHATSAPP CHATTEN",
    offline: "Prüfen Sie Ihre Internetverbindung",
    unavailable: "WhatsApp Business number is not available yet.",
    legalImprint: "Impressum",
    legalPrivacy: "Datenschutz",
    legalTerms: "Angebotsbedingungen",
    country_de: "DEUTSCHLAND",
    country_cz: "TSCHECHIEN"
  },
  en: {
    title: "Find Us | Any Weed — Premium Hemp Boutiques in Germany",
    description: "All Any Weed stores in Munich, Berlin, Hamburg and Frankfurt. Premium hemp and CBD products. Legal, curated, made for those who know.",
    eyebrow: "ANY WEED",
    heroTitle: "NOT YOUR BASIC CBD SHOP.",
    heroSubtitle: "Premium hemp boutiques across Germany. Legal, curated, and made for those who know the difference.",
    storesKicker: "ANY WEED IN GERMANY",
    storesTitle: "FIND US",
    whatsappTitle: "QUESTIONS? DROP US A MESSAGE.",
    whatsappSubtitle: "Chat with us on WhatsApp — we reply fast.",
    whatsappButton: "💬 CHAT ON WHATSAPP",
    offline: "Check your internet connection",
    unavailable: "WhatsApp Business number is not available yet.",
    legalImprint: "Imprint",
    legalPrivacy: "Privacy Policy",
    legalTerms: "Offer Terms & Conditions",
    country_de: "GERMANY",
    country_cz: "CZECH REPUBLIC"
  }
};

/* Shown until setLanguage() runs, and for any country missing a translation. */
const COUNTRY_FALLBACK = {
  de: "DEUTSCHLAND",
  cz: "TSCHECHIEN"
};

/* Legal pages live on the main anyweed.com site, one set per language. */
const LEGAL_URLS = {
  de: {
    imprint: "https://anyweed.com/de/impressum-2/",
    privacy: "https://anyweed.com/de/datenschutz/",
    terms: "https://anyweed.com/offer-terms-conditions/"
  },
  en: {
    imprint: "https://anyweed.com/en/impressum/",
    privacy: "https://anyweed.com/en/privacy-policy/",
    terms: "https://anyweed.com/en/offer-terms-conditions/"
  }
};

let currentLanguage = "de";
let noticeTimer;
const locationIcon = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"></path><circle cx="12" cy="10" r="2.5"></circle></svg>';

function trackEvent(name, parameters) {
  if (typeof window.gtag === "function") window.gtag("event", name, parameters);
}

function showNotice(message) {
  const notice = document.getElementById("offline-notice");
  notice.textContent = message;
  notice.hidden = false;
  window.clearTimeout(noticeTimer);
  noticeTimer = window.setTimeout(() => { notice.hidden = true; }, 4000);
}

/* Groups by `key`, preserving the order countries/cities first appear in STORES. */
function groupBy(stores, key) {
  return stores.reduce((groups, store) => {
    (groups[store[key]] ||= []).push(store);
    return groups;
  }, {});
}

function buildCityCard(city, stores, index) {
  const cityCard = document.createElement("details");
  cityCard.className = "city-card";
  cityCard.dataset.order = String(index);
  cityCard.open = true;
  const summary = document.createElement("summary");
  summary.className = "city-summary";
  const title = document.createElement("h4");
  title.className = "city-title";
  title.textContent = city.toUpperCase();
  const list = document.createElement("div");
  list.className = "address-list";
  stores.forEach((store) => {
    const link = document.createElement("a");
    link.className = "store-link";
    link.href = store.mapsUrl;
    if (desktopQuery.matches) link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `${store.address} — Google Maps`);
    link.dataset.city = store.city;
    link.dataset.country = store.country;
    link.dataset.address = store.address;
    link.innerHTML = `${locationIcon}<span>${store.address}</span><span class="arrow" aria-hidden="true">↗</span>`;
    list.append(link);
  });
  summary.append(title);
  cityCard.append(summary, list);
  return cityCard;
}

function renderStores() {
  const container = document.getElementById("stores-grid");
  container.replaceChildren();

  Object.entries(groupBy(STORES, "country")).forEach(([country, countryStores]) => {
    const group = document.createElement("section");
    group.className = "country-group";

    const heading = document.createElement("h3");
    heading.className = "country-title";
    /* Filled in (and re-filled on language switch) by setLanguage(). */
    heading.dataset.i18n = `country_${country}`;
    heading.textContent = COUNTRY_FALLBACK[country] || country.toUpperCase();

    const grid = document.createElement("div");
    grid.className = "stores-grid";
    const leftColumn = document.createElement("div");
    leftColumn.className = "store-column";
    const rightColumn = document.createElement("div");
    rightColumn.className = "store-column";
    Object.entries(groupBy(countryStores, "city")).forEach(([city, cityStores], index) => {
      const card = buildCityCard(city, cityStores, index);
      (index % 2 === 0 ? leftColumn : rightColumn).append(card);
    });
    grid.append(leftColumn, rightColumn);

    group.append(heading, grid);
    container.append(group);
  });
}

function setLanguage(language, shouldTrack = false) {
  currentLanguage = language === "en" ? "en" : "de";
  const copy = translations[currentLanguage];
  document.documentElement.lang = currentLanguage;
  document.title = copy.title;
  document.getElementById("meta-description").content = copy.description;
  document.getElementById("og-title").content = copy.title;
  document.getElementById("og-description").content = copy.description;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const text = copy[element.dataset.i18n];
    if (text !== undefined) element.textContent = text;
  });
  document.querySelectorAll("[data-legal]").forEach((link) => { link.href = LEGAL_URLS[currentLanguage][link.dataset.legal]; });
  document.querySelectorAll(".language-button").forEach((button) => { button.setAttribute("aria-pressed", String(button.dataset.language === currentLanguage)); });
  try { localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage); } catch (_) { /* Storage may be unavailable. */ }
  if (shouldTrack) trackEvent("language_switch", { language: currentLanguage });
}

function prepareWhatsAppLink() {
  const links = document.querySelectorAll(".js-whatsapp-link");

  const messages = {
    de: "Hallo! Ich habe eine Frage zu Any Weed.",
    en: "Hi! I have a question about Any Weed."
  };

  links.forEach((link) => {
    link.href = WHATSAPP_NUMBER
      ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messages[currentLanguage])}`
      : "#";
  });
}


const desktopQuery = window.matchMedia("(min-width: 1025px)");
const mobileQuery = window.matchMedia("(max-width: 480px)");

function updateStoreLinkTargets() {
  document.querySelectorAll(".store-link").forEach((link) => {
    if (desktopQuery.matches) link.target = "_blank";
    else link.removeAttribute("target");
  });
}

/* Only sets the default open/closed state. Must NOT run on every resize:
   mobile browsers fire resize when the address bar hides on scroll, which
   would slam every accordion shut while the user is reading it. */
function updateStoreExpansion() {
  document.querySelectorAll(".city-card").forEach((card) => {
    card.open = !mobileQuery.matches;
  });
}

function onBreakpointChange(query, handler) {
  if (typeof query.addEventListener === "function") query.addEventListener("change", handler);
  else if (typeof query.addListener === "function") query.addListener(handler);
}

document.addEventListener("DOMContentLoaded", () => {
  try { currentLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) || "de"; } catch (_) { currentLanguage = "de"; }
  renderStores();
  updateStoreLinkTargets();
  updateStoreExpansion();
  setLanguage(currentLanguage);
  prepareWhatsAppLink();

  document.querySelectorAll(".language-button").forEach((button) => button.addEventListener("click", () => { setLanguage(button.dataset.language, true); prepareWhatsAppLink(); }));
  document.addEventListener("click", (event) => {
    const externalLink = event.target.closest(".store-link, .js-whatsapp-link");
    if (externalLink && !navigator.onLine) { event.preventDefault(); showNotice(translations[currentLanguage].offline); return; }
    const storeLink = event.target.closest(".store-link");
    if (storeLink) trackEvent("store_click", { city: storeLink.dataset.city, address: storeLink.dataset.address });
    if (event.target.closest("[data-track='logo']")) trackEvent("logo_click");
    if (event.target.closest(".js-whatsapp-link")) {
      if (!WHATSAPP_NUMBER) { event.preventDefault(); showNotice(translations[currentLanguage].unavailable); return; }
      trackEvent("whatsapp_click", { language: currentLanguage });
    }
    const legalLink = event.target.closest("[data-legal]");
    if (legalLink) trackEvent("legal_click", { page: legalLink.dataset.legal, language: currentLanguage });
  });
  onBreakpointChange(desktopQuery, updateStoreLinkTargets);
  onBreakpointChange(mobileQuery, updateStoreExpansion);
  trackEvent("page_view", { page_title: document.title, page_location: window.location.href });
});

// TODO: GA4 implementation requires confirmation from marketing.
// TODO: Confirm with marketing whether an 18+ age gate is required.
