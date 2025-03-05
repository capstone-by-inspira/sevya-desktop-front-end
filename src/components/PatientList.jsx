import React from 'react'
import { useContext, useEffect, useState } from "react";

import {createDocument, getDocuments, deleteDocument} from '../services/api'

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
const PatientList = ({patients, refreshData}) => {
    const token = localStorage.getItem("token");


    const handleDelete = async (id) => {
        await deleteDocument("patients", id, token);
        refreshData(); 
      };


  
  return (
    <div>
       <h3>Patient List</h3>
       <div>
      {patients.map((patient) => (
        <Accordion key={patient.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${patient.id}-content`}
            id={`panel-${patient.id}-header`}
          >
            <Typography component="span">
              {patient.firstName} {patient.lastName}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Email: {patient.email}</Typography>
            <Typography>Phone: {patient.phone || "N/A"}</Typography>
            <Typography>Address: {patient.address || "N/A"}</Typography>
          </AccordionDetails>
          <AccordionActions>
            <Button color="primary" onClick={() => handleEdit(patient)}>
              Edit
            </Button>
            <Button color="error" onClick={() => handleDelete(patient.id)}>
              Delete
            </Button>
          </AccordionActions>
        </Accordion>
      ))}
    </div>
    </div>
  )
}

export default PatientList
