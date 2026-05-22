import React, { useState } from "react";
import { Link } from "react-router-dom"; // <--- Ye line add karo
import {
  Briefcase,
  BookOpen,
  FileText,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Users,
  Zap,
  ShieldCheck,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  Search,
} from "lucide-react";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      {/* 1. NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <div className="bg-linear-to-tr from-indigo-500 to-violet-500 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
                Career<span className="text-indigo-400">Connect</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#students"
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                For Seekers
              </a>
              <a
                href="#companies"
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                For Employers
              </a>
              <a
                href="#skills"
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                Upskilling
              </a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              {/* Log In Link */}
              <Link
                to="/auth"
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-4 py-2"
              >
                Log In
              </Link>

              {/* Register Link */}
              <Link
                to="/auth"
                className="text-sm font-medium  from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5"
              >
                Register Now
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-400 hover:text-white p-2"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-b border-slate-800 bg-slate-900 px-4 pt-2 pb-6 space-y-3 animate-fadeIn">
            <a
              href="#features"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              Features
            </a>
            <a
              href="#students"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              For Seekers
            </a>
            <a
              href="#companies"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              For Employers
            </a>
            <a
              href="#skills"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              Upskilling
            </a>
            <div className="pt-4 flex flex-col gap-3 px-3">
              <button className="w-full text-center text-sm font-medium text-slate-300 py-2.5 border border-slate-700 rounded-xl">
                Log In
              </button>
              <button className="w-full text-center text-sm font-medium bg-indigo-500 text-white py-2.5 rounded-xl">
                Register Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-36 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-125 h-125 rounded-full bg-indigo-500/10 blur-[120px]" />
          <div className="absolute top-[20%] right-[-15%] w-150 h-150 rounded-full bg-purple-500/10 blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-medium mb-6 animate-pulse"></div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Bridging the Gap Between <br className="hidden sm:inline" />
            <span className=" from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skill Development & Employment
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
            Discover trending industry skills, upgrade your profile with
            AI-driven resume feedback, and smoothly land your next tech
            opportunity.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-linear-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-semibold rounded-xl shadow-xl shadow-indigo-500/20 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 group">
              Get Started Free{" "}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-all hover:-translate-y-1">
              Explore Features
            </button>
          </div>

          {/* Interactive Stats Block / Search bar simulation */}
          <div className="mt-16 max-w-4xl mx-auto p-4 rounded-2xl bg-slate-800/40 border border-slate-800/80 backdrop-blur-md shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80 p-2 text-left">
              <div className="pt-4 sm:pt-0 sm:pl-4">
                <p className="text-3xl font-bold text-white">45K+</p>
                <p className="text-sm text-slate-400 mt-1">
                  Active Job Seekers
                </p>
              </div>
              <div className="pt-4 sm:pt-0 sm:pl-8">
                <p className="text-3xl font-bold text-white">500+</p>
                <p className="text-sm text-slate-400 mt-1">Partner Companies</p>
              </div>
              <div className="pt-4 sm:pt-0 sm:pl-8">
                <p className="text-3xl font-bold text-white">92%</p>
                <p className="text-sm text-slate-400 mt-1">
                  Placement Success Rate
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE FEATURES SEGMENT */}
      <section
        id="features"
        className="py-20 border-t border-slate-800/60 bg-slate-900/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              An All-in-One Career Ecosystem
            </h2>
            <p className="mt-4 text-slate-400">
              Why navigate multiple platforms? CareerConnect handles everything
              from learning roadmap verification to immediate industrial
              placement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BookOpen,
                title: "Skill Roadmaps",
                desc: "Access live curated curricula targeting modern industry standard stacks.",
              },
              {
                icon: FileText,
                title: "AI Resume Analysis",
                desc: "Get real-time feedback, ATS scoring benchmarks, and structural optimization advice.",
              },
              {
                icon: Search,
                title: "Smart Tracking",
                desc: "Monitor application pathways across Approved, Rejected, and Pending stages easily.",
              },
              {
                icon: Users,
                title: "Direct Recruitment",
                desc: "Let verified corporate partners filter and source your profile organically based on verified skills.",
              },
            ].map((feat, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-slate-800/30 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-5 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                  <feat.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. STUDENT BENEFITS SECTION */}
      <section id="students" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full">
                For Job Seekers
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Level up your skills. <br />
                Land your dream role.
              </h2>
              <p className="text-slate-400 text-base leading-relaxed">
                Empower your software engineering or technical career path with
                real-time feedback loops. Move directly from dynamic learning to
                target vacancy lists.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  "Personalized personalized learning tracks per domain",
                  "Real-time pipeline transparency for applications",
                  "Verified project portfolio visibility directly to HR leaders",
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm sm:text-base">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dashboard Mockup Representation */}
            <div className="lg:col-span-7 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 shadow-2xl relative group">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs text-slate-500 ml-2">
                    student_dashboard.env
                  </span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-400">
                  Application Tracker
                </span>
              </div>

              <div className="space-y-3">
                {[
                  {
                    company: "Alt Digital Solutions",
                    role: "Frontend Engineer",
                    status: "Approved",
                    color: "text-emerald-400 bg-emerald-500/10",
                  },
                  {
                    company: "Probtosoft Tech",
                    role: "Full Stack Developer (MERN)",
                    status: "Pending",
                    color: "text-amber-400 bg-amber-500/10",
                  },
                  {
                    company: "Stark Global Inc",
                    role: "React Architect",
                    status: "Reviewing",
                    color: "text-indigo-400 bg-indigo-500/10",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between hover:bg-slate-900 transition-colors"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        {item.company}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {item.role}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${item.color}`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COMPANY BENEFITS SECTION */}
      <section
        id="companies"
        className="py-20 bg-slate-950/40 border-y border-slate-800/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Dashboard Mockup Representation (Left for Alternate Layout Layout) */}
            <div className="lg:col-span-7 order-last lg:order-first bg-slate-800/40 border border-slate-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-4 mb-6">
                <span className="text-xs font-medium text-slate-400">
                  Recruiter Hub / Quick Sourcing
                </span>
                <button className="text-xs bg-indigo-500 text-white px-3 py-1 rounded-lg">
                  Post Active Job
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/50">
                  <p className="text-xs text-slate-400">Sourced Candidates</p>
                  <p className="text-2xl font-bold text-white mt-1">1,240</p>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="bg-indigo-500 h-full w-[75%]" />
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/50">
                  <p className="text-xs text-slate-400">Interview Completion</p>
                  <p className="text-2xl font-bold text-white mt-1">88%</p>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="bg-purple-500 h-full w-[88%]" />
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-xl border border-dashed border-slate-700 text-center text-xs text-slate-400">
                ⚡ Filtered by MERN Stack competency verified badges
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">
                For Enterprise & HRs
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Find vetted builders. Skip generic filtration.
              </h2>
              <p className="text-slate-400 text-base leading-relaxed">
                Connect directly with students whose skill credentials are fully
                verified. Eliminate screening bottlenecks using custom filters
                structured for modern engineering workflows.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  "Advanced talent filtering by practical project stacks",
                  "Single-click candidate shortlist management pipelines",
                  "Comprehensive performance analysis dashboard metrics",
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm sm:text-base">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. RESUME ANALYZER SHOWCASE */}
      <section
        id="resume-analyzer"
        className="py-20 bg-linear-to-b from-slate-900 to-indigo-950/20"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 md:p-12 rounded-3xl bg-linear-to-tr from-slate-800/80 to-slate-900 border border-indigo-500/20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
              <FileText className="w-40 h-40 text-white" />
            </div>

            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-medium mb-4">
                <Sparkles className="h-3.5 w-3.5" /> Core Feature
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                AI-Optimized ATS Feedback Studio
              </h3>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
                Upload your resume draft and instantly benchmark your parameters
                against targeted tech placement frameworks. Ensure proper
                keyword mapping across React, Node.js, and complex system
                architectures.
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <button className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/10 flex items-center gap-2">
                  Test AI Analyzer <ChevronRight className="h-4 w-4" />
                </button>
                <span className="text-xs text-slate-500">
                  Supports PDF / DOCX up to 5MB
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SKILL DEVELOPMENT SECTION */}
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Curated Competency Frameworks
            </h2>
            <p className="mt-4 text-slate-400 text-sm sm:text-base">
              Eliminate information overload. Master structured path blocks
              demanded by production engineering squads.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Full-Stack MERN Development",
                courses: "14 Modules",
                level: "Intermediate",
                color: "from-blue-500/20 to-indigo-500/20",
                border: "hover:border-blue-500/50",
              },
              {
                title: "Next.js & Server Architectures",
                courses: "8 Modules",
                level: "Advanced",
                color: "from-purple-500/20 to-pink-500/20",
                border: "hover:border-purple-500/50",
              },
              {
                title: "System Design & Databases",
                courses: "11 Modules",
                level: "Advanced",
                color: "from-emerald-500/20 to-teal-500/20",
                border: "hover:border-emerald-500/50",
              },
            ].map((track, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl bg-linear-to-br ${track.color} border border-slate-800 transition-all duration-300 ${track.border} flex flex-col justify-between`}
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-slate-900/60 text-slate-300">
                      {track.level}
                    </span>
                    <span className="text-xs text-slate-400">
                      {track.courses}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {track.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Includes end-to-end sandbox challenges, capstone reviews,
                    and automatic placement portfolio linking.
                  </p>
                </div>
                <button className="mt-6 w-full py-2.5 bg-slate-900/40 hover:bg-slate-900 text-slate-200 hover:text-white rounded-xl text-xs font-medium border border-slate-700/60 transition-all flex items-center justify-center gap-1">
                  View Track Details <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. WHY CHOOSE US / IMPACT STATS */}
      <section className="py-20 bg-slate-950/20 border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 space-y-2">
              <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 mx-auto mb-2">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold text-white">
                Career Acceleration
              </h4>
              <p className="text-xs sm:text-sm text-slate-400">
                Reduce average role discovery lookup wait times by up to 40%
                using explicit metrics tracking.
              </p>
            </div>
            <div className="p-6 space-y-2">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 mx-auto mb-2">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold text-white">
                Verified Placement Pipelines
              </h4>
              <p className="text-xs sm:text-sm text-slate-400">
                Direct integration pathways eliminate traditional communication
                delays between matching parties.
              </p>
            </div>
            <div className="p-6 space-y-2">
              <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-400 mx-auto mb-2">
                <Zap className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold text-white">
                Dynamic AI Iteration
              </h4>
              <p className="text-xs sm:text-sm text-slate-400">
                Your profile optimization updates on the fly as new skills and
                modules are cleared.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CALL TO ACTION SECTION */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-indigo-600/20 to-purple-600/20 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Accelerate Your Career Track?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-xl mx-auto">
            Join thousands of active students and top talent acquisition
            specialists collaborating on CareerConnect today.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3.5 bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-xl transition-all shadow-lg shadow-white/5">
              Create Candidate Account
            </button>
            <button className="px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-all">
              Hire via Platform
            </button>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-12 text-slate-400 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1 space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <div className="bg-indigo-500 p-1.5 rounded-lg">
                  <Briefcase className="h-4 w-4 text-white" />
                </div>
                <span>CareerConnect</span>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed max-w-xs">
                The comprehensive technical talent acquisition network directly
                mapping developer ecosystems to industry-ready benchmarks.
              </p>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
                For Seekers
              </h5>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href="#skills"
                    className="hover:text-white transition-colors"
                  >
                    Skill Development
                  </a>
                </li>
                <li>
                  <a
                    href="#resume-analyzer"
                    className="hover:text-white transition-colors"
                  >
                    AI Resume Optimizer
                  </a>
                </li>
                <li>
                  <a
                    href="#students"
                    className="hover:text-white transition-colors"
                  >
                    Application Matrix
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
                For Partners
              </h5>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href="#companies"
                    className="hover:text-white transition-colors"
                  >
                    Candidate Sourcing
                  </a>
                </li>
                <li>
                  <a
                    href="#companies"
                    className="hover:text-white transition-colors"
                  >
                    Enterprise Pipeline
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Hiring Sandbox
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
                Platform
              </h5>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Support Center
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
            <p>
              &copy; {new Date().getFullYear()} CareerConnect. All rights
              reserved.
            </p>
            <p>Engineered for premium performance setups.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
