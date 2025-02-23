import { useState, useContext } from "react";
import { loginUser, signUpUser, loginWithGoogle } from "../services/api";
import { AuthContext } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("a@nams.com");
  const [password, setPassword] = useState("nams123");
  const [isSignup, setIsSignup] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = isSignup ? await signUpUser(email, password) : await loginUser(email, password);
      console.log(response.user, 'agya'); // eh agya
      
      setUser(response.user);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container">
      <h2>{isSignup ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
      </form>
      <button onClick={loginWithGoogle}>Login with Google</button>
      <p onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? "Already have an account? Login" : "Don't have an account? Sign up"}
      </p>
    </div>
  );
};

export default Login;
