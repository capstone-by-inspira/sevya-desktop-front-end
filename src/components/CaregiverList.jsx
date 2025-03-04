import React from 'react';
import CaregiverCard from "../components/CaregiverCard";

import { FaSearch } from 'react-icons/fa';   //npm install react-icons
import '../components/css/CaregiverList.css'

const CaregiverList = () => {
 
    return (
          <div>
            <div>
              <h1>Welcome, Sarah!</h1>
              <p>Caregivers</p>
            </div>
            <div className="search-container-caregiver">
                <FaSearch className="search-icon" />
                <input 
                type="text" 
                placeholder="Search caregiver by name or any related keywords" 
                className="search-input"
                />
            </div>
            <div className='caregiverList1'>
                <p>Name</p>
                <p>Specialization</p>
                <p>Contact</p>
            </div>
            <div className='caregiverList2'>
                <CaregiverCard/>
                <CaregiverCard/>
                <CaregiverCard/>
                <CaregiverCard/>
            </div>
        </div>
    
        
      );
    };

export default CaregiverList;