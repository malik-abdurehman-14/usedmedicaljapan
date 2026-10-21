"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { InspectionSeal } from "@/components/shared/inspection-seal";
import { whatsappLink } from "@/data/site";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1];

const notes = [
  { text: "Function-tested before export", className: "left-3 top-[9%] sm:-left-10" },
  { text: "Sourced from hospitals in Japan", className: "right-3 top-[44%] sm:-right-8" },
  { text: "Crated for sea and air freight", className: "bottom-[13%] right-3 sm:right-[8%]" },
];

/**
 * Home hero. One orchestrated load sequence:
 * image reveals → annotations appear in turn → inspection seal stamps.
 */
export function Hero() {
  const reduce = useReducedMotion();
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
            Used imaging equipment, exported from Japan
          </p>
          <h1 className="text-display max-w-[16ch]">Pre-owned MRI, CT and X-ray systems, inspected before they leave Japan.</h1>
          <p className="mt-7 max-w-[52ch] text-lead text-slate">
            We source used imaging equipment from Japanese hospitals, document its condition, and ship it to clinics,
            hospitals and distributors worldwide.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/contact">Request a quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/equipment">Browse equipment</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-whatsapp hover:bg-whatsapp/10">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle /> WhatsApp
              </a>
            </Button>
          </div>
          <p className="mt-12 max-w-[48ch] border-t border-line pt-5 text-sm leading-relaxed text-slate">
            Systems from Canon, Fujifilm, Shimadzu, Siemens, GE HealthCare, Philips and other manufacturers.
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
              alt="Closed-bore MRI system in a hospital scan room"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </motion.div>

          {notes.map((n, i) => (
            <motion.p
              key={n.text}
              className={cn(
                "absolute z-10 flex items-center gap-2.5 rounded-sm border border-line bg-white/95 px-3.5 py-2.5 text-sm text-ink shadow-[0_12px_30px_-14px_rgb(14_42_71/0.35)] backdrop-blur",
                n.className
              )}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={t(1.0 + i * 0.22)}
            >
              <span className="relative grid size-3 place-items-center" aria-hidden>
                <span className="absolute size-3 rounded-full bg-teal/25" />
                <span className="size-1.5 rounded-full bg-teal" />
              </span>
              {n.text}
            </motion.p>
          ))}

          <motion.div
            className="absolute -bottom-10 left-2 z-20 size-28 sm:-left-12 sm:size-32"
            initial={reduce ? false : { opacity: 0, scale: 1.7, rotate: -24 }}
            animate={{ opacity: 0.94, scale: 1, rotate: -10 }}
            transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 18, delay: 1.85 }}
          >
            <InspectionSeal className="size-full drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
