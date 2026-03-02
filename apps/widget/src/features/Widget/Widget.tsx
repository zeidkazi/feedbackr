import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  widgetFormSchema,
  type TWidgetFormPayload,
} from "@repo/common/schemas";
import { WidgetForm } from "./components/WidgetForm.tsx";
import { WidgetTrigger } from "./components/WidgetTrigger.tsx";

export function Widget() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isAnnotating, setIsAnnotating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const methods = useForm<TWidgetFormPayload>({
    resolver: zodResolver(widgetFormSchema),
    defaultValues: { message: "", email: "", image: undefined },
  });

  const imageFile = methods.watch("image");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(imageFile);
  }, [imageFile]);

  const handleClose = () => {
    setIsOpen(false);
    setIsAnnotating(false);
  };

  if (!mounted) return null;

  return createPortal(
    <div
      id="widget-root"
      className="fixed bottom-4 right-4 z-9999 font-inter md:bottom-6 md:right-6"
    >
      <FormProvider {...methods}>
        <AnimatePresence>
          {isOpen && (
            <WidgetForm
              key="form"
              isAnnotating={isAnnotating}
              previewUrl={previewUrl}
              onClose={handleClose}
              onOpenAnnotator={() => setIsAnnotating(true)}
              onCloseAnnotator={() => setIsAnnotating(false)}
              onAnnotationSave={(file: File) => {
                methods.setValue("image", file, { shouldValidate: true });
                setIsAnnotating(false);
              }}
            />
          )}
        </AnimatePresence>

        <div
          className={`mt-3 flex justify-end ${isOpen ? "hidden md:flex" : "flex"}`}
        >
          <WidgetTrigger
            isOpen={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </div>
      </FormProvider>
    </div>,
    document.body,
  );
}
