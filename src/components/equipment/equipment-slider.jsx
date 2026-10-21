"use client";

import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselProgress } from "@/components/ui/carousel";

/**
 * Wide image slider. slides: [{ image, title, text, href, modality }]
 */
export function EquipmentSlider({ slides, heading, description }) {
  const autoplay = useRef(Autoplay({ delay: 5500, stopOnInteraction: true, stopOnMouseEnter: true }));
  return (
    <Carousel opts={{ align: "start", loop: true }} plugins={[autoplay.current]} aria-label={heading} className="text-white">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-title text-white">{heading}</h2>
          {description && <p className="mt-4 text-lead text-white/70">{description}</p>}
        </div>
        <div className="flex items-center gap-5">
          <CarouselProgress className="text-white" />
          <div className="flex gap-2">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </div>
      </div>
      <CarouselContent>
        {slides.map((s, i) => (
          <CarouselItem key={s.image + i} className="basis-[88%] md:basis-[62%] lg:basis-[48%]">
            <Link href={s.href} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-ink-soft">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(min-width: 1024px) 48vw, (min-width: 768px) 62vw, 88vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <span className="absolute left-4 top-4 rounded-sm bg-white/92 px-2 py-1 text-xs font-semibold text-ink">{s.modality}</span>
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-6">
                <h3 className="text-[1.2rem] text-white transition-colors group-hover:text-teal-tint">{s.title}</h3>
                <span className="shrink-0 text-sm text-white/50">
                  {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-1.5 max-w-[52ch] text-[0.95rem] text-white/65">{s.text}</p>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
