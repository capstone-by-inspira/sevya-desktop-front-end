import { useContext, useEffect } from "react";
import { AuthContext } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="container">
      <h1>Welcome, {user.displayName || "User"}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
