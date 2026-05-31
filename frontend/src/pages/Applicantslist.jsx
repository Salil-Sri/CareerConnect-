import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Users2,
  Cpu,
  CalendarDays,
  Settings,
  Search,
  Menu,
  X,
  RefreshCw,
  PlusCircle,
  Filter,
  MapPin,
  Clock,
  MoreVertical,
  LogOut,
  ArrowUpRight,
  TrendingUp,
  CircleDot,
} from "lucide-react";
import { logoutUser } from "../services/authService";
import { API_BASE_URL } from "../config/api";

const ApplicantsList = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const navigate = useNavigate();

  // Database linkage for Company Jobs
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token") || "";
      const response = await fetch(`${API_BASE_URL}/jobs/company-jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setJobs(data.jobs);
      }
    } catch (err) {
      console.error("Pipeline Sync Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      navigate("/auth");
    }
  };

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const displayName = userInfo?.name || "Admin";

  // Search and Status Filter Logic
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "Active" ? job.isActive : !job.isActive);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative flex antialiased selection:bg-indigo-500 selection:text-white">
      {/* Matrix Background Ambiance */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      {/* -------------------- SIDEBAR (Synced) -------------------- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900/60 backdrop-blur-xl border-r border-slate-800/60 transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-800/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-extrabold tracking-tight">
                  CareerConnect
                </h1>
                <p className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-widest">
                  Recruit OS
                </p>
              </div>
            </div>
          </div>

          <nav className="p-4 flex-1 space-y-1.5">
            {[
              {
                name: "Dashboard Overview",
                icon: LayoutDashboard,
                path: "/company-dashboard",
              },
              {
                name: "Applicants List",
                icon: LayoutDashboard,
                path: "/company-dashboard/applicants/6a1001d9d2dd8908ed7b591c",
              },
              {
                name: "Active Jobs",
                icon: LayoutDashboard,
                path: "/company-dashboard/applicants-list",
              },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 group relative ${item.active ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"}`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-800/40">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-400 border border-rose-500/10 hover:bg-rose-500/10 transition-all"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* -------------------- MAIN CONTENT -------------------- */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <header className="h-20 border-b border-slate-800/40 bg-slate-950/60 backdrop-blur-md sticky top-0 z-40 px-6 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <Briefcase className="w-4 h-4" /> /{" "}
              <span className="text-white">Active Listings</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold text-slate-200">{displayName}</p>
              <p className="text-[10px] text-slate-500 font-mono font-bold uppercase">
                Employer Account
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-black text-indigo-400 shadow-inner">
              {displayName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-8 max-w-6xl mx-auto w-full space-y-8">
          {/* Header Title & Quick Stats */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Manage Job Vectors
              </h2>
              <p className="text-sm text-slate-500 font-medium">
                Monitoring {jobs.length} deployment channels across the talent
                pipeline.
              </p>
            </div>
            <button
              onClick={() => navigate("/company-dashboard")}
              className="px-5 py-2.5 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-500/20 border border-white/10 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" /> Post New Stream
            </button>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-900/40 p-4 rounded-2xl border border-slate-800/60 backdrop-blur-md">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search active roles or skill tags..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500/50 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-[10px] font-black uppercase tracking-wider">
                {["All", "Active", "Paused"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={`px-4 py-1.5 rounded-lg transition-all ${filterStatus === s ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20" : "text-slate-500 hover:text-slate-300"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <button
                onClick={fetchJobs}
                className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-500 hover:text-white transition-all"
              >
                <RefreshCw
                  className={`w-4 h-4 ${loading ? "animate-spin text-indigo-400" : ""}`}
                />
              </button>
            </div>
          </div>

          {/* -------------------- JOB CARDS GRID -------------------- */}
          <div className="grid grid-cols-1 gap-4">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-32 bg-slate-900/20 rounded-2xl border border-slate-800/40 animate-pulse"
                />
              ))
            ) : filteredJobs.length === 0 ? (
              <div className="py-24 text-center border-2 border-dashed border-slate-900/60 rounded-3xl space-y-3">
                <div className="bg-slate-900/40 w-16 h-16 rounded-full flex items-center justify-center mx-auto border border-slate-800">
                  <Briefcase className="w-8 h-8 text-slate-700" />
                </div>
                <div>
                  <h3 className="text-white font-bold">No streams found</h3>
                  <p className="text-xs text-slate-500">
                    Modify your search query or status filter nodes.
                  </p>
                </div>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="group p-6 bg-slate-900/20 border border-slate-800/60 hover:border-indigo-500/40 hover:bg-slate-900/40 rounded-2xl transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs hover:shadow-indigo-500/5"
                >
                  {/* Job Metadata */}
                  <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center shadow-inner group-hover:border-indigo-500/20 transition-all">
                      <Briefcase className="w-7 h-7 text-indigo-400 opacity-80" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex items-center flex-wrap gap-3 text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wide">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" /> {job.location}
                        </span>
                        <span className="text-slate-800">|</span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />{" "}
                          {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                        <span className="text-slate-800">|</span>
                        <span className="text-purple-400">
                          {job.employmentType}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Applicants & Status Engine */}
                  <div className="flex flex-col sm:flex-row items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                    {/* Metrics Progress Section */}
                    <div className="text-left sm:text-right space-y-1.5 min-w-30">
                      <p className="text-[10px] font-mono text-slate-500 uppercase font-black tracking-widest flex items-center sm:justify-end gap-1.5">
                        <Users2 className="w-3 h-3" /> Candidates
                      </p>
                      <div className="flex items-center sm:justify-end gap-3">
                        <span className="text-2xl font-black text-white">
                          {job.totalApplicants || 0}
                        </span>
                        <div className="w-12 h-1 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                          <div
                            className="h-full bg-linear-to-r from-indigo-500 to-purple-500 shadow-[0_0_10px_rgba(99,102,241,0.4)]"
                            style={{
                              width: `${Math.min(((job.totalApplicants || 0) / 50) * 100, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <div
                      className={`px-4 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 ${job.isActive ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]" : "bg-slate-800 text-slate-500 border-slate-700"}`}
                    >
                      <CircleDot
                        className={`w-3 h-3 ${job.isActive ? "animate-pulse" : ""}`}
                      />
                      {job.isActive ? "Live" : "Paused"}
                    </div>

                    {/* Final Actions */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          navigate(`/company-dashboard/applicants/${job._id}`)
                        }
                        className="px-5 py-2.5 bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800 text-white text-[11px] font-black uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-xs group/btn"
                      >
                        Candidates{" "}
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>
                      <button className="p-2.5 bg-slate-950 border border-slate-800 text-slate-500 hover:text-white rounded-xl transition-all hover:bg-slate-900">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ApplicantsList;
