import { validateClientId } from "../api/client";
import { injectWidget } from "../widget/widget";

// entry point
export async function init({ clientId }: { clientId: string }) {
  console.log("INIT", clientId);

  if (!clientId) {
    console.error("Feedback ClientID not found.");
    return;
  }
  const result = await validateClientId(clientId);
  if (result?.data?.valid) {
    injectWidget(clientId);
    return;
  } else {
    console.error("Invalid client:", result.message, result.data.valid);
    return;
  }
}
