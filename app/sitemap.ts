import type { MetadataRoute } from "next";
import { getAllTreks } from "@/lib/mdx";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/treks", "/regions", "/guide", "/faq", "/contact", "/a-propos"];
  return [...pages, ...getAllTreks().map((trek) => `/treks/${trek.slug}`)].map((path) => ({
    url: `${SITE_URL}${path}`,
  }));
}
