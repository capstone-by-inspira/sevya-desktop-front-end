import React from "react";
import {
  Box,
  Avatar,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

const DashboardCardPatients = ({ patients, setActiveItem }) => {
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
              `${patient.firstName?.[0] || ""}${patient.lastName?.[0] || ""}`}
          </Avatar>
        </div>

        <div className="dashboard-user-info">
          <p className="user-name">
            {patient.firstName.charAt(0).toUpperCase() +
              patient.firstName.slice(1)}{" "}
            {patient.lastName.charAt(0).toUpperCase() +
              patient.lastName.slice(1)}
          </p>

          <p className="user-gender">
            {patient.gender?.charAt(0).toUpperCase() +
              patient.gender?.slice(1).toLowerCase()}
          </p>

          <p className="user-specialization">
            {patient.medicalConditions
              ?.map(
                (condition) =>
                  condition.charAt(0).toUpperCase() +
                  condition.slice(1).toLowerCase()
              )
              .join(", ")}
          </p>
        </div>
      </div>
      <div className="dashboard-card-right-content">
        <button
          className="sevya-button"
          onClick={() => setActiveItem("patients")}
        >
          View Details
          <div class="arrow-wrapper">
            <div class="arrow"></div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default DashboardCardPatients;
