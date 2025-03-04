import React from 'react';
import OnGoingShiftsCardDesktop from "../components/OnGoingShiftsCardDesktop";
import OpenShiftsCard from "../components/OpenShiftsCard";
import AllShiftsCard from "../components/AllShiftsCard";
import TomorrowShiftsCard from "../components/TomorrowShiftsCard";

import '../components/css/Shifts.css'

const Shifts = () => {
 
    return (
          <div>
            <div>
              <h1>Welcome, Sara!</h1>
              <p>Shifts</p>
            </div>
            <div className='Shiftscards1'>
              <OpenShiftsCard/>
              <div className='Shiftscards2'>
                <AllShiftsCard/>
              </div>
              <OnGoingShiftsCardDesktop/>
              <TomorrowShiftsCard/>
            </div>
          </div>
    
        
      );
    };

export default Shifts;