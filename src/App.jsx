import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./services/auth.jsx";
// import Home from "./pages/HomePage";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";

import Navbar from './components/NavbarComponent.jsx'
import Home from './pages/HomePage.jsx';
import Login from './pages/LoginPage.jsx';
import Dashboard from './pages/Dashboard.jsx';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
