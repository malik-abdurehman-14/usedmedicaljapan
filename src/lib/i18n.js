// Locale helpers. English pages live at the root, Japanese pages under /ja.

export const locales = ["en", "ja"];

// Japanese-only pages with no English counterpart
const jaOnlyPaths = ["/kaitori"];

/** "/services" → "/ja/services" for Japanese, "/" → "/ja". English hrefs pass through. */
export function localePath(locale, href) {
  if (locale !== "ja" || !href.startsWith("/")) return href;
  return href === "/" ? "/ja" : `/ja${href}`;
}

/** The same page in the other language. Japanese-only pages switch to the English home. */
export function switchLocalePath(pathname) {
  if (pathname === "/ja" || pathname.startsWith("/ja/")) {
    const en = pathname.slice(3) || "/";
    return jaOnlyPaths.some((p) => en.startsWith(p)) ? "/" : en;
  }
  return localePath("ja", pathname);
}

/** Metadata alternates for a page that exists in both languages. `path` is the English path. */
export function alternates(locale, path) {
  return { canonical: localePath(locale, path), languages: { en: path, ja: localePath("ja", path) } };
}
