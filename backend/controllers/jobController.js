const Job = require("../models/Job");
const User = require("../models/user");

// CREATE JOB

const createJob = async (req, res) => {
  try {
    const {
      title,
      companyName,
      description,
      skillsRequired,
      salary,
      location,
      experienceLevel,
      employmentType,
    } = req.body;

    // Validation
    if (!title || !companyName || !description) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    // Company role check
    if (req.user.role !== "company") {
      return res.status(403).json({
        message: "Only companies can post jobs",
      });
    }

    // Create Job
    const job = await Job.create({
      title,
      companyName,
      description,
      skillsRequired,
      salary,
      location,
      experienceLevel,
      employmentType,
      postedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to create job",
      error: error.message,
    });
  }
};

// GET ALL JOBS

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true })
      .populate("postedBy", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      totalJobs: jobs.length,
      jobs,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch jobs",
      error: error.message,
    });
  }
};

// GET COMPANY JOBS

const getCompanyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      postedBy: req.user._id,
    })
      .populate("applicants.student", "name email resumeScore")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      totalJobs: jobs.length,
      jobs,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch company jobs",
      error: error.message,
    });
  }
};

// GET JOB APPLICANTS

const getJobApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId).populate(
      "applicants.student",
      `
      name
      email
      resumeScore
      jobMatchScore
      skills
      missingSkills
      strengths
      weaknesses
      suggestions
      githubLink
      resumeUrl
      verifiedProjects
      overallProgress
      `,
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Security check
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized access",
      });
    }

    res.json({
      success: true,
      totalApplicants: job.applicants.length,
      applicants: job.applicants,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch applicants",
      error: error.message,
    });
  }
};

// APPLY JOB

const applyJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Prevent companies from applying
    if (req.user.role !== "student") {
      return res.status(403).json({
        message: "Only students can apply",
      });
    }

    // Check duplicate application
    const alreadyApplied = job.applicants.some((applicant) =>
      applicant.student.equals(req.user._id),
    );

    if (alreadyApplied) {
      return res.status(400).json({
        message: "You already applied for this job",
      });
    }

    // Get student data
    const user = await User.findById(req.user._id);

    // Push applicant
    job.applicants.push({
      student: req.user._id,
      resumeScore: user.resumeScore,
      jobMatchScore: user.jobMatchScore,
      name: user.name,
      email: user.email,
    });

    job.totalApplicants += 1;

    await job.save();

    // Update student stats
    user.appliedJobs += 1;

    await user.save();

    res.json({
      success: true,
      message: "Job application submitted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Job application failed",
      error: error.message,
    });
  }
};
const updateApplicantStatus = async (req, res) => {
  try {
    const { jobId, applicantId, status } = req.body;

    // ADD THIS HERE
    if (req.user.role !== "company") {
      return res.status(403).json({
        success: false,
        message: "Only companies can update applicant status",
      });
    }

    // validation
    if (!jobId || !applicantId || !status) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const validStatuses = ["pending", "shortlisted", "rejected"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid applicant status",
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // SECURITY CHECK
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const applicant = job.applicants.id(applicantId);

    if (!applicant) {
      return res.status(404).json({
        success: false,
        message: "Applicant not found",
      });
    }

    applicant.status = status;

    await job.save();

    res.json({
      success: true,
      message: `Applicant ${status} successfully`,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to update applicant status",
      error: error.message,
    });
  }
};
const getMyApplications = async (req, res) => {
  try {
    const jobs = await Job.find({
      "applicants.student": req.user._id,
    }).select(
      "title companyName applicants"
    );

    const applications = jobs.map((job) => {
      const myApplication = job.applicants.find(
        (app) =>
          app.student.toString() === req.user._id.toString()
      );

      return {
        jobId: job._id,
        title: job.title,
        companyName: job.companyName,
        status: myApplication.status || "pending",
      };
    });

    res.json({
      success: true,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getCompanyJobs,
  applyJob,
  getJobApplicants,
  updateApplicantStatus,
  getMyApplications,
};
