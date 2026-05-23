const express = require("express");

const {
  createJob,
  getAllJobs,
  getCompanyJobs,
  applyJob,
  getJobApplicants,
  updateApplicantStatus,
  getMyApplications,
} = require("../controllers/jobController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// COMPANY ROUTES

// Create Job
router.post("/create", protect, createJob);

// Get company's posted jobs
router.get("/company-jobs", protect, getCompanyJobs);

// STUDENT ROUTES

// Get all jobs
router.get("/", protect, getAllJobs);
router.get("/applicants/:jobId", protect, getJobApplicants);

// Apply for job
router.post("/apply/:id", protect, applyJob);

//Status Routes
router.patch("/update-applicant-status", protect, updateApplicantStatus);
router.get("/my-applications", protect, getMyApplications);

module.exports = router;
