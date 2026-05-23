import React, { useState } from "react";
import { 
  Play, 
  Layers, 
  ExternalLink, 
  Search, 
  Sparkles, 
  Clock, 
  BookOpen, 
  Code2 
} from "lucide-react";

const Courses = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Static high-quality technical stack video catalog configurations
  const courseData = [
    {
      id: 1,
      title: "Complete MERN Stack Developer Bootcamp 2026",
      category: "MERN Stack",
      duration: "18.5 Hours",
      level: "Beginner to Advanced",
      description: "Build a production-ready real estate engine using MongoDB, Express, React, and Node from scratch with deployment architectures.",
      videoLink: "https://youtube.com/playlist?list=PLbtI3_MArDOk_A-GnYHPOiHSxlK2Vd3Zn&si=NSTMUk4kaLktFpV8", // Replace with your target youtube URLs
      tags: ["React", "Node.js", "MongoDB", "Express"]
    },
    {
      id: 2,
      title: "ReactJS Architecture & Advanced Reconciliation Hooks",
      category: "ReactJS",
      duration: "4.2 Hours",
      level: "Intermediate",
      description: "Deep dive into virtual DOM, custom hooks lifecycle, state management optimization, and concurrent features rendering layers.",
      videoLink: "https://youtu.be/3LRZRSIh_KE?si=1mNyOP9stKlrx-9I",
      tags: ["React", "Frontend", "Hooks"]
    },
    {
      id: 3,
      title: "Next.js Production Grade App Router & RSC Mechanics",
      category: "Next.js",
      duration: "6.5 Hours",
      level: "Advanced",
      description: "Master React Server Components (RSC), server-side rendering pipelines, dynamic routing configurations, and middleware tokens.",
      videoLink: "https://youtube.com/playlist?list=PLu71SKxNbfoBAaWGtn9GA2PTw0HO0tXzq&si=qt-Y2dWEC2uRQlub",
      tags: ["Next.js", "SSR", "Vercel"]
    },
    {
      id: 4,
      title: "MongoDB Aggregations & Query Performance Tuning",
      category: "MongoDB",
      duration: "3.8 Hours",
      level: "Advanced",
      description: "Optimize heavy production queries using multi-stage lookups, index strategies, atlas search algorithms, and replication models.",
      videoLink: "https://youtu.be/M1dKYQ7GsTg?si=42zHy43QpYmAXxbB",
      tags: ["MongoDB", "Database", "Optimization"]
    },
    {
      id: 5,
      title: "Full Stack MERN: Microservices & Event-Driven Flows",
      category: "MERN Stack",
      duration: "12 Hours",
      level: "Advanced",
      description: "Scale your MERN runtime setup using Docker containers, Redis caching nodes, and secure token isolation methodologies.",
      videoLink: "https://youtu.be/M1dKYQ7GsTg?si=42zHy43QpYmAXxbB",
      tags: ["MERN Stack", "Docker", "Redis"]
    },
    {
      id: 6,
      title: "Next.js Server Actions & Prisma ORM State Management",
      category: "Next.js",
      duration: "4.0 Hours",
      level: "Intermediate",
      description: "Eliminate traditional API routes by utilizing server actions tied to clean PostgreSQL or MongoDB transactional database models.",
      videoLink: "https://youtu.be/F9gB5b4jgOI?si=wFTczMLBqetQE3JD",
      tags: ["Next.js", "Prisma", "Database"]
    }
  ];

  // Filtering Logic base configuration execution
  const filteredCourses = courseData.filter(course => {
    const matchesTab = activeFilter === "All" || course.category === activeFilter;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const filterTabs = ["All", "MERN Stack", "ReactJS", "Next.js", "MongoDB"];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 sm:p-6 lg:p-8 relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Premium Background Ambiance Blurs consistent with Resume page */}
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">
        
        {/* Module Header Title Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800/60 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
               Upskilling Courses 
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Bridge your missing engineering core gaps instantly by watching premium targeted developer video roadmaps.
            </p>
          </div>

          {/* Search bar integration */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search concepts or technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-indigo-500/50 transition-colors"
            />
          </div>
        </div>

        {/* Categories Tab Navigation Bar */}
        <div className="flex flex-wrap gap-2 items-center border-b border-slate-800/30 pb-2">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                activeFilter === tab
                  ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/10"
                  : "bg-slate-800/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800/60"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Video Course Artifact Cards Display Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div 
                key={course.id}
                className="group border border-slate-800/80 hover:border-indigo-500/30 bg-linear-to-b from-slate-800/30 to-slate-900/30 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:shadow-xl hover:shadow-slate-950/20 transition-all duration-300 relative"
              >
                {/* Upper Badge Info Block */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 bg-slate-950/80 text-indigo-400 rounded-md border border-slate-800">
                      {course.category}
                    </span>
                    <span className={`text-[10px] font-semibold font-sans px-2 py-0.5 rounded ${
                      course.level === "Advanced" ? "text-rose-400 bg-rose-500/5" : "text-amber-400 bg-amber-500/5"
                    }`}>
                      {course.level}
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-white group-hover:text-indigo-400 transition-colors tracking-tight leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                    {course.description}
                  </p>
                </div>

                {/* Technical Stack Pills Footer & Watch Action */}
                <div className="space-y-4 pt-2 border-t border-slate-800/40">
                  <div className="flex flex-wrap gap-1.5">
                    {course.tags.map((tag, i) => (
                      <span key={i} className="text-[9px] font-mono px-2 py-0.5 bg-slate-900/60 border border-slate-800 text-slate-400 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {course.duration}</span>
                    <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> HD Quality</span>
                  </div>

                  {/* Core CTA Redirect Anchor */}
                  <a
                    href={course.videoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-4 py-2.5 bg-slate-950 hover:bg-indigo-600 border border-slate-800 hover:border-indigo-500 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-inner group"
                  >
                    <Play className="h-3.5 w-3.5 fill-current text-indigo-400 group-hover:text-white transition-colors" /> 
                    PLay Video
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search Fallback State */
          <div className="p-16 border border-dashed border-slate-800 rounded-3xl text-center space-y-4 max-w-xl mx-auto flex flex-col items-center">
            <Code2 className="h-10 w-10 text-slate-600 animate-pulse" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-300">No Stack Modules Found</h4>
              <p className="text-xs text-slate-500">Bhai, is keyword ke related koi pipeline video indexed nahi hai. Koi dusra query search karke dekho!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;