import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./json-ld";
import { site } from "@/data/site";
import { localePath } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const homeLabel = { en: "Home", ja: "ホーム" };

/** items: [{ label, href? }] — last item is the current page. Emits BreadcrumbList schema. */
export function Breadcrumbs({ items, locale = "en", className, invert = false }) {
  const all = [{ label: homeLabel[locale], href: localePath(locale, "/") }, ...items];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${site.url}${item.href}` } : {}),
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <JsonLd data={schema} />
      <ol className="flex flex-wrap items-center gap-1.5">
        {all.map((item, i) => {
          const last = i === all.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className={invert ? "text-white" : "text-ink"}>
                  {item.label}
                </span>
              ) : (
                <>
                  <Link href={item.href} className={cn("transition-colors", invert ? "text-white/60 hover:text-white" : "text-slate hover:text-teal")}>
                    {item.label}
                  </Link>
                  <ChevronRight className={cn("size-3.5", invert ? "text-white/40" : "text-slate/60")} aria-hidden />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
