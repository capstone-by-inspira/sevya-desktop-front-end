import React from "react";
import { useDrop } from "react-dnd";
import PatientCard from "./PatientCard";

const ShiftColumn = ({ title, patients, shifts, caregivers, assignCaregiver, movePatient }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "PATIENT",
    drop: (item) => {
      console.log(`Dropped Patient:`, item); // ✅ Debugging log
      if (!item || !item.patientId) {
        console.error("Invalid drop item:", item);
        return;
      }
      movePatient(item.patientId, title);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`w-1/3 bg-gray-100 p-4 rounded-md ${isOver ? "bg-green-200" : ""}`}
    >
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      {patients.map((patient) => (
        <PatientCard
          key={patient.id}
          patient={patient}
          shifts={shifts}
          caregivers={caregivers}
          assignCaregiver={assignCaregiver}
        />
      ))}
    </div>
  );
};

export default ShiftColumn;
