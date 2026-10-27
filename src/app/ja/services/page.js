import { ServicesPage, servicesMetadata } from "@/views/services-page";

export const metadata = servicesMetadata("ja");

export default function Page() {
  return <ServicesPage locale="ja" />;
}
