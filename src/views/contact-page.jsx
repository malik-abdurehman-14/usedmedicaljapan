import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/shared/container";
import { QuoteForm } from "@/components/forms/quote-form";
import { getSite, whatsappLink } from "@/data/site";
import { alternates } from "@/lib/i18n";

const copy = {
  en: {
    meta: {
      title: "Contact Us and Request a Quote",
      description: "Request a quote for used MRI, CT, X-ray, ultrasound and other imaging equipment from Japan.",
    },
    breadcrumb: "Contact",
    title: "Request a quote",
    description: "Tell us what you need and where it is going. We will reply with available units, photos and pricing.",
    formTitle: "Your requirement",
    channelsTitle: "Other ways to reach us",
    whatsapp: "Fastest for quick questions",
    email: "Email",
    phone: "Phone",
    hours: "Office hours",
    office: "Office",
  },
  ja: {
    meta: {
      title: "お問い合わせ・お見積り依頼",
      description: "日本の中古MRI、CT、X線、超音波診断装置などの画像診断機器のお見積りをご依頼いただけます。",
    },
    breadcrumb: "お問い合わせ",
    title: "お見積り依頼",
    description: "必要な機器と納入先をお知らせください。在庫のある機器、写真、価格をご案内します。",
    formTitle: "ご要望内容",
    channelsTitle: "その他のお問い合わせ方法",
    whatsapp: "簡単なご質問に最適です",
    email: "メール",
    phone: "電話",
    hours: "営業時間",
    office: "所在地",
  },
};

export const contactMetadata = (locale) => ({ ...copy[locale].meta, alternates: alternates(locale, "/contact") });

export function ContactPage({ locale }) {
  const c = copy[locale];
  const site = getSite(locale);
  const channels = [
    { icon: MessageCircle, label: "WhatsApp", value: c.whatsapp, href: whatsappLink(), external: true },
    { icon: Mail, label: c.email, value: site.email, href: `mailto:${site.email}` },
    { icon: Phone, label: c.phone, value: site.phone, href: site.phoneHref },
  ];

  return (
    <>
      <PageHero breadcrumbs={[{ label: c.breadcrumb }]} locale={locale} title={c.title} description={c.description} />
      <Container className="grid gap-14 py-16 md:py-24 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
        <div>
          <h2 className="text-subtitle">{c.formTitle}</h2>
          <QuoteForm locale={locale} className="mt-8" />
        </div>
        <aside className="space-y-10">
          <div>
            <h2 className="text-subtitle">{c.channelsTitle}</h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {channels.map(({ icon: Icon, label, value, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-start gap-4 py-5"
                  >
                    <Icon className="mt-0.5 size-5 shrink-0 text-teal" aria-hidden />
                    <span>
                      <span className="block font-medium text-ink transition-colors group-hover:text-teal">{label}</span>
                      <span className="mt-0.5 block text-[0.95rem] text-slate">{value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <dl className="space-y-5 text-[0.95rem]">
            <div className="flex items-start gap-4">
              <Clock className="mt-0.5 size-5 shrink-0 text-slate" aria-hidden />
              <div>
                <dt className="font-medium text-ink">{c.hours}</dt>
                <dd className="text-slate">{site.hours}</dd>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="mt-0.5 size-5 shrink-0 text-slate" aria-hidden />
              <div>
                <dt className="font-medium text-ink">{c.office}</dt>
                <dd className="text-slate">{site.address}</dd>
              </div>
            </div>
          </dl>
        </aside>
      </Container>
    </>
  );
}
