"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { InspectionSeal } from "@/components/shared/inspection-seal";
import { whatsappLink } from "@/data/site";
import { localePath } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1];

const notePositions = ["left-3 top-[9%] sm:-left-10", "right-3 top-[44%] sm:-right-8", "bottom-[13%] right-3 sm:right-[8%]"];

const copy = {
  en: {
    eyebrow: "Used imaging equipment, exported from Japan",
    title: "Pre-owned MRI, CT and X-ray systems, inspected before they leave Japan.",
    titleClass: "max-w-[16ch]",
    text: "We source used imaging equipment from Japanese hospitals, document its condition, and ship it to clinics, hospitals and distributors worldwide.",
    quote: "Request a quote",
    browse: "Browse equipment",
    brands: "Systems from Canon, Fujifilm, Shimadzu, Siemens, GE HealthCare, Philips and other manufacturers.",
    imageAlt: "Closed-bore MRI system in a hospital scan room",
    seal: "Inspected in Japan",
    notes: ["Function-tested before export", "Sourced from hospitals in Japan", "Crated for sea and air freight"],
  },
  ja: {
    eyebrow: "日本から輸出する中古画像診断機器",
    title: "日本を出る前に検査した、中古のMRI・CT・X線装置。",
    titleClass: "max-w-[13em]",
    text: "日本国内の病院から中古の画像診断機器を調達し、状態を記録したうえで、世界各国のクリニック・病院・販売代理店へお届けします。",
    quote: "お見積りを依頼",
    browse: "機器一覧を見る",
    brands: "キヤノン、富士フイルム、島津製作所、シーメンス、GEヘルスケア、フィリップスなど、各メーカーの機器を取り扱っています。",
    imageAlt: "病院の検査室に設置された閉鎖型MRI装置",
    seal: "日本で検品済み",
    notes: ["輸出前に動作確認済み", "日本の病院から調達", "海上・航空輸送用に木箱梱包"],
  },
};

/**
 * Home hero. One orchestrated load sequence:
 * image reveals → annotations appear in turn → inspection seal stamps.
 */
export function Hero({ locale = "en" }) {
  const reduce = useReducedMotion();
  const c = copy[locale];
  const t = (delay) => (reduce ? { duration: 0 } : { duration: 0.6, delay, ease });

  return (
    <section className="relative overflow-hidden bg-paper">
      <div
        className="pointer-events-none absolute inset-0 bg-measure-grid [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
        aria-hidden
      />
      <Container className="relative grid gap-16 pb-24 pt-12 md:pt-16 lg:grid-cols-[1.08fr_1fr] lg:items-center lg:gap-20 lg:pb-32">
        <motion.div initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={t(0)}>
          <p className="mb-6 inline-flex items-center gap-2.5 text-[0.95rem] text-slate">
            <span className="size-2 rounded-full bg-seal" aria-hidden />
            {c.eyebrow}
          </p>
          <h1 className={cn("text-display", c.titleClass)}>{c.title}</h1>
          <p className="mt-7 max-w-[52ch] text-lead text-slate">{c.text}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={localePath(locale, "/contact")}>{c.quote}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={localePath(locale, "/equipment")}>{c.browse}</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-whatsapp hover:bg-whatsapp/10">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle /> WhatsApp
              </a>
            </Button>
          </div>
          <p className="mt-12 max-w-[48ch] border-t border-line pt-5 text-sm leading-relaxed text-slate">
            {c.brands}
          </p>
        </motion.div>

        <div className="relative mx-auto w-full max-w-[30rem] lg:max-w-none">
          <motion.div
            className="relative aspect-[4/5] overflow-hidden rounded-lg bg-mist"
            initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={reduce ? { duration: 0 } : { duration: 1.1, delay: 0.15, ease }}
          >
            <Image
              src="/images/equipment/mri-room.webp"
              alt={c.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </motion.div>

          {c.notes.map((note, i) => (
            <motion.p
              key={note}
              className={cn(
                "absolute z-10 flex items-center gap-2.5 rounded-sm border border-line bg-white/95 px-3.5 py-2.5 text-sm text-ink shadow-[0_12px_30px_-14px_rgb(14_42_71/0.35)] backdrop-blur",
                notePositions[i]
              )}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={t(1.0 + i * 0.22)}
            >
              <span className="relative grid size-3 place-items-center" aria-hidden>
                <span className="absolute size-3 rounded-full bg-teal/25" />
                <span className="size-1.5 rounded-full bg-teal" />
              </span>
              {note}
            </motion.p>
          ))}

          <motion.div
            className="absolute -bottom-10 left-2 z-20 size-28 sm:-left-12 sm:size-32"
            initial={reduce ? false : { opacity: 0, scale: 1.7, rotate: -24 }}
            animate={{ opacity: 0.94, scale: 1, rotate: -10 }}
            transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 18, delay: 1.85 }}
          >
            <InspectionSeal label={c.seal} className="size-full drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
