import { HowItWorksPage, howItWorksMetadata } from "@/views/how-it-works-page";

export const metadata = howItWorksMetadata("en");

export default function Page() {
  return <HowItWorksPage locale="en" />;
}
