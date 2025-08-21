import React from "react";
import DataLingoLogo from "./DataLingoLogo";
import "./AboutUs.css";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import aboutImage from "../assets/about.jpg";

export default function AboutUs({ theme }) {
  const isDark = theme === "dark";

  const purposeItems = [
    {
      title: "Natural Language to Query",
      text: "DataLingo is a smart AI-powered interface that allows users to interact with databases using everyday human language. Instead of writing complex queries, users can simply type their questions.",
    },
    {
      title: "Accessibility",
      text: "DataLingo eliminates the steep learning curve of complex query languages by letting anyone ask questions in plain language and instantly receive accurate results. "
      ,
    },
    {
      title: "AI Integration",
      text: "DataLingo leverages advanced AI models to understand the true intent behind user queries, even if they are incomplete, ambiguous, or contain natural language nuances.",
    },
    {
      title: "Efficiency",
      text: "DataLingo streamlines the data retrieval process by eliminating the need to manually write complex SQL queries. Developers and analysts can simply describe what they need in plain language, and the system automatically generates queries ready for execution.",
    },
  ];

  return (
    <div className={`aboutus-container ${theme}`}>
      {/* Navbar */}
      <nav
        className={`aboutus-navbar w-full z-50 h-[56px] shadow-sm transition-colors duration-300 ${isDark ? "bg-black text-white" : "bg-[#F8F8F8] text-gray-800"
          }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between pl-2 pr-2 h-full w-full">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => (window.location.href = "/")}
          >
            <DataLingoLogo className="w-10 h-8" />
            <span
              className="text-xl font-bold text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(to right, #B57EDC, #9B5DE5)" }}
            >
              DataLingo
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/" className="text-sm font-medium transition-colors duration-300 hover:text-[#B57EDC]">
              Home
            </a>
            <a href="/howitworks" className="text-sm font-medium transition-colors duration-300 hover:text-[#B57EDC]">
              How It Works
            </a>
            <a href="/pricing" className="text-sm font-medium transition-colors duration-300 hover:text-[#B57EDC]">
              Pricing
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Image Section */}
      <div className="relative w-full h-[calc(100vh-56px)] overflow-hidden">
        <img
          src={aboutImage}
          alt="About Datalingo"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80 z-10" />
      </div>

      {/* Spacer to prevent overlap */}
      <div className="h-10 sm:h-16" />

      {/* Our Purpose Section */}
      <section className="about-section px-4 sm:px-8">
        <h2 className="text-3xl font-bold text-center mb-4" style={{ color: "#B57EDC" }}>
          Our Purpose
        </h2>
        <p
          className={`text-center max-w-3xl mx-auto mb-10 text-base sm:text-lg ${isDark ? "text-white" : "text-[#B57EDC]"
            }`}
        >
          DataLingo is a smart, user-friendly platform designed to help users interpret, query, and visualize data in a natural, conversational way.
          Its main goal is to bridge the gap between complex data and human understanding by allowing users to interact with datasets using simple, everyday language.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {purposeItems.map((item, index) => (
            <div
              key={index}
              className={`w-[250px] h-[250px] p-6 rounded-xl transform transition duration-500 hover:scale-105 animate-fade-in`}
              style={{
                animationDelay: `${index * 0.2}s`,
                backgroundColor: isDark ? "#000" : "#d3bdf0",
                color: isDark ? "#fff" : "#B57EDC",
                boxShadow: `0 4px 12px ${isDark ? "#B57EDC" : "#d3bdf0"}`,
              }}
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="aboutus-footer mt-16 flex justify-center space-x-6 text-xl text-gray-400">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
      </footer>

      {/* Animation Styles */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}