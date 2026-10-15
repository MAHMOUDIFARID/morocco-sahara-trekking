import Link from "next/link";
import TrekCard from "@/components/TrekCard";
import Hero from "@/components/Hero";
import SaharaCTA from "@/components/SaharaCTA";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import AboutGuide from "@/components/AboutGuide";
import AccessibleOption from "@/components/AccessibleOption";
import WhyUs from "@/components/WhyUs";
import { ArrowRight } from "lucide-react";

const FEATURED_TREKS = [
  {
    title: "Trek de 7 jours - Vallées d'Aït Bouguemez & Aït Bououli",
    description:
      "Ce trek de 7 jours au départ de Marrakech vous emmène au cœur du Haut Atlas central, entre les vallées authentiques d'Aït Bouguemez et d'Aït Bououli.",
    duration: "7 Jours",
    difficulty: "Modéré",
    image: "/treks/trek-7-jours-vallees-ait-bouguemez-ait-bououli-1.webp",
    slug: "trek-7-jours-vallees-ait-bouguemez-ait-bououli",
  },
  {
    title: "Trek villages berbères vallée des Roses 4 jours",
    description:
      "Trekking de 4 jours au départ de Ouarzazate à travers la Vallée des Roses, les gorges d'Agouti, Amejgag et le Dadès.",
    duration: "4 Jours",
    difficulty: "Facile",
    image: "/treks/trek-villages-berberes-vallee-des-roses-4-jours-1.webp",
    slug: "trek-villages-berberes-vallee-des-roses-4-jours",
  },
  {
    title: "Trek Randonnée village Berbère Aït Bougmaz",
    description:
      "Circuit randonnée de 5 jours depuis Marrakech dans la vallée d'Aït Bouguemez : gorges d'Arous, villages berbères, traces de dinosaures...",
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

      {/* Accessible Option Section */}
      <AccessibleOption />

      {/* Why Choose Us Section */}
      <WhyUs />

      {/* Featured Treks Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-left">
          <h2 className="font-display text-3xl md:text-4xl text-[#1a1a1a] leading-tight tracking-tight">
            Nos programmes dans le Haut Atlas et le Sud marocain
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mt-4 leading-relaxed font-sans">
            Du week-end de 3 jours à la grande traversée de 10 jours, chaque itinéraire est guidé et personnalisable.
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {FEATURED_TREKS.slice(0, 3).map((trek) => (
            <TrekCard key={trek.slug} {...trek} showLink={false} />
          ))}
        </div>

        {/* Voir tous les treks button */}
        <div className="mt-12 md:mt-16 flex justify-center">
          <Link
            href="/treks"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-gray-300 text-base font-medium text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all duration-200 group"
          >
            <span>Voir tous les treks</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Testimonials Marquee Section */}
      <Testimonials />

      {/* Sahara Trekking FAQ Section */}
      <div id="about">
        <FAQ />
      </div>

      {/* Sahara Full-Image CTA */}
      <SaharaCTA />
    </div>
  );
}
