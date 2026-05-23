const User = require("../models/User");

const getStudentDashboard = async (req, res) => {
  try {
    const student = await User.findById(req.user._id).select("-password");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      name: student.name,
      email: student.email,
      role: student.role,
      resumeScore: student.resumeScore,
      verifiedProjects: student.verifiedProjects,
      appliedJobs: student.appliedJobs,
      overallProgress: student.overallProgress,
      skills: student.skills,
      verifiedSkills: student.verifiedSkills,
      githubLink: student.githubLink,
      resumeUrl: student.resumeUrl,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStudentDashboard,
};
