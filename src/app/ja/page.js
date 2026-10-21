import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { InspectionSeal } from "@/components/shared/inspection-seal";
import { ProcessTimeline } from "@/components/shared/process-timeline";
import { ja } from "@/data/content";
import { site } from "@/data/site";

export const metadata = {
  title: "中古医療機器 買取｜MRI・CT・X線装置の買取",
  description:
    "MRI・CT・X線撮影装置・超音波診断装置など中古医療機器の買取。無料査定から撤去・搬出まで一貫対応。買い取った機器は海外の医療機関で再活用されます。",
  alternates: { canonical: "/ja", languages: { en: "/", ja: "/ja" } },
  openGraph: { locale: "ja_JP" },
};

const mailto = `mailto:${site.email}?subject=${encodeURIComponent("医療機器買取のご相談")}&body=${encodeURIComponent(
  "機種名：\n年式：\n設置場所（都道府県）：\n撤去希望時期：\nご担当者名・ご連絡先：\n"
)}`;

export default function JapanesePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-paper">
        <div className="pointer-events-none absolute inset-0 bg-measure-grid [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" aria-hidden />
        <Container className="relative grid gap-14 pb-20 pt-12 md:pt-16 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20 lg:pb-28">
          <div>
            <p className="mb-6 inline-flex items-center gap-2.5 text-[0.95rem] text-slate">
              <span className="size-2 rounded-full bg-seal" aria-hidden />
              病院・クリニック様向け 医療機器買取
            </p>
            <h1 className="text-[clamp(2rem,4vw,3.3rem)] leading-[1.25] tracking-normal">{ja.heroTitle}</h1>
            <p className="mt-7 max-w-[38em] text-lead leading-[1.9] text-slate">{ja.heroText}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href={mailto}>
                  <Mail /> 無料査定を依頼する
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={`tel:${site.phone.replace(/\s/g, "")}`}>
                  <Phone /> 電話で相談する
                </a>
              </Button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[30rem] lg:max-w-none">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-mist">
              <Image src="/images/equipment/ct-eclos.webp" alt="CT装置" fill priority sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
            </div>
            <InspectionSeal className="absolute -bottom-8 -left-4 size-28 -rotate-10 sm:-left-10" />
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid gap-10 md:grid-cols-3">
          {ja.points.map((p) => (
            <div key={p.title} className="border-t-2 border-ink pt-6">
              <h2 className="text-[1.3rem] tracking-normal">{p.title}</h2>
              <p className="mt-3 leading-[1.9] text-slate">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="paper" id="equipment">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading title="買取対象機器" description="下記以外の医療機器もご相談ください。年式が古い機器や動作に不具合がある機器も査定いたします。" />
          <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {ja.equipment.map((e) => (
              <li key={e} className="bg-white px-5 py-4 text-ink">
                {e}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="process">
        <SectionHeading title="買取の流れ" className="mb-14" />
        <ProcessTimeline steps={ja.process} />
      </Section>

      <Section tone="paper" id="company">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading title="会社概要" />
          <dl className="border-t border-line">
            {ja.company.map((r) => (
              <div key={r.label} className="grid grid-cols-[7rem_1fr] gap-6 border-b border-line py-4 sm:grid-cols-[10rem_1fr]">
                <dt className="text-slate">{r.label}</dt>
                <dd className="text-ink">{r.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <section id="contact" className="bg-ink text-white">
        <Container className="grid gap-10 py-16 md:grid-cols-[1.3fr_1fr] md:items-end md:py-20">
          <div>
            <h2 className="text-title tracking-normal text-white">まずは無料査定から</h2>
            <p className="mt-4 max-w-[36em] leading-[1.9] text-white/70">
              機種名・年式・設置場所をお知らせください。写真があれば、より正確な査定が可能です。
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Button asChild size="lg" variant="inverse">
              <a href={mailto}>
                <Mail /> メールで問い合わせ
              </a>
            </Button>
            <Button asChild size="lg" variant="outline-inverse">
              <a href={`tel:${site.phone.replace(/\s/g, "")}`}>
                <Phone /> {site.phone}
              </a>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
