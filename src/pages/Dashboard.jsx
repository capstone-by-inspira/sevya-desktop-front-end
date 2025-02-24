import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

const logout = () =>{
    localStorage.removeItem('token');
    navigate('/login');
}  

  return (
    <div>
      <h2>Welcome</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
