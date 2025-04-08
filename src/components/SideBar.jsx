import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { logoutUser } from "../../api/loginApi";
// import logo from "/src/resources/assets/Logo/icon-logo.png";
import logo from "../assets/logo.png";
import "../App.css";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PeopleIcon from "@mui/icons-material/People";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const SideBar = ({ activeItem, setActiveItem, user }) => {
  const navigate = useNavigate();

  return (
    <div className="sidebar-main">
      {/* <div className="sidebar-header">
        
      </div> */}
      <div className="sidebar-body">
        <div className="sidebar-header-wrapper">
          <div className="logo-image">
            <svg
              width="45"
              height="45"
              viewBox="0 0 146 146"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100.823 47.6661C100.823 49.9437 100.172 52.0695 99.0481 53.8682C96.9784 57.176 93.3062 59.3742 89.1178 59.3742C85.7586 59.3742 82.7312 57.9586 80.5937 55.6926C78.6222 53.5972 77.4121 50.773 77.4121 47.6661C77.4121 46.8462 77.4962 46.0473 77.6574 45.2764C78.76 39.9573 83.4717 35.9604 89.1178 35.9604C93.937 35.9604 98.0764 38.8734 99.8681 43.0339C100.485 44.4541 100.823 46.0216 100.823 47.6661Z"
                fill="#3ADDC1"
              />
              <path
                d="M107.117 80.5897L105.65 82.059L73.1211 114.588V100.712L98.712 75.1211L100.181 73.6541C105.356 68.4775 105.356 60.0562 100.179 54.8797C99.8192 54.5199 99.4408 54.1812 99.0484 53.8682C100.172 52.0695 100.824 49.9437 100.824 47.6661C100.824 46.0216 100.485 44.4541 99.8683 43.0338C102.503 44.1551 104.968 45.7926 107.117 47.9417C116.134 56.9587 116.134 71.5751 107.117 80.5897Z"
                fill="#3ADDC1"
              />
              <path
                d="M73.1215 0V16.0764C104.503 16.1418 129.924 41.6018 129.924 73C129.924 104.398 104.503 129.856 73.1215 129.921V146C113.382 145.935 146 113.277 146 73C146 32.7227 113.382 0.065408 73.1215 0ZM0.121472 77.2235V68.7788C0.039712 70.1758 0 71.582 0 73C0 74.418 0.039712 75.8266 0.121472 77.2235Z"
                fill="#77A2C9"
              />
              <path
                d="M16.077 73C16.077 104.438 41.5627 129.921 73.0006 129.921H73.1221V146H73.0006C34.1015 146 2.30857 115.576 0.12207 77.2235V68.7788C2.30857 30.4264 34.1015 0 73.0006 0H73.1221V16.0764H73.0006C41.5627 16.0764 16.077 41.5621 16.077 73Z"
                fill="#578FCA"
              />
              <path
                d="M73.1206 100.712V114.588L72.9991 114.709L40.3489 82.0591L38.8819 80.5897C29.8649 71.5751 29.8649 56.9588 38.8819 47.9418C41.031 45.7927 43.4955 44.1551 46.1305 43.0339C47.9222 38.8734 52.0616 35.9604 56.8807 35.9604C62.5269 35.9604 67.2386 39.9573 68.3412 45.2764C68.5023 46.0473 68.5864 46.8462 68.5864 47.6661C68.5864 50.773 67.3764 53.5972 65.4048 55.6926C63.2674 57.9586 60.2399 59.3742 56.8807 59.3742C52.6923 59.3742 49.0201 57.176 46.9504 53.8682C46.558 54.1812 46.1795 54.52 45.8198 54.8797C43.3109 57.3862 41.9303 60.7197 41.9303 64.2658C41.9303 67.8118 43.3109 71.1453 45.8174 73.6541L47.2868 75.1212L72.9991 100.834L73.1206 100.712Z"
                fill="#0FBFAE"
              />
            </svg>
          </div>
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
                className={`nav-item ${activeItem === "home" ? "active" : ""}`}
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
                <FavoriteIcon /> <div className="nav-item-label">Caregiver</div>
              </a>
            </div>
            <div className="sidebaricons">
              <a
                onClick={() => setActiveItem("patients")}
                className={`nav-item ${
                  activeItem === "patients" ? "active" : ""
                }`}
              >
                <PeopleIcon /> <div className="nav-item-label">Patients</div>
              </a>
            </div>
            <div className="sidebaricons">
              <a
                onClick={() => setActiveItem("shifts")}
                className={`nav-item ${
                  activeItem === "shifts" ? "active" : ""
                }`}
              >
                <CalendarTodayIcon />{" "}
                <div className="nav-item-label">Shifts</div>
              </a>
            </div>
          </nav>
        </aside>
      </div>
    </div>
  );
};

export default SideBar;
