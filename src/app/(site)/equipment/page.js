import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/shared/container";
import { EquipmentRow } from "@/components/equipment/equipment-row";
import { CtaBand } from "@/components/shared/cta-band";
import { JsonLd } from "@/components/shared/json-ld";
import { equipment } from "@/data/equipment";
import { site } from "@/data/site";

export const metadata = {
  title: "Used Medical Imaging Equipment for Sale",
  description:
    "Used MRI, CT, PET-CT, SPECT, angiography, C-arm, X-ray, mammography and ultrasound systems from Japan. Inspected and exported worldwide.",
  alternates: { canonical: "/equipment" },
};

export default function EquipmentPage() {
  const list = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: equipment.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.name,
      url: `${site.url}/equipment/${e.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={list} />
      <PageHero
        breadcrumbs={[{ label: "Equipment" }]}
        title="Used medical imaging equipment from Japan"
        description="Nine categories of pre-owned imaging systems, sourced from Japanese hospitals and clinics. Stock changes often, so tell us what you need and we will share available units."
      />
      <Container className="py-6 md:py-10">
        <nav aria-label="Jump to category" className="flex flex-wrap gap-2 py-4">
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
              <EquipmentRow item={e} index={i} />
            </div>
          ))}
        </div>
      </Container>
      <CtaBand title="Need a system that isn't listed?" text="We source other hospital equipment on request. Send us the details and we will check availability in Japan." />
    </>
  );
}
