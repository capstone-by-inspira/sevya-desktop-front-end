import React from 'react';

import CaregiverCardHome from "../components/CaregiverCardHome";

const CaregiverManagement = () => {
 
    return (
        <section className='OpenShiftsCardSection'>
            <div className='OpenShiftsCard'>
                <h2>Caregivers Management</h2>
                
                <div>
                    <CaregiverCardHome/>
                    <CaregiverCardHome/>
                </div>
                <a href="#">Add Caregiver</a>
            </div>
        </section>
    );
};

export default CaregiverManagement;