import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ShiftTable from "./ShiftTable";
import CaregiverList from "./CaregiverTestList";
import {
  getDocuments,
  updateDocument,
  createDocument,
  deleteDocument,
} from "../services/api";
import { convertToUTC, convertDateToFormat } from "../services/utils";
import toast, { Toaster } from "react-hot-toast";

const ShiftMainBoardTable = ({ caregivers, patients, refreshData, shifts }) => {
  // console.log(shifts);

  const datesArray = ["2025-03-04", "2025-03-05", "2025-03-06"];
  const [timeSlots, setTimeSlots] = useState(["09:00", "14:00", "18:00"]);
  const [dates, setDates] = useState(datesArray);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const token = localStorage.getItem("token");
  const [patientsData, setPatientsData] = useState(patients);

  const [startTime, setStartTime] = useState([]);
  const [endTime, setEndTime] = useState([]);

  useEffect(() => {
    fetchShiftTimes(selectedDate); // Pass selectedDate to filter shifts on load
  }, [selectedDate]);

  const fetchShiftTimes = async (date) => {
    setStartTime("");
    setEndTime("");
    const fetchedTimes = patients.map((patient) => patient.shifts);

    // Flatten all the time slots from all patients
    const allTimeSlots = fetchedTimes.flatMap((shift) => {
      return Object.entries(shift)
        .filter(([time, details]) => details.shiftDate === date) // Filter by the selected date
        .map(([time]) => time);
    });

    // Get unique time slots using Set
    const uniqueTimeSlots = [...new Set(allTimeSlots)];

    console.log(uniqueTimeSlots, "Unique Time Slots for selected date");

    // Set the unique time slots to state
    setTimeSlots(uniqueTimeSlots);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
    console.log(startTime, "startTime");
  };
  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
    console.log(endTime, "startTime");
  };
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    //  previous0update  setStartDate(newDate);
    setSelectedDate(newDate);
    setTimeSlots([]);
    // Check if the new date is already in the dates array
    //  previous0update   // if (!dates.includes(newDate)) {
    //  setDates((prevDates) => [...prevDates, newDate]); // Add new date to the dates array
    // }
  };

  const addTimeSlot = () => {
    const newTime = `${startTime} - ${endTime}`;
    if (newTime && !timeSlots.includes(newTime)) {
      setTimeSlots((prev) => [...prev, newTime]);
    }
  };

  const assignCaregiver = (patientId, caregiver, time) => {
    setPatientsData((prevPatients) =>
      prevPatients.map((p) => {
        if (p.id === patientId) {
          const updatedShifts = { ...p.shifts };

          // If caregiver is assigned, update the shift for the date
          if (caregiver) {
            updatedShifts[time] = {
              id: caregiver.id,
              firstName: caregiver.firstName,
              shiftDate: selectedDate,
            }; // Assign caregiver
          } else {
            // If caregiver is unassigned, remove the shift
            delete updatedShifts[time];
          }

          // Log current shifts count (for debugging)
          console.log(
            "Current shifts count:",
            Object.keys(updatedShifts).length
          );

          return {
            ...p,
            shifts: updatedShifts,
          };
        }
        return p;
      })
    );

    // Prepare the updated data for the backend (only update the specific shift)

    const updatedData = {
      shifts: {
        ...patientsData.find((p) => p.id === patientId).shifts, // Keep existing shifts
        [time]: caregiver
          ? {
              id: caregiver.id,
              firstName: caregiver.firstName,
              shiftDate: selectedDate,
            }
          : undefined, // Update or remove shift
      },
    };

    updateShiftInPatient(patientId, updatedData, token);
    updateShiftInShift(patientId, caregiver, time);
  };

  const removeCaregiver = async (caregiver, patientId, time) => {
  

    // Update local state
    setPatientsData((prevPatients) =>
      prevPatients.map((p) => {
        if (p.id === patientId) {
          const updatedShifts = { ...p.shifts };

          // Check if the specified time slot matches and remove the caregiver
          if (updatedShifts[time] && updatedShifts[time].id === caregiver.id) {
            delete updatedShifts[time]; // Remove the shift for the specified time
          }

          return { ...p, shifts: updatedShifts };
        }
        return p; // Return unchanged patient if ID does not match
      })
    );

    // Remove caregiver from the patients collection
    try {
      const updatedPatientData = {
        shifts: {
          ...patientsData.find((p) => p.id === patientId).shifts,
        },
      };

      // Remove the specific shift
      delete updatedPatientData.shifts[time];

      console.log(updatedPatientData, "updatedPatientData");
      // Update the patient document in Firestore
      const patientUpdateResult = await updateDocument(
        "patients",
        patientId,
        updatedPatientData,
        token
      );

      if (patientUpdateResult.success) {

        console.log("Caregiver removed from patient document successfully");
        refreshData();
      } else {
        console.error(
          "Error updating patient document:",
          patientUpdateResult.error
        );
      }
    } catch (error) {
      toast.error("Error removing caregiver from patient:", error);
    }

    // Find and remove caregiver from shift collection
    const [startTime, endTime] = time.split(" - ");
    const utcStart = convertToUTC(selectedDate, startTime);
    const utcEnd = convertToUTC(selectedDate, endTime);

    const shiftToRemove = shifts.find(
      (shift) =>
        shift.patientId === patientId &&
        shift.shiftDate === selectedDate &&
        shift.startTime === utcStart &&
        shift.endTime === utcEnd
    );

    if (shiftToRemove) {
      // Update the shift to remove caregiver

      const deleteResult = await deleteDocument(
        "shifts",
        shiftToRemove.id,
        token
      );

      if (deleteResult.success) {
        toast.success('Shift removed successfully')

        console.log("Caregiver removed from shift successfully");
        refreshData();
      } else {
        console.error("Error updating shift:", updateResult.error);
      }
    } else {
      console.log("No matching shift found for caregiver removal.");
    }
  };

  const updateShiftInPatient = async (patientId, patientsData, token) => {
    const result = await updateDocument(
      "patients",
      patientId,
      patientsData,
      token
    );
    if (result.success) {
      console.log("Shift Updated:", result.data);

      refreshData();
      toast.success("Shift created successfully");
    
      //   position: 'top-center',

      //   // Styling
      //   style: {},
      //   className: '',

      //   // Custom Icon
      //   icon: '⏰',

      //   // Change colors of success/error/loading icon
      //   iconTheme: {
      //     primary: '#000',
      //     secondary: '#fff',
      //   },

      //   // Aria
      //   ariaProps: {
      //     role: 'status',
      //     'aria-live': 'polite',
      //   },

      //   // Additional Configuration
      //   removeDelay: 1000,
      // });
    } else {
      toast.error("Shift creation error. Please try again");

      console.error(result.error);
    }
  };

  const updateShiftInShift = async (patientId, caregiver, time) => {
    console.log(patientId, "patientID >>>>>>>>>>>>>>");
    console.log(caregiver, "caregiver >>>>>>>>>>>>>>>>");

    const [startTime, endTime] = time.split(" - ");
    const utcStart = convertToUTC(selectedDate, startTime);
    const utcEnd = convertToUTC(selectedDate, endTime);

    const shiftData = {
      checkIn: false,
      checkOut: true,
      caregiverId: caregiver.id,
      patientId: patientId,
      startTime: utcStart,
      endTime: utcEnd,
      location: "Surrey, BC",
      shiftDate: selectedDate,
    };

    // Check if the shift already exists with the same caregiver and patient
    // const existingShift = await checkExistingShift(caregiver.id, patientId, selectedDate);
    const result = await getDocuments("shifts", token);
    if (result.success) {
      // Find the shift with the same patientId, shiftDate, startTime, and endTime
      const existingShift = result.data.find(
        (shift) =>
          shift.patientId === patientId &&
          shift.shiftDate === selectedDate &&
          shift.startTime === utcStart &&
          shift.endTime === utcEnd
      );

      if (existingShift) {
        // If the shift exists, update the caregiver
        const updatedShiftData = {
          ...existingShift,
          caregiverId: caregiver.id, // Update the caregiverId
        };

        const updatedShift = await updateDocument(
          "shifts",
          existingShift.id,
          updatedShiftData,
          token
        );
        if (updatedShift.success) {
          console.log("Shift updated with new caregiver");
          refreshData();
        } else {
          console.error(updatedShift.error);
        }
      } else {
        // If no existing shift, create a new one
        const result = await createDocument("shifts", shiftData, token);
        if (result.success) {
          console.log("Shift created");
          refreshData();
        } else {
          console.error(result.error);
        }
      }
    } else {
      console.log(result.error);
    }
  };

  return (
    <>
      <Toaster />

      <DndProvider backend={HTML5Backend}>
        <div className="patient-caregiver-drag-drop-table">
          <h3>Shift Scheduling</h3>

          <div className="shift-scheduler">
            <div className="shift-scheduler-left-content">
              <div className="table-selectors">
                <div className="table-selector-fields">
                  <label htmlFor="startDate" className="table-selector-label">
                    Start Date:
                  </label>
                  <input
                    id="startDate"
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="border p-2"
                  />
                </div>

                <div className="table-selector-fields">
                  <label htmlFor="startTime" className="table-selector-label">
                    Start Time:
                  </label>
                  <input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={handleStartTimeChange}
                    className="border p-2"
                  />
                </div>

                <div className="table-selector-fields">
                  <label htmlFor="endTime" className="table-selector-label">
                    End Time:
                  </label>
                  <input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={handleEndTimeChange}
                    className="border p-2"
                  />
                </div>

                <button onClick={addTimeSlot} className="sevya-button">
                  Confirm
                  <div class="arrow-wrapper">
            <div class="arrow"></div>
          </div>
                </button>
              </div>

              <div className="patient-careigver-table">
                <hr />
                <div className="patient-careigver-table-header"></div>
                <div className="patient-careigver-table-body">
                  <div className="patients-drop-table">
                    <h4>
                      Shifts Chart for {convertDateToFormat(selectedDate)}
                    </h4>

                    <ShiftTable
                      patientsData={patientsData}
                      dates={dates}
                      timeSlots={timeSlots}
                      assignCaregiver={assignCaregiver}
                      removeCaregiver={removeCaregiver}
                      caregivers={caregivers}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="shift-scheduler-right-content">
              <div className="caregiver-drag-cards-container">
                <h5>Available Caregivers</h5>
                <CaregiverList
                  caregivers={caregivers}
                  removeCaregiver={removeCaregiver}
                />
              </div>
            </div>
          </div>
        </div>
      </DndProvider>
    </>
  );
};

export default ShiftMainBoardTable;
