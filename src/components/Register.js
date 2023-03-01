import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [responseCode, setResponseCode] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

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
    <>
      <nav>
        <a href={() => false}>
          <Link to="/">Back to home</Link>
        </a>
        <a href={() => false}>
          Already have account?
          <Link to="/login">Go to login</Link>
        </a>
      </nav>
      <form onSubmit={handleSubmit}>
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
        {/* @todo add CAPTCHA here */}
        <button type="submit">Register</button>
      </form>
      {responseCode !== null && (
        <div>
          {responseCode === 200 ? (
            <p>
              Successfully registered. Now You can{" "}
              <Link to="/login">log in</Link>.
            </p>
          ) : (
            <p>Something went wrong. Pleas try again.</p>
          )}
        </div>
      )}
    </>
  );
};

export default Register;
