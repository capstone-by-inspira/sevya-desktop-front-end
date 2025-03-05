import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const RefreshHandler = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
  console.log(token);
    if (token) {
      setIsAuthenticated(true);

      if (
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/landingPage"
      ) {
        navigate("/home", { replace: true });
      }
    }  else {

    }
  }, [location.pathname, navigate, setIsAuthenticated]);


  
  
  return null;
};