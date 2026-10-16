import fs from "fs";
import path from "path";
import { createHash } from "crypto";
import type { TravelPhoto } from "@/types";

const featuredPhotos: Record<number, string> = {
  1: "Bivouac près des palmiers dans le désert",
  37: "Randonnée en groupe entre les falaises des gorges",
  60: "Randonnée en groupe sur les hauts plateaux",
  73: "Champs de coquelicots au pied des montagnes",
  34: "Un repas partagé en plein air pendant le trek",
  7: "Marche avec les dromadaires dans les dunes du Sahara",
  82: "Un plat coloré préparé pendant le voyage",
  101: "Villages de terre et jardins dans la vallée",
  97: "Traversée d’une rivière à pied entre les rochers",
  107: "Panorama sur les montagnes et leurs sommets enneigés",
};

const featuredOrder = [1, 37, 60, 73, 34, 7, 82, 101, 97, 107];

export function getTravelPhotos(): TravelPhoto[] {
  const directory = path.join(process.cwd(), "public", "treks");
  // The numbered JPEGs are the originals. The trek-specific WebPs are copies
  // generated from these files by scripts/pick-images.js.
  const originals = fs.readdirSync(directory)
    .filter((file) => /^Treks \(\d+\)\.jpe?g$/i.test(file))
    .sort((a, b) => a.localeCompare(b, "fr", { numeric: true }));
  const seen = new Set<string>();
  const photos = originals.flatMap((file) => {
    const hash = createHash("sha256").update(fs.readFileSync(path.join(directory, file))).digest("hex");
    if (seen.has(hash)) return [];
    seen.add(hash);

    const number = Number(file.match(/\((\d+)\)/)?.[1]);
    return [{
      number,
      src: `/treks/${file}`,
      alt: featuredPhotos[number] || `Souvenir de trek au Maroc — photo ${number}`,
    }];
  });

  return photos.sort((a, b) => {
    const aPosition = featuredOrder.indexOf(a.number);
    const bPosition = featuredOrder.indexOf(b.number);
    return (aPosition < 0 ? featuredOrder.length : aPosition) -
      (bPosition < 0 ? featuredOrder.length : bPosition) || a.number - b.number;
  }).map(({ src, alt }) => ({ src, alt }));
}
