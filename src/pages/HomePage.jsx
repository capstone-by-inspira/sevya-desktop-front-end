import React, { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import MainContent from "../components/MainContent";
import { getDocuments } from "../services/api";
import { useNavigate } from "react-router-dom";
import '../index.css';

export const HomePage = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("home");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [caregivers, setCaregivers] = useState([]);
  const [patients, setPatients] = useState([]);
  const [shifts, setShifts] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
     
      fetchPatients();
      fetchCaregivers();
      fetchShifts();
    }else{
      console.log('tttttttt');
    }
  }, [token]);

  const fetchCaregivers = async () => {
    const result = await getDocuments("caregivers", token);
    if (result.success) {
      setCaregivers(result.data);
    } else {
      console.error(result.error);
    }
  };

  const fetchPatients = async () => {

    const result = await getDocuments("patients", token);
    console.log( result, 'ckjdsabkjbcasca')

    if (result.success) {

      setPatients(result.data);
    } else {
      console.error(result.error);
    }
  };

  const fetchShifts = async () => {
    const result = await getDocuments("shifts", token);
    if (result.success) {
      setShifts(result.data);
    } else {
      console.error(result.error);
    }
  };

  const refreshData = () => {
    fetchPatients();
    fetchCaregivers();
    fetchShifts();
  };

  return (
    <>
      <div className="main-container">
        <div className="sidebar-container">
          <SideBar
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            user={user}
          />
        </div>
        <div className="main-content-container">

          <MainContent
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            patients={patients}
            caregivers={caregivers}
            refreshData={refreshData}
            shifts={shifts}
            user={user}
          />
        </div>
      </div>
    </>
  );
};
