import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Trek, TrekFrontmatter, Region, RegionFrontmatter, Guide, GuideFrontmatter } from "@/types";

const contentDirectory = path.join(process.cwd(), "content");
const treksDirectory = path.join(contentDirectory, "treks");
const regionsDirectory = path.join(contentDirectory, "regions");
const guidesDirectory = path.join(contentDirectory, "guides");

function getMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs.readdirSync(dir).filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));
}

/* ================= TREKS ================= */

export function getAllTreks(): Trek[] {
  const files = getMdxFiles(treksDirectory);

  const treks = files.map((fileName) => {
    const filePath = path.join(treksDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    const fallbackSlug = fileName.replace(/\.mdx?$/, "");

    const frontmatter = data as TrekFrontmatter;

    return {
      title: frontmatter.title || fallbackSlug,
      slug: frontmatter.slug || fallbackSlug,
      description: frontmatter.description || "",
      difficulty: frontmatter.difficulty || "Moderate",
      duration: Number(frontmatter.duration) || 1,
      region: frontmatter.region || "Haut Atlas",
      category: frontmatter.category || "Trek & Randonnée",
      images: frontmatter.images || ["/treks/placeholder.webp"],
      coordinates: frontmatter.coordinates || { lat: 31.68, lng: -6.45 },
      meetingPoint: frontmatter.meetingPoint || "Marrakech",
      included: frontmatter.included || [],
      notIncluded: frontmatter.notIncluded || [],
      featured: Boolean(frontmatter.featured),
      order: frontmatter.order !== undefined ? Number(frontmatter.order) : 999,
      content,
    } as Trek;
  });

  // Sort by explicit order if provided, else featured first, then duration
  return treks.sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined && a.order !== b.order) {
      return a.order - b.order;
    }
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.duration - b.duration;
  });
}

export function getTrekBySlug(slug: string): Trek | null {
  const treks = getAllTreks();
  const trek = treks.find((t) => t.slug === slug);
  return trek || null;
}

export function getFeaturedTreks(): Trek[] {
  const treks = getAllTreks();
  return treks.filter((trek) => trek.featured);
}

/* ================= REGIONS ================= */

export function getAllRegions(): Region[] {
  const files = getMdxFiles(regionsDirectory);

  const regions = files.map((fileName) => {
    const filePath = path.join(regionsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    const fallbackSlug = fileName.replace(/\.mdx?$/, "");

    const frontmatter = data as RegionFrontmatter;

    return {
      name: frontmatter.name || fallbackSlug,
      slug: frontmatter.slug || fallbackSlug,
      title: frontmatter.title || frontmatter.name || fallbackSlug,
      description: frontmatter.description || "",
      heroImage: frontmatter.heroImage || "/images/regions/merzouga.jpg",
      highlights: frontmatter.highlights || [],
      bestTimeToVisit: frontmatter.bestTimeToVisit || "Octobre à Avril",
      coordinates: frontmatter.coordinates || { lat: 31.0996, lng: -4.0125 },
      distanceFromMarrakech: frontmatter.distanceFromMarrakech || "560 km",
      content,
    } as Region;
  });

  return regions;
}

export function getRegionBySlug(slug: string): Region | null {
  const regions = getAllRegions();
  return regions.find((r) => r.slug === slug) || null;
}

/* ================= GUIDES ================= */

export function getAllGuides(): Guide[] {
  const files = getMdxFiles(guidesDirectory);

  const guides = files.map((fileName) => {
    const filePath = path.join(guidesDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    const fallbackSlug = fileName.replace(/\.mdx?$/, "");

    const frontmatter = data as GuideFrontmatter;

    return {
      name: frontmatter.name || fallbackSlug,
      slug: frontmatter.slug || fallbackSlug,
      role: frontmatter.role || "Guide Référent d'Expéditions Sahariennes",
      languages: frontmatter.languages || ["Berbère (Tamazight)", "Arabe", "Français", "Anglais"],
      experienceYears: Number(frontmatter.experienceYears) || 10,
      bio: frontmatter.bio || "",
      avatar: frontmatter.avatar || "/images/guides/brahim.jpg",
      specialties: frontmatter.specialties || ["Expéditions Erg Chegaga", "Caravanes de dromadaires"],
      origin: frontmatter.origin || "M'hamid El Ghizlane",
      content,
    } as Guide;
  });

  return guides;
}

export function getGuideBySlug(slug: string): Guide | null {
  const guides = getAllGuides();
  return guides.find((g) => g.slug === slug) || null;
}
