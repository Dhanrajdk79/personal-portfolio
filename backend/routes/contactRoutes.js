
const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, phone, message } = req.body;

    // Basic validation
    if (
      !name?.trim() ||
      !phone?.trim() ||
      !message?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (
      name.length > 100 ||
      message.length > 2000 ||
      !/^\+?[0-9]{10,15}$/.test(
        phone.replace(/[\s-]/g, "")
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid contact details.",
      });
    }

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (!scriptUrl) {
      return res.status(500).json({
        success: false,
        message: "Google Apps Script URL is not configured.",
      });
    }

    // Forward data to Google Apps Script
    const scriptResponse = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        name: name.trim(),
        phone: phone.replace(/[\s-]/g, ""),
        message: message.trim(),
      }),
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });

    if (!scriptResponse.ok) {
      throw new Error("Google Apps Script request failed.");
    }

    const result = await scriptResponse.json();

    if (!result.success) {
      return res.status(502).json({
        success: false,
        message: result.error || "Unable to save your message.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Your message was saved successfully!",
    });

  } catch (error) {
    console.error("Contact API Error:", error.message);

    return res.status(502).json({
      success: false,
      message: "Unable to submit your message. Please try again.",
    });
  }
});

module.exports = router;
