import { useState, useEffect } from "react";

import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useParams,
} from "react-router-dom";
import { AuthProvider } from "./services/auth.jsx";
import toast, { Toaster } from 'react-hot-toast';

// import Home from "./pages/HomePage";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";

// import Navbar from './components/NavbarComponent.jsx'
import {HomePage} from './pages/HomePage.jsx';
import Login from './pages/LoginPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import {Signup} from './pages/SignUp.jsx';
import {RefreshHandler} from './pages/RefreshHandler.jsx'


const isTokenExpired = (token) => {
  if (!token) return true;
  const payload = JSON.parse(atob(token.split('.')[1])); // Decoding JWT payload
  const expirationTime = payload.exp * 1000; // Expiration time in milliseconds
  return expirationTime < Date.now(); // Returns true if the token is expired
};


const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRouter = ({ element }) => {
    const token = localStorage.getItem("token");
    if (isTokenExpired(token)) {
      localStorage.removeItem("token"); // Optionally, remove expired token
      toast.error("Session expired. Please log in again.");
      return <Navigate to="/login" />;
    }
    return token ? element : <Navigate to="/login" />;
  };




  return (
      //  <Navbar />
         
<>
{/* <Toaster position="top-right" reverseOrder={false} /> */}
<RefreshHandler setIsAuthenticated={setIsAuthenticated} />

        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={<PrivateRouter element={<HomePage />} />}
          />

          <Route path="/signup" element={<Signup />} />
          <Route
          path="/dashboard"
          element={<PrivateRouter element={<Dashboard />} />}
        />

        </Routes>

        </>
    
  );
};

export default App
