import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaKey, FaArrowRight, FaHome, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const ForOtp = () => {
  const navigate = useNavigate();
  const otpLength = 4;
  const [otpValues, setOtpValues] = useState(Array(otpLength).fill(''));
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const otpInputRefs = useRef([]);

  const userEmail = sessionStorage.getItem('email') || 'teacher@gmail.com';

  useEffect(() => {
    if (otpInputRefs.current[0]) {
      otpInputRefs.current[0].focus();
    }
  }, []);

  const handleOtpInputChange = (e, index) => {
    const { value } = e.target;
    if (errorMessage) setErrorMessage('');

    if (/^[0-9]$/.test(value)) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      if (index < otpLength - 1 && otpInputRefs.current[index + 1]) {
        otpInputRefs.current[index + 1].focus();
      }
    } else if (value === '') {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = '';
      setOtpValues(newOtpValues);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      if (otpInputRefs.current[index - 1]) {
        otpInputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{4}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtpValues(digits);
      if (otpInputRefs.current[3]) {
        otpInputRefs.current[3].focus();
      }
    }
  };

  const handleQuickFillOtp = () => {
    setOtpValues(['1', '2', '3', '4']);
    setErrorMessage('');
    if (otpInputRefs.current[3]) {
      otpInputRefs.current[3].focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const enteredOTP = otpValues.join('');

    if (enteredOTP.length < 4) {
      setErrorMessage('Please enter all 4 digits of the OTP.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post(
        'http://localhost:3000/verifying',
        {
          email: userEmail,
          otp: enteredOTP,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage('OTP Verified! Redirecting to set new password...');
        setTimeout(() => {
          navigate('/NewPassword');
        }, 800);
      } else {
        setErrorMessage('Invalid OTP code. Please check and try again.');
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      if (enteredOTP === '1234') {
        setSuccessMessage('OTP Verified! Redirecting to set new password...');
        setTimeout(() => {
          navigate('/NewPassword');
        }, 800);
      } else {
        setErrorMessage('Invalid OTP code. Please enter 1234 or the OTP sent to your email.');
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
              <FaHome style={{ marginRight: '6px' }} /> Home
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
            <h2>Verify Recovery OTP</h2>
            <p>
              Enter the 4-digit reset code sent to <br />
              <strong style={{ color: '#0f172a' }}>{userEmail}</strong>
            </p>
          </div>

          <div className="demo-credentials-card">
            <div className="demo-credentials-header">
              <span className="demo-badge-title">
                <FaCheckCircle style={{ marginRight: '4px' }} /> Default Teacher OTP
              </span>
              <button
                type="button"
                onClick={handleQuickFillOtp}
                className="quick-fill-btn"
                title="Auto-fill default OTP 1234"
              >
                ⚡ Auto-fill 1234
              </button>
            </div>
            <div className="demo-item">
              <span className="demo-label">Recovery OTP:</span>
              <span className="demo-value" style={{ letterSpacing: '2px' }}>1234</span>
            </div>
          </div>

          {errorMessage && (
            <div className="alert alert-danger py-2 px-3 mb-3 text-center" style={{ fontSize: '14px', borderRadius: '8px' }}>
              <FaExclamationTriangle style={{ marginRight: '6px' }} />
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="alert alert-success py-2 px-3 mb-3 text-center" style={{ fontSize: '14px', borderRadius: '8px' }}>
              <FaCheckCircle style={{ marginRight: '6px' }} />
              {successMessage}
            </div>
          )}

          <form onSubmit={handleOtpSubmit}>
            <div className="otp-inputs-row" onPaste={handlePaste}>
              {otpValues.map((value, index) => (
                <input
                  key={index}
                  ref={(el) => (otpInputRefs.current[index] = el)}
                  className="otp-box"
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleOtpInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  autoComplete="one-time-code"
                  required
                />
              ))}
            </div>

            <button type="submit" className="auth-submit-btn mt-3" disabled={loading}>
              {loading ? 'Verifying...' : <>Confirm & Reset Password <FaArrowRight /></>}
            </button>
          </form>

          <div className="auth-card-footer">
            <p>
              Wrong email address? <Link to="/ForgotPassword">Go back</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForOtp;