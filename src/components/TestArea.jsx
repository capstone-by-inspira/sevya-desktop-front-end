// StatusArea.js
import React from 'react';
import { useDrop } from 'react-dnd';
import PatientCard from './TestCard';

const StatusArea = ({ title, newPatients, movePatient }) => {
    console.log(newPatients);
  const [{ isOver }, drop] = useDrop({
    accept: 'PATIENT',
    drop: (item) => movePatient(item.id, title),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        width: '300px',
        minHeight: '400px',
        padding: '16px',
        margin: '8px',
        backgroundColor: isOver ? 'yellow' : 'lightgray',
        border: '1px solid green',
      }}
    >
      <h2>{title}</h2>
      {newPatients && newPatients.map((patient) => (
        <PatientCard key={patient.id} patient={patient}  />
      ))}
    </div>
  );
};

export default StatusArea;