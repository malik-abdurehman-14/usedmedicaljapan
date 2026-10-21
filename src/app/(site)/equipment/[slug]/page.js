import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/shared/container";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { FaqList } from "@/components/shared/faq-list";
import { InspectionSeal } from "@/components/shared/inspection-seal";
import { ProductGallery } from "@/components/equipment/product-gallery";
import { ProductSubnav } from "@/components/equipment/product-subnav";
import { SpecTable } from "@/components/equipment/spec-table";
import { BrandTable } from "@/components/equipment/brand-table";
import { EquipmentTile } from "@/components/equipment/equipment-tile";
import { QuoteForm } from "@/components/forms/quote-form";
import { commonProductFaqs, equipment, getEquipment, getRelated } from "@/data/equipment";
import { whatsappLink } from "@/data/site";

export function generateStaticParams() {
  return equipment.map((e) => ({ slug: e.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = getEquipment(slug);
  if (!item) return {};
  return {
    title: `Used ${item.name} from Japan`,
    description: `${item.intro} Inspection report, photos and worldwide shipping on FOB or CIF terms.`,
    alternates: { canonical: `/equipment/${item.slug}` },
    openGraph: { images: [{ url: item.image, alt: item.name }] },
  };
}

const sections = [
  { id: "overview", label: "Overview" },
  { id: "brands", label: "Brands" },
  { id: "specifications", label: "Specifications" },
  { id: "inspection", label: "Inspection" },
  { id: "shipping", label: "Shipping" },
  { id: "faq", label: "FAQ" },
  { id: "quote", label: "Get a quote" },
];

const inspectionChecks = [
  "Power-on and full function test",
  "Image quality check with test scans or phantoms",
  "Mechanical movement and safety interlocks",
  "Usage data recorded where the system logs it",
  "Photos and video of the specific unit",
  "Cosmetic condition and missing parts noted",
];

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const item = getEquipment(slug);
  if (!item) notFound();

  const related = getRelated(slug);
  const faqs = [...item.faqs, ...commonProductFaqs];

  return (
    <>
      {/* Header */}
      <section className="bg-paper">
        <Container className="pb-14 pt-8 md:pb-20 md:pt-10">
          <Breadcrumbs items={[{ label: "Equipment", href: "/equipment" }, { label: item.name }]} className="mb-8" />
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <ProductGallery images={item.gallery} alt={item.name} />
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <Badge variant="ink" size="sm" className="px-2 py-1 text-xs">{item.modality}</Badge>
                <span className="text-sm text-slate">Used, sourced in Japan</span>
              </div>
              <h1 className="mt-5 text-display text-[clamp(2.1rem,3.8vw,3.2rem)]">Used {item.name} from Japan</h1>
              <p className="mt-5 max-w-[56ch] text-lead text-slate">{item.intro}</p>

              <dl className="mt-8 divide-y divide-line border-y border-line">
                {item.quickInfo.map((q) => (
                  <div key={q.label} className="grid grid-cols-[9.5rem_1fr] gap-4 py-3 text-[0.97rem]">
                    <dt className="text-slate">{q.label}</dt>
                    <dd className="text-ink">{q.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href="#quote">Request a quote</a>
                </Button>
                <Button asChild size="lg" variant="whatsapp">
                  <a
                    href={whatsappLink(`Hello, I'm interested in used ${item.plural} from Japan.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle /> Ask on WhatsApp
                  </a>
                </Button>
              </div>
              <p className="mt-4 text-sm text-slate">Prices depend on model, year and condition, and are quoted per unit.</p>
            </div>
          </div>
        </Container>
      </section>

      <ProductSubnav sections={sections} />

      {/* Overview */}
      <section id="overview" className="py-16 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <SectionHeading title="Overview" />
            <div className="mt-6 max-w-[65ch] space-y-5 text-ink/85">
              {item.overview.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
          <aside className="self-start rounded-lg border border-line p-7">
            <h3 className="text-[1.1rem]">Typical applications</h3>
            <ul className="mt-5 space-y-3">
              {item.applications.map((a) => (
                <li key={a} className="flex gap-3 text-[0.97rem] text-ink/85">
                  <Check className="mt-1 size-4 shrink-0 text-teal" aria-hidden />
                  {a}
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>

      {/* Brands */}
      <section id="brands" className="border-t border-line py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading
            title="Brands and models"
            description="Manufacturers we regularly source in this category. Availability changes, so ask about a specific model."
          />
          <BrandTable brands={item.brands} />
        </Container>
      </section>

      {/* Specifications */}
      <section id="specifications" className="border-t border-line bg-paper py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading
            title="Specifications"
            description="Typical configurations in this category. Exact specifications are listed in the inspection report for each unit."
          />
          <SpecTable rows={item.specs} />
        </Container>
      </section>

      {/* Inspection & included */}
      <section id="inspection" className="py-16 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="flex items-start justify-between gap-6">
              <SectionHeading title="Inspection before export" description={`Every ${item.singular} is checked in Japan before it is crated.`} />
              <InspectionSeal className="hidden size-24 shrink-0 -rotate-8 opacity-90 sm:block" />
            </div>
            <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {inspectionChecks.map((c) => (
                <li key={c} className="flex gap-3 text-[0.97rem] text-ink/85">
                  <Check className="mt-1 size-4 shrink-0 text-teal" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg bg-paper p-8">
            <h3 className="text-subtitle">What's included</h3>
            <p className="mt-2 text-[0.95rem] text-slate">Confirmed per unit in the quotation.</p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {item.included.map((c) => (
                <li key={c} className="py-3 text-[0.97rem] text-ink">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Shipping */}
      <section id="shipping" className="bg-ink py-16 text-white md:py-20">
        <Container className="grid gap-10 md:grid-cols-3 md:gap-12">
          <div>
            <h2 className="text-subtitle text-white">Shipping and installation</h2>
            <p className="mt-3 text-white/65">Handled from the hospital in Japan to your port.</p>
          </div>
          <div className="border-l border-white/15 pl-6">
            <h3 className="text-[1.05rem] text-white">De-installation and crating</h3>
            <p className="mt-2 text-[0.95rem] text-white/65">
              Engineers remove the system, label components, and pack it in moisture-protected export crates.
            </p>
          </div>
          <div className="border-l border-white/15 pl-6">
            <h3 className="text-[1.05rem] text-white">Freight and support</h3>
            <p className="mt-2 text-[0.95rem] text-white/65">
              FOB or CIF terms with export documents prepared. Installation support can be arranged on request.{" "}
              <Link href="/how-it-works" className="text-teal-tint underline underline-offset-4 hover:text-white">
                See the full process
              </Link>
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <SectionHeading title={`Questions about used ${item.plural}`} />
          <FaqList faqs={faqs} />
        </Container>
      </section>

      {/* Quote */}
      <section id="quote" className="border-t border-line bg-paper py-16 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading
            title={`Request a quote for ${item.plural}`}
            description="Tell us the configuration and destination. We will reply with available units, photos and pricing."
          />
          <div className="rounded-lg border border-line bg-white p-6 sm:p-8">
            <QuoteForm defaultEquipment={item.slug} />
          </div>
        </Container>
      </section>

      {/* Related */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="mb-10 flex items-end justify-between gap-6">
            <h2 className="text-title">Other equipment</h2>
            <Button asChild variant="link" className="h-auto">
              <Link href="/equipment">View all</Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <EquipmentTile key={r.slug} item={r} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
