import { useContext, useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import PatientForm from "../components/PatientForm";
import CaregiverForm from "../components/CaregiverForm";


const Dashboard = ({caregivers, patients, user}) => {

  console.log(user);


  return (
    <div>

      <h3>Total Caregivers : {caregivers.length}</h3>
      <h3>Total Patients : {patients.length}</h3>

      
     <PatientForm />

     
<CaregiverForm/>
    </div>
  );
};

export default Dashboard;
