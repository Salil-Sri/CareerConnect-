import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  Briefcase,
  Users2,
  Cpu,
  CalendarDays,
  BarChart3,
  Settings,
  Bell,
  Search,
  ChevronDown,
  Menu,
  X,
  TrendingUp,
  Sparkles,
  Clock,
  ExternalLink,
  ChevronRight,
  Filter,
  RefreshCw,
  DollarSign,
  MapPin,
  FileText,
  LogOut,
} from "lucide-react";
import { logoutUser } from "../services/authService";

const CompanyDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard Overview");
  const navigate = useNavigate();

  // Real Database Sync States
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Post Job Form State
  const [showPostModal, setShowPostModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    description: "",
    skillsRequired: "",
    salary: "",
    location: "",
    experienceLevel: "Fresher",
    employmentType: "Full-Time",
  });

  // Base API configuration runner
  const fetchCompanyData = async () => {
    try {
      setLoading(true);
      // Local storage ya context se token fetch context logic
      const token = localStorage.getItem("token") || "";

      const response = await fetch(
        "http://localhost:4000/api/jobs/company-jobs",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Protect middleware mapping
          },
        },
      );

      const data = await response.json();
      if (data.success) {
        setJobs(data.jobs);
      } else {
        setError(data.message || "Failed to parse system assets.");
      }
    } catch (err) {
      setError("Cannot bind pipeline runtime engine connection.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyData();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.warn("Company logout failed or unreachable:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      navigate("/auth");
    }
  };

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const displayName = userInfo?.name || "Company User";
  const displayRole = userInfo?.role || "Connected Account";

  const handleOpenApplicants = (jobId) => {
    navigate(`/company-dashboard/applicants/${jobId}`);
  };

  const handleSidebarNavigation = (tabName) => {
    setActiveTab(tabName);
    setSidebarOpen(false);

    if (tabName === "Dashboard Overview") {
      navigate("/company-dashboard");
      return;
    }

    if (
      tabName === "Applicants Pipeline" ||
      tabName === "AI Candidate Insights"
    ) {
      if (!jobs.length) {
        alert("No jobs posted yet. Post a job first to see applicants.");
        return;
      }
      handleOpenApplicants(jobs[0]._id);
    }
  };

  // Form submit handler to hit your backend `/api/jobs/create` route
  const handlePostJob = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }
      const payload = {
        ...formData,
        skillsRequired: formData.skillsRequired
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      const response = await fetch("http://localhost:4000/api/jobs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.success) {
        setShowPostModal(false);
        setFormData({
          title: "",
          companyName: "",
          description: "",
          skillsRequired: "",
          salary: "",
          location: "",
          experienceLevel: "Fresher",
          employmentType: "Full-Time",
        });
        fetchCompanyData(); // Live reload metrics
      } else {
        alert(data.message || "Job creation payload dropped.");
      }
    } catch (err) {
      console.error("Pipeline breakdown:", err);
    }
  };

  // Real-time calculated metrics from your backend schema fields
  const totalJobs = jobs.length;
  const totalApplicants = jobs.reduce(
    (acc, job) => acc + (job.totalApplicants || 0),
    0,
  );
  const activeChannels = jobs.filter((j) => j.isActive).length;

  // Extracting active candidates stream from nested object arrays
  const livePipelineFeed = jobs
    .flatMap((job) =>
      (job.applicants || []).map((app) => ({
        jobId: job._id,
        jobTitle: job.title,
        appliedAt: new Date(app.appliedAt).toLocaleDateString(),
        resumeScore: app.resumeScore || 0,
        studentId: app.student,
      })),
    )
    .sort((a, b) => b.resumeScore - a.resumeScore)
    .slice(0, 4); // Top high rank engine score filtering

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-hidden antialiased selection:bg-indigo-500 selection:text-white">
      {/* Premium Futuristic Ambiance Layout Vectors */}
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 rounded-full bg-indigo-500/10 blur-[150px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125  rounded-full bg-purple-500/10 blur-[180px] pointer-events-none -z-10" />

      {/* -------------------- SIDEBAR -------------------- */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900/60 backdrop-blur-xl border-r border-slate-800/60 transform transition-transform duration-300 flex flex-col justify-between ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div>
          <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800/40">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 ring-1 ring-white/20">
                <Cpu className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-extrabold tracking-tight text-white">
                  CareerConnect
                </h1>
                <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase font-bold block">
                  Recruit OS v1.0
                </span>
              </div>
            </div>
            <button
              className="lg:hidden text-slate-400 hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="p-4 space-y-1.5">
            {[
              { name: "Dashboard Overview", icon: LayoutDashboard },
              { name: "Active Listings", icon: Briefcase },
              { name: "Applicants Pipeline", icon: Users2 },
              { name: "AI Candidate Insights", icon: Cpu },
              { name: "Interviews", icon: CalendarDays },
              { name: "Analytics", icon: BarChart3 },
              { name: "Company Settings", icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => handleSidebarNavigation(item.name)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer group relative ${
                    isActive
                      ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                  {isActive && (
                    <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-md shadow-indigo-400" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800/40 bg-slate-950/40">
          <div className="flex items-center gap-3 p-2 bg-slate-900/40 rounded-xl border border-slate-800/40">
            <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-indigo-500 to-purple-500 border border-white/10 flex items-center justify-center font-bold text-xs text-white">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-white truncate">
                {displayName}
              </h4>
              <p className="text-[10px] text-slate-500 font-mono truncate">
                {displayRole}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-400 border border-rose-500/10 hover:border-rose-500/20 hover:bg-rose-500/10 transition-all"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* -------------------- MAIN CORE WRAPPER -------------------- */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* TOP NAVBAR */}
        <header className="h-20 bg-slate-950/40 backdrop-blur-md border-b border-slate-800/40 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4 w-full max-w-md">
            <button
              className="lg:hidden text-slate-400 hover:text-white cursor-pointer"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="relative w-full hidden sm:block">
              <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search live database parameters..."
                className="w-full bg-slate-900/60 border border-slate-800/80 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-indigo-500/50 transition-all duration-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={fetchCompanyData}
              className="p-2.5 bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800/80 rounded-xl transition-colors cursor-pointer"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${loading ? "animate-spin text-indigo-400" : ""}`}
              />
            </button>
            <div className="hidden md:flex items-center gap-2 bg-slate-900/60 border border-slate-800/80 px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />{" "}
              LIVE DB CONNECTION ESTABLISHED
            </div>
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800/60">
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-white">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block text-left">
                <span className="block text-xs font-bold text-slate-200">
                  {displayName}
                </span>
                <span className="block text-[10px] font-medium text-slate-500">
                  {displayRole}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN DASHBOARD MATRIX */}
        <main className="p-4 sm:p-8 flex-1 space-y-8 max-w-7xl w-full mx-auto">
          {/* Header Action Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-900 pb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                Recruitment Matrix Engine{" "}
                <span className="text-xs font-normal text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20 font-mono">
                  WORKSPACE: DISPATCHER
                </span>
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Direct linked engine tracking live MERN stack database
                configurations context.
              </p>
            </div>
            <button
              onClick={() => setShowPostModal(true)}
              className="px-4 py-2.5 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20 border border-white/10 cursor-pointer group"
            >
              <PlusCircle className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />{" "}
              Post New Job
            </button>
          </div>

          {/* DYNAMIC REAL TIME STATS CARDS */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                title: "Total Jobs Posted",
                value: totalJobs,
                change: "Live channel counts",
                icon: Briefcase,
                color: "text-blue-400",
              },
              {
                title: "Total Applicants Captured",
                value: totalApplicants,
                change: "Linked across channels",
                icon: Users2,
                color: "text-purple-400",
              },
              {
                title: "Active Channels Running",
                value: activeChannels,
                change: "Accepting entries",
                icon: Cpu,
                color: "text-emerald-400",
              },
              {
                title: "Database Integrity Match",
                value: "98.4%",
                change: "Pipeline validation safe",
                icon: Sparkles,
                color: "text-amber-400",
              },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="group p-5 bg-slate-900/30 border border-slate-800/60 rounded-2xl flex flex-col justify-between space-y-4 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {stat.title}
                    </span>
                    <div
                      className={`p-2 rounded-xl bg-slate-900/80 border border-slate-800 ${stat.color}`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {stat.value}
                    </h3>
                    <p className="text-[10px] font-mono text-slate-500 mt-1">
                      {stat.change}
                    </p>
                  </div>
                </div>
              );
            })}
          </section>

          {/* MAIN DYNAMIC SPLIT HUB GRID LAYOUT */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT AREA: REAL JOB GRID PIPELINE */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 bg-slate-900/30 border border-slate-800/60 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800/40 pb-4">
                  <div>
                    <h3 className="text-sm font-extrabold text-white tracking-tight">
                      Active Job Stream Pipeline
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Live configuration matrices fetched directly from database
                      schema
                    </p>
                  </div>
                </div>

                {loading ? (
                  <div className="p-8 text-center text-xs font-mono text-slate-500 animate-pulse">
                    Syncing dynamic pipeline data layers...
                  </div>
                ) : jobs.length === 0 ? (
                  <div className="p-8 text-center text-xs font-mono text-slate-500">
                    No data models indexed yet. Post a target job vector!
                  </div>
                ) : (
                  <div className="overflow-x-auto w-full rounded-xl border border-slate-800/40 bg-slate-950/20">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-800/60 bg-slate-900/40 font-mono text-[10px] text-slate-400 uppercase">
                          <th className="p-4 font-bold">Role Vector</th>
                          <th className="p-4 font-bold text-center">
                            Applicants Pool
                          </th>
                          <th className="p-4 font-bold">Location</th>
                          <th className="p-4 font-bold text-center">
                            Applicants
                          </th>
                          <th className="p-4 font-bold text-right">
                            Channel Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/30 font-medium text-slate-300">
                        {jobs.map((job) => (
                          <tr
                            key={job._id}
                            className="hover:bg-slate-900/20 transition-colors group"
                          >
                            <td className="p-4">
                              <span className="block font-bold text-white group-hover:text-indigo-400 transition-colors">
                                {job.title}
                              </span>
                              <span className="block text-[10px] text-slate-500 font-mono mt-0.5">
                                {job.employmentType} • {job.experienceLevel}
                              </span>
                            </td>
                            <td className="p-4 text-center font-mono font-bold text-indigo-400">
                              {job.totalApplicants || 0}
                            </td>
                            <td className="p-4 text-slate-400 font-sans">
                              {job.location}
                            </td>
                            <td className="p-4 text-center">
                              <button
                                onClick={() => handleOpenApplicants(job._id)}
                                className="text-[10px] font-bold px-2.5 py-1 rounded-lg border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/10 transition-colors"
                              >
                                View AI
                              </button>
                            </td>
                            <td className="p-4 text-right">
                              <span
                                className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                                  job.isActive
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    : "bg-slate-800 text-slate-500 border border-slate-700"
                                }`}
                              >
                                {job.isActive ? "Active" : "Paused"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT AREA: LIVE TOP CANDIDATES SCORE ENGINE BASED ON SCHEMA */}
            <div>
              <div className="p-6 bg-slate-900/30 border border-slate-800/60 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-800/40 pb-4">
                  <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-white tracking-tight">
                      AI Rank Stream Insights
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Live calculated top application resume scores
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {livePipelineFeed.length === 0 ? (
                    <p className="text-xs font-mono text-slate-500 p-4 text-center">
                      No rank nodes queued yet.
                    </p>
                  ) : (
                    livePipelineFeed.map((applicant, index) => (
                      <div
                        key={index}
                        className="p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-xl space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-slate-400 truncate max-w-32.5">
                            ID:{" "}
                            {typeof applicant.studentId === "object"
                              ? applicant.studentId.name ||
                                applicant.studentId.email ||
                                applicant.studentId._id
                              : applicant.studentId}
                          </span>
                          <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            Score: {applicant.resumeScore}%
                          </span>
                        </div>
                        <p className="text-xs font-bold text-slate-200 truncate">
                          Applied: {applicant.jobTitle}
                        </p>
                        <span className="text-[10px] text-slate-500 block">
                          System Timestamp: {applicant.appliedAt}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* -------------------- JOB POST MODAL OVERLAY -------------------- */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800/80 rounded-2xl p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
              <h3 className="text-sm font-extrabold text-white tracking-tight flex items-center gap-2">
                <PlusCircle className="h-4 w-4 text-indigo-400" /> Construct Job
                Stream Vector
              </h3>
              <button
                onClick={() => setShowPostModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form
              onSubmit={handlePostJob}
              className="space-y-4 text-xs font-semibold text-slate-300"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MERN Stack Developer"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-hidden focus:border-indigo-500/50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CareerConnect"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-hidden focus:border-indigo-500/50"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">
                  Detailed Description *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Provide roles, tech core responsibilities..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-hidden focus:border-indigo-500/50 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">
                  Required Skills (Comma Separated)
                </label>
                <input
                  type="text"
                  placeholder="React, Node.js, MongoDB, Express"
                  value={formData.skillsRequired}
                  onChange={(e) =>
                    setFormData({ ...formData, skillsRequired: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-hidden focus:border-indigo-500/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">
                    Salary Packaging
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 12 LPA or Not Disclosed"
                    value={formData.salary}
                    onChange={(e) =>
                      setFormData({ ...formData, salary: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-hidden focus:border-indigo-500/50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">
                    Location Vector
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Remote, Lucknow, Noida"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-hidden focus:border-indigo-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">
                    Experience Level
                  </label>
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        experienceLevel: e.target.value,
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-hidden focus:border-indigo-500/50"
                  >
                    {[
                      "Internship",
                      "Fresher",
                      "Junior",
                      "Mid-Level",
                      "Senior",
                    ].map((l) => (
                      <option key={l} value={l} className="bg-slate-900">
                        {l}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">
                    Employment Engine Type
                  </label>
                  <select
                    value={formData.employmentType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        employmentType: e.target.value,
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-hidden focus:border-indigo-500/50"
                  >
                    {["Full-Time", "Part-Time", "Internship", "Contract"].map(
                      (t) => (
                        <option key={t} value={t} className="bg-slate-900">
                          {t}
                        </option>
                      ),
                    )}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800/60">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors cursor-pointer"
                >
                  Abort
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl transition-all shadow-md shadow-indigo-500/10 cursor-pointer"
                >
                  Dispatch Stream
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;
