import React, { useEffect, useState } from "react";
import { getDocuments, updateDocument, createDocument } from "../services/api";
import { formatTimestamp, formatDateOnly, formatTimeOnly } from "../services/utils";
import PatientCard from "./PatientCard";
const ShiftScheduleBoard = ({caregivers, patients, shifts, refreshData}) => {
  
    const [selectedCaregiver, setSelectedCaregiver] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedStartTime, setSelectedStartTime] = useState("");
    const [selectedEndTime, setSelectedEndTime] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("All"); // Status filter state

    const token = localStorage.getItem("token");



    // Helper function to check time conflicts
    const hasTimeConflict = (caregiverId, newStartTime, newEndTime) => {
        return shifts.some((shift) => {
            if (shift.caregiverId !== caregiverId) return false;

            const existingStart = new Date(shift.startTime).getTime();
            const existingEnd = new Date(shift.endTime).getTime();
            const newStart = new Date(newStartTime).getTime();
            const newEnd = new Date(newEndTime).getTime();

            return (
                (newStart >= existingStart && newStart < existingEnd) || // Starts inside an existing shift
                (newEnd > existingStart && newEnd <= existingEnd) || // Ends inside an existing shift
                (newStart <= existingStart && newEnd >= existingEnd) // Overlaps completely
            );
        });
    };

    // Assign Caregiver to a Patient
    const assignCaregiver = async (patientId) => {
        if (!selectedCaregiver || !selectedDate || !selectedStartTime || !selectedEndTime) {
            alert("Please select a caregiver, date, start time, and end time.");
            return;
        }

        const startDateTime = new Date(`${selectedDate}T${selectedStartTime}`);
        const endDateTime = new Date(`${selectedDate}T${selectedEndTime}`);

        // if (startDateTime >= endDateTime) {
        //     alert("End time must be after start time.");
        //     return;
        // }

        if (hasTimeConflict(selectedCaregiver, startDateTime, endDateTime)) {
            alert("Selected caregiver is already assigned during this time.");
            return;
        }

        // Find existing shift for this patient
        const existingShift = shifts.find((s) => s.patientId === patientId);

        if (existingShift) {
            // Update existing shift
            const updatedShift = {
                caregiverId: selectedCaregiver,
                status: "assigned",
                startTime: startDateTime.toISOString(),
                endTime: endDateTime.toISOString(),
                location:selectedLocation,
            };
            const result = await updateDocument("shifts", existingShift.id, updatedShift, token);
            if (result.success) {
                console.log("Shift Updated:", result.data);
                refreshData();
            } else {
                console.error(result.error);
            }
        } else {
            // Create new shift
            const newShift = {
                patientId,
                caregiverId: selectedCaregiver,
                status: "assigned",
                startTime: startDateTime.toISOString(),
                endTime: endDateTime.toISOString(),
                location:selectedLocation
            };
            const result = await createDocument("shifts", newShift, token);
            if (result.success) {
                console.log("New Shift Created:", result.data);
                refreshData();
            } else {
                console.error(result.error);
            }
        }
    };


    const filteredPatients = patients.filter((patient) => {
        const shift = shifts.find((s) => s.patientId === patient.id);

        if (selectedStatus === "All") return true;
        if (selectedStatus === "Unassigned" && !shift) return true;
        if (selectedStatus === "Assigned" && shift?.status === "assigned") return true;
        if (selectedStatus === "Ongoing" && shift?.status === "ongoing") return true;
        if (selectedStatus === "Completed" && shift?.status === "completed") return true;

        return false;
    });

    return (
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


            {/* Patient Table */}
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Patient Name</th>
                        <th className="border p-2">Assigned Caregiver</th>
                        <th className="border p-2">Assign Caregiver</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Start Time</th>
                        <th className="border p-2">End Time</th>
                        <th className="border p-2">Date</th>
                        <th className="border p-2">Location</th>

                    </tr>
                </thead>
                <tbody>
                    {filteredPatients.map((patient) => {
                        const shift = shifts.find((s) => s.patientId === patient.id);
                        const assignedCaregiver = caregivers.find((c) => c.id === shift?.caregiverId);

                        return (
                            <tr key={patient.id}>
                                <td className="border p-2">{patient.firstName} {patient.lastName}</td>
                                <td className="border p-2">
                                    {assignedCaregiver ? assignedCaregiver.firstName : "Unassigned"}
                                </td>
                                <td className="border p-2">
                                    <select
                                        className="border p-1 mb-2"
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
                                </td>
                                <td className="border p-2">
                                {shift ? shift.status : ""}
                                </td>
                                <td className="border p-4">{shift ? formatTimeOnly(shift.startTime) : ""}</td>
                                <td className="border p-4">{shift ? formatTimeOnly(shift.endTime) : ""}</td>
                                <td className="border p-2">{shift ? formatDateOnly(shift.startTime) : ""}</td>
                                <td className="border p-2">
                                <input
                                        type="location"
                                        className="border p-1 block w-full mb-2"
                                        value={shift?.location || ""}
                                        onChange={(e) => setSelectedLocation(e.target.value)}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="flex flex-wrap">
        {patients.map((patient) => (
          <PatientCard
          key={patient.id}
          patient={patient}
          caregivers={caregivers}
          assignCaregiver={assignCaregiver}
          setSelectedCaregiver={setSelectedCaregiver}
           setSelectedDate={setSelectedDate}
          setSelectedStartTime={setSelectedStartTime}
            setSelectedEndTime={setSelectedEndTime}
          setSelectedLocation={setSelectedLocation}
        />
      ))}
     </div>
      </div>
    );
};

export default ShiftScheduleBoard;
