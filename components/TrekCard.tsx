import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Car } from "lucide-react";
import { Trek } from "@/types";
import { getBlurData } from "@/lib/blurData";
import { getDurationLabel } from "@/lib/trekPresentation";

export interface TrekCardProps {
  trek?: Trek;
  title?: string;
  description?: string;
  duration?: string | number;
  activityType?: Trek["activityType"];
  difficulty?: "Facile" | "Modéré" | "Difficile" | "Easy" | "Moderate" | "Hard" | string;
  image?: string;
  images?: string[];
  slug?: string;
  showLink?: boolean;
  priority?: boolean;
  variant?: "default" | "editorial";
}

export default function TrekCard(props: TrekCardProps) {
  const trek = props.trek;
  const title = props.title || trek?.title || "";
  const description = props.description || trek?.description || "";
  const slug = props.slug || trek?.slug || "";
  const showLink = props.showLink !== undefined ? props.showLink : true;
  const isVehicle = (props.activityType || trek?.activityType) === "vehicle";

  // Duration
  const rawDuration = props.duration !== undefined ? props.duration : trek?.duration;
  const durationText = getDurationLabel(rawDuration ?? 1);

  // Difficulty (Facile -> green, Modéré -> yellow, Difficile -> red)
  const rawDifficulty = props.difficulty || trek?.difficulty || "Facile";
  const normalizedDifficulty = rawDifficulty.toLowerCase();

  let difficultyLabel = "Facile";
  let difficultyColor = "bg-green-500";
  let filledBars = 1;

  if (
    normalizedDifficulty.includes("mod") ||
    normalizedDifficulty === "moderate"
  ) {
    difficultyLabel = "Modéré";
    difficultyColor = "bg-yellow-500";
    filledBars = 2;
  } else if (
    normalizedDifficulty.includes("diff") ||
    normalizedDifficulty === "hard"
  ) {
    difficultyLabel = "Difficile";
    difficultyColor = "bg-red-500";
    filledBars = 3;
  }

  // Image
  const image =
    props.image ||
    (props.images && props.images.length > 0 ? props.images[0] : null) ||
    (trek?.images && trek.images.length > 0 ? trek.images[0] : null) ||
    "/place1.jpg";

  if (props.variant === "editorial") {
    return (
      <article className="h-full">
        <Link
          href={`/treks/${slug}`}
          aria-label={`Découvrir ${isVehicle ? "la formule" : "le trek"} : ${title}`}
          className="flex h-full flex-col rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C0462F]"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#E4DDD4]">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
              className="object-cover"
              priority={props.priority || false}
              quality={75}
              placeholder="blur"
              blurDataURL={getBlurData(image)}
            />
          </div>
          <div className="flex flex-1 flex-col pt-5">
            <p className="flex items-center gap-2 font-sans text-sm leading-5 text-[#625C55]">
              <span>{durationText.toLowerCase()}</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5">
                {isVehicle && <Car size={14} aria-hidden="true" />}
                {isVehicle ? "En voiture" : difficultyLabel}
              </span>
            </p>
            <h3 className="mt-3 line-clamp-2 font-display text-xl font-medium leading-snug tracking-tight text-[#1C1917]">
              {title}
            </h3>
            <p className="mt-3 line-clamp-2 font-sans text-sm leading-relaxed text-[#625C55]">
              {description}
            </p>
            {showLink && (
              <div className="mt-auto pt-6">
                <span className="site-button border border-[#1C1917]/20 text-[#1C1917]">
                  {isVehicle ? "Découvrir la formule" : "Découvrir le trek"}
                  <ArrowUpRight aria-hidden="true" />
                </span>
              </div>
            )}
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group h-full flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 select-none">
      {/* TOP: Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={props.priority || false}
          quality={75}
          placeholder="blur"
          blurDataURL={getBlurData(image)}
        />

        {/* Duration badge (top-right of image) */}
        <div className="absolute top-4 right-4 z-10 bg-black/80 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full">
          {durationText}
        </div>

        {/* Difficulty Signal Bars Badge (bottom-left of image) */}
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-md">
          <div className="flex items-end gap-0.5 h-3.5">
            {[1, 2, 3].map((bar) => {
              const isFilled = bar <= filledBars;
              const heights = ["h-1.5", "h-2.5", "h-3.5"];
              return (
                <span
                  key={bar}
                  className={`w-1 rounded-sm ${heights[bar - 1]} ${
                    isFilled ? difficultyColor : "bg-gray-200"
                  }`}
                />
              );
            })}
          </div>
          <span className="text-xs font-medium text-[#1a1a1a] capitalize tracking-wide">
            {difficultyLabel}
          </span>
        </div>
      </div>

      {/* BOTTOM: Body */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-sans font-bold text-lg text-[#1a1a1a] leading-tight mb-3 line-clamp-2 group-hover:text-[#C0462F] transition-colors">
          <Link href={`/treks/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h3>

        {/* Description */}
        <p
          className={`font-sans text-sm text-gray-600 leading-relaxed line-clamp-3 ${
            showLink ? "mb-6" : ""
          }`}
        >
          {description}
        </p>

        {/* Link: Découvrir le trek → */}
        {showLink && (
          <div className="mt-auto pt-2">
            <Link
              href={`/treks/${slug}`}
              className="site-button border border-[#C0462F]/25 text-[#C0462F]"
            >
              <span>Découvrir le trek</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
