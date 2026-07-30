import Link from "next/link";
import Image from "next/image";
import { TOOLS } from "@/lib/tools";
import { SITE } from "@/lib/site";

const COMPANY = [
  { href: "/about", label: "About" },
  { href: "/how-to-download-instagram-reels", label: "How-to guide" },
  { href: "/contact", label: "Contact" },
];

const LEGAL = [
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/terms-of-service", label: "Terms of service" },
  { href: "/copyright", label: "Copyright & DMCA" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-ink-200/70 bg-ink-50/60 dark:border-white/10 dark:bg-white/[0.02]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Image
              src="/logo-wordmark.png"
              alt={SITE.name}
              width={919}
              height={570}
              sizes="60px"
              className="h-9 w-auto dark:invert dark:hue-rotate-180"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed muted">
              A fast, honest way to keep a personal copy of public Instagram media. No
              account, no watermark, no record of what you saved.
            </p>
          </div>

          <FooterColumn title="Downloaders">
            {TOOLS.map((tool) => (
              <FooterLink key={tool.path} href={tool.path}>
                {tool.name.replace("Instagram ", "")}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Site">
            {COMPANY.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Legal">
            {LEGAL.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>
        </div>

        <div className="mt-12 border-t border-ink-200/70 pt-6 dark:border-white/10">
          <p className="text-xs leading-relaxed muted">
            {SITE.name} is an independent tool and is not affiliated with, endorsed by, or
            connected to Instagram or Meta Platforms, Inc. All trademarks belong to their
            respective owners. Downloaded media remains the property of the account that
            published it — please respect creators and copyright law.
          </p>
          <p className="mt-4 text-xs muted">
            © {new Date().getFullYear()} {SITE.name}. Made for people who just wanted to
            keep the video.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-widest text-ink-400">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="muted transition hover:text-brand-600 dark:hover:text-brand-400"
      >
        {children}
      </Link>
    </li>
  );
}
