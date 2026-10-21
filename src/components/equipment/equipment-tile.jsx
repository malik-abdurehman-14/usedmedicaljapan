import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Image-led equipment tile. `size="large"` is used for flagship modalities. */
export function EquipmentTile({ item, size = "default", className, priority = false }) {
  const large = size === "large";
  return (
    <Link
      href={`/equipment/${item.slug}`}
      className={cn(
        "group relative isolate flex flex-col justify-end overflow-hidden rounded-lg bg-ink",
        large ? "min-h-[22rem] md:min-h-[26rem]" : "min-h-[17rem]",
        className
      )}
    >
      <Image
        src={item.image}
        alt={item.name}
        fill
        priority={priority}
        sizes={large ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
        className="-z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink/90 via-ink/35 to-ink/0" />
      <span className="absolute left-4 top-4 grid h-8 min-w-8 place-items-center rounded-sm bg-white/92 px-1.5 text-xs font-semibold text-ink">
        {item.modality}
      </span>
      <div className="flex items-end justify-between gap-4 p-5 md:p-6">
        <div>
          <h3 className={cn("text-white", large ? "text-subtitle" : "text-[1.2rem] leading-tight")}>{item.name}</h3>
          <p className={cn("mt-1.5 text-white/75", large ? "max-w-[44ch] text-[0.98rem]" : "text-sm leading-snug")}>{item.summary}</p>
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/40 text-white transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-ink">
          <ArrowUpRight className="size-4" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
