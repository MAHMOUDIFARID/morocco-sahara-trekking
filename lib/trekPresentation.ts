import type { TrekFrontmatter } from "@/types";

export function getDurationLabel(duration: number | string): string {
  return typeof duration === "number"
    ? `${duration} ${duration === 1 ? "jour" : "jours"}`
    : duration;
}

export function getTrekWhatsAppUrl(
  trekTitle: string,
  trekDuration: number | string,
  activityType: TrekFrontmatter["activityType"] = "trek",
) {
  const phone = "212672058267";
  const message = `Bonjour Mohamed,

Je suis intéressé(e) par ${activityType === "vehicle" ? "la formule suivante" : "le trek suivant"} :
${trekTitle}
Durée : ${getDurationLabel(trekDuration)}

Pourriez-vous me donner plus d'informations (dates disponibles, niveau requis, ce qui est inclus) ?

Merci d'avance !`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
