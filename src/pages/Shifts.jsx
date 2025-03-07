import React from 'react'

import { useContext, useEffect, useState } from "react";
import { getDocuments } from "../services/api";
import ShiftDrag from '../components/ShiftTable';
import ShiftScheduleBoard from '../components/ShiftScheduleBoard';
import TestMain from '../components/TestMain';
import ShiftMainBoardTable from '../components/ShiftMainBoardTable';

const Shifts = ({refreshData, caregivers, patients, shifts}) => {

  return (
    <div>
        {/* <ShiftScheduleBoard refreshData={refreshData} caregivers={caregivers} patients={patients} shifts={shifts}/> */}
      {/* <ShiftDrag refreshData={refreshData} caregivers={caregivers} patients={patients} shifts={shifts}/> */}
      {/* <ShiftDrag refreshData={refreshData} caregivers={caregivers} patients={patients} shifts={shifts} /> */}
      <ShiftMainBoardTable refreshData={refreshData} caregivers={caregivers} patients={patients} shifts={shifts} />
  {/* <TestMain refreshData={refreshData} caregivers={caregivers} patients={patients} shifts={shifts}/> */}

    </div>
  )
}

export default Shifts
