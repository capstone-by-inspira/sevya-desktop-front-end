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
          <div class="InputContainer">
            <input
              id="input"
              class="serchInput"
              type="text"
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <label class="labelforsearch" htmlFor="input">
              <svg
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 13.5L10.1 10.6M11.6667 6.83333C11.6667 9.77885 9.27885 12.1667 6.33333 12.1667C3.38781 12.1667 1 9.77885 1 6.83333C1 3.88781 3.38781 1.5 6.33333 1.5C9.27885 1.5 11.6667 3.88781 11.6667 6.83333Z"
                  stroke="#25578E"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </label>
          </div>

          <table className="patients-table">
            <thead>
              <tr>
                <th className="patient-column"><p>Patient</p></th>
                {timeSlots.map((time) => (
                  <th key={time} className="time-column">
                    <p>{time}</p>
                  </th>
                ))}
              </tr>
            </thead>
            {filteredPatients.length > 0 ? (
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
                        <div className="patient-list-column">
                          <p>
                            {patient?.firstName?.charAt(0).toUpperCase() +
                              patient?.firstName?.slice(1).toLowerCase()}{" "}
                            {patient?.lastName?.charAt(0).toUpperCase() +
                              patient?.lastName?.slice(1).toLowerCase()}
                          </p>
                        </div>
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
            ) : (
              <p className="no-record">No patients found</p>
            )}
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
    //   className={`p-2 min-h-[100px] ${isOver ? "bg-green-200" : "bg-white"}`
    // }
    >
      {careGiver ? (
        <CaregiverCard
          caregiver={careGiver}
          removeCaregiver={removeCaregiver}
          patientId={patientId}
          time={time}
        />
      ) : (
        <div className="caregiver-card-drop"><p>Drop the caregiver</p></div>
      )}
    </div>
  );
};

export default ShiftTable;
