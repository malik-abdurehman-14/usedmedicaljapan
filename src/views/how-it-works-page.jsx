import Link from "next/link";
import { Check, FileText, Info, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProcessTimeline } from "@/components/shared/process-timeline";
import { CtaBand } from "@/components/shared/cta-band";
import { getContent } from "@/data/content";
import { whatsappLink } from "@/data/site";
import { alternates, localePath } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const copy = {
  en: {
    meta: {
      title: "How Buying Used Medical Equipment from Japan Works",
      description:
        "Six steps from your requirement to delivery: sourcing, inspection, quotation, de-installation, crating and shipping from Japan.",
    },
    breadcrumb: "How it works",
    title: "How Buying Medical Equipment from Japan Works",
    description:
      "From your initial inquiry to shipment, we guide you through each step of sourcing pre-owned medical equipment from Japan. Our goal is to provide clear information, transparent payment terms, and a smooth purchasing process.",
    buyers: {
      kicker: "For international buyers",
      title: "Looking for a specific medical machine?",
      text: "Send us your requirements. We can search Japanese sources and present suitable equipment when available.",
      send: "Send your requirements",
      whatsapp: "WhatsApp",
      message: "Hello, I'm looking for a specific medical machine from Japan.",
      askTitle: "Please Tell Us",
      ask: [
        "Equipment type",
        "Manufacturer",
        "Model",
        "Year / preferred age",
        "Specifications or configuration",
        "Quantity",
        "Target budget",
        "Destination country",
      ],
      provideTitle: "What We Can Provide",
      provide: [
        "Available equipment information",
        "Manufacturer / model / year",
        "Photographs when available",
        "Condition information based on available records",
        "Accessories and configuration",
        "Quotation and shipping arrangement discussion",
      ],
    },
    documentsTitle: "Documents you receive",
    documentsText: "The paperwork your bank, customs broker and regulator will usually ask for.",
    documents: [
      "Inspection report with photos and video",
      "Quotation and proforma invoice",
      "Commercial invoice and packing list",
      "Certificate of origin",
      "Bill of lading or air waybill",
      "Manufacturer manuals where available",
    ],
    importNotice:
      "Import rules for used medical equipment differ by country. The buyer is responsible for local import permits and registrations; we provide the technical documents needed to apply.",
    commitmentTitle: "Our Commitment",
    commitment:
      "We aim to make sourcing pre-owned medical equipment from Japan clear, transparent, and straightforward. Before you commit to an order, we will explain the available equipment information, agreed costs, payment requirements, and shipping arrangements so you can make an informed decision.",
    ctaTitle: "Ready to start?",
    ctaText: "Send your requirement and we will begin sourcing in Japan.",
  },
  ja: {
    meta: {
      title: "日本から中古医療機器を購入する流れ",
      description:
        "ご要望のお伺いから出荷まで、6つのステップで日本の中古医療機器の調達をサポートします。機器の選定、詳細の確認、お見積り、梱包、輸送・輸出書類まで対応します。",
    },
    breadcrumb: "ご購入の流れ",
    title: "日本から医療機器を購入する流れ",
    description:
      "最初のお問い合わせから出荷まで、日本の中古医療機器の調達を各ステップでサポートします。明確な情報、透明性の高いお支払い条件、スムーズな購入手続きのご提供を目指しています。",
    documentsTitle: "お渡しする書類",
    documentsText: "銀行、通関業者、規制当局から一般的に求められる書類です。",
    documents: [
      "写真・動画付きの検査報告書",
      "お見積書・プロフォーマインボイス",
      "コマーシャルインボイス・パッキングリスト",
      "原産地証明書",
      "船荷証券（B/L）または航空運送状（AWB）",
      "メーカーの取扱説明書（ある場合）",
    ],
    importNotice:
      "中古医療機器の輸入規制は国によって異なります。現地での輸入許可や登録の手続きはお客様のご責任となります。申請に必要な技術資料は当社でご用意します。",
    commitmentTitle: "私たちの約束",
    commitment:
      "日本の中古医療機器の調達を、わかりやすく、透明性が高く、シンプルなものにすることを目指しています。ご注文を確定される前に、確認できる機器情報、合意した費用、お支払い条件、輸送の手配についてご説明し、十分にご納得いただいたうえでご判断いただけるようにします。",
    ctaTitle: "まずはお気軽にご相談ください",
    ctaText: "ご要望をお送りいただければ、日本国内での機器探しを開始します。",
  },
};

export const howItWorksMetadata = (locale) => ({ ...copy[locale].meta, alternates: alternates(locale, "/how-it-works") });

export function HowItWorksPage({ locale }) {
  const c = copy[locale];
  const { processSteps } = getContent(locale);
  return (
    <>
      <PageHero breadcrumbs={[{ label: c.breadcrumb }]} locale={locale} title={c.title} description={c.description} />
      <Section>
        <ProcessTimeline steps={processSteps} variant="vertical" locale={locale} />
      </Section>
      {c.buyers && <BuyersBrief locale={locale} b={c.buyers} />}
      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading title={c.documentsTitle} description={c.documentsText} />
          <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {c.documents.map((d) => (
              <li key={d} className="flex items-start gap-3 bg-white p-5 text-ink">
                <FileText className="mt-0.5 size-5 shrink-0 text-teal" aria-hidden />
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div role="note" className="mt-12 flex items-start gap-4 rounded-lg border-l-4 border-teal bg-teal-tint p-6 md:p-8">
          <Info className="mt-0.5 size-6 shrink-0 text-teal" aria-hidden />
          <p className="max-w-[70ch] text-lead font-medium text-ink">{c.importNotice}</p>
        </div>
      </Section>
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading title={c.commitmentTitle} />
          <p className="max-w-[60ch] text-lead text-ink/85">{c.commitment}</p>
        </div>
      </Section>
      <CtaBand locale={locale} title={c.ctaTitle} text={c.ctaText} />
    </>
  );
}

/** Requirement brief for buyers looking for a specific machine: what to send and what they get back. */
function BuyersBrief({ locale, b }) {
  const lists = [
    { title: b.askTitle, items: b.ask, numbered: true },
    { title: b.provideTitle, items: b.provide },
  ];
  return (
    <Section tone="ink" className="py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.5fr] lg:gap-16">
        <div className="lg:self-center">
          <SectionHeading kicker={b.kicker} title={b.title} description={b.text} invert />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="inverse">
              <Link href={localePath(locale, "/contact")}>{b.send}</Link>
            </Button>
            <Button asChild size="lg" variant="outline-inverse">
              <a href={whatsappLink(b.message)} target="_blank" rel="noopener noreferrer">
                <MessageCircle /> {b.whatsapp}
              </a>
            </Button>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {lists.map((l) => (
            <div key={l.title} className="rounded-lg border border-white/12 bg-white/[0.04] p-5 md:p-6">
              <h3 className="text-[1.15rem] text-white">{l.title}</h3>
              <ul className={cn("mt-4 grid gap-x-4 gap-y-2.5", l.numbered && "min-[360px]:max-sm:grid-cols-2")}>
                {l.items.map((item, i) => (
                  <li key={item} className="flex items-start gap-2.5 text-[0.95rem] leading-snug text-white/85">
                    {l.numbered ? (
                      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-teal text-[0.7rem] font-semibold text-white">
                        {i + 1}
                      </span>
                    ) : (
                      <Check className="mt-px size-4 shrink-0 text-teal-tint" aria-hidden />
                    )}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
