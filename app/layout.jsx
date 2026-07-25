import "./globals.css";

export const metadata = {
  title: "MianX.ai — AI-Powered Industry Operating Systems",
  description:
    "MianX.ai builds AI-powered Industry Operating Systems for restaurants, poultry, hospitals, schools and more. One platform, every industry.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
