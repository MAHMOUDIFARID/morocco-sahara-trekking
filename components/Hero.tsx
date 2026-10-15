"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { getBlurData } from "@/lib/blurData";
import RotatingWord from "./RotatingWord";

export interface HeroProps {
  headline?: string;
  subheadline?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  className?: string;
}

const IMAGES = ["/place1.webp", "/place2.webp", "/place3.webp"];

export default function Hero({
  headline = "Trekking au Maroc Atlas, Sahara et vallées berbères",
  subheadline = "L’Atlas se découvre à pied, au rythme de ses habitants, au plus près de leurs traditions.",
  primaryCtaText = "Explorer les Trekks",
  primaryCtaLink = "/treks",
  secondaryCtaText = "Discuter sur WhatsApp",
  secondaryCtaLink = "https://wa.me/212672058267",
  className = "",
}: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className={`relative w-full overflow-hidden bg-black min-h-screen min-h-[100dvh] flex items-center justify-center pt-20 sm:pt-24 pb-12 sm:pb-16 select-none ${className}`}
    >
      {/* Background Slideshow Images */}
      <div className="absolute inset-0 z-0">
        {IMAGES.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`Sahara & Atlas landscape ${i + 1}`}
            fill
            sizes="100vw"
            priority={i === 0}
            quality={80}
            placeholder="blur"
            blurDataURL={getBlurData(src)}
            className={`object-cover object-center transition-opacity duration-[1500ms] ease-in-out ${
              i === currentIndex
                ? "opacity-100 animate-kenburns"
                : "opacity-0 pointer-events-none"
            }`}
          />
        ))}

        {/* Dark Vignette & Gradient Overlays for optimal text contrast */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/75 z-10" />
      </div>

      {/* Centered Main Content */}
      <div className="relative z-20 mx-auto max-w-4xl px-4 text-center sm:px-6">
        {/* Rotating Headline */}
        <h1 className="font-hero font-medium text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05] tracking-tight text-center max-w-4xl mx-auto">
          Découvrez le Maroc
          <br />
          à travers{" "}
          <RotatingWord
            words={["le Sahara", "l'Atlas", "les dunes", "les vallées"]}
            interval={2500}
            className="text-[#C0462F]"
          />
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-white/90 text-center max-w-2xl mx-auto mt-6 leading-relaxed drop-shadow-md">
          {subheadline}
        </p>

        {/* Dual Pill CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={primaryCtaLink}
            className="site-button bg-white text-black"
          >
            {primaryCtaText}
          </Link>
          <Link
            href={secondaryCtaLink}
            target={secondaryCtaLink.startsWith("http") ? "_blank" : undefined}
            rel={secondaryCtaLink.startsWith("http") ? "noopener noreferrer" : undefined}
            className="site-button border border-white/25 bg-white/10 text-white backdrop-blur-md"
          >
            <span>{secondaryCtaText}</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
