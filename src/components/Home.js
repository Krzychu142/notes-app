import React from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <main>
      <nav>
        <h2>
          Welcome in <span>notes app</span>
        </h2>
        <ul>
          <li>
            <h4>
              Are You new here? <Link to="/register">Register here</Link>
            </h4>
          </li>
          <li>
            <h4>
              Already have account? <Link to="/login">Login here</Link>
            </h4>
          </li>
          {!props.isMyTokenExpired && (
            <div>
              <li>
                <h4>
                  Go to Your <Link to="/notes">notes</Link>
                </h4>
              </li>
              <li>
                <button onClick={() => props.logOut()}>logout</button>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </main>
  );
};

export default Home;
