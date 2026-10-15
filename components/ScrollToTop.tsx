"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        type="button"
        aria-label="Retour en haut"
        className={`site-icon-button bg-[#1A1A1A] text-white border border-white/10 shadow-xl transition-all duration-300 ${
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
        className="site-icon-button drop-shadow-xl"
      >
        <Image
          src="/images/whatsapp.png"
          alt="WhatsApp"
          width={40}
          height={40}
          className="w-full h-full object-contain select-none"
        />
      </a>
    </div>
  );
}
