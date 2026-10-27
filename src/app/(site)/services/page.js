import { ServicesPage, servicesMetadata } from "@/views/services-page";

export const metadata = servicesMetadata("en");

export default function Page() {
  return <ServicesPage locale="en" />;
}
