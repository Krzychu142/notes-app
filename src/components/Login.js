import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        formData
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      window.location.href = "/notes";
    } catch (error) {
      setError(error);
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <>
      <nav>
        <a href={() => false}>
          <Link to="/">Back to home</Link>
        </a>
        <a href={() => false}>
          Don't have account already?
          <Link to="/register">Go to register</Link>
        </a>
      </nav>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>Something went wrong. Pleas try again.</p>}
    </>
  );
};

export default Login;
