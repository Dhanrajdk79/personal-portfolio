
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export async function submitContactMessage(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

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

// AI Assistant API
export async function sendAIMessage(message) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ai/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "AI assistant is unavailable.");
    }

    return result.reply;
  } catch (error) {
    console.error("AI chat error:", error);
    throw error;
  }
}
