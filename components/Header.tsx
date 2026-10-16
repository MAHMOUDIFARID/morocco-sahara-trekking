"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navigationLinks = [
  { href: "/treks", label: "Tous les Treks" },
  { href: "/regions", label: "Régions" },
  { href: "/guide", label: "Guide" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

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
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium transition-colors">
          {navigationLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`whitespace-nowrap transition-colors duration-200 ${
                isTransparent
                  ? "text-white/90 hover:text-white drop-shadow-sm"
                  : "text-structure/75 hover:text-structure"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* WhatsApp CTA */}
        <div className="hidden lg:flex items-center">
          <a
            href="https://wa.me/212672058267"
            target="_blank"
            rel="noopener noreferrer"
            className={`site-button bg-white text-[#1a1a1a] ${
              isTransparent
                ? ""
                : "border border-structure/15"
            }`}
          >
            Parlons de votre trek
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(true)}
          className={`site-icon-button lg:hidden bg-transparent ${
            isTransparent ? "text-white" : "text-structure"
          }`}
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Fullscreen Mobile Menu (100dvh) */}
      <div
        className={`fixed inset-0 z-[999] w-screen w-full h-screen h-[100dvh] bg-[#1a1a1a] flex flex-col justify-between overflow-y-auto transition-all duration-300 ease-out lg:hidden ${
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
            className="site-icon-button bg-transparent text-white"
            aria-label="Fermer le menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation links (vertical) */}
        <nav className="flex flex-col px-6 py-6 divide-y divide-white/10">
          {navigationLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className="text-2xl sm:text-3xl font-medium text-white py-4 block hover:text-white/80 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* WhatsApp CTA */}
        <div className="mt-auto px-6 pb-8 pt-4 shrink-0">
          <a
            href="https://wa.me/212672058267"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="site-button w-full bg-white text-[#1a1a1a]"
          >
            Parlons de votre trek
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  );
}
