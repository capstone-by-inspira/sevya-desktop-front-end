import React from 'react'

import { useContext, useEffect, useState } from "react";
import { getDocuments } from "../services/api";
import ShiftDrag from '../components/ShiftDrag';
import ShiftScheduleBoard from '../components/ShiftScheduleBoard';
import TestMain from '../components/TestMain';

const Shifts = ({refreshData, caregivers, patients, shifts}) => {



  return (
    <div>
        <ShiftScheduleBoard refreshData={refreshData} caregivers={caregivers} patients={patients} shifts={shifts}/>
      {/* <ShiftDrag refreshData={refreshData} caregivers={caregivers} patients={patients} shifts={shifts}/> */}
      {/* <ShiftDrag refreshData={refreshData} caregivers={caregivers} patients={patients} shifts={shifts} /> */}
  <TestMain refreshData={refreshData} caregivers={caregivers} patients={patients} shifts={shifts}/>

    </div>
  )
}

export default Shifts
