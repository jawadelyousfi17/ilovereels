import Link from "next/link";
import { TOOLS } from "@/lib/tools";

export default function NotFound() {
  return (
    <section className="aurora">
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <p className="text-7xl font-extrabold gradient-text">404</p>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
          This page went the way of an unsaved Reel
        </h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed muted">
          The address does not match anything here. If you were trying to download
          something, one of these will get you there.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-2.5">
          {TOOLS.map((tool) => (
            <Link
              key={tool.path}
              href={tool.path}
              className="surface px-4 py-2 text-sm font-semibold transition hover:border-brand-300 hover:text-brand-600"
            >
              {tool.nav}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
