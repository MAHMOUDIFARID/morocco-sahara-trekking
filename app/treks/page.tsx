import { Metadata } from "next";
import TrekCard from "@/components/TrekCard";
import { getAllTreks } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Nos Trekks dans le Haut Atlas et le Sud marocain | Morocco Sahara Trekking",
  description:
    "17 programmes de 3 à 10 jours dans le Haut Atlas, la Vallée des Roses et le Sahara marocain, guidés par Mohamed et son équipe.",
  openGraph: {
    title: "Nos Trekks dans le Haut Atlas et le Sud marocain",
    description:
      "17 programmes de 3 à 10 jours dans le Haut Atlas, la Vallée des Roses et le Sahara marocain, guidés par Mohamed et son équipe.",
    images: ["/logo.png"],
  },
};

export default function TreksPage() {
  const treks = getAllTreks();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#C0462F] block mb-2">
          EXPÉDITIONS & PROGRAMMES
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1a1a1a] tracking-tight">
          Nos Trekks dans le Haut Atlas et le Sud marocain
        </h1>
        <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
          17 programmes de 3 à 10 jours, guidés par Mohamed et son équipe.
        </p>
      </div>

      {/* 17 Treks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {treks.map((trek, index) => (
          <TrekCard key={trek.slug} {...trek} priority={index < 3} />
        ))}
      </div>
    </div>
  );
}
