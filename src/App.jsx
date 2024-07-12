import React, { useState, useEffect } from "react";

import ChatBox from "./components/ChatBox";
import * as authService from "../services/authService";
import { Route } from "react-router-dom";

import "./App.css";

function App() {
  const [user, setUser] = useState(authService.getUser());
  const [loginText, setLoginText] = useState({ username: "", password: "" });
  const [isSignedup, setIsSignedUp] = useState(true);

  function loginSubmit(e) {
    console.log(loginText);
    isSignedup ? authService.signup(loginText) : authService.signin(loginText);
  }

  function handleTextInput(event) {
    setLoginText({ ...loginText, [event.target.name]: event.target.value });

    console.log(loginText);
  }

  return (
    <>
      <div
        id="root"
        className=" flex justify-center items-center w-screen h-screen"
      >
        {user ? (
          <>
            <h1>User</h1>

            <ChatBox />
          </>
        ) : (
          <>
            <div className=" flex flex-col justify-center items-center border-black border-2 w-2/6 h-1/2 rounded-lg">
              {isSignedup ? (
                <>
                  <h1>Sign up</h1>

                  <form className="flex flex-col w-1/2 " onSubmit={loginSubmit}>
                    <label htmlFor="username"></label>

                    <input
                      className="border-black border-2"
                      id="username"
                      name="username"
                      type="text"
                      onChange={handleTextInput}
                      value={loginText.username}
                    ></input>

                    <input
                      className="border-black border-2"
                      id="password"
                      name="password"
                      type="text"
                      onChange={handleTextInput}
                      value={loginText.password}
                    ></input>

                    <button
                      className="bg-blue-500 rounded text-white p-1"
                      type="submit"
                    >
                      Sign Up
                    </button>
                  </form>

                  <button
                    onClick={function () {
                      setIsSignedUp(false);
                    }}
                  >
                    Already have an account ?
                  </button>
                </>
              ) : (
                <>
                  <h1>Log In</h1>

                  <form className="flex flex-col w-1/2 " onSubmit={loginSubmit}>
                    <label htmlFor="username"></label>

                    <input
                      className="border-black border-2"
                      id="username"
                      name="username"
                      type="text"
                      onChange={handleTextInput}
                      value={loginText.username}
                    ></input>

                    <input
                      className="border-black border-2"
                      id="password"
                      name="password"
                      type="text"
                      onChange={handleTextInput}
                      value={loginText.password}
                    ></input>

                    <button
                      className="bg-blue-500 rounded text-white p-1"
                      type="submit"
                    >
                      Log In
                    </button>
                  </form>

                  <button
                    onClick={function () {
                      setIsSignedUp(true);
                    }}
                  >
                    Don't have an account ?
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
