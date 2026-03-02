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

      const img = new Image();
      const url = URL.createObjectURL(fullPageBlob);

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
      });

      const canvas = document.createElement("canvas");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext("2d");

      if (!ctx) throw new Error("Could not get canvas context");

      ctx.drawImage(
        img,
        window.scrollX * dpr,
        window.scrollY * dpr,
        canvas.width,
        canvas.height,
        0,
        0,
        canvas.width,
        canvas.height,
      );

      URL.revokeObjectURL(url);

      const croppedBlob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png", 1.0),
      );

      if (!croppedBlob) return null;

      return new File([croppedBlob], "feedback-viewport.png", {
        type: "image/png",
      });
    } catch (error) {
      console.error("Failed to capture viewport:", error);
      return null;
    } finally {
      setIsCapturing(false);
    }
  };

  return { captureScreen, isCapturing };
}
