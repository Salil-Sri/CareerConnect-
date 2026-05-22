// routes/resumeRoutes.js

const express = require("express");
const router = express.Router();

const uploadResume = require("../middleware/uploadResume");
const { analyzeResume } = require("../controllers/resumeController");

const { protect } = require("../middleware/authMiddleware");

// ===================================
// Resume Analysis Route
// ===================================
router.post(
  "/analyze",
  protect,
  uploadResume.single("resume"),
  analyzeResume
);

module.exports = router;