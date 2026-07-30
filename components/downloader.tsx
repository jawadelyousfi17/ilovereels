"use client";

import { useId, useRef, useState } from "react";
import type { Tool } from "@/lib/tools";
import { proxyUrl } from "@/lib/media";

type Media = { type: "video" | "image"; url: string; thumbnail?: string };

type PostResult = {
  kind: "post";
  shortcode: string;
  username: string;
  fullName: string;
  caption: string;
  likeCount: number | null;
  commentCount: number | null;
  takenAt: number | null;
  medias: Media[];
};

type ProfileResult = {
  kind: "profile";
  username: string;
  fullName: string;
  biography: string;
  isPrivate: boolean;
  isVerified: boolean;
  followers: number | null;
  following: number | null;
  medias: Media[];
};

type Result = PostResult | ProfileResult;

const compact = new Intl.NumberFormat("en", { notation: "compact" });

function fileNameFor(result: Result, media: Media, index: number) {
  const ext = media.type === "video" ? "mp4" : "jpg";
  const handle = result.username || "instagram";
  const base =
    result.kind === "profile"
      ? `ilovereels-${handle}-profile`
      : `ilovereels-${handle}-${result.shortcode}${result.medias.length > 1 ? `-${index + 1}` : ""}`;
  return `${base}.${ext}`;
}

function downloadHref(result: Result, media: Media, index: number) {
  return proxyUrl(media.url, { filename: fileNameFor(result, media, index) });
}

/**
 * The heading passed as `children` sits inside the coloured panel with the
 * form; results render underneath it on the page background.
 */
