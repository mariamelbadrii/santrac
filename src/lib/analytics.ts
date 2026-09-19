import { config } from "@/lib/config";

export type AnalyticsEvent =
  | "PageView"
  | "ViewContent"
  | "RequestQuoteClick"
  | "Lead"
  | "WhatsAppClick"
  | "CallClick";

type EventParams = Record<string, string | number | boolean | undefined>;

interface QueuedEvent {
  event: AnalyticsEvent;
  params?: EventParams;
  at: string;
}

const queue: QueuedEvent[] = [];

// Minimal event dispatcher. Real GA4 (gtag) / Meta Pixel (fbq) scripts are
// only loaded when their IDs are configured, so nothing fires until the
// business confirms real tracking IDs.
export function trackEvent(event: AnalyticsEvent, params?: EventParams): void {
  queue.push({ event, params, at: new Date().toISOString() });

  if (typeof window === "undefined") return;

  if (config.analytics.gaMeasurementId && typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }

  if (config.analytics.metaPixelId && typeof window.fbq === "function") {
    window.fbq("trackCustom", event, params);
  }
}

export function getQueuedEvents(): ReadonlyArray<QueuedEvent> {
  return queue;
}

export interface UtmParams {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
}

const UTM_STORAGE_KEY = "santrac_utm";

export function captureUTM(): UtmParams {
  if (typeof window === "undefined") {
    return {
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_term: null,
      utm_content: null,
    };
  }

  const params = new URLSearchParams(window.location.search);
  const fromUrl: UtmParams = {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_term: params.get("utm_term"),
    utm_content: params.get("utm_content"),
  };

  const hasAny = Object.values(fromUrl).some(Boolean);
  if (hasAny) {
    window.localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(fromUrl));
    return fromUrl;
  }

  const stored = window.localStorage.getItem(UTM_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as UtmParams;
    } catch {
      return fromUrl;
    }
  }

  return fromUrl;
}

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}
