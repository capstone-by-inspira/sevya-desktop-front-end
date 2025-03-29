import React, { useState } from 'react';
import CaregiverCard from "./CaregiverCard";

const CaregiverTestList = ({ caregivers, removeCaregiver, selectedDate }) => {
  console.log(selectedDate, 'selectedDAta');
  console.log(caregivers, 'all caregoivers');


  const [searchQuery, setSearchQuery] = useState('');
  const availableCaregivers = caregivers.filter(caregiver =>
    caregiver.availability.includes(selectedDate)
  );


  // Filter caregivers by name based on the search query
  const filteredCaregivers = availableCaregivers.filter(caregiver =>
    caregiver.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='caregiver-list-container'>
     
        <div class="InputContainer">
            <input
              id="input"
              class="serchInput"
              type="text"
               placeholder="Search caregivers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <label class="labelforsearch" htmlFor="input">
              <svg
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 13.5L10.1 10.6M11.6667 6.83333C11.6667 9.77885 9.27885 12.1667 6.33333 12.1667C3.38781 12.1667 1 9.77885 1 6.83333C1 3.88781 3.38781 1.5 6.33333 1.5C9.27885 1.5 11.6667 3.88781 11.6667 6.83333Z"
                  stroke="#25578E"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </label>
          </div>
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
