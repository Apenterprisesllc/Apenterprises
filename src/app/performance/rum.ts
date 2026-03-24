type RumMetricName = "LCP" | "CLS" | "INP";

interface RumMetricPayload {
  type: "web-vital";
  metric: RumMetricName;
  value: number;
  page: string;
  userAgent: string;
  ts: number;
}

interface RumQuotePayload {
  type: "quote-submit";
  status: "success" | "error";
  durationMs: number;
  page: string;
  ts: number;
}

interface RumErrorPayload {
  type: "client-error";
  message: string;
  page: string;
  ts: number;
}

type RumPayload = RumMetricPayload | RumQuotePayload | RumErrorPayload;

const RUM_ENDPOINT = "/api/rum";
let webVitalsInitialized = false;
let errorTelemetryInitialized = false;

function sendRumPayload(payload: RumPayload) {
  const body = JSON.stringify(payload);

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon(RUM_ENDPOINT, blob);
    return;
  }

  void fetch(RUM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  });
}

function getPagePath(): string {
  return typeof window === "undefined" ? "/" : window.location.pathname;
}

function getUserAgent(): string {
  return typeof navigator === "undefined" ? "unknown" : navigator.userAgent;
}

function reportWebVital(metric: RumMetricName, value: number) {
  sendRumPayload({
    type: "web-vital",
    metric,
    value,
    page: getPagePath(),
    userAgent: getUserAgent(),
    ts: Date.now(),
  });
}

function safeObserve(
  type: string,
  callback: (list: PerformanceObserverEntryList) => void,
): PerformanceObserver | null {
  try {
    const observer = new PerformanceObserver(callback);
    observer.observe({ type, buffered: true });
    return observer;
  } catch {
    return null;
  }
}

export function initWebVitalsRUM() {
  if (webVitalsInitialized || typeof window === "undefined" || typeof PerformanceObserver === "undefined") return;
  webVitalsInitialized = true;

  let clsValue = 0;
  let lcpValue = 0;
  let inpValue = 0;
  let flushed = false;

  const clsObserver = safeObserve("layout-shift", (entryList) => {
    for (const entry of entryList.getEntries() as LayoutShift[]) {
      if (!entry.hadRecentInput) clsValue += entry.value;
    }
  });

  const lcpObserver = safeObserve("largest-contentful-paint", (entryList) => {
    const entries = entryList.getEntries() as LargestContentfulPaint[];
    const lastEntry = entries[entries.length - 1];
    if (!lastEntry) return;
    lcpValue = lastEntry.startTime;
  });

  const inpObserver = safeObserve("event", (entryList) => {
    for (const entry of entryList.getEntries() as PerformanceEventTiming[]) {
      if (entry.interactionId) {
        inpValue = Math.max(inpValue, entry.duration);
      }
    }
  });

  const flush = () => {
    if (flushed) return;
    flushed = true;

    if (lcpValue > 0) reportWebVital("LCP", Number(lcpValue.toFixed(2)));
    if (clsValue > 0) reportWebVital("CLS", Number(clsValue.toFixed(4)));
    if (inpValue > 0) reportWebVital("INP", Number(inpValue.toFixed(2)));

    clsObserver?.disconnect();
    lcpObserver?.disconnect();
    inpObserver?.disconnect();
  };

  window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flush();
  });
  window.addEventListener("pagehide", flush);
}

export function initClientErrorTelemetry() {
  if (errorTelemetryInitialized || typeof window === "undefined") return;
  errorTelemetryInitialized = true;

  window.addEventListener("error", (event) => {
    const message = event.message || "Unknown client error";
    sendRumPayload({ type: "client-error", message, page: getPagePath(), ts: Date.now() });
  });

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason instanceof Error ? event.reason.message : String(event.reason);
    sendRumPayload({ type: "client-error", message: `Unhandled rejection: ${reason}`, page: getPagePath(), ts: Date.now() });
  });
}

export function reportQuoteSubmit(status: "success" | "error", durationMs: number) {
  sendRumPayload({
    type: "quote-submit",
    status,
    durationMs: Number(durationMs.toFixed(2)),
    page: getPagePath(),
    ts: Date.now(),
  });
}

