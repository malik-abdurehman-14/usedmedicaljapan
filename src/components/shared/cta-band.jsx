import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "./container";
import { whatsappLink } from "@/data/site";
import { localePath } from "@/lib/i18n";

const copy = {
  en: {
    title: "Looking for Specific Medical Equipment?",
    text: "Share your equipment requirements, budget, and destination country. We’ll help source suitable options from Japan.",
    quote: "Request a quote",
    whatsapp: "Chat on WhatsApp",
    message: "Hello, I'm looking for used medical equipment from Japan.",
  },
  ja: {
    title: "特定の医療機器をお探しですか？",
    text: "必要な機器の条件、ご予算、納入先の国をお知らせください。日本国内から条件に合う機器を探します。",
    quote: "お見積りを依頼",
    whatsapp: "WhatsAppで相談",
    message: "こんにちは。日本の中古医療機器を探しています。",
  },
};

export function CtaBand({ locale = "en", title, text }) {
  const t = copy[locale];
  return (
    <section className="bg-ink text-white">
      <Container className="grid gap-10 py-16 md:grid-cols-[1.4fr_1fr] md:items-end md:py-20">
        <div>
          <h2 className="text-title text-white">{title ?? t.title}</h2>
          <p className="mt-4 max-w-[55ch] text-lead text-white/70">{text ?? t.text}</p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <Button asChild size="lg" variant="inverse">
            <Link href={localePath(locale, "/contact")}>{t.quote}</Link>
          </Button>
          <Button asChild size="lg" variant="outline-inverse">
            <a href={whatsappLink(t.message)} target="_blank" rel="noopener noreferrer">
              <MessageCircle /> {t.whatsapp}
            </a>
          </Button>
        </div>
      </Container>
    </section>
  );
}
