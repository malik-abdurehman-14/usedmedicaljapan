import Image from "next/image";
import { Container } from "@/components/shared/container";
import { whyJapan } from "@/data/content";

export function WhyJapan() {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-3 text-[0.95rem] font-medium text-teal">Why buy from Japan</p>
          <h2 className="text-title">Japanese hospitals replace equipment early and look after it well.</h2>
          <p className="mt-5 max-w-[52ch] text-lead text-slate">
            That combination puts a steady supply of well-kept imaging systems on the used market, often at a fraction
            of the cost of new.
          </p>
          <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-lg bg-mist">
            <Image
              src="/images/equipment/scanner-controls.webp"
              alt="Technician operating scanner controls"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <dl className="self-start divide-y divide-line border-y border-line">
          {whyJapan.map((w) => (
            <div key={w.title} className="grid gap-2 py-8 sm:grid-cols-[13rem_1fr] sm:gap-8">
              <dt className="text-[1.15rem] font-medium text-ink">{w.title}</dt>
              <dd className="text-slate">{w.text}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
