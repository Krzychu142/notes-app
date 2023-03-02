import React, { useState } from "react";
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
    <main className="login">
      <nav className="login--nav">
        <ul>
          <li>
            <Link className="link login--nav--link" to="/">
              Back to home
            </Link>
          </li>
          <li>
            Don't have account?
            <Link className="link login--nav--link ml" to="/register">
              Go to register
            </Link>
          </li>
        </ul>
      </nav>
      <form className="login--form" onSubmit={handleSubmit}>
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
        {/* @todo add CAPTCHA here */}
        <button type="submit">Login</button>
      </form>
      {error && <p>Something went wrong. Pleas try again.</p>}
    </main>
  );
};

export default Login;
