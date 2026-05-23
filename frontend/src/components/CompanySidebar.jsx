import React from "react";
import {
  LayoutDashboard,
  Briefcase,
  Users2,
  Cpu,
  CalendarDays,
  BarChart3,
  Settings,
} from "lucide-react";

const NAV_ITEMS = [
  {
    name: "Dashboard Overview",
    icon: LayoutDashboard,
    path: "/company-dashboard",
  },
  {
    name: "Active Listings",
    icon: Briefcase,
    path: "/company-dashboard/listings",
  },
  {
    name: "Applicants List",
    icon: Users2,
    path: "/company-dashboard/applicants-list",
  },
  { name: "AI Candidate Insights", icon: Cpu, path: null },
  {
    name: "Interviews",
    icon: CalendarDays,
    path: "/company-dashboard/interviews",
  },
  { name: "Analytics", icon: BarChart3, path: "/company-dashboard/analytics" },
  {
    name: "Company Settings",
    icon: Settings,
    path: "/company-dashboard/settings",
  },
];

const CompanySidebar = ({ activeTab, onNavigate }) => {
  return (
    <nav className="p-4 space-y-1.5">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.name;
        return (
          <button
            key={item.name}
            onClick={() => onNavigate && onNavigate(item)}
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
  );
};

export default CompanySidebar;
