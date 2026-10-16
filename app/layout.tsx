import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import { SITE_URL } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",
});

const clashGrotesk = localFont({
  src: "../public/fonts/WEB/fonts/ClashGrotesk-Variable.woff2",
  weight: "200 700",
  style: "normal",
  display: "swap",
  variable: "--font-clash-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "MOROCCO SAHARA TREKKING — Trekks dans le Désert Marocain",
  description:
    "Découvrez des randonnées chamelières et des expéditions authentiques dans le Sahara marocain à Merzouga, Erg Chebbi, Erg Chegaga, Zagora et M'hamid. Guidé par des nomades Amazighs autochtones.",
  keywords: [
    "trek désert maroc",
    "randonnée chamelière sahara",
    "dunes merzouga",
    "expédition erg chegaga",
    "circuit désert zagora",
    "trek nomade m'hamid",
    "guide trekking maroc",
  ],
  authors: [{ name: "MOROCCO SAHARA TREKKING" }],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "MOROCCO SAHARA TREKKING | Expéditions & Randonnées Chamelières dans le Désert",
    description:
      "Trekking authentique dans le désert à Merzouga, Erg Chebbi, Erg Chegaga, Zagora et M'hamid.",
    type: "website",
    locale: "fr_FR",
    siteName: "MOROCCO SAHARA TREKKING",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${clashGrotesk.variable}`}>
      <body className={`${inter.className} flex min-h-screen flex-col font-sans text-structure antialiased selection:bg-accent selection:text-canvas-pure`}>
        <TopBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
