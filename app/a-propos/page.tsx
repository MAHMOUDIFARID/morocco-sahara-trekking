import { Metadata } from "next";
import AboutGuide from "@/components/AboutGuide";
import WhyUs from "@/components/WhyUs";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "À propos du Sahara & Notre Équipe | Morocco Sahara Trekking",
  description:
    "Découvrez notre agence locale de trekking, notre philosophie éco-responsable et l'équipe guidée par Mohamed.",
};

export default function AProposPage() {
  return (
    <div className="flex flex-col gap-12 py-8">
      <AboutGuide />
      <WhyUs />
      <div id="about">
        <FAQ />
      </div>
    </div>
  );
}
