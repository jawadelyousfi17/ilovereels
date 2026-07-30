import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/tools";
import { absoluteUrl } from "@/lib/site";

const CONTENT_PAGES: { path: string; priority: number }[] = [
  { path: "/how-to-download-instagram-reels", priority: 0.8 },
  { path: "/about", priority: 0.5 },
  { path: "/contact", priority: 0.4 },
  { path: "/copyright", priority: 0.4 },
  { path: "/privacy-policy", priority: 0.3 },
  { path: "/terms-of-service", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...TOOLS.map((tool) => ({
      url: absoluteUrl(tool.path),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: tool.path === "/" ? 1 : 0.9,
    })),
    ...CONTENT_PAGES.map((page) => ({
      url: absoluteUrl(page.path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: page.priority,
    })),
  ];
}
