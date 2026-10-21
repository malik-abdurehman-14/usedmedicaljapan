import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/site";

/** Floating WhatsApp button — most buyers in target markets prefer WhatsApp. */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink("Hello, I'm interested in used medical equipment from Japan.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-30 flex h-14 items-center gap-2 rounded-full bg-whatsapp pl-4 pr-4 text-white shadow-[0_10px_30px_-8px_rgb(31_168_85/0.6)] transition-all duration-300 hover:pr-5 sm:bottom-7 sm:right-7"
    >
      <MessageCircle className="size-6" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 group-hover:max-w-[8rem] group-focus-visible:max-w-[8rem]">
        Chat with us
      </span>
    </a>
  );
}
