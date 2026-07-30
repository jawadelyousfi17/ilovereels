import Link from "next/link";

export function ProsePage({
  title,
  intro,
  updated,
  children,
}: {
  title: string;
  intro?: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <nav aria-label="Breadcrumb" className="text-sm muted">
        <Link href="/" className="transition hover:text-brand-600">
          Home
        </Link>
        <span className="mx-2 text-ink-300">/</span>
        <span aria-current="page">{title}</span>
      </nav>

      <h1 className="mt-5 text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
        {title}
      </h1>
      {intro && <p className="mt-5 text-lg leading-relaxed muted">{intro}</p>}
      {updated && (
        <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-ink-400">
          Last updated {updated}
        </p>
      )}

      <div className="mt-12 space-y-10">{children}</div>
    </article>
  );
}

export function Section({
  heading,
  id,
  children,
}: {
  heading: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id}>
      <h2 className="text-2xl font-extrabold tracking-tight">{heading}</h2>
      <div className="mt-4 space-y-4 leading-[1.75] muted">{children}</div>
    </section>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 pl-1">
      {items.map((item) => (
        <li key={item.slice(0, 40)} className="flex gap-3">
          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
