// App.js
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import StatusArea from './TestArea';
import { updateDocument } from '../services/api';

const App = ({caregivers, patients, shifts, refreshData }) => {
    const [newPatients, setNewPatients] = useState(patients);


    console.log(newPatients);
  const movePatient = (id, targetStatus) => {
    setNewPatients((prevPatients) => {
      return prevPatients.map((patient) => {
        if (patient.id === id) {
            const updatedPatient = { ...patient, shiftStatus: targetStatus };
       // Call the API to update the patient's status in the backend
                      updatePatientStatus(updatedPatient);
                      return updatedPatient;
        }
        return patient;
      });
    });
  };

  const updatePatientStatus = async (patient) => {
        const token = localStorage.getItem('token'); 
    const result = await updateDocument('patients', patient.id, patient, token);
    if (result.success) {
        refreshData()
      console.log('Patient status updated successfully:', result.data);
    } else {
         console.error('Error updating patient status:', result.error);
    }
  };

  const unassignedPatients = newPatients.filter((p) => p.shiftStatus === 'unassigned');
  const assignedPatients = newPatients.filter((p) => p.shiftStatus === 'assigned');
  const completedPatients = newPatients.filter((p) => p.shiftStatus === 'completed');

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex' }}>
        <StatusArea title="unassigned" newPatients={unassignedPatients} movePatient={movePatient}  />
        <StatusArea title="assigned" newPatients={assignedPatients} movePatient={movePatient} />
        <StatusArea title="completed" newPatients={completedPatients} movePatient={movePatient} />
      </div>
    </DndProvider>
  );
};

export default App;