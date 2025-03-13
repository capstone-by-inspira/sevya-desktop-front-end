import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import PatientForm from "../components/PatientForm";
import CaregiverForm from "../components/CaregiverForm";
import CaregiverAvailabilityChart from "../components/CaregiverAvailabilityChart";
import CaregiverShiftPieChart from "../components/CaregiverShiftDistrubutionChart";
import ImageUploader from "../components/FileUploader";

const Dashboard = ({ caregivers, patients, user }) => {
  console.log(user);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h2>DASHBOARD ANALYTICS</h2>
      </div>

      <div className="dashboard-body">
        <div className="dashboard-first-container">

          <div className="dashboard-left-container">
            

            <div className="dashboard-patient-card">
              <h3 className="font-400">Total Patients : {patients.length}</h3>
            </div>

            <div className="dashboard-caregiver-card">
              <h3 className="font-400">
                Total Caregivers : {caregivers.length}
              </h3>
            </div>

          </div>
          <div className="dashboard-right-container">
            <CaregiverShiftPieChart/>
          </div>
        </div>
        <div className="dashboard-second-container">
          <CaregiverAvailabilityChart />
        </div>
      </div>

      <PatientForm />

<ImageUploader/>

      {/* <CaregiverForm/> */}
    </div>
  );
};

export default Dashboard;
