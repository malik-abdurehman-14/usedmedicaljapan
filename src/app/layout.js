import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "./globals.css";
import { JsonLd } from "@/components/shared/json-ld";
import { site } from "@/data/site";

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Used Medical Equipment Japan | MRI, CT & X-Ray Export",
    template: "%s | Used Medical Equipment Japan",
  },
  description: site.description,
  applicationName: site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: "/",
    images: [{ url: "/images/equipment/mri-ge-room.webp", width: 1320, height: 988, alt: "MRI machine from Used Medical Equipment Japan" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#0e2a47",
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  legalName: "SK Global Co., Ltd.",
  url: site.url,
  description: site.description,
  email: site.email,
  telephone: site.phoneHref.replace("tel:", ""),
  logo: `${site.url}/images/logo.png`,
  foundingDate: "2015-09-16",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2F, 4-12-38 Shibaura",
    addressLocality: "Minato-ku",
    addressRegion: "Tokyo",
    postalCode: "108-0023",
    addressCountry: "JP",
  },
  areaServed: "Worldwide",
};

// Tells search engines the site's name, so results show "Used Medical Equipment Japan"
const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={organization} />
        <JsonLd data={website} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
