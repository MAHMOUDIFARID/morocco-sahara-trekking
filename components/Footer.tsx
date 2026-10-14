import Link from "next/link";
import Image from "next/image";
import { getAllTreks } from "@/lib/mdx";
import { Trek } from "@/types";
import ScrollToTop from "@/components/ScrollToTop";

const navigationLinks = [
  { label: "Accueil", href: "/" },
  { label: "Tous les Trekks", href: "/treks" },
  { label: "Régions", href: "/regions" },
  { label: "Guide", href: "/guide" },
  { label: "FAQ", href: "/faq" },
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

// Pick 7 unique treks — avoid having two treks with the same keyword/theme
function pickUniqueTreks(allTreks: Trek[], count = 7): Trek[] {
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
  const footerTreks = pickUniqueTreks(allTreks, 7);

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
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200 block leading-snug"
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
                className="hover:opacity-70 transition-opacity duration-200"
              >
                <img
                  src="/icons/instagram.png"
                  alt="Instagram"
                  width={28}
                  height={28}
                  className="w-7 h-7"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/1Dsv9qGioK/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook"
                className="hover:opacity-70 transition-opacity duration-200"
              >
                <img
                  src="/icons/facebook.png"
                  alt="Facebook"
                  width={28}
                  height={28}
                  className="w-7 h-7"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </a>

              {/* Gmail */}
              <a
                href="mailto:m_assi_ni@hotmail.fr"
                aria-label="Email"
                title="m_assi_ni@hotmail.fr"
                className="hover:opacity-70 transition-opacity duration-200"
              >
                <img
                  src="/icons/gmail.png"
                  alt="Gmail"
                  width={28}
                  height={28}
                  className="w-7 h-7"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </a>
            </div>
          </div>

          {/* Column 5 (Far Right): Map / Location */}
          <div className="flex flex-col items-start">
            <h3 className="font-semibold text-base text-white mb-4">
              Localisation
            </h3>
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
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <ScrollToTop />
    </footer>
  );
}
