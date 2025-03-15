import axios from "axios";
import { auth, provider } from "./firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import Caregiver from "../pages/Caregiver";
const API_URL = "http://10.128.229.103:8800/api";



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


export const deleteUserFromAuthentication = async (uid) => {
  try {
    const response = await axios.delete(`${API_URL}/auth/deleteUser`, {
      data: { uid }, 
    });

    return response.data;
  } catch (error) {
    console.error("delete:", error);
    throw error;
  }
};


const token = localStorage.getItem("token");




// const apiRequest = async (method, endpoint, data = {}, token = "") => {
//   console.log(method, 'method');
//   console.log(endpoint, 'endpoint');
//   console.log(data, 'data');
//   console.log(token, 'token');
//   try {
//     const response = await axios({
//       method,
//       url: `${API_URL}/document/${endpoint}`,
//       data,
//       headers: token ? { Authorization: `Bearer ${token}` } : {},
//     });

//     return { success: true, data: response.data };
//   } catch (error) {
//     return { success: false, error: error.response?.data?.error || "Something went wrong" };
//   }
// };


const apiRequest = async (method, endpoint, data = {}, token = "") => {
  try {
    const config = {
      method,
      url: `${API_URL}/document/${endpoint}`,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    };

    if (method !== "GET") {
      config.data = data;
    }

    const response = await axios(config);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    return { 
      success: false, 
      error: error.response?.data?.error || error.message || "Something went wrong" 
    };
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



export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(`${API_URL}/auth/upload`, {
      method: "POST",
      body: formData,
    });

    const upload_image = await response.json();
    if (!response.ok) {
      throw new Error(upload_image.error || "Upload failed!");
    }

    const imageUrl = upload_image.imageUrl;
  //  const newData = { ...data, imageUrl }

    // let dbResponse;

    // if (id) {
    //   // Step 2A: Update an existing document with the new image URL
    //   dbResponse = await updateDocument(collection, id, newData, token);
    // } else {
    //   // Step 2B: Create a new document with the image URL
    //   dbResponse = await createDocument(collection, newData, token);
    // }
    return { success: true, imageUrl:imageUrl };


  //  return { success: true, imageUrl, docId: dbResponse.data.id || docId };
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};
