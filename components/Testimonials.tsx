interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Une aventure incroyable à travers les montagnes du Maroc. Des paysages époustouflants et des guides exceptionnels.",
    author: "Sarah",
    role: "Trek Haut Atlas",
  },
  {
    quote:
      "Le trekking au Maroc était une expérience inoubliable. Des vues spectaculaires et une organisation parfaite !",
    author: "Marc",
    role: "Trek Toubkal",
  },
  {
    quote:
      "Des treks magnifiques au M'Goun, guide super sympa, et une immersion totale dans la culture locale. Recommande !",
    author: "Claire",
    role: "Trek M'Goun",
  },
  {
    quote:
      "Une organisation impeccable et un guide passionné qui connaît chaque sentier par cœur. Je reviendrai sans hésiter !",
    author: "Antoine",
    role: "Trek Vallée des Roses",
  },
  {
    quote:
      "Trois jours magiques dans le désert. Les nuits sous les étoiles resteront gravées dans ma mémoire.",
    author: "Emma",
    role: "Trek Merzouga",
  },
  {
    quote:
      "Des paysages à couper le souffle et une immersion culturelle authentique. Merci pour tout !",
    author: "Sofia",
    role: "Trek Erg Chegaga",
  },
];

function TestimonialCard({ quote, author, role }: Testimonial) {
  return (
    <div className="w-[280px] md:w-[320px] lg:w-[380px] shrink-0 bg-white border border-black/5 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
      <div>
        <img
          src="/quote-svgrepo-com.svg"
          alt="Quote"
          width={36}
          height={36}
          className="mb-5 block shrink-0"
        />

        <p className="text-base text-gray-700 leading-relaxed mb-6 font-normal">
          {quote}
        </p>
      </div>

      {/* Author block: vertically stacked without avatar */}
      <div className="pt-2 text-left">
        <p className="font-bold text-sm text-[#1a1a1a]">{author}</p>
        <p className="text-xs text-gray-500 mt-1">{role}</p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const row1Testimonials = TESTIMONIALS;
  // Offset row 2 by 4 items so top and bottom rows show different cards simultaneously
  const row2Testimonials = [
    ...TESTIMONIALS.slice(4),
    ...TESTIMONIALS.slice(0, 4),
  ];

  return (
    <section className="relative w-full bg-[#FDF9F3] py-24 overflow-hidden">
      {/* Subtle edge fade gradient masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#FDF9F3] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#FDF9F3] to-transparent z-10" />

      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-16 px-4">
        <h2 className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl text-[#1a1a1a] tracking-tight">
          Ce que disent nos voyageurs
        </h2>
      </div>

      {/* Marquee Rows */}
      <div className="flex flex-col gap-6">
        {/* Row 1: Right to Left */}
        <div className="marquee-container flex overflow-hidden">
          <div className="flex gap-6 pr-6 animate-marquee-left shrink-0">
            {[...row1Testimonials, ...row1Testimonials].map((item, index) => (
              <TestimonialCard key={`row1-${index}`} {...item} />
            ))}
          </div>
        </div>

        {/* Row 2: Left to Right */}
        <div className="marquee-container flex overflow-hidden">
          <div className="flex gap-6 pr-6 animate-marquee-right shrink-0">
            {[...row2Testimonials, ...row2Testimonials].map((item, index) => (
              <TestimonialCard key={`row2-${index}`} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
