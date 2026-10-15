"use client";

import Link from "next/link";
import Image from "next/image";
import { getBlurData } from "@/lib/blurData";

export interface SaharaCTAProps {
  headline?: string;
  subtext?: string;
  subheading?: string;
  buttonText?: string;
  buttonLink?: string;
  imageUrl?: string;
  className?: string;
}

export default function SaharaCTA({
  headline = "On part quand ?",
  subtext = "Écrivez-nous sur WhatsApp avec vos dates et le nombre de participants : Mohamed vous répond personnellement.",
  subheading,
  buttonText = "Envoyer un message",
  buttonLink = "https://wa.me/212672058267",
  imageUrl = "/place4.jpg",
  className = "",
}: SaharaCTAProps) {
  const displaySubtext = subtext || subheading;

  return (
    <section
      className={`relative mx-4 md:mx-6 my-16 h-[500px] md:h-[600px] rounded-[32px] overflow-hidden select-none ${className}`}
    >
      {/* Background Image using Next.js <Image> */}
      <Image
        src="/place4.webp"
        alt="Trekking au Maroc"
        fill
        sizes="(max-width: 1200px) 100vw, 1200px"
        className="object-cover object-center"
        placeholder="blur"
        blurDataURL={getBlurData("place4")}
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60 pointer-events-none" />

      {/* Centered Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
        {/* Top Logo / Emblem */}
        <Image
          src="/images/1.png"
          alt="MOROCCO SAHARA TREKKING"
          width={80}
          height={80}
          className="w-[60px] md:w-[80px] h-auto mx-auto mb-6 select-none pointer-events-none"
        />

        {/* Headline */}
        <h2
          className="font-display text-white text-5xl md:text-6xl lg:text-7xl leading-[1.08] tracking-normal max-w-[850px] mx-auto text-balance drop-shadow-xl"
        >
          {headline}
        </h2>

        {/* Subtext */}
        {displaySubtext && (
          <p
            className="font-sans font-normal mt-6 text-base sm:text-lg md:text-xl text-white/90 max-w-xl mx-auto leading-relaxed drop-shadow-md"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {displaySubtext}
          </p>
        )}

        {/* Standalone Button */}
        <div className="mt-10 flex justify-center">
          <Link
            href={buttonLink}
            target={buttonLink.startsWith("http") ? "_blank" : undefined}
            rel={buttonLink.startsWith("http") ? "noopener noreferrer" : undefined}
            className="inline-flex items-center justify-center rounded-full bg-white text-[#1a1a1a] font-sans font-medium text-base md:text-lg px-8 py-4 shadow-lg transition-all duration-200 hover:bg-gray-100 hover:scale-105 active:scale-95 cursor-pointer"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
