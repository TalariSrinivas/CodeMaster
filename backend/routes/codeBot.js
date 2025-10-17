
const express = require("express");
const router = express.Router();
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const MOCK_MODE = process.env.MOCK_GEMINI === "true";

router.post("/generate-code", async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey && !MOCK_MODE) {
    return res.status(500).json({ error: "Gemini API key not set in .env" });
  }

  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  if (MOCK_MODE) {
    return res.json({
      code: `// Mocked response for prompt: "${prompt}"`,
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-preview-05-20",
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ code: text }); // ✅ renamed "text" → "code"
  } catch (error) {
    console.error("Error generating text:", error.response?.data || error.message);
    const errorDetail =
      error.response?.data?.error?.message ||
      "Failed to generate text due to an unknown API error.";
    res.status(500).json({ error: errorDetail });
  }
});

module.exports = router;
