import "./globals.css";
import AmbientField from "@/components/AmbientField";

export const metadata = {
  title: "Mianx.ai — Autonomous AI agents for your business",
  description:
    "Mianx.ai designs, builds, and deploys autonomous AI agents that qualify leads, handle support, and grow revenue around the clock.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AmbientField />
        {children}
      </body>
    </html>
  );
}
