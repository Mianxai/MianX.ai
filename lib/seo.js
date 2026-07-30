import { getSiteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "MianX.ai",
    "Industry Operating Systems",
    "AI platform",
    "RestaurantOS",
    "PoultryOS",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: ["/twitter-image"],
  },
  // Authoritative icons only — App Router app/favicon.ico / app/icon.png files
  // are intentionally absent so Next does not emit duplicate /favicon.ico links.
  // Versioned public/brand paths bust aggressive browser favicon caches.
  icons: {
    icon: [
      { url: "/brand/mx-favicon-v2.ico", sizes: "any" },
      {
        url: "/brand/mx-icon-v2.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: [
      {
        url: "/brand/mx-apple-touch-v2.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  // themeColor lives in app/layout.jsx `export const viewport` only.
  // Do not set metadata.themeColor — Next.js 15 warns and ignores it.
};

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: SITE_NAME,
        url: siteUrl,
        logo: `${siteUrl}/brand/mx-icon-v2.png`,
        description: SITE_DESCRIPTION,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "en",
      },
    ],
  };
}
