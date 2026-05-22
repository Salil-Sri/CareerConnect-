// services/resumeParser.js

const fs = require("fs");
const { PDFParse } = require("pdf-parse");
const mammoth = require("mammoth");
const path = require("path");

const extractResumeText = async (filePath) => {
  try {
    const ext = path.extname(filePath).toLowerCase();

    // =========================
    // PDF PARSING
    // =========================
    if (ext === ".pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      const parser = new PDFParse({ data: dataBuffer });

      try {
        const pdfData = await parser.getText();
        return pdfData.text;
      } finally {
        await parser.destroy();
      }
    }

    // =========================
    // DOCX PARSING
    // =========================
    else if (ext === ".docx") {
      const result = await mammoth.extractRawText({
        path: filePath,
      });

      return result.value;
    }

    // =========================
    // UNSUPPORTED FILE
    // =========================
    else {
      throw new Error("Unsupported resume file format.");
    }
  } catch (error) {
    throw new Error("Resume parsing failed: " + error.message);
  }
};

module.exports = { extractResumeText };
