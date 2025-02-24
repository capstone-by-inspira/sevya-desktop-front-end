import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { logoutUser } from "../../api/loginApi";
// import logo from "/src/resources/assets/Logo/icon-logo.png";
// import togatherLogo from '../resources/assets/Logo/togather-logo.png'
import '../App.css'
const SideBar = ({ activeItem, setActiveItem , user }) => {
  const navigate = useNavigate();

  return (
    <>
      <aside className="sidebar-container">
     
        <nav>
          <a
            onClick={() => setActiveItem("home")}
            className={`nav-item ${activeItem === "myevents" ? "active" : ""}`}
          >
            Home
          </a>

          <a
            onClick={() => setActiveItem("caregiver")}
            className={`nav-item ${activeItem === "overview" ? "active" : ""}`}
          >
            Caregiver
          </a>

          <a
            onClick={() => setActiveItem("patients")}
            className={`nav-item ${activeItem === "overview" ? "active" : ""}`}
          >
            Patients
          </a>

          <a
            onClick={() => setActiveItem("shifts")}
            className={`nav-item ${activeItem === "overview" ? "active" : ""}`}
          >
            Shifts
          </a>

          <a
            className={`nav-item`}
          >
            Hello {user.name}
          </a>
        </nav>
      </aside>
    </>
  );
};

export default SideBar;
