import React, { useState, useEffect } from "react";
import {
  Bot,
  Send,
  Sparkles,
  Briefcase,
  Terminal,
  LayoutDashboard,
  FileCheck,
  GitBranch,
  Compass,
  Layers,
  User,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

import { sendMessageToMentor } from "../services/mentorService";

const AIMentor = () => {
  const [studentName, setStudentName] = useState("Aman");
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: `Hey ${studentName}! I've analyzed your current MERN stack progress and your 88% ATS Resume Score. What career vector should we optimize today?`,
      time: "Just now",
    },
  ]);

  useEffect(() => {
  const storedUser = localStorage.getItem("userInfo");
  if (storedUser) {
    const parsed = JSON.parse(storedUser);

    if (parsed.user?.name) {
      const firstName = parsed.user.name.split(" ")[0];
      setStudentName(firstName);

      // Dynamic greeting update
      setMessages([
        {
          id: 1,
          sender: "ai",
          text: `Hey ${firstName}! I've analyzed your current profile. What career vector should we optimize today?`,
          time: "Just now",
        },
      ]);
    }
  }
}, []);


  // Quick Prompt Suggestions Array
  const suggestedPrompts = [
    {
      title: "Review Node.js Core Architecture",
      tag: "Interview Prep",
      query:
        "Can you ask me 3 advanced interview questions on Node.js Event Loop?",
    },
    {
      title: "MERN Project Ideas for Placement",
      tag: "Project Booster",
      query:
        "Suggest a unique full-stack project idea that involves AI or complex tracking pipelines.",
    },
    {
      title: "How to fix MongoDB Indexing?",
      tag: "Skill Gap",
      query:
        "Give me a quick roadmap to optimize query performance using MongoDB indexing.",
    },
  ];

  const handleSendMessage = async (textToSend) => {
  if (!textToSend.trim()) return;

  const userMsg = {
    id: Date.now(),
    sender: "user",
    text: textToSend,
    time: "Just now",
  };

  setMessages((prev) => [...prev, userMsg]);
  setInputMessage("");
  setIsTyping(true);

  try {
    const response = await sendMessageToMentor(textToSend);

    const aiResponse = {
      id: Date.now() + 1,
      sender: "ai",
      text: response.reply,
      time: "Just now",
    };

    setMessages((prev) => [...prev, aiResponse]);
  } catch (error) {
    const errorResponse = {
      id: Date.now() + 2,
      sender: "ai",
      text: "⚠️ AI Mentor is currently unavailable. Please try again later.",
      time: "Just now",
    };

    setMessages((prev) => [...prev, errorResponse]);
  } finally {
    setIsTyping(false);
  }
};

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background Ambient Blur Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-150 h-150 rounded-full bg-indigo-500/5 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-150 h-150 rounded-full bg-purple-500/5 blur-[140px] pointer-events-none -z-10" />

      {/* Main AI Dashboard Split Window */}
      <div className="flex-1 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 h-screen max-h-screen overflow-hidden">
        {/* ========================================================= */}
        {/* LEFT PANEL: INSIGHTS & ROADMAPS (COL SPAN 4) */}
        {/* ========================================================= */}
        <div className="lg:col-span-4 hidden lg:flex lg:flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar h-full pb-6">
          {/* System Profile Card */}
          <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-800/80 backdrop-blur-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/10">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  CareerAI Mentor{" "}
                  <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-1.5 py-0.5 rounded border border-indigo-500/20 font-bold uppercase">
                    v2.4
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Continuous Profile Optimization Engine
                </p>
              </div>
            </div>
          </div>

          {/* AI Career Insights Box */}
          <div className="p-5 rounded-2xl bg-linear-to-br from-indigo-950/20 to-slate-800/30 border border-slate-800/80 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
              <Lightbulb className="h-3.5 w-3.5" /> Real-Time Analytics Vector
            </h4>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/60 space-y-1">
                <span className="text-[10px] font-mono text-purple-400 font-bold uppercase">
                  Current Trajectory
                </span>
                <p className="text-xs text-slate-200 font-semibold">
                  Full-Stack Engineer (MERN)
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/60 space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                  Identified Skill Gap
                </span>
                <p className="text-xs text-slate-200 font-semibold">
                  Advanced Query Indexing & Aggregations
                </p>
              </div>
            </div>
          </div>

          {/* Recommended Action Triggers */}
          <div className="p-5 rounded-2xl bg-slate-800/20 border border-slate-800/80 space-y-3 flex-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Compass className="h-3.5 w-3.5" /> Contextual Actions
            </h4>
            <div className="space-y-2 text-xs">
              <button className="w-full text-left p-3 rounded-xl border border-slate-800 bg-slate-900/20 hover:border-indigo-500/30 text-slate-300 transition-colors flex items-center justify-between group">
                <span>Simulate Mock Technical Interview</span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button className="w-full text-left p-3 rounded-xl border border-slate-800 bg-slate-900/20 hover:border-purple-500/30 text-slate-300 transition-colors flex items-center justify-between group">
                <span>Verify GitBranch Portfolios Specs</span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT PANEL: CHAT HUB MODULE (COL SPAN 8) */}
        {/* ========================================================= */}
        <div className="lg:col-span-8 flex flex-col bg-slate-800/20 border border-slate-800/80 rounded-3xl overflow-hidden h-full">
          {/* Chat Header Toolbar */}
          <div className="p-4 border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-md flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-slate-300">
                Dedicated Mentorship Thread
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
              ⚡ Secure Pipeline Node
            </div>
          </div>

          {/* Chat Conversational Streams */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scroll-smooth">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-4 max-w-3xl ${msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                {/* Avatar Icon */}
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                    msg.sender === "user"
                      ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-400"
                      : "bg-purple-500/10 border-purple-500/30 text-purple-400"
                  }`}
                >
                  {msg.sender === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>

                {/* Message Context Box */}
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed border shadow-sm ${
                    msg.sender === "user"
                      ? "bg-linear-to-br from-indigo-500/10 to-indigo-600/5 border-indigo-500/20 text-slate-200 rounded-tr-none"
                      : "bg-slate-900/60 border-slate-800 text-slate-300 rounded-tl-none"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className="text-[10px] text-slate-500 mt-2 block text-right font-mono">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {/* AI Typing Loader Simulation */}
            {isTyping && (
              <div className="flex gap-4 max-w-3xl mr-auto">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 rounded-tl-none flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" />
                </div>
              </div>
            )}
          </div>

          {/* Quick Core Prompt Injections Grid (Only displayed when input is empty to clean UI space) */}
          {messages.length <= 2 && !inputMessage && (
            <div className="px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3 shrink-0">
              {suggestedPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt.query)}
                  className="p-3 text-left bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 rounded-xl transition-all group"
                >
                  <span className="text-[9px] font-mono text-indigo-400 font-bold block uppercase mb-1">
                    {prompt.tag}
                  </span>
                  <p className="text-[11px] font-medium text-slate-300 line-clamp-2 group-hover:text-white leading-snug">
                    {prompt.title}
                  </p>
                </button>
              ))}
            </div>
          )}

          {/* Chat User Input Component */}
          <div className="p-4 border-t border-slate-800/80 bg-slate-900/20 backdrop-blur-md shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputMessage);
              }}
              className="relative flex items-center bg-slate-900/80 border border-slate-800 rounded-xl focus-within:border-indigo-500/50 transition-all p-1.5"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask anything about roadmaps, system optimization, or interview tracks..."
                className="w-full bg-transparent pl-3 pr-12 py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 outline-none"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="p-2.5 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-30 disabled:hover:bg-indigo-500 text-white rounded-lg transition-all absolute right-2 top-1/2 -translate-y-1/2 shadow-md shadow-indigo-500/10"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
            <p className="text-[10px] text-center text-slate-500 mt-2 flex items-center justify-center gap-1">
              <Sparkles className="h-3 w-3 text-indigo-400/60" /> CareerAI
              aggregates live recruitment filters for precision feedback.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMentor;
