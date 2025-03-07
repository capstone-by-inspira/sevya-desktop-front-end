import React from 'react'

import CaregiverCard from "./CaregiverCard";

const CaregiverTestList = ({ caregivers, removeCaregiver }) => {
  return (
      <div className="caregiver-card-list">
        {caregivers.map((caregiver) => (
          <CaregiverCard key={caregiver.id} caregiver={caregiver} removeCaregiver={removeCaregiver} />
        ))}
      </div>

  );
};

export default CaregiverTestList;

