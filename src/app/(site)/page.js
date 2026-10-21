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
import { equipment } from "@/data/equipment";
import { generalFaqs, processSteps } from "@/data/content";

export const metadata = {
  alternates: { canonical: "/", languages: { en: "/", ja: "/ja" } },
};

const slides = [
  { slug: "used-ct-scanners", image: "/images/equipment/ct-eclos.webp", text: "Multi-slice CT with tube history reported for every unit." },
  { slug: "used-pet-ct-scanners", image: "/images/equipment/pet-ct.webp", text: "PET-CT for oncology centres building nuclear medicine services." },
  { slug: "used-mri-machines", image: "/images/equipment/mri-render.webp", text: "1.5T and 3.0T MRI with helium level and coil list documented." },
  { slug: "used-spect-gamma-cameras", image: "/images/equipment/spect-ct.webp", text: "Dual-head SPECT-CT with each collimator listed." },
  { slug: "used-mammography-machines", image: "/images/equipment/mammography.webp", text: "Digital and 3D tomosynthesis mammography for screening programmes." },
  { slug: "used-c-arm-systems", image: "/images/equipment/c-arm-or.webp", text: "Mobile C-arms that can ship by air and start work quickly." },
].map((s) => {
  const e = equipment.find((x) => x.slug === s.slug);
  return { ...s, title: e.name, modality: e.modality, href: `/equipment/${e.slug}` };
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <FactStrip />

      <Section tone="paper">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            kicker="Equipment we supply"
            title="Nine categories of imaging equipment"
            description="From high-field MRI to portable ultrasound. Each category page lists the brands, configurations and documentation you can expect."
          />
          <Button asChild variant="outline" className="shrink-0">
            <Link href="/equipment">View all equipment</Link>
          </Button>
        </div>
        <EquipmentGrid items={equipment} />
      </Section>

      <section className="overflow-hidden bg-ink py-20 md:py-28">
        <div className="mx-auto max-w-site px-5 sm:px-8">
          <EquipmentSlider
            heading="A closer look at the systems"
            description="Example images by category. Photos and video of the specific unit come with every quotation."
            slides={slides}
          />
        </div>
      </section>

      <WhyJapan />

      <Section tone="paper">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            kicker="How it works"
            title="From your first message to your port"
            description="Six steps, with one contact who speaks English and Japanese throughout."
          />
          <Button asChild variant="outline" className="shrink-0">
            <Link href="/how-it-works">See the full process</Link>
          </Button>
        </div>
        <ProcessTimeline steps={processSteps} />
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <SectionHeading title="Common questions" description="Can't find your answer? Ask us directly and we will get back to you.">
            <Button asChild variant="link" className="mt-4 h-auto">
              <Link href="/contact">Contact us</Link>
            </Button>
          </SectionHeading>
          <FaqList faqs={generalFaqs} />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
