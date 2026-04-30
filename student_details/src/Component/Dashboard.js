import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import Excel from './Excel'
import { Link} from 'react-router-dom';


const Dashboard = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showEditButton, setShowEditButton] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedOption1, setSelectedOption1] = useState('');
  const [modelYear, setModelYear] = useState([]);
  const [selectedRowsData, setSelectedRowsData] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [editRowIndex, setEditRowIndex] = useState(null);



  const {
    status,
    name,
    surname,
    fathername,
    mothername,
    dob,
    gender,
    email,
    nationality,
    category,
    phonenumber,
    drno,
    village,
    mandal,
    district,
    pincode,
    doj,
    sschallticketno,
    sscyop,
    sscgpa,
    caste,
    income,
    fourthschool,
    fourthschoolyop,
    fifthschool,
    fifthschoolyop,
    sixthschool,
    sixthschoolyop,
    seventhschool,
    seventhschoolyop,
    eightschool,
    eightschoolyop,
    ninthschool,
    ninthschoolyop,
    tenthschool,
    tenthschoolyop,
    icrno,
    polycetrank,
    polycethallticketno,
    feestatus,
    joiningphase,
    year,
  } = editedData;


  const ChangeHandler = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

      useEffect( ()=>{
        fetchdata();
      } ,[])  

      const fetchdata = async () => {
        try {
          const response1 = await axios.get('http://localhost:3000/dashboard');
          console.log(response1.data);
          setData(response1.data);
          setSelectedRows(new Array(response1.data.length).fill(false));
        } catch (error) {
          console.log("error fetching data");
        }
      };


/////////////////to select checkboxes    
      const handleCheckboxChange = (studentId, index) => {
        const updatedSelectedRows = [...selectedRows];
        updatedSelectedRows[index] = !updatedSelectedRows[index];
        setSelectedRows(updatedSelectedRows);
      
        const selectedStudentIds = data
          .filter((_, i) => updatedSelectedRows[i])
          .map((student) => student.icrno);
      
        setSelectedRowsData(selectedStudentIds.map(String));
      
        const anyCheckboxChecked = updatedSelectedRows.some((value) => value);
        setShowEditButton(anyCheckboxChecked);
      
        const gettingData = [...data];
        setModelYear(gettingData[index]);
      };

 
/////////////////to select all the checkboxes
const handleSelectAllChange = () => {
  const updatedSelectedRows = new Array(filteredData.length).fill(!selectAllChecked);
  setSelectedRows(updatedSelectedRows);

  const selectedStudentIds = filteredData.map((student) => student.icrno);
  setSelectedRowsData(updatedSelectedRows.every((value) => value) ? selectedStudentIds.map(String) : []);
  
  setSelectAllChecked(!selectAllChecked);
  setShowEditButton(!selectAllChecked);
};


//////////////////  To deal with Update Modal
      const handleUpdateButtonClick = () => {
        setShowUpdateModal(true);
      };
    
      const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
      };
    
      const handleModalSubmit = async () => {
        try {
          if (selectedRowsData.length > 0) {
            const data = {
              ids: selectedRowsData.map(Number),
              year: selectedOption1,
            };
    
            console.log('Request Data:', data);
    
            await axios.post('http://localhost:3000/updateYear', data);
    
            const updatedData = await axios.get('http://localhost:3000/dashboard');
            setData(updatedData.data);
    
            setShowUpdateModal(false);
            setSubmissionStatus('success');
          }
        } catch (error) {
          console.log('Error:', error);
          setSubmissionStatus('error');
        }
      };


///////////////to filter status,gender,caste,year    
      const filteredData = data.filter(item => (
        (selectedStatus === 'all' || item.status === selectedStatus) &&
        (selectedGender === 'all' || item.gender === selectedGender) &&
        (selectedCategory === 'all' || item.category === selectedCategory)&&
        (selectedYear === 'all' || item.year === selectedYear)
      ));

      const handleChangeGender = (event) => {
        setSelectedGender(event.target.value);
      };
    
      const handleChangeCaste = (event) => {
        setSelectedCategory(event.target.value);
      };
    
      const handleChangeStatus = (event) => {
        setSelectedStatus(event.target.value);
      };
    
      const handleChangeYear = (event) => {
        setSelectedYear(event.target.value);
      };


