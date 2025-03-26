import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Create root with concurrent mode
const root = createRoot(document.getElementById("root")!);

// Add event timing optimization for better interaction metrics
window.addEventListener('DOMContentLoaded', () => {
  // Use a timeout to defer non-critical initialization
  setTimeout(() => {
    // Report web vitals when available
    import('web-vitals').then((webVitals) => {
      // Correctly access the web vitals functions
      webVitals.onCLS(console.log);
      webVitals.onFID(console.log);
      webVitals.onLCP(console.log);
    }).catch(() => {
      // Silently fail if web-vitals is not available
    });
  }, 0);
});

// Hydrate the app
root.render(<App />);
