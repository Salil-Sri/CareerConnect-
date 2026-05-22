// controllers/resumeController.js

const User = require("../models/User");
const { extractResumeText } = require("../services/resumeParser");
const { analyzeResumeWithGemini } = require("../services/geminiService");

const analyzeResume = async (req, res) => {
  try {
   
    // VALIDATION
   
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required.",
      });
    }

    const jobDescription = req.body.jobDescription || "";

   
    // FILE PATH
   
    const resumePath = req.file.path;

   
    // EXTRACT TEXT
   
    const resumeText = await extractResumeText(resumePath);

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({
        success: false,
        message: "Resume content could not be properly extracted.",
      });
    }

   
    // GEMINI ANALYSIS
   
    const analysis = await analyzeResumeWithGemini(
      resumeText,
      jobDescription
    );

   
    // USER UPDATE
   
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        resumeScore: analysis.resumeScore || 0,
        jobMatchScore: analysis.jobMatchScore || 0,
        missingSkills: analysis.missingSkills || [],
        strengths: analysis.strengths || [],
        weaknesses: analysis.weaknesses || [],
        suggestions: analysis.suggestions || [],
        resumeUrl: resumePath,
        latestJobDescription: jobDescription,
        analyzedAt: new Date(),
      },
      { new: true }
    );

   
    // RESPONSE
   
    res.status(200).json({
      success: true,
      resumeScore: updatedUser.resumeScore,
      jobMatchScore: updatedUser.jobMatchScore,
      missingSkills: updatedUser.missingSkills,
      strengths: updatedUser.strengths,
      weaknesses: updatedUser.weaknesses,
      suggestions: updatedUser.suggestions,
      resumeUrl: updatedUser.resumeUrl,
    });

  } catch (error) {
    console.error("Resume analysis failed:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Resume analysis failed.",
    });
  }
};

module.exports = { analyzeResume };