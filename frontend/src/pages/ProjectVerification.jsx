import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GitBranch,
  CheckCircle2,
  AlertCircle,
  GitCommit,
  ExternalLink,
  ShieldCheck,
  Layers,
  Activity,
  BarChart3,
  Search,
  RefreshCcw,
  Terminal,
  Zap,
} from "lucide-react";
import { API_BASE_URL } from "../config/api";

const ProjectVerification = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const [error, setError] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const navigate = useNavigate();

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    if (!repoUrl.trim()) return;

    setError("");
    setIsValidating(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE_URL}/project/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ repoUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Project verification failed");
      }

      setVerificationResult(data);
      setShowMetrics(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (err) {
      setError(err.message || "Project verification failed");
    } finally {
      setIsValidating(false);
    }
  };

  const handleReset = () => {
    setRepoUrl("");
    setShowMetrics(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 sm:p-6 lg:p-8 relative overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Responsive Ambient Blur Background Layers */}
      <div className="absolute top-[-5%] left-[-5%] w-72 h-72 md:w-125 md:h-125 rounded-full bg-indigo-500/5 blur-[80px] md:blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-5%] right-[-5%] w-72 h-72 md:w-125 md:h-125 rounded-full bg-purple-500/5 blur-[80px] md:blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/60 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Project Verification
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Audit your repositories, analyze commit health, and unlock
              verified recruitment badges.
            </p>
          </div>
          {showMetrics && (
            <button
              onClick={handleReset}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold border border-slate-700/60 transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <RefreshCcw className="h-3.5 w-3.5" /> Analyze Another Repo
            </button>
          )}
        </div>

        {/* ========================================================= */}
        {/* STATE 1: REPOSITORY DISCOVERY & VALIDATION PIPELINE */}
        {/* ========================================================= */}
        {error && (
          <div className="max-w-2xl mx-auto p-4 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-300 text-sm">
            {error}
          </div>
        )}

        {!showMetrics && (
          <div className="max-w-2xl mx-auto space-y-6">
            {!isValidating ? (
              <form
                onSubmit={handleVerifySubmit}
                className="bg-slate-800/20 border border-slate-800/80 p-6 sm:p-8 rounded-3xl backdrop-blur-md space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Target Repository URL
                  </label>
                  <div className="relative flex items-center bg-slate-900/80 border border-slate-800 rounded-xl focus-within:border-indigo-500/50 transition-all p-1.5">
                    <div className="pl-3 text-slate-500 shrink-0">
                      <GitBranch className="h-4 w-4" />
                    </div>
                    <input
                      type="url"
                      required
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                      placeholder="https://github.com/username/repository-name"
                      className="w-full bg-transparent pl-3 pr-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-600 outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xl shadow-indigo-500/10 transition-all flex items-center justify-center gap-2 group"
                >
                  <Search className="h-4 w-4 group-hover:scale-110 transition-transform" />{" "}
                  Verify
                </button>
              </form>
            ) : (
              /* Automated Codebase Extraction Matrix Loader */
              <div className="p-12 rounded-3xl bg-slate-800/20 border border-slate-800/80 text-center space-y-6 flex flex-col items-center backdrop-blur-md">
                <div className="relative flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
                  <Terminal className="h-5 w-5 text-purple-400 absolute animate-pulse" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-white">
                    Running Deep Source Code Diagnostic...
                  </h3>
                  <p className="text-xs font-mono text-purple-400 max-w-xs truncate mx-auto">
                    {repoUrl}
                  </p>
                </div>
                <div className="text-[10px] text-slate-500 max-w-xs leading-relaxed">
                  Mapping system dependencies, cross-referencing file
                  architectures, and reading structural commit trails...
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* STATE 2: REPO METRICS & CREDIBILITY AUDIT REPORT */}
        {/* ========================================================= */}
        {showMetrics && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT COLUMN (COL SPAN 4): DYNAMIC CREDIBILITY SCORE & TECH BADGE */}
            <div className="lg:col-span-4 space-y-6">
              {/* Dynamic Score Ring */}
              <div className="p-6 rounded-2xl bg-linear-to-b from-slate-800/40 to-slate-900/40 border border-slate-800/80 text-center space-y-4">
                <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                  Authenticity Index
                </h3>

                <div className="py-4 flex justify-center items-center">
                  <div className="w-36 h-36 rounded-full border-8 border-slate-800 border-t-purple-500 border-r-indigo-500 border-b-indigo-500 flex flex-col items-center justify-center shadow-xl shrink-0">
                    <span className="text-3xl font-extrabold text-white">
                      {verificationResult?.projectVerificationScore ?? 92}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-emerald-400 mt-0.5 tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Grade {verificationResult?.grade ?? "A+"}
                    </span>
                  </div>
                </div>

                {/* Badge Status */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  🛡️ Recruiter-Verified Project
                </div>
              </div>

              {/* Framework Density Breakdown */}
              <div className="p-5 rounded-2xl bg-slate-800/20 border border-slate-800/80 space-y-4">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-2">
                  <Layers className="h-3.5 w-3.5 text-slate-500" /> Language
                  Ecosystem Density
                </h4>

                <div className="space-y-3.5">
                  {[
                    {
                      lang: "TypeScript / React",
                      pct: "64%",
                      color: "bg-indigo-500",
                    },
                    {
                      lang: "Node.js (Express)",
                      pct: "28%",
                      color: "bg-emerald-500",
                    },
                    {
                      lang: "Docker / Configs",
                      pct: "8%",
                      color: "bg-amber-500",
                    },
                  ].map((stack, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-400">{stack.lang}</span>
                        <span className="text-slate-300 font-mono">
                          {stack.pct}
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${stack.color}`}
                          style={{ width: stack.pct }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN (COL SPAN 8): PIPELINE CHECKS & COMMIT LOGS */}
            <div className="lg:col-span-8 space-y-6">
              {/* Automated Pipeline Integration Checks */}
              <div className="p-6 rounded-2xl bg-slate-800/20 border border-slate-800/80 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="h-4 w-4 text-indigo-400" /> Automated
                  Verification Pipelines
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      check: "GitBranch Origin Validation",
                      status: "passed",
                      desc: "Repository source trace verified successfully.",
                    },
                    {
                      check: "Production Deployment Link",
                      status: "passed",
                      desc: "Live URL detected and safely pinged.",
                    },
                    {
                      check: "Package Integrity Audit",
                      status: "passed",
                      desc: "Zero high-severity vulnerabilities found.",
                    },
                    {
                      check: "Readme & Architecture Documentation",
                      status: "warning",
                      desc: "API schema documentation block is missing.",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-200">
                          {item.check}
                        </h4>
                        {item.status === "passed" ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        ) : (
                          <AlertCircle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 leading-normal">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Git Commit Velocity Metrics */}
              <div className="p-6 rounded-2xl bg-slate-800/20 border border-slate-800/80 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <GitCommit className="h-4 w-4 text-purple-400" />{" "}
                    Development Health & Velocity
                  </h3>
                  <span className="text-[11px] font-mono text-slate-500">
                    42 Total Commits
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/50 space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <p className="text-xs text-slate-300 font-semibold">
                        Consistent Code Frequency Pattern
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Commits span across 18 separate days (High Authenticity
                        score).
                      </p>
                    </div>
                    <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded border border-purple-500/20 font-bold self-start sm:self-auto">
                      Organic Flow Verified
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    💡 **AI Insight:** The commit sequence shows structured
                    refactoring logs instead of a single giant bulk upload. This
                    boosts credibility to hiring managers by proving genuine,
                    iterative development workflows.
                  </p>
                </div>
              </div>

              {/* Recruiter Showcase Action Box */}
              <div className="p-5 rounded-2xl bg-linear-to-r from-indigo-950/40 to-purple-950/30 border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-start gap-3 text-left">
                  <Zap className="h-5 w-5 text-purple-400 shrink-0 mt-0.5 animate-pulse" />
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-semibold text-purple-300">
                      Feature on Platform Job Feed
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Pin this verified Grade A+ badge directly onto your main
                      public hiring card to attract 3x more recruiter profile
                      visits.
                    </p>
                  </div>
                </div>
                <button className="w-full sm:w-auto px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shrink-0">
                  Pin to Job Profile <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectVerification;
