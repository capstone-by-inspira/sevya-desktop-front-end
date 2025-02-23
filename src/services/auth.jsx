import { createContext, useState, useEffect } from "react";
import { checkUser } from "./api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    console.log(storedUser+ 'a');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData, token) => {
    console.log(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      console.log(JSON.parse(storedUser));
      setUser(JSON.parse(storedUser));
    } else {
      checkUser().then((data) => {
        if (data) {
          localStorage.setItem("user", JSON.stringify(data));
          setUser(data);
        }
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
