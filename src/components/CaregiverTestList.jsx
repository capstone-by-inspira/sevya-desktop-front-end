import React, { useState } from 'react';
import CaregiverCard from "./CaregiverCard";

const CaregiverTestList = ({ caregivers, removeCaregiver }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter caregivers by name based on the search query
  const filteredCaregivers = caregivers.filter(caregiver =>
    caregiver.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='caregiver-list-container'>
      {/* Input field for filtering caregivers */}
      <input
        type="text"
        placeholder="Search for caregiver by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      
      {/* Display caregiver cards */}
      <div className="caregiver-card-list">
        {filteredCaregivers.length > 0 ? (
          filteredCaregivers.map((caregiver) => (
            <CaregiverCard key={caregiver.id} caregiver={caregiver} removeCaregiver={removeCaregiver} />
          ))
        ) : (
          <p>No caregivers found</p>
        )}
      </div>
    </div>
  );
};

export default CaregiverTestList;
