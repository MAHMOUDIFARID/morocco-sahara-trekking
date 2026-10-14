"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { Menu, X, PhoneCall } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isTransparent = isHome && !isScrolled;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isHome ? "-mb-[60px] lg:-mb-[80px]" : ""
      } ${
        isTransparent
          ? "bg-transparent border-b border-transparent"
          : "bg-white/85 backdrop-blur-md border-b border-structure/10 shadow-subtle"
      }`}
    >
      <div className="mx-auto flex h-[60px] lg:h-[80px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo Linked to Home */}
        <Link
          href="/"
          className="flex items-center p-1 transition-opacity hover:opacity-90 shrink-0"
          aria-label="MOROCCO SAHARA TREKKING - Accueil"
        >
          {/* Logo container with controlled responsive sizing and filter */}
          <div
            className={`relative flex items-center justify-center overflow-hidden h-[45px] w-[45px] sm:h-[55px] sm:w-[55px] lg:h-[70px] lg:w-[70px] transition-all duration-300 ${
              isTransparent ? "brightness-0 invert drop-shadow-sm" : ""
            }`}
          >
            <Logo
              width={70}
              height={70}
              priority
              className="h-full w-full object-contain scale-105"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium transition-colors">
          <Link
            href="/treks"
            className={`transition-colors duration-200 ${
              isTransparent
                ? "text-white/90 hover:text-white drop-shadow-sm"
                : "text-structure/75 hover:text-structure"
            }`}
          >
            Trekks dans le Désert
          </Link>

          <Link
            href="/#about"
            className={`transition-colors duration-200 ${
              isTransparent
                ? "text-white/90 hover:text-white drop-shadow-sm"
                : "text-structure/75 hover:text-structure"
            }`}
          >
            À propos du Sahara
          </Link>
          <Link
            href="/contact"
            className={`transition-colors duration-200 ${
              isTransparent
                ? "text-white/90 hover:text-white drop-shadow-sm"
                : "text-structure/75 hover:text-structure"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Action Button & Contact */}
        <div className="hidden md:flex items-center gap-5">
          <a
            href="https://wa.me/212672058267"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200 ${
              isTransparent
                ? "text-white/90 hover:text-white drop-shadow-sm"
                : "text-structure/70 hover:text-structure"
            }`}
          >
            <PhoneCall className={`h-4 w-4 ${isTransparent ? "text-white" : "text-structure/80"}`} />
            <span>+212 672 058 267</span>
          </a>
          <Link
            href="/treks"
            className={`rounded-xl px-4 py-2 lg:px-5 lg:py-2.5 text-sm font-semibold transition-all hover:scale-102 active:scale-[0.98] ${
              isTransparent
                ? "bg-white text-[#1a1a1a] hover:bg-gray-100 shadow-md"
                : "bg-white text-[#1a1a1a] border border-structure/15 hover:bg-gray-100 shadow-sm"
            }`}
          >
            Explorer les Trekks
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(true)}
          className={`md:hidden bg-transparent p-2 flex items-center justify-center ${
            isTransparent ? "text-white" : "text-structure"
          }`}
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Fullscreen Mobile Menu (100dvh) */}
      <div
        className={`fixed inset-0 z-[999] w-screen w-full h-screen h-[100dvh] bg-[#1a1a1a] flex flex-col justify-between overflow-y-auto transition-all duration-300 ease-out md:hidden ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        {/* Top bar: Logo + Close (×) button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center p-1 transition-opacity hover:opacity-90"
            aria-label="MOROCCO SAHARA TREKKING - Accueil"
          >
            <div className="relative flex items-center justify-center overflow-hidden h-[45px] w-[45px] brightness-0 invert">
              <Logo
                width={50}
                height={50}
                priority
                className="h-full w-full object-contain"
              />
            </div>
          </Link>

          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full p-2 text-white/80 hover:text-white hover:bg-white/10 transition flex items-center justify-center"
            aria-label="Fermer le menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation links (vertical) */}
        <nav className="flex flex-col px-6 py-6 divide-y divide-white/10">
          <Link
            href="/treks"
            onClick={() => setIsOpen(false)}
            className="text-2xl sm:text-3xl font-medium text-white py-4 block hover:text-white/80 transition-colors"
          >
            Trekks dans le Désert
          </Link>

          <Link
            href="/#about"
            onClick={() => setIsOpen(false)}
            className="text-2xl sm:text-3xl font-medium text-white py-4 block hover:text-white/80 transition-colors"
          >
            À propos du Sahara
          </Link>

          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="text-2xl sm:text-3xl font-medium text-white py-4 block hover:text-white/80 transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Bottom CTA & Direct WhatsApp link */}
        <div className="mt-auto px-6 pb-8 pt-4 shrink-0 space-y-4">
          <a
            href="https://wa.me/212672058267"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-sm text-white/70 hover:text-white transition py-2"
          >
            <PhoneCall className="h-4 w-4" />
            <span>+212 672 058 267</span>
          </a>

          <Link
            href="/treks"
            onClick={() => setIsOpen(false)}
            className="w-full block text-center rounded-full bg-white text-[#1a1a1a] py-4 text-base font-semibold hover:bg-gray-100 transition shadow-md"
          >
            Explorer Tous les Treks
          </Link>
        </div>
      </div>
    </header>
  );
}
