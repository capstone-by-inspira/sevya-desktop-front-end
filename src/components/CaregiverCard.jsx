import React from "react";
import { useDrag } from "react-dnd";

const CaregiverCard = ({ caregiver, removeCaregiver, time, patientId}) => {


  const [{ isDragging }, drag] = useDrag({
    type: "CAREGIVER",
    item: caregiver,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`caregiver-card ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {caregiver.firstName}
    
        {/* <button
          onClick={() => removeCaregiver(caregiver, patientId, time)}
          className="delete-btn"
        >
          Remove
        </button> */}
        <i className="fa-solid fa-xmark close"   onClick={() => removeCaregiver(caregiver, patientId, time)}></i>


    
    </div>
  );
};



export default CaregiverCard;

