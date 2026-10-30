import type { MetadataRoute } from "next";
import { getAllTreks } from "@/lib/mdx";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/treks", "/guide", "/faq", "/contact", "/a-propos"];
  return [...pages, ...getAllTreks().map((trek) => `/treks/${trek.slug}`)].map((path) => ({
    url: `${SITE_URL}${path}`,
  }));
}
