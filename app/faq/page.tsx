import FAQ from "@/components/FAQ";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Morocco Sahara Trekking",
  description:
    "Questions fréquentes sur nos treks dans le Haut Atlas, la Vallée des Roses et le Sahara marocain.",
};

export default function FAQPage() {
  return (
    <div className="min-h-screen py-10">
      <FAQ />
    </div>
  );
}
