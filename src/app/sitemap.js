import { equipment } from "@/data/equipment";
import { site } from "@/data/site";
import { locales, localePath } from "@/lib/i18n";

export default function sitemap() {
  const now = new Date();
  const entry = (path, changeFrequency, priority) =>
    locales.map((locale) => ({
      url: `${site.url}${localePath(locale, path)}`,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: { languages: { en: `${site.url}${path}`, ja: `${site.url}${localePath("ja", path)}` } },
    }));
  const pages = ["/", "/equipment", "/services", "/how-it-works", "/about", "/contact"].flatMap((p) =>
    entry(p, "monthly", p === "/" ? 1 : 0.8)
  );
  const products = equipment.flatMap((e) => entry(`/equipment/${e.slug}`, "weekly", 0.9));
  return [
    ...pages,
    ...products,
    { url: `${site.url}/ja/kaitori`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
