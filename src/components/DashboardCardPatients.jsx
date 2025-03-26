import React from "react";
import {
  Box,
  Avatar,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

const DashboardCardPatients = ({ patients , setActiveItem}) => {
  const patient = patients;
  return (
    <div className="dashboard-card-caregiver">
      <div className="dashboard-card-left-content">
        <div className="dashboard-avatar">
          <Avatar
            src={patient?.image || ""}
            alt={`${patient.firstName} ${patient.lastName}`}
            sx={{ width: 50, height: 50, bgcolor: "#10b981" }}
          >
            {!patient.profileImage &&
              `${patient.firstName?.[0] || ""}${
                patient.lastName?.[0] || ""
              }`}
          </Avatar>
          </div>

          <div className="dashboard-user-info">
              <p className="user-name">
                {patient.firstName} {patient.lastName}
              </p>
              <p className="user-gender">Test</p>
              <p className="user-specialization">{patient.medicalConditions?.join(", ")}</p>
          </div>
      

      </div>
      <div className="dashboard-card-right-content">
          <button
          className="sevya-button"
            onClick={() => setActiveItem('patients')}
          >
            View Details
          </button>
      </div>
    </div>
  )
};

export default DashboardCardPatients;