export function Downloader({
  tool,
  children,
}: {
  tool: Tool;
  children?: React.ReactNode;
}) {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const inputId = useId();
  const resultRef = useRef<HTMLDivElement>(null);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url: value, mode: tool.mode }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data?.error ?? "That did not work. Try the link again.");
        setStatus("error");
        return;
      }

      setResult(data as Result);
      setStatus("done");
      requestAnimationFrame(() =>
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }),
      );
    } catch {
      setError("We could not reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  async function pasteFromClipboard() {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setValue(text.trim());
    } catch {
      // Clipboard permission denied — the user can still paste manually.
    }
  }

  return (
    <div className="w-full">
      <div className="hero-panel px-4 py-7 sm:px-6 sm:py-9">
        <div className="mx-auto max-w-3xl">
          {children}

          <form onSubmit={submit} className="mt-5">
          <label htmlFor={inputId} className="sr-only">
            {tool.mode === "profile"
              ? "Instagram username or profile link"
              : "Instagram link"}
          </label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <input
                id={inputId}
                type="text"
                inputMode="url"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={tool.placeholder}
                className="w-full rounded-2xl bg-white px-4 py-3 pr-[4.5rem] text-[15px] text-ink-900 outline-none ring-white/40 transition placeholder:text-ink-400 focus:ring-2"
              />
              <button
                type="button"
                onClick={pasteFromClipboard}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-xl px-2.5 py-1.5 text-xs font-bold uppercase tracking-wide text-ink-400 transition hover:bg-ink-100 hover:text-ink-700"
              >
                Paste
              </button>
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-2xl bg-white px-6 py-3 text-[15px] font-bold text-ink-900 transition hover:bg-ink-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-wait disabled:opacity-70"
            >
              {status === "loading" ? "Fetching…" : tool.cta}
            </button>
          </div>
          </form>

          <p className="mt-3 text-xs text-white/75">{tool.hint}</p>

          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] font-semibold text-white/90">
            {tool.badges.map((badge) => (
              <li key={badge} className="flex items-center gap-1.5">
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden="true">
                  <path
                    d="m5 10.5 3.2 3.2L15 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {badge}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        ref={resultRef}
        className="mx-auto mt-5 max-w-3xl px-4 sm:px-6"
        aria-live="polite"
      >
        {status === "loading" && <LoadingCard />}
        {status === "error" && <ErrorCard message={error} />}
        {status === "done" && result && <ResultCard result={result} />}
      </div>
    </div>
  );
}

function LoadingCard() {
  return (
    <div className="surface p-4">
      <div className="flex items-center gap-3">
        <div className="shimmer relative h-10 w-10 overflow-hidden rounded-full bg-ink-100 dark:bg-white/10" />
        <div className="flex-1 space-y-2">
          <div className="shimmer relative h-3 w-28 overflow-hidden rounded-full bg-ink-100 dark:bg-white/10" />
          <div className="shimmer relative h-2.5 w-16 overflow-hidden rounded-full bg-ink-100 dark:bg-white/10" />
        </div>
      </div>
      <div className="shimmer relative mt-4 h-56 overflow-hidden rounded-2xl bg-ink-100 dark:bg-white/10" />
      <p className="mt-3 text-center text-sm muted">Asking Instagram for the file…</p>
    </div>
  );
}

function ErrorCard({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-rose-300/70 bg-rose-50 p-4 text-sm text-rose-800 dark:border-rose-400/25 dark:bg-rose-500/10 dark:text-rose-200"
    >
      <p className="font-bold">That did not work</p>
      <p className="mt-1 leading-relaxed">{message}</p>
    </div>
  );
}

function ResultCard({ result }: { result: Result }) {
  return result.kind === "profile" ? (
    <ProfileResult result={result} />
  ) : (
    <PostResult result={result} />
  );
}

/** Avatar results are a single image, so they get a compact centred layout. */
function ProfileResult({ result }: { result: ProfileResult }) {
  const media = result.medias[0];

  return (
    <div className="surface p-5 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={proxyUrl(media.url, { inline: true })}
        alt={`Profile picture of @${result.username}`}
        className="mx-auto h-28 w-28 rounded-full object-cover ring-4 ring-white shadow-md sm:h-32 sm:w-32 dark:ring-white/15"
      />

      <p className="mt-3.5 flex items-center justify-center gap-1.5 font-bold">
        {result.fullName || result.username}
        {result.isVerified && (
          <span className="text-brand-500" title="Verified">
            ✓
          </span>
        )}
      </p>
      <a
        href={`https://www.instagram.com/${result.username}/`}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="text-sm muted transition hover:text-brand-600"
      >
        @{result.username}
      </a>

      {(result.followers !== null || result.following !== null) && (
        <dl className="mt-3 flex justify-center gap-6 text-sm">
          {result.followers !== null && (
            <Stat label="followers" value={compact.format(result.followers)} />
          )}
          {result.following !== null && (
            <Stat label="following" value={compact.format(result.following)} />
          )}
        </dl>
      )}

      {result.biography && (
        <p className="mx-auto mt-3 max-w-sm whitespace-pre-line text-sm leading-relaxed muted">
          {result.biography}
        </p>
      )}

      <DownloadButton
        href={downloadHref(result, media, 0)}
        label="Download picture"
        className="mt-5"
      />
    </div>
  );
}

function PostResult({ result }: { result: PostResult }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = result.caption.length > 160;
  const single = result.medias.length === 1;

  return (
    <div className="surface overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3.5">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold">
            {result.fullName || result.username}
          </p>
          <a
            href={`https://www.instagram.com/${result.username}/`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-xs muted transition hover:text-brand-600"
          >
            @{result.username}
          </a>
        </div>
        <dl className="flex shrink-0 gap-4 text-sm">
          {result.likeCount !== null && (
            <Stat label="likes" value={compact.format(result.likeCount)} />
          )}
          {result.commentCount !== null && (
            <Stat label="comments" value={compact.format(result.commentCount)} />
          )}
        </dl>
      </div>

      {result.caption && (
        <div className="px-4 pb-3.5">
          <p
            className={`whitespace-pre-line text-sm leading-relaxed muted ${
              !expanded && isLong ? "line-clamp-2" : ""
            }`}
          >
            {result.caption}
          </p>
          {isLong && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="mt-1.5 text-xs font-bold uppercase tracking-wide text-brand-600 dark:text-brand-400"
            >
              {expanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>
      )}

      {single ? (
        <div className="px-3 pb-3">
          <MediaFrame media={result.medias[0]} tall />
          <DownloadButton
            href={downloadHref(result, result.medias[0], 0)}
            label={`Download ${result.medias[0].type === "video" ? "MP4" : "JPEG"}`}
            className="mt-3"
          />
        </div>
      ) : (
        <>
          <p className="px-4 pb-2 text-xs font-bold uppercase tracking-wide text-ink-400">
            {result.medias.length} items
          </p>
          <div className="grid grid-cols-2 gap-2.5 px-3 pb-3 sm:grid-cols-3">
            {result.medias.map((media, index) => (
              <div key={media.url} className="space-y-1.5">
                <MediaFrame media={media} badge={`${index + 1}/${result.medias.length}`} />
                <DownloadButton
                  href={downloadHref(result, media, index)}
                  label="Save"
                  compact
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function MediaFrame({
  media,
  tall = false,
  badge,
}: {
  media: Media;
  tall?: boolean;
  badge?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-ink-900 ${
        tall ? "" : "aspect-square"
      }`}
    >
      {media.type === "video" ? (
        <video
          src={proxyUrl(media.url, { inline: true })}
          poster={media.thumbnail ? proxyUrl(media.thumbnail, { inline: true }) : undefined}
          controls
          playsInline
          preload="metadata"
          className={
            tall
              ? "max-h-[58vh] w-full object-contain"
              : "absolute inset-0 h-full w-full object-cover"
          }
        />
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={proxyUrl(media.url, { inline: true })}
          alt="Instagram media preview"
          loading="lazy"
          className={
            tall
              ? "max-h-[58vh] w-full object-contain"
              : "absolute inset-0 h-full w-full object-cover"
          }
        />
      )}
      {badge && (
        <span className="absolute left-1.5 top-1.5 rounded-full bg-black/65 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
          {badge}
        </span>
      )}
    </div>
  );
}

function DownloadButton({
  href,
  label,
  compact: isCompact = false,
  className = "",
}: {
  href: string;
  label: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`flex w-full items-center justify-center gap-1.5 rounded-xl bg-ink-900 font-bold text-white transition hover:bg-ink-800 dark:bg-white dark:text-ink-900 dark:hover:bg-ink-100 ${
        isCompact ? "px-2 py-2 text-xs" : "px-4 py-3 text-sm"
      } ${className}`}
    >
      <svg
        viewBox="0 0 20 20"
        className={isCompact ? "h-3.5 w-3.5" : "h-4 w-4"}
        aria-hidden="true"
      >
        <path
          d="M10 3v10m0 0 4-4m-4 4-4-4M4 16h12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label}
    </a>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <dt className="text-[10px] uppercase tracking-wide text-ink-400">{label}</dt>
      <dd className="text-sm font-bold">{value}</dd>
    </div>
  );
}
