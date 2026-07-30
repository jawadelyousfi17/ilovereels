import type { Metadata } from "next";
import Link from "next/link";
import { ProsePage, Section, Bullets } from "@/components/prose-page";
import { ArticleSchema } from "@/components/structured-data";
import { pageMetadata } from "@/lib/seo";

const TITLE = "How to download Instagram Reels on any device";
const DESCRIPTION =
  "A complete, honest guide to saving Instagram Reels on iPhone, Android, Windows, and Mac — plus what watermarks really are, why quality drops, and what is safe to do with the file.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/how-to-download-instagram-reels",
});

const CONTENTS = [
  ["#iphone", "On an iPhone or iPad"],
  ["#android", "On Android"],
  ["#desktop", "On Windows, Mac, or Linux"],
  ["#watermarks", "The truth about watermarks"],
  ["#quality", "Why the quality is what it is"],
  ["#troubleshooting", "When it does not work"],
  ["#legal", "What you can do with the file"],
] as const;

export default function Page() {
  return (
    <>
      <ArticleSchema
        path="/how-to-download-instagram-reels"
        headline={TITLE}
        description={DESCRIPTION}
        datePublished="2026-07-30"
      />
      <ProsePage
        title={TITLE}
        intro="Everything worth knowing about saving a Reel — the exact taps on each platform, what actually determines the quality you end up with, and the parts most guides skip because they are inconvenient."
        updated="30 July 2026"
      >
        <nav aria-label="Contents" className="surface p-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-ink-400">
            On this page
          </h2>
          <ol className="mt-4 space-y-2 text-sm">
            {CONTENTS.map(([href, label]) => (
              <li key={href}>
                <a
                  href={href}
                  className="font-semibold transition hover:text-brand-600 dark:hover:text-brand-400"
                >
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <Section heading="The short answer">
          <p>
            Copy the Reel&apos;s link from the share menu, paste it into the{" "}
            <Link href="/" className="font-semibold text-brand-600 dark:text-brand-400">
              Reels downloader
            </Link>
            , and press the button. The rest of this page covers the platform-specific
            details, the things that go wrong, and the questions that follow.
          </p>
        </Section>

        <Section heading="On an iPhone or iPad" id="iphone">
          <p>
            iOS is the one that confuses people, because Safari does not put downloads
            into Photos. They go to the Files app first, and you move them across. Once you
            have done it once it takes about ten seconds.
          </p>
          <Bullets
            items={[
              "Open the Reel in the Instagram app and tap the paper-plane share icon underneath it.",
              "Choose Copy link. Instagram confirms with a small toast at the bottom of the screen.",
              "Switch to Safari and open the downloader page.",
              "Tap the input box and choose Paste, then press the download button.",
              "When the preview appears, tap Download. iOS asks whether you want to download the file — confirm it.",
              "Open the Files app, go to Downloads, and tap the new MP4 to check it.",
              "Tap the share icon in Files and choose Save Video. It now appears in your camera roll and syncs through iCloud Photos like anything you filmed.",
            ]}
          />
          <p>
            Two small things worth knowing. Chrome and Firefox on iOS behave the same way,
            because Apple requires them to use Safari&apos;s engine underneath. And if the
            download arrow does not appear in Safari&apos;s toolbar, check Settings, then
            Safari, then Downloads, and make sure a destination is selected.
          </p>
        </Section>

        <Section heading="On Android" id="android">
          <p>
            Android is more direct. Chrome saves to your Downloads folder and the Gallery
            picks it up automatically.
          </p>
          <Bullets
            items={[
              "Tap the share icon on the Reel and choose Copy link.",
              "Open Chrome, go to the downloader, and paste the link into the box.",
              "Press the button, wait for the preview, then tap Download.",
              "Chrome shows a notification when the file is finished. Tap it to play the video, or open Gallery and look in the Downloads album.",
            ]}
          />
          <p>
            If the clip does not show up in Gallery after a minute, open the Files app,
            find it in Downloads, and move it to your Movies or DCIM folder. Some gallery
            apps only scan those directories.
          </p>
        </Section>

        <Section heading="On Windows, Mac, or Linux" id="desktop">
          <p>
            Desktop is the simplest case, and the best option if you are saving several
            Reels or planning to edit them.
          </p>
          <Bullets
            items={[
              "Open the Reel at instagram.com. You do not need to be logged in for a public post.",
              "Copy the URL from the address bar, or use the ••• menu and choose Copy link.",
              "Paste it into the downloader and press the button.",
              "Click Download. The MP4 goes to your usual downloads folder with a sensible filename.",
            ]}
          />
          <p>
            Because the file arrives as a standard H.264 MP4, every editor imports it
            without conversion — Premiere, Resolve, Final Cut, CapCut, Shotcut, and the
            rest.
          </p>
        </Section>

        <Section heading="The truth about watermarks" id="watermarks">
          <p>
            &ldquo;No watermark&rdquo; is the most oversold phrase in this entire category,
            so it is worth separating the two things people mean by it.
          </p>
          <p>
            <strong>Marks added by the download site.</strong> Some services stamp their own
            logo or URL onto your file so their branding travels with every share. This is
            entirely within their control, and it is the kind that a downloader can
            genuinely promise not to add. We do not add one.
          </p>
          <p>
            <strong>Marks already in the video.</strong> If the creator exported from CapCut
            on the free tier, or added their handle in the corner, that mark is part of the
            picture. It is the same pixels as the rest of the frame. Removing it means
            re-encoding the video and either blurring or cropping the area — which lowers
            quality, sometimes badly, and erases the creator&apos;s signature from their own
            work.
          </p>
          <p>
            Any site claiming to remove the second kind cleanly is either doing something
            destructive or not doing it at all. When a downloaded Reel still has a logo in
            the corner, that logo was in the file before anyone downloaded it.
          </p>
        </Section>

        <Section heading="Why the quality is what it is" id="quality">
          <p>
            People often expect a downloaded Reel to look like the creator&apos;s export.
            It will not, and the reason has nothing to do with the downloader.
          </p>
          <p>
            Instagram re-encodes everything on upload so that video plays smoothly on a
            phone in a country with slow mobile data. A creator&apos;s 4K master becomes a
            1080p H.264 file at a modest bitrate, and that compressed version is the only
            one Instagram stores. It is what plays in the app, and it is the maximum any
            tool can ever retrieve.
          </p>
          <p>
            What a good downloader can do is avoid making it worse. Every extra
            re-encode — by a converter site, by an MP3 tool, by a watermark remover — stacks
            another round of compression on top and is where the visible mush comes from.
            Copying the file untouched, as this site does, means you get Instagram&apos;s
            version at full fidelity and no second pass.
          </p>
          <p>
            One practical consequence: if you need genuine high quality for a project, ask
            the creator for the original. No tool can rebuild what Instagram discarded on
            upload.
          </p>
        </Section>

        <Section heading="When it does not work" id="troubleshooting">
          <p>Failures cluster into a handful of causes, nearly all of them fixable.</p>
          <Bullets
            items={[
              "The account is private. Nothing will retrieve those posts, and any site claiming otherwise is either failing silently or fishing for your password.",
              "The post was deleted or archived. If it no longer loads on Instagram, there is nothing left to fetch.",
              "The link expired. Instagram signs its media URLs and they stop working after a while. If a result has been sitting in your tab, paste the link again for a fresh one.",
              "You copied a profile link instead of a post link. The URL needs to contain /reel/, /p/, or /tv/ followed by the post code.",
              "The share link is a redirect. Some share sheets produce a short link — open it once so it resolves to the real instagram.com address, then copy that.",
              "A content warning or age restriction sits on the post. Those are not served publicly, so they cannot be retrieved.",
            ]}
          />
          <p>
            If none of that applies and the link still fails, it is worth reporting — send
            it through the{" "}
            <Link href="/contact" className="font-semibold text-brand-600 dark:text-brand-400">
              contact page
            </Link>{" "}
            and it gets looked at.
          </p>
        </Section>

        <Section heading="What you can do with the file" id="legal">
          <p>
            The part most guides leave out. Downloading a Reel does not make it yours, and
            the practical difference is simple enough to hold in your head.
          </p>
          <p>
            Keeping a copy to watch offline, to study, to send to one friend, or to back up
            your own uploads is ordinary personal use, and nobody is going to have a problem
            with it. Re-uploading someone else&apos;s Reel to your own account, cropping out
            their handle, or using their footage in something you monetise is a different
            thing entirely, and credit in a caption is a courtesy rather than a licence.
          </p>
          <p>
            Music deserves its own warning. The licensed tracks in Instagram&apos;s audio
            library are licensed for playback on Instagram, not for reuse in your uploads
            elsewhere. That mismatch is behind a large share of copyright strikes on other
            platforms.
          </p>
          <p>
            There is a fuller treatment, including what to do if your own work has been
            reposted, on the{" "}
            <Link href="/copyright" className="font-semibold text-brand-600 dark:text-brand-400">
              copyright page
            </Link>
            .
          </p>
        </Section>

        <Section heading="Ready to try it">
          <p>
            The{" "}
            <Link href="/" className="font-semibold text-brand-600 dark:text-brand-400">
              Reels downloader
            </Link>{" "}
            handles Reels and video posts. There are separate tools for{" "}
            <Link
              href="/instagram-photo-downloader"
              className="font-semibold text-brand-600 dark:text-brand-400"
            >
              photos
            </Link>
            ,{" "}
            <Link
              href="/instagram-carousel-downloader"
              className="font-semibold text-brand-600 dark:text-brand-400"
            >
              full carousels
            </Link>
            , and{" "}
            <Link
              href="/instagram-profile-picture-downloader"
              className="font-semibold text-brand-600 dark:text-brand-400"
            >
              profile pictures
            </Link>
            . All free, none of them asking you to sign in.
          </p>
        </Section>
      </ProsePage>
    </>
  );
}
