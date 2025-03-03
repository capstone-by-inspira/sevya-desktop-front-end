import { useContext, useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import PatientForm from "../components/PatientForm";
import CaregiverForm from "../components/CaregiverForm";


const Dashboard = () => {

  


  return (
    <div>
      <h2>Welcome</h2>
      
     <PatientForm />

     
<CaregiverForm/>
    </div>
  );
};

export default Dashboard;
