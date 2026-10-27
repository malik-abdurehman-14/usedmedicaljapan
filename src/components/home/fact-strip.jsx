import { Camera, ClipboardCheck, Languages, Ship } from "lucide-react";
import { Container } from "@/components/shared/container";

const icons = [ClipboardCheck, Camera, Ship, Languages];

const copy = {
  en: {
    label: "What every order includes",
    facts: [
      { title: "Inspection report", text: "Written condition report for every unit" },
      { title: "Photos and video", text: "Of the actual unit, before you commit" },
      { title: "FOB or CIF terms", text: "Sea freight worldwide, air for smaller systems" },
      { title: "English and Japanese", text: "One contact through the whole process" },
    ],
  },
  ja: {
    label: "すべてのご注文に含まれるもの",
    facts: [
      { title: "検査報告書", text: "すべての機器について状態報告書を作成" },
      { title: "写真・動画", text: "ご契約前に実機の写真・動画をご確認" },
      { title: "FOB・CIF条件", text: "世界各国へ海上輸送、小型機器は航空輸送も" },
      { title: "英語・日本語対応", text: "一人の担当者が最後まで対応" },
    ],
  },
};

export function FactStrip({ locale = "en" }) {
  const c = copy[locale];
  return (
    <section aria-label={c.label} className="border-y border-line bg-white">
      <Container>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
          {c.facts.map(({ title, text }, i) => {
            const Icon = icons[i];
            return (
            <li key={title} className="flex items-start gap-4 border-line py-7 max-sm:[&:nth-child(n+2)]:border-t sm:px-6 sm:[&:nth-child(2n)]:border-l sm:[&:nth-child(n+3)]:border-t lg:border-l lg:first:border-l-0 lg:first:pl-0 lg:[&:nth-child(n+3)]:border-t-0">
              <Icon className="mt-0.5 size-5 shrink-0 text-teal" aria-hidden />
              <div>
                <p className="font-medium text-ink">{title}</p>
                <p className="mt-1 text-sm text-slate">{text}</p>
              </div>
            </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
