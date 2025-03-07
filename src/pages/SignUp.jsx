import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/api";
import sevya_main from "../assets/sevya-main.png";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      collectionName: "admin",
    };
    try {
      const response = await signup(user);
      console.log(response);
      console.log("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="signup-page">
      <h2 className="visually-hidden">Signup</h2>
      <div className="signup-form">
        <img src={sevya_main}></img>
        <h3>SignUp </h3>
        <h5 className="logo-slogan">To serve and care</h5>
        <form onSubmit={handleSignup} className="signup-form-data">
          <div className="sevya-form-fields">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="sevya-form-fields">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="sevya-form-fields">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="sevya-form-fields">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="sevya-button" type="submit">
            Sign up
          </button>
        </form>
        <a
          onClick={() => {
            navigate("/login");
          }}
        >
          Login to your account !
        </a>
      </div>
    </div>
  );
};
