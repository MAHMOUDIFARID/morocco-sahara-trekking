import { Metadata } from "next";
import { Suspense } from "react";
import { getAllTreks } from "@/lib/mdx";
import TrekCatalogue, { TrekCatalogueContent } from "@/components/TrekCatalogue";

export const metadata: Metadata = {
  alternates: { canonical: "/treks" },
  title: "Nos Trekks dans le Haut Atlas et le Sud marocain | Morocco Sahara Trekking",
  description:
    "Treks de 3 à 10 jours et voyages en voiture sur mesure dans l’Atlas, les vallées et le Sahara marocain, avec Mohamed et son équipe.",
  openGraph: {
    title: "Nos Trekks dans le Haut Atlas et le Sud marocain",
    description:
      "Treks de 3 à 10 jours et voyages en voiture sur mesure dans l’Atlas, les vallées et le Sahara marocain, avec Mohamed et son équipe.",
    images: ["/logo.png"],
  },
};

export default function TreksPage() {
  const treks = getAllTreks().map(({ content, ...trek }) => trek);
  return (
    <Suspense fallback={<TrekCatalogueContent allTreks={treks} />}>
      <TrekCatalogue treks={treks} />
    </Suspense>
  );
}
