import React from "react";
import { useContext, useEffect, useState } from "react";

import PatientForm from "../components/PatientForm";
import PatientList from "../components/PatientList";

const Patient = ({ patients, refreshData }) => {
  const [isOpen, setIsOpen] = useState(null);
  const [isClose, setIsClose] = useState(null);

  const openForm = () => {
    setIsOpen(true);
  };
  const closeForm = () => {
    setIsOpen(null);
  };
  return (
    <div className="patients-page">
      <div className="patients-page-header">
        <h3>PATIENTS</h3>
        <button className="sevya-button-inverse" onClick={openForm}>
          Add Patient
        </button>

       
      </div>
      <PatientForm
          singlePatientData={""}
          refreshData={refreshData}
          openForm={isOpen}
          closeForm={closeForm}
        />
      <PatientList
        patients={patients}
        refreshData={refreshData}
        openForm={isOpen}
        closeForm={closeForm}
      />
    </div>
  );
};

export default Patient;
