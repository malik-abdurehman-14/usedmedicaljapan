import { EquipmentPage, equipmentMetadata } from "@/views/equipment-page";

export const metadata = equipmentMetadata("ja");

export default function Page() {
  return <EquipmentPage locale="ja" />;
}
