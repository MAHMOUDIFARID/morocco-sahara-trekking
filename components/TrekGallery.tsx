"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { getBlurData } from "@/lib/blurData";

interface TrekGalleryProps {
  images: string[];
  title: string;
}

export default function TrekGallery({ images, title }: TrekGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = activeIndex !== null;

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
    setActiveIndex((current) => current === null ? null : (current + direction + images.length) % images.length);
  }

  return (
    <section id="photos" aria-labelledby="trek-gallery-title" className="mt-16 scroll-mt-28 border-t border-[#E4DDD4] pt-10 lg:mt-24">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
        <h2 id="trek-gallery-title" className="font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">Un aperçu du voyage.</h2>
        <p className="text-sm text-[#625C55]">{images.length} {images.length > 1 ? "photos" : "photo"}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, index) => (
          <button key={`${src}-${index}`} type="button" aria-label={`Agrandir la photo ${index + 1} : ${title}`} aria-haspopup="dialog" aria-controls="trek-gallery-dialog" onClick={() => setActiveIndex(index)} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#E4DDD4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
            <Image src={src} alt={`${title} — photo ${index + 1}`} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" quality={80} className="object-cover" placeholder="blur" blurDataURL={getBlurData(src)} />
            <span aria-hidden="true" className="site-icon-button absolute bottom-3 right-3 bg-black/35 text-white backdrop-blur-sm"><ArrowUpRight size={18} /></span>
          </button>
        ))}
      </div>

      <dialog id="trek-gallery-dialog" ref={dialogRef} aria-labelledby="trek-gallery-dialog-title" onClose={() => setActiveIndex(null)} onClick={(event) => {
        if (event.target === event.currentTarget) setActiveIndex(null);
      }} onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          changePhoto(event.key === "ArrowLeft" ? -1 : 1);
        }
      }} className="fixed inset-0 m-0 h-[100dvh] max-h-none w-screen max-w-none border-0 bg-[#111111]/95 p-4 text-white backdrop:bg-black/70 sm:p-6">
        <div className="mx-auto flex h-full max-w-7xl flex-col">
          <div className="flex shrink-0 items-start justify-between gap-5">
            <h3 id="trek-gallery-dialog-title" className="max-w-2xl pt-2 text-sm font-medium leading-6">{title}</h3>
            <button type="button" aria-label="Fermer les photos" onClick={() => setActiveIndex(null)} className="site-icon-button border border-white/20 bg-white/10 text-white"><X size={20} aria-hidden="true" /></button>
          </div>
          {activeIndex !== null && (
            <div className="relative my-5 min-h-0 flex-1">
              <Image key={images[activeIndex]} src={images[activeIndex]} alt={`${title} — photo ${activeIndex + 1}`} fill sizes="100vw" quality={85} className="object-contain" />
            </div>
          )}
          <div className="flex shrink-0 items-center justify-center gap-5">
            <button type="button" aria-label="Photo précédente" disabled={images.length < 2} onClick={() => changePhoto(-1)} className="site-icon-button border border-white/20 bg-white/10 text-white disabled:opacity-30"><ChevronLeft size={20} aria-hidden="true" /></button>
            <span className="min-w-16 text-center text-sm tabular-nums text-white/75" aria-live="polite">{activeIndex === null ? 0 : activeIndex + 1} / {images.length}</span>
            <button type="button" aria-label="Photo suivante" disabled={images.length < 2} onClick={() => changePhoto(1)} className="site-icon-button border border-white/20 bg-white/10 text-white disabled:opacity-30"><ChevronRight size={20} aria-hidden="true" /></button>
          </div>
        </div>
      </dialog>
    </section>
  );
}
