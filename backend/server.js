const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

connectDB();

const app = express();

// JSON parser first
app.use(express.json());

// CORS
const allowedOrigins = new Set(
  [
    process.env.FRONTEND_URL,
    "https://career-connect-hazel.vercel.app",
    "http://localhost:5173",
  ].filter(Boolean),
);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (
        allowedOrigins.has(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin)
      ) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  }),
);

// Routes
const studentRoutes = require("./routes/studentRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const projectVerificationRoutes = require("./routes/projectVerificationRoutes");
const jobRoutes = require("./routes/jobRoutes");
const skillRoutes = require("./routes/skillRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/mentor", require("./routes/mentorRoutes"));
app.use("/api/resume", resumeRoutes);
app.use("/api/project", projectVerificationRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/skills", skillRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
