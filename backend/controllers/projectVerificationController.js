const axios = require("axios");
const User = require("../models/user");

const verifyProject = async (req, res) => {
  try {
    const { repoUrl } = req.body;

    if (!repoUrl) {
      return res.status(400).json({
        message: "Repository URL is required",
      });
    }

    // Extract owner + repo name

    const parts = repoUrl.split("/");

    const owner = parts[3];
    const repo = parts[4];

    if (!owner || !repo) {
      return res.status(400).json({
        message: "Invalid GitHub repository URL",
      });
    }

    // GitHub Headers

    const headers = {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
    };

    // Fetch Repo Details

    const repoResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`,
      { headers }
    );

    // Fetch Languages

    const languageResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/languages`,
      { headers }
    );

    // Fetch Commits

    const commitResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/commits`,
      { headers }
    );

    // Extract Data

    const repoData = repoResponse.data;

    const languages = Object.keys(languageResponse.data);

    const commits = commitResponse.data;

    const totalCommits = commits.length;

    // Unique commit days

    const uniqueDays = new Set(
      commits.map((commit) =>
        commit.commit.author.date.split("T")[0]
      )
    );

    const commitDays = uniqueDays.size;

    // Score Logic

    let score = 0;

    if (repoData.description) score += 10;

    if (repoData.homepage) score += 10;

    if (languages.length >= 2) score += 20;

    if (totalCommits >= 10) score += 25;

    if (commitDays >= 5) score += 20;

    if (repoData.stargazers_count >= 1) score += 15;

    if (score > 100) score = 100;

    // Generate Grade

    let grade = "C";

    if (score >= 90) grade = "A+";
    else if (score >= 75) grade = "A";
    else if (score >= 60) grade = "B";

    // Update User

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Increase verified project count only for new repo

    if (user.githubRepoUrl !== repoUrl) {
      user.verifiedProjects += 1;
    }

    user.projectVerificationScore = score;

    user.verifiedBadge = score >= 70;

    user.githubRepoUrl = repoUrl;

    user.totalCommits = totalCommits;

    user.commitDays = commitDays;

    user.projectTechStack = languages;

    user.projectStrengths = [
      "Consistent commit activity",
      "Multiple technologies detected",
    ];

    user.projectWarnings = [
      "Improve documentation for higher ATS visibility",
    ];

    user.lastProjectVerifiedAt = new Date();

    await user.save();

    // Final Response

    res.json({
      success: true,

      projectVerificationScore: score,

      verifiedBadge: score >= 70,

      grade,

      totalCommits,

      commitDays,

      projectTechStack: languages,

      githubRepoUrl: repoUrl,

      verifiedProjects: user.verifiedProjects,

      projectStrengths: user.projectStrengths,

      projectWarnings: user.projectWarnings,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Project verification failed",
      error: error.message,
    });
  }
};

module.exports = { verifyProject };