import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { getEquipmentList } from "@/data/equipment";
import { getSite, whatsappLink } from "@/data/site";
import { localePath } from "@/lib/i18n";

const copy = {
  en: {
    tagline: "Used medical imaging equipment sourced from hospitals in Japan, inspected and exported worldwide.",
    equipment: "Equipment",
    company: "Company",
    contact: "Contact",
    links: [
      { label: "Services", href: "/services" },
      { label: "How it works", href: "/how-it-works" },
      { label: "About us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "日本語サイト", href: "/ja" },
      { label: "医療機器買取（日本語）", href: "/ja/kaitori" },
    ],
    trademarks: "Product names and trademarks belong to their respective owners.",
  },
  ja: {
    tagline: "日本の病院から調達した中古医療画像機器を、検査のうえ世界各国へ輸出しています。",
    equipment: "取扱機器",
    company: "会社情報",
    contact: "お問い合わせ",
    links: [
      { label: "サービス", href: "/ja/services" },
      { label: "ご購入の流れ", href: "/ja/how-it-works" },
      { label: "私たちについて", href: "/ja/about" },
      { label: "お問い合わせ", href: "/ja/contact" },
      { label: "医療機器買取", href: "/ja/kaitori" },
      { label: "English site", href: "/" },
    ],
    trademarks: "製品名および商標は、それぞれの権利者に帰属します。",
  },
};

export function SiteFooter({ locale = "en" }) {
  const t = copy[locale];
  const site = getSite(locale);
  return (
    <footer className="bg-[#0a2139] text-white/75">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1.4fr_0.9fr_1.1fr]">
        <div>
          <Logo href={localePath(locale, "/")} locale={locale} invert />
          <p className="mt-5 max-w-[34ch] text-[0.95rem] leading-relaxed">{t.tagline}</p>
        </div>

        <div>
          <h2 className="text-sm font-medium text-white">{t.equipment}</h2>
          <ul className="mt-4 grid grid-cols-1 gap-2 text-[0.95rem] sm:grid-cols-2">
            {getEquipmentList(locale).map((e) => (
              <li key={e.slug}>
                <Link href={localePath(locale, `/equipment/${e.slug}`)} className="transition-colors hover:text-white">
                  {e.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-medium text-white">{t.company}</h2>
          <ul className="mt-4 space-y-2 text-[0.95rem]">
            {t.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-medium text-white">{t.contact}</h2>
          <ul className="mt-4 space-y-3 text-[0.95rem]">
            <li>
              <a href={`mailto:${site.email}`} className="flex items-start gap-2.5 transition-colors hover:text-white">
                <Mail className="mt-1 size-4 shrink-0 text-teal" /> {site.email}
              </a>
            </li>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 transition-colors hover:text-white">
                <MessageCircle className="mt-1 size-4 shrink-0 text-teal" /> WhatsApp
              </a>
            </li>
            <li>
              <a href={site.phoneHref} className="flex items-start gap-2.5 transition-colors hover:text-white">
                <Phone className="mt-1 size-4 shrink-0 text-teal" /> {site.phone}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-1 size-4 shrink-0 text-teal" /> {site.address}
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-sm text-white/50 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>{t.trademarks}</p>
        </Container>
      </div>
    </footer>
  );
}
