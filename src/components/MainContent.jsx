import React, { useState, useEffect } from "react";

import MainHeader from "./MainHeader";
import Caregiver from "../pages/Caregiver";
import Dashboard from "../pages/Dashboard";
import Patient from "../pages/Patient";
import Shifts from "../pages/Shifts";

const MainContent = ({
  activeItem,
  setActiveItem,
  patients,
  caregivers,
  shifts,
  refreshData,
  user,
  occurences
}) => {
  const [showHeaderControls, setShowHeaderControls] = useState(false);

  const renderContent = () => {
    switch (activeItem) {
      case "home":
        return <><Dashboard setActiveItem ={setActiveItem} caregivers ={caregivers} patients ={patients} user={user} occ={occurences} refreshData={refreshData}/></>;
      case "caregiver":
        return <><Caregiver caregivers={caregivers} refreshData={refreshData}/></>;
      case "patients":
        return <><Patient patients={patients} refreshData={refreshData}/></>;
      case "shifts":
        return <><Shifts patients={patients} caregivers={caregivers} refreshData={refreshData} shifts={shifts}/></>;
      default:
        return <div>Select an item</div>;
    }
  };

  return (
    <div className="main-content-root">
      <MainHeader
     
        user  = {user}
        setActiveItem={setActiveItem}
    
        showHeaderControls={showHeaderControls}
      />
      <div className="main-content">{renderContent()}</div>
    </div>
  );
};

export default MainContent;
