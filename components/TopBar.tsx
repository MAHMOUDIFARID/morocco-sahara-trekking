"use client";

import { usePathname } from "next/navigation";
import { MapPin, Phone, Instagram, Facebook } from "lucide-react";

export default function TopBar() {
  const pathname = usePathname();

  // Hide TopBar on the contact page
  if (pathname === "/contact" || pathname === "/contact/") {
    return null;
  }
  return (
    <div className="hidden md:flex w-full bg-[#C0462F] text-white text-xs md:text-sm h-10 border-b border-white/15 z-40 relative">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side: Location */}
        <div className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 text-white shrink-0" />
          <span className="font-normal text-white">
            45200 Kelaât M&apos;Gouna
          </span>
        </div>

        {/* Right Side: Contact & Social */}
        <div className="flex items-center gap-6">
          <a
            href="tel:00212672058267"
            className="flex items-center gap-2 transition-all duration-200 hover:opacity-80 hover:text-[#FDE8DC]"
          >
            <Phone className="h-3.5 w-3.5 shrink-0" />
            <span>+212 672 058 267</span>
          </a>

          <a
            href="mailto:m_assi_ni@hotmail.fr"
            className="flex items-center gap-2 transition-all duration-200 hover:opacity-80 hover:text-[#FDE8DC]"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
            </svg>
            <span>Gmail</span>
          </a>

          <a
            href="https://www.instagram.com/mohamed_tours_guide/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-all duration-200 hover:opacity-80 hover:text-[#FDE8DC]"
          >
            <Instagram className="h-3.5 w-3.5 shrink-0" />
            <span>Instagram</span>
          </a>

          <a
            href="https://www.facebook.com/share/1Dsv9qGioK/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-all duration-200 hover:opacity-80 hover:text-[#FDE8DC]"
          >
            <Facebook className="h-3.5 w-3.5 shrink-0" />
            <span>Facebook</span>
          </a>
        </div>
      </div>
    </div>
  );
}
