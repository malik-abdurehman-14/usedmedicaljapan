"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Sticky in-page navigation for long product pages, with scroll-spy. */
export function ProductSubnav({ sections }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -60% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="On this page" className="sticky top-[76px] z-20 border-y border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-site gap-1 overflow-x-auto px-5 sm:px-8 [scrollbar-width:none]">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={cn(
              "relative shrink-0 px-3 py-4 text-[0.92rem] transition-colors",
              active === s.id ? "text-ink" : "text-slate hover:text-ink"
            )}
          >
            {s.label}
            <span
              className={cn(
                "absolute inset-x-3 bottom-0 h-0.5 origin-left bg-teal transition-transform duration-300",
                active === s.id ? "scale-x-100" : "scale-x-0"
              )}
            />
          </a>
        ))}
      </div>
    </nav>
  );
}
