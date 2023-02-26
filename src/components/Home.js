import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main>
      <h2>
        Welcome in <span>notes app</span>
      </h2>
      <h4>
        Are You new here? <Link to="/register">Register here</Link>
      </h4>
      <h4>
        Already have account? <Link to="/login">Login here</Link>
      </h4>
    </main>
  );
};

export default Home;
