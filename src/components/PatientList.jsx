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
import PatientForm from "./PatientForm";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";
import { formatDateOnly ,formatTimestamp} from "../services/utils";

const PatientList = ({ patients, refreshData, closeForm, openForm }) => {
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
      <h3 className="visually-hidden">Patient List</h3>
      <PatientForm
        singlePatientData={singlePatientData}
        refreshData={refreshData}
        isEdit={isEdit}
        closeForm={closeModal}
      />
      <div className="caregiverslist1">
        {patients.map((patient) => (
          <Accordion key={patient.id} className="caregiver-list-content">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${patient.id}-content`}
              id={`panel-${patient.id}-header`}
            >
              <div className="userDetails">
                <Avatar
                  src={patient?.image || ""}
                  alt={`${patient.firstName} ${patient.lastName}`}
                  sx={{ width: 50, height: 50, bgcolor: "#1976d2" }}
                >
                  {!patient.profileImage &&
                    `${patient.firstName?.[0] || ""}${
                      patient.lastName?.[0] || ""
                    }`}
                </Avatar>
                <div className="userHeader">
                  <div className="userleftSection">
                    <div className="userName">
                      <p className="font-weight-400">
                        {patient?.firstName.charAt(0).toUpperCase() +
                          patient?.firstName.slice(1) || "N.A."}{" "}
                        {patient?.lastName.charAt(0).toUpperCase() +
                          patient?.lastName.slice(1) || "N.A."}
                      </p>
                      <p>({patient?.age || "N.A."})</p>
                    </div>

                    <p>
                      {patient?.gender?.charAt(0).toUpperCase() +
                        patient?.gender?.slice(1).toLowerCase() || "N.A."}
                    </p>
                  </div>
                  <div component="userRightSection">
                    <p>{patient.email}</p>
                  </div>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails className="patientdetails">
              <div className="userData">
                <div className="userWork">
                <p>
                    <span className="font-weight-400">Phone Number :</span>{" "}
                    {patient?.phoneNumber || "N.A."}
                  </p>
                  <p>
                    <span className="font-weight-400">Address :</span>{" "}
                    {patient?.address || "N.A."}
                  </p>
                  <p>
                    <span className="font-weight-400">Emergency Contact :</span>{" "}
                    {patient?.emergencyContact.name.charAt(0).toUpperCase() +
                      patient?.emergencyContact.name.slice(1) || "N.A."}{" "}
                    ({" "}
                    {patient?.emergencyContact.relation?.charAt(0).toUpperCase() +
                      patient?.emergencyContact.relation?.slice(1) || "N.A."}
                    ) ~ {patient?.emergencyContact.phone}
                  </p>
                  <p>
                    <span className="font-weight-400">Insurance Details :</span>{" "}
                    {patient?.insuranceDetails.policyNumber || "N.A."}
                  </p>

                  <p>
                    <span className="font-weight-400">Admission Date :</span>{" "}
                    {formatTimestamp(patient?.admissionDate) || "N.A."}
                  </p>
                  <p>
                    <span className="font-weight-400">Discharge Date :</span>{" "}
                    {formatTimestamp(patient?.dischargeDate) || "N.A."}
                  </p>

                </div>
                {/* <hr /> */}
                <div className="userMedicalCondtion">
                  <p>
                    <span className="font-weight-400">Medical Condition :</span>{" "}
                    {patient?.medicalConditions?.length > 0 ? (
                      <ul>
                        {patient.medicalConditions.map((condition, index) => (
                          <li key={index}>
                            {condition.charAt(0).toUpperCase() +
                              condition.slice(1).toLowerCase()}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>N.A.</p>
                    )}
                  </p>
                </div>
                {/* <hr /> */}
                <div className="userMedications">
                <p>
                    <span className="font-weight-400">Medications :</span>{" "}
                    {patient?.medications?.length > 0 ? (
                      <ul>
                        {patient.medications.map((condition, index) => (
                          <li key={index}>
                            {condition.charAt(0).toUpperCase() +
                              condition.slice(1).toLowerCase()}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>N.A.</p>
                    )}
                  </p>
                  </div>
              </div>
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
  );
};

export default PatientList;
