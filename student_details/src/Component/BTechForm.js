import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const BTechForm = () => {
  const Navigate = useNavigate();

  const[data,setData] = useState({
    name: "",
    diplomapin:"",
    ecetrank:"",
    joiningyear:"",
    btechclg:"",
    course:"",
  })

  const{name,diplomapin,ecetrank,joiningyear,btechclg,course} = data;

  const ChangeHandler = (e) =>{
    setData({...data,[e.target.name]:e.target.value})
  }

  const SubmitHandler = async (e) => {
  e.preventDefault();

    await axios.post('http://localhost:3000/btechform', data,{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  .then((response) => {
    console.log('post request success:', response.data);
    alert("Student data entered successfully");
    Navigate('/BTechDashboard')
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
        <h2 className='student'>Provision Form For BTech Students</h2><br/>
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
                <label>ECET Rank</label>
                <br/>
                <input type="text" name="ecetrank" value={ecetrank} onChange={ChangeHandler} className="labels"/>
              </div>
              <div className="col-lg-12 ps-5 pb-3 pt-3">
                <label>Year Of Joining</label>
                <br/>
                <input type="text" name="joiningyear" value={joiningyear} onChange={ChangeHandler} className="labels"/>
              </div>
              <div className="col-lg-12 ps-5 pb-3 pt-3">
                <label>BTech College</label>
                <br/>
                <input type="text" name="btechclg" value={btechclg} onChange={ChangeHandler} className="labels"/>
              </div>
              <div className="col-lg-12 ps-5 pb-3 pt-3">
                <label>Course</label>
                <br/>
                <input type="text" name="course" value={course} onChange={ChangeHandler} className="labels"/>
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