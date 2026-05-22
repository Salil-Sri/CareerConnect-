const express = require("express");

const {
  verifyProject,
} = require("../controllers/projectVerificationController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/verify", protect, verifyProject);

module.exports = router;
