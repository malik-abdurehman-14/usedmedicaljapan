import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/shared/container";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { FaqList } from "@/components/shared/faq-list";
import { InspectionSeal } from "@/components/shared/inspection-seal";
import { ProductGallery } from "@/components/equipment/product-gallery";
import { ProductSubnav } from "@/components/equipment/product-subnav";
import { SpecTable } from "@/components/equipment/spec-table";
import { BrandTable } from "@/components/equipment/brand-table";
import { EquipmentTile } from "@/components/equipment/equipment-tile";
import { QuoteForm } from "@/components/forms/quote-form";
import { getCommonProductFaqs, getEquipment, getRelated } from "@/data/equipment";
import { whatsappLink } from "@/data/site";
import { alternates, localePath } from "@/lib/i18n";

const copy = {
  en: {
    metaTitle: (item) => `Used ${item.name} from Japan`,
    metaDescription: (item) => `${item.intro} Inspection report, photos and worldwide shipping on FOB or CIF terms.`,
    sections: {
      overview: "Overview",
      brands: "Brands",
      specifications: "Specifications",
      inspection: "Inspection",
      shipping: "Shipping",
      faq: "FAQ",
      quote: "Get a quote",
    },
    subnav: "On this page",
    inspectionChecks: [
      "Power-on and full function test",
      "Image quality check with test scans or phantoms",
      "Mechanical movement and safety interlocks",
      "Usage data recorded where the system logs it",
      "Photos and video of the specific unit",
      "Cosmetic condition and missing parts noted",
    ],
    breadcrumb: "Equipment",
    badge: "Used, sourced in Japan",
    title: (item) => `Used ${item.name} from Japan`,
    quote: "Request a quote",
    whatsapp: "Ask on WhatsApp",
    whatsappMessage: (item) => `Hello, I'm interested in used ${item.plural} from Japan.`,
    priceNote: "Prices depend on model, year and condition, and are quoted per unit.",
    overview: "Overview",
    applications: "Typical applications",
    brandsTitle: "Brands and models",
    brandsText: "Manufacturers we regularly source in this category. Availability changes, so ask about a specific model.",
    specsTitle: "Specifications",
    specsText: "Typical configurations in this category. Exact specifications are listed in the inspection report for each unit.",
    inspectionTitle: "Inspection before export",
    inspectionText: (item) => `Every ${item.singular} is checked in Japan before it is crated.`,
    seal: "Inspected in Japan",
    includedTitle: "What's included",
    includedText: "Confirmed per unit in the quotation.",
    shippingTitle: "Shipping and installation",
    shippingText: "Handled from the hospital in Japan to your port.",
    crateTitle: "De-installation and crating",
    crateText: "Engineers remove the system, label components, and pack it in moisture-protected export crates.",
    freightTitle: "Freight and support",
    freightText: "FOB or CIF terms with export documents prepared. Installation support can be arranged on request.",
    processLink: "See the full process",
    faqTitle: (item) => `Questions about used ${item.plural}`,
    quoteTitle: (item) => `Request a quote for ${item.plural}`,
    quoteText: "Tell us the configuration and destination. We will reply with available units, photos and pricing.",
    relatedTitle: "Other equipment",
    viewAll: "View all",
  },
  ja: {
    metaTitle: (item) => `日本の中古${item.name}`,
    metaDescription: (item) => `${item.intro}検査報告書、写真、FOB・CIF条件での世界各国への輸送に対応します。`,
    sections: {
      overview: "概要",
      brands: "メーカー",
      specifications: "仕様",
      inspection: "検査",
      shipping: "輸送",
      faq: "よくある質問",
      quote: "お見積り",
    },
    subnav: "このページの内容",
    inspectionChecks: [
      "電源投入と全機能の動作テスト",
      "テストスキャンやファントムによる画質確認",
      "機械的な動作と安全インターロックの確認",
      "システムに記録がある場合は使用データを記録",
      "対象機器の写真・動画",
      "外観の状態と欠品の記録",
    ],
    breadcrumb: "取扱機器",
    badge: "中古・日本国内で調達",
    title: (item) => `日本の中古${item.name}`,
    quote: "お見積りを依頼",
    whatsapp: "WhatsAppで問い合わせ",
    whatsappMessage: (item) => `こんにちは。日本の中古${item.name}について問い合わせたいです。`,
    priceNote: "価格は機種、年式、状態によって異なり、1台ごとにお見積りします。",
    overview: "概要",
    applications: "主な用途",
    brandsTitle: "メーカーと機種",
    brandsText: "このカテゴリーで定期的に取り扱っているメーカーです。在庫状況は変動するため、特定の機種についてはお問い合わせください。",
    specsTitle: "仕様",
    specsText: "このカテゴリーの代表的な構成です。正確な仕様は、各機器の検査報告書に記載します。",
    inspectionTitle: "輸出前の検査",
    inspectionText: () => "すべての機器は、木箱梱包の前に日本国内で点検します。",
    seal: "日本で検品済み",
    includedTitle: "付属品",
    includedText: "お見積り時に、機器ごとに確認します。",
    shippingTitle: "輸送と据付",
    shippingText: "日本の病院からお客様の港まで対応します。",
    crateTitle: "撤去と梱包",
    crateText: "技術者がシステムを撤去し、部品にラベルを付け、防湿対策を施した輸出用木箱に梱包します。",
    freightTitle: "輸送とサポート",
    freightText: "FOBまたはCIF条件で、輸出書類も作成します。据付サポートもご要望に応じて手配できます。",
    processLink: "ご購入の流れを見る",
    faqTitle: (item) => `中古${item.name}に関するよくある質問`,
    quoteTitle: (item) => `${item.name}のお見積り依頼`,
    quoteText: "構成と納入先をお知らせください。在庫のある機器、写真、価格をご案内します。",
    relatedTitle: "その他の機器",
    viewAll: "すべて見る",
  },
};

