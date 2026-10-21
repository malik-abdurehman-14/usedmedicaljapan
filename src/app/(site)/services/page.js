import Link from "next/link";
import { ClipboardCheck, FileText, PackageCheck, Search, Ship, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { CtaBand } from "@/components/shared/cta-band";
import { services } from "@/data/content";

export const metadata = {
  title: "Services: Sourcing, Inspection and Export",
  description:
    "Sourcing, inspection, de-installation, export crating, documentation and shipping for used medical imaging equipment from Japan.",
  alternates: { canonical: "/services" },
};

const icons = { search: Search, clipboard: ClipboardCheck, wrench: Wrench, package: PackageCheck, file: FileText, ship: Ship };

const buyers = [
  { title: "Hospitals", text: "Adding or replacing imaging capacity within a fixed capital budget." },
  { title: "Diagnostic centres", text: "Opening new sites or expanding into CT, MRI and nuclear medicine." },
  { title: "Distributors and dealers", text: "Sourcing reliable stock from Japan for resale in their own market." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Services" }]}
        title="Everything between a hospital in Japan and yours"
        description="We handle sourcing, inspection, removal, packing, paperwork and freight, so you deal with one supplier from the first enquiry to delivery."
      >
        <Button asChild size="lg">
          <Link href="/contact">Request a quote</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/how-it-works">How it works</Link>
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
          <SectionHeading title="Who we work with" description="Buyers who need dependable equipment without the price of new." />
          <dl className="divide-y divide-line border-y border-line">
            {buyers.map((b) => (
              <div key={b.title} className="grid gap-2 py-7 sm:grid-cols-[13rem_1fr] sm:gap-8">
                <dt className="text-[1.15rem] font-medium text-ink">{b.title}</dt>
                <dd className="text-slate">{b.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
