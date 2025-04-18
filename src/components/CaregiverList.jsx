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
      <div className="caregiverslist1">
        {caregivers.map((caregiver) => (
          <Accordion key={caregiver.id} className="caregiver-list-content">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${caregiver.id}-content`}
              id={`panel-${caregiver.id}-header`}
            >
              <div className="userDetails">
                <Avatar
                  src={caregiver?.image || ""}
                  alt={`${caregiver.firstName} ${caregiver.lastName}`}
                  sx={{ width: 50, height: 50, bgcolor: "#25578E" }}
                >
                  {!caregiver.profileImage &&
                    `${caregiver.firstName?.[0] || ""}${
                      caregiver.lastName?.[0] || ""
                    }`}
                </Avatar>
                <div className="userHeader">
                  <div className="userleftSection">
                    <div className="userName">
                      <p className="font-weight-400">
                        {caregiver?.firstName.charAt(0).toUpperCase() +
                          caregiver?.firstName.slice(1) || 'N.A.'}{" "}
                        {caregiver?.lastName.charAt(0).toUpperCase() +
                          caregiver?.lastName.slice(1) || 'N.A.'}
                      </p>
                      <p>({caregiver.age})</p>
                    </div>

                    <p>
                      {caregiver?.gender.charAt(0).toUpperCase() +
                        caregiver?.gender.slice(1).toLowerCase() || 'N.A.'}
                    </p>
                  </div>
                  <div component="userRightSection"><p>{caregiver.email}</p></div>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails className="cargiverdetails">
              <div className="userWork">
              <p>
                  <span className="font-weight-400">Phone Number :</span>{" "}
                  {caregiver?.phoneNumber || 'N.A.'}
                </p>

                <p>
                  <span className="font-weight-400">Address :</span>{" "}
                  {caregiver?.address || 'N.A.'}
                </p>

                <p>
                  <span className="font-weight-400">Years of Experience :</span>{" "}
                  {caregiver?.experienceYears || 'N.A.'}
                </p>
                <p>
                  <span className="font-weight-400">Specialization :</span>{" "}
                  {caregiver?.specialization.charAt(0).toUpperCase() +
                    caregiver?.specialization.slice(1).toLowerCase() || 'N.A.'} 
                </p>
              </div>
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
