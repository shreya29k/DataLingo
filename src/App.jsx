import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ChatInterface from "./components/ChatInterface";
import AboutUs from "./components/AboutUs";
import HowItWorks from "./components/HowItWorks";
import Pricing from "./components/Pricing";
import Research from "./components/Research";
import QueryInterface from "./components/QueryInterface"; // Add this import
import { Toaster } from 'react-hot-toast';

// Custom component to manage layout based on route
const AppContent = ({ theme, setTheme }) => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  
  return (
    <>
      {/* Show Header only on landing page */}
      {isLandingPage && <Header theme={theme} setTheme={setTheme} />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero theme={theme} />
              <Footer />
            </>
          }
        />
        {/* Dedicated pages for About Us and How It Works */}
        <Route path="/aboutus" element={<AboutUs theme={theme} />} />
        <Route path="/howitworks" element={<HowItWorks theme={theme} />} />
        <Route path="/register" element={<Registration theme={theme} />} />
        <Route path="/login" element={<Login theme={theme} />} />
        <Route path="/chat" element={<ChatInterface theme={theme} />} />
        <Route path="/pricing" element={<Pricing theme={theme} />} />
        <Route path="/research" element={<Research theme={theme} />} />
        {/* Add the new Query Interface route */}
        <Route path="/query" element={<QueryInterface theme={theme} />} />
      </Routes>
    </>
  );
};

function App() {
  const [theme, setTheme] = useState("dark");
  
  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);
  
  return (
    <div className={theme === "dark" ? "bg-[#0B1221]" : "bg-[#F1DEC9]"}>
      <Router>
        <AppContent theme={theme} setTheme={setTheme} />
      </Router>
    </div>
  );
}

export default App;   