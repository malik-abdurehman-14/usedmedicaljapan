import { Activity, Info, ScanLine, Stethoscope, Syringe } from "lucide-react";
import { equipmentRange } from "@/data/equipment-range";

const icons = { imaging: ScanLine, surgical: Syringe, monitoring: Activity, other: Stethoscope };

/** Every equipment type we source, by group, listed by name. */
export function EquipmentRange() {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {equipmentRange.groups.map((g) => {
          const Icon = icons[g.id];
          return (
            <div key={g.id} className="flex flex-col rounded-lg border border-line bg-white p-5 md:p-6">
              <div className="flex items-center gap-3 border-b border-line pb-4 xl:min-h-[4.75rem]">
                <span className="grid size-10 shrink-0 place-items-center rounded-md bg-teal-tint text-teal">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[1.08rem] leading-snug">{g.title}</h3>
                  <p className="text-sm text-slate">{g.items.length} equipment types</p>
                </div>
              </div>
              <ul className="mt-3 grid gap-x-6 sm:max-md:grid-cols-2">
                {g.items.map((item) => (
                  <li key={item.name} className="flex items-start gap-2.5 py-1.5 text-[0.95rem] text-ink/85">
                    <span className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-teal" aria-hidden />
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <p className="mt-6 flex items-start gap-3 text-[0.95rem] text-slate">
        <Info className="mt-0.5 size-5 shrink-0 text-teal" aria-hidden />
        <span>
          <span className="font-medium text-ink">Note:</span> {equipmentRange.note}
        </span>
      </p>
    </div>
  );
}
