import Link from "next/link";
import { Compass, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-structure/5 text-structure mb-2">
          <Compass className="w-10 h-10 text-accent animate-pulse" />
        </div>

        <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-accent bg-accent/10 px-3.5 py-1.5 rounded-full">
          Erreur 404 • Page Non Trouvée
        </span>

        <h1 className="text-4xl sm:text-5xl font-normal font-serif text-structure tracking-tight">
          Cette Oasis n&apos;Existe Pas
        </h1>

        <p className="text-sm text-structure/70 leading-relaxed max-w-sm mx-auto">
          La page que vous recherchez semble s&apos;être égarée dans les dunes du Sahara ou a été déplacée.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="site-button w-full sm:w-auto bg-structure text-canvas-pure"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l&apos;Accueil
          </Link>

          <Link
            href="/treks"
            className="site-button w-full sm:w-auto border border-structure/20 bg-canvas-pure text-structure"
          >
            Explorer les Trekks
          </Link>
        </div>
      </div>
    </div>
  );
}
