import React from "react";
import { motion } from "framer-motion";
import DataLingoLogo from "./DataLingoLogo";
import "./HowItWorks.css";
import HowItWorksBg from "../assets/HowItWorks.jpg";

const steps = [
  { number: "1", title: "Start with Natural Language", description: "Type your data-related question like you're chatting with a person." },
  { number: "2", title: "Upload Optional Excel Files", description: "Attach spreadsheet files to enhance the understanding of your query." },
  { number: "3", title: "Generate Smart SQL", description: "We generate optimized queries based on your input." },
  { number: "4", title: "Export & Use", description: "Download queries or run in your database seamlessly." },
];

const HowItWorks = ({ theme }) => {
  const isDark = theme === "dark";

  return (
    <div
      className={`howitworks-container ${isDark ? "dark-theme" : "light-theme"}`}
      style={{
        backgroundImage: `url(${HowItWorksBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Navbar */}
      <nav className={`howitworks-navbar ${isDark ? "navbar-dark" : "navbar-light"}`}>
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
            <a href="/" className="text-sm font-medium transition-colors duration-300 hover:text-[#B57EDC]">Home</a>
            <a href="/aboutus" className="text-sm font-medium transition-colors duration-300 hover:text-[#B57EDC]">About</a>
            <a href="/pricing" className="text-sm font-medium transition-colors duration-300 hover:text-[#B57EDC]">Pricing</a>
          </div>
        </div>
      </nav>

      {/* Centered Glassmorphism Box */}
      <section className="howitworks-main">
        <div className="howitworks-card glass-bg">
          <h2 className="howitworks-title">How It Works</h2>

          {/* Row 1: Steps 1 & 2 */}
          <div className="howitworks-steps">
            {steps.slice(0, 2).map((step, index) => (
              <motion.div
                key={index}
                className="howitworks-step"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.4, ease: "easeOut" }}
              >
                <span className="step-number">{step.number}</span>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Row 2: Steps 3 & 4 */}
          <div className="howitworks-steps">
            {steps.slice(2, 4).map((step, index) => (
              <motion.div
                key={index}
                className="howitworks-step"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index + 2) * 0.4, ease: "easeOut" }}
              >
                <span className="step-number">{step.number}</span>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`howitworks-footer ${isDark ? "footer-dark" : "footer-light"}`}>
        <p className="text-sm">© {new Date().getFullYear()} DataLingo. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HowItWorks;
