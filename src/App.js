import React, { useState } from "react";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Notes from "./components/Notes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { isExpired } from "react-jwt";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isMyTokenExpired, setIsMyTokenExpired] = useState(isExpired(token));

  function logOut() {
    localStorage.removeItem("token");
    setToken([]);
    setIsMyTokenExpired(true);
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home isMyTokenExpired={isMyTokenExpired} logOut={logOut} />
            }
          ></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route
            exact
            path="/notes"
            element={
              <Notes
                isMyTokenExpired={isMyTokenExpired}
                token={token}
                logOut={logOut}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
