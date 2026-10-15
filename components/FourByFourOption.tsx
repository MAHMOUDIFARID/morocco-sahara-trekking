import { Check } from "lucide-react";

export default function FourByFourOption() {
  const whatsappMessage = encodeURIComponent(
    "Bonjour Mohamed, je suis intéressé(e) par l'option 4x4 sans randonnée. Pouvez-vous m'en dire plus ?"
  );
  const whatsappUrl = `https://wa.me/212672058267?text=${whatsappMessage}`;

  const features = [
    "Aucune marche requise — vous restez confortablement assis.",
    "Chauffeur-guide local expérimenté.",
    "Pauses photo illimitées sur les plus beaux spots.",
    "Formule adaptée aux enfants et aux seniors.",
  ];

  return (
    <section className="w-full bg-[#FDF9F3] py-16 md:py-20 px-6">
      <div className="mx-auto max-w-4xl text-center">
        
        {/* Decorative 4-pointed star icon */}
        <div className="flex justify-center mb-5" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-[#1a1a1a]"
          >
            <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
          </svg>
        </div>

        {/* Headline */}
        <h2 className="font-sans font-bold text-2xl md:text-3xl lg:text-4xl text-[#1a1a1a] leading-tight mb-5">
          Vous ne pouvez pas marcher longtemps ?
        </h2>

        {/* Description */}
        <p className="font-sans text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-10">
          Pas de souci ! Nous proposons une formule en 4x4 qui vous permet de
          découvrir le désert, les dunes et les villages berbères sans effort.
          Idéal pour les familles avec enfants, les personnes âgées, ou
          simplement ceux qui préfèrent le confort.
        </p>

        {/* Feature list in grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10 text-left">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 bg-white/80 p-4 rounded-2xl border border-black/5 shadow-sm"
            >
              <div className="w-5 h-5 rounded-full bg-[#C0462F]/10 text-[#C0462F] flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
              </div>
              <span className="text-sm md:text-base text-gray-700 leading-snug">
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Button and note */}
        <div className="flex flex-col items-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#C0462F] text-white rounded-full px-8 py-4 font-medium hover:bg-[#A03524] hover:scale-105 transition-all inline-flex items-center justify-center shadow-md active:scale-95"
          >
            Demander un devis 4x4
          </a>
          <span className="text-xs text-gray-500 mt-3">
            Réponse en moins de 2h sur WhatsApp
          </span>
        </div>

      </div>
    </section>
  );
}
