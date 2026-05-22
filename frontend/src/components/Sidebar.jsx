import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Bot,
  FileCheck,
  Layers,
  LogOut,
  User,
  Briefcase,
} from "lucide-react";

const Sidebar = ({ studentData, activeTab, setActiveTab, handleLogout }) => {
  const navigate = useNavigate();

  if (!studentData) return null;

  return (
    <aside className="w-64 bg-slate-950/60 border-r border-slate-800/80 backdrop-blur-xl flex flex-col justify-between h-screen sticky top-0 z-20 max-md:hidden md:fixed md:inset-y-0 md:left-0 md:flex">
      <div>
        {/* Logo Brand Header */}
        <div className="h-20 flex items-center gap-2 px-6 border-b border-slate-800/60">
          <div className="bg-linear-to-tr from-indigo-500 to-violet-500 p-1.5 rounded-lg shadow-md">
            <Briefcase className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent tracking-tight">
            Career<span className="text-indigo-400">Connect</span>
          </span>
        </div>

        {/* Nav Items */}
        <nav className="p-4 space-y-1.5 mt-4">
          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "jobs", label: "Jobs", icon: Briefcase },
            { id: "ai-mentor", label: "AI Mentor Bot", icon: Bot, badge: "AI" },
            {
              id: "github-verification",
              label: "Project Verification",
              icon: Bot,
            },
            { id: "resume-analyzer", label: "Resume Studio", icon: FileCheck },
            { id: "courses", label: "Courses", icon: Layers },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "ai-mentor") navigate("/aimentor");
                  else if (item.id === "jobs") navigate("/jobs");
                  else if (item.id === "resume-analyzer")
                    navigate("/resume-analyzer");
                  else if (item.id === "courses") navigate("/courses");
                  else if (item.id === "github-verification")
                    navigate("/project-verification");
                  else {
                    setActiveTab?.(item.id);
                    navigate("/dashboard");
                  }
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                  activeTab === item.id
                    ? "bg-linear-to-r from-indigo-500/20 to-transparent border-l-2 border-indigo-500 text-white"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-4 w-4 ${activeTab === item.id ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-400"}`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer / User Profile Meta */}
      <div className="p-4 border-t border-slate-800/60 bg-slate-950/40">
        <div className="flex items-center gap-3 p-2 rounded-xl mb-3">
          <div className="w-9 h-9 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <User className="h-4 w-4" />
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-semibold text-slate-200 truncate">
              {studentData.name}
            </h4>
            <p className="text-[10px] text-slate-500 truncate">
              {studentData.role}
            </p>
          </div>
        </div>
        <button
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-all border border-transparent hover:border-rose-500/10"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          <span>Secure Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
