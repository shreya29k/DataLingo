import React from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleNavClick = (target) => {
    if (target === "home") {
      navigate("/");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    } else {
      navigate(`/${target}`);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container footer-centered">
        {/* Navigation Links */}
        <nav className="footer-nav">
          <ul>
            <li>
              <button
                onClick={() => handleNavClick("home")}
                className="footer-link"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("howitworks")}
                className="footer-link"
              >
                How It Works
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("aboutus")}
                className="footer-link"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("pricing")}
                className="footer-link"
              >
                Pricing
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("research")}
                className="footer-link"
              >
                Research
              </button>
            </li>
          </ul>
        </nav>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} DataLingo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
