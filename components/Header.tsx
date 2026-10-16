"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navigationLinks = [
  { href: "/treks", label: "Tous les Treks" },
  { href: "/guide", label: "Guide" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
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

  // A modal dialog keeps keyboard focus inside the menu and makes the page inert.
  useEffect(() => {
    if (!isOpen) return;
    const menu = menuRef.current;
    if (!menu) return;
    const previousOverflow = document.body.style.overflow;
    menu.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      menu.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Restore scrolling when moving from a mobile viewport to desktop.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setIsOpen(false);
    };
    closeOnDesktop();
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isTransparent = isHome && !isScrolled;

  return (
    <header
      className={`sticky top-0 z-[60] transition-all duration-300 ${
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
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-haspopup="dialog"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Fullscreen Mobile Menu (100dvh) */}
      <dialog
        ref={menuRef}
        id="mobile-navigation"
        aria-label="Navigation principale"
        onClose={() => setIsOpen(false)}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = event.currentTarget.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        className="fixed inset-0 z-[999] m-0 h-[100dvh] max-h-none w-full max-w-none border-0 bg-[#1a1a1a] p-0 flex flex-col justify-between overflow-y-auto backdrop:bg-black/40 [&:not([open])]:hidden lg:hidden"
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
            autoFocus
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
      </dialog>
    </header>
  );
}
