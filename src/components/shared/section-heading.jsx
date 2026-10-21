import { cn } from "@/lib/utils";

/**
 * Left-aligned heading block. `kicker` is optional plain-language context
 * (sentence case, not an all-caps eyebrow).
 */
export function SectionHeading({ kicker, title, description, invert = false, className, as: Tag = "h2", children }) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {kicker && <p className={cn("mb-3 text-[0.95rem] font-medium", invert ? "text-teal-tint/80" : "text-teal")}>{kicker}</p>}
      <Tag className={cn("text-title", invert && "text-white")}>{title}</Tag>
      {description && <p className={cn("mt-4 text-lead", invert ? "text-white/70" : "text-slate")}>{description}</p>}
      {children}
    </div>
  );
}
