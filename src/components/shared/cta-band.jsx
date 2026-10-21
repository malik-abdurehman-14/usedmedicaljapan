import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "./container";
import { whatsappLink } from "@/data/site";

export function CtaBand({
  title = "Looking for a specific machine?",
  text = "Tell us the equipment, budget and destination country. We will come back with available units from Japan.",
}) {
  return (
    <section className="bg-ink text-white">
      <Container className="grid gap-10 py-16 md:grid-cols-[1.4fr_1fr] md:items-end md:py-20">
        <div>
          <h2 className="text-title text-white">{title}</h2>
          <p className="mt-4 max-w-[55ch] text-lead text-white/70">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <Button asChild size="lg" variant="inverse">
            <Link href="/contact">Request a quote</Link>
          </Button>
          <Button asChild size="lg" variant="outline-inverse">
            <a href={whatsappLink("Hello, I'm looking for used medical equipment from Japan.")} target="_blank" rel="noopener noreferrer">
              <MessageCircle /> Chat on WhatsApp
            </a>
          </Button>
        </div>
      </Container>
    </section>
  );
}
