// routes/authRoutes.js
const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authController");
const { verifyToken, logoutUser } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify", protect, verifyToken);
router.post("/logout", protect, logoutUser);

module.exports = router;
