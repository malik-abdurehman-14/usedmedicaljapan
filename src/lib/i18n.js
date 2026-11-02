// Locale helpers. The English site (for buyers abroad) lives at the root. Japanese is a single
// buyback landing page at /ja for hospitals in Japan, so Japanese links point at its sections.

export const locales = ["en", "ja"];

// English page → section of the Japanese landing page that covers it
const jaSections = {
  "/": "/ja",
  "/about": "/ja#about",
  "/contact": "/ja#contact",
};

/** Where `href` points in the given locale. Pages without a Japanese section stay English. */
export function localePath(locale, href) {
  if (locale !== "ja" || !href.startsWith("/")) return href;
  return jaSections[href.split("?")[0]] ?? href;
}

/** The other language: English pages switch to the Japanese landing page and back to the English home. */
export function switchLocalePath(pathname) {
  return pathname === "/ja" || pathname.startsWith("/ja/") ? "/" : "/ja";
}

/** Metadata alternates. The Japanese page serves a different audience, so it is not a translation (no hreflang). */
export function alternates(locale, path) {
  return { canonical: locale === "ja" ? "/ja" : path };
}
