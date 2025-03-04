import React from 'react';

import PatientCardHome from "./PatientCardHome";

const PatientsManagement = () => {
 
    return (
        <section className='OpenShiftsCardSection'>
            <div className='OpenShiftsCard'>
                <h2>Patients Management</h2>
                
                <div>
                    <PatientCardHome/>
                    <PatientCardHome/>
                </div>
                <a href="#">Add Patient</a>
            </div>
        </section>
    );
};

export default PatientsManagement;