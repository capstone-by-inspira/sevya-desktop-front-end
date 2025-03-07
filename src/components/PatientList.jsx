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
import PatientForm from './PatientForm';
const PatientList = ({patients, refreshData, closeForm, openForm}) => {
    const token = localStorage.getItem("token");
    const [singlePatientData, setSinglePatientData] = useState();
    const [isEdit, setIsEdit] = useState(null);
  


    const handleDelete = async (id) => {
        await deleteDocument("patients", id, token);
        refreshData(); 
      };
      const handleEdit = async (id) => {
        const filteredPatient = filterById(patients, id);
        setSinglePatientData(filteredPatient);
        console.log(filteredPatient);
        setIsEdit(true);
      };
      const filterById = (patients, patientId) => {
        console.log(patientId);
        return patients.filter((patient) => patient.id == patientId);
      };
      const closeModal = () => {
        setIsEdit(null);
        closeForm();
      };

  
  return (
    <div>
       <h3 className='visually-hidden'>Patient List</h3>
       <PatientForm

       singlePatientData={singlePatientData}
       refreshData={refreshData}
       isEdit={isEdit}
       closeForm={closeModal}

       />
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
            <Typography>Phone: {patient.phoneNumber || "N/A"}</Typography>
            <Typography>Address: {patient.address || "N/A"}</Typography>
          </AccordionDetails>
          <AccordionActions>
            <Button color="primary" onClick={() => handleEdit(patient.id)}>
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
