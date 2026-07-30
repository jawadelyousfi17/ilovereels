import Link from "next/link";
import { Downloader } from "@/components/downloader";
import { Icon } from "@/components/icons";
import { ToolSchema } from "@/components/structured-data";
import { otherTools, type Tool } from "@/lib/tools";

export function ToolPage({ tool }: { tool: Tool }) {
  return (
    <>
      <ToolSchema tool={tool} />
      <Hero tool={tool} />
      <Features tool={tool} />
      <HowItWorks tool={tool} />
      <Prose tool={tool} />
      <Specs tool={tool} />
      <Faqs tool={tool} />
      <OtherTools tool={tool} />
    </>
  );
}

function Hero({ tool }: { tool: Tool }) {
  return (
    <section className="pb-10">
      <Downloader tool={tool}>
        <h1 className="text-balance text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl">
          {tool.h1}
        </h1>
        <p className="mt-2.5 text-pretty text-sm leading-relaxed text-white/75 sm:text-[15px]">
          {tool.lead}
        </p>
      </Downloader>
    </section>
  );
}

function Features({ tool }: { tool: Tool }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {tool.features.map((feature) => (
          <article key={feature.title} className="surface p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-grape/12 via-brand-500/12 to-sun/12 text-brand-600 dark:text-brand-400">
              <Icon name={feature.icon} />
            </div>
            <h2 className="mt-4 text-base font-bold leading-snug">{feature.title}</h2>
            <p className="mt-2 text-sm leading-relaxed muted">{feature.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HowItWorks({ tool }: { tool: Tool }) {
  return (
    <section
      id="how-it-works"
      className="border-y border-ink-200/70 bg-ink-50/60 py-16 dark:border-white/10 dark:bg-white/[0.02]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-extrabold tracking-tight">
          Three steps, about twenty seconds
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center leading-relaxed muted">
          Nothing to install and nothing to sign up for. If you can copy a link, you can
          do this.
        </p>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {tool.steps.map((step, index) => (
            <li key={step.title} className="relative">
              <span className="text-5xl font-extrabold leading-none gradient-text">
                {index + 1}
              </span>
              <h3 className="mt-3 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Prose({ tool }: { tool: Tool }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="space-y-14">
        {tool.sections.map((section) => (
          <article key={section.heading}>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              {section.heading}
            </h2>
            <div className="mt-4 space-y-4">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="leading-[1.75] muted">
                  {paragraph}
                </p>
              ))}
            </div>
            {section.bullets && (
              <ul className="mt-6 space-y-4">
                {section.bullets.map((bullet) => (
                  <li
                    key={bullet.title}
                    className="rounded-2xl border-l-2 border-brand-400 bg-ink-50/70 py-3 pl-5 pr-4 dark:bg-white/[0.03]"
                  >
                    <h3 className="font-bold">{bullet.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed muted">{bullet.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function Specs({ tool }: { tool: Tool }) {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
      <div className="surface overflow-hidden">
        <h2 className="border-b border-ink-200/70 px-6 py-4 text-lg font-bold dark:border-white/10">
          What you actually get
        </h2>
        <dl className="divide-y divide-ink-200/70 text-sm dark:divide-white/10">
          {tool.specs.map((spec) => (
            <div key={spec.label} className="flex gap-4 px-6 py-3.5">
              <dt className="w-40 shrink-0 font-semibold muted">{spec.label}</dt>
              <dd className="font-semibold">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Faqs({ tool }: { tool: Tool }) {
  return (
    <section
      id="faq"
      className="border-t border-ink-200/70 bg-ink-50/60 py-16 dark:border-white/10 dark:bg-white/[0.02]"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-3xl font-extrabold tracking-tight">
          Questions people actually ask
        </h2>
        <div className="mt-8 space-y-3">
          {tool.faqs.map((faq) => (
            <details
              key={faq.q}
              className="group surface overflow-hidden [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 font-bold">
                {faq.q}
                <span className="shrink-0 text-xl text-brand-500 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="px-5 pb-5 leading-relaxed muted">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function OtherTools({ tool }: { tool: Tool }) {
  const others = otherTools(tool.path);
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="text-2xl font-extrabold tracking-tight">The rest of the toolkit</h2>
      <p className="mt-2 muted">
        Same approach, different kind of post. All free, all without an account.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {others.map((other) => (
          <Link
            key={other.path}
            href={other.path}
            className="surface group p-5 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
          >
            <h3 className="font-bold transition group-hover:text-brand-600 dark:group-hover:text-brand-400">
              {other.name}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed muted">{other.lead.split(".")[0]}.</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
