export function createWidgetIframe(clientId: string) {
  const WIDGET_URL = "http://localhost:5174";
  const iframe = document.createElement("iframe");

  iframe.id = "__feedback_iframe";
  iframe.src = `${WIDGET_URL}?clientId=${clientId}`;

  const styles = document.createElement("style");

  styles.innerHTML = `
    .defaultWidgetFrame {
      position: fixed;
      bottom: 16px;
      right: 20px;
      width: 65px;
      height: 65px;
      border: none;
      box-shadow: none;

      display: flex;
      align-items: center;
      justify-content: center; 
      z-index: 2147483647;

      transition: all 0.25s ease-in-out;
    }

    .openWidgetFrame {
        width: 100vw;
        height: 100vh;
    }
    .closeWidgetFrame {
        width: 65px;
        height: 65px;
        transition: all 0.25s ease-in-out;
    }
  `;

  iframe.classList.add("defaultWidgetFrame");

  return {
    iframe,
    styles,
  };
}
