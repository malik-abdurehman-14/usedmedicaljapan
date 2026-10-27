import Image from "next/image";
import { Container } from "@/components/shared/container";
import { getContent } from "@/data/content";

const copy = {
  en: {
    kicker: "Why buy from Japan",
    title: "Japanese hospitals replace equipment early and look after it well.",
    text: "That combination puts a steady supply of well-kept imaging systems on the used market, often at a fraction of the cost of new.",
    imageAlt: "Technician operating scanner controls",
  },
  ja: {
    kicker: "日本から購入する理由",
    title: "日本の病院は、機器を早めに更新し、丁寧に管理しています。",
    text: "そのため、良好な状態の画像診断機器が中古市場に安定して供給され、新品よりも大幅に低い価格で入手できることが多くあります。",
    imageAlt: "スキャナーを操作する技師",
  },
};

export function WhyJapan({ locale = "en" }) {
  const c = copy[locale];
  const { whyJapan } = getContent(locale);
  return (
    <section className="bg-white py-20 md:py-28">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-3 text-[0.95rem] font-medium text-teal">{c.kicker}</p>
          <h2 className="text-title">{c.title}</h2>
          <p className="mt-5 max-w-[52ch] text-lead text-slate">{c.text}</p>
          <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-lg bg-mist">
            <Image
              src="/images/equipment/scanner-controls.webp"
              alt={c.imageAlt}
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
