import { ArrowUpRight } from "lucide-react";
import TitleDecor from "./TitleDecor";

export default function AccessibleOption() {
  const whatsappMessage = encodeURIComponent(
    "Bonjour Mohamed, je suis intéressé(e) par une formule accessible sans longue marche. Pouvez-vous m'en dire plus ?"
  );
  const whatsappUrl = `https://wa.me/212672058267?text=${whatsappMessage}`;

  return (
    <section className="w-full bg-[#0F0F0F] py-14 md:py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Sparkle icon at the top */}
        <div className="flex justify-center mb-3" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-7 h-7 text-white"
          >
            <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
          </svg>
        </div>

        {/* Decorative Marks */}
        <TitleDecor color="text-white/80" className="mb-4" />

        {/* Big bold headline */}
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white leading-tight max-w-2xl mx-auto mb-5">
          Vous ne pouvez pas marcher longtemps ?
        </h2>

        {/* Centered subheadline */}
        <p className="font-sans text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto mb-8">
          Pas de souci ! Nous proposons une formule confortable et accessible qui vous permet de
          découvrir le désert, les dunes et les villages berbères sans effort.
          Idéal pour les familles avec enfants, les personnes âgées, ou
          simplement ceux qui préfèrent le confort.
        </p>

        {/* Link-style underlined CTA */}
        <div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-base md:text-lg font-medium text-white border-b border-white/70 pb-1 hover:text-[#C0462F] hover:border-[#C0462F] transition-colors duration-200"
          >
            <span>Contacter Mohamed</span>
            <ArrowUpRight size={18} className="mt-0.5" />
          </a>
        </div>

        {/* Small note below CTA */}
        <p className="font-sans text-xs md:text-sm text-gray-500 mt-3">
          Réponse en moins de 2h sur WhatsApp
        </p>
      </div>
    </section>
  );
}
