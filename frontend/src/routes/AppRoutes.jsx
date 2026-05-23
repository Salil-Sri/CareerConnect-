// src/routes/AppRoutes.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import StudentDashboard from "../pages/StudentDashboard";
import StudentJobPortal from "../pages/StudentJobPortal";
import ResumeAnalyzer from "../pages/ResumeAnalyzer";
import Auth from "../pages/Auth";
import AIMentor from "../pages/AIMentor";
import ProjectVerification from "../pages/ProjectVerification";
import SkillTestDashboard from "../pages/SkillTestDashboard";
import ApplicantsList from "../pages/Applicantslist";

import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../components/DashboardLayout"; // ← Naya Layout import karo (path check karlena)
import Courses from "../pages/Courses";
import CompanyDashboard from "../pages/CompanyDashboard";
import AIApplicantsDashboard from "../pages/AIApplicantsDashboard";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes (Inme koi sidebar/protection nahi chahiye) */}
        <Route path="/" element={<Home />} />

        {/* Company dashboard: only accessible to users with role 'company' */}
        <Route
          path="/company-dashboard"
          element={
            <ProtectedRoute allowedRoles={["company"]}>
              <CompanyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company-dashboard/applicants/:jobId"
          element={
            <ProtectedRoute allowedRoles={["company"]}>
              <AIApplicantsDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company-dashboard/applicants-list"
          element={
            <ProtectedRoute allowedRoles={["company"]}>
              <ApplicantsList />
            </ProtectedRoute>
          }
        />
        <Route path="/auth" element={<Auth />} />

        {/* Protected & Layout Routes (In sabme Auth Check aur Sidebar automatic chalega) */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Ye saare routes ab DashboardLayout ke andar <Outlet /> ki jagah render honge */}
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/jobs" element={<StudentJobPortal />} />
          <Route path="/aimentor" element={<AIMentor />} />
          <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
          <Route path="/skill-test" element={<SkillTestDashboard />} />
          <Route
            path="/project-verification"
            element={<ProjectVerification />}
          />
          <Route path="/courses" element={<Courses />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
