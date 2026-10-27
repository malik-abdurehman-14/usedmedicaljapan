import { ContactPage, contactMetadata } from "@/views/contact-page";

export const metadata = contactMetadata("en");

export default function Page() {
  return <ContactPage locale="en" />;
}
