
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export async function submitContactMessage(data) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/contact`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.message || "Unable to submit your message."
      );
    }

    return result;
  } catch (error) {
    console.error("Contact submission error:", error);
    throw error;
  }
}
