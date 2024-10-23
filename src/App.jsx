import React, { useState, useEffect } from "react";
import ChatBar from "./components/chatbar/ChatsLeftNavBar";
import Chat from "./components/chatbar/Chat";
import ChatBox from "./components/ChatBox";
import * as authService from "../services/authService";
import * as chatService from "../services/messageService";
import { Link, Route, Routes, useNavigate } from "react-router-dom";


import { VscSquirrel } from "react-icons/vsc";


import io from "socket.io-client";
import "./App.css";

function App() {

  const navigate = useNavigate();


  const [user, setUser] = useState(authService.getUser());






 
  const [loginText, setLoginText] = useState({ username: "", password: "" });
  const [isSignedup, setIsSignedUp] = useState(true);

  



 async function loginSubmit(e) {
  e.preventDefault();
   
  
try {
  
  const user =  await authService.signin(loginText) 
console.log(user)
  setUser(user);
  navigate('/');
} catch (err) {
  console.log('non')
}

  }

  function handleTextInput(event) {
    setLoginText({ ...loginText, [event.target.name]: event.target.value });

   
  }

  return (
    <>
      

      <div
        id="root"
       
      >
        {user ? (
          <>
          <nav className=" w-full flex justify-between"><Link to="/">Home</Link> <button onClick={() => {authService.signout(); setUser(null)}}>Sign Out</button></nav>
            <div className=" flex  justify-end w-5/6 h-5/6 rounded-lg bg-slate-200">
              <ChatBar user={user} />
              <div className="flex flex-col justify-end h-full w-5/6 border-1 border-black/40 rounded-lg">
                <Routes>
                  <Route path="/" element={<ChatBox user={user} />} />
                  {/* <Route
                    path="/chatlogs/:foundUserId/new"
                    element={<ChatBox user={user} />}
                  /> */}
                  <Route
                    path="/chatlogs/:chatId/user/:foundUserId/:foundUserusername"
                    element={<ChatBox user={user} />}
                  />
                </Routes>
              </div>
            </div>
          </>
        ) : (
          <>
          <nav className="navbar-container"> <div className="navbar"><VscSquirrel size={50} className="logo"/> <p className="chatter-title">Chatter</p></div></nav>
            <div className="login-container">
              <div className="login-inner">
              
                <>

              
                  <div className="landing-column-left-container">
<div className="landing-column-left">
                  
                  <h1 className="landing-column-left-header">A place for meaningful conversations</h1>
                  

<p id="landing-column-left-pitch">Connect with your friends and family, build your community, and deepen your interests.</p>




                    <div id="login-form-container">
                     

                       
                        <form
                          id="login-form"
                          onSubmit={loginSubmit}
                        >
                          <label htmlFor="username"></label>

                          <input
                            className="form-input"
                            id="username"
                            name="username"
                            type="text"
                            onChange={handleTextInput}
                            value={loginText.username}
                            placeholder="Username"
                          ></input>

                          <input
                            className="form-input"
                            id="password"
                            name="password"
                            type="text"
                            onChange={handleTextInput}
                            value={loginText.password}
                            placeholder="Password"
                          ></input>
<div id="form-buttons">
                          <button
                            id="login-button"
                            type="submit"
                          >
                            {isSignedup? "Log In": "Sign Up"}
                            
                          </button>
                          <button
                        onClick={function () {
                          setIsSignedUp(!isSignedup);
                        }}
                      >
                        Don't have an account ?
                      </button>
                      </div>
                        </form>
                     
                      
                    </div>
                    </div>
                  </div>
                  <div className="landing-column-right-container"><div className="landing-column-right">hey</div></div>
                </>
               
              
            </div>
            </div>
            
          </>
        )}
      </div>
      
    </>
  );
}

export default App;
