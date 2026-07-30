import type { Metadata } from "next";
import { ProsePage, Section, Bullets } from "@/components/prose-page";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Copyright & takedowns",
  description:
    "Who owns downloaded Instagram media, what counts as fair personal use, and exactly how to get reposted work taken down if it is yours.",
  path: "/copyright",
});

export default function Page() {
  return (
    <ProsePage
      title="Copyright & takedowns"
      intro="Most download sites keep this page vague. Here is a straight explanation of who owns what, plus practical steps if your work has been taken."
      updated="30 July 2026"
    >
      <Section heading="Downloading does not transfer ownership">
        <p>
          When someone posts a photo or video, they keep the copyright in it. Saving a copy
          changes nothing about that — the file on your device is still their work, exactly
          as a photocopy of a book page is still the author&apos;s writing.
        </p>
        <p>
          What changes is what you can practically do, which is why the line between
          private use and republishing matters so much.
        </p>
      </Section>

      <Section heading="Where the line usually falls">
        <p>
          Copyright law differs by country, and this is general information rather than
          legal advice. That said, the pattern is fairly consistent.
        </p>
        <p className="font-semibold text-ink-800 dark:text-ink-100">
          Generally fine:
        </p>
        <Bullets
          items={[
            "Watching something offline, on your own device, for yourself.",
            "Backing up posts you made yourself.",
            "Sending a clip privately to a friend, the way you would share a link.",
            "Studying a technique frame by frame, or keeping reference material for your own learning.",
            "Quoting or commenting on a work in a way that qualifies as fair use or fair dealing where you live — a genuinely narrow exception, and narrower than the internet tends to assume.",
          ]}
        />
        <p className="font-semibold text-ink-800 dark:text-ink-100">
          Generally not fine:
        </p>
        <Bullets
          items={[
            "Re-uploading someone else's video to your own account, with or without credit. Credit is a courtesy, not a licence.",
            "Cropping out a watermark or handle so the work looks like yours.",
            "Using someone's content in an advertisement or any commercial material without permission.",
            "Compiling other people's clips into content you monetise.",
            "Using a licensed song from a Reel in your own upload — that licence covers playback on Instagram, not reuse by you.",
          ]}
        />
        <p>
          When you are unsure, ask the creator. A short message asking permission works far
          more often than people expect, and it costs nothing to send.
        </p>
      </Section>

      <Section heading="If your work has been reposted">
        <p>
          If someone has taken your photo or video and posted it as their own, you have
          real options, and they work better in this order.
        </p>
        <Bullets
          items={[
            "Message them first. A surprising share of reposts come down within hours of a polite request, without any formal process.",
            "Report it inside Instagram. Use the ••• menu on the offending post and choose to report intellectual property infringement, or submit Instagram's copyright report form directly. This is the fastest route, because Instagram controls the post.",
            "Send a formal DMCA notice to the platform hosting the copy. Instagram, TikTok, YouTube, and every major host publishes a designated agent and a form for this.",
            "Gather evidence early. Screenshots with visible dates, your original file with its metadata intact, and the URL of the infringing post all strengthen the claim.",
          ]}
        />
        <p>
          For repeat or commercial infringement, especially where money is being made from
          your work, it is worth talking to a lawyer rather than relying on platform forms.
        </p>
      </Section>

      <Section heading="Our role, honestly stated">
        <p>
          {SITE.name} does not host, store, index, or publish Instagram content. Nothing is
          kept on our servers after a request completes. That means there is usually no
          file here for us to remove — the copy exists on Instagram, and any republished
          version exists wherever the person put it.
        </p>
        <p>
          We are not indifferent to that, though. If someone is using this service to
          infringe your rights, tell us. We will help you identify the right route, and we
          restrict access where we can see the tool being abused.
        </p>
      </Section>

      <Section heading="Sending us a notice">
        <p>
          Email <strong>{SITE.email}</strong> with the subject line &ldquo;Copyright
          notice&rdquo; and include:
        </p>
        <Bullets
          items={[
            "Your name and contact details, and your relationship to the work.",
            "A description of the work, with a link to your original post.",
            "The URL of the infringing material and where it is hosted.",
            "A statement that you believe in good faith the use is not authorised by you, your agent, or the law.",
            "A statement, under penalty of perjury, that the information is accurate and that you are the rights holder or authorised to act for them.",
            "Your physical or electronic signature.",
          ]}
        />
        <p>
          We respond to complete notices promptly. Please do not use this address for
          general support questions — the contact page is the right place for those.
        </p>
      </Section>
    </ProsePage>
  );
}
