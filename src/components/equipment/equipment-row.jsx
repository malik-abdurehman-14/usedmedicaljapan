import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/** Catalogue row used on the /equipment listing page. */
export function EquipmentRow({ item, index }) {
  return (
    <article className="grid gap-6 border-t border-line py-10 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-10 lg:grid-cols-[minmax(0,26rem)_1fr]">
      <Link href={`/equipment/${item.slug}`} className="group relative block aspect-[4/3] overflow-hidden rounded-lg bg-mist">
        <Image
          src={item.image}
          alt={item.name}
          fill
          priority={index < 2}
          sizes="(min-width: 1024px) 26rem, (min-width: 768px) 22rem, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <span className="grid h-7 min-w-7 place-items-center rounded-sm border border-line px-1.5 text-xs font-semibold text-ink">
            {item.modality}
          </span>
          <span className="text-sm text-slate">Modality code</span>
        </div>
        <h2 className="mt-4 text-subtitle">
          <Link href={`/equipment/${item.slug}`} className="transition-colors hover:text-teal">
            {item.name}
          </Link>
        </h2>
        <p className="mt-3 max-w-[60ch] text-slate">{item.intro}</p>
        <dl className="mt-6 grid max-w-xl grid-cols-1 gap-x-8 gap-y-3 text-[0.95rem] sm:grid-cols-2">
          {item.quickInfo.slice(0, 2).map((q) => (
            <div key={q.label} className="border-l-2 border-teal-tint pl-3">
              <dt className="text-sm text-slate">{q.label}</dt>
              <dd className="text-ink">{q.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-wrap gap-3 md:mt-auto md:pt-8">
          <Button asChild variant="ink">
            <Link href={`/equipment/${item.slug}`}>View details</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/contact?equipment=${item.slug}`}>Request a quote</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
