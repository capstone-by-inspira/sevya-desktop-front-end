import React from "react";
import { useDrag } from "react-dnd";
import { Avatar, Typography } from "@mui/material";

const CaregiverCard = ({ caregiver, removeCaregiver, time, patientId }) => {
  //console.log(caregiver, 'card care')
  //console.log(caregiver, 'whats care');
  const [{ isDragging }, drag] = useDrag({
    type: "CAREGIVER",
    item: caregiver,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`caregiver-card ${isDragging ? "opacity-50" : ""}`}
    >
      {/* {caregiver.firstName} {caregiver.lastName} */}
      {/* <button
          onClick={() => removeCaregiver(caregiver, patientId, time)}
          className="delete-btn"
        >
          Remove
        </button> */}
      <div className="caregiver-info">
        <Avatar
          src={caregiver?.image || ""}
          alt={`${caregiver.firstName} ${caregiver.lastName}`}
          sx={{ width: 40, height: 40, bgcolor: "#1976d2" }}
        >
          {!caregiver.profileImage &&
            `${caregiver.firstName?.[0] || ""}${caregiver.lastName?.[0] || ""}`}
        </Avatar>
        <div className="caregiver-list-column">
        <p>
          {caregiver?.firstName?.charAt(0).toUpperCase() + caregiver?.firstName?.slice(1).toLowerCase()}{" "} 
          {caregiver?.lastName?.charAt(0).toUpperCase() + caregiver?.lastName?.slice(1).toLowerCase()}
        </p>

        </div>
      </div>
      <div className="caregiver-remove">
      <i
        className="fa-solid fa-xmark close"
        onClick={() => removeCaregiver(caregiver, patientId, time)}
      ></i>
      </div>
    </div>
  );
};

export default CaregiverCard;
