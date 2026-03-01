// entry point

export function init({ clientId }: { clientId: string }) {
  console.log("INIT", clientId);

  injectWidget(clientId);
}

export function injectWidget(clientId: string) {
  if (document.getElementById("__feedback_iframe")) return;

  const iframe = document.createElement("iframe");

  iframe.id = "__feedback_iframe";
  iframe.src = `http://localhost:5174?projectId=${clientId}`;

  // Closed state (bubble)
  iframe.style.position = "fixed";
  iframe.style.bottom = "16px";
  iframe.style.right = "0px";
  iframe.style.width = "80px";
  iframe.style.height = "80px";
  iframe.style.border = "none";
  //   iframe.style.borderRadius = "50%";
  iframe.style.zIndex = "2147483647";
  //   iframe.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
  iframe.style.transition = "all 0.25s ease";

  document.body.appendChild(iframe);

  // Listen to widget events
  window.addEventListener("message", (event) => {
    if (event.origin !== "http://localhost:5174") return;

    if (event.data?.type === "FEEDBACK_WIDGET_OPEN") {
      iframe.style.width = "100vw";
      iframe.style.height = "100vh";
    }

    if (event.data?.type === "FEEDBACK_WIDGET_CLOSE") {
      iframe.style.width = "80px";
      iframe.style.height = "80px";
    }
  });
}

(function () {
  if (!window || typeof window === "undefined") return;
  if ((window as any).feedback) return;
  (window as any).feedback = {
    // appending methods.
    init,
  };

  console.log("[Feedback SDK] Loaded", (window as any).feedback);
})();
