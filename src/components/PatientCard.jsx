// import React from "react";
// import { useDrag } from "react-dnd";
// import { formatTimeOnly, formatDateOnly } from "../services/utils";

// const PatientCard = ({ patient, shifts, caregivers, assignCaregiver }) => {
//   const shift = shifts.find((s) => s.patientId === patient.id);
//   const assignedCaregiver = caregivers.find((c) => c.id === shift?.caregiverId);

//   // Dragging logic
//   const [{ isDragging }, drag] = useDrag({
//     type: "PATIENT",
//     item: { patientId: patient.id }, // Ensure this is correctly passed
//     collect: (monitor) => ({
//       isDragging: !!monitor.isDragging(),
//     }),
//   });

//   return (
//     <div
//       ref={drag} // Enable dragging
//       className={`border p-4 rounded-md bg-white shadow-md patient-card ${
//         isDragging ? "opacity-50" : ""
//       }`}
//     >
//       <h3 className="text-md font-semibold">{patient.firstName} {patient.lastName}</h3>
//       <p className="text-sm"><strong>Status:</strong> {shift ? shift.status : "Unassigned"}</p>
//       <p className="text-sm"><strong>Start Time:</strong> {shift ? shift.startTime : ""}</p>
//       <p className="text-sm"><strong>End Time:</strong> {shift ? shift.endTime : ""}</p>
//       <p className="text-sm"><strong>Date:</strong> {shift ? shift.startTime : ""}</p>

//       {/* Caregiver Selection Dropdown */}
//       <label className="text-sm font-semibold">Assign Caregiver:</label>
//       <select
//         className="border p-1 w-full"
//         value={assignedCaregiver?.id || ""}
//         onChange={(e) => assignCaregiver(e.target.value, patient.id)}
//       >
//         <option value="">Select Caregiver</option>
//         {caregivers.map((caregiver) => (
//           <option key={caregiver.id} value={caregiver.id}>
//             {caregiver.firstName} {caregiver.lastName}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default PatientCard;

// PatientCard.js
import React from "react";


const PatientCard = ({
  patient,
  caregivers,
  assignCaregiver,
  setSelectedCaregiver,
  setSelectedDate,
  setSelectedStartTime,
  setSelectedEndTime,
  setSelectedLocation,
}) => {
 

  const shift = patient.shift; // Assuming shift is passed as a prop
  const assignedCaregiver = caregivers.find((c) => c.id === shift?.caregiverId);

  return (
   
      <div className="border p-4 rounded-md bg-white shadow-md m-2 w-64">
        <h3 className="text-lg font-semibold">
          {patient.firstName} {patient.lastName}
        </h3>
        <p className="text-sm">
          <strong>Assigned Caregiver:</strong>{" "}
          {assignedCaregiver ? assignedCaregiver.firstName : "Unassigned"}
        </p>
        <div className="mb-2">
          <label className="text-sm font-semibold">Assign Caregiver:</label>
          <select
            className="border p-1 w-full mb-2"
            onChange={(e) => setSelectedCaregiver(e.target.value)}
          >
            <option value="">Select Caregiver</option>
            {caregivers.map((cg) => (
              <option key={cg.id} value={cg.id}>
                {cg.firstName} {cg.lastName}
              </option>
            ))}
          </select>
          <input
            type="date"
            className="border p-1 block w-full mb-2"
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <input
            type="time"
            className="border p-1 block w-full mb-2"
            onChange={(e) => setSelectedStartTime(e.target.value)}
          />
          <input
            type="time"
            className="border p-1 block w-full mb-2"
            onChange={(e) => setSelectedEndTime(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-1 rounded w-full"
            onClick={() => assignCaregiver(patient.id)}
          >
            Assign
          </button>
        </div>
        <p className="text-sm">
          <strong>Status:</strong> {shift ? shift.status : ""}
        </p>
        <p className="text-sm">
          <strong>Start Time:</strong>{" "}
          {shift ? formatTimeOnly(shift.startTime) : ""}
        </p>
        <p className="text-sm">
          <strong>End Time:</strong>{" "}
          {shift ? formatTimeOnly(shift.endTime) : ""}
        </p>
        <p className="text-sm">
          <strong>Date:</strong> {shift ? formatDateOnly(shift.startTime) : ""}
        </p>
        <input
          type="text"
          className="border p-1 block w-full mb-2"
          placeholder="Location"
          value={shift?.location || ""}
          onChange={(e) => setSelectedLocation(e.target.value)}
        />
      </div>

  );
};

export default PatientCard;
