const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

// Gemini API ko initialize karein
// Ye automatically tumhare .env file se process.env.GEMINI_API_KEY ko pick kar lega
// Solution 1: Direct API Key pass kar do (Sabse safe aur accurate tareeka)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const getAIMentorResponse = async (req, res) => {
  try {
    const { message } = req.body;

    console.log("Incoming mentor request:", req.body);

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    // Gemini 2.5 Flash model call kar rahe hain jo chatbot ke liye fastest aur best hai
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
      config: {
        // System instruction se hum chatbot ka behavior set karte hain
        systemInstruction: "You are an AI career mentor helping students with jobs, skills, roadmap, resume, interview prep, and career growth.",
      }
    });

    // Response send kar rahe hain frontend ko
    res.json({
      reply: response.text,
    });

  } catch (error) {
    console.log("FULL GEMINI ERROR:", error);

    // Agar rate limit ya quota ka koi issue aaye toh uske liye fallback
    if (error.status === 429) {
      return res.status(200).json({
        reply:
          "Your AI Mentor quota is currently exhausted. For now, focus on strengthening MERN stack projects, DSA, resume optimization, and mock interviews to improve placement readiness.",
      });
    }

    res.status(500).json({
      message: "AI Mentor failed. Please check Gemini API configuration or server logs.",
    });
  }
};

module.exports = { getAIMentorResponse };