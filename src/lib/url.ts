// A stored social/contact URL like "facebook.com/santrac" or
// "www.facebook.com/santrac" has no scheme, so a plain <a href> resolves it
// as a path relative to the current route (e.g. "/equipment/facebook.com/santrac"
// instead of an external link). This normalizes any such value into an
// absolute https:// URL before it's ever used as an href, and is also used
// to canonicalize what's stored from /admin/settings.
export function normalizeExternalUrl(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed.replace(/^\/+/, "")}`;
}
