// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "company", "admin"],
      default: "student",
    },

    // =========================
    // DASHBOARD CORE METRICS
    // =========================
    resumeScore: {
      type: Number,
      default: 0,
    },

    jobMatchScore: {
      type: Number,
      default: 0,
    },

    verifiedProjects: {
      type: Number,
      default: 0,
    },

    appliedJobs: {
      type: Number,
      default: 0,
    },

    overallProgress: {
      type: Number,
      default: 0,
    },

    // =========================
    // SKILLS DATA
    // =========================
    skills: {
      type: [String],
      default: [],
    },

    missingSkills: {
      type: [String],
      default: [],
    },

    strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },

    suggestions: {
      type: [String],
      default: [],
    },

    // =========================
    // PROFILE LINKS
    // =========================
    githubLink: {
      type: String,
      default: "",
    },

    resumeUrl: {
      type: String,
      default: "",
    },

    latestJobDescription: {
      type: String,
      default: "",
    },

    analyzedAt: {
      type: Date,
      default: null,
    },

    // =========================
    // PROJECT VERIFICATION
    // =========================

    projectVerificationScore: {
      type: Number,
      default: 0,
    },

    verifiedBadge: {
      type: Boolean,
      default: false,
    },

    githubRepoUrl: {
      type: String,
      default: "",
    },

    totalCommits: {
      type: Number,
      default: 0,
    },

    commitDays: {
      type: Number,
      default: 0,
    },

    projectTechStack: {
      type: [String],
      default: [],
    },

    projectWarnings: {
      type: [String],
      default: [],
    },

    projectStrengths: {
      type: [String],
      default: [],
    },

    lastProjectVerifiedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
