import type { Metadata } from "next";
import { LocaleBootstrap } from "@/components/accessibility/LocaleBootstrap";
import "./globals.css";
import "./game-v2.css";

export const metadata: Metadata = {
  title: "Huaxin Zhang — Game Designer × AI Product Builder",
  description:
    "Huaxin Zhang's interactive portfolio: game systems, narrative design, multi-agent AI products, and working prototypes.",
  keywords: [
    "Huaxin Zhang",
    "interactive portfolio",
    "Resonance Archive",
    "AI",
    "creative technology",
    "Phaser",
  ],
  openGraph: {
    title: "Huaxin Zhang — Interactive Portfolio",
    description:
      "Game systems, narrative design, multi-agent AI products, and working prototypes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body><LocaleBootstrap />{children}</body>
    </html>
  );
}
