import AboutGuide from "@/components/AboutGuide";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notre Guide Mohamed | Morocco Sahara Trekking",
  description:
    "Faites connaissance avec Mohamed, guide officiel certifié natif de la Vallée des Roses, pour vos randonnées et expéditions au Maroc.",
};

export default function GuidePage() {
  return (
    <div className="min-h-screen py-10">
      <AboutGuide />
    </div>
  );
}
