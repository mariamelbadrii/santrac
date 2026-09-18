import type { ReactNode } from "react";

// Isolates brand/model names, alphanumeric specs, and other Latin-script
// fragments from the surrounding bidi run so they render correctly (and
// don't drag Arabic punctuation/digits around them) inside RTL layouts.
// `dir="ltr"` is only appropriate when the content is known to be Latin
// script (e.g. a brand/model title) — leave it unset for mixed/unknown
// content and let the browser's bidi algorithm isolate + auto-detect it.
export function Bdi({
  children,
  dir,
  className,
}: {
  children: ReactNode;
  dir?: "ltr" | "rtl";
  className?: string;
}) {
  return (
    <bdi dir={dir} className={className}>
      {children}
    </bdi>
  );
}
