import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mianx.ai — AI Agents Agency | Autonomous AI Workforce",
  description:
    "Mianx.ai is the world's most trusted AI-native enterprise platform. Build, operate, and scale businesses through autonomous AI workforces under human leadership.",
  keywords: [
    "Mianx.ai",
    "AI Agency",
    "AI Agents",
    "Autonomous AI Workforce",
    "Lead Generation",
    "AI Dashboard",
    "Enterprise AI",
  ],
  authors: [{ name: "Mianx.ai" }],
  openGraph: {
    title: "Mianx.ai — AI Agents Agency",
    description:
      "Autonomous AI workforces that capture leads, analyze data, and drive business growth.",
    siteName: "Mianx.ai",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground noise-overlay`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
