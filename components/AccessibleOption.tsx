import { ArrowUpRight } from "lucide-react";

export default function AccessibleOption() {
  const whatsappMessage = encodeURIComponent(
    "Bonjour Mohamed, je suis intéressé(e) par une formule accessible sans longue marche. Pouvez-vous m'en dire plus ?"
  );
  const whatsappUrl = `https://wa.me/212672058267?text=${whatsappMessage}`;

  return (
    <section className="w-full bg-[#0F0F0F] py-14 md:py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Sparkle icon at the top */}
        <div className="flex justify-center mb-4" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-7 h-7 text-white"
          >
            <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
          </svg>
        </div>

        {/* Headline */}
        <h2 className="font-display font-medium text-2xl md:text-3xl lg:text-4xl text-white leading-tight max-w-2xl mx-auto mb-5">
          L’aventure, à votre rythme
        </h2>

        {/* Centered subheadline */}
        <p className="font-sans text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto mb-8">
          Découvrez les paysages du Maroc avec une formule confortable, adaptée à vos envies.
        </p>

        {/* CTA */}
        <div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="site-button border border-white/25 text-white"
          >
            <span>Demander cette formule</span>
            <ArrowUpRight size={14} />
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
