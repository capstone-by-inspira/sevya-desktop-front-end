import React, { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import MainContent from "../components/MainContent";
import { getDocuments } from "../services/api";
import { useNavigate } from "react-router-dom";
import {WS_URL} from '../services/api'
import '../index.css';
import Loader from "../components/SevyaLoader";

export const HomePage = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("home");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [caregivers, setCaregivers] = useState([]);
  const [patients, setPatients] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [occurences, setOccurences] = useState([]);
  const [websocket, setWebsocket] = useState(null); // State to hold the WebSocket instance
const [newNotification, setNewNotification] = useState(null);

const [triggerAlert, setTriggerAlert] = useState([]);

  const token = localStorage.getItem("token");


  useEffect(() => {
    if (token) {
      fetchPatients();
      fetchCaregivers();
      fetchShifts();
      fetchOccurences();
    } else {
      console.log("No token found");
    }
  }, [token]);

  // Set up WebSocket connection
  useEffect(() => {
    // Create a new WebSocket connection
    const ws = new WebSocket(WS_URL);

    // Set the WebSocket instance in state
    setWebsocket(ws);

    // Handle connection open
    ws.onopen = () => {
      console.log("WebSocket connection established");
      // Send the token for authentication
      ws.send(JSON.stringify({ type: "auth", token }));
    };

    // Handle incoming messages
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("WebSocket message received:", data);
      // Refresh data when a new message is received
      refreshData();

      if(data.collection == 'notificationsWeb'){
        setNewNotification(data.data);
        console.log(data.data, 'notifiacatiosssss');
      }
      if(data.collection == 'emergency'){
        const alertData = {
          ...data.data,
          alert:true,
        }
        setTriggerAlert(alertData);
      }else{
        setTriggerAlert([]);
      }
      // notification(data);
    };

    // Handle connection errors
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Handle connection close
    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Clean up the WebSocket connection on unmount
    return () => {
      ws.close();
    };
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
  //  console.log(result, "ckjdsabkjbcasca");

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

  const fetchOccurences = async () => {
    const result = await getDocuments("emergency", token);
  //  console.log(result, 'occc');
    if (result.success) {
      setOccurences(result.data);
    } else {
      console.error(result.error);
    }
  };

  const fetchNotifications = async () => {
    const result = await getDocuments("notifications", token);
  //  console.log(result, 'notifications');
    if (result.success) {
     // setNewNotification(result.data);
    } else {
      console.error(result.error);
    }
  };

  // const notification = (data) =>{

  //   setNewNotification(data);

  // }

  const refreshData = () => {
    fetchPatients();
    fetchCaregivers();
    fetchShifts();
    fetchOccurences();
  };

  return (
    <>
    <div className="root-not-available">
      <div className="root-not-logo">
      <svg width="146" height="146" viewBox="0 0 146 146" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100.823 47.6661C100.823 49.9437 100.172 52.0695 99.0481 53.8682C96.9784 57.176 93.3062 59.3742 89.1178 59.3742C85.7586 59.3742 82.7312 57.9586 80.5937 55.6926C78.6222 53.5972 77.4121 50.773 77.4121 47.6661C77.4121 46.8462 77.4962 46.0473 77.6574 45.2764C78.76 39.9573 83.4717 35.9604 89.1178 35.9604C93.937 35.9604 98.0764 38.8734 99.8681 43.0339C100.485 44.4541 100.823 46.0216 100.823 47.6661Z" fill="#3ADDC1"/>
<path d="M107.117 80.5897L105.65 82.059L73.1211 114.588V100.712L98.712 75.1211L100.181 73.6541C105.356 68.4775 105.356 60.0562 100.179 54.8797C99.8192 54.5199 99.4408 54.1812 99.0484 53.8682C100.172 52.0695 100.824 49.9437 100.824 47.6661C100.824 46.0216 100.485 44.4541 99.8683 43.0338C102.503 44.1551 104.968 45.7926 107.117 47.9417C116.134 56.9587 116.134 71.5751 107.117 80.5897Z" fill="#3ADDC1"/>
<path d="M73.1215 0V16.0764C104.503 16.1418 129.924 41.6018 129.924 73C129.924 104.398 104.503 129.856 73.1215 129.921V146C113.382 145.935 146 113.277 146 73C146 32.7227 113.382 0.065408 73.1215 0ZM0.121472 77.2235V68.7788C0.039712 70.1758 0 71.582 0 73C0 74.418 0.039712 75.8266 0.121472 77.2235Z" fill="#77A2C9"/>
<path d="M16.077 73C16.077 104.438 41.5627 129.921 73.0006 129.921H73.1221V146H73.0006C34.1015 146 2.30857 115.576 0.12207 77.2235V68.7788C2.30857 30.4264 34.1015 0 73.0006 0H73.1221V16.0764H73.0006C41.5627 16.0764 16.077 41.5621 16.077 73Z" fill="#578FCA"/>
<path d="M73.1206 100.712V114.588L72.9991 114.709L40.3489 82.0591L38.8819 80.5897C29.8649 71.5751 29.8649 56.9588 38.8819 47.9418C41.031 45.7927 43.4955 44.1551 46.1305 43.0339C47.9222 38.8734 52.0616 35.9604 56.8807 35.9604C62.5269 35.9604 67.2386 39.9573 68.3412 45.2764C68.5023 46.0473 68.5864 46.8462 68.5864 47.6661C68.5864 50.773 67.3764 53.5972 65.4048 55.6926C63.2674 57.9586 60.2399 59.3742 56.8807 59.3742C52.6923 59.3742 49.0201 57.176 46.9504 53.8682C46.558 54.1812 46.1795 54.52 45.8198 54.8797C43.3109 57.3862 41.9303 60.7197 41.9303 64.2658C41.9303 67.8118 43.3109 71.1453 45.8174 73.6541L47.2868 75.1212L72.9991 100.834L73.1206 100.712Z" fill="#0FBFAE"/>
</svg>

      </div>
      <Loader/>
<div className="root-not-content">
  <h2 className="font-weight-500">Please open the Sevya portal on Web !</h2>
</div>
      </div>

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
            occurences={occurences}
            newNotification={newNotification}
            triggerAlert={triggerAlert}
          />
        </div>
      </div>
    </>
  );
};