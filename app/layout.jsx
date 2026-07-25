import "./globals.css";

export const metadata = {
  title: "MianX.ai — AI-Powered Industry Operating Systems",
  description:
    "MianX.ai builds AI-powered Industry Operating Systems for restaurants, poultry, hospitals, schools and more. One platform, every industry.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
