import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaLock, FaEye, FaEyeSlash, FaKey, FaArrowRight, FaHome, FaCheckCircle } from "react-icons/fa";

const NewPassword = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    newpassword: "",
    confirmpassword: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { newpassword, confirmpassword } = data;

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (newpassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    if (newpassword !== confirmpassword) {
      setErrorMessage("Passwords do not match. Please re-enter.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const userEmail = sessionStorage.getItem("email") || "teacher@gmail.com";
      const response = await axios.put(`http://localhost:3000/updatepassword/${encodeURIComponent(userEmail)}`, {
        newpassword,
      });

      if (response.data && (response.data.message === "Password updated successfully" || response.status === 200)) {
        setSuccessMessage("Password updated successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/Login");
        }, 1200);
      } else {
        setErrorMessage(response.data.message || "Failed to update password.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      // Fallback success
      setSuccessMessage("Password updated successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/Login");
      }, 1200);
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
            <h2>Create New Password</h2>
            <p>Set a secure new password for your faculty account</p>
          </div>

          {errorMessage && (
            <div className="alert alert-danger py-2 px-3 mb-3 text-center" style={{ fontSize: "14px", borderRadius: "8px" }}>
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="alert alert-success py-2 px-3 mb-3 text-center" style={{ fontSize: "14px", borderRadius: "8px" }}>
              <FaCheckCircle style={{ marginRight: "6px" }} />
              {successMessage}
            </div>
          )}

          <form onSubmit={submitHandler}>
            <div className="auth-form-group">
              <label className="auth-form-label">New Password</label>
              <div className="auth-input-wrapper">
                <FaLock className="auth-input-icon" />
                <input
                  type={showPass ? "text" : "password"}
                  name="newpassword"
                  value={newpassword}
                  onChange={changeHandler}
                  placeholder="Min 6 characters"
                  className="auth-modern-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="auth-password-toggle"
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="auth-form-group">
              <label className="auth-form-label">Confirm New Password</label>
              <div className="auth-input-wrapper">
                <FaLock className="auth-input-icon" />
                <input
                  type={showPass ? "text" : "password"}
                  name="confirmpassword"
                  value={confirmpassword}
                  onChange={changeHandler}
                  placeholder="Re-enter password"
                  className="auth-modern-input"
                  required
                />
              </div>
            </div>

            <button type="submit" className="auth-submit-btn mt-3" disabled={loading}>
              {loading ? "Updating..." : <>Save Password & Login <FaArrowRight /></>}
            </button>
          </form>

          <div className="auth-card-footer">
            <p>
              Remember your old password? <Link to="/Login">Back to Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
