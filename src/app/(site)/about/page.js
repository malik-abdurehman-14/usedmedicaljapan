import Image from "next/image";
import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { InspectionSeal } from "@/components/shared/inspection-seal";
import { CtaBand } from "@/components/shared/cta-band";
import { companyProfile } from "@/data/content";

export const metadata = {
  title: "About Us",
  description:
    "A Japan-based supplier of used medical imaging equipment, connecting Japanese hospitals with buyers worldwide.",
  alternates: { canonical: "/about" },
};

const principles = [
  { title: "Say what the unit is", text: "Condition, usage and missing parts go in the report, before you pay, not after delivery." },
  { title: "Show, don't describe", text: "Photos and video of the actual unit, and an open invitation to inspect it in Japan." },
  { title: "One contact", text: "The same person handles your request from first message to shipment, in English or Japanese." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "About" }]}
        title="A bridge between hospitals that upgrade and hospitals that grow"
      />

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading title="Our mission" />
          <p className="max-w-[60ch] text-lead text-ink/85">
            Used Medical Japan was established to connect healthcare providers in Japan upgrading their medical equipment
            with hospitals and medical institutions worldwide seeking affordable, quality pre-owned equipment. Our mission
            is to extend the life of medical equipment, make healthcare technology more accessible, and promote sustainable
            reuse across borders.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-mist">
            <Image src="/images/equipment/ct-room.webp" alt="CT scanner in a hospital room" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="max-w-[60ch] space-y-5 text-ink/85">
            <SectionHeading kicker="Our story" title="Good equipment deserves a second hospital" />
            <p>
              Hospitals in Japan regularly upgrade their medical equipment, creating opportunities for reliable pre-owned
              systems to continue serving patients elsewhere. Meanwhile, hospitals and clinics around the world need access
              to medical technology at more affordable prices.
            </p>
            <p>
              Used Medical Japan connects these needs. We help international buyers source pre-owned medical equipment from
              Japan and coordinate the process, from equipment selection and condition information to shipping and export
              arrangements, according to each customer&apos;s requirements.
            </p>
            <p>
              Our belief is simple: quality medical equipment should have the opportunity to make a difference for more
              patients, wherever it is needed.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading title="How we work" className="mb-12" />
        <div className="grid gap-10 md:grid-cols-3">
          {principles.map((p) => (
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
            <SectionHeading title="Company profile" description="会社概要" />
            <InspectionSeal className="size-28 -rotate-6 opacity-90" />
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

      <CtaBand />
    </>
  );
}
