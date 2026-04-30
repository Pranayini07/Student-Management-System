import React, { useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Admission = () => {
  const Navigate = useNavigate();

  const [data, setData] = useState({
    sem:"",
    joiningyear:"",
    pin:"",
    name:"",
    result:"",
  });

  const {
    sem,joiningyear,pin,name,result
  } = data;

  const ChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = async(e) =>{
    e.preventDefault();
    try{
        let response;
  
        response = await axios.post('http://localhost:3000/semdata', data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          });
  
  
        if (response.data && response.data.message === 'User with this pin number already exists') {
          alert('User already exists.');
        } else {
          alert("Successfully Registered");
          Navigate('/SemDataDashboard')
        }
    } catch (error) {
        console.error('Post request error:', error);
      }
  }

  return (
    <div className="background">
      <div className='header'>
            <div className='logo'></div>
            <div className='head pt-3'>
                <h1>ANDHRA POLYTECHNIC</h1>
                <p>Jagannaickpur, kakinada</p>
            </div>
      </div><br/>
      <h2 className="student">Student Details</h2><br/>
      <div className="container space data">
        <div className="card">
          <form onSubmit={submitHandler}><br/>
          <div className='ps-5 pt-3 col-lg-12'>
           <input type='radio' name='sem' value='firstyear' checked={sem === 'firstyear'} onChange={ChangeHandler}/>
           <label className='radiobutton' htmlFor='firstyear'>1st Year</label>&emsp;
           <input type='radio' name='sem' value='thirdsem' checked={sem === 'thirdsem'} onChange={ChangeHandler}/>
           <label className='radiobutton' htmlFor='thirdsem'>3rd Sem</label>&emsp;
           <input type='radio' name='sem' value='fourthsem' checked={sem === 'fourthsem'} onChange={ChangeHandler}/>
           <label className='radiobutton' htmlFor='fourthsem'>4th Sem</label>&emsp;
           <input type='radio' name='sem' value='fifthsem' checked={sem === 'fifthsem'} onChange={ChangeHandler}/>
           <label className='radiobutton' htmlFor='fifthsem'>5th Sem</label>&emsp;
           <input type='radio' name='sem' value='sixthsem' checked={sem === 'sixthsem'} onChange={ChangeHandler}/>
           <label className='radiobutton' htmlFor='sixthsem'>6th Sem</label>
          </div>{' '}<br/>

              <div className="col-lg-12 ps-5 pb-3 pt-3">
                <label>Year of Join</label>
                <br />
                <input
                  type="text"
                  name="joiningyear"
                  value={joiningyear}
                  onChange={ChangeHandler}
                  className="labels"
                />
              </div>
              <div className="col-lg-12 ps-5 pb-3">
                <label>Name</label>
                <br />
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={ChangeHandler}
                  className="labels"
                />
              </div>
              <div className="col-lg-12 ps-5 pb-3">
                <label>Pin Number</label>
                <br />
                <input
                  type="text"
                  name="pin"
                  value={pin}
                  onChange={ChangeHandler}
                  className="labels"
                />
              </div>
              <div className="col-lg-12 ps-5 pb-3">
                <label>Result(%)</label>
                <br />
                <input
                  type="text"
                  name="result"
                  value={result}
                  onChange={ChangeHandler}
                  className="labels"
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

export default Admission;
