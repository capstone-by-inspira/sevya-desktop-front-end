import { useState } from "react";
import axios from "axios";
import { auth, provider } from "../services/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // Import eye icons
import logo from "../assets/logo.png";
import google_login_button from "../assets/google-button.png";
import {API_URL} from '../services/api';



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 🔹 Toggle state
  const navigate = useNavigate();

  // 🔹 Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      await authenticate(idToken);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const authenticate = async (idToken) => {
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/admin/firebase`, {
        idToken,
        collectionName: "admin",
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/home");
    } catch (error) {
      console.error("Authentication Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="login-page">
      <h2 className="visually-hidden">Login</h2>
      <div className="login-form">
        <img src={logo} alt="Sevya Logo" />
        <h3>Sevya</h3>
        <h5 className="logo-slogan">To serve and care</h5>
        <form onSubmit={handleLogin} className="login-form-data">

          <div className="sevya-form-fields">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

        
          <div className="sevya-form-fields">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button className="sevya-button" type="submit">Login</button>
          <button className="google-login-button" onClick={handleGoogleLogin}>
            <img src={google_login_button} alt="Google Login" />
            <span>Sign in with Google</span>
          </button>
        </form>
        <a onClick={() => navigate("/signup")}>
          Don't have an account? Create One!
        </a>
      </div>

   
    
    </div>
  );
};

export default Login;
