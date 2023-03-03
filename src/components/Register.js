import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

const Register = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [responseCode, setResponseCode] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRecaptcha = (value) => {
    setIsVerified(true);
  };

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
        "http://localhost:3001/register",
        formData
      );
      setResponseCode(response.status);
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setResponseCode(error.response.status);
      setFormData({
        name: "",
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
            Already have account?{" "}
            <Link className="link login--nav--link" to="/login">
              Go to login
            </Link>
          </li>
        </ul>
      </nav>
      <form className="login--form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
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
        {responseCode !== null && (
          <div>
            {responseCode === 200 ? (
              <p className="login__wrong">
                Successfully registered. Now You can{" "}
                <Link className="link login--nav--link" to="/login">
                  log in
                </Link>
                .
              </p>
            ) : (
              <p className="login__wrong">
                Something went wrong. Pleas try again.
              </p>
            )}
          </div>
        )}
        <ReCAPTCHA
          style={{ marginBottom: "10px" }}
          sitekey={process.env.REACT_APP_TEST_CAPTHA_SITE_KEY}
          onChange={handleRecaptcha}
        />
        <button type="submit" disabled={!isVerified}>
          register
        </button>
      </form>
    </main>
  );
};

export default Register;
