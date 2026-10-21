import { FileText } from "lucide-react";
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
        title="How buying from Japan works"
        description="A clear sequence from your first message to the day your equipment reaches port. You always know what happens next."
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
        <p className="mt-10 max-w-[70ch] text-sm text-slate">
          Import rules for used medical equipment differ by country. The buyer is responsible for local import permits and
          registrations; we provide the technical documents needed to apply.
        </p>
      </Section>
      <CtaBand title="Ready to start?" text="Send your requirement and we will begin sourcing in Japan." />
    </>
  );
}
