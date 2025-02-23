import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const RefreshHandler = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userData = localStorage.getItem("token");
    const token = localStorage.getItem("token");

    // const token = userData ? JSON.parse(userData).token : null;
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
      // if (
      //   location.pathname !== "/landingPage" &&
      //   location.pathname !== "/signup" &&
      //   location.pathname !== "/vendor-login"
      // ) {
      //   navigate("/login", { replace: true });
      // }
    }
  }, [location.pathname, navigate, setIsAuthenticated]);

  // ammy
  
  
  return null;
};