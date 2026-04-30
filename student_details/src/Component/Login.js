import React, { useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const Navigate = useNavigate();
  const [data, setData] = useState({
    email:"",
    password:"",
  });

  const {
    email,password
  } = data;

  const ChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    await axios.get(`http://localhost:3000/login/${data.email}/${data.password}`)
      
      .then((response) => {
        if (response.status === 200) {
          console.log('User authenticated:', response.data);
          sessionStorage.setItem('email', data.email);
          alert('OTP is sent to your email address');
          Navigate('/Otp');
        } else if (response.status === 300) {
          alert('You are approved');
        } else if (response.status === 404) {
          alert(response.data);
        } else {
          alert('Unexpected error');
        }
      })
      .catch((error) => {
        console.log('Error signing in:', error);
        alert('User not found!');
      });
      
  };

  return (
    <div className="background1">
      <div className='header1'>
            <div className='logo'></div>
            <div className='head pt-3'>
                <h1>ANDHRA POLYTECHNIC</h1>
                <p>Jagannaickpur, kakinada</p>
            </div>
      </div><br/>
      
      <div className="container login">
        <div className="card1"><br/>
          <form onSubmit={submitHandler}>
          <h2 className="text-center">Login</h2><br/>
              <div className="col-lg-12 ps-5 pb-3">
                <label>Email</label>
                <br />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={ChangeHandler}
                  className="labels p-1"
                />
              </div><br/>
              <div className="col-lg-12 ps-5 pb-3">
                <label>Password</label>
                <br />
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={ChangeHandler}
                  className="labels p-1"
                />
              </div>
              <a href="ForgotPassword" className='forpass'>Forgot password?</a><br /><br />
            <center>
              <input type="Submit" className="px-4 py-1"/>
            </center>
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
