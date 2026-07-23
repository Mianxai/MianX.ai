import "./globals.css";
import AmbientField from "@/components/AmbientField";

export const metadata = {
  title: "Mianx.ai — The AI-Native Business Operating System",
  description:
    "Mianx.ai is an AI-native Business Operating System, AI Workforce platform, and Project Factory — Mianx Core, an AI runtime, and a Founder Workspace that turn ideas into running products.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05060a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <AmbientField />
        {children}
      </body>
    </html>
  );
}
