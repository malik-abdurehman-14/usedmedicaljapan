import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Mark: the official logo (recycling arrows around a medical cross). It has a white background,
    so on dark surfaces it sits on a white tile. */
export function LogoMark({ invert = false, className }) {
  return (
    <span className={cn("relative block size-9 shrink-0", invert && "size-10 rounded-md bg-white p-1", className)}>
      <span className="relative block size-full">
        <Image src="/images/logo.png" alt="" fill sizes="40px" className="object-contain" />
      </span>
    </span>
  );
}

const tagline = { en: "Imaging equipment export", ja: "医療画像機器の輸出" };
const homeLabel = { en: "Used Medical Equipment Japan, home", ja: "Used Medical Japan ホーム" };

export function Logo({ href = "/", locale = "en", invert = false, className }) {
  return (
    <Link href={href} className={cn("group inline-flex items-center gap-2.5", className)} aria-label={homeLabel[locale]}>
      <LogoMark invert={invert} />
      <span className="flex flex-col leading-none">
        <span className={cn("text-[1.05rem] font-semibold tracking-tight", invert ? "text-white" : "text-ink")}>
          Used Medical Japan
        </span>
        <span className={cn("mt-1 text-[0.72rem]", invert ? "text-white/60" : "text-slate")}>
          {tagline[locale]}
        </span>
      </span>
    </Link>
  );
}
