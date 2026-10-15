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
    <section className="w-full bg-[#FDF9F3] py-20 md:py-24 px-6">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN — Image */}
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg bg-gray-100">
            <img
              src="/images/4x4-option.jpg"
              alt="Circuit et excursion 4x4 dans le désert marocain"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* RIGHT COLUMN — Content */}
          <div className="flex flex-col items-start text-left">
            {/* Small pill badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDE8DC] text-[#C0462F] text-xs font-semibold uppercase tracking-widest mb-5">
              <span>•</span>
              <span>OPTION ACCESSIBLE</span>
            </div>

            {/* Headline */}
            <h2 className="font-sans font-bold text-2xl md:text-3xl lg:text-4xl text-[#1a1a1a] leading-tight mb-5">
              Vous ne pouvez pas marcher longtemps ?
            </h2>

            {/* Description */}
            <p className="font-sans text-base text-gray-600 leading-relaxed mb-8">
              Pas de souci ! Nous proposons une formule en 4x4 qui vous permet de
              découvrir le désert, les dunes et les villages berbères sans effort.
              Idéal pour les familles avec enfants, les personnes âgées, ou
              simplement ceux qui préfèrent le confort.
            </p>

            {/* Feature list */}
            <ul className="w-full space-y-3.5 mb-8">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#C0462F]/10 text-[#C0462F] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm md:text-base text-gray-700 leading-snug">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA Button and note */}
            <div className="flex flex-col items-start">
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

        </div>
      </div>
    </section>
  );
}
