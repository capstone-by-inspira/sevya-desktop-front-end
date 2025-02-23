const Logout = ({ setUser }) => {
    const handleLogout = () => {
      localStorage.removeItem("token");
      setUser(null);
    };
  
    return <button onClick={handleLogout}>Logout</button>;
  };
  
  export default Logout;
  