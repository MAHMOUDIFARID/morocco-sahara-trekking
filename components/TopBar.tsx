"use client";

import { usePathname } from "next/navigation";
import { MapPin, Phone } from "lucide-react";

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

          {/* Gmail */}
          <a
            href="mailto:m_assi_ni@hotmail.fr"
            aria-label="Email"
            title="m_assi_ni@hotmail.fr"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200"
          >
            <img
              src="/icons/gmail.png"
              alt="Gmail"
              width={16}
              height={16}
              className="w-4 h-4 shrink-0"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <span>Gmail</span>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/mohamed_tours_guide/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            title="Instagram"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200"
          >
            <img
              src="/icons/instagram.png"
              alt="Instagram"
              width={16}
              height={16}
              className="w-4 h-4 shrink-0"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <span>Instagram</span>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/share/1Dsv9qGioK/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            title="Facebook"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200"
          >
            <img
              src="/icons/facebook.png"
              alt="Facebook"
              width={16}
              height={16}
              className="w-4 h-4 shrink-0"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <span>Facebook</span>
          </a>
        </div>
      </div>
    </div>
  );
}
