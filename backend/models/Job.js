const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    companyName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    skillsRequired: {
      type: [String],
      default: [],
    },

    salary: {
      type: String,
      default: "Not Disclosed",
    },

    location: {
      type: String,
      default: "Remote",
    },

    experienceLevel: {
      type: String,
      enum: ["Internship", "Fresher", "Junior", "Mid-Level", "Senior"],
      default: "Fresher",
    },

    employmentType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Internship", "Contract"],
      default: "Full-Time",
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    applicants: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        name: {
          type: String,
          default: "",
        },

        email: {
          type: String,
          default: "",
        },

        appliedAt: {
          type: Date,
          default: Date.now,
        },

        resumeScore: {
          type: Number,
          default: 0,
        },

        jobMatchScore: {
          type: Number,
          default: 0,
        },
        status: {
          type: String,
          enum: ["pending", "shortlisted", "rejected"],
          default: "pending",
        },
      },
    ],

    totalApplicants: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Job", jobSchema);
