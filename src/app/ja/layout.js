import "@fontsource/ibm-plex-sans-jp/400.css";
import "@fontsource/ibm-plex-sans-jp/500.css";
import "@fontsource/ibm-plex-sans-jp/700.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";

export const metadata = {
  title: {
    default: "日本の中古医療機器｜MRI・CT・X線装置の輸出 | Used Medical Japan",
    template: "%s | Used Medical Japan",
  },
  openGraph: { locale: "ja_JP" },
};

export default function JaLayout({ children }) {
  return (
    <div lang="ja" className="[word-break:auto-phrase]">
      <SiteHeader locale="ja" />
      <main id="main">{children}</main>
      <SiteFooter locale="ja" />
      <WhatsAppButton locale="ja" />
    </div>
  );
}
