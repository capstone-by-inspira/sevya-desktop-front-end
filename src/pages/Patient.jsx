import React from "react";
import { useContext, useEffect, useState } from "react";

import PatientForm from "../components/PatientForm";
import PatientList from "../components/PatientList";

const Patient = ({ patients, refreshData }) => {
  const [isOpen, setIsOpen] = useState(null);
  const [isClose, setIsClose] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const openForm = () => {
    setIsOpen(true);
  };
  const closeForm = () => {
    setIsOpen(null);
  };

  const filteredPatient = patients?.filter((patient) =>
    `${patient.firstName} ${patient.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );
  return (
    <div className="patients-page">
      <div className="patients-page-header">
        <div className="pageTitle">
          <h3>Patients</h3>
        </div>

        <div className="pageFunctions">
          <div class="InputContainer">
            <input
              id="input"
              class="serchInput"
              type="text"
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <label class="labelforsearch" for="input">
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
          <button className="sevya-button" onClick={openForm}>
            Add Patient
            <div class="arrow-wrapper">
              <div class="arrow"></div>
            </div>
          </button>
        </div>
      </div>
      <PatientForm
        singlePatientData={""}
        refreshData={refreshData}
        openForm={isOpen}
        closeForm={closeForm}
      />

      {filteredPatient.length > 0 ? (
        <PatientList
          patients={filteredPatient}
          refreshData={refreshData}
          openForm={isOpen}
          closeForm={closeForm}
        />
      ) : (
        <div className="no-results">
          <h3 className="font-weight-300">No results found</h3>
        </div> // Show this if no caregivers match the search
      )}
    </div>
  );
};

export default Patient;
