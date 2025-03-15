import React from "react";
import { formatTimestamp } from "../services/utils";

const EmergencyOccurrenceList = ({ occurrences, caregivers }) => {
  console.log("Occurrences:", occurrences);
  console.log("Caregivers:", caregivers);

  return (
    <div className="emergency">
      {occurrences.length === 0 ? (
        <p className="no-occurrences">No occurrences</p>
      ) : (
        occurrences.map((occurrence, index) => {
          // Find the matching caregiver
          const caregiver = caregivers.find(c => c.id === occurrence.caregiverId);

          return (
            <div key={index} className="emergency-list">
              <div className="emergency-info">
                  <h5>{occurrence.name}</h5>
                  <p> ~ {caregiver ? `${caregiver.firstName} ${caregiver.lastName}` : "Unknown"}</p>
              </div>
              <span className="date">Date: {formatTimestamp(occurrence.timestamp)}</span>
            </div>
          );
        })
      )}
    </div>
  );
};

export default EmergencyOccurrenceList;
