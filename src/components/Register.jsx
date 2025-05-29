import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });
  const [msg, setMsg] = useState("");

  const isValidPassword = (password) => {
    const pattern = /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/;
    return pattern.test(password);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRegister = async () => {
    const { name, email, password, confirmPassword, agreed } = form;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setMsg("Please fill all fields");
      return;
    }

    if (!agreed) {
      setMsg("Please agree to the Terms of Service");
      return;
    }

    if (!isValidPassword(password)) {
      setMsg(
        "Password must be at least 6 characters, include one uppercase letter and one special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      setMsg("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost/summit_home_appliancies/php_controllar/contraollers/userRegister.php",
        new URLSearchParams({ name, email, password }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const response = res.data;

      if (response.status === "success") {
        setMsg(response.message);
        setForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          agreed: false,
        });
      } else {
        setMsg(response.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="form-side">
          <h2>Sign up</h2>

          <div className="form-group">
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Repeat your password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="checkbox"
              id="tos"
              name="agreed"
              checked={form.agreed}
              onChange={handleChange}
            />
            <label htmlFor="tos">
              I agree all statements in <a href="#">Terms of service</a>
            </label>
          </div>

          <p id="msg" style={{ color: msg.includes("success") ? "green" : "red" }}>
            {msg}
          </p>

          <div className="form-group space-x-3">
           
            <button type="button" onClick={handleRegister}>
              Register
            </button>

            <Link

            to={"/login"}
              type="button"
              className="login"
            
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
