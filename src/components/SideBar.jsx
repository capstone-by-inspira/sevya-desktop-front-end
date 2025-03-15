import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { logoutUser } from "../../api/loginApi";
// import logo from "/src/resources/assets/Logo/icon-logo.png";
// import togatherLogo from '../resources/assets/Logo/togather-logo.png'
import "../App.css";
import logo from '../assets/logo.png'
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const SideBar = ({ activeItem, setActiveItem, user }) => {
  const navigate = useNavigate();

  return (
    <div className="sidebar-main">
      {/* <div className="sidebar-header"></div> */}
      <div className="sidebar-body">
        <div className="sidebarlogo">
          <img src={logo} alt="Logo" />
          <div>
            <h3>Sevya</h3>
            <p>To Serve and Care</p>
          </div>
        </div>
        <aside className="sidebar-inside-container">
          <nav className="sidebarnav">
            <div className="sidebaricons">
              <HomeIcon />
              <a
                onClick={() => setActiveItem("home")}
                className={`nav-item ${
                  activeItem === "home" ? "active" : ""
                }`}
              >
                Home
              </a>
            </div>
            <div className="sidebaricons">
              <FavoriteIcon />
              <a
                onClick={() => setActiveItem("caregiver")}
                className={`nav-item ${
                  activeItem === "caregiver" ? "active" : ""
                }`}
              >
                Caregiver
              </a>
            </div>
            <div className="sidebaricons">
              <PeopleIcon />
              <a
                onClick={() => setActiveItem("patients")}
                className={`nav-item ${
                  activeItem === "patients" ? "active" : ""
                }`}
              >
                Patients
              </a>
            </div>
            <div className="sidebaricons">
              <CalendarTodayIcon />
              <a
                onClick={() => setActiveItem("shifts")}
                className={`nav-item ${
                  activeItem === "shifts" ? "active" : ""
                }`}
              >
                Shifts
              </a>
            </div>
          </nav>
        </aside>
      </div>

      <div className="sidebar-footer">ADMIN ~ {user.name}</div>
    </div>
  );
};

export default SideBar;
