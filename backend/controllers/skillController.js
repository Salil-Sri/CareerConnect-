const SkillQuestion = require("../models/SkillQuestion");
const User = require("../models/user");


// GET QUESTIONS

const getSkillQuestions = async (req, res) => {
  try {
    const { skill } = req.params;

    const questions = await SkillQuestion.find({ skill });

    res.json({
      success: true,
      totalQuestions: questions.length,
      questions,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch questions",
    });
  }
};


// SUBMIT TEST

const submitSkillTest = async (req, res) => {
  try {
    const { skill, answers } = req.body;

    const questions = await SkillQuestion.find({ skill });

    if (!questions.length) {
      return res.status(404).json({
        success: false,
        message: "No questions found",
      });
    }

    let correctCount = 0;

    questions.forEach((question) => {
      const selectedAnswer = answers[question._id];

      if (selectedAnswer === question.correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round(
      (correctCount / questions.length) * 100
    );

    const passed = score >= 70;

    const user = await User.findById(req.user._id);

    // prevent duplicate verified skill
    const alreadyExists = user.verifiedSkills.find(
      (item) => item.skill === skill
    );

    if (!alreadyExists && passed) {
      user.verifiedSkills.push({
        skill,
        score,
        verified: true,
      });

      await user.save();
    }

    res.json({
      success: true,
      score,
      passed,
      totalQuestions: questions.length,
      correctAnswers: correctCount,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Skill test failed",
    });
  }
};

module.exports = {
  getSkillQuestions,
  submitSkillTest,
};