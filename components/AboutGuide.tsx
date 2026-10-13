"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import CountUp from "@/components/CountUp";

export default function AboutGuide() {
  return (
    <section id="guide" className="relative w-full bg-[#FDF9F3] py-20 md:py-24 px-6 overflow-hidden select-none">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN: Guide Image & Floating Tag */}
          <div className="relative pb-6 md:pb-8">
            {/* Main Image Container */}
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto md:max-w-none rounded-3xl overflow-hidden shadow-2xl bg-black/5">
              <img
                src="/Mohamed.jpg"
                alt="Mohamed, guide de montagne et de désert certifié"
                className="w-full h-full object-cover object-center"
                loading="lazy"
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
              <span className="font-sans text-xs sm:text-sm italic font-medium text-gray-700 whitespace-nowrap">
                Guide certifié
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Text & Stats */}
          <div className="flex flex-col justify-center">


            {/* Headline */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-[#1a1a1a] leading-tight mb-6">
              <span className="italic font-bold">Mohamed,</span>{" "}
              <span className="font-bold not-italic">
                guide de montagne et de désert certifié
              </span>
            </h2>

            {/* Bio Paragraph */}
            <p className="text-base text-gray-600 leading-relaxed max-w-xl mb-10">
              Originaire de Kelaat M&apos;Gouna, au cœur de la Vallée des Roses, Mohamed a grandi là où les montagnes de l&apos;Atlas rencontrent l&apos;immensité du désert. Guide de montagne diplômé et certifié, il met aujourd&apos;hui plus de vingt ans d&apos;expérience au service des voyageurs en quête d&apos;authenticité. Des sommets du Haut Atlas aux dunes dorées du Sahara, il vous ouvre les portes d&apos;un Maroc intime, loin des sentiers battus, en partageant avec générosité sa connaissance du territoire, de ses habitants et de ses traditions.
            </p>

            {/* Stats Row */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 pt-6 border-t border-black/5">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">
                  <CountUp end={20} suffix="+" />
                </div>
                <div className="text-[10px] md:text-sm text-gray-500 uppercase tracking-wide mt-2 whitespace-nowrap font-medium">
                  Ans d&apos;expérience
                </div>
              </div>

              <div className="border-l border-gray-200 pl-8">
                <div className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">
                  <CountUp end={17} />
                </div>
                <div className="text-[10px] md:text-sm text-gray-500 uppercase tracking-wide mt-2 whitespace-nowrap font-medium">
                  Programmes de trek
                </div>
              </div>

              <div className="border-l border-gray-200 pl-8">
                <div className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">
                  <CountUp end={100} suffix="%" />
                </div>
                <div className="text-[10px] md:text-sm text-gray-500 uppercase tracking-wide mt-2 whitespace-nowrap font-medium">
                  Guide local
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-8">
              <Link
                href="/treks"
                className="inline-flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-black border-b border-gray-900 pb-0.5 transition-colors w-fit"
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
