import Link from "next/link";
import { cn } from "@/lib/utils";

/** Mark: a scanner gantry ring with the seal-red indicator light. */
export function LogoMark({ className }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-8", className)}>
      <rect width="32" height="32" rx="7" fill="currentColor" />
      <circle cx="16" cy="16" r="9.2" fill="none" stroke="#fff" strokeWidth="3.2" />
      <circle cx="16" cy="16" r="3.4" fill="#fff" opacity="0.28" />
      <circle cx="16" cy="5.2" r="1.9" fill="#e0574b" />
    </svg>
  );
}

export function Logo({ href = "/", invert = false, className }) {
  return (
    <Link href={href} className={cn("group inline-flex items-center gap-2.5", className)} aria-label="Used Medical Equipment Japan, home">
      <LogoMark className={invert ? "text-teal" : "text-ink"} />
      <span className="flex flex-col leading-none">
        <span className={cn("text-[1.05rem] font-semibold tracking-tight", invert ? "text-white" : "text-ink")}>
          Used Medical Japan
        </span>
        <span className={cn("mt-1 text-[0.72rem]", invert ? "text-white/60" : "text-slate")}>
          Imaging equipment export
        </span>
      </span>
    </Link>
  );
}
