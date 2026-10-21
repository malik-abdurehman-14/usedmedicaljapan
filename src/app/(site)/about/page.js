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
        title="A Japan-based bridge between hospitals that upgrade and hospitals that grow"
        description="[Client to provide: two or three sentences on who founded the company, when, and why.]"
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-mist">
            <Image src="/images/equipment/ct-room.webp" alt="CT scanner in a hospital room" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="max-w-[60ch] space-y-5 text-ink/85">
            <h2 className="text-title">Our story</h2>
            <p>
              Hospitals in Japan replace imaging equipment on regular cycles, often while systems still have years of
              useful life. At the same time, hospitals and clinics in many countries need that equipment but cannot
              justify the price of new.
            </p>
            <p>
              We connect the two. We source systems in Japan, check them carefully, and handle everything needed to get
              them to the buyer, from removal and crating to export paperwork.
            </p>
            <p className="text-slate">[Client to replace with the company's own story.]</p>
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
