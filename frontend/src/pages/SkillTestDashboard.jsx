import React, { useState, useEffect } from "react";
import axios from "axios";
import TestScreen from "../components/TestScreen";
import { API_BASE_URL as APP_API_BASE } from "../config/api";

// Axios configurations for credentials (CORS support)
axios.defaults.withCredentials = true;
const API_BASE_URL = `${APP_API_BASE}/skills`;

// Aap yahan aur bhi skills add kar sakte hain jo DB me ho
const AVAILABLE_SKILLS = ["MongoDB", "React", "Node.js", "Express", "Angular"];

export default function SkillTestDashboard() {
  const [selectedSkill, setSelectedSkill] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Test State Management
  const [testActive, setTestActive] = useState(false);
  const [result, setResult] = useState(null);

  // 1. Fetch Questions from Backend
  const startSkillTest = async (skillName) => {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const token = localStorage.getItem("token"); // Agar aap headers me authorization token bhejte hain
      const response = await axios.get(`${API_BASE_URL}/${skillName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success && response.data.questions.length > 0) {
        setQuestions(response.data.questions);
        setSelectedSkill(skillName);
        setTestActive(true);
      } else {
        setError(`No questions available for ${skillName} at the moment.`);
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Failed to load test questions. Please login again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // 2. Submit Answers to Backend
  const handleTestSubmit = async (formattedAnswers) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BASE_URL}/submit`,
        {
          skill: selectedSkill,
          answers: formattedAnswers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        setResult(response.data); // backend response contains score, passed, correctAnswers
        setTestActive(false);
        // If student passed, notify the dashboard to refresh student data
        if (response.data.passed) {
          try {
            window.dispatchEvent(new Event("studentDataUpdated"));
          } catch (e) {
            // ignore in non-browser environments
          }
        }
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while submitting the test.");
    } finally {
      setLoading(false);
    }
  };

  const resetDashboard = () => {
    setTestActive(false);
    setResult(null);
    setSelectedSkill("");
    setQuestions([]);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-6 flex flex-col items-center">
      {/* Header */}
      <header className="w-full max-w-5xl mb-10 text-center md:text-left border-b border-slate-800 pb-4">
        <h1 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Skill Verification Portal
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Score 70% or higher to add a verified badge to your profile
        </p>
      </header>

      {/* Error Banner */}
      {error && (
        <div className="w-full max-w-2xl p-4 mb-6 bg-rose-950/40 border border-rose-800 text-rose-200 rounded-xl text-center">
          {error}
        </div>
      )}

      {/* Loading Spinner */}
      {loading && !testActive && (
        <div className="flex flex-col items-center justify-center my-20">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-400">Processing with server...</p>
        </div>
      )}

      {/* STAGE 1: Selection Dashboard */}
      {!testActive && !result && !loading && (
        <div className="w-full max-w-4xl">
          <h2 className="text-xl font-bold mb-6 text-slate-300">
            Available Assessment Tests:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {AVAILABLE_SKILLS.map((skill) => (
              <div
                key={skill}
                className="bg-slate-800/60 border border-slate-700/70 p-6 rounded-2xl flex flex-col justify-between hover:border-cyan-500/50 transition duration-300 shadow-xl"
              >
                <div>
                  <div className="w-12 h-12 bg-cyan-950/60 rounded-xl flex items-center justify-center text-cyan-400 font-bold text-lg mb-4 border border-cyan-800/30">
                    {skill[0]}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{skill}</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Core technical competency & syntax evaluation.
                  </p>
                </div>
                <button
                  onClick={() => startSkillTest(skill)}
                  className="mt-6 w-full py-2.5 px-4 bg-linear--to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium rounded-xl shadow-lg transition transform active:scale-95 text-sm"
                >
                  Start Test
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STAGE 2: Live Active Test */}
      {testActive && !loading && (
        <TestScreen
          skill={selectedSkill}
          questions={questions}
          onSubmit={handleTestSubmit}
          onCancel={resetDashboard}
        />
      )}

      {/* STAGE 3: Final Score Card / Result screen */}
      {result && !loading && (
        <div className="w-full max-w-md bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-2xl text-center animate-fade-in mt-10">
          <div className="mb-6">
            {result.passed ? (
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full text-3xl mb-4">
                ✓
              </div>
            ) : (
              <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-950 text-rose-400 border border-rose-800 rounded-full text-3xl mb-4">
                ✕
              </div>
            )}
            <h2 className="text-2xl font-bold text-white">
              {result.passed ? "Congratulations! Passed" : "Keep Practicing!"}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Skill Test Result for {selectedSkill}
            </p>
          </div>

          {/* Score Circle */}
          <div className="my-6 p-6 bg-slate-900/60 rounded-2xl border border-slate-700/50">
            <span className="block text-5xl font-black text-cyan-400">
              {result.score}%
            </span>
            <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold mt-1 block">
              Final Score
            </span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 text-left my-6 text-sm">
            <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-700/30">
              <span className="text-slate-400 block text-xs">
                Total Questions
              </span>
              <span className="text-white font-bold text-base">
                {result.totalQuestions}
              </span>
            </div>
            <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-700/30">
              <span className="text-slate-400 block text-xs">
                Correct Answers
              </span>
              <span className="text-emerald-400 font-bold text-base">
                {result.correctAnswers}
              </span>
            </div>
          </div>

          {result.passed ? (
            <p className="text-xs text-emerald-400 bg-emerald-950/40 p-3 border border-emerald-900/50 rounded-xl mb-6">
              🎉 Badge Verified! This skill has been added to your profile.
            </p>
          ) : (
            <p className="text-xs text-rose-400 bg-rose-950/40 p-3 border border-rose-900/50 rounded-xl mb-6">
              You need a minimum score of 70% to verify this skill.
            </p>
          )}

          <button
            onClick={resetDashboard}
            className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition"
          >
            Go Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}
