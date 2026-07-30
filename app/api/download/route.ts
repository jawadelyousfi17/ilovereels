import { NextResponse } from "next/server";
import { LookupError, fetchPost, fetchProfile } from "@/lib/instagram";

export const dynamic = "force-dynamic";

type Body = {
  url?: unknown;
  mode?: unknown;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Send a JSON body with a url field." }, { status: 400 });
  }

  const url = typeof body.url === "string" ? body.url : "";
  const mode = body.mode === "profile" ? "profile" : "post";

  if (!url.trim()) {
    return NextResponse.json(
      {
        error:
          mode === "profile"
            ? "Paste an Instagram username or profile link first."
            : "Paste an Instagram link first.",
      },
      { status: 400 },
    );
  }
  if (url.length > 2048) {
    return NextResponse.json({ error: "That link is too long to be valid." }, { status: 400 });
  }

  try {
    const result = mode === "profile" ? await fetchProfile(url) : await fetchPost(url);
    return NextResponse.json(result, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    if (error instanceof LookupError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json(
      { error: "Something went wrong on our side. Please try that link again." },
      { status: 500 },
    );
  }
}
