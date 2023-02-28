import React from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <main>
      <nav>
        <h2>
          Welcome in <span>notes app</span>
        </h2>
        <h4>
          <a href={() => false}>
            Are You new here? <Link to="/register">Register here</Link>
          </a>
        </h4>
        <h4>
          <a href={() => false}>
            Already have account? <Link to="/login">Login here</Link>
          </a>
        </h4>
        {!props.isMyTokenExpired && (
          <h4>
            <a href={() => false}>
              Go to Your <Link to="/notes">notes</Link>
            </a>
          </h4>
        )}
      </nav>
    </main>
  );
};

export default Home;
