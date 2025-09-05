// src/pages/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col justify-between">
      {/* Header */}
      <header className="flex justify-between items-center p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-indigo-700">🧠 Mental Journal</h1>
        <div className="space-x-4">
        <Link to="/login" className="px-6 py-3 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 hover:scale-105 transition-transform duration-200">Login</Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-4xl font-bold text-indigo-800 mb-4">Reflect. Heal. Grow.</h2>
        <p className="text-lg text-gray-700 max-w-xl mb-8">
          Your personal, AI-powered journaling space — helping you express, explore and evolve.
        </p>
        <Link
          to="/signup"
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
        >
          Start Journaling
        </Link>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Sabyasachi • Built with ❤️ and AI
      </footer>
    </div>
  );
};

export default LandingPage;