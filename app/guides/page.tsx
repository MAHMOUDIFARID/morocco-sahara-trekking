import { Metadata } from "next";
import AboutGuide from "@/components/AboutGuide";

export const metadata: Metadata = {
  title: "Nos Guides | Morocco Sahara Trekking",
  description:
    "Rencontrez Mohamed et nos guides berbères diplômés, experts des sentiers du Haut Atlas et du Sahara marocain.",
};

export default function GuidesPage() {
  return (
    <div className="py-8">
      <AboutGuide />
    </div>
  );
}