/////////////////to delete a row        
      const deleteHandler = async (index) => {
        try {
          const icrnoToDelete = filteredData[index].icrno;
      
          await axios.delete(`http://localhost:3000/deleteRow/${icrnoToDelete}`);
      
          // Update the local state to reflect the deletion
          const updatedData = data.filter((item) => item.icrno !== icrnoToDelete);
          setData(updatedData);
          const updatedSelectedRows = selectedRows.slice();
          updatedSelectedRows.splice(index, 1);
          setSelectedRows(updatedSelectedRows);
          alert('Row deleted successfully');
        } catch (error) {
          console.error('Error deleting row:', error);
        }
      };

                  /*To deal with Edit Modal*/

 ///////////////to edit the data when edit button is clicked
      const editHandler = async (index) => {
        setEditRowIndex(index);
        setEditedData(filteredData[index]);
        setShowEditModal(true);
      };
      
////////////////to save the changes when save changes button is clicked in the edit modal
      const handleEditSubmit = async () => {
        try {
          // Perform the edit/update logic here
          const updatedData = [...data];
          updatedData[editRowIndex] = editedData;
    
          // Perform your axios request or update logic here
          await axios.put(`http://localhost:3000/updateRow/${editedData.icrno}`, editedData);
    
          // Update the local state to reflect the changes
          setData(updatedData);
    
          // Close the modal after successful submission
          setShowEditModal(false);
          setSubmissionStatus('success');
          alert('Data updated successfully');
        } catch (error) {
          console.error('Error editing data:', error);
          setSubmissionStatus('error');
        }
      };
          
  return (
    <>
    <section className='bgclr'><br/>
      <h1 className='text-center'>Admission Dashboard</h1>
    <br/>
    <section>
    <div className='container'>
        <label>Select Status : </label>
        <select value={selectedStatus} onChange={handleChangeStatus} >
          <option value="all">All</option>
          <option value="General">General</option>
          <option value="Transfer">Transfer</option>
        </select>&emsp;

       <label>Select Gender : </label>
       <select value={selectedGender} onChange={handleChangeGender}>
         <option value="all">All</option>
         <option value="Male">Male</option>
         <option value="Female">Female</option>
       </select>&emsp;

       <label>Select Category : </label>
       <select value={selectedCategory} onChange={handleChangeCaste}>
         <option value="all">All</option>
         <option value="OC">OC</option>
         <option value="BC">BC</option>
         <option value="SC">SC</option>
         <option value="ST">ST</option>
       </select>&emsp;

       <label>Select year/sem : </label>
       <select value={selectedYear} onChange={handleChangeYear}>
         <option value="all">All</option>
         <option value="1st year">1st year</option>
         <option value="3rd sem">3rd semister</option>
         <option value="4th sem">4th semister</option>
         <option value="5th sem">5th semister</option>
         <option value="6th sem">6th semister</option>
       </select>
      </div>
    
      <div className='container'>
        <button className={`btn btn-primary mb-3 ${!showEditButton ? 'disabled' : ''}`} onClick={handleUpdateButtonClick} disabled={!showEditButton}>
          UPDATE
        </button>
      
        {submissionStatus === 'success' && (
        <div className="alert alert-success" role="alert">
          Update successful!
        </div>
        )}
        {submissionStatus === 'error' && (
          <div className="alert alert-danger" role="alert">
          Update failed. Please try again.
          </div>
        )}
      </div>
    </section>
    <div className="dashboard container table-responsive-lg">
      <table class="table table-bordered table-hover">
      <thead class='table-dark'>
        <tr>
        <th scope="col">
              <input
              type='checkbox'
              checked={selectAllChecked}
              onChange={handleSelectAllChange}
              />
              
              Select</th>
          <th scope='col'>S.No</th>
          <th scope='col'>Status</th>
          <th scope="col">Name</th>
          <th scope="col">surname</th>
          <th scope="col">FatherName</th>
          <th scope="col">MotherName</th>
          <th scope="col">DOB</th>
          <th scope="col">Gender</th>
          <th scope="col">Email</th>
          <th scope="col">Nationality</th>
          <th scope="col">Category</th>
          <th scope="col">PhoneNumber</th>
          <th scope="col">DrNo.</th>
          <th scope="col">Village</th>
          <th scope="col">Mandal</th>
          <th scope="col">District</th>
          <th scope="col">Pincode</th>
          <th scope="col">SSCHtno.</th>
          <th scope="col">SSCYearOfPassing</th>
          <th scope="col">TransferCertificate</th>
          <th scope="col">SSCGPA</th>
          <th scope="col">4thClassName</th>
          <th scope="col">4thClassYearOfPassing</th>
          <th scope="col">5thClassName</th>
          <th scope="col">5thClassYearOfPassing</th>
          <th scope="col">6thClassName</th>
          <th scope="col">6thClassYearOfPassing</th>
          <th scope="col">7thClassName</th>
          <th scope="col">7thClassYearOfPassing</th>
          <th scope="col">8thClassName</th>
          <th scope="col">8thClassYearOfPassing</th>
          <th scope="col">9thClassName</th>
          <th scope="col">9thClassYearOfPassing</th>
          <th scope="col">10thClassName</th>
          <th scope="col">10thClassYearOfPassing</th>
          <th scope='col'>AllotmentOrder</th>
          <th scope="col">PolycetRankCard</th>
          <th scope="col">JoiningReport</th>
          <th scope="col">StudentPhoto</th>
          <th scope="col">IncomeCertificateNumber</th>
          <th scope="col">CasteCertificateNumber</th>
          <th scope="col">ICRNo.</th>
          <th scope="col">DateOfJoining</th>
          <th scope="col">PolycetRank</th>
          <th scope="col">PolycetHtno.</th>
          <th scope="col">FeeStatus</th>
          <th scope="col">JoiningPhase</th>
          <th scope="col">IndemnityBond</th>
          <th scope="col">JoiningYear</th>
          <th scope='col'>Actions</th>
        </tr>
      </thead>
      <tbody class="table-secondary">
        {
        filteredData.map((data2,index)=>(
          <tr key={index}>
          <td>
                <input
                  type="checkbox"
                  checked={selectedRows[index] || false}
                  onChange={() => handleCheckboxChange(data2.icrno, index)}
                  data-student-id={data2.id}
                />
              </td>
          <td>{index+1}</td>
          <td>{data2.status}</td>
          <td>{data2.name}</td>
          <td>{data2.surname}</td>
          <td>{data2.fathername}</td>
          <td>{data2.mothername}</td>
          <td>{data2.dob}</td>
          <td>{data2.gender}</td>
          <td>{data2.email}</td>
          <td>{data2.nationality}</td>
          <td>{data2.category}</td>
          <td>{data2.phonenumber}</td>
          <td>{data2.drno}</td>
          <td>{data2.village}</td>
          <td>{data2.mandal}</td>
          <td>{data2.district}</td>
          <td>{data2.pincode}</td>
          <td>{data2.sschallticketno}</td>
          <td>{data2.sscyop}</td>
          <td>{data2.ssctc}</td>
          <td>{data2.sscgpa}</td>
          <td>{data2.fourthschool}</td>
          <td>{data2.fourthschoolyop}</td>
          <td>{data2.fifthschool}</td>
          <td>{data2.fifthschoolyop}</td>
          <td>{data2.sixthschool}</td>
          <td>{data2.sixthschoolyop}</td>
          <td>{data2.seventhschool}</td>
          <td>{data2.seventhschoolyop}</td>
          <td>{data2.eightschool}</td>
          <td>{data2.eightschoolyop}</td>
          <td>{data2.ninthschool}</td>
          <td>{data2.ninthschoolyop}</td>
          <td>{data2.tenthschool}</td>
          <td>{data2.tenthschoolyop}</td>
          <td>{data2.allotment}</td>
          <td>{data2.rankcard}</td>
          <td>{data2.confirm}</td>
          <td>{data2.photo}</td>
          <td>{data2.income}</td>
          <td>{data2.caste}</td>
          <td>{data2.icrno}</td>
          <td>{data2.doj}</td>
          <td>{data2.polycetrank}</td>
          <td>{data2.polycethallticketno}</td>
          <td>{data2.feestatus}</td>
          <td>{data2.joiningphase}</td>
          <td>{data2.indemnitybond}</td>
          <td>{data2.year}</td>
          <td>
              <div className="d-flex">
                <button onClick={() => editHandler(index)}>EDIT</button>&emsp;
                <button onClick={() => deleteHandler(index)}>DELETE</button>
              </div>
          </td>
          </tr>
          )
          )
        }
        </tbody> 
      </table>



      




      {/* Update Modal */}
      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
        <label htmlFor="dropdown1">
        {Array.isArray(modelYear) ? (
    modelYear.map((value, index) => (
      <p key={index}>Present Year: {value.year}</p>
    ))
  ) : (
    <p>Present Year: {modelYear.year}</p>
  )}
          </label>  
        </div>
        <div>
            <label htmlFor="dropdown1">Update Sem to: </label>
            <select id="dropdown1" value={selectedOption1} onChange={(e) => setSelectedOption1(e.target.value)}>
              <option value="1st year">1st year</option>
              <option value="3rd sem">3rd sem</option>
              <option value="4th sem">4th sem</option>
              <option value="5th sem">5th sem</option>
              <option value="6th sem">6th sem</option>
            </select>
        </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

       {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <input type='radio' name='status' value='General' checked={status === 'General'} onChange={ChangeHandler} required/>
           <label className='radiobutton' htmlFor='General'>General</label>&nbsp;&nbsp;
           <input type='radio' name='status' value='Transfer' checked={status === 'Transfer'} onChange={ChangeHandler} required/>
           <label className='radiobutton' htmlFor='Transfer'>Transfer</label><br />
                <label>Name</label>
                <br />
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
              
                <label>Surname</label>
                <br />
                <input
                  type="text"
                  name="surname"
                  value={surname}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
            
                <label>Father Name</label>
                <br />
                <input
                  type="text"
                  name="fathername"
                  value={fathername}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
              
                <label>Mother Name</label>
                <br />
                <input
                  type="text"
                  name="mothername"
                  value={mothername}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
              
                <label>Date of birth</label>
                <br />
                <input
                  type="date"
                  name="dob"
                  value={dob}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
              
                <label>Gender</label>
                <br />
                <select
                  name="gender"
                  value={gender}
                  onChange={ChangeHandler}
                  className="drop"
                  required
                >
                  <option></option>
                  <option>Male</option>
                  <option>Female</option>
                </select><br/>
           
                <label>Email</label>
                <br />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
            
                <label>Nationality</label>
                <br />
                <input
                  type="text"
                  name="nationality"
                  value={nationality}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
              
          
                <label>Phone number</label>
                <br />
                <input
                  type="number"
                  name="phonenumber"
                  value={phonenumber}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
          
                  <label>Category:</label>&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type="radio"
                    name="category"
                    value="OC"
                    checked={category === "OC"}
                    onChange={ChangeHandler}
                  />
                  <label htmlFor="OC">OC</label>&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type="radio"
                    name="category"
                    value="BC"
                    checked={category === "BC"}
                    onChange={ChangeHandler}
                  />
                  <label htmlFor="BC">BC</label>&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type="radio"
                    name="category"
                    value="SC"
                    checked={category === "SC"}
                    onChange={ChangeHandler}
                  />
                  <label htmlFor="SC">SC</label>&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type="radio"
                    name="category"
                    value="ST"
                    checked={category === "ST"}
                    onChange={ChangeHandler}
                  />
                  <label htmlFor="ST">ST</label>&nbsp;&nbsp;&nbsp;&nbsp;
                <br />
              
      
                <label>D.No</label>
                <br />
                <input
                  type="text"
                  name="drno"
                  value={drno}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
            
                <label>Village</label>
                <br />
                <input
                  type="text"
                  name="village"
                  value={village}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />

                <label>Mandal</label>
                <br />
                <input
                  type="text"
                  name="mandal"
                  value={mandal}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
              
                <label>District</label>
                <br />
                <input
                  type="text"
                  name="district"
                  value={district}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
             
                <label>Pincode</label>
                <br />
                <input
                  type="number"
                  name="pincode"
                  value={pincode}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
            
            <br />
                <label>Hall-Ticket Number</label>
                <br />
                <input
                  type="number"
                  name="sschallticketno"
                  value={sschallticketno}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
              
                <label>Year of Passing</label>
                <br />
                <input
                  type="text"
                  name="sscyop"
                  value={sscyop}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                /><br/>

                <label>GPA</label>
                <br />
                <input
                  type="text"
                  name="sscgpa"
                  value={sscgpa}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
            <br />
            
                    <label>School Name:</label>
                    <input type='text' name='fourthschool' value={fourthschool} onChange={ChangeHandler} className="labels" required/>
               
                    <label>Year of Passing:</label>
                    <input type='text' name='fourthschoolyop' value={fourthschoolyop} onChange={ChangeHandler} className="labels" required/>
              
                    <label>School Name:</label>
                    <input type='text' name='fifthschool' value={fifthschool} onChange={ChangeHandler} className="labels" required/>

                    <label>Year of Passing:</label>
                    <input type='text' name='fifthschoolyop' value={fifthschoolyop} onChange={ChangeHandler} className="labels" required/>
              
                    <label>School Name:</label>
                    <input type='text' name='sixthschool' value={sixthschool} onChange={ChangeHandler} className="labels" required/>
                
                    <label>Year of Passing:</label>
                    <input type='text' name='sixthschoolyop' value={sixthschoolyop} onChange={ChangeHandler} className="labels" required/>
            
                    <label>School Name:</label>
                    <input type='text' name='seventhschool' value={seventhschool} onChange={ChangeHandler} className="labels" required/>

                    <label>Year of Passing:</label>
                    <input type='text' name='seventhschoolyop' value={seventhschoolyop} onChange={ChangeHandler} className="labels" required/>
                  
                    <label>School Name:</label>
                    <input type='text' name='eightschool' value={eightschool} onChange={ChangeHandler} className="labels" required/>
                
                    <label>Year of Passing:</label>
                    <input type='text' name='eightschoolyop' value={eightschoolyop} onChange={ChangeHandler} className="labels" required/>
              
                    <label>School Name:</label>
                    <input type='text' name='ninthschool' value={ninthschool} onChange={ChangeHandler} className="labels" required/>
 
                    <label>Year of Passing:</label>
                    <input type='text' name='ninthschoolyop' value={ninthschoolyop} onChange={ChangeHandler} className="labels" required/>
                
                    <label>School Name:</label>
                    <input type='text' name='tenthschool' value={tenthschool} onChange={ChangeHandler} className="labels" required/>
                
                    <label>Year of Passing:</label>
                    <input type='text' name='tenthschoolyop' value={tenthschoolyop} onChange={ChangeHandler} className="labels" required/>
              
          

                <label>Income Certificate Number</label>
                <br />
                <input
                  type="text"
                  name="income"
                  value={income}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
            
                <label>Caste Certificate Number</label>
                <br />
                <input
                  type="text"
                  name="caste"
                  value={caste}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
            
                <label>ICR Form Number</label>
                <br />
                <input
                  type="text"
                  name="icrno"
                  value={icrno}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
           
                <label>Date of Joining</label>
                <br />
                <input
                  type="date"
                  name="doj"
                  value={doj}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
              
                <label>Polycet Rank</label>
                <br />
                <input
                  type="number"
                  name="polycetrank"
                  value={polycetrank}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
             
                <label>Polycet Hall-Ticket Number</label>
                <br />
                <input
                  type="text"
                  name="polycethallticketno"
                  value={polycethallticketno}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
              
                <label>Fee Status</label>
                <br />
                <select
                  name="feestatus"
                  value={feestatus}
                  onChange={ChangeHandler}
                  className="drop"
                  required
                >
                  <option></option>
                  <option>Paid</option>
                  <option>Not Paid</option>
                </select>
            
              <label>Joining Phase:</label><br/>
              <input
                type="radio"
                name="joiningphase"
                value="Phase 1"
                checked={joiningphase === "Phase 1"}
                onChange={ChangeHandler}
              />
              <label htmlFor="Phase 1">Phase 1</label>&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="radio"
                name="joiningphase"
                value="Phase 2"
                checked={joiningphase === "Phase 2"}
                onChange={ChangeHandler}
              />
              <label htmlFor="Phase 2 ">Phase 2</label>&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="radio"
                name="joiningphase"
                value="Phase 3"
                checked={joiningphase === "Phase 3"}
                onChange={ChangeHandler}
              />
              <label htmlFor="Phase 3">Phase 3</label>&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="radio"
                name="joiningphase"
                value="Spot"
                checked={joiningphase === "Spot"}
                onChange={ChangeHandler}
              />
              <label htmlFor="Spot">Spot</label>&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="radio"
                name="joiningphase"
                value="Sliding"
                checked={joiningphase === "Sliding"}
                onChange={ChangeHandler}
              />
              <label htmlFor="Spot">Sliding</label>
            <br />
      
                <label>Year/Sem to Join</label>
                <br />
                <select
                  name="year"
                  value={year}
                  onChange={ChangeHandler}
                  className="drop"
                  required
                >
                  <option></option>
                  <option>1st year</option>
                  <option>3rd sem</option>
                  <option>4th sem</option>
                  <option>5th sem</option>
                  <option>6th sem</option>
                </select>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Submit Edit
          </Button>
        </Modal.Footer>
      </Modal>
           
   </div>
   <section className='container'>
<div className='d-flex justify-content-between '>
<div className=''>
<Excel selectedRowsData={selectedRowsData}/>
</div>
<div className='mt-4 '>
  <Link to='/Admission'><button className='new text-light'>Add new student</button></Link>
</div>
</div>
</section>
   </section>

</>
  )
}

export default Dashboard