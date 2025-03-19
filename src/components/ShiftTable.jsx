import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import CaregiverCard from "./CaregiverCard";
import { Avatar, Typography } from "@mui/material";

const ShiftTable = ({
  patientsData,
  dates,
  assignCaregiver,
  timeSlots,
  removeCaregiver,
  caregivers,
}) => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filteredPatients, setFilteredPatients] = useState(patientsData);

  // Filter patients based on the search query
  useEffect(() => {
    const filtered = patientsData.filter(
      (patient) =>
        patient.firstName.toLowerCase().includes(searchQuery.toLowerCase()) // Case-insensitive search
    );
    setFilteredPatients(filtered);
  }, [searchQuery, patientsData]);

  // Check if there are time slots
  const hasTimeSlots = timeSlots && timeSlots.length > 0;

  return (
    <div className="patient-custom-table">
      {/* Input field for searching patients */}
      {!hasTimeSlots ? (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <p>Please add time slots to assign caregivers.</p>
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search for patient by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: "8px", marginBottom: "10px", width: "100%" }}
          />

          <table className="patients-table">
            <thead>
              <tr>
                <th className="border p-2">Patient</th>
                {timeSlots.map((time) => (
                  <th key={time} className="time-column">
                    {time}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td className="patient-column">
                    <div className="patient-info">
                      <Avatar
                        src={patient?.image || ""}
                        alt={`${patient.firstName} ${patient.lastName}`}
                        sx={{ width: 40, height: 40, bgcolor: "#1976d2" }}
                      >
                        {!patient.profileImage &&
                          `${patient.firstName?.[0] || ""}${
                            patient.lastName?.[0] || ""
                          }`}
                      </Avatar>
                      <Typography component="span">
                        {patient.firstName} {patient.lastName}
                      </Typography>
                    </div>

                  </td>
                  {timeSlots.map((time) => (
                    <td key={time} className="caregiver-column">
                      <DropZone
                        patientId={patient.id}
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
        </>
      )}
    </div>
  );
};

const DropZone = ({
  patientId,
  caregiver,
  assignCaregiver,
  time,
  removeCaregiver,
  caregivers,
}) => {
  const [careGiver, setCareGiver] = useState(caregiver);

  useEffect(() => {
    const fetchCaregiverData = async () => {
      if (caregiver?.id) {
        const cr = caregivers.find((c) => c.id == caregiver.id); // Use find instead of filter to get a single object
        setCareGiver(cr);
      } else {
        setCareGiver(null);
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
      {careGiver ? (
        <CaregiverCard
          caregiver={careGiver}
          removeCaregiver={removeCaregiver}
          patientId={patientId}
          time={time}
        />
      ) : (
        <div className="caregiver-card-drop">Drop the caregiver</div>
      )}
    </div>
  );
};

export default ShiftTable;
