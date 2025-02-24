import { useState } from "react";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {signup} from '../services/api';


const API_URL = "http://localhost:8800/api";
const CaregiverSignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    experience: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    try {
      await signup(formData.email, formData.password, formData.name, "caregiver");
      console.log("Caregiver account created successfully");
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Caregiver Signup</h2>

      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="block w-full mb-2 p-2 border" />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="block w-full mb-2 p-2 border" />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="block w-full mb-2 p-2 border" />
      <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="block w-full mb-2 p-2 border" />
      <input type="text" name="experience" placeholder="Experience" value={formData.experience} onChange={handleChange} className="block w-full mb-2 p-2 border" />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Sign Up</button>
    </form>
  );
};

export default CaregiverSignupForm;
