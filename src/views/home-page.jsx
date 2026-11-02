import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/home/hero";
import { FactStrip } from "@/components/home/fact-strip";
import { WhyJapan } from "@/components/home/why-japan";
import { EquipmentGrid } from "@/components/equipment/equipment-grid";
import { EquipmentSlider } from "@/components/equipment/equipment-slider";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProcessTimeline } from "@/components/shared/process-timeline";
import { FaqList } from "@/components/shared/faq-list";
import { CtaBand } from "@/components/shared/cta-band";
import { getEquipmentList } from "@/data/equipment";
import { getContent } from "@/data/content";
import { alternates, localePath } from "@/lib/i18n";

const copy = {
  en: {
    meta: {},
    equipmentKicker: "Equipment we supply",
    equipmentTitle: "Nine categories of imaging equipment",
    equipmentText:
      "From high-field MRI to portable ultrasound. Each category page lists the brands, configurations and documentation you can expect.",
    viewAll: "View all equipment",
    sliderTitle: "A closer look at the systems",
    sliderText: "Example images by category. Photos and video of the specific unit come with every quotation.",
    slides: {
      "used-ct-scanners": "Multi-slice CT with tube history reported for every unit.",
      "used-pet-ct-scanners": "PET-CT for oncology centres building nuclear medicine services.",
      "used-mri-machines": "1.5T and 3.0T MRI with helium level and coil list documented.",
      "used-spect-gamma-cameras": "Dual-head SPECT-CT with each collimator listed.",
      "used-mammography-machines": "Digital and 3D tomosynthesis mammography for screening programmes.",
      "used-c-arm-systems": "Mobile C-arms that can ship by air and start work quickly.",
    },
    processKicker: "How it works",
    processTitle: "From your first message to your port",
    processText: "Six steps, with one contact who speaks English and Japanese throughout.",
    processLink: "See the full process",
    faqTitle: "Common questions",
    faqText: "Can't find your answer? Ask us directly and we will get back to you.",
    faqLink: "Contact us",
  },
};

const slideImages = {
  "used-ct-scanners": "/images/equipment/ct-eclos.webp",
  "used-pet-ct-scanners": "/images/equipment/pet-ct.webp",
  "used-mri-machines": "/images/equipment/mri-render.webp",
  "used-spect-gamma-cameras": "/images/equipment/spect-ct.webp",
  "used-mammography-machines": "/images/equipment/mammography.webp",
  "used-c-arm-systems": "/images/equipment/c-arm-or.webp",
};

export const homeMetadata = (locale) => ({ ...copy[locale].meta, alternates: alternates(locale, "/") });

export function HomePage({ locale }) {
  const c = copy[locale];
  const equipment = getEquipmentList(locale);
  const { generalFaqs, processSteps } = getContent(locale);
  const slides = Object.entries(slideImages).map(([slug, image]) => {
    const e = equipment.find((x) => x.slug === slug);
    return { image, text: c.slides[slug], title: e.name, modality: e.modality, href: localePath(locale, `/equipment/${slug}`) };
  });

  return (
    <>
      <Hero locale={locale} />
      <FactStrip locale={locale} />

      <Section tone="paper">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading kicker={c.equipmentKicker} title={c.equipmentTitle} description={c.equipmentText} />
          <Button asChild variant="outline" className="shrink-0">
            <Link href={localePath(locale, "/equipment")}>{c.viewAll}</Link>
          </Button>
        </div>
        <EquipmentGrid items={equipment} locale={locale} />
      </Section>

      <section className="overflow-hidden bg-ink py-20 md:py-28">
        <div className="mx-auto max-w-site px-5 sm:px-8">
          <EquipmentSlider heading={c.sliderTitle} description={c.sliderText} slides={slides} />
        </div>
      </section>

      <WhyJapan locale={locale} />

      <Section tone="paper">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading kicker={c.processKicker} title={c.processTitle} description={c.processText} />
          <Button asChild variant="outline" className="shrink-0">
            <Link href={localePath(locale, "/how-it-works")}>{c.processLink}</Link>
          </Button>
        </div>
        <ProcessTimeline steps={processSteps} />
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <SectionHeading title={c.faqTitle} description={c.faqText}>
            <Button asChild variant="link" className="mt-4 h-auto">
              <Link href={localePath(locale, "/contact")}>{c.faqLink}</Link>
            </Button>
          </SectionHeading>
          <FaqList faqs={generalFaqs} />
        </div>
      </Section>

      <CtaBand locale={locale} />
    </>
  );
}
