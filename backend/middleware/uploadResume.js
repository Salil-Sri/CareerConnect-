// middleware/uploadResume.js

const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads/resumes folder exists
const uploadPath = "uploads/resumes";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// File validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = [".pdf", ".docx"];

  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(
      new Error("Only PDF and DOCX files are allowed for resume upload."),
      false
    );
  }
};

// Upload middleware
const uploadResume = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
});

module.exports = uploadResume;