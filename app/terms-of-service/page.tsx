import type { Metadata } from "next";
import { ProsePage, Section, Bullets } from "@/components/prose-page";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms of service",
  description:
    "The rules for using iLoveReels: what the service does, what you agree not to do with it, and the limits of what we can promise.",
  path: "/terms-of-service",
});

export default function Page() {
  return (
    <ProsePage
      title="Terms of service"
      intro="Using the site means accepting these terms. They are short, and written to be understood rather than to be impressive."
      updated="30 July 2026"
    >
      <Section heading="1. What the service does">
        <p>
          {SITE.name} lets you retrieve a copy of publicly available media from Instagram
          by pasting a link to it. It is provided free of charge and without any account.
          We do not host, store, or publish Instagram content — we help your browser fetch
          a file that Instagram is already serving publicly.
        </p>
      </Section>

      <Section heading="2. No affiliation with Instagram">
        <p>
          {SITE.name} is an independent project. It is not affiliated with, endorsed by,
          sponsored by, or connected to Instagram, Meta Platforms, Inc., or any of their
          subsidiaries. All trademarks and content belong to their respective owners, and
          references to them here are descriptive only.
        </p>
      </Section>

      <Section heading="3. How you agree to use it">
        <p>You agree not to use the service to:</p>
        <Bullets
          items={[
            "Infringe anyone's copyright, trademark, moral, or publicity rights.",
            "Republish, distribute, or monetise another person's work without their permission.",
            "Impersonate anyone, including by reusing someone else's profile picture or content as your own.",
            "Harass, stalk, or build a dossier on any individual.",
            "Attempt to reach private, restricted, or deleted content by any means.",
            "Automate, scrape, or otherwise place unreasonable load on the service, or resell access to it.",
            "Break any law that applies to you.",
          ]}
        />
      </Section>

      <Section heading="4. You are responsible for what you download">
        <p>
          Copyright in a file does not change hands because you saved a copy. You are
          solely responsible for how you use anything obtained through this site and for
          confirming that your use is lawful where you live.
        </p>
        <p>
          As a rule of thumb, keeping a copy for personal, non-commercial viewing is
          ordinary use in most jurisdictions. Re-uploading, editing and republishing, or
          selling someone else&apos;s work is not, unless you have their permission or a
          recognised exception applies.
        </p>
      </Section>

      <Section heading="5. Instagram's own terms">
        <p>
          Instagram&apos;s terms of use govern your relationship with Instagram, and they
          restrict automated collection of content from their platform. Those terms are
          between you and them. Nothing here overrides them, and you should read them if
          you are unsure whether a particular use is acceptable.
        </p>
      </Section>

      <Section heading="6. Availability">
        <p>
          The service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;. It
          depends on systems we do not control, so it may be interrupted, slowed, or
          changed without notice, and some links may simply fail. We do not guarantee that
          any particular post can be retrieved, or that files will remain reachable after
          they are fetched.
        </p>
      </Section>

      <Section heading="7. Limitation of liability">
        <p>
          To the fullest extent permitted by law, {SITE.name} and anyone involved in
          operating it are not liable for indirect, incidental, or consequential damages
          arising from your use of the service, including lost data, lost profits, or
          claims brought against you over content you downloaded.
        </p>
      </Section>

      <Section heading="8. Copyright complaints">
        <p>
          If you believe your rights have been infringed in connection with this service,
          the copyright page explains what to send and where. We act on valid reports
          promptly.
        </p>
      </Section>

      <Section heading="9. Changes and termination">
        <p>
          We may update these terms; the date at the top will change when we do, and
          continuing to use the site means accepting the revised version. We may also
          restrict or withdraw access where the service is being abused, in particular
          where it is being automated at scale or used to harass someone.
        </p>
      </Section>

      <Section heading="10. Contact">
        <p>
          Questions about these terms go to <strong>{SITE.email}</strong>.
        </p>
      </Section>
    </ProsePage>
  );
}
