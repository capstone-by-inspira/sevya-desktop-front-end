import React from 'react';
import '../components/css/MainContentHome.css'
import PatientsManagement from "../components/PatientsManagement";
import CaregiverManagement from "../components/CaregiverManagement";

const MainContentHome = () => {
 
    return (
          <div>
            <div>
              <h1>Welcome, Sara!</h1>
              <p>Admin Portal</p>
            </div>
            <div className='MainContentHome1'>
              <p>Graphic1</p>
              <p>Graphic2</p>
              <p>Graphic3</p>
              <p>Graphic4</p>
              <PatientsManagement/>
              <CaregiverManagement/>
            </div>
            <div>
                <h2>Emergency Occurrencies</h2>
                <div>No occurrences</div>
            </div>
          </div>
    
        
      );
    };

export default MainContentHome;