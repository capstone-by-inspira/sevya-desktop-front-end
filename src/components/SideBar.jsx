import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { logoutUser } from "../../api/loginApi";
// import logo from "/src/resources/assets/Logo/icon-logo.png";
import logo from '../assets/logo.png'
import "../App.css";
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const SideBar = ({ activeItem, setActiveItem, user }) => {
  const navigate = useNavigate();

  return (
    <div className="sidebar-main">
      {/* <div className="sidebar-header">
        
      </div> */}
      <div className="sidebar-body">
        <div className="sidebar-header-wrapper">
          <div className="logo-image"><img src={logo}/></div>
          <div className="logo-slogan">
            <p>Sevya</p>
            <p>To serve and care</p>
          </div>
        </div>
        <aside className="sidebar-inside-container">
          <nav className="sidebarnav">
            <div className="sidebaricons">
             
              <a
                onClick={() => setActiveItem("home")}
                className={`nav-item ${
                  activeItem === "home" ? "active" : ""
                }`}
              >
                <HomeIcon /> <div className="nav-item-label">Home</div>
              </a>
            </div>
            <div className="sidebaricons">
              
              <a
                onClick={() => setActiveItem("caregiver")}
                className={`nav-item ${
                  activeItem === "caregiver" ? "active" : ""
                }`}
              >
              <FavoriteIcon />  <div className="nav-item-label">Caregiver</div>
              </a>
            </div>
            <div className="sidebaricons">
             
              <a
                onClick={() => setActiveItem("patients")}
                className={`nav-item ${
                  activeItem === "patients" ? "active" : ""
                }`}
              >
              <PeopleIcon />   <div className="nav-item-label">Patients</div>
              </a>
            </div>
            <div className="sidebaricons">
              
              <a
                onClick={() => setActiveItem("shifts")}
                className={`nav-item ${
                  activeItem === "shifts" ? "active" : ""
                }`}
              >
           <CalendarTodayIcon />     <div className="nav-item-label">Shifts</div>
              </a>
            </div>
          </nav>
        </aside>
      </div>

    </div>
  );
};

export default SideBar;
