import { HomePage, homeMetadata } from "@/views/home-page";

export const metadata = homeMetadata("ja");

export default function Page() {
  return <HomePage locale="ja" />;
}
