import React from 'react'
import { useContext, useEffect, useState } from "react";

import {deleteDocument, deleteUserFromAuthentication} from '../services/api'

const CaregiverList = ({caregivers, refreshData}) => {
    const token = localStorage.getItem("token");

    const handleDelete = async (id) => {
        await deleteDocument("caregivers", id, token);
        await deleteUserFromAuthentication(id);
        refreshData(); 
      };

   
  return (
    <div>
       <h3>Caregiver List</h3>
      <ul>
        {caregivers.map((caregiver) => (
          <li key={caregiver.id}>
            {caregiver.firstName} {caregiver.lastName} - {caregiver.email}
            <button onClick={() => handleEdit(caregiver)}>Edit</button>
            <button onClick={() => handleDelete(caregiver.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CaregiverList
