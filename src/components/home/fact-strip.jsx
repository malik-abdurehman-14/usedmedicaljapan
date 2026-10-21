import { Camera, ClipboardCheck, Languages, Ship } from "lucide-react";
import { Container } from "@/components/shared/container";

const facts = [
  { icon: ClipboardCheck, title: "Inspection report", text: "Written condition report for every unit" },
  { icon: Camera, title: "Photos and video", text: "Of the actual unit, before you commit" },
  { icon: Ship, title: "FOB or CIF terms", text: "Sea freight worldwide, air for smaller systems" },
  { icon: Languages, title: "English and Japanese", text: "One contact through the whole process" },
];

export function FactStrip() {
  return (
    <section aria-label="What every order includes" className="border-y border-line bg-white">
      <Container>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
          {facts.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-start gap-4 border-line py-7 max-sm:[&:nth-child(n+2)]:border-t sm:px-6 sm:[&:nth-child(2n)]:border-l sm:[&:nth-child(n+3)]:border-t lg:border-l lg:first:border-l-0 lg:first:pl-0 lg:[&:nth-child(n+3)]:border-t-0">
              <Icon className="mt-0.5 size-5 shrink-0 text-teal" aria-hidden />
              <div>
                <p className="font-medium text-ink">{title}</p>
                <p className="mt-1 text-sm text-slate">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
