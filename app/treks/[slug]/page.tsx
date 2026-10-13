import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllTreks, getTrekBySlug } from "@/lib/mdx";
import MDXContent from "@/components/MDXContent";
import TrekWhatsAppCTA, { getTrekWhatsAppUrl } from "@/components/TrekWhatsAppCTA";
import { getBlurData } from "@/lib/blurData";
import {
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  ChevronRight,
  Layers,
  MessageCircle,
} from "lucide-react";

interface TrekPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const treks = getAllTreks();
  return treks.map((trek) => ({
    slug: trek.slug,
  }));
}

export function generateMetadata({ params }: TrekPageProps): Metadata {
  const trek = getTrekBySlug(params.slug);
  if (!trek) {
    return {
      title: "Trekk non trouvé | MOROCCO SAHARA TREKKING",
    };
  }

  return {
    title: `${trek.title} | MOROCCO SAHARA TREKKING`,
    description: trek.description,
    openGraph: {
      title: trek.title,
      description: trek.description,
      images: trek.images && trek.images.length > 0 ? [trek.images[0]] : ["/logo.png"],
    },
  };
}

export default function TrekDetailPage({ params }: TrekPageProps) {
  const trek = getTrekBySlug(params.slug);

  if (!trek) {
    notFound();
  }

  const whatsappUrl = getTrekWhatsAppUrl(trek.title, trek.duration, trek.price);

  const difficultyLabels: Record<string, string> = {
    Easy: "Facile",
    Moderate: "Modéré",
    Hard: "Difficile",
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "Hard":
        return "bg-accent/10 text-accent border-accent/30 font-semibold";
      case "Moderate":
        return "bg-canvas-pure text-structure border-structure/30 font-medium";
      case "Easy":
      default:
        return "bg-canvas-pure text-structure/80 border-structure/15 font-normal";
    }
  };

  return (
    <div className="pb-24">
      {/* Breadcrumbs */}
      <nav className="bg-white/40 backdrop-blur-xs border-b border-structure/10 py-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 text-xs text-structure/60">
            <li>
              <Link href="/" className="hover:text-structure transition-colors">
                Accueil
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3 w-3 text-structure/30" />
            </li>
            <li>
              <Link href="/treks" className="hover:text-structure transition-colors">
                Trekks dans le Désert
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3 w-3 text-structure/30" />
            </li>
            <li className="font-semibold text-structure truncate max-w-xs sm:max-w-md">
              {trek.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="rounded-full bg-structure/5 px-3 py-1 text-[11px] font-semibold text-structure border border-structure/15">
              {trek.category}
            </span>
            <span className="rounded-full bg-structure/5 px-3 py-1 text-[11px] font-medium text-structure/80 border border-structure/10">
              {trek.region}
            </span>
            <span className={`rounded-full px-3 py-1 text-[11px] border ${getDifficultyBadge(trek.difficulty)}`}>
              Difficulté {difficultyLabels[trek.difficulty] || trek.difficulty}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-structure tracking-tight leading-tight">
            {trek.title}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-structure/70 max-w-4xl leading-relaxed">
            {trek.description}
          </p>
        </div>

        {/* Cover Image */}
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-8 shadow-card border border-structure/10">
          <Image
            src={trek.images[0] || "/treks/placeholder.webp"}
            alt={trek.title}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
            priority={true}
            quality={80}
            placeholder="blur"
            blurDataURL={getBlurData(trek.images[0])}
          />
        </div>

        {/* Key Information Ribbon */}
        <div className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-2xl bg-canvas-pure p-6 shadow-card border border-structure/10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-structure/5 text-structure">
              <Clock className="h-5 w-5 text-structure/70" />
            </div>
            <div>
              <span className="text-[10px] uppercase text-structure/50 tracking-widest font-semibold block">Durée</span>
              <p className="text-sm font-bold text-structure">{trek.duration} {trek.duration > 1 ? "Jours" : "Jour"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-structure/5 text-structure">
              <Layers className="h-5 w-5 text-structure/70" />
            </div>
            <div>
              <span className="text-[10px] uppercase text-structure/50 tracking-widest font-semibold block">Difficulté</span>
              <p className="text-sm font-bold text-structure">{difficultyLabels[trek.difficulty] || trek.difficulty}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-structure/5 text-structure">
              <MapPin className="h-5 w-5 text-structure/70" />
            </div>
            <div>
              <span className="text-[10px] uppercase text-structure/50 tracking-widest font-semibold block">Région</span>
              <p className="text-sm font-bold text-structure">{trek.region}</p>
            </div>
          </div>
        </div>

        {/* Content & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* MDX Body Content */}
            <div className="bg-canvas-pure p-8 rounded-2xl border border-structure/10 shadow-card">
              <MDXContent source={trek.content} />
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Included */}
              <div className="rounded-2xl bg-canvas-pure p-6 border border-structure/10 shadow-card">
                <h3 className="text-sm font-bold text-structure mb-4 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  Ce qui est inclus
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-structure/75">
                  {trek.included.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-structure shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Not Included */}
              <div className="rounded-2xl bg-canvas-pure p-6 border border-structure/10 shadow-card">
                <h3 className="text-sm font-bold text-structure/70 mb-4 flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-structure/40" />
                  Ce qui n&apos;est pas inclus
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-structure/60">
                  {trek.notIncluded.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-structure/40 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar / WhatsApp CTA */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <TrekWhatsAppCTA
                trekTitle={trek.title}
                trekDuration={trek.duration}
                trekPrice={trek.price}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky WhatsApp button — mobile only */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 md:hidden z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-white font-medium shadow-2xl hover:bg-[#1DA851] transition-colors"
      >
        <MessageCircle size={20} />
        Réserver
      </a>
    </div>
  );
}
