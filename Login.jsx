import { useState } from "react";
import "../App.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  Axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/auth/login", { email, password })
      .then((response) => {
        if (response.data.status) {
          navigate("/home");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="sign-up-container">
      <form action="" className="sign-up-form" onSubmit={handleSubmit}>
      <h2>Sign In</h2>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" placeholder="Password">
          Password:
        </label>
        <input
          type="password"
          name="passord"
          id="password"
          placeholder="************"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
        <p>
          Don't have an account yet? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
