import Image from "next/image";
import {
  Archive,
  Boxes,
  Building2,
  Check,
  Clock,
  FileClock,
  Globe2,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Truck,
  Warehouse,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { InspectionSeal } from "@/components/shared/inspection-seal";
import { AboutSections } from "@/views/about-page";
import { getSite } from "@/data/site";

// The Japanese site is a single page for hospitals and clinics in Japan that want to sell
// (or dispose of) used equipment. Buyers abroad use the English site.

export const jaLandingMetadata = {
  title: { absolute: "中古医療機器の買取｜MRI・CT・X線装置 | Used Medical Equipment Japan" },
  description:
    "MRI・CT・X線装置・超音波診断装置・内視鏡システムなど、日本国内の中古医療機器を買い取ります。機器の入替、移転、閉院、リース終了時の撤去・搬出もご相談ください。",
  alternates: { canonical: "/ja" },
};

const situations = [
  { icon: RefreshCw, text: "機器の入替を予定している" },
  { icon: Truck, text: "病院・クリニックを移転する" },
  { icon: Building2, text: "閉院・統合・施設変更を予定している" },
  { icon: FileClock, text: "リースが終了した機器がある" },
  { icon: Archive, text: "現在使用していない機器がある" },
  { icon: Boxes, text: "複数台の医療機器をまとめて売却・撤去したい" },
];

const wantedEquipment = [
  "MRI装置",
  "CT装置",
  "X線撮影装置・移動型X線装置",
  "Cアーム・外科用X線装置",
  "血管撮影装置・アンギオ",
  "マンモグラフィ",
  "超音波診断装置",
  "内視鏡システム",
  "眼科医療機器",
  "手術室関連機器",
  "生体情報モニター",
  "臨床検査・検査室機器",
  "歯科医療機器",
  "麻酔器・滅菌器",
  "病院用ベッド・ストレッチャー",
  "リハビリテーション関連機器",
];

const mailBody =
  "メーカー：\n機種：\n年式：\n製造番号：\n設置場所：\n動作状況：\n付属品：\n搬出希望時期：\nご担当者名・ご連絡先：\n\n※写真がございましたら添付してください。\n";

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
              日本国内の医療機器売主様へ
            </p>
            <h1 className="text-[clamp(1.9rem,4vw,3.3rem)]">中古医療機器を、適正価格で買い取ります。</h1>
            <p className="mt-7 max-w-[38em] text-lead text-slate">
              海外販売を前提として、日本国内の中古医療機器を探しています。病院、医療機器販売会社、リース関連会社、クリニック、その他不要となった医療機器をお持ちの法人様からのご相談を歓迎します。
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

      <Section id="situations" className="py-16 md:py-24">
        <SectionHeading kicker="ご相談の例" title="このような機器がございましたらご相談ください" className="mb-10 max-w-3xl" />
        <ul className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3">
          {situations.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="flex flex-col gap-3 rounded-lg border border-line bg-white p-4 sm:flex-row sm:items-center sm:gap-4 md:p-5"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-md bg-teal-tint text-teal md:size-11">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="min-w-0 text-[0.95rem] font-medium leading-relaxed text-ink [overflow-wrap:anywhere] md:text-base">{text}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="paper" id="equipment" className="py-16 md:py-24">
        <SectionHeading kicker="取扱機器" title="取扱・調達を希望する主な機器" className="mb-10" />
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3 lg:grid-cols-4">
          {wantedEquipment.map((name) => (
            <li key={name} className="flex items-start gap-2.5 bg-white p-4 text-[0.95rem] text-ink md:p-5 md:text-base">
              <Check className="mt-[0.3em] size-4 shrink-0 text-teal" aria-hidden />
              <span className="min-w-0 [overflow-wrap:anywhere]">{name}</span>
            </li>
          ))}
          <li className="col-span-full flex items-start gap-2.5 bg-teal-tint p-4 text-[0.95rem] font-medium text-ink md:p-5 md:text-base">
            <Check className="mt-[0.3em] size-4 shrink-0 text-teal" aria-hidden />
            その他、海外で再利用可能な中古医療機器
          </li>
        </ul>
      </Section>

      <Section className="py-16 md:py-24">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-ink p-6 text-white md:p-9">
            <Warehouse className="size-8 text-teal-tint" aria-hidden />
            <h2 className="mt-5 text-subtitle text-white">搬出・解体について</h2>
            <p className="mt-4 leading-relaxed text-white/80">
              MRI・CT・X線装置などの大型医療機器については、必要に応じて医療機器の撤去実績を持つ日本国内の専門業者と連携し、撤去・解体・梱包・輸送を調整します。
            </p>
          </div>
          <div className="rounded-lg border border-teal/25 bg-teal-tint p-6 md:p-9">
            <Globe2 className="size-8 text-teal" aria-hidden />
            <h2 className="mt-5 text-subtitle">海外での再利用を目的としています</h2>
            <p className="mt-4 leading-relaxed text-ink/85">
              ご不要になった医療機器を、海外の病院・クリニック・医療機器販売会社などで再利用できる可能性があります。まずはお気軽にご相談ください。
            </p>
          </div>
        </div>
      </Section>

      <AboutSections locale="ja" withTitle />

      <section id="contact" className="bg-ink text-white">
        <Container className="grid gap-12 py-16 md:py-24 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div>
            <h2 className="text-title text-white">まずは無料査定から</h2>
            <h3 className="mt-8 text-[1.1rem] text-white">お問い合わせ時にお知らせいただきたい内容</h3>
            <p className="mt-3 max-w-[36em] text-white/75">
              可能であれば、メーカー、機種、年式、製造番号、設置場所、動作状況、写真、付属品、搬出希望時期などをお知らせください。
            </p>
            <p className="mt-3 text-sm text-white/55">メールでのご依頼には、上記の項目があらかじめ入力されます。</p>
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
