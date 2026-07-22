import type { Metadata } from "next";
import "./globals.css";
import "./game-v2.css";

export const metadata: Metadata = {
  title: "Huaxin Zhang — AI Product Builder & Creative Technologist",
  description:
    "An interactive portfolio by Huaxin Zhang, bringing together AI product strategy, creative technology, behavioural research, and playable systems.",
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
      "AI product strategy, creative technology, behavioural research, and playable systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
