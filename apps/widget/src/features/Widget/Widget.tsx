import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { WidgetForm } from "./components/WidgetForm.tsx";
import { WidgetTrigger } from "./components/WidgetTrigger.tsx";
import { createPortal } from "react-dom";
import { ImageAnnotator } from "@/components/ImageAnnotator.tsx";

export function Widget() {
  const [isOpen, setIsOpen] = useState(false);

  return createPortal(
    <div className="fixed bottom-0 right-0 z-9999 font-inter">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <main className="relative">
            <ImageAnnotator />

            <div className="relative inline-block">
              <WidgetForm key="form" onClose={() => setIsOpen(false)} />
            </div>
          </main>
        ) : (
          <WidgetTrigger
            key="trigger"
            isOpen={isOpen}
            onClick={() => {
              setIsOpen(true);
              window.parent.postMessage({ type: "FEEDBACK_WIDGET_OPEN" }, "*");
            }}
          />
        )}
      </AnimatePresence>
    </div>,
    document.body,
  );
}
