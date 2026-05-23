const mongoose = require("mongoose");

const skillQuestionSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: true,
    },

    question: {
      type: String,
      required: true,
    },

    options: {
      type: [String],
      required: true,
    },

    correctAnswer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "SkillQuestion",
  skillQuestionSchema
);