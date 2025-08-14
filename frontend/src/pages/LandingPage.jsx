import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 to-cyan-600 text-white flex flex-col items-center justify-center px-6 py-16 text-center relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute w-96 h-96 bg-cyan-300 rounded-full -top-32 -left-32 opacity-20"></div>
      <div className="absolute w-72 h-72 bg-white rounded-full -bottom-20 -right-20 opacity-10"></div>

      {/* Main Content */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 z-10">
        Your Memories Journal, Reinvented
      </h1>
      <p className="text-lg sm:text-xl max-w-2xl mx-auto text-white/90 mb-8 z-10">
        Document your experiences and relive every moment. Create your personal dairy today.
      </p>

      <div className="flex gap-6 flex-col sm:flex-row z-10">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 text-cyan-600 bg-white rounded-lg font-semibold hover:bg-slate-100 transition"
        >
          Log In
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="px-6 py-3 bg-white/10 border border-white/30 rounded-lg font-semibold hover:bg-white/20 transition"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
