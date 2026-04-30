import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import SemDataExcel from './SemDataExcel';
import { Link} from 'react-router-dom';


const SemDataDashboard = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRowsData, setSelectedRowsData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [editRowIndex, setEditRowIndex] = useState(null);


  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const response1 = await axios.get('http://localhost:3000/semdatadashboard');
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
    .map((student) => student.pin);

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
    .map((student) => student.pin);

  setSelectedRowsData(selectedStudentIds.map(String));
};



///////////////////to filter sem
const handleChangeSem = (event) => {
  setSelectedYear(event.target.value);
};

const filteredData = selectedYear === 'all' ? data : data.filter(item => item.sem === selectedYear);


/////////////////to delete a row  
const deleteHandler = async (index) => {
  try {
    const pinToDelete = filteredData[index].pin;

    await axios.delete(`http://localhost:3000/semdatadeleteRow/${pinToDelete}`);

    // Update the local state to reflect the deletion
    const updatedData = data.filter((item) => item.pin !== pinToDelete);
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
      await axios.put(`http://localhost:3000/semdataupdateRow/${editedData.pin}`, editedData);

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
      <h1 className='text-center'>Sem Data Dashboard</h1>
    <div className="dashboard container space table-responsive-lg">
      <br/>
      <div>
        <label>Select Status</label>
        <select value={selectedYear} onChange={handleChangeSem}>
        <option value="all">All</option>
          <option value="firstyear">1st Year</option>
          <option value="thirdsem">3rd sem</option>
          <option value="fourthsem">4th sem</option>
          <option value="fifthsem">5th sem</option>
          <option value="sixthsem">6th sem</option>
        </select>&emsp;
      </div><br/>
      
      <table className="table table-bordered table-hover">
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
            <th scope='col'>Semister</th>
            <th scope="col">Joining year</th>
            <th scope="col">Name</th>
            <th scope="col">Pin Number</th>
            <th scope="col">Result</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody class="table-secondary">
          {filteredData.map((data2, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows[index] || false}
                  onChange={() => handleCheckboxChange(data2.pin, index)}
                  data-student-id = {data2.id}
                />
              </td>
              <td>{index+1}</td>
          <td>{data2.sem}</td>
          <td>{data2.joiningyear}</td>
          <td>{data2.name}</td>
          <td>{data2.pin}</td>
          <td>{data2.result}</td>
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
        <SemDataExcel selectedRowsData={selectedRowsData}/>
        </div>
        <div className='mt-4'>
          <Link to='/SemData'><button className='new text-light'>Add new student</button></Link>
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

export default SemDataDashboard;