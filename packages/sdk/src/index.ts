import { init } from "./core/init";
import { destroyWidget } from "./widget/widget";

(function () {
  if (typeof window === "undefined") return;
  if ((window as any).feedback) return;
  (window as any).feedback = {
    // appending methods.
    init,
    destroyWidget,
  };

  console.log("[Feedback SDK] Loaded", (window as any).feedback);
})();
