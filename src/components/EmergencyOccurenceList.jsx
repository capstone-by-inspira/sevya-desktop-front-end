import React from "react";

const EmergencyOccurrenceList = ({ occurrences }) => {
  return (
    <div className="emergency-list">
      {occurrences.length === 0 ? (
        <p className="no-occurrences">No occurrences</p>
      ) : (
        occurrences.map((occurrence, index) => (
          <div key={index} className="emergency-card">
            <h4>{occurrence.title}</h4>
            <p>{occurrence.description}</p>
            <span className="date">Date: {occurrence.date}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default EmergencyOccurrenceList;
