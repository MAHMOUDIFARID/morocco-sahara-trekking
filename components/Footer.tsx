import Link from "next/link";
import Image from "next/image";
import { getAllTreks } from "@/lib/mdx";
import { Trek } from "@/types";
import ScrollToTop from "@/components/ScrollToTop";

const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Trekks", href: "/treks" },
  { label: "À propos", href: "/#about" },
  { label: "Contact", href: "/contact" },
];


// Groups of related keywords so variations (e.g. bouguemez, bougmaz, bougmez, bouilli) share the same theme
const THEME_GROUPS = [
  { theme: "bouguemez", keywords: ["bouguemez", "bougmaz", "bougmez", "bououli", "bouilli", "sremt"] },
  { theme: "roses", keywords: ["roses", "rose"] },
  { theme: "toubkal", keywords: ["toubkal"] },
  { theme: "desert", keywords: ["desert", "désert", "sahara"] },
  { theme: "mgoun", keywords: ["mgoun", "m'goun", "traversee", "ascension"] },
  { theme: "siroua", keywords: ["siroua"] },
  { theme: "saghro", keywords: ["saghro"] },
  { theme: "tassaout", keywords: ["tassaout"] },
  { theme: "gorges", keywords: ["gorges"] },
];

// Pick 6 unique treks — avoid having two treks with the same keyword/theme
function pickUniqueTreks(allTreks: Trek[], count = 6): Trek[] {
  const picked: Trek[] = [];
  const usedThemes = new Set<string>();

  for (const trek of allTreks) {
    if (picked.length >= count) break;

    const titleLower = trek.title.toLowerCase();
    const matchedGroup = THEME_GROUPS.find((group) =>
      group.keywords.some((kw) => titleLower.includes(kw))
    );

    const themeKey = matchedGroup ? matchedGroup.theme : trek.slug;

    // Skip if this theme was already used
    if (usedThemes.has(themeKey)) continue;

    // Add to picked and mark theme as used
    picked.push(trek);
    usedThemes.add(themeKey);
  }

  // If we still need more treks, fill with remaining ones
  if (picked.length < count) {
    for (const trek of allTreks) {
      if (picked.length >= count) break;
      if (!picked.find((t) => t.slug === trek.slug)) {
        picked.push(trek);
      }
    }
  }

  return picked;
}

export default function Footer() {
  const allTreks = getAllTreks();
  const footerTreks = pickUniqueTreks(allTreks, 6);

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

        {/* Footer Links Area: 5-column Grid */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10">
          {/* Column 1 (Left): Copyright */}
          <div className="flex flex-col justify-start">
            <p className="text-sm text-gray-500 font-normal">
              © 2026 MOROCCO SAHARA TREKKING
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="font-semibold text-base text-white mb-4">Navigation</h3>
            <ul className="space-y-3">
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

          {/* Column 3: Trekks Populaires */}
          <div>
            <h3 className="font-semibold text-base text-white mb-4">Trekks Populaires</h3>
            <ul className="space-y-3">
              {footerTreks.map((trek) => (
                <li key={trek.slug}>
                  <Link
                    href={`/treks/${trek.slug}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors block leading-snug"
                  >
                    {trek.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: External Social Links */}
          <div>
            <h3 className="font-semibold text-base text-white mb-4">Réseaux sociaux</h3>
            <div className="flex items-center gap-4">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/mohamed_tours_guide/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
                className="text-white hover:text-[#C0462F] transition-colors duration-200"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/1Dsv9qGioK/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook"
                className="text-white hover:text-[#C0462F] transition-colors duration-200"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="currentColor"/>
                  <path d="M14 8H13C12.4477 8 12 8.44772 12 9V11H14L13.5 14H12V21H9V14H7V11H9V9C9 7.34315 10.3431 6 12 6H14V8Z" fill="#000000"/>
                </svg>
              </a>

              {/* Gmail */}
              <a
                href="mailto:m_assi_ni@hotmail.fr"
                aria-label="Email"
                title="m_assi_ni@hotmail.fr"
                className="text-white hover:text-[#C0462F] transition-colors duration-200"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 5 (Far Right): Map / Location */}
          <div className="flex flex-col h-full items-start lg:items-end">
            <h3 className="font-semibold text-base text-white mb-4 lg:text-right w-full">
              Localisation
            </h3>
            <div className="flex-1 flex flex-col justify-end w-full items-start lg:items-end">
              <a
                href="https://www.google.com/maps/place/Trekking+Vall%C3%A9e+des+Roses+Tour+Guide+Mohamed/@31.3844657,-6.1343235,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
                title="Voir sur Google Maps"
              >
                <div className="relative w-[260px] h-[260px] overflow-hidden border border-white/10 group-hover:border-[#C0462F]/60 transition-colors">
                  <iframe
                    src="https://maps.google.com/maps?q=Trekking%20Vall%C3%A9e%20des%20Roses%20Tour%20Guide%20Mohamed%20Kelaat%20M%27Gouna&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "grayscale(20%) brightness(0.9)" }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Kelaat M'Gouna — Morocco Sahara Trekking"
                    className="absolute inset-0 w-full h-full pointer-events-none"
                  />
                </div>
              </a>
              <p className="text-xs text-gray-500 mt-3 leading-snug lg:text-right">
                Kelaat M&apos;Gouna<br />
                45200, Vallée des Roses, Maroc
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <ScrollToTop />
    </footer>
  );
}
