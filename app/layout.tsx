import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "iLoveReels — Instagram Reels Downloader in HD, Free & No Login",
    template: "%s | iLoveReels",
  },
  description:
    "Paste any public Instagram Reel, post, or carousel link and save the original HD file in seconds. No account, no watermark, no app install — works on iPhone, Android, and desktop.",
  applicationName: SITE.name,
  keywords: [
    "instagram reels downloader",
    "download instagram reels",
    "instagram video downloader",
    "save instagram reels",
    "instagram reel to mp4",
    "instagram photo downloader",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    url: SITE.url,
    title: "iLoveReels — Instagram Reels Downloader in HD, Free & No Login",
    description:
      "Paste a Reel link, get the original file. Free, no watermark, no sign-up, works on every device.",
  },
  twitter: {
    card: "summary_large_image",
    title: "iLoveReels — Instagram Reels Downloader",
    description:
      "Paste a Reel link, get the original file. Free, no watermark, no sign-up.",
    creator: SITE.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b13" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
