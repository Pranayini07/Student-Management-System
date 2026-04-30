import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Otp = () => {
  const Navigate = useNavigate();
  const otpLength = 4;
  const [otpValues, setOtpValues] = useState(Array(otpLength).fill(''));
  const otpInputRefs = useRef(Array(otpLength).fill(null));

  const handleOtpInputChange = (e, index) => {
    const { value } = e.target;
    if (!isNaN(value) && value.length <= 1) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      if (value.length === 1 && index < otpLength - 1) {
        otpInputRefs.current[index + 1].focus();
      }
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const enteredOTP = otpValues.join('');

    try {
      const userEmail = sessionStorage.getItem('email');
      const response = await axios.post('http://localhost:3000/verifyotp', {
        email: userEmail,
        otp: enteredOTP,
      },{ headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }},);

      if (response.status === 200) {
        alert("Login successful")
        Navigate('/AdminHome');
      } else {
        alert('Invalid OTP');
        console.error('OTP verification failed');
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
    }
  };

  return (
    <div className='background1'>
        <div className='header1'>
            <div className='logo'></div>
            <div className='head pt-3'>
                <h1>ANDHRA POLYTECHNIC</h1>
                <p>Jagannaickpur, kakinada</p>
            </div>
      </div><br/>

      <div className="container login">
        <div className='card1'>
        <center>
          <h2>OTP</h2><br/>
          Please enter the verification code sent to your email address
        </center><br/><br/>
        <form onSubmit={handleOtpSubmit}>
          <div className='num'>
            {otpValues.map((value, index) => (
              <input
                className='number'
                type='text'
                maxLength="1"
                key={index}
                value={value}
                onChange={(e) => handleOtpInputChange(e, index)}
                ref={(el) => (otpInputRefs.current[index] = el)}
              />
            ))}
          </div><br/><br/>
          <center>
              <input type="Submit" className="px-4 py-1"/>
            </center>
            <br /><br/>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Otp;