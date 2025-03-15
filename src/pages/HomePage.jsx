import React, { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import MainContent from "../components/MainContent";
import { getDocuments } from "../services/api";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("home");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [caregivers, setCaregivers] = useState([]);
  const [patients, setPatients] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [occurences, setOccurences] = useState([]);
  const [websocket, setWebsocket] = useState(null); // State to hold the WebSocket instance

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
    const ws = new WebSocket("ws://192.168.1.212:8800");

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
    console.log(result, "ckjdsabkjbcasca");

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
    console.log(result, 'occc');
    if (result.success) {
      setOccurences(result.data);
    } else {
      console.error(result.error);
    }
  };


  const refreshData = () => {
    fetchPatients();
    fetchCaregivers();
    fetchShifts();
    fetchOccurences();
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
            occurences={occurences}
          />
        </div>
      </div>
    </>
  );
};