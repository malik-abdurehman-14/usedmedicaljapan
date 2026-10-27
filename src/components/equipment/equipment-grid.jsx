import { EquipmentTile } from "./equipment-tile";

/** Mosaic: two flagship modalities large, the rest in a regular grid. */
export function EquipmentGrid({ items, locale = "en" }) {
  const featured = items.filter((i) => i.featured);
  const rest = items.filter((i) => !i.featured);
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        {featured.map((item) => (
          <EquipmentTile key={item.slug} item={item} locale={locale} size="large" />
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {rest.slice(0, 4).map((item) => (
          <EquipmentTile key={item.slug} item={item} locale={locale} />
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {rest.slice(4).map((item) => (
          <EquipmentTile key={item.slug} item={item} locale={locale} />
        ))}
      </div>
    </div>
  );
}
