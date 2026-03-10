import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { ServiceDetail } from "./pages/ServiceDetail";
import { Quote } from "./pages/Quote";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "services", Component: Services },
      { path: "services/:serviceId", Component: ServiceDetail },
      { path: "quote", Component: Quote },
    ],
  },
]);
