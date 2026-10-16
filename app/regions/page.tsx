import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TREK_REGIONS } from "@/lib/trekRegions";

export const metadata: Metadata = {
  title: "Régions de Randonnée | Morocco Sahara Trekking",
  description:
    "Découvrez les régions du Maroc explorées lors de nos treks : Haut Atlas central, Vallée des Roses, Massif du Siroua, Djebel Saghro et les dunes du Sahara.",
};

export default function RegionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-14 text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#C0462F] block mb-2">
          DESTINATIONS & PAYSAGES
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1a1a1a] tracking-tight">
          Nos Régions de Trekking
        </h1>
        <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed">
          Du toit de l&apos;Afrique du Nord aux immensités du désert marocain.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {TREK_REGIONS.map((region) => (
          <div
            key={region.name}
            className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <span className="text-xs uppercase font-medium text-[#C0462F] tracking-wider block mb-1">
                {region.subtitle}
              </span>
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">{region.name}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{region.description}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100">
              <Link
                href={`/treks?region=${region.slug}`}
                className="site-button border border-[#1a1a1a]/20 text-[#1a1a1a]"
              >
                <span>Voir les treks associés</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
