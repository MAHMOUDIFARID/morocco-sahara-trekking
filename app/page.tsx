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
import { getFeaturedTreks } from "@/lib/mdx";

export default function HomePage() {
  const featuredTreks = getFeaturedTreks().slice(0, 3);

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
          {featuredTreks.map((trek) => (
            <TrekCard key={trek.slug} trek={trek} variant="editorial" />
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
