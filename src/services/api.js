import axios from "axios";
import { auth, provider } from "./firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
const API_URL = "http://localhost:8800/api";



export const signup = async (email, password, name, collectionName) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, { email, password, name, collectionName:collectionName });
    return response.data;
  } catch (error) {
    console.error("Signup Error:", error);
    throw error;
  }
};

  
  


// Logout
export const logout = () => {
  localStorage.removeItem("token");
  window.location.reload();
};


// crud functions



const token = localStorage.getItem("token");

export const createUser = async (name, email) => {
  const response = await axios.post(
    `${API_URL}/users`,
    { name, email },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateUser = async (id, name, email) => {
  const response = await axios.put(
    `${API_URL}/users/${id}`,
    { name, email },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
