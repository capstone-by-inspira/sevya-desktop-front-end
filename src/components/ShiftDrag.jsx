


import React, { useState } from "react";
import { useDrop } from "react-dnd";
import ShiftColumn from "./ShiftColumn";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { updateDocument, createDocument } from "../services/api";

const ShiftBoard = ({ caregivers, patients, shifts, refreshData }) => {
  const [selectedStatus, setSelectedStatus] = useState("All");

  const token = localStorage.getItem("token");

  const assignCaregiver = async (caregiverId, patientId) => {
    const existingShift = shifts.find((s) => s.patientId === patientId);

    if (existingShift) {
      const updatedShift = { caregiverId, status: "assigned" };
      const result = await updateDocument("shifts", existingShift.id, updatedShift, token);
      if (result.success) refreshData();
      else console.error(result.error);
    } else {
      const newShift = { patientId, caregiverId, status: "assigned" };
      const result = await createDocument("shifts", newShift, token);
      if (result.success) refreshData();
      else console.error(result.error);
    }
  };

  const getShiftCategory = (patient) => {
    const startHour = new Date(patient.startTime).getHours();
    if (startHour >= 6 && startHour < 12) return "Morning Shift";
    if (startHour >= 12 && startHour < 18) return "Afternoon Shift";
    return "Night Shift";
  };

  const categorizedPatients = {
    "Morning Shift": patients.filter((p) => getShiftCategory(p) === "Morning Shift"),
    "Afternoon Shift": patients.filter((p) => getShiftCategory(p) === "Afternoon Shift"),
    "Night Shift": patients.filter((p) => getShiftCategory(p) === "Night Shift"),
  };

  const movePatient = async (patientId, newShiftCategory) => {
    console.log(`Moving Patient ${patientId} to ${newShiftCategory}`);
  
    // Find existing shift for the patient
    const existingShift = shifts.find((s) => s.patientId === patientId);
  
    // Define new shift times based on the selected shift category
    const updatedShiftTime = {
      "Morning Shift": { startTime: "07:00:00", endTime: "11:00:00" },
      "Afternoon Shift": { startTime: "12:00:00", endTime: "16:00:00" },
      "Night Shift": { startTime: "18:00:00", endTime: "22:00:00" },
    }[newShiftCategory];
  
    if (existingShift) {
      // Update existing shift
      const updatedShift = {
        ...existingShift,
        startTime: updatedShiftTime.startTime,
        endTime: updatedShiftTime.endTime,
      };
  
      const result = await updateDocument("shifts", existingShift.id, updatedShift, token);
  
      if (result.success) {
        console.log("Shift updated successfully:", updatedShift);
        refreshData(); // Refresh UI after update
      } else {
        console.error("Error updating shift:", result.error);
      }
    } else {
      // Create new shift if none exists
      const newShift = {
        patientId,
        caregiverId: null, // No caregiver assigned yet
        startTime: updatedShiftTime.startTime,
        endTime: updatedShiftTime.endTime,
        status: "unassigned", // Default status for new shifts
      };
  
      const result = await createDocument("shifts", newShift, token);
  
      if (result.success) {
        console.log("New shift created:", newShift);
        refreshData(); // Refresh UI after creation
      } else {
        console.error("Error creating new shift:", result.error);
      }
    }
  };
  
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Shift Scheduling Board</h1>

        <div className="mb-4">
          <label className="font-semibold mr-2">Filter by Status:</label>
          <select
            className="border p-2"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Unassigned">Unassigned</option>
            <option value="Assigned">Assigned</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="flex gap-6">
          {/* Shift Columns */}
          <div className="w-full flex gap-4 shift-board">
            {Object.keys(categorizedPatients).map((shift) => (
              <ShiftColumn
                key={shift}
                title={shift}
                patients={categorizedPatients[shift]}
                shifts={shifts}
                caregivers={caregivers}
                assignCaregiver={assignCaregiver}
                movePatient={movePatient}
              />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default ShiftBoard;
