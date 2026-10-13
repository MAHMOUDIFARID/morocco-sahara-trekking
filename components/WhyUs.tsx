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
        {/* Header (centered) */}
        <div className="mb-20 text-center">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#C0462F] block mb-3">
            NOTRE DIFFÉRENCE
          </span>
          <h2 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl text-[#1a1a1a] tracking-tight">
            Pourquoi nous choisir ?
          </h2>
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