export function productMetadata(slug, locale) {
  const item = getEquipment(slug, locale);
  if (!item) return {};
  const c = copy[locale];
  return {
    title: c.metaTitle(item),
    description: c.metaDescription(item),
    alternates: alternates(locale, `/equipment/${item.slug}`),
    openGraph: { images: [{ url: item.image, alt: item.name }], ...(locale === "ja" && { locale: "ja_JP" }) },
  };
}

export function ProductPage({ slug, locale }) {
  const item = getEquipment(slug, locale);
  if (!item) notFound();

  const c = copy[locale];
  const sections = Object.entries(c.sections).map(([id, label]) => ({ id, label }));
  const related = getRelated(slug, locale);
  const faqs = [...item.faqs, ...getCommonProductFaqs(locale)];

  return (
    <>
      {/* Header */}
      <section className="bg-paper">
        <Container className="pb-14 pt-8 md:pb-20 md:pt-10">
          <Breadcrumbs
            items={[{ label: c.breadcrumb, href: localePath(locale, "/equipment") }, { label: item.name }]}
            locale={locale}
            className="mb-8"
          />
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <ProductGallery images={item.gallery} alt={item.name} locale={locale} />
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <Badge variant="ink" size="sm" className="px-2 py-1 text-xs">{item.modality}</Badge>
                <span className="text-sm text-slate">{c.badge}</span>
              </div>
              <h1 className="mt-5 text-display text-[clamp(2.1rem,3.8vw,3.2rem)]">{c.title(item)}</h1>
              <p className="mt-5 max-w-[56ch] text-lead text-slate">{item.intro}</p>

              <dl className="mt-8 divide-y divide-line border-y border-line">
                {item.quickInfo.map((q) => (
                  <div key={q.label} className="grid grid-cols-[9.5rem_1fr] gap-4 py-3 text-[0.97rem]">
                    <dt className="text-slate">{q.label}</dt>
                    <dd className="text-ink">{q.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href="#quote">{c.quote}</a>
                </Button>
                <Button asChild size="lg" variant="whatsapp">
                  <a
                    href={whatsappLink(c.whatsappMessage(item))}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle /> {c.whatsapp}
                  </a>
                </Button>
              </div>
              <p className="mt-4 text-sm text-slate">{c.priceNote}</p>
            </div>
          </div>
        </Container>
      </section>

      <ProductSubnav sections={sections} label={c.subnav} />

      {/* Overview */}
      <section id="overview" className="py-16 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <SectionHeading title={c.overview} />
            <div className="mt-6 max-w-[65ch] space-y-5 text-ink/85">
              {item.overview.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
          <aside className="self-start rounded-lg border border-line p-7">
            <h3 className="text-[1.1rem]">{c.applications}</h3>
            <ul className="mt-5 space-y-3">
              {item.applications.map((a) => (
                <li key={a} className="flex gap-3 text-[0.97rem] text-ink/85">
                  <Check className="mt-1 size-4 shrink-0 text-teal" aria-hidden />
                  {a}
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>

      {/* Brands */}
      <section id="brands" className="border-t border-line py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading title={c.brandsTitle} description={c.brandsText} />
          <BrandTable brands={item.brands} locale={locale} />
        </Container>
      </section>

      {/* Specifications */}
      <section id="specifications" className="border-t border-line bg-paper py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading title={c.specsTitle} description={c.specsText} />
          <SpecTable rows={item.specs} />
        </Container>
      </section>

      {/* Inspection & included */}
      <section id="inspection" className="py-16 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="flex items-start justify-between gap-6">
              <SectionHeading title={c.inspectionTitle} description={c.inspectionText(item)} />
              <InspectionSeal label={c.seal} className="hidden size-24 shrink-0 -rotate-8 opacity-90 sm:block" />
            </div>
            <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {c.inspectionChecks.map((check) => (
                <li key={check} className="flex gap-3 text-[0.97rem] text-ink/85">
                  <Check className="mt-1 size-4 shrink-0 text-teal" aria-hidden />
                  {check}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg bg-paper p-8">
            <h3 className="text-subtitle">{c.includedTitle}</h3>
            <p className="mt-2 text-[0.95rem] text-slate">{c.includedText}</p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {item.included.map((part) => (
                <li key={part} className="py-3 text-[0.97rem] text-ink">
                  {part}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Shipping */}
      <section id="shipping" className="bg-ink py-16 text-white md:py-20">
        <Container className="grid gap-10 md:grid-cols-3 md:gap-12">
          <div>
            <h2 className="text-subtitle text-white">{c.shippingTitle}</h2>
            <p className="mt-3 text-white/65">{c.shippingText}</p>
          </div>
          <div className="border-l border-white/15 pl-6">
            <h3 className="text-[1.05rem] text-white">{c.crateTitle}</h3>
            <p className="mt-2 text-[0.95rem] text-white/65">{c.crateText}</p>
          </div>
          <div className="border-l border-white/15 pl-6">
            <h3 className="text-[1.05rem] text-white">{c.freightTitle}</h3>
            <p className="mt-2 text-[0.95rem] text-white/65">
              {c.freightText}{" "}
              <Link href={localePath(locale, "/how-it-works")} className="text-teal-tint underline underline-offset-4 hover:text-white">
                {c.processLink}
              </Link>
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <SectionHeading title={c.faqTitle(item)} />
          <FaqList faqs={faqs} />
        </Container>
      </section>

      {/* Quote */}
      <section id="quote" className="border-t border-line bg-paper py-16 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading title={c.quoteTitle(item)} description={c.quoteText} />
          <div className="rounded-lg border border-line bg-white p-6 sm:p-8">
            <QuoteForm defaultEquipment={item.slug} locale={locale} />
          </div>
        </Container>
      </section>

      {/* Related */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="mb-10 flex items-end justify-between gap-6">
            <h2 className="text-title">{c.relatedTitle}</h2>
            <Button asChild variant="link" className="h-auto">
              <Link href={localePath(locale, "/equipment")}>{c.viewAll}</Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <EquipmentTile key={r.slug} item={r} locale={locale} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
