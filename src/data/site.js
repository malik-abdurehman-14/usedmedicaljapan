// Central site configuration.
// TODO (client): replace every placeholder marked with [ ] before launch.

export const site = {
  name: "Used Medical Equipment Japan",
  shortName: "Used Medical Japan",
  url: "https://usedmedicaljapan.com",
  description:
    "Pre-owned MRI, CT, PET-CT, X-ray, C-arm, mammography and ultrasound systems sourced from hospitals in Japan, inspected and exported worldwide.",
  email: "info@usedmedicaljapan.com", // [confirm mailbox]
  phone: "+81 00-0000-0000", // [client phone]
  whatsapp: "810000000000", // [WhatsApp number, digits only, with country code]
  address: "[Company address], Japan",
  hours: "Mon to Fri, 9:00 to 18:00 JST",
  languages: "English, Japanese",
};

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
  { label: "買取対象機器", href: "/ja#equipment" },
  { label: "買取の流れ", href: "/ja#process" },
  { label: "会社概要", href: "/ja#company" },
  { label: "お問い合わせ", href: "/ja#contact" },
];
