/** Manufacturer / model-family table. */
export function BrandTable({ brands }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <table className="w-full border-collapse text-left text-[0.97rem]">
        <thead className="bg-paper text-sm text-slate">
          <tr>
            <th scope="col" className="px-5 py-3 font-medium">Manufacturer</th>
            <th scope="col" className="px-5 py-3 font-medium">Typical model families</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((b) => (
            <tr key={b.brand} className="border-t border-line">
              <td className="px-5 py-3.5 font-medium text-ink">{b.brand}</td>
              <td className="px-5 py-3.5 text-slate">{b.models}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
