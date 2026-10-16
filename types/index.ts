export type DifficultyLevel = "Easy" | "Moderate" | "Hard" | "Facile" | "Modéré" | "Difficile" | string;

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface TrekFrontmatter {
  title: string;
  slug: string;
  description: string;
  difficulty: DifficultyLevel;
  duration: number; // in days
  region: string;
  category: string;
  images: string[];
  coordinates: Coordinates;
  meetingPoint: string;
  included: string[];
  notIncluded: string[];
  featured: boolean;
  order?: number;
}

export interface Trek extends TrekFrontmatter {
  content: string;
}

export interface RegionFrontmatter {
  name: string;
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  highlights: string[];
  bestTimeToVisit: string;
  coordinates: Coordinates;
  distanceFromMarrakech?: string;
}

export interface Region extends RegionFrontmatter {
  content: string;
}

export interface GuideFrontmatter {
  name: string;
  slug: string;
  role: string;
  languages: string[];
  experienceYears: number;
  bio: string;
  avatar: string;
  specialties: string[];
  origin: string;
}

export interface Guide extends GuideFrontmatter {
  content: string;
}
