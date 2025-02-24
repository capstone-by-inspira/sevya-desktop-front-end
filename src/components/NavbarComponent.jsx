import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../services/auth";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
