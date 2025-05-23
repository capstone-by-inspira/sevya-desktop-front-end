import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import PatientForm from "../components/PatientForm";
import CaregiverForm from "../components/CaregiverForm";
import CaregiverAvailabilityChart from "../components/CaregiverAvailabilityChart";
import CaregiverShiftPieChart from "../components/CaregiverShiftDistrubutionChart";
import landingImage from "../assets/dashboard-page.png";
import DashboardCard from "../components/DashboardCardCaregivers";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import DashboardCardCaregivers from "../components/DashboardCardCaregivers";
import DashboardCardPatients from "../components/DashboardCardPatients";
import EmergencyOccurrenceList from "../components/EmergencyOccurenceList";
import InfoIcon from "@mui/icons-material/Info";
import { InfoOutlined } from "@mui/icons-material";
import PatientOccupancyChart from "../components/PatientsOccupanyChart";
import SevyaLoader from "../components/SevyaLoader";
import EmergencyModal from "../components/EmergencyModal";
const Dashboard = ({
  caregivers,
  patients,
  user,
  occ,
  setActiveItem,
  refreshData,
}) => {
  console.log(occ, ">>>>>>>>>>");
  console.log(setActiveItem, "asasas");

  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    console.log(patients, "cc.>>>>>>.");
    if (caregivers.length == 0 && patients.length == 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [caregivers, patients]);

  return (
    <>
      
      {loading ? <div className="dashboard-loader">
        <SevyaLoader />
        </div> : <></>}
      <div className="dashboard-page">
        <div className="dashboard-header">
          <img src={landingImage} />
        </div>

        <div className="dashboard-body">
          <h4>Dashboard</h4>
          <div className="dashboard-first-container">
            <div className="dashboard-left-container">
              <CaregiverShiftPieChart
                data={patients}
                chartTitle={"Number of Patients"}
              />
            </div>

            <div className="dashboard-right-container">
              <PatientOccupancyChart
                patients={patients}
                chartTitle={"Patients Ocuupancy Chart"}
              />
            </div>
          </div>
          <div className="dashboard-second-container">
            <div className="dashboard-left-container">
              <CaregiverAvailabilityChart caregivers={caregivers} />
            </div>

            <div className="dashboard-right-container">
              <CaregiverShiftPieChart
                data={caregivers}
                chartTitle={"Number of Caregivers"}
              />
            </div>
          </div>
        </div>

        <div className="dashboard-footer">
          <div className="list-main">
            <div className="list-header">
              <h4>Patient Management</h4>
            </div>
            <div className="list-body">
              <ul className="list-content">
                {patients.slice(0, 2).map((c) => (
                  <div key={c.id}>
                    <DashboardCardPatients
                      patients={c}
                      refreshData={refreshData}
                      setActiveItem={setActiveItem}
                    />
                  </div>
                ))}
              </ul>
              <div className="list-footer">
                <div
                  className="view-more-button"
                  onClick={() => setActiveItem("patients")}
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.83333 4.5H14.5M5.83333 8.5H14.5M5.83333 12.5H14.5M2.5 4.5H2.50667M2.5 8.5H2.50667M2.5 12.5H2.50667"
                      stroke="#25578E"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span>View All</span>
                </div>
              </div>
            </div>
          </div>

          <div className="list-main">
            <div className="list-header"><h4>Caregivers Management</h4></div>
            <div className="list-body">
              <ul className="list-content">
                {caregivers.slice(0, 2).map((c) => (
                  <div key={c.id}>
                    <DashboardCardCaregivers
                      caregivers={c}
                      setActiveItem={setActiveItem}
                    />
                  </div>
                ))}
              </ul>
            </div>
            <div className="list-footer">
              <div
                className="view-more-button"
                onClick={() => setActiveItem("caregiver")}
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.83333 4.5H14.5M5.83333 8.5H14.5M5.83333 12.5H14.5M2.5 4.5H2.50667M2.5 8.5H2.50667M2.5 12.5H2.50667"
                    stroke="#25578E"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>View All</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-emergency-container">
          <div className="dashboard-emergency-header">
            <div className="dashboard-emergency-left-container">
              <InfoOutlined></InfoOutlined>
              <h5>Emergency Occurences</h5>
            </div>
            <div className="dashboard-emergency-right-container">
              <h5>Total Emergency Occurences till today : {occ.length}</h5>
            </div>
          </div>
          <EmergencyOccurrenceList occurrences={occ} caregivers={caregivers} />
        </div>

        <PatientForm />

        {/* <CaregiverForm/> */}
        {/* <EmergencyModal occurrences={occ} caregivers={caregivers}/> */}
      </div>
    </>
  );
};

export default Dashboard;
