import React, { useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewPassword = () => {
  const Navigate = useNavigate();

  const [data, setData] = useState({
    newpassword:"",
    confirmpassword:"",
  });

  const {
    newpassword,confirmpassword
  } = data;

  const ChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (newpassword.length < 6) {
      alert("At least min 6 characters");
    }
    if (newpassword !== confirmpassword) {
      alert("Password doesn't match");
    }else{
     try {
      const userEmail = sessionStorage.getItem('email');
      const response = await axios.put(`http://localhost:3000/updatepassword/${userEmail}`, data,);
      
      if (response.data.message === 'Password updated successfully') {
        alert('updated successfully');
        Navigate('/Login');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  
  }
   
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
          <h2 className="text-center">Resetting Password</h2><br/>
              <div className="col-lg-12 ps-5 pb-3">
                <label>New Password</label>
                <br />
                <input
                  type="password"
                  name="newpassword"
                  value={newpassword}
                  onChange={ChangeHandler}
                  className="labels p-1"
                />
              </div><br/>
              <div className="col-lg-12 ps-5 pb-3">
                <label>Confirm Password</label>
                <br />
                <input
                  type="password"
                  name="confirmpassword"
                  value={confirmpassword}
                  onChange={ChangeHandler}
                  className="labels p-1"
                />
              </div><br/>
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

export default NewPassword;
