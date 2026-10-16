import fs from "fs";
import path from "path";
import { createHash } from "crypto";
import type { TravelPhoto } from "@/types";

const photoTitles: Record<number, string> = {
  1: "Bivouac près des palmiers dans le désert",
  2: "Les pâturages s’étendent au pied des collines",
  3: "Les dromadaires au repos près du campement",
  4: "Les préparatifs de la caravane dans le désert",
  5: "Le chargement des dromadaires avant le départ",
  6: "À pied sur les pistes du désert",
  7: "Marche avec les dromadaires dans les dunes du Sahara",
  8: "Une tente au creux des dunes",
  9: "Le bivouac s’illumine à la tombée du jour",
  10: "Une soirée à la lumière des bougies",
  11: "Les lumières du camp dans le désert",
  12: "Un souvenir de groupe dans les ruelles de pierre",
  13: "À la découverte des passages de l’ancien village",
  14: "Les braises d’une pause en chemin",
  15: "La marche entre les murs de terre",
  16: "Le groupe réuni au cœur du village",
  17: "Un passage à l’ombre des voûtes de pierre",
  18: "Un palmier au milieu des paysages rocheux",
  19: "Une halte au pied des rochers",
  20: "Les ruelles ocre sous le ciel bleu",
  21: "Les rochers peints au milieu du paysage minéral",
  22: "Sur le chemin des rochers colorés",
  23: "Une piste de terre vers les rochers peints",
  24: "Le paysage s’ouvre sur les rochers colorés",
  25: "La marche au pied des blocs de granit peints",
  26: "Un horizon de collines et de rochers",
  27: "Une halte à l’entrée du site des rochers peints",
  28: "Une promenade à l’ombre de la palmeraie",
  29: "Une pause en groupe dans un jardin du village",
  30: "Au fil des chemins du village",
  31: "Les courbes de la vallée sous le ciel bleu",
  32: "Le groupe devant les rochers aux couleurs vives",
  33: "La traversée d’un oued au pied des falaises",
  34: "Un repas partagé en plein air pendant le trek",
  35: "Bivouac sur un plateau sous les nuages",
  36: "Au campement, entre deux étapes",
  37: "Randonnée en groupe entre les falaises des gorges",
  38: "Un troupeau dans les pâturages d’altitude",
  39: "Un sentier domine la vallée verdoyante",
  40: "La descente dans un passage rocheux",
  41: "Le campement au creux d’une vallée",
  42: "Une halte face aux tentes du bivouac",
  43: "Les retrouvailles au camp de la vallée",
  44: "Une soirée près des tentes illuminées",
  45: "Les voyageurs réunis à la nuit tombée",
  46: "Le bivouac brille au fond de la vallée",
  47: "Le groupe au retour de la randonnée",
  48: "En chemin dans une gorge étroite",
  49: "Un souvenir au cœur des parois rocheuses",
  50: "La marche le long du lit de l’oued",
  51: "Les grandes tentes au milieu des reliefs ocre",
  52: "Les lumières d’une soirée au campement",
  53: "Un pas après l’autre sur la crête enneigée",
  54: "Un bivouac discret au pied des falaises",
  55: "La traversée des gorges, les pieds dans l’eau",
  56: "Les randonneurs avancent sur les terres rouges",
  57: "Le groupe sur un sentier verdoyant",
  58: "La joie de se retrouver au sommet",
  59: "Un bivouac entre village et pâturages",
  60: "Randonnée en groupe sur les hauts plateaux",
  61: "La caravane avance à travers le désert",
  62: "La ligne des crêtes saupoudrées de neige",
  63: "Sur les pistes de terre du trek",
  64: "Les tentes installées au pied des falaises",
  65: "Un troupeau aux abords du bivouac",
  66: "Au sommet d’une dune orangée",
  67: "Le campement baigné de soleil",
  68: "Une pause en groupe devant la cascade",
  69: "L’arrivée au bivouac de la vallée",
  70: "La caravane dessine sa trace dans le sable",
  71: "Une nuit au pied des reliefs ocre",
  72: "Les pieds dans l’eau entre les falaises",
  73: "Champs de coquelicots au pied des montagnes",
  74: "Le sentier serpente entre les rochers",
  75: "Champs de coquelicots au pied des montagnes",
  76: "Le sommet du Toubkal sous le ciel bleu",
  77: "Les coquelicots bordent les chemins de la vallée",
  78: "Les gestes du quotidien au campement",
  79: "Le groupe réuni au sommet du Toubkal",
  80: "Les rosiers en fleurs le long du chemin",
  81: "Le repère du sommet du Toubkal",
  82: "Un plat coloré préparé pendant le voyage",
  83: "Un tapis de coquelicots au pied des falaises",
  84: "Un sourire au sommet du Toubkal",
  85: "Un arbre solitaire face aux sommets",
  86: "Une halte au village entre deux étapes",
  87: "L’architecture de terre sous le ciel bleu",
  88: "À pied dans un canyon aux parois ocre",
  89: "Les cultures en terrasses au pied des crêtes",
  90: "Un sentier entre les cultures et les montagnes",
  91: "Une vallée verdoyante entre les parois rocheuses",
  92: "Un souvenir partagé sur le sentier",
  93: "L’arrivée au campement des hauts plateaux",
  94: "Les mules de bât sur un sentier ombragé",
  95: "En file indienne dans un passage rocheux",
  96: "Des sourires au bord de l’oued",
  97: "Traversée d’une rivière à pied entre les rochers",
  98: "Le déjeuner se partage face aux montagnes",
  99: "Le portage des bagages à dos de mule",
  100: "Les mules chargées sur la piste du village",
  101: "Villages de terre et jardins dans la vallée",
  102: "Au pied des kasbahs et des falaises ocre",
  103: "Le groupe suit le lit de la rivière",
  104: "Des tentes vertes au milieu des pâturages",
  105: "Un bivouac au calme dans les hautes herbes",
  106: "Le campement blotti au pied des collines",
  107: "Panorama sur les montagnes et leurs sommets enneigés",
  108: "L’immensité des plateaux sous le ciel bleu",
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
      alt: photoTitles[number] || "Sur les sentiers du Maroc",
    }];
  });

  return photos.sort((a, b) => {
    const aPosition = featuredOrder.indexOf(a.number);
    const bPosition = featuredOrder.indexOf(b.number);
    return (aPosition < 0 ? featuredOrder.length : aPosition) -
      (bPosition < 0 ? featuredOrder.length : bPosition) || a.number - b.number;
  }).map(({ src, alt }) => ({ src, alt }));
}
