import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Hero.css";
import chatbotGif from "../assets/chatbot.gif";

const Hero = ({ theme }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/register");
  };

  return (
    <section
      className={`hero-section ${theme === "dark" ? "hero-dark" : "hero-light"}`}
    >
      <div
        className="hero-gif-bg"
        style={{ backgroundImage: `url(${chatbotGif})` }}
      ></div>

      {/* Glassmorphism Overlay */}
      <div className="hero-glass-overlay"></div>


      {/* Foreground Content */}
      <div className="hero-content">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className={`hero-title ${theme === "dark" ? "black-text" : "light-lavender-text"}`}
        >
          The New Standard in Data Analysis
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className={`hero-subtitle ${theme === "dark" ? "black-text" : "light-lavender-text"}`}
        >
          Use Data Lingo to Convert Natural Language to Query Language
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className={`cta-btn ${theme === "dark" ? "black-btn" : "light-lavender-btn"}`}
          onClick={handleGetStarted}
        >
          <span className="lavender-text">Get Started</span>
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
