import { config } from "@/lib/config";

let initialized = false;

// Loads the official gtag.js script, but only when a real Measurement ID is
// configured — nothing is injected otherwise. Safe to call more than once
// (e.g. from an effect that could re-run); the script/config call only ever
// runs a single time per page load.
export function initGoogleAnalytics(): void {
  if (initialized || typeof document === "undefined") return;

  const id = config.analytics.gaMeasurementId;
  if (!id) return;

  initialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  // This is an SPA: the initial automatic page_view is disabled here and
  // sent explicitly instead (via trackGAPageView, on route change), so the
  // first render doesn't produce two page_view hits for the same URL.
  window.gtag("config", id, { send_page_view: false });
}

// Sends a single GA4 page_view for the given path. Intended to be called
// once per route change (see useGAPageViews); no-ops if GA wasn't
// initialized (no Measurement ID configured).
export function trackGAPageView(path: string): void {
  if (!config.analytics.gaMeasurementId || typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", { page_path: path });
}
