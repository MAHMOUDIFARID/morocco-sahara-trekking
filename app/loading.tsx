import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 px-4 py-20">
      <Loader2 className="h-8 w-8 text-accent animate-spin" />
      <p className="text-xs uppercase tracking-widest font-semibold text-structure/60">
        Chargement des expéditions sahariennes...
      </p>
    </div>
  );
}
