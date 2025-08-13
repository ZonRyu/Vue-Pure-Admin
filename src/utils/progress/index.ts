import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
  // Animation style
  easing: "ease",
  // Progress bar animation speed (ms)
  speed: 500,
  // Whether to show the loading spinner
  showSpinner: false,
  // Auto-increment interval (ms)
  trickleSpeed: 200,
  // Minimum percentage at initialization (0.0 - 1.0)
  minimum: 0.3
});

export default NProgress;
