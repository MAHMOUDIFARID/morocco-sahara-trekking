import { Compass, Route, UsersRound } from "lucide-react";

const REASONS = [
  {
    icon: Compass,
    title: "Un guide du pays",
    description:
      "Un guide berbère diplômé, qui connaît chaque sentier.",
  },
  {
    icon: Route,
    title: "Votre voyage, votre rythme",
    description:
      "Un itinéraire adapté à votre niveau et à vos envies.",
  },
  {
    icon: UsersRound,
    title: "En petit comité",
    description:
      "Des groupes à taille humaine pour une expérience plus personnelle.",
  },
];

export default function WhyUs() {
  return (
    <section
      aria-labelledby="why-us-title"
      className="w-full bg-[#FDF9F3] px-6 py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 xl:gap-24">
        <div>
          <h2
            id="why-us-title"
            className="max-w-[18ch] font-display text-4xl font-medium leading-[1.12] tracking-tight text-[#1C1917] md:text-5xl"
          >
            Le Maroc, avec ceux qui le connaissent
            <span className="text-[#C0462F]">.</span>
          </h2>
          <p className="mt-6 max-w-sm font-sans text-base leading-relaxed text-[#625C55] md:text-lg">
            Des rencontres authentiques, un voyage pensé pour vous.
          </p>
        </div>

        <ul className="divide-y divide-[#E4DDD4] border-y border-[#E4DDD4]">
          {REASONS.map((reason) => {
            const Icon = reason.icon;

            return (
              <li
                key={reason.title}
                className="grid gap-3 py-7 sm:grid-cols-[0.9fr_1.1fr] sm:gap-6 md:py-8"
              >
                <h3 className="flex items-start gap-3 font-display text-xl font-medium leading-snug tracking-tight text-[#1C1917]">
                  <Icon
                    aria-hidden="true"
                    focusable="false"
                    strokeWidth={1.5}
                    className="mt-0.5 h-6 w-6 shrink-0 text-[#C0462F]"
                  />
                  <span>{reason.title}</span>
                </h3>
                <p className="font-sans text-base leading-relaxed text-[#625C55]">
                  {reason.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
