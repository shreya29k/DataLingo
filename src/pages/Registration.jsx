import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider, appleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { registerUser } from "../services/authService"; // ✅ Import service
import "./Registration.css";

const Registration = ({ theme }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    dob: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await registerUser(formData); // ✅ Call backend
      alert("Registration successful");
      navigate("/login"); // ✅ Redirect to login
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google User:", result.user);
      alert(`Welcome ${result.user.displayName}`);
    } catch (error) {
      console.error("Google Login Error:", error);
      alert("Google Login Failed");
    }
  };

  const handleAppleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, appleProvider);
      console.log("Apple User:", result.user);
      alert(`Welcome ${result.user.displayName}`);
    } catch (error) {
      console.error("Apple Login Error:", error);
      alert("Apple Login Failed");
    }
  };

  return (
    <div className={`registration-container ${theme === "dark" ? "dark" : "light"}`}>
      <form className="registration-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Get access to Data Lingo</h2>
        <p className="form-subtitle">Sign up in just ten seconds</p>

        {/* Google Signup */}
        <button
          type="button"
          className="signup-btn google"
          onClick={handleGoogleSignup}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 48 48"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.36 30.41 0 24 0 14.63 0 6.43 5.92 2.56 14.44l7.98 6.19C12.28 14.51 17.7 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.1 24.55c0-1.57-.14-3.09-.39-4.55H24v9.02h12.35c-.53 2.84-2.12 5.25-4.53 6.87l7.08 5.51c4.13-3.81 6.5-9.43 6.5-16.85z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.64c-1.2-3.56-1.2-7.42 0-10.98L2.56 11.47C-.85 17.61-.85 30.39 2.56 36.53l7.97-7.89z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.91-2.14 15.88-5.8l-7.08-5.51c-2.01 1.34-4.6 2.13-8.8 2.13-6.3 0-11.72-5.01-13.47-11.82l-7.97 7.89C6.43 42.08 14.63 48 24 48z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Apple Signup */}
        <button
          type="button"
          className="signup-btn apple"
          onClick={handleAppleSignup}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 48 48"
            fill="black"
          >
            <path d="M33.63 24.33c.06 6.04 5.28 8.05 5.34 8.08-.04.13-.83 2.83-2.73 5.6-1.65 2.41-3.36 4.8-6.05 4.85-2.65.05-3.5-1.56-6.54-1.56-3.05 0-4.02 1.51-6.56 1.61-2.63.1-4.62-2.6-6.3-5-3.43-5-6.07-14.12-2.54-20.27 1.76-3.06 4.9-5 8.29-5.06 2.6-.05 5.06 1.76 6.54 1.76 1.46 0 4.5-2.18 7.6-1.85 1.3.05 4.96.53 7.32 3.99-0.19.12-4.31 2.56-4.27 7.85zM27.72 9.22c1.4-1.71 2.34-4.1 2.08-6.49-2.01.08-4.43 1.33-5.87 3.02-1.29 1.49-2.43 3.94-2.13 6.26 2.24.17 4.53-1.14 5.92-2.79z" />
          </svg>
          <span>Continue with Apple</span>
        </button>

        <div className="divider">OR</div>

        {/* Username Section */}
        <div className="input-section">
          <FaUser className="icon" />
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password Section */}
        <div className="input-section">
          <FaLock className="icon" />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Continue
        </button>

        <p className="terms-text">
          By continuing, you agree with the{" "}
          <a href="/terms-of-service">Terms</a> and{" "}
          <a href="/privacy-policy">Privacy Policy</a>
        </p>

        <p className="login-text">
          Already have an account? <Link to="/login" className="login-link">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default Registration;