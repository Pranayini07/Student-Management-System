import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const BTechForm = () => {
  const Navigate = useNavigate();

  const[data,setData] = useState({
    name: "",
    diplomapin:"",
    yearofjoining:"",
    company:"",
    role:"",
    ctc:"",
  })

  const{name,diplomapin,yearofjoining,company,role,ctc} = data;

  const ChangeHandler = (e) =>{
    setData({...data,[e.target.name]:e.target.value})
  }

  const SubmitHandler = async (e) => {
  e.preventDefault();

    await axios.post('http://localhost:3000/jobform', data,{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  .then((response) => {
    console.log('post request success:', response.data);
    alert("Student data entered Successfully");
    Navigate('/JobDashboard')
  })
  .catch((error) => {
    console.error('post request error:', error);
  });
  }

  return (
    <div className='background'>
        <div className='header'>
            <div className='logo'></div>
            <div className='head pt-3'>
                <h1>ANDHRA POLYTECHNIC</h1>
                <p>Jagannaickpur, kakinada</p>
            </div>
      </div><br/>
        <h2 className='student'>Provision Form for JobHolders</h2><br/>
        <div className='container space data'>
            <div className='card'>
            <form onSubmit={SubmitHandler}><br/>
              <div className="col-lg-12 ps-5 pb-3 pt-3">
                <label>Name</label>
                <br/>
                <input type="text" name="name" value={name} onChange={ChangeHandler} className="labels"/>
              </div>
              <div className="col-lg-12 ps-5 pb-3 pt-3">
                <label>Diploma Pin Number</label>
                <br/>
                <input type="text" name="diplomapin" value={diplomapin} onChange={ChangeHandler} className="labels"/>
              </div>
              <div className="col-lg-12 ps-5 pb-3 pt-3">
                <label>Year of Joining</label>
                <br/>
                <input type="text" name="yearofjoining" value={yearofjoining} onChange={ChangeHandler} className="labels"/>
              </div>
              <div className="col-lg-12 ps-5 pb-3 pt-3">
                <label>Company</label>
                <br/>
                <input type="text" name="company" value={company} onChange={ChangeHandler} className="labels"/>
              </div>
              <div className="col-lg-12 ps-5 pb-3 pt-3">
                <label>Role</label>
                <br/>
                <input type="text" name="role" value={role} onChange={ChangeHandler} className="labels"/>
              </div>
              <div className="col-lg-12 ps-5 pb-3 pt-3">
                <label>CTC(Package)</label>
                <br/>
                <input type="text" name="ctc" value={ctc} onChange={ChangeHandler} className="labels"/>
              </div><br/>

              <center>
                    <input type="Submit" className='submit px-4 py-1' onClick={SubmitHandler}/>
                </center>
                <br/><br/>
            </form>
            </div><br/><br/>
        </div>
    </div>
  )
}

export default BTechForm