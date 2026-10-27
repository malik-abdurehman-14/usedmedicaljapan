import { AboutPage, aboutMetadata } from "@/views/about-page";

export const metadata = aboutMetadata("ja");

export default function Page() {
  return <AboutPage locale="ja" />;
}
