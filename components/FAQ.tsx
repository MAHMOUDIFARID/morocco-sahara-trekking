"use client";

import { useState } from "react";
import { Plus, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Quelle est la meilleure saison pour trekker dans le Haut Atlas ?",
    answer:
      "Dans le Haut Atlas, la période dépend de l’altitude et du circuit : généralement d’avril à octobre, et de mai à octobre pour le M’Goun. Le désert et le Saghro se découvrent plutôt d’octobre à avril. La saison et les conditions particulières sont précisées sur chaque fiche.",
  },
  {
    question: "Quel niveau physique faut-il pour ces treks ?",
    answer:
      "Nos 17 programmes vont de la découverte familiale des vallées aux ascensions plus exigeantes du M’Goun et du Toubkal. Chaque fiche indique le niveau, les étapes et les temps de marche disponibles. Mohamed peut vous conseiller sur WhatsApp selon votre expérience et votre condition physique.",
  },
  {
    question: "Qu'est-ce qui est inclus dans le prix ?",
    answer:
      "En général : transferts depuis le point de départ, hébergement (gîte, bivouac ou refuge selon le trek), tous les repas pendant la randonnée, muletsiers, cuisinier et guide de montagne diplômé. Le détail complet (inclus / non inclus) figure sur chaque page programme.",
  },
  {
    question: "Comment réserver un trek ?",
    answer:
      "Le plus simple est de nous écrire directement sur WhatsApp avec vos dates souhaitées et le nombre de participants. Mohamed, guide certifié, vous répond personnellement pour construire l'itinéraire avec vous.",
  },
  {
    question: "Les treks sont-ils adaptés aux groupes et familles ?",
    answer:
      "Oui, les circuits peuvent être adaptés aux groupes, aux familles ou aux voyageurs en solo. Échangez avec Mohamed pour choisir un itinéraire et un rythme adaptés aux participants.",
  },
];

export interface FAQProps {
  badge?: string;
  headline?: string;
  items?: FAQItem[];
  className?: string;
}

export default function FAQ({
  badge = "010 • FAQ",
  headline = "Questions Fréquentes",
  items = FAQ_ITEMS,
  className = "",
}: FAQProps) {
  // All items closed by default
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className={`w-full py-20 sm:py-24 px-4 ${className}`}>
      <div className="mx-auto max-w-[800px]">
        {/* Redesigned Centered Headline */}
        <div className="mb-12 text-center">
          <h2 className="text-center text-3xl sm:text-5xl md:text-6xl font-display font-semibold leading-tight tracking-tight whitespace-nowrap">
            <span className="text-[#1a1a1a] pr-2">Questions</span>
            <span className="text-white bg-[#C0462F] px-3 sm:px-4 py-1 inline-block">Fréquentes</span>
          </h2>
        </div>

        {/* FAQ List */}
        <div className="flex flex-col gap-4">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                onClick={() => handleToggle(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleToggle(idx);
                  }
                }}
                className={`w-full text-left rounded-[2rem] px-6 sm:px-8 py-5 transition-all duration-300 cursor-pointer select-none ${
                  isOpen
                    ? "bg-white border border-[#60A5FA] shadow-lg shadow-blue-500/10"
                    : "bg-white border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-gray-200 hover:shadow-md"
                }`}
              >
                {/* Header Row: Question + Action Icon */}
                <div className="flex items-center justify-between gap-4">
                  {/* Question Text */}
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 leading-snug flex-1">
                    {item.question}
                  </h3>

                  {/* Icon: Black circle with white "+" when closed, light circle with dark "×" when open */}
                  {isOpen ? (
                    <span className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0 text-gray-700 transition-colors">
                      <X className="w-4 h-4 stroke-[2]" />
                    </span>
                  ) : (
                    <span className="w-9 h-9 rounded-full bg-black flex items-center justify-center shrink-0 text-white shadow-xs transition-transform duration-200 group-hover:scale-105">
                      <Plus className="w-4 h-4 stroke-[2]" />
                    </span>
                  )}
                </div>

                {/* Animated Answer Body */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 mt-4"
                      : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed pr-4 pt-1">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Footer Section */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-1.5">
            D&apos;autres questions ?
          </p>
          <Link
            href="/contact"
            className="site-button border border-[#1a1a1a]/20 text-[#1a1a1a]"
          >
            <span>
              Contactez-nous
            </span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
