import { useState } from "react";
import "../App.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/auth/signup", {
      username,
      email,
      password,
    })
      .then((response) => {
        if (response.data.status) {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="sign-up-container">
      <form action="" className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
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
          name="password"
          id="password"
          placeholder="************"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
        <p>
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
