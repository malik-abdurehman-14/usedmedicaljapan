import { ContactPage, contactMetadata } from "@/views/contact-page";

export const metadata = contactMetadata("ja");

export default function Page() {
  return <ContactPage locale="ja" />;
}
