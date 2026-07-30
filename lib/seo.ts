import type { Metadata } from "next";
import type { Tool } from "@/lib/tools";

/** Builds page metadata from a tool config so every page stays consistent. */
export function toolMetadata(tool: Tool): Metadata {
  return {
    // The home page keeps the layout's default title; the rest use the template.
    title: tool.path === "/" ? { absolute: tool.metaTitle } : tool.metaTitle,
    description: tool.metaDescription,
    keywords: tool.keywords,
    alternates: { canonical: tool.path },
    openGraph: {
      type: "website",
      url: tool.path,
      title: tool.metaTitle,
      description: tool.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: tool.metaTitle,
      description: tool.metaDescription,
    },
  };
}

/** Metadata for the plain content pages (about, legal, guide). */
export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: { type: "article", url: path, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}
