const axios = require("axios");

// Ensure API key exists before initializing
if (!process.env.GEMINI_API_KEY) {
  console.error(
    "CRITICAL WARNING: GEMINI_API_KEY is not defined in environment variables!"
  );
}

const analyzeResumeWithGemini = async (resumeText, jobDescription) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    
   const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;

    const prompt = `
You are an advanced ATS Resume Analyzer and Career Optimization AI.

Analyze the following candidate resume against the provided job description.

RESUME TEXT:
${resumeText}

JOB DESCRIPTION:
${jobDescription || "General full-stack software engineering role"}

SCORING RULES:
- resumeScore: Evaluate ATS formatting, technical quality, impactful projects, and overall skill relevance.
- jobMatchScore: Evaluate alignment with the provided Job Description, keyword matching, and missing skill coverage.
- Scores must be realistic numbers between 0 and 100.

Return ONLY valid JSON.
`;

    // ✅ Correct camelCase keys
    const requestBody = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],

      generationConfig: {
        responseMimeType: "application/json",

        responseSchema: {
          type: "OBJECT",

          properties: {
            resumeScore: {
              type: "INTEGER",
            },

            jobMatchScore: {
              type: "INTEGER",
            },

            missingSkills: {
              type: "ARRAY",
              items: {
                type: "STRING",
              },
            },

            strengths: {
              type: "ARRAY",
              items: {
                type: "STRING",
              },
            },

            weaknesses: {
              type: "ARRAY",
              items: {
                type: "STRING",
              },
            },

            suggestions: {
              type: "ARRAY",
              items: {
                type: "STRING",
              },
            },
          },

          required: [
            "resumeScore",
            "jobMatchScore",
            "missingSkills",
            "strengths",
            "weaknesses",
            "suggestions",
          ],
        },
      },
    };

    // ✅ API Request
    const response = await axios.post(url, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // ✅ Validate response structure
    if (
      !response.data ||
      !response.data.candidates ||
      !response.data.candidates[0]
    ) {
      throw new Error(
        "Invalid structure or empty data received from Gemini API."
      );
    }

    // ✅ Extract JSON string
    const jsonTextString =
      response.data.candidates[0].content.parts[0].text;

    // ✅ Convert string to JSON object
    const parsedData = JSON.parse(jsonTextString);

    return parsedData;
  } catch (error) {
    console.error(
      "Gemini Native HTTP Service Error Detail:",
      error.response ? error.response.data : error.message
    );

    throw new Error(
      "Gemini analysis failed: " +
        (error.response?.data?.error?.message || error.message)
    );
  }
};

module.exports = { analyzeResumeWithGemini };