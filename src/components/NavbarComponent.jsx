import { useContext } from "react";
import { AuthContext } from "../services/auth";
import { Link } from "react-router-dom";
import { logout } from "../services/api";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
