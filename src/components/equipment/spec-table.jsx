import { cn } from "@/lib/utils";

/** Two-column specification table. rows: [{ label, value }] */
export function SpecTable({ rows, caption, className }) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full border-collapse text-left text-[0.97rem]">
        {caption && <caption className="mb-3 text-left text-sm text-slate">{caption}</caption>}
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-t border-line last:border-b">
              <th scope="row" className="w-[40%] py-3.5 pr-6 align-top font-normal text-slate">
                {r.label}
              </th>
              <td className="py-3.5 text-ink">{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
