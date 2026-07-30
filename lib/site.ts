export const SITE = {
  name: "iLoveReels",
  domain: "www.ilovereels.site",
  // An empty env var (set-but-blank) must fall through too, or every absolute
  // URL we build throws ERR_INVALID_URL.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.ilovereels.site",
  tagline: "Instagram Reels Downloader",
  email: "hello@ilovereels.site",
  twitter: "@ilovereels",
  founded: "2024",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, SITE.url).toString();
}
