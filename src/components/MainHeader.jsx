import React, { useEffect, useState } from 'react';
// import '../css/MainHeader.css';
// import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
// import Modal from './ModalPopupBox';
// import { createDataInMongo } from '../../api/mongoRoutingFile';
// import { logoutUser, saveTasksToDatabase } from '../../api/loginApi';
// import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";



const MainHeader = ({ onCreateEvent, setActiveItem, myEvents, setMyEvents, setEventId, showHeaderControls }) => {
   
  

       
const navigate = useNavigate();
 
  
    return (

        <header className="main-header-root">
         HEADER
         <button onClick = {()=>{
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
         }}> LOGOUT</button>
               

        </header >
    );
};

export default MainHeader;