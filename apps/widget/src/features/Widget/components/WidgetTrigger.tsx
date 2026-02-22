import { MessageSquare, X } from "lucide-react";
import { Button } from "@repo/ui";
import { easeInOut, motion } from "motion/react";

interface WidgetTriggerProps {
  isOpen: boolean;
  onClick: () => void;
}

export function WidgetTrigger({ isOpen, onClick }: WidgetTriggerProps) {
  const MotionButton = motion(Button);
  return (
    <MotionButton
      layout
      layoutId="trigger"
      onClick={onClick}
      size="icon"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: easeInOut }}
      className="h-14 w-14 rounded-full shadow-xl transition-all hover:scale-105"
    >
      {isOpen ? (
        <X className="h-6 w-6" />
      ) : (
        <MessageSquare className="h-6 w-6" />
      )}
    </MotionButton>
  );
}
