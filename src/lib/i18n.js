// Locale helpers. The English site lives at the root. Japanese is a single landing page at /ja,
// so Japanese links to other pages point at a section of that page or at the English page.

export const locales = ["en", "ja"];

// English page → section of the Japanese landing page that covers it
const jaSections = {
  "/": "/ja",
  "/equipment": "/ja#equipment",
  "/how-it-works": "/ja#process",
  "/about": "/ja#about",
  "/contact": "/ja#contact",
  "/services": "/ja",
};

/** Where `href` points in the given locale. Pages without a Japanese section (product pages) stay English. */
export function localePath(locale, href) {
  if (locale !== "ja" || !href.startsWith("/")) return href;
  return jaSections[href.split("?")[0]] ?? href;
}

/** The other language: English pages switch to the Japanese landing page and back to the English home. */
export function switchLocalePath(pathname) {
  return pathname === "/ja" || pathname.startsWith("/ja/") ? "/" : "/ja";
}

/** Metadata alternates. `path` is the English path; only the home page has a Japanese version. */
export function alternates(locale, path) {
  const canonical = locale === "ja" ? "/ja" : path;
  return path === "/" ? { canonical, languages: { en: "/", ja: "/ja" } } : { canonical };
}
