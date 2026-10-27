import { FileText, Info } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProcessTimeline } from "@/components/shared/process-timeline";
import { CtaBand } from "@/components/shared/cta-band";
import { processSteps } from "@/data/content";

export const metadata = {
  title: "How Buying Used Medical Equipment from Japan Works",
  description:
    "Six steps from your requirement to delivery: sourcing, inspection, quotation, de-installation, crating and shipping from Japan.",
  alternates: { canonical: "/how-it-works" },
};

const documents = [
  "Inspection report with photos and video",
  "Quotation and proforma invoice",
  "Commercial invoice and packing list",
  "Certificate of origin",
  "Bill of lading or air waybill",
  "Manufacturer manuals where available",
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "How it works" }]}
        title="How Buying Medical Equipment from Japan Works"
        description="From your initial inquiry to shipment, we guide you through each step of sourcing pre-owned medical equipment from Japan. Our goal is to provide clear information, transparent payment terms, and a smooth purchasing process."
      />
      <Section>
        <ProcessTimeline steps={processSteps} variant="vertical" />
      </Section>
      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading
            title="Documents you receive"
            description="The paperwork your bank, customs broker and regulator will usually ask for."
          />
          <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {documents.map((d) => (
              <li key={d} className="flex items-start gap-3 bg-white p-5 text-ink">
                <FileText className="mt-0.5 size-5 shrink-0 text-teal" aria-hidden />
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div role="note" className="mt-12 flex items-start gap-4 rounded-lg border-l-4 border-teal bg-teal-tint p-6 md:p-8">
          <Info className="mt-0.5 size-6 shrink-0 text-teal" aria-hidden />
          <p className="max-w-[70ch] text-lead font-medium text-ink">
            Import rules for used medical equipment differ by country. The buyer is responsible for local import permits and
            registrations; we provide the technical documents needed to apply.
          </p>
        </div>
      </Section>
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading title="Our Commitment" />
          <p className="max-w-[60ch] text-lead text-ink/85">
            We aim to make sourcing pre-owned medical equipment from Japan clear, transparent, and straightforward. Before
            you commit to an order, we will explain the available equipment information, agreed costs, payment
            requirements, and shipping arrangements so you can make an informed decision.
          </p>
        </div>
      </Section>
      <CtaBand title="Ready to start?" text="Send your requirement and we will begin sourcing in Japan." />
    </>
  );
}
