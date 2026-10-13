import { Trek } from "@/types";
import TrekCard from "@/components/TrekCard";

interface TrekListClientProps {
  initialTreks: Trek[];
}

export default function TrekListClient({ initialTreks }: TrekListClientProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {initialTreks.map((trek) => (
        <TrekCard key={trek.slug} trek={trek} />
      ))}
    </div>
  );
}
