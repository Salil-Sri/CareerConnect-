import React, { useState, useEffect } from "react";

export default function TestScreen({ skill, questions, onSubmit, onCancel }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  
  // Format state matching backend logic: { [questionId]: "selected_string" }
  const [selectedAnswers, setSelectedAnswers] = useState({});
  
  // Timer settings: 60 seconds per question allocated automatically
  const [timeLeft, setTimeLeft] = useState(questions.length * 60);

  // Timer Countdown Side-Effect
  useEffect(() => {
    if (timeLeft <= 0) {
      triggerAutoSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionSelect = (optionStr) => {
    const activeQuestionId = questions[currentIdx]._id;
    setSelectedAnswers((prev) => ({
      ...prev,
      [activeQuestionId]: optionStr
    }));
  };

  const triggerAutoSubmit = () => {
    alert("Time is up! Your responses are being submitted automatically.");
    onSubmit(selectedAnswers);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const currentQuestion = questions[currentIdx];

  return (
    <div className="w-full max-w-3xl bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden mt-4">
      {/* Test Meta Header */}
      <div className="bg-slate-850 p-4 px-6 border-b border-slate-700 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-cyan-950 text-cyan-400 border border-cyan-800 rounded-full">
            {skill} Test
          </span>
          <span className="text-slate-400 text-sm ml-3">
            Question <span className="text-white font-medium">{currentIdx + 1}</span> of {questions.length}
          </span>
        </div>

        {/* Timer UI Element */}
        <div className={`flex items-center space-x-2 px-4 py-1.5 rounded-xl border ${timeLeft < 30 ? "bg-rose-950/50 border-rose-800 text-rose-400 animate-pulse" : "bg-slate-900 border-slate-700 text-cyan-400"}`}>
          <span className="text-xs uppercase tracking-wide font-medium">Time Left:</span>
          <span className="font-mono font-bold text-base">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-slate-900">
        <div 
          className="h-full bg-linear-to-r from-cyan-500 to-blue-500 transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Main Body Area */}
      <div className="p-6 md:p-8">
        {/* Question Title */}
        <h3 className="text-xl font-medium text-slate-100 mb-6 leading-relaxed">
          {currentQuestion?.question}
        </h3>

        {/* Options Stack */}
        <div className="space-y-3">
          {currentQuestion?.options.map((option, index) => {
            const isSelected = selectedAnswers[currentQuestion._id] === option;
            return (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-center justify-between text-sm md:text-base ${
                  isSelected 
                    ? "bg-cyan-950/40 border-cyan-500 text-cyan-200 font-medium" 
                    : "bg-slate-900/60 border-slate-700/60 text-slate-300 hover:bg-slate-700/40 hover:border-slate-600"
                }`}
              >
                <span>{option}</span>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? "border-cyan-400 bg-cyan-500" : "border-slate-600"}`}>
                  {isSelected && <div className="w-2 h-2 bg-slate-900 rounded-full"></div>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Navigation bar */}
      <div className="bg-slate-900/60 px-6 py-4 border-t border-slate-700 flex justify-between items-center">
        <button
          onClick={onCancel}
          className="text-slate-400 hover:text-rose-400 text-sm font-medium transition"
        >
          Quit Test
        </button>

        <div className="flex space-x-3">
          <button
            onClick={() => setCurrentIdx((p) => Math.max(0, p - 1))}
            disabled={currentIdx === 0}
            className="px-4 py-2 text-sm font-medium bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Previous
          </button>

          {currentIdx < questions.length - 1 ? (
            <button
              onClick={() => setCurrentIdx((p) => p + 1)}
              className="px-5 py-2 text-sm font-medium bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl transition"
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => onSubmit(selectedAnswers)}
              className="px-6 py-2 text-sm font-bold bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl shadow-lg transition transform active:scale-95"
            >
              Submit Assessment
            </button>
          )}
        </div>
      </div>
    </div>
  );
}