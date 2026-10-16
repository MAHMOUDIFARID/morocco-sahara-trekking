"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, Images, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getBlurData } from "@/lib/blurData";
import type { TravelPhoto } from "@/types";

export default function TravelAlbum({ photos }: { photos: TravelPhoto[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(5);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = activeIndex !== null;
  const activePhoto = activeIndex === null ? null : photos[activeIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!isOpen) {
      if (dialog.open) dialog.close();
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  function changePhoto(direction: number) {
    setActiveIndex((current) =>
      current === null ? null : (current + direction + photos.length) % photos.length
    );
  }

  if (photos.length === 0) return null;

  return (
    <section
      id="album"
      aria-labelledby="album-title"
      className="mx-auto w-full max-w-[1248px] px-6 pb-20 md:pb-28"
    >
      <div className="mb-10 flex flex-col items-start gap-6 sm:flex-row sm:justify-between md:mb-12">
        <div>
          <h2
            id="album-title"
            className="font-display text-3xl font-medium leading-tight tracking-tight text-[#1C1917] md:text-4xl lg:text-5xl"
          >
            Le Maroc, au fil des pas.
          </h2>
          <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-[#625C55]">
            Des sentiers de l’Atlas aux dunes du Sahara, {photos.length} photos de nos voyages.
          </p>
        </div>
        <button
          type="button"
          aria-haspopup="dialog"
          aria-controls="travel-album-dialog"
          onClick={() => setActiveIndex(0)}
          className="site-button border border-[#1C1917]/20 text-[#1C1917] sm:mt-1 lg:mt-2"
        >
          <Images aria-hidden="true" />
          Voir l’album
        </button>
      </div>

      <div className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[210px] sm:gap-4 lg:grid-cols-4">
        {photos.slice(0, visibleCount).map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Agrandir la photo : ${photo.alt}`}
            aria-haspopup="dialog"
            aria-controls="travel-album-dialog"
            className={`relative isolate overflow-hidden rounded-2xl bg-[#E4DDD4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C0462F] ${
              index === 0 ? "col-span-2 row-span-2" : ""
            }`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={index === 0 ? "(max-width: 1023px) 100vw, 50vw" : "(max-width: 1023px) 50vw, 25vw"}
              className="object-cover"
              quality={80}
              placeholder="blur"
              blurDataURL={getBlurData(photo.src)}
            />
            <span
              aria-hidden="true"
              className="site-icon-button pointer-events-none absolute bottom-3 right-3 bg-black/35 text-white backdrop-blur-sm"
            >
              <Expand size={16} />
            </span>
          </button>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <p className="text-sm tabular-nums text-[#625C55]" aria-live="polite">
          {Math.min(visibleCount, photos.length)} / {photos.length} photos
        </p>
        {visibleCount < photos.length && (
          <button
            type="button"
            onClick={() => setVisibleCount((count) => Math.min(count + 12, photos.length))}
            className="site-button border border-[#1C1917]/20 text-[#1C1917]"
          >
            Voir plus de photos
          </button>
        )}
      </div>

      <dialog
        id="travel-album-dialog"
        ref={dialogRef}
        aria-labelledby="album-dialog-title"
        onClose={() => setActiveIndex(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setActiveIndex(null);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            changePhoto(event.key === "ArrowLeft" ? -1 : 1);
          } else if (event.key === "Home" || event.key === "End") {
            event.preventDefault();
            setActiveIndex(event.key === "Home" ? 0 : photos.length - 1);
          }
        }}
        className="fixed inset-0 m-0 h-[100dvh] max-h-none w-screen max-w-none border-0 bg-[#111111]/95 p-4 text-white backdrop:bg-black/70 sm:p-6"
      >
        <div className="mx-auto flex h-full max-w-7xl flex-col">
          <div className="flex shrink-0 items-center justify-between gap-4">
            <h3 id="album-dialog-title" className="text-sm font-medium">
              L’album des voyages
            </h3>
            <button
              type="button"
              aria-label="Fermer l’album"
              onClick={() => setActiveIndex(null)}
              className="site-icon-button border border-white/20 bg-white/10 text-white"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          {activePhoto && (
            <figure className="mt-4 flex min-h-0 flex-1 flex-col">
              <div className="relative min-h-0 flex-1">
                <Image
                  key={activePhoto.src}
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  fill
                  sizes="100vw"
                  quality={85}
                  className="object-contain"
                />
              </div>
              <figcaption className="mt-4 text-center text-sm leading-relaxed text-white/75" aria-live="polite">
                {activePhoto.alt}
              </figcaption>
            </figure>
          )}

          <div className="mt-4 flex shrink-0 items-center justify-center gap-5">
            <button
              type="button"
              aria-label="Photo précédente"
              onClick={() => changePhoto(-1)}
              className="site-icon-button border border-white/20 bg-white/10 text-white"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <span className="min-w-[4rem] text-center text-sm tabular-nums text-white/75" aria-live="polite">
              {activeIndex === null ? 0 : activeIndex + 1} / {photos.length}
            </span>
            <button
              type="button"
              aria-label="Photo suivante"
              onClick={() => changePhoto(1)}
              className="site-icon-button border border-white/20 bg-white/10 text-white"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </dialog>
    </section>
  );
}
