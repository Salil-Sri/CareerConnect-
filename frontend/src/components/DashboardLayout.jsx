// src/components/DashboardLayout.jsx
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { logoutUser } from "../services/authService";
import { Search, Bell } from "lucide-react";
import API_BASE_URL from "../config/api";

const DashboardLayout = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${API_BASE_URL}/student/dashboard`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const data = await response.json();
        setStudentData(data);
      } catch (error) {
        console.error("Dashboard fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    // initial load
    fetchDashboardData();

    // Listen for cross-component updates (e.g., after passing a skill test)
    window.addEventListener("studentDataUpdated", fetchDashboardData);

    return () => {
      window.removeEventListener("studentDataUpdated", fetchDashboardData);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-10 flex items-center justify-center font-semibold">
        Loading system ecosystem...
      </div>
    );
  }

  if (studentData?.role !== "student") {
    return (
      <div className="min-h-screen bg-slate-900 text-rose-400 p-10 flex items-center justify-center">
        Unauthorized Access
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      // Attempt server-side logout (if available)
      await logoutUser();
    } catch (err) {
      console.warn("Logout API failed or unreachable:", err);
    } finally {
      // Clear client-side tokens/state
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("studentId");
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background Ambient Gradients */}
      <div className="absolute top-0 right-0 w-125 h-125 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-20 w-150 h-150 rounded-full bg-purple-500/5 blur-[150px] pointer-events-none -z-10" />

      {/* Sidebar Component */}
      <Sidebar studentData={studentData} handleLogout={handleLogout} />

      {/* Right Side Main Content Hub */}
      <main className="flex-1 min-h-screen overflow-y-auto md:ml-64">
        {/* Dynamic Header Toolbar */}
        <header className="h-20 border-b border-slate-800/60 bg-slate-900/40 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-4 sm:px-8">
          <div className="relative max-w-xs w-full hidden sm:block"></div>

          <div className="flex items-center gap-4 ml-auto">
            <button className="p-2 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-indigo-400 rounded-full" />
            </button>
            <div className="h-8 w-px bg-slate-800" />
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-medium text-slate-300 hidden sm:inline">
                {studentData.name}
              </span>
              <div className="h-8 w-8 rounded-lg bg-linear-to-tr from-indigo-500 to-purple-500 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-900 rounded-md flex items-center justify-center text-xs font-bold text-indigo-400">
                  {studentData.name ? studentData.name.charAt(0) : "S"}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Frame Content Grid - Yahan studentData pass ho rha hai */}
        <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
          <Outlet context={{ studentData }} />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
