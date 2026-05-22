import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ADD THIS

import {
  Briefcase,
  Mail,
  Lock,
  User,
  Sparkles,
  UserCheck,
  Building2,
  ArrowRight,
} from "lucide-react";

import { registerUser, loginUser } from "../services/authService";

const Auth = () => {
  const navigate = useNavigate(); // ADD THIS

  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleSelect = (selectedRole) => {
    setFormData({
      ...formData,
      role: selectedRole,
    });
  };

  // FULLY UPDATED SUBMIT LOGIC
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let response;

      if (isLogin) {
        response = await loginUser({
          email: formData.email,
          password: formData.password,
        });
      } else {
        response = await registerUser(formData);
      }

      // Save full user info
      localStorage.setItem("userInfo", JSON.stringify(response));

      // Save token separately
      localStorage.setItem("token", response.token);

      alert(`${isLogin ? "Login" : "Registration"} Successful!`);

      // ROLE BASED REDIRECT
      if (response.role === "student") {
        navigate("/dashboard");
      } else if (response.role === "company") {
        navigate("/company-dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex items-center justify-center relative p-4 overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Premium Background Ambient Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-125 h-125 rounded-full bg-indigo-500/10 blur-[130px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-125 h-125 rounded-full bg-purple-500/10 blur-[130px]" />
      </div>

      <div className="w-full max-w-md bg-slate-800/40 border border-slate-800/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl transition-all duration-300">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="bg-linear-to-tr from-indigo-500 to-violet-500 p-2.5 rounded-xl shadow-lg shadow-indigo-500/20 mb-3">
            <Briefcase className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
            Career<span className="text-indigo-400">Connect</span>
          </h2>
          <p className="text-sm text-slate-400 mt-1.5">
            {isLogin
              ? "Welcome back! Advance your career dashboard."
              : "Get started with your smart portal track."}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800/80 mb-6">
          <button
            type="button"
            onClick={() => {
              setIsLogin(true);
              setError("");
            }}
            className={`py-2 text-sm font-medium rounded-lg transition-all ${isLogin ? "bg-indigo-500 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLogin(false);
              setError("");
            }}
            className={`py-2 text-sm font-medium rounded-lg transition-all ${!isLogin ? "bg-indigo-500 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`}
          >
            Register
          </button>
        </div>

        {/* Error Alert Panel */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium animate-fadeIn">
            ⚠️ {error}
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* REGISTER FIELDS ONLY */}
          {!isLogin && (
            <>
              {/* Full Name Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full bg-slate-900/50 border border-slate-800 focus:border-indigo-500/60 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Role Selection Blocks */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
                  Select Profile Variant
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleRoleSelect("student")}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-center ${formData.role === "student" ? "border-indigo-500 bg-indigo-500/10 text-white" : "border-slate-800 bg-slate-900/30 text-slate-400 hover:border-slate-700"}`}
                  >
                    <UserCheck className="h-4 w-4" />
                    <span className="text-xs font-medium">Job Seeker</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleSelect("company")}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-center ${formData.role === "company" ? "border-purple-500 bg-purple-500/10 text-white" : "border-slate-800 bg-slate-900/30 text-slate-400 hover:border-slate-700"}`}
                  >
                    <Building2 className="h-4 w-4" />
                    <span className="text-xs font-medium">Employer / HR</span>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* SHARED FIELDS (LOGIN & REGISTER) */}
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className="w-full bg-slate-900/50 border border-slate-800 focus:border-indigo-500/60 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
                Password
              </label>
              {isLogin && (
                <a href="#" className="text-xs text-indigo-400 hover:underline">
                  Forgot?
                </a>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full bg-slate-900/50 border border-slate-800 focus:border-indigo-500/60 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all"
              />
            </div>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 bg-linear-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 disabled:opacity-50 text-white text-sm font-semibold rounded-xl shadow-xl shadow-indigo-500/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {isLogin ? "Sign In" : "Register"}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Dynamic Context Footer */}
        <div className="mt-6 text-center text-xs text-slate-500">
          By continuing, you agree to CareerConnect terms of service. <br />
          <span className="inline-flex items-center gap-1 mt-3 text-indigo-400/80">
            <Sparkles className="h-3 w-3" /> Encrypted Endpoint Data Channel
          </span>
        </div>
      </div>
    </div>
  );
};

export default Auth;
