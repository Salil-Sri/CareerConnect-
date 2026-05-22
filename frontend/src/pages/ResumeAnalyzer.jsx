import React, { useState } from "react";
import {
  FileText,
  UploadCloud,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Gauge,
  RefreshCw,
  ArrowRight,
  Plus,
  Zap,
  Bookmark,
  Briefcase,
  Lightbulb,
} from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

const ResumeAnalyzer = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  // Dynamic API / Response State
  const [analysisData, setAnalysisData] = useState(null);

  // Drag and Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  // 🌟 FIX 1: Browse button ke liye missing function wapas add kar diya
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = (file) => {
    setFileName(file.name);
    setSelectedFile(file);
    setFileUploaded(true);
  };

  // 🌟 FIX 2: Live Backend API call integration setup
  const triggerAnalysis = async () => {
    if (!fileUploaded || !selectedFile) {
      alert("Bhai, pehle resume upload karlo!");
      return;
    }

    setIsAnalyzing(true);

    // 1. Multipart Form Data standard construct kiya file transfer ke liye
    const formData = new FormData();
    formData.append("resume", selectedFile); // Backend controller key schema: 'resume'
    formData.append("jobDescription", jobDescription);

    try {
      // 2. Local Storage se logged-in user ka JWT security token nikala
      const token = localStorage.getItem("token");

      // 3. Live Node.js port endpoint request hit ki
      const response = await axios.post(
        `${API_BASE_URL}/resume/analyze`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Header middleware authentication pass key
          },
        },
      );

      // 4. Verification check aur UI state population logic
      if (response.data.success) {
        setAnalysisData(response.data);
        setShowAnalysis(true);
      }
    } catch (error) {
      console.error("Analysis me error aaya:", error);
      alert(error.response?.data?.message || "Kuch galti hui hai bhai!");
    } finally {
      setIsAnalyzing(false); // Loader lifecycle end trigger
    }
  };

  const resetAnalyzer = () => {
    setFileUploaded(false);
    setFileName("");
    setSelectedFile(null); // 🌟 State clear kiya re-scan pipeline trigger ke liye
    setJobDescription("");
    setShowAnalysis(false);
    setAnalysisData(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 sm:p-6 lg:p-8 relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Premium Background Ambiance Blurs */}
      <div className="absolute top-[-10%] right-[-10%] w-125 h-125 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-125 h-125 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">
        {/* Module Header Title block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/60 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI Resume Studio{" "}
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Benchmark your resume parameters and match core semantic alignment
              against live job descriptions.
            </p>
          </div>
          {showAnalysis && (
            <button
              onClick={resetAnalyzer}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold border border-slate-700/60 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Re-Scan Different Profile
            </button>
          )}
        </div>

        {/* ========================================================= */}
        {/* STATE 1: UPLOAD & JD INPUT PANEL */}
        {/* ========================================================= */}
        {!showAnalysis && (
          <div className="space-y-6">
            {!isAnalyzing ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Side: File Drag & Drop */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`p-8 sm:p-12 border-2 border-dashed rounded-3xl bg-slate-800/10 text-center transition-all duration-300 flex flex-col justify-center items-center relative ${
                    isDragging
                      ? "border-indigo-500 bg-indigo-500/5"
                      : "border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <input
                    type="file"
                    id="resumeFile"
                    accept=".pdf,.docx"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="resumeFile"
                    className="cursor-pointer space-y-4 flex flex-col items-center w-full"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-center text-indigo-400 shadow-xl shadow-slate-950/40">
                      <UploadCloud className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm sm:text-base font-bold text-white">
                        {fileUploaded
                          ? "Resume Selected"
                          : "Upload Candidate Resume"}
                      </h3>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto">
                        {fileUploaded
                          ? `Selected: ${fileName}`
                          : "Upload PDF or DOCX format variants up to 5MB."}
                      </p>
                    </div>
                    <span
                      className={`inline-block px-4 py-2 text-xs font-semibold rounded-xl shadow-lg transition-colors ${
                        fileUploaded
                          ? "bg-emerald-500 text-white"
                          : "bg-indigo-500 hover:bg-indigo-600 text-white shadow-indigo-500/10"
                      }`}
                    >
                      {fileUploaded ? "Change Document" : "Browse Files"}
                    </span>
                  </label>
                </div>

                {/* Right Side: Job Description Inputs */}
                <div className="p-6 border border-slate-800 bg-slate-800/10 rounded-3xl flex flex-col space-y-3">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Briefcase className="h-4 w-4 text-purple-400" />
                    <label
                      htmlFor="jdInput"
                      className="text-xs font-bold uppercase tracking-wider"
                    >
                      Target Job Description
                    </label>
                  </div>
                  <textarea
                    id="jdInput"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste corporate job criteria, role architectures, core runtime demands, or tech stack requirements here..."
                    className="w-full flex-1 min-h-40 bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors resize-none font-sans leading-relaxed"
                  />
                </div>

                {/* Big Trigger Action Button across full-width below grids */}
                <div className="lg:col-span-2 pt-2 flex justify-center">
                  <button
                    onClick={triggerAnalysis}
                    disabled={!fileUploaded}
                    className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm tracking-wide flex items-center justify-center gap-2.5 transition-all shadow-xl ${
                      fileUploaded
                        ? "bg-linear-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 shadow-indigo-500/20 cursor-pointer"
                        : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/30"
                    }`}
                  >
                    Analyze <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* Processing Matrix Loader overlay */
              <div className="max-w-3xl mx-auto p-16 rounded-3xl bg-slate-800/20 border border-slate-800/80 text-center space-y-6 flex flex-col items-center animate-pulse">
                <div className="relative flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-400 rounded-full animate-spin" />
                  <FileText className="h-6 w-6 text-indigo-400 absolute" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-white tracking-wide">
                    Cross-Compiling Pipeline Core Matrix...
                  </h3>
                  <p className="text-xs font-mono text-indigo-400/80">
                    Target Profile: {fileName}
                  </p>
                </div>
                <div className="text-[10px] text-slate-500 max-w-md leading-relaxed font-mono">
                  Vectorizing high-intent weights / parsing missing skill
                  indexes / evaluation mapping against targeted job role token
                  boundaries...
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* STATE 2: METRICS & ANALYSIS AUDIT DASHBOARD */}
        {/* ========================================================= */}
        {showAnalysis && analysisData && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT MAIN SPLIT VIEW (COL SPAN 4): ATS METERS */}
            <div className="lg:col-span-4 space-y-6">
              {/* Radial Core Score Card */}
              <div className="p-6 rounded-2xl bg-linear-to-b from-slate-800/40 to-slate-900/40 border border-slate-800/80 space-y-6">
                {/* Gauge 1: Resume Score */}
                <div className="text-center space-y-3">
                  <h3 className="text-[11px] font-bold text-slate-400 tracking-wider uppercase flex items-center justify-center gap-1.5">
                    <Gauge className="h-3.5 w-3.5 text-indigo-400" /> Structural
                    Resume Score
                  </h3>
                  <div className="py-2 flex justify-center items-center">
                    <div className="w-32 h-32 rounded-full border-8 border-slate-800 border-t-indigo-500 border-r-indigo-400 flex flex-col items-center justify-center shadow-2xl">
                      <span className="text-2xl font-extrabold text-white">
                        {analysisData.resumeScore}%
                      </span>
                      <span className="text-[9px] uppercase font-bold text-indigo-400 mt-0.5 tracking-wider">
                        Excellent
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-800/80" />

                {/* Gauge 2: JD Match Score */}
                <div className="text-center space-y-3">
                  <h3 className="text-[11px] font-bold text-slate-400 tracking-wider uppercase flex items-center justify-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5 text-purple-400" /> Job
                    Description Match
                  </h3>
                  <div className="py-2 flex justify-center items-center">
                    <div className="w-32 h-32 rounded-full border-8 border-slate-800 border-t-purple-500 border-r-pink-500 flex flex-col items-center justify-center shadow-2xl">
                      <span className="text-2xl font-extrabold text-white">
                        {analysisData.jobMatchScore}%
                      </span>
                      <span className="text-[9px] uppercase font-bold text-purple-400 mt-0.5 tracking-wider">
                        Highly Compatible
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/40 text-[11px] text-slate-400 leading-normal text-center">
                  🔥 This profile clears the base routing selectors for premium
                  applicant frameworks.
                </div>
              </div>
            </div>

            {/* RIGHT MAIN SPLIT VIEW (COL SPAN 8): AUDIT LOG DETAILS */}
            <div className="lg:col-span-8 space-y-6">
              {/* Missing Skills Mapping block (Dynamic Array) */}
              <div className="p-6 rounded-2xl bg-slate-800/20 border border-slate-800/80 space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Bookmark className="h-4 w-4 text-purple-400" /> Missing
                    High-Intent Keywords
                  </h3>
                  <p className="text-xs text-slate-500">
                    Inject these modules into your experience details to satisfy
                    strict ATS automation routing engines.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 pt-1">
                  {analysisData.missingSkills.map((skill, index) => (
                    <div
                      key={index}
                      className="px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3 hover:border-purple-500/30 transition-colors"
                    >
                      <div>
                        <p className="text-xs font-semibold text-slate-200">
                          {skill}
                        </p>
                        <span className="text-[9px] text-slate-500 font-mono">
                          Target Core Stack
                        </span>
                      </div>
                      <button className="p-1 rounded bg-slate-800 hover:bg-purple-500/20 text-slate-400 hover:text-purple-400 transition-all cursor-pointer">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Formatting & Optimization suggestions log (Dynamic Array Inputs) */}
              <div className="p-6 rounded-2xl bg-slate-800/20 border border-slate-800/80 space-y-4">
                <h3 className="text-sm font-bold text-white">
                  System Contextual Analysis Logs
                </h3>

                <div className="space-y-3">
                  {/* Strengths loop */}
                  {analysisData.strengths.map((strength, i) => (
                    <div
                      key={`strength-${i}`}
                      className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/50 flex items-start gap-3"
                    >
                      <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-semibold text-slate-200">
                          Verified Profile Strength
                        </h4>
                        <p className="text-[11px] text-slate-400 leading-normal">
                          {strength}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Weaknesses loop */}
                  {analysisData.weaknesses.map((weakness, i) => (
                    <div
                      key={`weakness-${i}`}
                      className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/50 flex items-start gap-3"
                    >
                      <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-semibold text-slate-200">
                          Pipeline Vulnerability Warning
                        </h4>
                        <p className="text-[11px] text-slate-400 leading-normal">
                          {weakness}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Suggestions loop */}
                  {analysisData.suggestions.map((suggestion, i) => (
                    <div
                      key={`suggestion-${i}`}
                      className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/50 flex items-start gap-3"
                    >
                      <Lightbulb className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-semibold text-slate-200">
                          Optimization Roadmap Strategy
                        </h4>
                        <p className="text-[11px] text-slate-400 leading-normal">
                          {suggestion}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call-to-action Dashboard Meta Footer */}
              <div className="p-5 rounded-2xl bg-linear-to-r from-indigo-950/40 to-purple-950/30 border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-start gap-3 text-left">
                  <Zap className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5 animate-pulse" />
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-semibold text-indigo-300">
                      Sync Optimization Iterations
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Resolving missing keywords can instantly boost target
                      metrics. Active tracking file stored at{" "}
                      <span className="font-mono text-purple-400 text-[10px] bg-slate-900/60 px-1 py-0.5 rounded">
                        {analysisData.resumeUrl}
                      </span>
                      .
                    </p>
                  </div>
                </div>
                <button className="w-full sm:w-auto px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shrink-0 cursor-pointer">
                  Sync & Update Profile <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
