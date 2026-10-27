// Central site configuration.
// TODO (client): replace every placeholder marked with [ ] before launch.

export const site = {
  name: "Used Medical Equipment Japan",
  shortName: "Used Medical Japan",
  url: "https://usedmedicaljapan.com",
  description:
    "Pre-owned MRI, CT, PET-CT, X-ray, C-arm, mammography and ultrasound systems sourced from hospitals in Japan, inspected and exported worldwide.",
  email: "info@usedmedicaljapan.com", // [confirm mailbox]
  phone: "+81 03-6435-4449",
  phoneHref: "tel:+81364354449",
  whatsapp: "819061170042", // digits only, with country code (+81 90-6117-0042)
  address: "2F, 4-12-38 Shibaura, Minato-ku, Tokyo 108-0023",
  hours: "Mon to Fri, 9:00 to 18:00 JST",
  languages: "English, Japanese",
};

// Japanese overrides for locale-specific fields
const siteJa = {
  address: "〒108-0023 東京都港区芝浦4-12-38 2F",
  hours: "平日 9:00〜18:00（日本時間）",
  languages: "日本語・英語",
};

export const getSite = (locale = "en") => (locale === "ja" ? { ...site, ...siteJa } : site);

export const whatsappLink = (text = "") =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const mainNav = [
  { label: "Equipment", href: "/equipment", hasMenu: true },
  { label: "Services", href: "/services" },
  { label: "How it works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const jaNav = [
  { label: "取扱機器", href: "/ja/equipment", hasMenu: true },
  { label: "サービス", href: "/ja/services" },
  { label: "ご購入の流れ", href: "/ja/how-it-works" },
  { label: "私たちについて", href: "/ja/about" },
  { label: "お問い合わせ", href: "/ja/contact" },
  { label: "医療機器買取", href: "/ja/kaitori" },
];
