export default function FourByFourOption() {
  const whatsappMessage = encodeURIComponent(
    "Bonjour Mohamed, je souhaite demander un devis gratuit pour un itinéraire sur-mesure au départ de Marrakech."
  );
  const whatsappUrl = `https://wa.me/212672058267?text=${whatsappMessage}`;

  return (
    <section className="w-full bg-[#161513] py-20 md:py-24 px-6 text-white">
      <div className="mx-auto max-w-4xl flex flex-col items-center text-center">
        {/* Star Sparkle Icon (4-pointed concave) */}
        <div className="mb-6 flex items-center justify-center text-white" aria-hidden="true">
          <svg
            className="w-6 h-6 fill-current text-white"
            viewBox="0 0 24 24"
          >
            <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
          </svg>
        </div>

        {/* Headline */}
        <h2 className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[40px] text-white leading-tight tracking-tight max-w-3xl mb-4 sm:mb-5">
          Besoin d&apos;un itinéraire sur-mesure au départ de Marrakech ?
        </h2>

        {/* Subtitle / Description */}
        <p className="font-sans text-sm sm:text-base md:text-[17px] text-gray-300 max-w-2xl leading-relaxed mb-8 sm:mb-10">
          Indiquez-nous vos dates de séjour à Marrakech, vos envies et votre rythme.
          Notre équipe basée à Kalaat M&apos;Gouna vous répond sous 24h avec un devis
          détaillé sans engagement.
        </p>

        {/* Underlined CTA Link */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans font-medium text-base sm:text-lg text-white underline underline-offset-8 decoration-1 decoration-white/70 hover:decoration-white hover:text-white/90 transition-all cursor-pointer"
        >
          Demander mon devis gratuit
        </a>
      </div>
    </section>
  );
}
