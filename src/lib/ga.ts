import { config } from "@/lib/config";

let initialized = false;

// Loads the official gtag.js script exactly once, but only when a real
// Measurement ID is configured — nothing is injected otherwise. Mirrors
// Google's own installation snippet: dataLayer/gtag are set up before the
// script is loaded, then 'js' and 'config' are each called exactly once.
// GA4's Enhanced Measurement (enabled on this property) automatically
// tracks SPA route changes via the History API, so no custom page_view
// tracking is done here.
export function initGoogleAnalytics(): void {
  if (initialized || typeof document === "undefined") return;

  const id = config.analytics.gaMeasurementId;
  if (!id) return;

  initialized = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", id);
}
