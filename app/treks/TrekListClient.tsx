import { Trek } from "@/types";
import TrekCard from "@/components/TrekCard";

interface TrekListClientProps {
  initialTreks: Trek[];
}

export default function TrekListClient({ initialTreks }: TrekListClientProps) {
  return (
    <div className="grid grid-cols-1 gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
      {initialTreks.map((trek) => (
        <TrekCard key={trek.slug} trek={trek} variant="editorial" />
      ))}
    </div>
  );
}
