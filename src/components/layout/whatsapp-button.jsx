import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/site";

const copy = {
  en: { message: "Hello, I'm interested in used medical equipment from Japan.", aria: "Chat with us on WhatsApp", label: "Chat with us" },
  ja: { message: "こんにちは。日本の中古医療機器について問い合わせたいです。", aria: "WhatsAppでお問い合わせ", label: "チャットで相談" },
};

/** Floating WhatsApp button — most buyers in target markets prefer WhatsApp. */
export function WhatsAppButton({ locale = "en" }) {
  const t = copy[locale];
  return (
    <a
      href={whatsappLink(t.message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.aria}
      className="group fixed bottom-5 right-5 z-30 flex h-14 items-center gap-2 rounded-full bg-whatsapp pl-4 pr-4 text-white shadow-[0_10px_30px_-8px_rgb(31_168_85/0.6)] transition-all duration-300 hover:pr-5 sm:bottom-7 sm:right-7"
    >
      <MessageCircle className="size-6" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 group-hover:max-w-[8rem] group-focus-visible:max-w-[8rem]">
        {t.label}
      </span>
    </a>
  );
}
