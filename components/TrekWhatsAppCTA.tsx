import Image from "next/image";

type Props = {
  trekTitle: string;
  trekDuration: number;
};

export function getTrekWhatsAppUrl(trekTitle: string, trekDuration: number) {
  const phone = "212672058267"; // Mohamed's WhatsApp number

  const message = `Bonjour Mohamed 👋,

Je suis intéressé(e) par le trek suivant :
📌 ${trekTitle}
⏱️ Durée : ${trekDuration} jours

Pourriez-vous me donner plus d'informations (dates disponibles, niveau requis, ce qui est inclus) ?

Merci d'avance !`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export default function TrekWhatsAppCTA({ trekTitle, trekDuration }: Props) {
  const whatsappUrl = getTrekWhatsAppUrl(trekTitle, trekDuration);

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm text-center">
      {/* WhatsApp Icon */}
      <Image
        src="/images/whatsapp.png"
        alt="WhatsApp"
        width={48}
        height={48}
        className="w-12 h-12 mx-auto mb-5 object-contain"
      />

      {/* Headline */}
      <h3 className="font-sans font-bold text-xl md:text-2xl text-[#1a1a1a] mb-3">
        Réservez ce trek sur WhatsApp
      </h3>

      {/* Description */}
      <p className="font-sans text-sm text-gray-600 leading-relaxed mb-6">
        Envoyez-nous un message direct avec vos dates. Mohamed vous répond en quelques minutes.
      </p>

      {/* Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="site-button w-full bg-[#25D366] text-white"
      >
        Discuter sur WhatsApp
      </a>

      {/* Footer text */}
      <p className="font-sans text-xs text-gray-500 mt-4">
        Réponse en moins de 2h • Français, Anglais, Arabe
      </p>
    </div>
  );
}
