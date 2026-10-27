import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/shared/container";
import { EquipmentRow } from "@/components/equipment/equipment-row";
import { CtaBand } from "@/components/shared/cta-band";
import { JsonLd } from "@/components/shared/json-ld";
import { getEquipmentList } from "@/data/equipment";
import { site } from "@/data/site";
import { alternates, localePath } from "@/lib/i18n";

const copy = {
  en: {
    meta: {
      title: "Used Medical Imaging Equipment for Sale",
      description:
        "Used MRI, CT, PET-CT, SPECT, angiography, C-arm, X-ray, mammography and ultrasound systems from Japan. Inspected and exported worldwide.",
    },
    breadcrumb: "Equipment",
    title: "Used medical imaging equipment from Japan",
    description:
      "Nine categories of pre-owned imaging systems, sourced from Japanese hospitals and clinics. Stock changes often, so tell us what you need and we will share available units.",
    jump: "Jump to category",
    ctaTitle: "Need a system that isn't listed?",
    ctaText: "We source other hospital equipment on request. Send us the details and we will check availability in Japan.",
  },
  ja: {
    meta: {
      title: "中古医療画像機器の販売",
      description:
        "日本の中古MRI、CT、PET-CT、SPECT、血管撮影装置、Cアーム、X線、マンモグラフィ、超音波診断装置。検査のうえ世界各国へ輸出します。",
    },
    breadcrumb: "取扱機器",
    title: "日本の中古医療画像機器",
    description:
      "日本の病院・クリニックから調達した、9カテゴリーの中古画像診断機器を取り扱っています。在庫は頻繁に変わるため、必要な機器をお知らせいただければ、在庫のある機器をご案内します。",
    jump: "カテゴリーへ移動",
    ctaTitle: "お探しの機器が見つかりませんか？",
    ctaText: "ご要望に応じて、その他の病院用機器もお探しします。詳細をお送りいただければ、日本国内での在庫を確認します。",
  },
};

export const equipmentMetadata = (locale) => ({ ...copy[locale].meta, alternates: alternates(locale, "/equipment") });

export function EquipmentPage({ locale }) {
  const c = copy[locale];
  const equipment = getEquipmentList(locale);
  const list = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: equipment.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.name,
      url: `${site.url}${localePath(locale, `/equipment/${e.slug}`)}`,
    })),
  };

  return (
    <>
      <JsonLd data={list} />
      <PageHero breadcrumbs={[{ label: c.breadcrumb }]} locale={locale} title={c.title} description={c.description} />
      <Container className="py-6 md:py-10">
        <nav aria-label={c.jump} className="flex flex-wrap gap-2 py-4">
          {equipment.map((e) => (
            <a
              key={e.slug}
              href={`#${e.slug}`}
              className="inline-flex items-center gap-2 rounded-sm border border-line px-3 py-1.5 text-sm text-ink transition-colors hover:border-teal hover:text-teal"
            >
              <span className="text-xs font-semibold text-teal">{e.modality}</span>
              {e.name}
            </a>
          ))}
        </nav>
        <div className="pb-10">
          {equipment.map((e, i) => (
            <div key={e.slug} id={e.slug}>
              <EquipmentRow item={e} index={i} locale={locale} />
            </div>
          ))}
        </div>
      </Container>
      <CtaBand locale={locale} title={c.ctaTitle} text={c.ctaText} />
    </>
  );
}
