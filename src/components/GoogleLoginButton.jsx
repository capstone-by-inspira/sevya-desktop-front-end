import axios from "axios";


import { auth } from "../services/firebase"; // Import the initialized Firebase app
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const provider = new GoogleAuthProvider();

const GoogleLoginButton = ({ setUser }) => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      console.log(idToken);
      const response = await axios.post(
        "http://192.168.1.212:8800/api/auth/firebase/google",
        {
          idToken,
        }
      );

      console.log("Backend Response:", response.data);

      if (response.status === 200) {
        console.log("Login Successful:", response.data);
        localStorage.setItem("token", response.data.token);
      } else {
        console.error("Authentication failed:", response.data.error);
      }
    } catch (error) {
      console.error(
        "Google Login Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <button onClick={handleGoogleLogin}> GOOgle</button>
  
  );
};

export default GoogleLoginButton;
