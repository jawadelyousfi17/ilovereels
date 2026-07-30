/**
 * Builds a URL to our own media proxy.
 *
 * Instagram's CDN rejects cross-origin requests from other sites, so previews
 * must be served through us rather than linked directly. The same route serves
 * downloads, switched by the `inline` flag.
 */
export function proxyUrl(
  url: string,
  options: { inline?: boolean; filename?: string } = {},
) {
  const params = new URLSearchParams({ url });
  if (options.inline) params.set("inline", "1");
  if (options.filename) params.set("filename", options.filename);
  return `/api/file?${params.toString()}`;
}
