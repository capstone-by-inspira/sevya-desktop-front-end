import axios from "axios";
import { auth, provider } from "./firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import Caregiver from "../pages/Caregiver";
const API_URL = "http://localhost:8800/api";



export const signup = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, { user });
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

// export const createUser = async (name, email) => {
//   const response = await axios.post(
//     `${API_URL}/users`,
//     { name, email },
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   return response.data;
// };

// export const getUsers = async () => {
//   const response = await axios.get(`${API_URL}/users`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// };

// export const updateUser = async (id, name, email) => {
//   const response = await axios.put(
//     `${API_URL}/users/${id}`,
//     { name, email },
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   return response.data;
// };

// export const deleteUser = async (id) => {
//   const response = await axios.delete(`${API_URL}/users/${id}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// };



const apiRequest = async (method, endpoint, data = {}, token = "") => {
  console.log(method, 'method');
  console.log(endpoint, 'endpoint');
  console.log(data, 'data');
  console.log(token, 'token');
  try {
    const response = await axios({
      method,
      url: `${API_URL}/document/${endpoint}`,
      data,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data?.error || "Something went wrong" };
  }
};

// Create a new document in any Firestore collection
export const createDocument = (collection, data, token) =>
  apiRequest("POST", collection, data, token);

// Read all documents from a collection
export const getDocuments = (collection, token) =>
  apiRequest("GET", collection, {}, token);

// Read a single document by ID
export const getDocumentById = (collection, id, token) =>
  apiRequest("GET", `${collection}/${id}`, {}, token);

// Update a document by ID
export const updateDocument = (collection, id, data, token) =>
  apiRequest("PUT", `${collection}/${id}`, data, token);

// Delete a document by ID
export const deleteDocument = (collection, id, token) =>
  apiRequest("DELETE", `${collection}/${id}`, {}, token);