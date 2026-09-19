import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { initGoogleAnalytics, trackGAPageView } from "@/lib/ga";

// Loads gtag.js once (no-ops if VITE_GA_MEASUREMENT_ID isn't set) and sends
// a GA4 page_view on every route change. Renders nothing — mount once near
// the root, inside the router.
export function GoogleAnalytics() {
  const location = useLocation();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    initGoogleAnalytics();
  }, []);

  useEffect(() => {
    const path = `${location.pathname}${location.search}`;
    if (lastTrackedPath.current === path) return;
    lastTrackedPath.current = path;
    trackGAPageView(path);
  }, [location.pathname, location.search]);

  return null;
}
