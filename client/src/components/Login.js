import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const [isVerified, setIsVerified] = useState(false);

  const handleRecaptcha = () => {
    setIsVerified(true);
  };

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
    if (!isVerified) {
      alert("Please verify that you're not a robot.");
    }
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
            Don't have account?{" "}
            <Link className="link login--nav--link" to="/register">
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
        {error && (
          <p className="login__wrong">Something went wrong. Pleas try again.</p>
        )}
        <div>
          <ReCAPTCHA
            style={{ marginBottom: "10px" }}
            sitekey={process.env.REACT_APP_TEST_CAPTHA_SITE_KEY}
            onChange={handleRecaptcha}
          />
        </div>
        <button type="submit" disabled={!isVerified}>
          login
        </button>
      </form>
    </main>
  );
};

export default Login;
