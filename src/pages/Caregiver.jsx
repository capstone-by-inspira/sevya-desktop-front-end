import React from 'react'
import { useContext, useEffect, useState } from "react";

import CaregiverForm from '../components/CaregiverForm'
import CaregiverList from '../components/CaregiverList';
import { getDocuments } from "../services/api";


const Caregiver = ({caregivers,refreshData}) => {
 
  return (
    <div>
       Sign up for caregiver
      <CaregiverForm refreshData={refreshData}  />
      <CaregiverList caregivers={caregivers} refreshData={refreshData} />

    </div>
  )
}

export default Caregiver
