// REQUIRED
import React from "react";
import { useContext, useEffect, useState } from "react";

import { createDocument, getDocuments, deleteDocument } from "../services/api";

import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import CaregiverForm from "./CaregiverForm";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";


const CaregiverList = ({ caregivers, refreshData, closeForm, openForm }) => {
  const token = localStorage.getItem("token");
  const [singleCaregiverData, setSingleCaregiverData] = useState();
  const [isEdit, setIsEdit] = useState(null);

  const handleDelete = async (id) => {
    await deleteDocument("caregivers", id, token);
    refreshData();
  };

  const handleEdit = async (id) => {
    const filteredCaregiver = filterById(caregivers, id);
    setSingleCaregiverData(filteredCaregiver);
    console.log(filteredCaregiver);
    setIsEdit(true);
  };

  const filterById = (caregivers, caregiverId) => {
    console.log(caregivers);
    console.log(caregiverId);
    return caregivers.filter((caregiver) => caregiver.id == caregiverId);
  };
  const closeModal = () => {
    setIsEdit(null);
    closeForm();
  };
  return (
    <div>
      <h3 className="visually-hidden">Caregiver List</h3>
      <CaregiverForm
        singleCaregiverData={singleCaregiverData}
        refreshData={refreshData}
        isEdit={isEdit}
        closeForm={closeModal}
      />
      <div className="caregiver-list-wrapper">
        {caregivers.map((caregiver) => (
          <Accordion key={caregiver.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${caregiver.id}-content`}
              id={`panel-${caregiver.id}-header`}
            >
               <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  src={caregiver?.image || ""}
                  alt={`${caregiver.firstName} ${caregiver.lastName}`}
                  sx={{ width: 40, height: 40, bgcolor: "#1976d2" }}
                >
                  {!caregiver.profileImage &&
                    `${caregiver.firstName?.[0] || ""}${caregiver.lastName?.[0] || ""}`}
                </Avatar>
                <Typography component="span">
                  {caregiver.firstName} {caregiver.lastName}
                </Typography>
              </Box>
            
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Email: {caregiver.email}</Typography>
              <Typography>Phone: {caregiver.phoneNumber || "N/A"}</Typography>
              <Typography>Address: {caregiver.address || "N/A"}</Typography>
            </AccordionDetails>
            <AccordionActions>
              <Button color="primary" onClick={() => handleEdit(caregiver.id)}>
                Edit
              </Button>
              <Button color="error" onClick={() => handleDelete(caregiver.id)}>
                Delete
              </Button>
            </AccordionActions>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default CaregiverList;
