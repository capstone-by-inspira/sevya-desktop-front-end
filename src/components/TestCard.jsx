// PatientCard.js
import React from 'react';
import { useDrag } from 'react-dnd';

const PatientCard = ({ patient }) => {
    console.log(patient);
  const [{ isDragging }, drag] = useDrag({
    type: 'PATIENT',
    item: { id: patient.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '16px',
        margin: '8px',
        backgroundColor: 'lightblue',
        border: '1px solid blue',
        cursor: 'move',
      }}
    >
      <h4>{patient.firstName}</h4>
      <p>Status: {patient.shiftStatus}</p>
    </div>
  );
};

export default PatientCard;