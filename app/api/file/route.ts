import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** Only Instagram's own media CDNs may be proxied through this route. */
const ALLOWED_HOST = /(^|\.)(cdninstagram\.com|fbcdn\.net)$/i;

function safeFilename(input: string | null, fallback: string) {
  if (!input) return fallback;
  const cleaned = input.replace(/[^a-zA-Z0-9._-]/g, "").slice(0, 80);
  return cleaned || fallback;
}

/**
 * Streams a CDN file back with `Content-Disposition: attachment` so the browser
 * saves it instead of opening a new tab. Instagram's own URLs cannot do this,
 * and the `download` attribute is ignored cross-origin.
 */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const target = params.get("url");

  if (!target) {
    return NextResponse.json({ error: "Missing url parameter." }, { status: 400 });
  }

  let source: URL;
  try {
    source = new URL(target);
  } catch {
    return NextResponse.json({ error: "Invalid url parameter." }, { status: 400 });
  }

  if (source.protocol !== "https:" || !ALLOWED_HOST.test(source.hostname)) {
    return NextResponse.json(
      { error: "Only Instagram media links can be downloaded here." },
      { status: 403 },
    );
  }

  // Previews render in the page; downloads are forced as a file save.
  const inline = params.get("inline") === "1";
  // Forwarded so <video> can seek instead of buffering the whole clip.
  const range = request.headers.get("range");

  let upstream: Response;
  try {
    upstream = await fetch(source, {
      headers: {
        // The CDN rejects requests without a browser-ish user agent.
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        accept: "*/*",
        // Instagram serves media only when the referer looks like its own site.
        referer: "https://www.instagram.com/",
        origin: "https://www.instagram.com",
        ...(range ? { range } : {}),
      },
      cache: "no-store",
      signal: AbortSignal.timeout(60_000),
    });
  } catch {
    return NextResponse.json(
      { error: "The file link expired. Fetch the post again to refresh it." },
      { status: 504 },
    );
  }

  if ((!upstream.ok && upstream.status !== 206) || !upstream.body) {
    return NextResponse.json(
      { error: "The file link expired. Fetch the post again to refresh it." },
      { status: 502 },
    );
  }

  const contentType = upstream.headers.get("content-type") ?? "application/octet-stream";
  const extension = contentType.includes("video")
    ? "mp4"
    : contentType.includes("png")
      ? "png"
      : "jpg";
  const filename = safeFilename(params.get("filename"), `ilovereels-${Date.now()}.${extension}`);

  const headers = new Headers({
    "content-type": contentType,
    "content-disposition": inline ? "inline" : `attachment; filename="${filename}"`,
    // Signed CDN links expire within hours, so previews cache briefly at most.
    "cache-control": inline ? "private, max-age=3600" : "no-store",
  });

  // Pass range metadata through so seeking works on the proxied video.
  for (const header of ["content-length", "content-range", "accept-ranges"]) {
    const value = upstream.headers.get(header);
    if (value) headers.set(header, value);
  }
  if (!headers.has("accept-ranges")) headers.set("accept-ranges", "bytes");

  return new NextResponse(upstream.body, { status: upstream.status, headers });
}
