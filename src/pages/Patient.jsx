import React from 'react'

import PatientForm from '../components/PatientForm';
import PatientList from '../components/PatientList';


const Patient = ({patients, refreshData}) => {

  return (
    <div>
      <PatientForm refreshData={refreshData}/>
      <PatientList patients={patients} refreshData={refreshData} />

    </div>
  )
}

export default Patient
