export const SITE = {
  name: "iLoveReels",
  domain: "ilovereels.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ilovereels.com",
  tagline: "Instagram Reels Downloader",
  email: "hello@ilovereels.com",
  twitter: "@ilovereels",
  founded: "2024",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, SITE.url).toString();
}
