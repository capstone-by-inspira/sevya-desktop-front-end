import React from "react";
import {
  Box,
  Avatar,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

const DashboardCardCaregivers = ({ caregivers, setActiveItem }) => {
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
            {caregiver?.firstName.charAt(0).toUpperCase() +
              caregiver?.firstName.slice(1) || "N.A."}{" "}
            {caregiver?.lastName.charAt(0).toUpperCase() +
              caregiver?.lastName.slice(1) || "N.A."}
          </p>
          <p className="user-gender">{caregiver?.gender.charAt(0).toUpperCase() +
              caregiver?.gender.slice(1) || "N.A."}{" "}</p>
          <p className="user-specialization">  {caregiver?.specialization.charAt(0).toUpperCase() +
              caregiver?.specialization.slice(1) || "N.A."}{" "}</p>
        </div>
      </div>
      <div className="dashboard-card-right-content">
        <button
          className="sevya-button"
          onClick={() => setActiveItem("caregiver")}
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

export default DashboardCardCaregivers;
