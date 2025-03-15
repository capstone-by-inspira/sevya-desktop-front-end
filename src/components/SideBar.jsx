import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { logoutUser } from "../../api/loginApi";
// import logo from "/src/resources/assets/Logo/icon-logo.png";
import logo from '../assets/logo.png'
import "../App.css";
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
            <p>SEVYA</p>
            <p>To serve and care</p>
          </div>
        </div>
        <aside className="sidebar-inside-container">
          <nav>
            <a
              onClick={() => setActiveItem("home")}
              className={`nav-item ${
                activeItem === "home" ? "active" : ""
              }`}
            >
              Home
            </a>

            <a
              onClick={() => setActiveItem("caregiver")}
              className={`nav-item ${
                activeItem === "caregiver" ? "active" : ""
              }`}
            >
              Caregiver
            </a>

            <a
              onClick={() => setActiveItem("patients")}
              className={`nav-item ${
                activeItem === "patients" ? "active" : ""
              }`}
            >
              Patients
            </a>

            <a
              onClick={() => setActiveItem("shifts")}
              className={`nav-item ${
                activeItem === "shifts" ? "active" : ""
              }`}
            >
              Shifts
            </a>
          </nav>
        </aside>
      </div>

    </div>
  );
};

export default SideBar;
