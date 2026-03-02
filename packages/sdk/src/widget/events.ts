export const FEEDBACK_EVENT = [
  "FEEDBACK_WIDGET_OPEN",
  "FEEDBACK_WIDGET_CLOSE",
] as const;

type TFeedbackEvent = (typeof FEEDBACK_EVENT)[number];

let registeredEvents = new Map<
  TFeedbackEvent,
  (this: Window, ev: MessageEvent<any>) => any
>();

export function registerListener(
  event: TFeedbackEvent,
  onMessage: (...args: any) => void,
) {
  if (registeredEvents.has(event)) return;

  const handler = (e: MessageEvent) => {
    if (e.origin !== "http://localhost:5174") return;
    if (e.data?.type === event) {
      onMessage();
      return;
    }
  };

  registeredEvents.set(event, handler);

  window.addEventListener("message", handler);
}

export function destroyListener(event: TFeedbackEvent) {
  const handler = registeredEvents.get(event);
  if (!handler) return;
  window.removeEventListener("message", handler);

  registeredEvents.delete(event);
}
