import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GoogleLoginButton = ({ setUser }) => {
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await axios.post("http://localhost:5000/google-login", { idToken: credentialResponse.credential });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.token);
    } catch (error) {
      console.error("Google Login Failed:", error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleLogin}
      onError={() => console.error("Google Login Failed")}
    />
  );
};

export default GoogleLoginButton;
