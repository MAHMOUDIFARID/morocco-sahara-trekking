import { Metadata } from "next";
import TrekCard from "@/components/TrekCard";
import { getAllTreks } from "@/lib/mdx";
import Link from "next/link";
import { TREK_REGIONS } from "@/lib/trekRegions";

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

export default function TreksPage({ searchParams }: { searchParams: { region?: string | string[] } }) {
  const allTreks = getAllTreks();
  const selectedRegion = TREK_REGIONS.find((region) => region.slug === searchParams.region);
  const treks = selectedRegion
    ? allTreks.filter((trek) => selectedRegion.regions.includes(trek.region))
    : allTreks;

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
          {selectedRegion ? selectedRegion.name : "Trouvez votre prochain trek."}
        </h1>
        <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-[#625C55]">
          {selectedRegion
            ? `${treks.length} programme${treks.length > 1 ? "s" : ""} dans cette région, guidé${treks.length > 1 ? "s" : ""} par Mohamed et son équipe.`
            : `${allTreks.length} programmes à pied ou en voiture, avec Mohamed et son équipe. Treks de 3 à 10 jours et voyages sur mesure.`}
        </p>
      </div>

      <nav aria-label="Filtrer les treks par région" className="mb-10 flex flex-wrap gap-2">
        {[{ slug: "", name: "Tous les treks" }, ...TREK_REGIONS].map((region) => {
          const active = region.slug === (selectedRegion?.slug || "");
          return (
            <Link
              key={region.slug}
              href={region.slug ? `/treks?region=${region.slug}` : "/treks"}
              aria-current={active ? "page" : undefined}
              className={`site-button border ${active ? "border-[#1C1917] bg-[#1C1917] text-white" : "border-[#1C1917]/20 text-[#1C1917]"}`}
            >
              {region.name}
            </Link>
          );
        })}
      </nav>

      {/* Programmes */}
      <div className="grid grid-cols-1 gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {treks.map((trek, index) => (
          <TrekCard key={trek.slug} {...trek} variant="editorial" priority={index < 3} />
        ))}
      </div>
    </section>
  );
}
