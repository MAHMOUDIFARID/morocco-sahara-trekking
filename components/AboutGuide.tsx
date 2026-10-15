"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import CountUp from "@/components/CountUp";
import { getBlurData } from "@/lib/blurData";

export default function AboutGuide() {
  return (
    <section id="guide" className="relative w-full bg-[#FDF9F3] py-20 md:py-24 px-6 overflow-hidden select-none">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN: Guide Image & Floating Tag */}
          <div className="relative pb-6 md:pb-8">
            {/* Main Image Container */}
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto md:max-w-none rounded-3xl overflow-hidden shadow-2xl bg-black/5">
              <Image
                src="/Mohamed.webp"
                alt="Mohamed, guide de montagne et de désert certifié"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover object-center"
                placeholder="blur"
                blurDataURL={getBlurData("Mohamed")}
              />
            </div>

            {/* Floating Tag Overlapping Image Bottom */}
            <div className="absolute -bottom-2 left-6 sm:bottom-0 sm:left-10 z-10 bg-white rounded-2xl shadow-xl px-5 py-3.5 border border-black/5 flex items-center gap-3">
              <img
                src="/quote-svgrepo-com.svg"
                alt="Quote"
                width={20}
                height={20}
                className="w-5 h-5 shrink-0"
              />
              <span className="font-sans text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
                Guide certifié
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Text & Stats */}
          <div className="flex flex-col justify-center">

            {/* Headline */}
            <h2 className="font-display font-semibold text-2xl md:text-3xl lg:text-4xl text-[#1a1a1a] leading-tight mb-6">
              <span>Mohamed,</span>{" "}
              <span>
                guide de montagne et de désert certifié
              </span>
            </h2>

            {/* Bio Paragraph */}
            <p className="text-base text-gray-600 leading-relaxed max-w-xl mb-10">
              Originaire de Kelaat M&apos;Gouna, au cœur de la Vallée des Roses, Mohamed a grandi là où les montagnes de l&apos;Atlas rencontrent l&apos;immensité du désert. Guide de montagne diplômé et certifié, il met aujourd&apos;hui plus de vingt ans d&apos;expérience au service des voyageurs en quête d&apos;authenticité. Des sommets du Haut Atlas aux dunes dorées du Sahara, il vous ouvre les portes d&apos;un Maroc intime, loin des sentiers battus, en partageant avec générosité sa connaissance du territoire, de ses habitants et de ses traditions.
            </p>

            {/* Guide at a glance */}
            <dl className="grid grid-cols-3 gap-x-4 border-t border-[#E4DDD4] pt-7 sm:gap-x-8">
              <div className="flex flex-col gap-2">
                <dt className="order-2 font-sans text-xs leading-5 text-[#625C55] sm:text-sm">
                  ans d&apos;expérience
                </dt>
                <dd className="order-1 font-display text-3xl font-medium leading-none tracking-tight text-[#1C1917] tabular-nums md:text-4xl">
                  <CountUp end={20} suffix="+" />
                </dd>
              </div>

              <div className="flex flex-col gap-2">
                <dt className="order-2 font-sans text-xs leading-5 text-[#625C55] sm:text-sm">
                  programmes de trek
                </dt>
                <dd className="order-1 font-display text-3xl font-medium leading-none tracking-tight text-[#1C1917] tabular-nums md:text-4xl">
                  <CountUp end={17} />
                </dd>
              </div>

              <div className="flex flex-col gap-2">
                <dt className="order-2 font-sans text-xs leading-5 text-[#625C55] sm:text-sm">
                  guide local
                </dt>
                <dd className="order-1 font-display text-3xl font-medium leading-none tracking-tight text-[#1C1917] tabular-nums md:text-4xl">
                  <CountUp end={100} suffix="%" />
                </dd>
              </div>
            </dl>

            {/* Call to Action */}
            <div className="mt-9">
              <Link
                href="/treks"
                className="site-button w-fit bg-[#1C1917] text-white"
              >
                <span>Planifier votre trek avec Mohamed</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
