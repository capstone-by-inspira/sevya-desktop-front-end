import React from "react";
import { formatTimestamp } from "../services/utils";

const EmergencyOccurrenceList = ({ occurrences, caregivers }) => {
  console.log("Occurrences:", occurrences);
  console.log("Caregivers:", caregivers);

  // Get today's date in local time (YYYY-MM-DD format)
  const todayDateString = new Date().toLocaleDateString();

  // Filter occurrences that happened today based on local date
  const todayOccurrences = occurrences.filter(occurrence => {
    const occurrenceDate = new Date(occurrence.timestamp).toLocaleDateString();
    return occurrenceDate === todayDateString;
  });

  return (
    <div className="emergency">
      {todayOccurrences.length === 0 ? (
        <p className="no-occurrences">No occurrences today</p>
      ) : (
        todayOccurrences.map((occurrence, index) => {
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
