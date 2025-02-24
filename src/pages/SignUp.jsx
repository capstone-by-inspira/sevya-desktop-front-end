
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {signup} from '../services/api';

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
       const response =  await signup(email, password, name, "admin");
       console.log(response);
        console.log("Signup Successful");
        navigate("/login");
      } catch (error) {
        console.error("Signup Error:", error);
      }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Signup</button>
      </form>
      <button onClick={()=> {navigate('/login')}}>Login </button>
    </div>
  );
};

