// src/pages/StudentDashboard.jsx
import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {
  FileCheck,
  Bot,
  Briefcase,
  Award,
  Code2,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const StudentDashboard = () => {
  // Layout se jo data pass kiya tha, use yahan capture kar rahe hain
  const { studentData } = useOutletContext();
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:4000/api/jobs/my-applications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();
      if (data.success) {
        setApplications(data.applications || []);
      }
    } catch (err) {
      console.error("Failed to load applications", err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (!studentData) {
    return <div className="text-white p-5">Loading profile metrics...</div>;
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Intro Module */}
      <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-tr from-slate-800/60 via-indigo-950/20 to-slate-800/40 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, {studentData.name}!
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
            Keep learning, keep building, and keep growing — every project you
            complete brings you one step closer to your dream career.
          </p>
        </div>
      </div>

      {/* DYNAMIC ANALYTIC CARD GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          {
            title: "ATS Resume Score",
            value: `${studentData.resumeScore || 0}/100`,
            desc: "Top 12% in current batch",
            icon: FileCheck,
            color: "text-blue-400 bg-blue-500/10",
          },
          {
            title: "Verified Projects",
            value: studentData.verifiedProjects || 0,
            desc: "Synced via Git pipelines",
            icon: Bot,
            color: "text-purple-400 bg-purple-500/10",
          },
          {
            title: "Applied Openings",
            value: studentData.appliedJobs || 0,
            desc: "4 pending HR responses",
            icon: Briefcase,
            color: "text-amber-400 bg-amber-500/10",
          },
          {
            title: "Verified Skills",
            value: studentData.verifiedSkills?.length || 0,
            desc: "Skills passed in assessment",
            icon: Award,
            color: "text-emerald-400 bg-emerald-500/10",
          },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="p-5 rounded-2xl bg-slate-800/30 border border-slate-800/80 hover:border-slate-700/80 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-slate-400 tracking-wide">
                  {stat.title}
                </span>
                <div className={`p-2 rounded-xl ${stat.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {stat.value}
              </p>
              <p className="text-[11px] text-slate-500 mt-1.5 leading-none">
                {stat.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* EXTENDED LAYOUT MODULES (TWO COLUMN) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Box: Skill Development Track matrices */}
        <div className="lg:col-span-7 bg-slate-800/20 border border-slate-800/80 rounded-2xl p-5 sm:p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">
                Target Competency Progress
              </h3>
              <p className="text-xs text-slate-500">
                Curated modules required by premium product engineering
                partners.
              </p>
            </div>
            <Code2 className="h-4 w-4 text-slate-500" />
          </div>

          <div className="space-y-4">
            {studentData.skills && studentData.skills.length > 0 ? (
              studentData.skills.map((skill, index) => {
                const progress = Math.min(40 + index * 20, 100);
                const colors = [
                  "bg-blue-500",
                  "bg-purple-500",
                  "bg-emerald-500",
                  "bg-amber-500",
                  "bg-pink-500",
                ];
                return (
                  <div
                    key={index}
                    className="space-y-1.5 p-3 rounded-xl bg-slate-900/40 border border-slate-800/40"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200">
                        {skill}
                      </span>
                      <span className="text-slate-400 text-[11px] font-mono">
                        {progress}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${colors[index % colors.length]} transition-all duration-500`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/40"></div>
            )}
          </div>

          {/* AI Career Suggestions */}
          <div className="p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 space-y-5">
            <div className="flex items-start gap-3">
              <div className="space-y-2">
                <h4 className="text-xl font-semibold text-indigo-300">
                  AI Skill Recommendation
                </h4>

                <p className="text-sm text-slate-400 leading-relaxed">
                  Emerging technologies are rapidly transforming the global tech
                  industry. Based on current hiring trends and future market
                  projections, these skills are expected to dominate
                  next-generation software careers.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-3">
                <p className="text-sm font-semibold text-white">
                  AI Engineering
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Generative AI, LLM Apps, AI Agents
                </p>
              </div>

              <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-3">
                <p className="text-sm font-semibold text-white">
                  Cloud Computing
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  AWS, Docker, Kubernetes, DevOps
                </p>
              </div>

              <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-3">
                <p className="text-sm font-semibold text-white">
                  Cybersecurity
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Ethical Hacking & Security Systems
                </p>
              </div>

              <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-3">
                <p className="text-sm font-semibold text-white">
                  Full-Stack Dev
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  MERN, Scalable APIs & Modern Apps
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Box: Platform Logs */}
        <div className="lg:col-span-5 bg-slate-800/20 border border-slate-800/80 rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-white">
                Real-Time Platform Logs
              </h3>
              <p className="text-xs text-slate-500">
                Activities mapped across job response matrices.
              </p>
            </div>

            <div className="space-y-3.5">
              {[
                {
                  text: "Applied to Frontend Engineer at ALT Digital Solutions",
                  time: "2 hrs ago",
                  icon: CheckCircle2,
                  color: "text-emerald-400",
                },
                {
                  text: "GitHub Repository 'Doctor-Appointment-Platform' compilation check verified successfully",
                  time: "1 day ago",
                  icon: Bot,
                  color: "text-purple-400",
                },
                {
                  text: "Resume structural update scanned by internal ATS scoring matrix engine",
                  time: "3 days ago",
                  icon: Clock,
                  color: "text-slate-400",
                },
              ].map((log, i) => {
                const LogIcon = log.icon;
                return (
                  <div
                    key={i}
                    className="flex gap-3 items-start text-xs text-slate-300"
                  >
                    <div
                      className={`p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 ${log.color} shrink-0`}
                    >
                      <LogIcon className="h-3.5 w-3.5" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="leading-normal text-slate-300">
                        {log.text}
                      </p>
                      <span className="text-[10px] text-slate-500 block font-mono">
                        {log.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-bold text-white">My Applications</h4>
              <div className="space-y-2 mt-2">
                {applications.length === 0 ? (
                  <p className="text-xs text-slate-500">No applications yet.</p>
                ) : (
                  applications.map((app) => {
                    const statusLabel =
                      app.status === "shortlisted"
                        ? "Accepted"
                        : app.status === "rejected"
                          ? "Rejected"
                          : "Pending";
                    const statusClass =
                      app.status === "shortlisted"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : app.status === "rejected"
                          ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                          : "bg-amber-500/10 text-amber-300 border-amber-500/20";

                    return (
                      <div
                        key={app.jobId}
                        className="p-3 bg-slate-950/40 border border-slate-800 rounded-xl flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-bold text-slate-200">
                            {app.title}
                          </div>
                          <div className="text-slate-400 text-[11px]">
                            {app.companyName}
                          </div>
                        </div>
                        <div
                          className={`text-[11px] font-bold px-2 py-1 rounded ${statusClass}`}
                        >
                          {statusLabel}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          <button className="w-full mt-6 py-2.5 bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-medium border border-slate-700/40 transition-all text-center">
            Review Lifetime Audit History
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
