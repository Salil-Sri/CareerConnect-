const express = require("express");

const router = express.Router();

const {
  getSkillQuestions,
  submitSkillTest,
} = require("../controllers/skillController");

const { protect } = require("../middleware/authMiddleware");

router.get("/:skill", protect, getSkillQuestions);

router.post("/submit", protect, submitSkillTest);

module.exports = router;
