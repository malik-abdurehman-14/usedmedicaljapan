"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const copy = {
  en: {
    alt: (alt, n, total) => `${alt}, image ${n} of ${total}`,
    show: (n) => `Show image ${n}`,
    note: "Example image. Photos of the actual unit are sent with your quote.",
  },
  ja: {
    alt: (alt, n, total) => `${alt}（画像 ${n}/${total}）`,
    show: (n) => `画像${n}を表示`,
    note: "参考画像です。実機の写真はお見積りとあわせてお送りします。",
  },
};

/** Main image with thumbnail strip. */
export function ProductGallery({ images, alt, locale = "en" }) {
  const [active, setActive] = useState(0);
  const t = copy[locale];
  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-mist">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={images[active]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          >
            <Image
              src={images[active]}
              alt={t.alt(alt, active + 1, images.length)}
              fill
              priority={active === 0}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <p className="absolute bottom-3 left-3 rounded-sm bg-ink/70 px-2 py-1 text-xs text-white backdrop-blur">
          {t.note}
        </p>
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-6">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={t.show(i + 1)}
              aria-pressed={i === active}
              className={cn(
                "relative aspect-square overflow-hidden rounded-md ring-offset-2 transition-all",
                i === active ? "ring-2 ring-teal" : "opacity-70 hover:opacity-100"
              )}
            >
              <Image src={src} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
