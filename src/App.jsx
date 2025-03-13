import { useState, useEffect } from "react";

import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useParams,
} from "react-router-dom";
import { AuthProvider } from "./services/auth.jsx";
// import Home from "./pages/HomePage";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";

// import Navbar from './components/NavbarComponent.jsx'
import {HomePage} from './pages/HomePage.jsx';
import Login from './pages/LoginPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import {Signup} from './pages/SignUp.jsx';
import {RefreshHandler} from './pages/RefreshHandler.jsx'




const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRouter = ({ element }) => {
    const token = localStorage.getItem("token");
    return token ? element : <Navigate to="/login" />;
  };

  return (
      //  <Navbar />
         
<>
        <RefreshHandler setIsAuthenticated={setIsAuthenticated} />

        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={<PrivateRouter element={<HomePage />} />}
          />

          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        </>
    
  );
};

export default App
