import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUserShield, FaArrowRight, FaHome } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedNotification, setCopiedNotification] = useState(false);

  const { email, password } = data;

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage("");
  };

  const handleQuickFill = () => {
    setData({
      email: "teacher@gmail.com",
      password: "teacher@123",
    });
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      setErrorMessage("Please enter both email and password");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.get(
        `http://localhost:3000/login/${encodeURIComponent(data.email)}/${encodeURIComponent(data.password)}`
      );

      if (response.status === 200) {
        sessionStorage.setItem("email", data.email);
        navigate("/Otp");
      } else {
        setErrorMessage("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      if (error.response && error.response.status === 404) {
        setErrorMessage("User not found! Please check your credentials.");
      } else {
        setErrorMessage("Unable to connect to the authentication server. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <header className="auth-navbar">
        <div className="auth-nav-container">
          <Link to="/" className="auth-brand">
            <img
              src="https://res.cloudinary.com/dgrys85u0/image/upload/v1676784497/APT_EMBLEM-removebg-preview_d50kel.png"
              alt="APT Emblem"
              className="auth-brand-logo"
            />
            <div className="auth-brand-text">
              <h2>ANDHRA POLYTECHNIC</h2>
              <p>Faculty & Administration Portal • Kakinada</p>
            </div>
          </Link>
          <div className="auth-nav-links">
            <Link to="/" className="auth-nav-btn">
              <FaHome style={{ marginRight: "6px" }} /> Home
            </Link>
          </div>
        </div>
      </header>

      <div className="auth-card-container">
        <div className="auth-modern-card">
          <div className="auth-card-header">
            <div className="auth-card-icon">
              <FaUserShield />
            </div>
            <h2>Teacher's Space Login</h2>
            <p>Sign in with your faculty credentials to access student records</p>
          </div>

          {/* Teacher's Space Demo Credentials Banner */}
          <div className="demo-credentials-card">
            <div className="demo-credentials-header">
              <span className="demo-badge-title">
                <FaUserShield style={{ marginRight: "4px" }} /> Default Teacher Credentials
              </span>
              <button
                type="button"
                onClick={handleQuickFill}
                className="quick-fill-btn"
                title="Click to auto-fill teacher credentials"
              >
                ⚡ {copiedNotification ? "Filled!" : "Quick Fill"}
              </button>
            </div>
            <div className="demo-grid">
              <div className="demo-item">
                <span className="demo-label">Email:</span>
                <span className="demo-value">teacher@gmail.com</span>
              </div>
              <div className="demo-item">
                <span className="demo-label">Password:</span>
                <span className="demo-value">teacher@123</span>
              </div>
              <div className="demo-item">
                <span className="demo-label">Default OTP:</span>
                <span className="demo-value">1234</span>
              </div>
            </div>
          </div>

          {errorMessage && (
            <div className="alert alert-danger py-2 px-3 mb-3 text-center" style={{ fontSize: "14px", borderRadius: "8px" }}>
              {errorMessage}
            </div>
          )}

          <form onSubmit={submitHandler}>
            <div className="auth-form-group">
              <label className="auth-form-label">Email Address</label>
              <div className="auth-input-wrapper">
                <FaEnvelope className="auth-input-icon" />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={changeHandler}
                  placeholder="teacher@gmail.com"
                  className="auth-modern-input"
                  required
                />
              </div>
            </div>

            <div className="auth-form-group">
              <label className="auth-form-label">Password</label>
              <div className="auth-input-wrapper">
                <FaLock className="auth-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={changeHandler}
                  placeholder="••••••••"
                  className="auth-modern-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="auth-password-toggle"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="auth-options">
              <Link to="/ForgotPassword" className="auth-forgot-link">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? "Authenticating..." : <>Continue to OTP <FaArrowRight /></>}
            </button>
          </form>

          <div className="auth-card-footer">
            <p>
              Return to public portal? <Link to="/">Back to Homepage</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
