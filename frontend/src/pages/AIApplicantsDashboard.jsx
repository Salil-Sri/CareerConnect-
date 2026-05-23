import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  ArrowUpRight,
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ShieldCheck,
  BrainCircuit,
  Star,
  SearchX,
  Filter,
  Sparkles,
  User,
  Mail,
  Calendar,
  ArrowUpDown,
  ChevronRight,
  X,
} from "lucide-react";
import API_BASE_URL from "../config/api";

export default function AIApplicantsDashboard({ jobId = "sample-job-id" }) {
  const navigate = useNavigate();
  const { jobId: routeJobId } = useParams();
  const currentJobId = routeJobId || jobId;
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Interactive UI States
  const [searchQuery, setSearchQuery] = useState("");
  const [minResumeScore, setMinResumeScore] = useState(0);
  const [sortBy, setSortBy] = useState("matchScore"); // matchScore, resumeScore, date
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  // Dynamic API Fetch
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token") || "";
        const response = await fetch(
          `${API_BASE_URL}/jobs/applicants/${currentJobId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();
        if (data.success) {
          setApplicants(data.applicants);
        } else {
          setError(
            data.message || "Pipeline failed to stream applicant matrices.",
          );
        }
      } catch (err) {
        console.error("Backend connection crashed:", err);
        setError("Network boundary disconnected. Check server status.");
      } finally {
        setLoading(false);
      }
    };

    if (currentJobId) fetchApplicants();
  }, [currentJobId]);

  // Actions
  const handleShortlist = async (applicantId) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`${API_BASE_URL}/jobs/update-applicant-status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          jobId: currentJobId,
          applicantId,
          status: "shortlisted",
        }),
      });

      // Update local applicants state so UI reflects persisted status immediately
      setApplicants((prev) =>
        prev.map((a) =>
          a._id === applicantId ? { ...a, status: "shortlisted" } : a,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (applicantId) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`${API_BASE_URL}/jobs/update-applicant-status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          jobId: currentJobId,
          applicantId,
          status: "rejected",
        }),
      });

      setApplicants((prev) =>
        prev.map((a) =>
          a._id === applicantId ? { ...a, status: "rejected" } : a,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Processing Engine (Search, Filter & Sort)
  const filteredApplicants = applicants.filter((app) => {
    const student = app.student || {};
    const name = student.name || app.name || "";
    const email = student.email || app.email || "";
    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.toLowerCase().includes(searchQuery.toLowerCase());

    const resumeScore = student.resumeScore || app.resumeScore || 0;
    const matchesScore = resumeScore >= minResumeScore;

    return matchesSearch && matchesScore;
  });

  const sortedApplicants = [...filteredApplicants].sort((a, b) => {
    const studentA = a.student || {};
    const studentB = b.student || {};
    if (sortBy === "matchScore")
      return (studentB.jobMatchScore || 0) - (studentA.jobMatchScore || 0);
    if (sortBy === "resumeScore")
      return (
        (studentB.resumeScore || b.resumeScore || 0) -
        (studentA.resumeScore || a.resumeScore || 0)
      );
    return (
      new Date(b.appliedAt || b.createdAt || Date.now()) -
      new Date(a.appliedAt || a.createdAt || Date.now())
    );
  });

  // Top Talent Identification Logic (Match Score >= 85%)
  const topCandidates = sortedApplicants
    .filter((app) => (app.student?.jobMatchScore || 0) >= 85)
    .slice(0, 2);

  // Helper function for dynamic Recommendation Badges
  const getRecommendationBadge = (score) => {
    if (score >= 85)
      return {
        text: "Highly Recommended",
        class:
          "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]",
      };
    if (score >= 70)
      return {
        text: "Good Fit",
        class:
          "bg-indigo-500/10 text-indigo-400 border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.1)]",
      };
    return {
      text: "Needs Improvement",
      class: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    };
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased relative font-sans selection:bg-purple-500 selection:text-white pb-12">
      {/* Glow Effects Matrix */}
      <div className="absolute top-0 right-0 size-125 rounded-full bg-indigo-600/5 blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 size-150 rounded-full bg-purple-600/5 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* TOP COMMAND MODULE HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-900 pb-6">
          <div>
           
            <h1 className="text-2xl sm:text-4xl font-black tracking-tigh bg-clip-text text-transparent bg-linear-to-r from-white via-slate-200 to-slate-400">
              Applications Control Desk
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Screening candidates based on real-time code verification, ATS
              structures, and match heuristics.
            </p>
          </div>
          <button
            onClick={() => navigate("/company-dashboard")}
            className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
          >
            Back to Company Dashboard
          </button>
        </div>

        {/* LOADING SKELETONS */}
        {loading && (
          <div className="space-y-6">
            <div className="h-16 bg-slate-900/40 border border-slate-800 rounded-2xl animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-96 bg-slate-900/20 border border-slate-900 rounded-2xl animate-pulse"
                />
              ))}
            </div>
          </div>
        )}

        {/* ERROR BOUNDARY DISPLAY */}
        {error && !loading && (
          <div className="p-6 bg-rose-500/5 border border-rose-500/20 rounded-2xl text-center max-w-xl mx-auto space-y-3">
            <AlertTriangle className="size-8 mx-auto text-rose-400" />
            <h3 className="text-sm font-bold text-white">
              Data Pipeline Interrupted
            </h3>
            <p className="text-xs text-slate-400">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* HIGHLIGHT ZONE: TOP RADAR CANDIDATES */}
            {topCandidates.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 px-1">
                  <Star className="size-4 text-amber-400 fill-amber-400" /> Top
                  Neural Fits Identified
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {topCandidates.map((app) => (
                    <div
                      key={app._id}
                      className="relative p-5 bg-linear-to-br from-indigo-950/20 via-purple-950/10 to-slate-900/40 border border-indigo-500/30 rounded-2xl flex items-center justify-between shadow-[0_0_30px_rgba(99,102,241,0.05)] group"
                    >
                      <div className="absolute top-0 right-0 bg-linear-to-l from-indigo-500/20 to-transparent px-3 py-1 rounded-tr-2xl rounded-bl-xl text-[9px] font-mono font-black text-indigo-300 uppercase tracking-wider border-b border-l border-indigo-500/20">
                        Top Spec Match
                      </div>
                      <div className="space-y-2">
                        <div>
                          <h4 className="text-sm sm:text-base font-extrabold text-white">
                            {app.student?.name || app.name}
                          </h4>
                          <p className="text-xs text-slate-400 font-medium">
                            {app.student?.email || app.email}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-mono">
                          <span className="text-indigo-400 font-bold">
                            Fitment: {app.student?.jobMatchScore || 0}%
                          </span>
                          <span className="text-slate-600">|</span>
                          <span className="text-purple-400 font-bold">
                            ATS Score:{" "}
                            {app.student?.resumeScore || app.resumeScore || 0}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedApplicant(app)}
                        className="p-3 bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 rounded-xl hover:bg-indigo-600 hover:text-white transition-all cursor-pointer shadow-xs"
                      >
                        <ChevronRight className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CONTROL PANEL SYSTEM - SEARCH, FILTER & SORT */}
            <div className="p-4 bg-slate-900/30 backdrop-blur-xl border border-slate-900 rounded-2xl flex flex-col lg:flex-row gap-4 items-center justify-between shadow-inner">
              <div className="relative w-full lg:max-w-md">
                <Search className="absolute left-3.5 top-3 size-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Query candidates indexing string profiles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-indigo-500/50 transition-all font-medium"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto justify-end">
                {/* ATS Range Filter */}
                <div className="flex items-center gap-3 bg-slate-950 border border-slate-900 px-3 py-1.5 rounded-xl w-full sm:w-auto">
                  <Filter className="size-3.5 text-purple-400" />
                  <span className="text-[11px] font-mono font-bold text-slate-400 whitespace-nowrap">
                    Min ATS: {minResumeScore}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={minResumeScore}
                    onChange={(e) => setMinResumeScore(Number(e.target.value))}
                    className="accent-purple-500 h-1 w-24 sm:w-32 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Sorter Dropdown */}
                <div className="flex items-center gap-2 bg-slate-950 border border-slate-900 px-3 py-2 rounded-xl w-full sm:w-auto">
                  <ArrowUpDown className="size-3.5 text-indigo-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent border-0 text-xs text-slate-300 focus:outline-hidden font-bold cursor-pointer w-full"
                  >
                    <option value="matchScore" className="bg-slate-950">
                      Sort by Match Fitment
                    </option>
                    <option value="resumeScore" className="bg-slate-950">
                      Sort by ATS Ranking
                    </option>
                    <option value="date" className="bg-slate-950">
                      Sort by Chronological Date
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* EMPTY MATRIX STATE */}
            {sortedApplicants.length === 0 ? (
              <div className="p-16 border border-dashed border-slate-900 rounded-3xl text-center max-w-md mx-auto space-y-3 bg-slate-900/5">
                <SearchX className="size-10 mx-auto text-slate-700" />
                <h3 className="text-sm font-bold text-slate-300">
                  No Vector Matches in Storage
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Try adjusting your range limit parameters or text query
                  variables.
                </p>
              </div>
            ) : (
              /* CORE APPLICANTS CARD GRID MATRIX */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedApplicants.map((app) => {
                  const student = app.student || {};
                  const matchScore = student.jobMatchScore || 0;
                  const resumeScore =
                    student.resumeScore || app.resumeScore || 0;
                  const recommendation = getRecommendationBadge(matchScore);
                  const isShortlisted = app.status === "shortlisted";
                  const isRejected = app.status === "rejected";

                  return (
                    <div
                      key={app._id}
                      className={`group relative bg-slate-900/20 backdrop-blur-md border rounded-2xl p-6 flex flex-col justify-between space-y-6 transition-all duration-300 shadow-xs hover:-translate-y-1 ${
                        isShortlisted
                          ? "border-emerald-500/40 bg-emerald-950/5"
                          : isRejected
                            ? "border-rose-500/20 bg-rose-950/5 opacity-50"
                            : "border-slate-900 hover:border-slate-800/80 hover:shadow-purple-500/5"
                      }`}
                    >
                      {/* CARD ROW 1: CORE HEURISTICS HEADERS */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-start gap-3">
                          <div className="space-y-1">
                            <h4 className="text-sm sm:text-base font-extrabold text-white group-hover:text-purple-400 transition-colors flex items-center gap-1.5">
                              {student.name || app.name}
                            </h4>
                            <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                              <Mail className="size-3 text-slate-500" />{" "}
                              {student.email || app.email}
                            </p>
                            <p className="text-[10px] text-slate-500 font-mono flex items-center gap-1.5 pt-1">
                              <Calendar className="size-3 text-slate-600" />{" "}
                              Applied:{" "}
                              {new Date(
                                app.appliedAt || app.createdAt || Date.now(),
                              ).toLocaleDateString()}
                            </p>
                          </div>

                          {/* Dynamic SVG Match Score Gauge Circle */}
                          <div className="relative size-14 shrink-0 flex items-center justify-center">
                            <svg
                              className="size-full transform -rotate-90"
                              viewBox="0 0 36 36"
                            >
                              <path
                                className="text-slate-800"
                                strokeWidth="2.5"
                                stroke="currentColor"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                              <path
                                className="text-indigo-500 transition-all duration-500"
                                strokeDasharray={`${matchScore}, 100`}
                                strokeWidth="3"
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                            </svg>
                            <div className="absolute text-[10px] font-mono font-black text-white">
                              {matchScore}%
                            </div>
                          </div>
                        </div>

                        {/* Recommendation Floating Banner */}
                        <div
                          className={`text-[10px] font-mono font-black px-2.5 py-1 rounded-md border max-w-fit tracking-wider uppercase ${recommendation.class}`}
                        >
                          {recommendation.text}
                        </div>

                        {/* ATS RESUME SCORE PROGRESS SYSTEM */}
                        <div className="space-y-1 pt-1">
                          <div className="flex justify-between text-[11px] font-bold font-mono">
                            <span className="text-slate-400">
                              ATS Blueprint Index:
                            </span>
                            <span className="text-purple-400">
                              {resumeScore}/100
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                            <div
                              className="h-full bg-linear-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                              style={{ width: `${resumeScore}%` }}
                            />
                          </div>
                        </div>

                        {/* METRIC SPECS LABELS GRID */}
                        <div className="grid grid-cols-2 gap-2 border-t border-b border-slate-900/60 py-3 text-[11px] font-medium font-mono">
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <ShieldCheck className="size-3.5 text-indigo-400" />{" "}
                            Verification:
                            <span className="text-slate-200 font-bold">
                              {student.verifiedProjects || 0}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <Sparkles className="size-3.5 text-purple-400" />{" "}
                            Pipeline:
                            <span className="text-slate-200 font-bold">
                              {student.overallProgress || 0}%
                            </span>
                          </div>
                        </div>

                        {/* SKILLS MATRICES SECTION */}
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-1">
                            {student.skills?.slice(0, 4).map((skill, idx) => (
                              <span
                                key={idx}
                                className="text-[9px] font-mono font-bold bg-slate-950 border border-slate-900 px-2 py-0.5 rounded text-slate-400"
                              >
                                {skill}
                              </span>
                            ))}
                            {student.skills?.length > 4 && (
                              <span className="text-[9px] font-mono px-1.5 py-0.5 text-slate-500">
                                +{student.skills.length - 4} more
                              </span>
                            )}
                          </div>

                          {/* Delta Missing Skills Framework */}
                          {student.missingSkills &&
                            student.missingSkills.length > 0 && (
                              <div className="flex flex-wrap gap-1 items-center">
                                <span className="text-[9px] font-mono font-black text-rose-500/80 mr-1 uppercase tracking-wider">
                                  Missing:
                                </span>
                                {student.missingSkills
                                  .slice(0, 2)
                                  .map((ms, idx) => (
                                    <span
                                      key={idx}
                                      className="text-[9px] font-mono font-bold bg-rose-500/5 border border-rose-500/20 px-1.5 py-0.5 rounded text-rose-400"
                                    >
                                      {ms}
                                    </span>
                                  ))}
                              </div>
                            )}
                        </div>
                      </div>

                      {/* CARD ROW 2: ACTION CONTROLS INTEGRATION */}
                      <div className="space-y-4 pt-4 border-t border-slate-900">
                        {/* Links Dock */}
                        <div className="flex gap-2 text-[11px] font-bold">
                          {student.resumeUrl && (
                            <a
                              href={`http://localhost:4000/${student.resumeUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <FileText className="size-3.5 text-purple-400" />{" "}
                              Resume <ArrowUpRight className="size-3" />
                            </a>
                          )}
                          {student.githubLink && (
                            <a
                              href={student.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 p-2 rounded-xl flex items-center justify-center transition-colors cursor-pointer"
                              title="GitHub Blueprint"
                            >
                              <Github className="size-3.5" />
                            </a>
                          )}
                        </div>

                        {/* HR Pipeline Decision Buttons */}
                        <div className="flex items-center gap-2 pt-1 text-xs font-bold">
                          <button
                            onClick={() => handleReject(app._id)}
                            className={`flex-1 py-2 rounded-xl transition-all border cursor-pointer flex items-center justify-center gap-1.5 ${
                              isRejected
                                ? "bg-rose-500/20 text-rose-400 border-rose-500/30"
                                : "bg-slate-950 text-slate-500 border-slate-900 hover:text-rose-400 hover:border-rose-500/20"
                            }`}
                          >
                            <XCircle className="size-3.5" /> Drop Candidate
                          </button>
                          <button
                            onClick={() => handleShortlist(app._id)}
                            className={`flex-1 py-2 rounded-xl transition-all border cursor-pointer flex items-center justify-center gap-1.5 ${
                              isShortlisted
                                ? "bg-emerald-500 text-slate-950 border-emerald-400 font-black shadow-md shadow-emerald-500/10"
                                : "bg-linear-to-r from-indigo-600 to-purple-600 text-white border-white/5 hover:opacity-90 shadow-lg shadow-indigo-500/5"
                            }`}
                          >
                            <CheckCircle2 className="size-3.5" /> Shortlist
                          </button>
                        </div>

                        {/* Secondary View Profile Link */}
                        <button
                          onClick={() => setSelectedApplicant(app)}
                          className="w-full text-center text-[11px] font-mono text-slate-500 hover:text-indigo-400 transition-colors pt-1 block cursor-pointer"
                        >
                          Deconstruct AI Analysis Data Matrix →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* FULL PROFILE EXTENDED ANALYSIS OVERLAY MODAL */}
        {selectedApplicant && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800/80 rounded-3xl w-full max-w-2xl p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto relative custom-scrollbar">
              <button
                onClick={() => setSelectedApplicant(null)}
                className="absolute top-4 right-4 p-2 bg-slate-950 border border-slate-800 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="size-4" />
              </button>

              {/* Modal Top Header Grid */}
              <div className="border-b border-slate-800 pb-4 space-y-2">
                <div className="text-[10px] font-mono font-black text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded max-w-fit uppercase tracking-widest">
                  Neural Mapping Breakdown
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {selectedApplicant.student?.name || selectedApplicant.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">
                  {selectedApplicant.student?.email || selectedApplicant.email}
                </p>
              </div>

              {/* Dual Metric Analytics Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 border border-slate-800/60 rounded-2xl flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      AI Platform Fitment
                    </div>
                    <div className="text-2xl font-mono font-black text-indigo-400 mt-1">
                      {selectedApplicant.student?.jobMatchScore || 0}%
                    </div>
                  </div>
                  <BrainCircuit className="size-8 text-indigo-500/20" />
                </div>
                <div className="bg-slate-950 p-4 border border-slate-800/60 rounded-2xl flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      ATS Scorecard Profile
                    </div>
                    <div className="text-2xl font-mono font-black text-purple-400 mt-1">
                      {selectedApplicant.student?.resumeScore ||
                        selectedApplicant.resumeScore ||
                        0}
                    </div>
                  </div>
                  <FileText className="size-8 text-purple-500/20" />
                </div>
              </div>

              {/* Swot & Delta Heuristics Engine Analysis Blocks */}
              <div className="space-y-4 text-xs sm:text-sm">
                {/* Strengths mapping vector */}
                <div className="space-y-2">
                  <h5 className="font-extrabold text-slate-300 flex items-center gap-1.5">
                    <CheckCircle2 className="size-4 text-emerald-400" />{" "}
                    Platform Verified Strengths
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedApplicant.student?.strengths?.map((str, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 font-bold text-[11px]"
                      >
                        {str}
                      </span>
                    )) || (
                      <span className="text-slate-500 italic">
                        No parameter logged.
                      </span>
                    )}
                  </div>
                </div>

                {/* Weaknesses mapping vector */}
                <div className="space-y-2">
                  <h5 className="font-extrabold text-slate-300 flex items-center gap-1.5">
                    <AlertTriangle className="size-4 text-rose-400" /> AI
                    Identified Weaknesses
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedApplicant.student?.weaknesses?.map((wk, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded bg-rose-500/5 border border-rose-500/10 text-rose-400 font-bold text-[11px]"
                      >
                        {wk}
                      </span>
                    )) || (
                      <span className="text-slate-500 italic">
                        No performance vectors logged.
                      </span>
                    )}
                  </div>
                </div>

                {/* Dynamic Long String AI Suggestions block */}
                {selectedApplicant.student?.suggestions && (
                  <div className="p-4 bg-slate-950 border border-slate-800/80 rounded-2xl space-y-1.5">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="size-3.5 text-amber-400 fill-amber-400" />{" "}
                      Automated System Hiring Suggestion
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed italic">
                      "{selectedApplicant.student.suggestions}"
                    </p>
                  </div>
                )}
              </div>

              {/* Modal Primary Action Closing triggers */}
              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setSelectedApplicant(null)}
                  className="bg-slate-950 hover:bg-slate-900 text-slate-400 border border-slate-800 text-xs font-bold px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  Close Data Streams
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
