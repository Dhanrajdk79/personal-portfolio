const express = require("express");
const { generateAIResponse } = require("../services/geminiService");

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "A valid message is required.",
      });
    }

    const reply = await generateAIResponse(message.trim());

    return res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("Gemini API error:", error.message);

    return res.status(500).json({
      success: false,
      message: "AI service is temporarily unavailable.",
    });
  }
});

module.exports = router;