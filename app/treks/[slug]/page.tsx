import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowDown, ArrowUpRight, Check, Minus } from "lucide-react";
import { getAllTreks, getTrekBySlug } from "@/lib/mdx";
import MDXContent from "@/components/MDXContent";
import TrekGallery from "@/components/TrekGallery";
import TrekWhatsAppCTA, { getTrekWhatsAppUrl } from "@/components/TrekWhatsAppCTA";
import { getBlurData } from "@/lib/blurData";

interface TrekPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllTreks().map((trek) => ({ slug: trek.slug }));
}

export function generateMetadata({ params }: TrekPageProps): Metadata {
  const trek = getTrekBySlug(params.slug);
  if (!trek) return { title: "Trekk non trouvé | MOROCCO SAHARA TREKKING" };

  return {
    title: `${trek.title} | MOROCCO SAHARA TREKKING`,
    description: trek.description,
    openGraph: {
      title: trek.title,
      description: trek.description,
      images: trek.images?.length ? [trek.images[0]] : ["/logo.png"],
    },
  };
}

export default function TrekDetailPage({ params }: TrekPageProps) {
  const trek = getTrekBySlug(params.slug);
  if (!trek) notFound();

  const whatsappUrl = getTrekWhatsAppUrl(trek.title, trek.duration);
  const difficultyLabels: Record<string, string> = {
    Easy: "Facile", Moderate: "Modéré", Hard: "Difficile",
  };
  const coverImage = trek.images[0] || "/treks/placeholder.webp";

  return (
    <article className="mx-auto max-w-7xl px-6 pb-28 pt-7 sm:px-8 lg:pt-10">
      <nav aria-label="Fil d’Ariane">
        <Link href="/treks" className="inline-flex items-center gap-2 text-sm text-[#625C55]">
          <ArrowLeft size={14} aria-hidden="true" />
          Tous les treks
        </Link>
      </nav>

      <section aria-labelledby="trek-title" className="mt-9 grid items-center gap-9 lg:mt-12 lg:grid-cols-2 lg:gap-14 xl:gap-20">
        <div className="min-w-0">
          <p className="mb-5 text-sm text-[#625C55]">{trek.category}</p>
          <h1 id="trek-title" className="font-display text-4xl font-medium leading-[1.08] tracking-tight text-[#1C1917] sm:text-5xl lg:text-[2.75rem] xl:text-5xl">
            {trek.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#625C55]">{trek.description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-5">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="site-button hidden bg-[#1C1917] text-white lg:inline-flex">
              Parlons de ce trek
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a href="#programme" className="inline-flex items-center gap-2 text-sm font-medium text-[#1C1917] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              Voir le programme
              <ArrowDown size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
        <figure className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-[#E4DDD4] lg:aspect-[4/5] xl:aspect-[5/4]">
          <Image src={coverImage} alt={trek.title} fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" priority quality={85} placeholder="blur" blurDataURL={getBlurData(coverImage)} />
        </figure>
      </section>

      <dl className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4 border-y border-[#E4DDD4] py-6 text-sm text-[#625C55] lg:mt-14">
        <div>
          <dt className="sr-only">Durée</dt>
          <dd className="font-medium text-[#1C1917]">{trek.duration} {trek.duration > 1 ? "jours" : "jour"}</dd>
        </div>
        <div>
          <dt className="sr-only">Région</dt>
          <dd className="flex items-center gap-7"><span aria-hidden="true" className="text-[#B8ADA1]">·</span>{trek.region}</dd>
        </div>
        <div>
          <dt className="sr-only">Difficulté</dt>
          <dd className="flex items-center gap-7"><span aria-hidden="true" className="text-[#B8ADA1]">·</span>Niveau {(difficultyLabels[trek.difficulty] || trek.difficulty).toLowerCase()}</dd>
        </div>
      </dl>

      <div className="mt-14 grid items-start gap-14 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-20 xl:gap-28">
        <div className="min-w-0">
          <div>
            <MDXContent source={trek.content} />
          </div>

          <section aria-labelledby="practical-title" className="mt-16 border-t border-[#E4DDD4] pt-10">
            <h2 id="practical-title" className="font-display text-3xl font-medium tracking-tight">Les détails pratiques.</h2>
            <div className="mt-8 grid gap-10 sm:grid-cols-2">
              {[
                { title: "Ce qui est inclus", items: trek.included, icon: Check },
                { title: "Ce qui n’est pas inclus", items: trek.notIncluded, icon: Minus },
              ].map(({ title, items, icon: Icon }) => (
                <div key={title}>
                  <h3 className="font-display text-xl font-medium">{title}</h3>
                  <ul className="mt-5 space-y-4 text-sm leading-6 text-[#625C55]">
                    {items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Icon size={16} strokeWidth={1.5} aria-hidden="true" className="mt-1 shrink-0 text-[#625C55]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-10 border-t border-[#E4DDD4] pt-6">
              <h3 className="font-display text-xl font-medium">Point de rendez-vous</h3>
              <p className="mt-3 text-sm leading-6 text-[#625C55]">{trek.meetingPoint}</p>
            </div>
          </section>
        </div>

        <aside aria-label="Préparer ce trek avec Mohamed" className="lg:sticky lg:top-28">
          <TrekWhatsAppCTA trekTitle={trek.title} trekDuration={trek.duration} />
        </aside>
      </div>

      {trek.images.length > 0 && <TrekGallery images={trek.images} title={trek.title} />}

      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="site-button fixed bottom-6 left-6 z-50 bg-[#1C1917] text-white lg:hidden">
        Parlons de ce trek
        <ArrowUpRight aria-hidden="true" />
      </a>
    </article>
  );
}
