import Image from "next/image";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { InspectionSeal } from "@/components/shared/inspection-seal";
import { AboutSections } from "@/views/about-page";
import { getSite } from "@/data/site";

// The Japanese site is a single page for hospitals and clinics in Japan that want to sell
// (or dispose of) used equipment. Buyers abroad use the English site.

export const jaLandingMetadata = {
  title: { absolute: "中古医療機器の買取｜MRI・CT・X線装置 | Used Medical Equipment Japan" },
  description:
    "MRI・CT・X線撮影装置・超音波診断装置など、使用済み医療機器の買取。無料査定から撤去・搬出まで一貫対応し、買い取った機器は海外の医療機関で再活用されます。",
  alternates: { canonical: "/ja" },
};

const points = [
  { title: "無料査定", text: "機種・年式・使用状況をお知らせいただければ、無料でお見積りいたします。" },
  { title: "撤去・搬出まで対応", text: "専門技術者が解体・梱包・搬出まで行い、院内のご負担を最小限にします。" },
  { title: "古い機器もご相談ください", text: "年式が古い機器や、動作に不具合がある機器も査定いたします。" },
  { title: "海外で再活用", text: "買い取った機器は、医療機器を必要とする海外の医療機関で再び活用されます。" },
];

const mailBody = "機種名：\n年式：\n設置場所（都道府県）：\n撤去希望時期：\nご担当者名・ご連絡先：\n";

export function JaLandingPage() {
  const site = getSite("ja");
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("医療機器買取のご相談")}&body=${encodeURIComponent(mailBody)}`;

  return (
    <>
      <section className="relative overflow-hidden bg-paper">
        <div
          className="pointer-events-none absolute inset-0 bg-measure-grid [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
          aria-hidden
        />
        <Container className="relative grid gap-14 pb-20 pt-12 md:pt-16 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20 lg:pb-28">
          <div>
            <p className="mb-6 inline-flex items-center gap-2.5 text-[0.95rem] text-slate">
              <span className="size-2 rounded-full bg-seal" aria-hidden />
              病院・クリニック様向け 医療機器買取
            </p>
            <h1 className="text-[clamp(1.9rem,4vw,3.3rem)]">使用済み医療機器を、適正価格で買い取ります。</h1>
            <p className="mt-7 max-w-[38em] text-lead text-slate">
              MRI・CT・X線装置などの更新や廃棄をご検討中の病院・クリニック様へ。査定から撤去・搬出まで一貫して対応し、機器を海外の医療機関で再活用します。
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href="#contact">
                  <Mail /> 無料査定を依頼する
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={site.phoneHref}>
                  <Phone /> 電話で相談する
                </a>
              </Button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[30rem] lg:max-w-none">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-mist">
              <Image
                src="/images/equipment/ct-eclos.webp"
                alt="病院に設置されたCT装置"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
            <InspectionSeal label="日本で検品済み" className="absolute -bottom-8 left-2 size-24 -rotate-10 sm:-left-10 sm:size-28" />
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((p) => (
            <div key={p.title} className="border-t-2 border-ink pt-6">
              <h2 className="text-[1.25rem]">{p.title}</h2>
              <p className="mt-3 text-slate">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <AboutSections locale="ja" withTitle />

      <section id="contact" className="bg-ink text-white">
        <Container className="grid gap-12 py-16 md:py-24 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div>
            <h2 className="text-title text-white">まずは無料査定から</h2>
            <p className="mt-5 max-w-[36em] text-lead text-white/70">
              機種名・年式・設置場所をお知らせください。写真があれば、より正確な査定が可能です。メールには必要な項目があらかじめ入力されます。
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="inverse">
                <a href={mailto}>
                  <Mail /> メールで査定を依頼する
                </a>
              </Button>
              <Button asChild size="lg" variant="outline-inverse">
                <a href={site.phoneHref}>
                  <Phone /> {site.phone}
                </a>
              </Button>
            </div>
          </div>
          <dl className="space-y-6 self-end text-[0.97rem]">
            {[
              { icon: Phone, label: "電話", value: site.phone, href: site.phoneHref },
              { icon: Mail, label: "メール", value: site.email, href: `mailto:${site.email}` },
              { icon: Clock, label: "営業時間", value: site.hours },
              { icon: MapPin, label: "所在地", value: site.address },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <Icon className="mt-1 size-5 shrink-0 text-teal-tint" aria-hidden />
                <div className="min-w-0">
                  <dt className="text-white/60">{label}</dt>
                  <dd className="break-words text-white">
                    {href ? (
                      <a href={href} className="hover:underline">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </Container>
      </section>
    </>
  );
}
