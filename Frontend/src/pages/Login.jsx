import { useState } from "react";
import "./Login.css";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import googleLogo from "../assets/google-logo.svg";
import appleLogo from "../assets/apple-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

export default function Login({ theme = "light" }) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // for redirecting after login

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await loginUser({ username, password });

      if (result.token) {
        localStorage.setItem("token", result.token);
        alert(result.message || "Login successful");
        navigate("/chat"); // or wherever you want to redirect
      } else {
        setError("Login failed: No token received");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const googleAuth = () => {
    const clientId = "YOUR_GOOGLE_CLIENT_ID";
    const redirectUri = "http://localhost:5173";
    const scope = "email profile";
    const responseType = "token";
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
    window.location.href = authUrl;
  };

  const appleAuth = () => {
    const clientId = "YOUR_APPLE_CLIENT_ID";
    const redirectUri = "http://localhost:5173";
    const scope = "name email";
    const responseType = "code";
    const authUrl = `https://appleid.apple.com/auth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
    window.location.href = authUrl;
  };

  return (
    <div className={`login-container ${theme}`}>
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="form-title">Login</h2>
        <p className="form-subtitle">Welcome back! Please login to your account.</p>

        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ? (
            <FaEyeSlash className="password-toggle" onClick={() => setShowPassword(false)} />
          ) : (
            <FaEye className="password-toggle" onClick={() => setShowPassword(true)} />
          )}
        </div>

        {error && <p className="error-text">{error}</p>}

        <div style={{ textAlign: "right", marginTop: "8px" }}>
          <Link to="/forgot-password" style={{ color: "#9b59b6", textDecoration: "none", fontSize: "14px" }}>
            Forgot password?
          </Link>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="divider" style={{ marginTop: "40px" }}>Or Sign Up Using</div>

        <div className="social-login">
          <button type="button" className="social-btn google" onClick={googleAuth}>
            <img src={googleLogo} alt="Google" width="20" height="20" />
          </button>
          <button type="button" className="social-btn apple" onClick={appleAuth}>
            <img src={appleLogo} alt="Apple" width="20" height="20" />
          </button>
        </div>

        <p className="terms-text">
          Don’t have an account? <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}