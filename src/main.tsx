
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";
  import { initClientErrorTelemetry, initWebVitalsRUM } from "./app/performance/rum.ts";

  initWebVitalsRUM();
  initClientErrorTelemetry();

  createRoot(document.getElementById("root")!).render(<App />);
  
