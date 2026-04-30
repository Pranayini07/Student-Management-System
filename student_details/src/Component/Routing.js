import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from './Dashboard'
import Admission from './Admission'
import SemData from './SemData'
import SemDataDashboard from "./SemDataDashboard";
import BTechForm from "./BTechForm";
import JobForm from "./JobForm";
import BTechDashboard from "./BTechDashboard";
import JobDashboard from "./JobDashboard";
import Login from "./Login";
import Home from "./Home";
import Otp from "./Otp";
import ForgotPassword from './ForgotPassword'
import ForOtp from "./ForOtp";
import NewPassword from "./NewPassword";
import AdminHome from "./AdminHome";

const Routing = () => {
    return (
      <>
        <Routes>
          <Route path="/Admission" element={<Admission />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/SemData" element={<SemData />} />
          <Route path="/SemDataDashboard" element={<SemDataDashboard />} />
          <Route path="/BTechForm" element={<BTechForm />} />
          <Route path="/BTechDashboard" element={<BTechDashboard />} />
          <Route path="/JobForm" element={<JobForm />} />
          <Route path="/JobDashboard" element={<JobDashboard />} />
          <Route path="/Login" element={<Login />}/>
          <Route path="/" element={<Home />}/>
          <Route path="/Otp" element={<Otp />}/>
          <Route path="/ForgotPassword" element={<ForgotPassword />}/>
          <Route path="/ForOtp" element={<ForOtp />}/>
          <Route path="/NewPassword" element={<NewPassword />}/>
          <Route path="/AdminHome" element={<AdminHome />}/>

          </Routes>
      </>   
    )
} 

export default Routing;
