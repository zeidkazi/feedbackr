import { injectWidget } from "../widget/widget";

// entry point
export function init({ clientId }: { clientId: string }) {
  console.log("INIT", clientId);

  if (!clientId) {
    console.error("Feedback ClientID not found.");
    return;
  }

  // PENDING:
  // validations, server checks api calls.

  injectWidget(clientId);
}
