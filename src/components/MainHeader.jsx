import React, { useEffect, useState } from 'react';

import { useNavigate } from "react-router-dom";



const MainHeader = ({user}) => {
   
  

       
const navigate = useNavigate();
 
  
    return (

        <header className="main-header-root">
         Welcome {user.name}
         <button onClick = {()=>{
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
         }}> LOGOUT</button>
               

        </header >
    );
};

export default MainHeader;