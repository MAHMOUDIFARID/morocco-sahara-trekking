"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Trekks", href: "/treks" },
  { label: "À propos", href: "/#about" },
  { label: "Contact", href: "/contact" },
];

const POPULAR_TREKS = [
  {
    label: "Trek de 7 jours - Vallées d'Aït Bouguemez",
    href: "/treks/trek-7-jours-vallees-ait-bouguemez-ait-bououli",
  },
  {
    label: "Trek villages berbères vallée des Roses",
    href: "/treks/trek-villages-berberes-vallee-des-roses-4-jours",
  },
  {
    label: "Trek Randonnée village Berbère Aït Bougmaz",
    href: "/treks/trek-randonnee-village-berbere-ait-bougmaz",
  },
  {
    label: "5 jours - Vallées Aït Bougmez & Aït Bouilli",
    href: "/treks/5-jours-vallees-ait-bougmez-ait-bouilli",
  },
  {
    label: "Trek Toubkal - villages berbères 3 jours",
    href: "/treks/trek-toubkal-villages-berberes-3-jours",
  },
  {
    label: "Vallée Aït Bouguemez : Trekking et découverte",
    href: "/treks/vallee-ait-bouguemez-trekking-decouverte-atlas",
  },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/mohamed_tours_guide/" },
  { label: "Facebook", href: "https://www.facebook.com/share/1Dsv9qGioK/" },
  { label: "Gmail", href: "mailto:m_assi_ni@hotmail.fr" },
];

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    toggleVisibility();

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative z-10 w-full bg-[#000000] text-white pt-20 sm:pt-28 pb-12 px-6 md:px-12 flex flex-col justify-between">
      {/* Top Section: Brand Logo */}
      <div className="w-full">
        {/* Brand Logo */}
        <div className="flex justify-center mb-16 sm:mb-20 md:mb-24">
          <Image
            src="/logo.png"
            alt="MOROCCO SAHARA TREKKING"
            width={260}
            height={70}
            className="h-auto w-[180px] sm:w-[220px] md:w-[260px] object-contain brightness-0 invert"
          />
        </div>

        {/* Footer Links Area: 4-column Grid */}
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Column 1 (Left): Copyright */}
          <div className="flex flex-col justify-start">
            <p className="text-sm text-gray-500 font-normal">
              © 2026 MOROCCO SAHARA TREKKING
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <ul className="space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="block text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Trekks */}
          <div>
            <ul className="space-y-4">
              {POPULAR_TREKS.map((trek) => (
                <li key={trek.href}>
                  <Link
                    href={trek.href}
                    className="block text-sm text-gray-400 hover:text-white transition-colors duration-200 leading-snug"
                  >
                    {trek.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 (Right): External Social Links */}
          <div>
            <ul className="space-y-4">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="block text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons (Fixed Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          type="button"
          aria-label="Retour en haut"
          className={`flex h-11 w-11 items-center justify-center rounded-full bg-[#1A1A1A] text-white border border-white/10 shadow-xl transition-all duration-300 hover:bg-[#262626] hover:scale-110 active:scale-95 ${
            isVisible
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <ArrowUp className="w-5 h-5" />
        </button>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/212672058267"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Discuter sur WhatsApp"
          className="flex h-11 w-11 items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 drop-shadow-xl"
        >
          <Image
            src="/images/whatsapp.png"
            alt="WhatsApp"
            width={44}
            height={44}
            className="w-full h-full object-contain select-none"
          />
        </a>
      </div>
    </footer>
  );
}
