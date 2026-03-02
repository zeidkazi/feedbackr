export function sendMessageToIframe<
  T extends
    | string
    | {
        type: string;
        payload: any;
      },
>(iframeRef: HTMLIFrameElement, message: T) {
  iframeRef?.contentWindow?.postMessage(message);
}
