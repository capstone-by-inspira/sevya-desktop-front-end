import React, { useEffect, useState } from 'react';

import { useNavigate } from "react-router-dom";



const MainHeader = () => {
   
  

       
const navigate = useNavigate();
 
  
    return (

        <header className="main-header-root">
         HEADER
         <button onClick = {()=>{
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
         }}> LOGOUT</button>
               

        </header >
    );
};

export default MainHeader;