import "./globals.css";

export const metadata = {
  title: "MianX.ai — AI-Powered Industry Operating Systems",
  description:
    "MianX.ai builds AI-powered Industry Operating Systems for restaurants, poultry, hospitals, schools and more. One platform, every industry.",
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
