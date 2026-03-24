import { Suspense, lazy, type ComponentType } from "react";
import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { loadRouteComponent } from "./routeModules";

const Home = lazy(() => loadRouteComponent("home", "Home"));
const Services = lazy(() => loadRouteComponent("services", "Services"));
const ServiceDetail = lazy(() => loadRouteComponent("serviceDetail", "ServiceDetail"));
const Quote = lazy(() => loadRouteComponent("quote", "Quote"));

function PageFallback() {
  return <div className="min-h-[40vh]" aria-hidden="true" />;
}

function withSuspense(Component: ComponentType) {
  return function SuspendedRouteComponent() {
    return (
      <Suspense fallback={<PageFallback />}>
        <Component />
      </Suspense>
    );
  };
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: withSuspense(Home) },
      { path: "services", Component: withSuspense(Services) },
      { path: "services/:serviceId", Component: withSuspense(ServiceDetail) },
      { path: "quote", Component: withSuspense(Quote) },
    ],
  },
]);
