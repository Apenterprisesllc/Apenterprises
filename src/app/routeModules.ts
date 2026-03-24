import type { ComponentType } from "react";

type RouteKey = "home" | "services" | "serviceDetail" | "quote";

type RouteModuleLoader = () => Promise<Record<string, unknown>>;

const routeModuleLoaders: Record<RouteKey, RouteModuleLoader> = {
  home: () => import("./pages/Home"),
  services: () => import("./pages/Services"),
  serviceDetail: () => import("./pages/ServiceDetail"),
  quote: () => import("./pages/Quote"),
};

const prefetched = new Set<RouteKey>();
let idlePrefetchTimer: number | null = null;

function safeRequestIdleCallback(cb: () => void, timeout = 1000) {
  if ("requestIdleCallback" in window) {
    const ric = window.requestIdleCallback as (fn: () => void, opts?: { timeout: number }) => number;
    return ric(cb, { timeout });
  }

  return window.setTimeout(cb, timeout);
}

export async function prefetchRouteModule(route: RouteKey): Promise<void> {
  if (prefetched.has(route)) return;
  prefetched.add(route);
  await routeModuleLoaders[route]();
}

export function scheduleIdleRoutePrefetch(
  currentPathname: string,
  routes: RouteKey[] = ["services", "quote"],
) {
  if (idlePrefetchTimer !== null) return;

  const targets = routes.filter((route) => {
    if (route === "home" && currentPathname === "/") return false;
    if (route === "services" && currentPathname.startsWith("/services")) return false;
    if (route === "quote" && currentPathname.startsWith("/quote")) return false;
    return true;
  });

  if (!targets.length) return;

  idlePrefetchTimer = safeRequestIdleCallback(async () => {
    for (const route of targets) {
      await prefetchRouteModule(route);
    }

    idlePrefetchTimer = null;
  });
}

export async function loadRouteComponent<T extends ComponentType<unknown>>(
  route: RouteKey,
  exportName: string,
): Promise<{ default: T }> {
  const module = await routeModuleLoaders[route]();
  const exported = module[exportName] as T | undefined;

  if (!exported) {
    throw new Error(`Route module export "${exportName}" was not found for "${route}".`);
  }

  return { default: exported };
}

