const API_HOST = process.env.RAPIDAPI_HOST ?? "instagram-looter2.p.rapidapi.com";
const API_KEY = process.env.RAPIDAPI_KEY;

/** Shortcode-bearing post paths the upstream `post-dl` endpoint understands. */
const POST_PATHS = ["p", "reel", "reels", "tv", "share"] as const;

export type MediaKind = "video" | "image";

export type Media = {
  type: MediaKind;
  /** Direct CDN link to the original file. */
  url: string;
  /** Poster frame for videos. */
  thumbnail?: string;
};

export type PostResult = {
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

export type ProfileResult = {
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

export type LookupResult = PostResult | ProfileResult;

export class LookupError extends Error {
  constructor(
    message: string,
    readonly status: number = 400,
  ) {
    super(message);
    this.name = "LookupError";
  }
}

/**
 * Pulls the shortcode out of anything a user is likely to paste: full URLs,
 * share links with tracking params, `instagr.am` mirrors, or a bare shortcode.
 */
export function parseShortcode(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  // A bare shortcode pasted on its own.
  if (/^[A-Za-z0-9_-]{5,30}$/.test(trimmed) && !trimmed.includes(".")) {
    return trimmed;
  }

  let url: URL;
  try {
    url = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
  } catch {
    return null;
  }

  if (!/(^|\.)(instagram\.com|instagr\.am|ig\.me)$/i.test(url.hostname)) {
    return null;
  }

  const segments = url.pathname.split("/").filter(Boolean);
  // `/reel/ABC`, `/p/ABC`, and also `/username/reel/ABC`.
  const anchor = segments.findIndex((s) =>
    POST_PATHS.includes(s.toLowerCase() as (typeof POST_PATHS)[number]),
  );
  if (anchor !== -1 && segments[anchor + 1]) {
    return segments[anchor + 1];
  }
  return null;
}

/** Extracts a username from a profile URL, an `@handle`, or a bare handle. */
export function parseUsername(input: string): string | null {
  const trimmed = input.trim().replace(/^@/, "");
  if (!trimmed) return null;

  if (/^[A-Za-z0-9._]{1,30}$/.test(trimmed)) return trimmed.toLowerCase();

  let url: URL;
  try {
    url = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
  } catch {
    return null;
  }
  if (!/(^|\.)(instagram\.com|instagr\.am)$/i.test(url.hostname)) return null;

  const [first] = url.pathname.split("/").filter(Boolean);
  if (!first || POST_PATHS.includes(first.toLowerCase() as (typeof POST_PATHS)[number])) {
    return null;
  }
  return first.toLowerCase();
}

async function callApi(path: string): Promise<Record<string, unknown>> {
  if (!API_KEY) {
    throw new LookupError(
      "The downloader is not configured yet. Add RAPIDAPI_KEY to your environment.",
      500,
    );
  }

  let response: Response;
  try {
    response = await fetch(`https://${API_HOST}${path}`, {
      headers: {
        "x-rapidapi-host": API_HOST,
        "x-rapidapi-key": API_KEY,
      },
      // Instagram links expire, so a cached response would hand out dead URLs.
      cache: "no-store",
      signal: AbortSignal.timeout(45_000),
    });
  } catch {
    throw new LookupError(
      "Instagram did not respond in time. Give it a moment and try again.",
      504,
    );
  }

  if (response.status === 429) {
    throw new LookupError(
      "We are handling a lot of requests right now. Try again in a minute.",
      429,
    );
  }
  if (!response.ok) {
    throw new LookupError(
      "We could not reach Instagram for that link. Please try again.",
      502,
    );
  }

  const json = (await response.json()) as Record<string, unknown>;
  if (json.status === false) {
    throw new LookupError(
      "Instagram returned nothing for that link. Check that the post is public and still online.",
      404,
    );
  }
  return json;
}

function asText(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function asCount(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

/** Fetches a public post, reel, or carousel by its URL or shortcode. */
export async function fetchPost(input: string): Promise<PostResult> {
  const shortcode = parseShortcode(input);
  if (!shortcode) {
    throw new LookupError(
      "That does not look like an Instagram link. Paste a URL such as instagram.com/reel/XXXXXXXXXXX/",
    );
  }

  const target = `https://www.instagram.com/p/${shortcode}/`;
  const json = await callApi(`/post-dl?url=${encodeURIComponent(target)}`);
  const data = (json.data ?? {}) as Record<string, unknown>;

  const rawMedias = Array.isArray(data.medias) ? data.medias : [];
  const medias: Media[] = rawMedias.flatMap((entry) => {
    const item = entry as Record<string, unknown>;
    const url = asText(item.link);
    if (!url) return [];
    const thumbnail = asText(item.img);
    return [
      {
        type: item.type === "video" ? "video" : "image",
        url,
        ...(thumbnail ? { thumbnail } : {}),
      },
    ];
  });

  if (medias.length === 0) {
    throw new LookupError(
      "No downloadable media came back for that link. Private and deleted posts cannot be fetched.",
      404,
    );
  }

  return {
    kind: "post",
    shortcode,
    username: asText(data.username),
    fullName: asText(data.full_name),
    caption: asText(data.caption),
    likeCount: asCount(data.like_count),
    commentCount: asCount(data.comment_count),
    takenAt: asCount(data.taken_at_timestamp),
    medias,
  };
}

/** Fetches a public profile so its avatar can be saved at full size. */
export async function fetchProfile(input: string): Promise<ProfileResult> {
  const username = parseUsername(input);
  if (!username) {
    throw new LookupError(
      "Enter an Instagram username or profile link, for example @nasa or instagram.com/nasa",
    );
  }

  const json = await callApi(`/profile?username=${encodeURIComponent(username)}`);
  const picture = asText(json.profile_pic_url_hd) || asText(json.profile_pic_url);

  if (!picture) {
    throw new LookupError(
      `We could not load a picture for @${username}. Check the spelling and that the account exists.`,
      404,
    );
  }

  const followedBy = json.edge_followed_by as { count?: unknown } | undefined;
  const follow = json.edge_follow as { count?: unknown } | undefined;

  return {
    kind: "profile",
    username: asText(json.username) || username,
    fullName: asText(json.full_name),
    biography: asText(json.biography),
    isPrivate: json.is_private === true,
    isVerified: json.is_verified === true,
    followers: asCount(followedBy?.count),
    following: asCount(follow?.count),
    medias: [{ type: "image", url: picture, thumbnail: picture }],
  };
}
