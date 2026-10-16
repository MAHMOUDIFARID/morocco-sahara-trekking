import Link from "next/link";
import TrekCard from "@/components/TrekCard";
import Hero from "@/components/Hero";
import SaharaCTA from "@/components/SaharaCTA";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import AboutGuide from "@/components/AboutGuide";
import AccessibleOption from "@/components/AccessibleOption";
import WhyUs from "@/components/WhyUs";
import TravelAlbum from "@/components/TravelAlbum";
import { ArrowRight } from "lucide-react";

const FEATURED_TREKS = [
  {
    title: "Les vallées d’Aït Bouguemez et d’Aït Bououli",
    description:
      "Marchez entre les vallées d’Aït Bouguemez et d’Aït Bououli, au cœur du Haut Atlas.",
    duration: "7 Jours",
    difficulty: "Modéré",
    image: "/treks/trek-7-jours-vallees-ait-bouguemez-ait-bououli-1.webp",
    slug: "trek-7-jours-vallees-ait-bouguemez-ait-bououli",
  },
  {
    title: "Les villages de la vallée des Roses",
    description:
      "Villages berbères, gorges d’Agouti et paysages du Dadès, au départ de Ouarzazate.",
    duration: "4 Jours",
    difficulty: "Facile",
    image: "/treks/trek-villages-berberes-vallee-des-roses-4-jours-1.webp",
    slug: "trek-villages-berberes-vallee-des-roses-4-jours",
  },
  {
    title: "Les villages berbères d’Aït Bouguemez",
    description:
      "Explorez la vallée d’Aït Bouguemez, les gorges d’Arous et les sentiers berbères.",
    duration: "5 Jours",
    difficulty: "Facile",
    image: "/treks/trek-randonnee-village-berbere-ait-bougmaz-1.webp",
    slug: "trek-randonnee-village-berbere-ait-bougmaz",
  },
];

export default function HomePage() {

  return (
    <div className="flex flex-col gap-20">
      {/* Modern Light Hero with 3 Overlapping Cards */}
      <Hero />

      {/* About The Guide Section */}
      <AboutGuide />

      {/* Why Choose Us Section */}
      <WhyUs />

      {/* Featured Treks Section */}
      <section
        id="featured-treks"
        aria-labelledby="featured-treks-title"
        className="mx-auto w-full max-w-[1248px] px-6"
      >
        {/* Section Header */}
        <div className="mb-10 flex flex-col items-start gap-6 sm:flex-row sm:justify-between md:mb-12">
          <div>
            <h2
              id="featured-treks-title"
              className="font-display text-3xl font-medium leading-tight tracking-tight text-[#1C1917] md:text-4xl lg:text-5xl"
            >
              Trouvez votre prochain trek.
            </h2>
            <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-[#625C55]">
              Des itinéraires guidés et personnalisables, au cœur de l’Atlas et du Sud marocain.
            </p>
          </div>
          <Link
            href="/treks"
            className="site-button border border-[#1C1917]/20 text-[#1C1917] sm:mt-1 lg:mt-2"
          >
            <span>Voir tous les treks</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {FEATURED_TREKS.slice(0, 3).map((trek) => (
            <TrekCard key={trek.slug} {...trek} variant="editorial" />
          ))}
        </div>
      </section>

      {/* Accessible Option Section */}
      <AccessibleOption />

      {/* Testimonials Marquee Section */}
      <Testimonials />

      {/* Sahara Trekking FAQ Section */}
      <div id="about">
        <FAQ />
      </div>

      {/* Sahara Full-Image CTA */}
      <SaharaCTA />

      {/* Travel Photo Album */}
      <TravelAlbum />
    </div>
  );
}
