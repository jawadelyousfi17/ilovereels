import type { Metadata } from "next";
import { ProsePage, Section, Bullets } from "@/components/prose-page";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy policy",
  description:
    "What iLoveReels collects, what it does not, how long anything is kept, and the rights you have over it — written to be read, not skimmed.",
  path: "/privacy-policy",
});

export default function Page() {
  return (
    <ProsePage
      title="Privacy policy"
      intro="The short version: we have no accounts, so we hold almost nothing about you. The long version explains exactly what that means."
      updated="30 July 2026"
    >
      <Section heading="What we collect">
        <p>
          There is no sign-up on this site, which removes most of what a privacy policy
          usually has to account for. We never see your name, your email, or your Instagram
          credentials, because nothing here asks for them.
        </p>
        <Bullets
          items={[
            "The link you paste. It is used to look up the media for that post and is not written to any database. Once your request finishes, it is gone.",
            "Ordinary server logs. Like every web server, ours records requests — IP address, timestamp, page, user agent — to keep the service running and to spot abuse. These rotate automatically and are not used to build a profile of you.",
            "Aggregate usage counts. Which tool pages get used and how often requests succeed, in totals rather than per person, so we know what to fix.",
          ]}
        />
      </Section>

      <Section heading="What we do not collect">
        <Bullets
          items={[
            "Instagram passwords or login tokens — the tool does not use them and never will.",
            "A history of what you downloaded. There is no account to attach one to.",
            "Copies of the media itself. Files stream through to your browser; nothing is stored on our side afterwards.",
            "Anything sold or rented to data brokers. We do not have a data product, and this is not a business model we intend to adopt.",
          ]}
        />
      </Section>

      <Section heading="Cookies">
        <p>
          The site itself works without cookies for tracking purposes. If we later add
          advertising or privacy-respecting analytics, this section will name the provider
          and describe what it sets before it goes live, and you will get a consent choice
          where the law requires one.
        </p>
      </Section>

      <Section heading="Third parties in the request path">
        <p>
          Two are unavoidable in how the tool works, and you should know about both.
        </p>
        <Bullets
          items={[
            "Instagram and its content delivery network. Retrieving public media means asking their servers for it. Media previews load from their CDN directly to your browser, so they see that a request happened.",
            "A media lookup provider, which turns a post link into the direct file URLs. They receive the post identifier, not anything identifying you.",
            "Our hosting provider, which operates the servers and holds the standard access logs described above.",
          ]}
        />
      </Section>

      <Section heading="How long anything is kept">
        <p>
          Pasted links are held only for the life of the request. Server logs rotate on a
          short cycle, typically within thirty days. Aggregate counts contain no personal
          data and may be kept indefinitely because there is nothing in them to identify.
        </p>
      </Section>

      <Section heading="Children">
        <p>
          This site is not directed at children under 13, and we do not knowingly collect
          information from them. Since there are no accounts and no profile building, there
          is little to collect from anyone.
        </p>
      </Section>

      <Section heading="Your rights">
        <p>
          Depending on where you live — the GDPR in Europe and the UK, the CCPA in
          California, and similar laws elsewhere — you have rights to access, correct,
          delete, or object to the processing of your personal data.
        </p>
        <p>
          In practice, exercising them here is unusually simple: without an account, there
          is no personal record to hand over or erase beyond transient log entries. If you
          would like those checked or removed, email <strong>{SITE.email}</strong> with the
          approximate date and time and, if you know it, the IP address involved, and we
          will action it.
        </p>
      </Section>

      <Section heading="Security">
        <p>
          All traffic runs over HTTPS. The API credentials used for media lookups live in
          server-side environment variables and are never exposed to the browser. Because
          we deliberately store so little, a breach of our systems would not reveal a
          download history — there is not one to reveal.
        </p>
      </Section>

      <Section heading="Changes to this policy">
        <p>
          If this policy changes materially — a new analytics provider, an advertising
          partner, anything that alters what is collected — the date at the top will change
          and the new terms will be described in plain language rather than buried.
        </p>
      </Section>
    </ProsePage>
  );
}
