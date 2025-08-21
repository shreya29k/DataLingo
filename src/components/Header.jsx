import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import DataLingoLogo from "./DataLingoLogo";

export default function Header({ theme, setTheme }) {
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();

  const brandGradient = "linear-gradient(to right, #B57EDC, #9B5DE5)";

  // Toggle theme and save to localStorage
  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const navLinks = [
    
    { href: "/register", label: "Register" },
    { href: "/login", label: "Log In" },
  ];

  const handleNavClick = (href) => {
    navigate(href);
  };

  // On mount, load theme from localStorage (only if previously set by user)
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, [setTheme]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "aboutus", "howitworks"];
      for (let sec of sections) {
        const el = document.getElementById(sec);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(sec);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 h-[56px] transition-colors duration-300 shadow-sm
        ${theme === "dark" ? "bg-black text-white" : "bg-[#F8F8F8] text-gray-800"}`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between pl-2 pr-2 h-full w-full">
        {/* Left: Logo + Brand */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => handleNavClick("/")}
        >
          <DataLingoLogo className="w-10 h-8" />
          <span
            className="text-xl font-bold text-transparent bg-clip-text"
            style={{ backgroundImage: brandGradient }}
          >
            DataLingo
          </span>
        </div>

        {/* Right: Nav Links + Theme Toggle */}
        <div className="flex items-center space-x-2 ml-auto">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 shadow-md bg-gradient-to-r from-[#B57EDC] to-[#9B5DE5] text-white hover:scale-105"
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-all duration-300 hover:scale-110 relative overflow-hidden"
          >
            <svg width="0" height="0">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#B57EDC" />
                  <stop offset="100%" stopColor="#9B5DE5" />
                </linearGradient>
              </defs>
            </svg>
            {theme === "dark" ? (
              <Sun
                className="w-5 h-5"
                style={{ stroke: "currentColor", color: "#fff" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.stroke = "url(#grad1)")
                }
                onMouseLeave={(e) =>
                (e.currentTarget.style.stroke =
                  theme === "dark" ? "#fff" : "#555")
                }
              />
            ) : (
              <Moon
                className="w-5 h-5"
                style={{ stroke: "currentColor", color: "#555" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.stroke = "url(#grad1)")
                }
                onMouseLeave={(e) =>
                (e.currentTarget.style.stroke =
                  theme === "dark" ? "#fff" : "#555")
                }
              />
            )}
          </button>
        </div>
      </div>

      {/* Responsive Shrink */}
      <style jsx>{`
        @media (max-width: 640px) {
          header {
            padding: 0.5rem 1rem;
          }
          span {
            font-size: 1rem;
          }
          button {
            padding: 0.4rem 0.8rem;
            font-size: 0.75rem;
          }
        }
      `}</style>
    </header>
  );
}
