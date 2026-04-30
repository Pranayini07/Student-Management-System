import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { Modal , Button, Form } from 'react-bootstrap';
import JobExcel from './JobExcel';
import { Link} from 'react-router-dom';


const JobDashboard = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRowsData, setSelectedRowsData] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [editRowIndex, setEditRowIndex] = useState(null);

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const response1 = await axios.get('http://localhost:3000/jobdashboard');
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
      .map((student) => student.diplomapin);
  
    setSelectedRowsData(selectedStudentIds.map(String));

  };

  /////////////////to select all the checkboxes
  const handleSelectAllChange = () => {
    // Toggle the state of the "Select All" checkbox
    setSelectAllChecked(!selectAllChecked);
  
    // Update the state of individual checkboxes based on the "Select All" state
    const updatedSelectedRows = new Array(data.length).fill(!selectAllChecked);
    setSelectedRows(updatedSelectedRows);
  
    // Update the selected rows data accordingly
    const selectedStudentIds = data
      .filter((_, i) => updatedSelectedRows[i])
      .map((student) => student.diplomapin);
  
    setSelectedRowsData(selectedStudentIds.map(String));
  };



/////////////////to delete a row        
const deleteHandler = async (index) => {
  try {
    const diplomapinToDelete = data[index].diplomapin;

    await axios.delete(`http://localhost:3000/jobformdeleteRow/${diplomapinToDelete}`);

    // Update the local state to reflect the deletion
    const updatedData = data.filter((item) => item.diplomapin !== diplomapinToDelete);
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
  setEditedData(data[index]);
  setShowEditModal(true);
};

////////////////to save the changes when save changes button is clicked in the edit modal
const handleEditSubmit = async () => {
  try {
    // Perform the edit/update logic here
    const updatedData = [...data];
    updatedData[editRowIndex] = editedData;

    // Perform your axios request or update logic here
    await axios.put(`http://localhost:3000/jobformupdateRow/${editedData.diplomapin}`, editedData);

    // Update the local state to reflect the changes
    setData(updatedData);

    // Close the modal after successful submission
    setShowEditModal(false);
    alert('Data updated successfully');
  } catch (error) {
    console.error('Error editing data:', error);
  }
};


  return ( 
    <section className='bgclr'><br/>
    <h1 className='text-center'>JobHolders Dashboard</h1>
    <div className="dashboard container space m-5 table-responsive-lg">
      <table className="table table-bordered table-hover">
        <thead class='table-dark'>
          <tr>
          <th scope="col">
              <input
              type="checkbox"
              checked={selectAllChecked}
              onChange={handleSelectAllChange}
            />
              
              Select</th>
            <th scope='col'>S.No</th>
            <th scope='col'>Name</th>
            <th scope="col">Diploma pin</th>
            <th scope="col">Joining Year</th>
            <th scope="col">Company Name</th>
            <th scope="col">Role</th>
            <th scope="col">CTC (Package)</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody class="table-secondary">
          {data.map((data2, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows[index] || false}
                  onChange={() => handleCheckboxChange(data2.diplomadiplomapin, index)}
                  data-student-id = {data2.id}
                />
              </td>
              <td>{index+1}</td>
              <td>{data2.name}</td>
              <td>{data2.diplomapin}</td>
              <td>{data2.yearofjoining}</td>
              <td>{data2.company}</td>
              <td>{data2.role}</td>
              <td>{data2.ctc}</td>
              <td>
              <div className="d-flex">
                <button onClick={() => editHandler(index)}>EDIT</button>&emsp;
                <button onClick={() => deleteHandler(index)}>DELETE</button>
              </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='d-flex justify-content-between'>
        <div>
        <JobExcel selectedRowsData={selectedRowsData}/>
        </div>
        <div className='mt-4'>
          <Link to='/JobForm'><button className='new text-light'>Add new student</button></Link>
        </div>
      </div>
        
        {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Object.keys(editedData).map((key) => (
            <Form.Group key={key} controlId={`form${key}`}>
              <Form.Label>{key}</Form.Label>
              <Form.Control
                type="text"
                value={editedData[key]}
                onChange={(e) => setEditedData({ ...editedData, [key]: e.target.value })}
              />
            </Form.Group>
          ))}
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
    </section>
  );
};

export default JobDashboard;