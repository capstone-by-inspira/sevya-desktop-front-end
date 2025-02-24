//
import { useState } from "react";
import axios from "axios";
import { auth, provider } from "../services/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const API_URL = "http://localhost:8800/api";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🔹 Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result, 'coming');
      const idToken = await result.user.getIdToken();
      await authenticate(idToken);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 Email & Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await userCredential.user.getIdToken();
      console.log(idToken);
      await authenticate(idToken);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const authenticate = async (idToken) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/admin/firebase`, { idToken, collectionName:'admin'});
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/home");
      console.log("Login Successful:", data);
    } catch (error) {
      console.error(
        "Authentication Error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <button
        onClick={() => {
          navigate("/signup");
        }}
      >
        Sign UP
      </button>
    </div>
  );
};

export default Login;
