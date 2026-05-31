import React, { useState, useEffect } from "react";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Search,
  SlidersHorizontal,
  Sparkles,
  CheckCircle2,
  Clock,
  Building2,
  ArrowUpRight,
  RefreshCw,
  Cpu,
  Bookmark,
  GraduationCap,
} from "lucide-react";
import { API_BASE_URL } from "../config/api";

export default function StudentJobPortal() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applyingId, setApplyingId] = useState(null);

  // Filtering states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedExp, setSelectedExp] = useState("All");

  // Track application state locally for immediate UI response
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());
  const [applicationStatuses, setApplicationStatuses] = useState({});

  // Fetch jobs on component mount
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token") || "";

      const response = await fetch(`${API_BASE_URL}/jobs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setJobs(data.jobs);

        // Context Check: Student current ID se matching applications read karke button state lock karna
        // Parsing existing applicant lists to avoid multi-click redundancy
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const studentId = userInfo?._id;
        if (studentId) {
          const alreadyApplied = new Set();
          const statuses = {};
          data.jobs.forEach((job) => {
            const application = job.applicants?.find(
              (app) =>
                app.student === studentId || app.student?._id === studentId,
            );
            if (application) {
              alreadyApplied.add(job._id);
              statuses[job._id] = application.status || "pending";
            }
          });
          setAppliedJobIds(alreadyApplied);
          setApplicationStatuses(statuses);
        }
      } else {
        setError(data.message || "Failed to fetch active streams.");
      }
    } catch (err) {
      setError("Database backend linkage down.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Handle Application submission to backend execution route `/api/jobs/apply/:id`
  const handleApply = async (jobId) => {
    try {
      setApplyingId(jobId);
      const token = localStorage.getItem("token") || "";

      const response = await fetch(`${API_BASE_URL}/jobs/apply/${jobId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        // Update local state directly to show instant feedback success
        setAppliedJobIds((prev) => new Set([...prev, jobId]));
        setApplicationStatuses((prev) => ({ ...prev, [jobId]: "pending" }));
        // Reload global variables to increment counters if required
        fetchJobs();
      } else {
        alert(data.message || "Application rejected by core routing engine.");
      }
    } catch (err) {
      console.error("Application network crash:", err);
      alert("Pipeline dropped error connection.");
    } finally {
      setApplyingId(null);
    }
  };

  // Advanced client-side search indexing
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.skillsRequired || []).some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesType =
      selectedType === "All" || job.employmentType === selectedType;
    const matchesExp =
      selectedExp === "All" || job.experienceLevel === selectedExp;

    return matchesSearch && matchesType && matchesExp;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased relative selection:bg-indigo-500 selection:text-white">
      {/* Decorative Matrix Ambient Lights */}
      <div className="absolute top-[-5%] right-[-5%] size-100 rounded-full bg-purple-500/10 blur-[130px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-[20%] left-[-5%] size-125 rounded-full bg-indigo-500/10 blur-[160px] pointer-events-none -z-10" />

      {/* CORE WRAPPER CONTROLLER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* HEADER AREA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-900 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20 max-w-fit font-bold mb-2 uppercase tracking-wider">
              <Cpu className="size-3.5 animate-spin" /> AI Screening Active
              Marketplace
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Explore Live Openings
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Your synced profile score determines position priority in
              corporate verification lists.
            </p>
          </div>
          <button
            onClick={fetchJobs}
            className="flex items-center gap-2 text-xs font-bold bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white text-slate-300 px-4 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            <RefreshCw
              className={`size-3.5 ${loading ? "animate-spin text-indigo-400" : ""}`}
            />{" "}
            Sync Database Feed
          </button>
        </div>

        {/* SEARCH AND FILTERS CORE DOCK */}
        <div className="p-4 bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-2xl grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3.5 top-3 size-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by role matrix, company vector, or target skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-indigo-500/50 transition-all font-medium"
            />
          </div>
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-300 focus:outline-hidden focus:border-indigo-500/50 font-bold"
            >
              <option value="All">All Job Types</option>
              {["Full-Time", "Part-Time", "Internship", "Contract"].map(
                (type) => (
                  <option key={type} value={type} className="bg-slate-900">
                    {type}
                  </option>
                ),
              )}
            </select>
          </div>
          <div>
            <select
              value={selectedExp}
              onChange={(e) => setSelectedExp(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-300 focus:outline-hidden focus:border-indigo-500/50 font-bold"
            >
              <option value="All">All Experience Levels</option>
              {["Internship", "Fresher", "Junior", "Mid-Level", "Senior"].map(
                (exp) => (
                  <option key={exp} value={exp} className="bg-slate-900">
                    {exp}
                  </option>
                ),
              )}
            </select>
          </div>
        </div>

        {/* JOB STREAM ENGINE CONTAINER */}
        {loading ? (
          <div className="p-20 text-center text-xs font-mono text-slate-500 animate-pulse">
            Connecting streams with backend router matrix...
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="p-16 border border-dashed border-slate-800/80 rounded-2xl text-center max-w-md mx-auto space-y-2">
            <Briefcase className="size-8 mx-auto text-slate-600" />
            <h3 className="text-sm font-bold text-slate-300">
              No Target Vectors Found
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Try modifying your text terms or structural navigation criteria
              parameters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => {
              const isApplied = appliedJobIds.has(job._id);
              const applicationStatus =
                applicationStatuses[job._id] || (isApplied ? "pending" : null);
              const statusLabel =
                applicationStatus === "shortlisted"
                  ? "Accepted"
                  : applicationStatus === "rejected"
                    ? "Rejected"
                    : applicationStatus === "pending"
                      ? "Pending Review"
                      : null;
              const statusStyles =
                applicationStatus === "shortlisted"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : applicationStatus === "rejected"
                    ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                    : "bg-amber-500/10 text-amber-300 border-amber-500/20";

              return (
                <div
                  key={job._id}
                  className="group relative p-6 bg-slate-900/20 border border-slate-800/60 hover:border-slate-700/80 rounded-2xl flex flex-col justify-between space-y-6 transition-all duration-300 shadow-xs hover:shadow-indigo-500/5 hover:-translate-y-0.5"
                >
                  {/* Top Row Title & Badges */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="text-base font-extrabold text-white group-hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                          {job.title}
                        </h3>
                        <p className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                          <Building2 className="size-3.5 text-slate-500" />{" "}
                          {job.companyName}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <span className="text-[10px] font-mono bg-slate-900 border border-slate-800/60 font-bold px-2.5 py-1 rounded-md text-purple-400">
                          {job.employmentType}
                        </span>
                        {statusLabel && (
                          <div
                            className={`flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold border ${statusStyles}`}
                          >
                            {statusLabel}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Meta Parameters Grid Layout */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-400 pt-1">
                      <div className="flex items-center gap-1.5 truncate">
                        <MapPin className="size-3.5 text-slate-600" />{" "}
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <DollarSign className="size-3.5 text-slate-600" />{" "}
                        {job.salary}
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <GraduationCap className="size-3.5 text-slate-600" />{" "}
                        {job.experienceLevel}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[10px]">
                        <Clock className="size-3.5 text-slate-600" />{" "}
                        {new Date(job.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Raw String Core Truncated Description */}
                    <p className="text-xs text-slate-400 font-medium line-clamp-2 pt-2 border-t border-slate-900">
                      {job.description}
                    </p>
                  </div>

                  {/* Skills Cloud & Operational Triggers */}
                  <div className="space-y-4 pt-4 border-t border-slate-900/60">
                    <div className="flex flex-wrap gap-1.5">
                      {job.skillsRequired?.map((skill, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 font-bold border border-slate-900"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 pt-1">
                      <button
                        disabled={isApplied || applyingId === job._id}
                        onClick={() => handleApply(job._id)}
                        className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border ${
                          isApplied
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 opacity-90 cursor-not-allowed"
                            : "bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/10 border-white/10"
                        }`}
                      >
                        {applyingId === job._id ? (
                          <>
                            <RefreshCw className="size-3.5 animate-spin" />{" "}
                            Transmitting Vector...
                          </>
                        ) : applicationStatus === "shortlisted" ? (
                          <>
                            <CheckCircle2 className="size-3.5 text-emerald-400" />{" "}
                            Accepted by Company
                          </>
                        ) : applicationStatus === "rejected" ? (
                          <>
                            <CheckCircle2 className="size-3.5 text-rose-400" />{" "}
                            Rejected by Company
                          </>
                        ) : isApplied ? (
                          <>
                            <CheckCircle2 className="size-3.5 text-amber-400" />{" "}
                            Already Applied
                          </>
                        ) : (
                          <>
                            Apply Instantly{" "}
                            <ArrowUpRight className="size-3.5" />
                          </>
                        )}
                      </button>
                      <button className="p-2.5 bg-slate-950 hover:bg-slate-900 text-slate-500 hover:text-slate-300 border border-slate-800/60 rounded-xl transition-colors cursor-pointer">
                        <Bookmark className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
