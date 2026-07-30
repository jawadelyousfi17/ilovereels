import type { Metadata } from "next";
import Link from "next/link";
import { ProsePage, Section, Bullets } from "@/components/prose-page";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About iLoveReels",
  description:
    "Who we are, how the downloader works under the hood, what we refuse to do, and how iLoveReels stays free without selling your data.",
  path: "/about",
});

export default function Page() {
  return (
    <ProsePage
      title="About iLoveReels"
      intro="A small tool with a narrow job: let you keep a personal copy of public Instagram media without handing over an account, installing anything, or having a stranger's logo burned into your video."
    >
      <Section heading="Why this exists">
        <p>
          Instagram is built around the scroll. That is fine until the one clip you needed
          — the recipe, the physio exercise, the shot you wanted to study — disappears
          into a feed that has no interest in showing it to you twice. The platform gives
          you a Save button that keeps a bookmark, not a file, and a bookmark stops working
          the moment the creator archives the post.
        </p>
        <p>
          The alternatives were not great either. Half the download sites are a maze of
          fake buttons wrapped around a redirect chain. Others quietly stamp their own
          watermark onto your file, or push an app that wants permission to read every page
          you visit. A handful ask for your Instagram password outright, which is a
          spectacularly bad trade for a video.
        </p>
        <p>
          So: one input box, one honest result, no account, and no logo added to anything.
        </p>
      </Section>

      <Section heading="How it actually works">
        <p>
          When you paste a link, we read the post ID out of it and ask Instagram&apos;s
          public media endpoint what that post contains. Instagram answers with the same
          direct file URLs your browser would receive when the post loads on screen. We
          show you those files, and when you press download we stream the chosen one back
          to you with the right filename attached.
        </p>
        <p>
          The stream step exists for a boring but useful reason: browsers ignore the
          &ldquo;save this&rdquo; instruction on links pointing to another domain, so a
          direct CDN link would just open the video in a new tab. Passing it through our
          server means the file saves properly with a sensible name.
        </p>
        <p>
          What we do not do is keep it. There is no storage bucket of your downloads, no
          account history, no queue of files waiting to be converted. The request passes
          through and is gone.
        </p>
      </Section>

      <Section heading="Things we will not build">
        <p>
          Some limits are technical. These ones are choices, and we would rather state them
          plainly than let you find out by watching a feature fail.
        </p>
        <Bullets
          items={[
            "Anything that reaches into private accounts. If a post is limited to approved followers, that is a boundary the person set on purpose, and no download tool should be talking its way around it.",
            "Any request for your Instagram password. There is no feature worth that, and any site asking for it should be closed immediately.",
            "A watermark of our own on your files. You came for the video, not for our branding riding along on every share.",
            "Fake progress bars, decoy download buttons, or redirects through three ad pages. If a button says download, it downloads.",
            "Bulk scraping of entire accounts. This is a tool for saving something you want to keep, not for harvesting somebody's whole body of work.",
          ]}
        />
      </Section>

      <Section heading="How it stays free">
        <p>
          Running the service costs money, mostly in bandwidth. The plan is ordinary
          display advertising and, later, an optional paid tier for people who want higher
          throughput — not selling data, because we do not collect any worth selling.
        </p>
        <p>
          If that ever changes, it will be written on this page before it happens, not
          discovered in a privacy policy diff. You can read the current one on the{" "}
          <Link href="/privacy-policy" className="font-semibold text-brand-600 dark:text-brand-400">
            privacy policy
          </Link>{" "}
          page.
        </p>
      </Section>

      <Section heading="On creators">
        <p>
          Every file this site hands you was made by someone. Downloading does not change
          who owns it. Keeping a copy to watch, study, or archive is normal personal use;
          re-uploading someone&apos;s work as your own is not, and we would rather say so
          than pretend the question does not exist.
        </p>
        <p>
          If your work has been reposted by someone who used a tool like this one, our{" "}
          <Link href="/copyright" className="font-semibold text-brand-600 dark:text-brand-400">
            copyright page
          </Link>{" "}
          explains the fastest routes to getting it taken down.
        </p>
      </Section>

      <Section heading="Get in touch">
        <p>
          Bug reports, broken links, feature ideas, and complaints all go to the same
          place: <strong>{SITE.email}</strong>. There is more detail on the{" "}
          <Link href="/contact" className="font-semibold text-brand-600 dark:text-brand-400">
            contact page
          </Link>
          .
        </p>
      </Section>
    </ProsePage>
  );
}
