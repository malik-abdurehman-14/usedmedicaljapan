import Link from "next/link";
import { ClipboardCheck, FileText, PackageCheck, Search, Ship, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { CtaBand } from "@/components/shared/cta-band";
import { getContent } from "@/data/content";
import { alternates, localePath } from "@/lib/i18n";

const icons = { search: Search, clipboard: ClipboardCheck, wrench: Wrench, package: PackageCheck, file: FileText, ship: Ship };

const copy = {
  en: {
    meta: {
      title: "Services: Sourcing, Inspection and Export",
      description:
        "Sourcing, inspection, de-installation, export crating, documentation and shipping for used medical imaging equipment from Japan.",
    },
    breadcrumb: "Services",
    title: "From Japanese Hospitals to Healthcare Providers Worldwide",
    description:
      "We help you source pre-owned medical equipment from Japan and coordinate the process—from equipment selection and condition information to packing, export documentation, and shipping arrangements. Our goal is to make purchasing from Japan straightforward, transparent, and reliable.",
    quote: "Request a quote",
    process: "How it works",
    buyersTitle: "Who We Work With",
    buyersText: "Hospitals, clinics, and medical equipment importers seeking reliable pre-owned equipment at competitive prices.",
    buyers: [
      { title: "Hospitals", text: "Adding or replacing imaging capacity within a fixed capital budget." },
      { title: "Diagnostic centres", text: "Opening new sites or expanding into CT, MRI and nuclear medicine." },
      { title: "Distributors and dealers", text: "Sourcing reliable stock from Japan for resale in their own market." },
    ],
  },
  ja: {
    meta: {
      title: "サービス：調達・検査・輸出",
      description: "日本の中古医療画像機器の調達、検査、撤去、輸出梱包、書類作成、輸送に対応します。",
    },
    breadcrumb: "サービス",
    title: "日本の病院から、世界の医療機関へ",
    description:
      "日本の中古医療機器の調達をお手伝いし、機器の選定や状態に関する情報の確認から、梱包、輸出書類、輸送の手配までを調整します。日本からのご購入を、わかりやすく、透明性が高く、信頼できるものにすることを目指しています。",
    quote: "お見積りを依頼",
    process: "ご購入の流れ",
    buyersTitle: "主なお客様",
    buyersText: "競争力のある価格で、信頼できる中古機器をお探しの病院、クリニック、医療機器輸入業者の皆さま。",
    buyers: [
      { title: "病院", text: "限られた設備予算の中で、画像診断の能力を追加・更新したい病院。" },
      { title: "画像診断センター", text: "新しい拠点の開設や、CT・MRI・核医学への拡大を計画している施設。" },
      { title: "販売代理店・ディーラー", text: "自国の市場で販売するため、日本から信頼できる在庫を調達したい企業。" },
    ],
  },
};

export const servicesMetadata = (locale) => ({ ...copy[locale].meta, alternates: alternates(locale, "/services") });

export function ServicesPage({ locale }) {
  const c = copy[locale];
  const { services } = getContent(locale);
  return (
    <>
      <PageHero breadcrumbs={[{ label: c.breadcrumb }]} locale={locale} title={c.title} description={c.description}>
        <Button asChild size="lg">
          <Link href={localePath(locale, "/contact")}>{c.quote}</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href={localePath(locale, "/how-it-works")}>{c.process}</Link>
        </Button>
      </PageHero>

      <Section>
        <div className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = icons[s.icon];
            return (
              <article key={s.title} className="group border-b border-r border-line p-8 transition-colors hover:bg-paper md:p-10">
                <Icon className="size-6 text-teal" aria-hidden />
                <h2 className="mt-8 text-[1.3rem]">{s.title}</h2>
                <p className="mt-3 text-slate">{s.text}</p>
              </article>
            );
          })}
        </div>
      </Section>

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading title={c.buyersTitle} description={c.buyersText} />
          <dl className="divide-y divide-line border-y border-line">
            {c.buyers.map((b) => (
              <div key={b.title} className="grid gap-2 py-7 sm:grid-cols-[13rem_1fr] sm:gap-8">
                <dt className="text-[1.15rem] font-medium text-ink">{b.title}</dt>
                <dd className="text-slate">{b.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <CtaBand locale={locale} />
    </>
  );
}
