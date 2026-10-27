import { FileText, Info } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProcessTimeline } from "@/components/shared/process-timeline";
import { CtaBand } from "@/components/shared/cta-band";
import { getContent } from "@/data/content";
import { alternates } from "@/lib/i18n";

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
