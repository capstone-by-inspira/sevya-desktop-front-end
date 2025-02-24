import React, { useState, useEffect } from "react";
//  import Overview from "./Overview";
// import BudgetCalculator from "./BudgetCalculator";
// import GuestManagementMain from "./GuestManagementMain";
// import Collaborators from "./Collaborators";
// import VendorsList from "./VendorsList";
// import VendorMain from "./VendorMain";
import MainHeader from "./MainHeader";
import Caregiver from "../pages/Caregiver";
// import UserProfile from "./UserProfile";
// import {
//   readDataFromMongoWithParam,
//   readCollaboratorsEventsFromMongo,
//   readDataFromMongoBasedOnEmail,
// } from '../../api/mongoRoutingFile';

const MainContent = ({
  activeItem,
  setActiveItem,

 

}) => {
  const [showHeaderControls, setShowHeaderControls] = useState(false);

  const renderContent = () => {
    switch (activeItem) {
      case "home":
        return <>home page</>;
      case "caregiver":
        return <><Caregiver/></>;
      case "patients":
        return <>patients page</>;
      case "shifts":
        return <>shifts page</>;
      
      default:
        return <div>Select an item</div>;
    }
  };

  return (
    <div className="main-content-root">
      <MainHeader
     
        
        setActiveItem={setActiveItem}
    
        showHeaderControls={showHeaderControls}
      />
      <div className="main-content">{renderContent()}</div>
    </div>
  );
};

export default MainContent;
