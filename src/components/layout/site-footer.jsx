import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { equipment } from "@/data/equipment";
import { site, whatsappLink } from "@/data/site";

const company = [
  { label: "Services", href: "/services" },
  { label: "How it works", href: "/how-it-works" },
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "日本語 (医療機器買取)", href: "/ja" },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#0a2139] text-white/75">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1.4fr_0.9fr_1.1fr]">
        <div>
          <Logo invert />
          <p className="mt-5 max-w-[34ch] text-[0.95rem] leading-relaxed">
            Used medical imaging equipment sourced from hospitals in Japan, inspected and exported worldwide.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-medium text-white">Equipment</h2>
          <ul className="mt-4 grid grid-cols-1 gap-2 text-[0.95rem] sm:grid-cols-2">
            {equipment.map((e) => (
              <li key={e.slug}>
                <Link href={`/equipment/${e.slug}`} className="transition-colors hover:text-white">
                  {e.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-medium text-white">Company</h2>
          <ul className="mt-4 space-y-2 text-[0.95rem]">
            {company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-medium text-white">Contact</h2>
          <ul className="mt-4 space-y-3 text-[0.95rem]">
            <li>
              <a href={`mailto:${site.email}`} className="flex items-start gap-2.5 transition-colors hover:text-white">
                <Mail className="mt-1 size-4 shrink-0 text-teal" /> {site.email}
              </a>
            </li>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 transition-colors hover:text-white">
                <MessageCircle className="mt-1 size-4 shrink-0 text-teal" /> WhatsApp
              </a>
            </li>
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="flex items-start gap-2.5 transition-colors hover:text-white">
                <Phone className="mt-1 size-4 shrink-0 text-teal" /> {site.phone}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-1 size-4 shrink-0 text-teal" /> {site.address}
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-sm text-white/50 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Product names and trademarks belong to their respective owners.</p>
        </Container>
      </div>
    </footer>
  );
}
