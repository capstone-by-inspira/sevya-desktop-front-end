import React from 'react'
import CaregiverSignupForm from '../components/CaregiveSignupForm'
import CaregiverList from '../components/CaregiverList'

const Caregiver = () => {
  return (
    <div>
       Sign up for caregiver
      <CaregiverSignupForm/>
      <CaregiverList/>
    </div>
  )
}

export default Caregiver
