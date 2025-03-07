import React from "react";
import { useState, useEffect } from "react";

import { useDrop } from "react-dnd";
import CaregiverCard from "./CaregiverCard";
import { getDocumentById } from "../services/api";

const ShiftTable = ({ patientsData, dates, assignCaregiver , timeSlots, removeCaregiver , caregivers}) => {
  return (
    <table className="patients-table">
      <thead>
        <tr>
          <th className="border p-2">Patient</th>
          {timeSlots.map((time) => (
            <th key={time} className="border p-2">{time}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {patientsData.map((patient) => (
          <tr key={patient.id}>
           
            <td className="border p-2">{patient.firstName}</td>
            {timeSlots.map((time) => (
              <td key={time} className="border p-2">
                 {/* {console.log(patient.shifts["2025-03-06"])}
                 {console.log(date)} */}

                <DropZone
                  patientId={patient.id}
                //  date={date}
                  time={time}
                  caregiver={patient.shifts[time]}
                  assignCaregiver={assignCaregiver}
                  removeCaregiver={removeCaregiver}
                  caregivers={caregivers}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};


const DropZone =  ({ patientId, caregiver, assignCaregiver , time, removeCaregiver, caregivers}) => {
 // console.log(caregiver?.id, 'dropzone');
  const [careGiver, setCareGiver] = useState(caregiver);
  useEffect(() => {

    const fetchCaregiverData = async () => {
      if (caregiver?.id) {
        const cr = caregivers.find((c) => c.id == caregiver.id); // Use find instead of filter to get a single object
        setCareGiver(cr);
        console.log('refreshing>>');
      }else{
        setCareGiver(null);
        console.log('Caregiver removed, resetting state.');
      }
    };

    fetchCaregiverData();
  }, [caregiver, caregivers]);

  const [{ isOver }, drop] = useDrop({
    accept: "CAREGIVER",
    drop: (item) => assignCaregiver(patientId, item, time),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`p-2 min-h-[100px] ${isOver ? "bg-green-200" : "bg-white"}`}
    >
      {careGiver ? <CaregiverCard caregiver={careGiver}  removeCaregiver={removeCaregiver}  patientId={patientId} time={time}/> : <div className="caregiver-card-drop"> </div>}
    </div>
  );
};


export default ShiftTable;
