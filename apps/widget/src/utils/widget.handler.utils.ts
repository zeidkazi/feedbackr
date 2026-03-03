import { TWidgetFormPayload } from "@repo/common/schemas";

export async function submitFeedback(data: TWidgetFormPayload) {
  const searchParams = new URLSearchParams(window.location.search);
  const clientId = searchParams.get("clientId");

  const formData = new FormData();

  if (data.image) {
    formData.append("images", data.image);
  }

  formData.append("email", data.email);
  formData.append("message", data.message || "");

  //change with pareant url, its of iframe currently
  formData.append("url", window.location.href);
  formData.append("clientContext", JSON.stringify({}));
  formData.append("debugContext", JSON.stringify({}));
  

  const response = await fetch("http://localhost:8001/api/feedback", {
    method: "POST",
    headers: {
      "x-client-id": clientId || "",
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to send feedback");
  }

  return response.json();
}
