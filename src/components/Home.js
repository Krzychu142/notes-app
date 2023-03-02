import React from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <main className="home">
      <div className="home--square">
        <nav>
          <h2>
            Welcome in <span>notes app</span>!
          </h2>
          <ul>
            <li>
              <h4>
                Are You new here?{" "}
                <Link className="link" to="/register">
                  Register here
                </Link>
              </h4>
            </li>
            {props.isMyTokenExpired && (
              <li>
                <h4>
                  Already have account?{" "}
                  <Link className="link" to="/login">
                    Login here
                  </Link>
                </h4>
              </li>
            )}
            {!props.isMyTokenExpired && (
              <div className="home--logout">
                <li>
                  <h4>
                    Go to Your{" "}
                    <Link className="link" to="/notes">
                      notes
                    </Link>
                  </h4>
                </li>
                <li>
                  <button onClick={() => props.logOut()}>logout</button>
                </li>
              </div>
            )}
          </ul>
        </nav>
      </div>
    </main>
  );
};

export default Home;
