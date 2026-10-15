function HandDrawnMountain({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6 38 Q10 24 18 14 Q19 12 20 14 L28 26 Q29 27 30 26 L34 20 Q35 18 36 20 L43 38"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 39 Q24 37 43 39"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HandDrawnCompass({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M24 6 Q38 6 41 22 Q44 38 26 42 Q8 46 6 28 Q4 12 22 6 Q24 5 24 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 30 L24 18 L30 30 L24 24 Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HandDrawnUsers({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle
        cx="18"
        cy="14"
        r="4"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M12 36 Q12 24 18 24 Q24 24 24 36"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle
        cx="32"
        cy="16"
        r="3.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M27 36 Q27 26 32 26 Q37 26 37 36"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const REASONS = [
  {
    number: "01",
    icon: HandDrawnMountain,
    title: "Guide certifié",
    description:
      "Un guide berbère diplômé qui connaît chaque sentier par cœur.",
  },
  {
    number: "02",
    icon: HandDrawnCompass,
    title: "Sur-mesure",
    description:
      "Chaque trek adapté à votre niveau, votre rythme et vos envies.",
  },
  {
    number: "03",
    icon: HandDrawnUsers,
    title: "Petits groupes",
    description:
      "Maximum 8 voyageurs pour une expérience intime et authentique.",
  },
];

export default function WhyUs() {
  return (
    <section className="w-full bg-[#FDF9F3] py-24 px-6 overflow-hidden">
      <div className="mx-auto max-w-[1200px]">
        {/* Redesigned Header (centered editorial style) */}
        <div className="relative max-w-3xl mx-auto text-center mb-16 px-4">
          {/* Decorative dashed curved line */}
          <svg
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen max-w-[1400px] h-[180px] pointer-events-none -z-10 hidden sm:block opacity-75"
            viewBox="0 0 1200 200"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 0 100 Q 300 30 600 100 T 1200 100"
              stroke="#C0462F"
              strokeOpacity="0.25"
              strokeWidth="2"
              strokeDasharray="6 8"
            />
          </svg>

          {/* Playful Map Pin Sticker on the right */}
          <div
            className="absolute -right-4 lg:-right-10 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none select-none"
            aria-hidden="true"
          >
            <svg
              width="56"
              height="64"
              viewBox="0 0 60 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-12 drop-shadow-md"
            >
              {/* Blue puddle shadow */}
              <ellipse
                cx="30"
                cy="62"
                rx="22"
                ry="7"
                fill="#0091FF"
                stroke="#1C1917"
                strokeWidth="2.5"
              />
              {/* Pin body */}
              <path
                d="M30 58 C30 58 12 36 12 24 C12 14.0589 20.0589 6 30 6 C39.9411 6 48 14.0589 48 24 C48 36 30 58 30 58 Z"
                fill="#F5C342"
                stroke="#1C1917"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              {/* Pin inner circle */}
              <circle
                cx="30"
                cy="24"
                r="6"
                fill="#FDF9F3"
                stroke="#1C1917"
                strokeWidth="2.5"
              />
            </svg>
          </div>

          {/* Eyebrow text */}
          <span className="font-sans font-medium text-xs md:text-sm uppercase tracking-widest text-[#C0462F] block mb-4">
            NOTRE DIFFÉRENCE
          </span>

          {/* Fraunces Headline */}
          <h2 className="font-serif font-medium text-3xl md:text-4xl lg:text-5xl text-[#1a1a1a] leading-tight max-w-2xl mx-auto mb-6">
            Pourquoi nous{" "}
            <span className="relative inline-block">
              choisir ?
              {/* Playful doodle rays above the word */}
              <svg
                className="absolute -top-4 -right-7 w-6 h-6 text-[#1a1a1a]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="12" y1="3" x2="12" y2="7" />
                <line x1="19" y1="5" x2="16" y2="9" />
                <line x1="21" y1="12" x2="17" y2="12" />
              </svg>
            </span>
          </h2>

          {/* Description */}
          <p className="font-sans text-sm md:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
            Découvrez comment Morocco Sahara Trekking vous offre une expérience unique —
            guides locaux certifiés, itinéraires sur-mesure et petits groupes pour une
            immersion authentique.
          </p>
        </div>

        {/* Grid (3 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {REASONS.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.number} className="relative text-left">
                {/* Big Editorial Number Behind */}
                <span
                  aria-hidden="true"
                  className="absolute -top-10 -left-2 text-[120px] md:text-[160px] font-bold text-[#C0462F]/10 leading-none select-none pointer-events-none z-0 tracking-tighter"
                >
                  {item.number}
                </span>

                {/* Content Over Number */}
                <div className="relative z-10 pt-12 sm:pt-14">
                  {/* Icon */}
                  <div className="mb-4 inline-flex items-center justify-center text-[#C0462F]">
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="font-sans font-bold text-xl md:text-2xl text-[#1a1a1a]">
                    {item.title}
                  </h3>

                  {/* Terracotta Accent Line */}
                  <div className="w-12 h-1 bg-[#C0462F] rounded-full my-4" />

                  {/* Description */}
                  <p className="font-sans text-base text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
