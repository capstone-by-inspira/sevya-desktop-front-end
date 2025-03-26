import React from "react";

import { useContext, useEffect, useState } from "react";
import { getDocuments } from "../services/api";
import ShiftDrag from "../components/ShiftTable";
import ShiftScheduleBoard from "../components/ShiftScheduleBoard";

import ShiftMainBoardTable from "../components/ShiftMainBoardTable";
import Modal from "../components/Modal";
import tutorial from '../assets/tutorial.mp4'
const Shifts = ({ refreshData, caregivers, patients, shifts }) => {
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [shiftsInfo, setShiftsInfo] = useState(
    localStorage.getItem("shifts_info") === "true"
  );
  const closeModal = () => {
    setIsModalOpen(null);

    console.log("trigger hoia");
    localStorage.setItem("shifts_info", "true"); // Store as string "true"
    setShiftsInfo(true); // Update state to reflect storage change

  };

  useEffect(() => {
    // Open modal only if shiftsInfo is false
    if (!shiftsInfo) {
      setIsModalOpen(true);
    }
  }, [shiftsInfo]);

  


  return (
    <div>
      {/* <ShiftScheduleBoard refreshData={refreshData} caregivers={caregivers} patients={patients} shifts={shifts}/> */}
      {/* <ShiftDrag refreshData={refreshData} caregivers={caregivers} patients={patients} shifts={shifts}/> */}
      {/* <ShiftDrag refreshData={refreshData} caregivers={caregivers} patients={patients} shifts={shifts} /> */}
      <ShiftMainBoardTable
        refreshData={refreshData}
        caregivers={caregivers}
        patients={patients}
        shifts={shifts}
      />
     <Modal
  isOpen={isModalOpen}
  closeModal={closeModal}
   modalHeaderTitle="Shift Assigning Tutorial"
  modalBodyContent={
    <div className="modal-form">
      <div className="modal-form-header">Assign a caregiver by dragging them from the list to a patient's slot.</div>

      <div className="modal-form-body">
        <video width="100%" controls loop autoPlay muted>
          <source src={tutorial} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  }
/>
    </div>
  );
};

export default Shifts;
