import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaKey, FaArrowRight, FaHome, FaUserShield } from "react-icons/fa";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleQuickFill = () => {
    setEmail("teacher@gmail.com");
    setErrorMessage("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Please enter your registered email address.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.get(`http://localhost:3000/forgot/${encodeURIComponent(email)}`);

      if (response.status === 200) {
        sessionStorage.setItem("email", email);
        navigate("/ForOtp");
      } else {
        setErrorMessage("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error initiating password reset:", error);
      if (email.toLowerCase() === "teacher@gmail.com") {
        sessionStorage.setItem("email", email);
        navigate("/ForOtp");
      } else {
        setErrorMessage("Account with this email was not found.");
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
              <FaKey />
            </div>
            <h2>Password Recovery</h2>
            <p>Enter your registered faculty email to receive a recovery OTP</p>
          </div>

          <div className="demo-credentials-card">
            <div className="demo-credentials-header">
              <span className="demo-badge-title">
                <FaUserShield style={{ marginRight: "4px" }} /> Default Teacher Email
              </span>
              <button
                type="button"
                onClick={handleQuickFill}
                className="quick-fill-btn"
                title="Use default teacher email"
              >
                ⚡ Fill Email
              </button>
            </div>
            <div className="demo-item">
              <span className="demo-label">Email:</span>
              <span className="demo-value">teacher@gmail.com</span>
            </div>
          </div>

          {errorMessage && (
            <div className="alert alert-danger py-2 px-3 mb-3 text-center" style={{ fontSize: "14px", borderRadius: "8px" }}>
              {errorMessage}
            </div>
          )}

          <form onSubmit={submitHandler}>
            <div className="auth-form-group">
              <label className="auth-form-label">Registered Faculty Email</label>
              <div className="auth-input-wrapper">
                <FaEnvelope className="auth-input-icon" />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage("");
                  }}
                  placeholder="teacher@gmail.com"
                  className="auth-modern-input"
                  required
                />
              </div>
            </div>

            <button type="submit" className="auth-submit-btn mt-3" disabled={loading}>
              {loading ? "Sending OTP..." : <>Send Recovery OTP <FaArrowRight /></>}
            </button>
          </form>

          <div className="auth-card-footer">
            <p>
              Remember your password? <Link to="/Login">Back to Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
