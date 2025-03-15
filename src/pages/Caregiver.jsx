import React from "react";
import { useContext, useEffect, useState } from "react";
import CaregiverForm from "../components/CaregiverForm";
import CaregiverList from "../components/CaregiverList";
import { getDocuments } from "../services/api";


const Caregiver = ({ caregivers, refreshData }) => {
  const [isOpen, setIsOpen] = useState(null);
  const [isClose, setIsClose] = useState(null);

  const openForm = () => {
    setIsOpen(true);
  };
  const closeForm = () => {
    setIsOpen(null);
  };
  return (
    <div className="caregiver-page">
      <div className="caregiver-page-header">
        <h3>CAREGIVERS</h3>
        <button className="sevya-button-inverse" onClick={openForm}>Add Caregiver</button>
        
      </div>
      <CaregiverForm
          singleCaregiverData={""}
          refreshData={refreshData}
          openForm={isOpen}
          closeForm={closeForm}
        />
      <CaregiverList
        caregivers={caregivers}
        refreshData={refreshData}
        openForm={isOpen}
        closeForm={closeForm}
      />
    </div>
  );
};

export default Caregiver;
