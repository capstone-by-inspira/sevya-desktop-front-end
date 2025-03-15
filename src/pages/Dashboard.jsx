import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import PatientForm from "../components/PatientForm";
import CaregiverForm from "../components/CaregiverForm";
import CaregiverAvailabilityChart from "../components/CaregiverAvailabilityChart";
import CaregiverShiftPieChart from "../components/CaregiverShiftDistrubutionChart";
import landingImage from "../assets/caregiver-landing-page.jpg";
import DashboardCard from "../components/DashboardCardCaregivers";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import DashboardCardCaregivers from "../components/DashboardCardCaregivers";
import DashboardCardPatients from "../components/DashboardCardPatients";
import EmergencyOccurrenceList from "../components/EmergencyOccurenceList";
import InfoIcon from '@mui/icons-material/Info';
import { InfoOutlined } from "@mui/icons-material";
const Dashboard = ({ caregivers, patients, user }) => {
  console.log(user);

  return (
    <>
      <div id="root-not-available">
        <h1>Please open the admin portal on desktop</h1>
      </div>

      <div className="dashboard-page">
        <div className="dashboard-header">
          <img src={landingImage} />
        </div>

        <div className="dashboard-body">
          <div className="dashboard-first-container">
            <div className="dashboard-left-container">
              <CaregiverShiftPieChart />
            </div>
            <div className="dashboard-right-container">
              <CaregiverShiftPieChart />
            </div>
          </div>
          <div className="dashboard-second-container">
            <CaregiverAvailabilityChart />
          </div>
        </div>

        <div className="dashboard-footer">
          <div className="list-main">
            <div className="list-header">
              <h5>Patient Management</h5>
            </div>
            <div className="list-body">
              <ul className="list-content">
                {patients.slice(0, 2).map((c) => (
                  <div key={c.id}>
                    <DashboardCardPatients patients={c} />
                  </div>
                ))}
              </ul>
            </div>
          </div>

          <div className="list-main">
            <div className="list-header">Caregivers</div>
            <div className="list-body">
              <ul className="list-content">
                {caregivers.slice(0, 2).map((c) => (
                  <div key={c.id}>
                    <DashboardCardCaregivers caregivers={c} />
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="dashboard-emergency-container">
          <div className="dashboard-emergency-header">
            <InfoOutlined></InfoOutlined>
            <h5>Emergency Occurences</h5>
          </div>
          <EmergencyOccurrenceList occurrences={[]} />
        </div>

        <PatientForm />

        {/* <CaregiverForm/> */}
      </div>
    </>
  );
};

export default Dashboard;
