import React from "react";
import {
  Box,
  Avatar,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

const DashboardCardCaregivers = ({ caregivers , setActiveItem}) => {
  const caregiver = caregivers;
  return (
    <div className="dashboard-card-caregiver">
      <div className="dashboard-card-left-content">
        <div className="dashboard-avatar">
          <Avatar
            src={caregiver?.image || ""}
            alt={`${caregiver.firstName} ${caregiver.lastName}`}
            sx={{ width: 50, height: 50, bgcolor: "#10b981" }}
          >
            {!caregiver.profileImage &&
              `${caregiver.firstName?.[0] || ""}${
                caregiver.lastName?.[0] || ""
              }`}
          </Avatar>
          </div>

          <div className="dashboard-user-info">
              <p className="user-name">
                {caregiver.firstName} {caregiver.lastName}
              </p>
              <p className="user-gender">Male</p>
              <p className="user-specialization">{caregiver.specialization}</p>
          </div>
      

      </div>
      <div className="dashboard-card-right-content">
          <button
          className="sevya-button"
            onClick={() => setActiveItem("caregiver")}
          >
            View Details
          </button>
      </div>
    </div>
  )
};

export default DashboardCardCaregivers;
