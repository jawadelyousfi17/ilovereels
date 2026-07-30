import type { Metadata } from "next";
import { ProsePage, Section, Bullets } from "@/components/prose-page";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "How to reach iLoveReels about a broken link, a bug, a copyright issue, or a partnership — and what to include so we can help quickly.",
  path: "/contact",
});

export default function Page() {
  return (
    <ProsePage
      title="Contact us"
      intro="One inbox, read by a person. No ticket number, no chatbot standing between you and an answer."
    >
      <Section heading="Email">
        <p>
          Write to <strong>{SITE.email}</strong>. We aim to reply within two working days.
          Copyright and impersonation reports are handled first.
        </p>
      </Section>

      <Section heading="Reporting something that is broken">
        <p>
          Downloaders break for predictable reasons — Instagram changes something, a link
          format shifts, a CDN starts refusing requests. Reports genuinely help, and a good
          one saves a lot of guesswork.
        </p>
        <Bullets
          items={[
            "The exact link you pasted, copied rather than retyped.",
            "Which tool you used — Reels, video, photo, carousel, audio, or profile picture.",
            "The error message shown on screen, word for word if you can.",
            "Your device and browser, for example iPhone 14 with Safari, or Windows with Chrome.",
            "Whether it fails every time or only occasionally.",
          ]}
        />
        <p>
          Before you write: if the message mentioned an expired link, paste the URL again.
          Instagram signs its file addresses and they stop working after a while, so a
          fresh lookup fixes it in seconds.
        </p>
      </Section>

      <Section heading="Copyright and takedown requests">
        <p>
          We do not host any Instagram media, so there is rarely a file for us to remove —
          but if content of yours is involved, we will help you get to the party who can
          act. Send the details described on the copyright page and we will respond
          promptly.
        </p>
      </Section>

      <Section heading="Press, partnerships, and advertising">
        <p>
          Same address, with a subject line that says which one. Please include what you
          are proposing in the first paragraph rather than asking for a call to explain it
          — it gets you a real answer much faster.
        </p>
      </Section>

      <Section heading="What we cannot help with">
        <Bullets
          items={[
            "Recovering a locked, hacked, or disabled Instagram account. We have no connection to Instagram and no ability to influence anything on their side — their Help Centre is the only route.",
            "Accessing private accounts, deleted posts, or expired stories. Not a limitation we can lift; it is a line we do not cross.",
            "Identifying an anonymous account, or anything else that amounts to tracking a person down.",
          ]}
        />
      </Section>
    </ProsePage>
  );
}
