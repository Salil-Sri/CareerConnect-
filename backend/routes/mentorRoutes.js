const express = require("express");
const router = express.Router();

const { getAIMentorResponse } = require("../controllers/mentorController");
const { protect } = require("../middleware/authMiddleware");

router.post("/chat", protect, getAIMentorResponse);

module.exports = router;