import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://moroccosahratrekking.com"),
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
    <html lang="fr" className={`${inter.variable} ${cormorant.variable}`}>
      <body className={`${inter.className} flex min-h-screen flex-col font-sans text-structure antialiased selection:bg-accent selection:text-canvas-pure`}>
        <TopBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
