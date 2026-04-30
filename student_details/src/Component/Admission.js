import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Admission = () => {
  const Navigate = useNavigate();

  const [data, setData] = useState({
    status: "",
    name: "",
    surname: "",
    fathername: "",
    mothername: "",
    dob: "",
    gender: "",
    email: "",
    nationality: "",
    category: "",
    phonenumber: "",
    drno: "",
    village: "",
    mandal: "",
    district: "",
    pincode: "",
    doj: "",
    sschallticketno: "",
    sscyop: "",
    sscgpa: "",
    rankcard: "",
    caste: "",
    ssctc: "",
    income: "",
    allotment: "",
    confirm: "",
    fourthschool: "",
    fourthschoolyop: "",
    fifthschool: "",
    fifthschoolyop: "",
    sixthschool: "",
    sixthschoolyop: "",
    seventhschool: "",
    seventhschoolyop: "",
    eightschool: "",
    eightschoolyop: "",
    ninthschool: "",
    ninthschoolyop: "",
    tenthschool: "",
    tenthschoolyop: "",
    photo: "",
    icrno: "",
    polycetrank: "",
    polycethallticketno: "",
    feestatus: "",
    joiningphase: "",
    indemnitybond: "",
    year: "",
  });

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
    rankcard,
    caste,
    ssctc,
    income,
    allotment,
    confirm,
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
    photo,
    icrno,
    polycetrank,
    polycethallticketno,
    feestatus,
    joiningphase,
    indemnitybond,
    year,
  } = data;

  const ChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (phonenumber.length > 10) {
        alert("Invalid Phone number");
      } else if (phonenumber.length < 10) {
        alert("Invalid Phone number");
      } else {
        let response;

        if (status === "General") {
          response = await axios.post("http://localhost:3000/details", data, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          });
        } else if (status === "Transfer") {
          response = await axios.post("http://localhost:3000/details", data, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          });
        }

        if (
          response.data &&
          response.data.message === "User with this icr number already exists"
        ) {
          alert("User already exists. Please use a different ICR number.");
        } else {
          alert("Successfully Registered");
          Navigate("/Dashboard");
        }
      }
    } catch (error) {
      alert("Post request error");
    }
  };

  return (
    <div className="background">
      <div className="header">
        <div className="logo"></div>
        <div className="head pt-3">
          <h1>ANDHRA POLYTECHNIC</h1>
          <p>Jagannaickpur, kakinada</p>
        </div>
      </div>
      <br />
      <h2 className="admission">Admission Form</h2>
      <br />
      <div className="container space">
        <div className="card">
          <form onSubmit={submitHandler}>
            <div className="ps-5 pt-3 col-lg-6">
              <input
                type="radio"
                name="status"
                value="General"
                checked={status === "General"}
                onChange={ChangeHandler}
                required
              />
              <label className="radiobutton" htmlFor="General">
                General
              </label>
              &nbsp;&nbsp;
              <input
                type="radio"
                name="status"
                value="Transfer"
                checked={status === "Transfer"}
                onChange={ChangeHandler}
                required
              />
              <label className="radiobutton" htmlFor="Transfer">
                Transfer
              </label>
              <br />
            </div>{" "}
            <br />
            <div className="row">
              <div className="col-lg-6 ps-5 pb-3 pt-3">
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
              </div>
              <div className="col-lg-6 ps-5 pb-3 pt-3">
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
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 ps-5 pb-3">
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
              </div>
              <div className="col-lg-6 ps-5 pb-3">
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
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 ps-5 pb-3">
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
              </div>
              <div className="col-lg-6 ps-5 pb-3">
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
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 ps-5 pb-3">
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
              </div>
              <div className="col-lg-6 ps-5 pb-3">
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
              </div>
            </div>
            <div className="row pb-2">
              <div className="col-lg-6 ps-5 pb-3 adm">
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
              </div>
              <div className="col-lg-6 ps-3 pt-3">
                <div className="address">
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
                </div>
                <br />
              </div>
            </div>
            <h3 className="address pb-2">
              <u>Address:</u>
            </h3>
            <br />
            <div className="row">
              <div className="col-lg-6 ps-5 pb-3">
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
              </div>
              <div className="col-lg-6 ps-5 pb-3">
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
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 ps-5 pb-3">
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
              </div>
              <div className="col-lg-6 ps-5 pb-3">
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
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 ps-5 pb-3 adm">
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
              </div>
            </div>
            <br />
            <h3 className="address pb-2">
              <u>SSC:</u>
            </h3>
            <br />
            <div className="row">
              <div className="col-lg-6 ps-5 pb-3 adm">
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
              </div>
              <div className="col-lg-6 ps-5 pb-3">
                <label>Year of Passing</label>
                <br />
                <input
                  type="text"
                  name="sscyop"
                  value={sscyop}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 ps-5 pb-3">
                <label>Transfer Certificate</label>
                <br />
                <input
                  type="file"
                  name="ssctc"
                  value={ssctc}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
              </div>
              <div className="col-lg-6 ps-5 pb-3">
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
              </div>
            </div>
            <br />
            <div className="row">
              <h3 className="ps-5 pb-3">
                <u>Study Certificate:</u>
              </h3>
              <br />
              <h6 className="ps-5 pb-2">
                <u>4th Class:</u>
              </h6>
              <div className="col-lg-6 ps-5 pb-3">
                <label>School Name:</label>
                <input
                  type="text"
                  name="fourthschool"
                  value={fourthschool}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
              </div>
              <div className="col-lg-6 ps-5 pb-3">
                <label>Year of Passing:</label>
                <input
                  type="text"
                  name="fourthschoolyop"
                  value={fourthschoolyop}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
              </div>
              <h6 className="ps-5 pb-2">
                <u>5th Class:</u>
              </h6>
              <div className="col-lg-6 ps-5 pb-3">
                <label>School Name:</label>
                <input
                  type="text"
                  name="fifthschool"
                  value={fifthschool}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
              </div>
              <div className="col-lg-6 ps-5 pb-3">
                <label>Year of Passing:</label>
                <input
                  type="text"
                  name="fifthschoolyop"
                  value={fifthschoolyop}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
              </div>
              <h6 className="ps-5 pb-2">
                <u>6th Class:</u>
              </h6>
              <div className="col-lg-6 ps-5 pb-3">
                <label>School Name:</label>
                <input
                  type="text"
                  name="sixthschool"
                  value={sixthschool}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
              </div>
              <div className="col-lg-6 ps-5 pb-3">
                <label>Year of Passing:</label>
                <input
                  type="text"
                  name="sixthschoolyop"
                  value={sixthschoolyop}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
              </div>
              <h6 className="ps-5 pb-2">
                <u>7th Class:</u>
              </h6>
              <div className="col-lg-6 ps-5 pb-3">
                <label>School Name:</label>
                <input
                  type="text"
                  name="seventhschool"
                  value={seventhschool}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
              </div>
              <div className="col-lg-6 ps-5 pb-3">
                <label>Year of Passing:</label>
                <input
                  type="text"
                  name="seventhschoolyop"
                  value={seventhschoolyop}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
              </div>
              <h6 className="ps-5 pb-2">
                <u>8th Class:</u>
              </h6>
              <div className="col-lg-6 ps-5 pb-3">
                <label>School Name:</label>
                <input
                  type="text"
                  name="eightschool"
                  value={eightschool}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
              </div>
              <div className="col-lg-6 ps-5 pb-3">
                <label>Year of Passing:</label>
                <input
                  type="text"
                  name="eightschoolyop"
                  value={eightschoolyop}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
              </div>
              <h6 className="ps-5 pb-2">
                <u>9th Class:</u>
              </h6>
              <div className="col-lg-6 ps-5 pb-3">
                <label>School Name:</label>
                <input
                  type="text"
                  name="ninthschool"
                  value={ninthschool}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
              </div>
              <div className="col-lg-6 ps-5 pb-3">
                <label>Year of Passing:</label>
                <input
                  type="text"
                  name="ninthschoolyop"
                  value={ninthschoolyop}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
              </div>
              <h6 className="ps-5 pb-2">
                <u>10th Class:</u>
              </h6>
              <div className="col-lg-6 ps-5 pb-3">
                <label>School Name:</label>
                <input
                  type="text"
                  name="tenthschool"
                  value={tenthschool}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
              </div>
              <div className="col-lg-6 ps-5 pb-3">
                <label>Year of Passing:</label>
                <input
                  type="text"
                  name="tenthschoolyop"
                  value={tenthschoolyop}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
              </div>
            </div>
            <br />
            <div className="row">
              <h3 className="ps-5 pb-3">
                <u>Polycet Details:</u>
              </h3>
              <br />
              <div className="col-lg-6 ps-5 pb-3">
                <label>Allotment letter</label>
                <br />
                <input
                  type="file"
                  name="allotment"
                  value={allotment}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
              </div>
              <div className="col-lg-6 ps-5 pb-3">
                <label>Polycet Rank card</label>
                <br />
                <input
                  type="file"
                  name="rankcard"
                  value={rankcard}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 ps-5 pb-3">
                <label>Confirm Report</label>
                <br />
                <input
                  type="file"
                  name="confirm"
                  value={confirm}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
              </div>
              <div className="col-lg-6 ps-5 pb-3">
                <label>Student Photo</label>
                <br />
                <input
                  type="file"
                  name="photo"
                  value={photo}
                  onChange={ChangeHandler}
                  className="labels"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 ps-5 pb-3">
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
              </div>
              <div className="col-lg-6 ps-5 pb-3">
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
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 ps-5 pb-3">
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
              </div>
              <div className="col-lg-6 ps-5 pb-3">
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
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 ps-5 pb-3 adm">
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
              </div>
              <div className="col-lg-6 ps-5 pb-3">
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
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 ps-5 pb-3">
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
              </div>
            </div>
            <h3 className="address pb-2">
              <u>Remarks:</u>
            </h3>
            <br />
            <div className="address">
              <label>Joining Phase:</label>&nbsp;&nbsp;&nbsp;&nbsp;
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
            </div>
            <br />
            <div className="address">
              <label>Indemnity Bond:</label>
              <br />
              <input
                type="file"
                name="indemnitybond"
                value={indemnitybond}
                onChange={ChangeHandler}
                required
              />
            </div>
            <br />
            <div className="col-lg-6 ps-4 pb-3">
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
            </div>
            <center>
              <input type="Submit" className="px-4 py-1" />
            </center>
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admission;
