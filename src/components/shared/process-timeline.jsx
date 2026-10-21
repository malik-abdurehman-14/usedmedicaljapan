"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Process timeline.
 * variant="horizontal": compact steps on one rail (stacks vertically on mobile).
 * variant="vertical":   detailed steps; the rail fills as the reader scrolls.
 * steps: [{ title, text, detail? }]
 */
export function ProcessTimeline({ steps, variant = "horizontal", invert = false }) {
  return variant === "vertical" ? <VerticalTimeline steps={steps} /> : <HorizontalTimeline steps={steps} invert={invert} />;
}

function StepNumber({ n, invert, className }) {
  return (
    <span
      className={cn(
        "relative z-10 grid size-11 shrink-0 place-items-center rounded-full border text-sm font-semibold",
        invert ? "border-white/30 bg-ink text-white" : "border-line bg-white text-ink",
        className
      )}
    >
      {String(n).padStart(2, "0")}
    </span>
  );
}

function HorizontalTimeline({ steps, invert }) {
  const reduce = useReducedMotion();
  const cols = { 4: "lg:grid-cols-4", 5: "lg:grid-cols-5", 6: "lg:grid-cols-6" }[steps.length] ?? "lg:grid-cols-6";
  return (
    <div className="relative">
      {/* rail (desktop) */}
      <div className={cn("absolute left-0 right-0 top-[22px] hidden h-px lg:block", invert ? "bg-white/15" : "bg-line")} aria-hidden>
        <motion.div
          className="h-full origin-left bg-teal"
          initial={{ scaleX: reduce ? 1 : 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <ol className={cn("grid gap-8 lg:gap-6", cols)}>
        {steps.map((s, i) => (
          <motion.li
            key={s.title}
            className="relative flex gap-5 lg:block"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: reduce ? 0 : 0.15 + i * 0.18, ease: "easeOut" }}
          >
            {/* rail (mobile) */}
            {i < steps.length - 1 && (
              <span className={cn("absolute left-[22px] top-11 h-[calc(100%-0.75rem)] w-px lg:hidden", invert ? "bg-white/15" : "bg-line")} aria-hidden />
            )}
            <StepNumber n={i + 1} invert={invert} />
            <div className="lg:mt-6 lg:pr-2">
              <h3 className={cn("text-[1.08rem] leading-snug", invert && "text-white")}>{s.title}</h3>
              <p className={cn("mt-2 text-[0.95rem] leading-relaxed", invert ? "text-white/65" : "text-slate")}>{s.text}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

function VerticalTimeline({ steps }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div ref={ref} className="relative">
      <div className="absolute bottom-6 left-[22px] top-6 w-px bg-line md:left-[calc(12rem+22px)]" aria-hidden>
        <motion.div className="h-full origin-top bg-teal" style={{ scaleY: reduce ? 1 : progress }} />
      </div>
      <ol className="space-y-12 md:space-y-16">
        {steps.map((s, i) => (
          <li key={s.title} className="relative grid gap-4 md:grid-cols-[12rem_auto_1fr] md:gap-8">
            <p className="hidden pt-2.5 text-right text-sm text-slate md:block">Step {i + 1} of {steps.length}</p>
            <div className="flex items-start gap-5 md:contents">
              <StepNumber n={i + 1} />
              <div className="md:pt-1.5">
                <h3 className="text-subtitle">{s.title}</h3>
                <p className="mt-2 max-w-[60ch] text-ink/85">{s.text}</p>
                {s.detail && <p className="mt-3 max-w-[60ch] text-[0.97rem] text-slate">{s.detail}</p>}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
