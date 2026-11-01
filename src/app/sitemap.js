import { equipment } from "@/data/equipment";
import { site } from "@/data/site";

export default function sitemap() {
  const now = new Date();
  const home = { languages: { en: site.url, ja: `${site.url}/ja` } };
  const pages = ["", "/equipment", "/services", "/how-it-works", "/about", "/contact"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.8,
    ...(p === "" && { alternates: home }),
  }));
  const products = equipment.map((e) => ({
    url: `${site.url}/equipment/${e.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));
  return [
    ...pages,
    ...products,
    { url: `${site.url}/ja`, lastModified: now, changeFrequency: "monthly", priority: 0.8, alternates: home },
  ];
}
