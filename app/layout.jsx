import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { buildOrganizationJsonLd, metadata as siteMetadata } from "@/lib/seo";

export const metadata = siteMetadata;

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060814",
};

export default function RootLayout({ children }) {
  const jsonLd = buildOrganizationJsonLd();

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
