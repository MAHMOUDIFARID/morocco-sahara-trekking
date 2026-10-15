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
    <section
      aria-labelledby="treks-title"
      className="mx-auto w-full max-w-[1248px] px-6 py-16 md:py-20"
    >
      {/* Page Header */}
      <div className="mb-10 max-w-3xl md:mb-12">
        <h1
          id="treks-title"
          className="font-display text-4xl font-medium leading-tight tracking-tight text-[#1C1917] md:text-5xl"
        >
          Trouvez votre prochain trek.
        </h1>
        <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-[#625C55]">
          17 programmes de 3 à 10 jours, guidés par Mohamed et son équipe.
        </p>
      </div>

      {/* 17 Treks Grid */}
      <div className="grid grid-cols-1 gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {treks.map((trek, index) => (
          <TrekCard key={trek.slug} {...trek} variant="editorial" priority={index < 3} />
        ))}
      </div>
    </section>
  );
}
