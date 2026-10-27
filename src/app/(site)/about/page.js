import { AboutPage, aboutMetadata } from "@/views/about-page";

export const metadata = aboutMetadata("en");

export default function Page() {
  return <AboutPage locale="en" />;
}
