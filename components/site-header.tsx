import Link from "next/link";
import Image from "next/image";
import { TOOLS } from "@/lib/tools";
import { SITE } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-200/70 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-ink-950/80">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          aria-label={`${SITE.name} home`}
          className="shrink-0 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
        >
          <Image
            src="/logo-wordmark.png"
            alt={SITE.name}
            width={919}
            height={570}
            sizes="60px"
            priority
            /* The wordmark is black artwork; invert plus a hue flip turns it
               white in dark mode while keeping the heart red. */
            className="h-8 w-auto sm:h-9 dark:invert dark:hue-rotate-180"
          />
        </Link>

        <nav aria-label="Downloader tools" className="min-w-0 flex-1">
          <ul className="flex items-center gap-1 overflow-x-auto text-sm font-semibold [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {TOOLS.map((tool) => (
              <li key={tool.path}>
                <Link
                  href={tool.path}
                  className="block whitespace-nowrap rounded-full px-3 py-1.5 muted transition hover:bg-ink-100 hover:text-ink-900 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  {tool.nav}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/how-to-download-instagram-reels"
          className="hidden shrink-0 rounded-full border border-ink-200 px-4 py-1.5 text-sm font-semibold transition hover:border-brand-400 hover:text-brand-600 md:block dark:border-white/15 dark:hover:border-brand-400"
        >
          Guide
        </Link>
      </div>
    </header>
  );
}
