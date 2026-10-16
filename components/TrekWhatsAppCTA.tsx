import Image from "next/image";

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

export default function TrekWhatsAppCTA() {
  return (
    <div className="border-t border-[#E4DDD4] pt-7">
      <div className="mb-7 flex items-center gap-3">
        <Image src="/Mohamed.webp" alt="Mohamed, votre guide" width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
        <div>
          <p className="text-sm font-medium text-[#1C1917]">Mohamed</p>
          <p className="mt-1 text-xs text-[#625C55]">Votre guide local certifié</p>
        </div>
      </div>
      <h2 className="font-display text-3xl font-medium leading-tight tracking-tight text-[#1C1917]">
        Votre trek commence ici.
      </h2>
      <p className="mt-4 text-sm leading-6 text-[#625C55]">
        Partagez vos dates et vos envies avec Mohamed pour préparer votre départ.
      </p>
    </div>
  );
}
