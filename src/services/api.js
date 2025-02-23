import axios from "axios";

const API_URL = "http://localhost:8800/api";

// Google Login
export const loginWithGoogle = () => {
  window.open(`${API_URL}/auth/google`, "_self");
};

// Email/Password Login
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
console.log(response , 'agya eh v');
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));


    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Login failed");
  }
};

// Email/Password Signup
export const signUpUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { email, password });
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Signup failed");
  }
};

// Check User Authentication
export const checkUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const response = await axios.get(`${API_URL}/protected`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch {
    return null;
  }
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
  window.location.reload();
};
