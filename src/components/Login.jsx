import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setMsg("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost/summit_home_appliancies/php_controllar/contraollers/userLogin.php",
        new URLSearchParams({ email, password }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true, // 
        }
      );

      const response = res.data;

      if (response.status === "success") {
        setMsg(response.message);
          setTimeout(() => {
          navigate(response.redirect || "/"); // ✅ Use backend redirect or fallback
        }, 1000);
      } else {
        setMsg(response.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMsg("Something went wrong.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="form-side">
          <h2>Login</h2>

          <div className="form-group">
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <p style={{ color: "red" }}>{msg}</p>

          <div className="form-group space-x-3">
            <button type="button" onClick={handleLogin}>
              Login
            </button>
            <Link to={"/register"}
          
              type="button"
              className="login"
              
            >Register
              
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
