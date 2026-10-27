import { EquipmentPage, equipmentMetadata } from "@/views/equipment-page";

export const metadata = equipmentMetadata("en");

export default function Page() {
  return <EquipmentPage locale="en" />;
}
