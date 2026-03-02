import { useState } from "react";
import { domToBlob } from "modern-screenshot";

const getHostBackgroundColor = () => {
  const bodyBg = window.getComputedStyle(document.body).backgroundColor;
  if (bodyBg !== "rgba(0, 0, 0, 0)" && bodyBg !== "transparent") return bodyBg;
  const htmlBg = window.getComputedStyle(
    document.documentElement,
  ).backgroundColor;
  if (htmlBg !== "rgba(0, 0, 0, 0)" && htmlBg !== "transparent") return htmlBg;
  return "#ffffff";
};

export function useScreenshot() {
  const [isCapturing, setIsCapturing] = useState(false);

  const captureScreen = async () => {
    setIsCapturing(true);
    try {
      await document.fonts.ready;

      const dpr = window.devicePixelRatio || 1;

      const fullPageBlob = await domToBlob(document.documentElement, {
        filter: (node) => (node as HTMLElement)?.id !== "widget-root",
        backgroundColor: getHostBackgroundColor(),
        scale: dpr,
        fetch: { bypassingCache: true },
      });

      if (!fullPageBlob) return null;

      return new File([fullPageBlob], "feedback-fullpage.png", {
        type: "image/png",
      });
    } catch (error) {
      console.error("Failed to capture full page:", error);
      return null;
    } finally {
      setIsCapturing(false);
    }
  };

  return { captureScreen, isCapturing };
}
