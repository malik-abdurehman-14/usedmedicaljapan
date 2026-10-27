import Image from "next/image";
import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { InspectionSeal } from "@/components/shared/inspection-seal";
import { CtaBand } from "@/components/shared/cta-band";
import { getContent } from "@/data/content";
import { alternates } from "@/lib/i18n";

const copy = {
  en: {
    meta: {
      title: "About Us",
      description:
        "A Japan-based supplier of used medical imaging equipment, connecting Japanese hospitals with buyers worldwide.",
    },
    breadcrumb: "About",
    title: "A bridge between hospitals that upgrade and hospitals that grow",
    missionTitle: "Our mission",
    mission: [
      "Used Medical Japan was established to connect healthcare providers in Japan upgrading their medical equipment with hospitals and medical institutions worldwide seeking affordable, quality pre-owned equipment. Our mission is to extend the life of medical equipment, make healthcare technology more accessible, and promote sustainable reuse across borders.",
    ],
    imageAlt: "CT scanner in a hospital room",
    storyKicker: "Our story",
    storyTitle: "Good equipment deserves a second hospital",
    story: [
      "Hospitals in Japan regularly upgrade their medical equipment, creating opportunities for reliable pre-owned systems to continue serving patients elsewhere. Meanwhile, hospitals and clinics around the world need access to medical technology at more affordable prices.",
      "Used Medical Japan connects these needs. We help international buyers source pre-owned medical equipment from Japan and coordinate the process, from equipment selection and condition information to shipping and export arrangements, according to each customer's requirements.",
      "Our belief is simple: quality medical equipment should have the opportunity to make a difference for more patients, wherever it is needed.",
    ],
    principlesTitle: "How we work",
    principles: [
      { title: "Say what the unit is", text: "Condition, usage and missing parts go in the report, before you pay, not after delivery." },
      { title: "Show, don't describe", text: "Photos and video of the actual unit, and an open invitation to inspect it in Japan." },
      { title: "One contact", text: "The same person handles your request from first message to shipment, in English or Japanese." },
    ],
    profileTitle: "Company profile",
    profileSubtitle: "会社概要",
    seal: "Inspected in Japan",
  },
  ja: {
    meta: {
      title: "私たちについて",
      description: "日本の医療機関と世界の病院をつなぎ、中古医療機器の調達・輸出を行っています。",
    },
    breadcrumb: "私たちについて",
    title: "設備を更新する病院と、成長を目指す病院をつなぐ架け橋",
    missionTitle: "私たちの使命",
    mission: [
      "Used Medical Japanは、医療機器の更新を進める日本の医療機関と、高品質な中古医療機器を適正な価格で導入したい世界各国の病院・医療機関をつなぐことを目的としています。",
      "医療機器の活用期間を延ばし、より多くの医療機関が医療技術を利用できる環境を整えるとともに、国境を越えた医療機器の再利用を通じて、持続可能な医療の実現に貢献することを目指しています。",
    ],
    imageAlt: "病院の検査室に設置されたCT装置",
    storyKicker: "私たちのストーリー",
    storyTitle: "良質な医療機器に、もう一度活躍の場を。",
    story: [
      "日本の病院では、定期的な医療機器の更新が行われています。その中には、まだ十分に活用できる可能性を持ち、ほかの医療機関で引き続き役立てることができる中古医療機器もあります。一方、世界各国の病院やクリニックでは、新品よりも導入コストを抑えながら、必要な医療機器を確保したいというニーズがあります。",
      "Used Medical Japanは、こうした双方のニーズをつなぎます。海外のお客様が日本の中古医療機器を導入できるよう、ご要望に応じて機器の選定や状態に関する情報の確認をサポートし、輸送や輸出に関する手配を調整します。",
      "私たちの想いはシンプルです。良質な医療機器が、必要とされる場所で、より多くの患者さんのために役立ち続けること。",
      "その実現に向けて、日本と世界の医療機関をつなぎ、医療機器の新たな活用の可能性を広げていきます。",
    ],
    principlesTitle: "私たちの仕事の進め方",
    principles: [
      { title: "機器の状態をありのままに", text: "状態、使用状況、欠品は、納品後ではなく、お支払い前に報告書に記載します。" },
      { title: "説明よりも、実物を", text: "対象機器の写真や動画をお見せします。日本での実機確認もいつでも歓迎します。" },
      { title: "担当者は一人", text: "最初のご連絡から出荷まで、同じ担当者が英語または日本語で対応します。" },
    ],
    profileTitle: "会社概要",
    profileSubtitle: "Company profile",
    seal: "日本で検品済み",
  },
};

export const aboutMetadata = (locale) => ({ ...copy[locale].meta, alternates: alternates(locale, "/about") });

export function AboutPage({ locale }) {
  const c = copy[locale];
  const { companyProfile } = getContent(locale);
  return (
    <>
      <PageHero breadcrumbs={[{ label: c.breadcrumb }]} locale={locale} title={c.title} />

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading title={c.missionTitle} />
          <div className="max-w-[60ch] space-y-5 text-lead text-ink/85">
            {c.mission.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-mist">
            <Image src="/images/equipment/ct-room.webp" alt={c.imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="max-w-[60ch] space-y-5 text-ink/85">
            <SectionHeading kicker={c.storyKicker} title={c.storyTitle} />
            {c.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading title={c.principlesTitle} className="mb-12" />
        <div className="grid gap-10 md:grid-cols-3">
          {c.principles.map((p) => (
            <div key={p.title} className="border-t-2 border-ink pt-6">
              <h3 className="text-[1.2rem]">{p.title}</h3>
              <p className="mt-3 text-slate">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div className="flex items-start justify-between gap-6 lg:flex-col">
            <SectionHeading title={c.profileTitle} description={c.profileSubtitle} />
            <InspectionSeal label={c.seal} className="size-28 -rotate-6 opacity-90" />
          </div>
          <dl className="border-t border-line">
            {companyProfile.map((r) => (
              <div key={r.label} className="grid grid-cols-[9rem_1fr] gap-6 border-b border-line py-4 sm:grid-cols-[12rem_1fr]">
                <dt className="text-slate">{r.label}</dt>
                <dd className="text-ink">{r.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <CtaBand locale={locale} />
    </>
  );
}
