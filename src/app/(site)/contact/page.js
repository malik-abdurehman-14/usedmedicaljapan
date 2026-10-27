import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/shared/container";
import { QuoteForm } from "@/components/forms/quote-form";
import { site, whatsappLink } from "@/data/site";

export const metadata = {
  title: "Contact Us and Request a Quote",
  description: "Request a quote for used MRI, CT, X-ray, ultrasound and other imaging equipment from Japan.",
  alternates: { canonical: "/contact" },
};

const channels = [
  { icon: MessageCircle, label: "WhatsApp", value: "Fastest for quick questions", href: whatsappLink(), external: true },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: Phone, label: "Phone", value: site.phone, href: site.phoneHref },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Contact" }]}
        title="Request a quote"
        description="Tell us what you need and where it is going. We will reply with available units, photos and pricing."
      />
      <Container className="grid gap-14 py-16 md:py-24 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
        <div>
          <h2 className="text-subtitle">Your requirement</h2>
          <QuoteForm className="mt-8" />
        </div>
        <aside className="space-y-10">
          <div>
            <h2 className="text-subtitle">Other ways to reach us</h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {channels.map(({ icon: Icon, label, value, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-start gap-4 py-5"
                  >
                    <Icon className="mt-0.5 size-5 shrink-0 text-teal" aria-hidden />
                    <span>
                      <span className="block font-medium text-ink transition-colors group-hover:text-teal">{label}</span>
                      <span className="mt-0.5 block text-[0.95rem] text-slate">{value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <dl className="space-y-5 text-[0.95rem]">
            <div className="flex items-start gap-4">
              <Clock className="mt-0.5 size-5 shrink-0 text-slate" aria-hidden />
              <div>
                <dt className="font-medium text-ink">Office hours</dt>
                <dd className="text-slate">{site.hours}</dd>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="mt-0.5 size-5 shrink-0 text-slate" aria-hidden />
              <div>
                <dt className="font-medium text-ink">Office</dt>
                <dd className="text-slate">{site.address}</dd>
              </div>
            </div>
          </dl>
        </aside>
      </Container>
    </>
  );
}
