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

const siteTitle = "Trek et randonnée au Maroc | Atlas & Sahara";
const siteDescription =
  "Treks et randonnées au Maroc, des sommets de l’Atlas aux vallées berbères et aux dunes du Sahara. Des itinéraires guidés et personnalisables avec Mohamed et son équipe.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "trek maroc",
    "randonnée haut atlas",
    "trek toubkal",
    "ascension m'goun",
    "vallée des roses",
    "aït bouguemez",
    "trek sahara",
    "guide trekking maroc",
  ],
  authors: [{ name: "MOROCCO SAHARA TREKKING" }],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
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
