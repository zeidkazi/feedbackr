import { useState } from "react";
import { X, Send, Camera, MessageSquare } from "lucide-react";
import { Button, Textarea, Input, Label } from "@repo/ui";
import { motion } from "motion/react";

export function WidgetForm({ onClose }: { onClose: () => void }) {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  return (
    <motion.div
      layout
      layoutId="form"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-border bg-card shadow-2xl sm:w-[400px]"
    >
      <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          <span className="font-medium">Send Feedback</span>
        </div>
        <button
          onClick={onClose}
          className="rounded-md p-1 transition-colors hover:bg-white/20"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-col gap-5 p-5">
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <Label
              htmlFor="message"
              className="text-sm font-medium text-foreground"
            >
              Message
            </Label>
          </div>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your issue or share your ideas..."
            className="min-h-[120px] resize-none bg-muted/30 text-base sm:text-sm"
            autoFocus
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-foreground"
            >
              Email
            </Label>
            <span className="text-xs text-muted-foreground">(optional)</span>
          </div>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="bg-muted/30"
            required
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            Attachments
          </Label>
          <div>
            <Button
              variant="outline"
              size="sm"
              type="button"
              className="h-9 gap-2 text-muted-foreground hover:text-foreground"
            >
              <Camera className="h-4 w-4" />
              Add screenshot
            </Button>
          </div>
        </div>

        <Button
          className="w-full gap-2 py-5 text-sm font-medium"
          disabled={!email.trim()}
          onClick={() => console.log("UI ONLY:", { message, email })}
        >
          <Send className="h-4 w-4" />
          Send Feedback
        </Button>

        <div className="mt-2 border-t pt-4 text-center text-xs text-muted-foreground">
          Powered by{" "}
          <span className="font-semibold text-primary">Feedbackr</span>
        </div>
      </div>
    </motion.div>
  );
}
