import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",  // single address input
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
    const { name, email, contact, address, password, confirmPassword, agreed } = form;

    if (!name || !email || !contact || !address || !password || !confirmPassword) {
      setMsg("Please fill all fields");
      return;
    }

    if (!agreed) {
      setMsg("Please agree to the Terms of Service");
      return;
    }

    if (!isValidPassword(password)) {
      setMsg("Password must be at least 6 characters, include one uppercase letter and one special character.");
      return;
    }

    if (password !== confirmPassword) {
      setMsg("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost/summit_home_appliancies/php_controllar/contraollers/userRegister.php",
        new URLSearchParams({
          name,
          email,
          contact,
          address,
          password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        }
      );

      const response = res.data;
      setMsg(response.message ?? "Something went wrong.");

      if (response.status === "success") {
        setForm({
          name: "",
          email: "",
          contact: "",
          address: "",
          password: "",
          confirmPassword: "",
          agreed: false,
        });
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
            <input type="text" placeholder="Your Name" name="name" value={form.name} onChange={handleChange} />
          </div>

          <div className="form-group">
            <input type="email" placeholder="Your Email" name="email" value={form.email} onChange={handleChange} />
          </div>

          <div className="form-group">
            <input type="text" placeholder="Contact no." name="contact" value={form.contact} onChange={handleChange} />
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Address (House no, Area, City, Pincode)"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
            <small>Enter full address separated by commas</small>
          </div>

          <div className="form-group">
            <input type="password" placeholder="Password" name="password" value={form.password} onChange={handleChange} />
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
            <input type="checkbox" id="tos" name="agreed" checked={form.agreed} onChange={handleChange} />
            <label htmlFor="tos">
              I agree all statements in <a href="#">Terms of service</a>
            </label>
          </div>

          <p id="msg" style={{ color: msg.includes("success") ? "green" : "red" }}>{msg}</p>

          <div className="form-group space-x-3">
            <button type="button" onClick={handleRegister}>
              Register
            </button>
            <Link to="/login" className="login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
