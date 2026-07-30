import { SITE, absoluteUrl } from "@/lib/site";
import type { Tool } from "@/lib/tools";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Organization + WebSite, emitted once on the home page. */
export function SiteSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": absoluteUrl("/#organization"),
            name: SITE.name,
            url: SITE.url,
            email: SITE.email,
            description:
              "A free browser tool for saving public Instagram media without an account, an app, or an added watermark.",
          },
          {
            "@type": "WebSite",
            "@id": absoluteUrl("/#website"),
            url: SITE.url,
            name: SITE.name,
            publisher: { "@id": absoluteUrl("/#organization") },
            inLanguage: "en",
          },
        ],
      }}
    />
  );
}

/** WebApplication + HowTo + FAQPage + BreadcrumbList for a tool page. */
export function ToolSchema({ tool }: { tool: Tool }) {
  const url = absoluteUrl(tool.path);
  const isHome = tool.path === "/";

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      ...(isHome
        ? []
        : [{ "@type": "ListItem", position: 2, name: tool.name, item: url }]),
    ],
  };

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebApplication",
            "@id": `${url}#app`,
            name: tool.name,
            url,
            description: tool.metaDescription,
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Any browser — Windows, macOS, iOS, Android, Linux",
            browserRequirements: "Requires JavaScript",
            isAccessibleForFree: true,
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          },
          {
            "@type": "HowTo",
            name: `How to use the ${tool.name}`,
            description: tool.lead,
            totalTime: "PT1M",
            estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
            step: tool.steps.map((step, index) => ({
              "@type": "HowToStep",
              position: index + 1,
              name: step.title,
              text: step.body,
              url: `${url}#how-it-works`,
            })),
          },
          {
            "@type": "FAQPage",
            "@id": `${url}#faq`,
            mainEntity: tool.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          },
          breadcrumb,
        ],
      }}
    />
  );
}

/** Minimal Article + breadcrumb schema for the written guide. */
export function ArticleSchema({
  path,
  headline,
  description,
  datePublished,
}: {
  path: string;
  headline: string;
  description: string;
  datePublished: string;
}) {
  const url = absoluteUrl(path);
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Article",
            headline,
            description,
            datePublished,
            dateModified: datePublished,
            inLanguage: "en",
            mainEntityOfPage: url,
            author: { "@type": "Organization", name: SITE.name, url: SITE.url },
            publisher: { "@id": absoluteUrl("/#organization") },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
              { "@type": "ListItem", position: 2, name: headline, item: url },
            ],
          },
        ],
      }}
    />
  );
}
